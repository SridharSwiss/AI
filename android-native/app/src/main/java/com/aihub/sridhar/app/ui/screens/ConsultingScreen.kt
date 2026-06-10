package com.aihub.sridhar.app.ui.screens

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import com.aihub.sridhar.app.data.models.Phase
import com.aihub.sridhar.app.data.models.Playbook
import com.aihub.sridhar.app.data.repository.DataRepository
import com.aihub.sridhar.app.ui.components.*
import com.aihub.sridhar.app.ui.theme.*

private fun phaseColors(phase: String) = when (phase) {
    "assess" -> Triple(Blue100, Blue500, Icons.Filled.Search)
    "pilot"  -> Triple(Purple100, Purple500, Icons.Filled.Science)
    "scale"  -> Triple(Emerald100, Emerald500, Icons.Filled.TrendingUp)
    "govern" -> Triple(Rose100, Rose500, Icons.Filled.Shield)
    else     -> Triple(Blue100, Blue500, Icons.Filled.Work)
}

private fun levelColors(level: String) = when (level) {
    "beginner"     -> Pair(Green100, Green500)
    "practitioner" -> Pair(Blue100, Blue500)
    "manager"      -> Pair(Purple100, Purple500)
    "executive"    -> Pair(Amber100, Amber500)
    else           -> Pair(Blue100, Blue500)
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ConsultingScreen(repo: DataRepository, onPlaybookClick: (String, Int) -> Unit) {
    val phases     = repo.phases
    val phaseOpts  = remember { listOf("All") + phases.map { it.label } }
    var phaseFilter by remember { mutableStateOf("All") }

    val filtered = remember(phaseFilter) {
        if (phaseFilter == "All") phases
        else phases.filter { it.label == phaseFilter }
    }

    Column {
        TopAppBar(title = { Text("Consulting Toolkit", fontWeight = FontWeight.Bold) })

        Row(modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp, vertical = 8.dp).padding(bottom = 4.dp), horizontalArrangement = Arrangement.spacedBy(8.dp), verticalAlignment = Alignment.CenterVertically) {
            FilterDropdown("Phase", phaseFilter, phaseOpts, { phaseFilter = it }, Modifier.width(180.dp))
            Spacer(Modifier.weight(1f))
            Text(
                "${filtered.sumOf { it.playbooks.size }} of ${phases.sumOf { it.playbooks.size }} playbooks",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
        }

        HorizontalDivider()

        LazyColumn {
            filtered.forEach { phase ->
                item(key = "header_${phase.phase}") {
                    val (bg, fg, icon) = phaseColors(phase.phase)
                    Row(
                        modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp, vertical = 10.dp),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(8.dp),
                    ) {
                        Icon(icon, null, tint = fg, modifier = Modifier.size(16.dp))
                        Text(phase.label, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.Bold, color = fg)
                        Text("· ${phase.description}", style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant, maxLines = 1, overflow = TextOverflow.Ellipsis)
                    }
                }
                itemsIndexed(phase.playbooks, key = { i, pb -> "${phase.phase}_$i" }) { index, pb ->
                    PlaybookRow(
                        pb     = pb,
                        phase  = phase,
                        onClick = { onPlaybookClick(phase.phase, index) },
                    )
                    HorizontalDivider(color = MaterialTheme.colorScheme.outline.copy(alpha = 0.3f))
                }
            }
        }
    }
}

@Composable
fun PlaybookRow(pb: Playbook, phase: Phase, onClick: () -> Unit) {
    val (bg, fg, icon) = phaseColors(phase.phase)
    val (lBg, lFg) = levelColors(pb.level)
    Row(
        modifier = Modifier.fillMaxWidth().clickable(onClick = onClick).padding(horizontal = 16.dp, vertical = 12.dp),
        horizontalArrangement = Arrangement.spacedBy(12.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Surface(color = bg, contentColor = fg, shape = RoundedCornerShape(10.dp), modifier = Modifier.size(40.dp)) {
            Box(contentAlignment = Alignment.Center) { Icon(icon, null, modifier = Modifier.size(20.dp)) }
        }
        Column(modifier = Modifier.weight(1f)) {
            Text(pb.title, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold, maxLines = 1, overflow = TextOverflow.Ellipsis)
            Text("${pb.checklist.size} checklist items", style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant, maxLines = 1)
        }
        BadgeChip(pb.level, lBg, lFg)
    }
}

/* ── Playbook detail ─────────────────────────────────────── */

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PlaybookDetailScreen(repo: DataRepository, phaseId: String, index: Int, onBack: () -> Unit) {
    val phase = remember(phaseId) { repo.phases.find { it.phase == phaseId } }
    val pb    = remember(phase, index) { phase?.playbooks?.getOrNull(index) }

    val checkedItems = remember { mutableStateListOf<Boolean>().also { list -> pb?.checklist?.forEach { _ -> list.add(false) } } }
    val expandedItems = remember { mutableStateListOf<Boolean>().also { list -> pb?.checklist?.forEach { _ -> list.add(false) } } }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(pb?.title ?: "Playbook", fontWeight = FontWeight.Bold, maxLines = 1, overflow = TextOverflow.Ellipsis) },
                navigationIcon = { IconButton(onClick = onBack) { Icon(Icons.Filled.Work, null) } },
            )
        }
    ) { padding ->
        if (pb == null || phase == null) { EmptyState("Playbook not found", Modifier.padding(padding)); return@Scaffold }
        val done  = checkedItems.count { it }
        val total = pb.checklist.size
        val (lBg, lFg) = levelColors(pb.level)

        LazyColumn(contentPadding = PaddingValues(start = 16.dp, end = 16.dp, top = padding.calculateTopPadding() + 8.dp, bottom = 16.dp)) {
            item {
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp), modifier = Modifier.padding(bottom = 12.dp)) {
                    BadgeChip(pb.level, lBg, lFg)
                    BadgeChip(phase.label, Blue100, Blue500)
                }
                Text(pb.desc, style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(bottom = 12.dp))
            }
            item {
                LinearProgressIndicator(
                    progress = { if (total > 0) done.toFloat() / total else 0f },
                    modifier = Modifier.fillMaxWidth().padding(bottom = 4.dp),
                )
                Text("$done / $total completed", style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(bottom = 16.dp))
            }
            if (pb.guidance.isNotBlank()) {
                item {
                    Surface(color = MaterialTheme.colorScheme.surfaceVariant, shape = RoundedCornerShape(10.dp), modifier = Modifier.fillMaxWidth().padding(bottom = 16.dp)) {
                        Text(pb.guidance, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(12.dp))
                    }
                }
            }
            item {
                Text("Checklist", style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold, modifier = Modifier.padding(bottom = 8.dp))
            }
            itemsIndexed(pb.checklist) { i, item ->
                Surface(
                    color = if (checkedItems.getOrElse(i) { false }) Emerald100.copy(alpha = 0.4f) else MaterialTheme.colorScheme.surface,
                    shape = RoundedCornerShape(10.dp),
                    modifier = Modifier.fillMaxWidth().padding(bottom = 6.dp),
                    tonalElevation = 1.dp,
                ) {
                    Column {
                        Row(
                            modifier = Modifier.fillMaxWidth().padding(12.dp),
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(10.dp),
                        ) {
                            Checkbox(
                                checked  = checkedItems.getOrElse(i) { false },
                                onCheckedChange = { if (i < checkedItems.size) checkedItems[i] = it },
                                colors = CheckboxDefaults.colors(checkedColor = Emerald500),
                                modifier = Modifier.size(20.dp),
                            )
                            Text(
                                text  = item.item,
                                style = MaterialTheme.typography.bodySmall,
                                modifier = Modifier.weight(1f),
                                color = if (checkedItems.getOrElse(i) { false }) MaterialTheme.colorScheme.onSurfaceVariant else MaterialTheme.colorScheme.onSurface,
                            )
                            if (item.sections.isNotEmpty()) {
                                IconButton(onClick = { if (i < expandedItems.size) expandedItems[i] = !expandedItems[i] }, modifier = Modifier.size(24.dp)) {
                                    Icon(
                                        if (expandedItems.getOrElse(i) { false }) Icons.Filled.ExpandLess else Icons.Filled.ExpandMore,
                                        "Toggle template",
                                        modifier = Modifier.size(18.dp),
                                        tint = Violet500,
                                    )
                                }
                            }
                        }
                        if (expandedItems.getOrElse(i) { false } && item.sections.isNotEmpty()) {
                            Surface(color = Violet500.copy(alpha = 0.06f), modifier = Modifier.fillMaxWidth()) {
                                Column(modifier = Modifier.padding(12.dp)) {
                                    Text(item.templateTitle, style = MaterialTheme.typography.labelSmall, fontWeight = FontWeight.SemiBold, color = Violet500, modifier = Modifier.padding(bottom = 4.dp))
                                    if (item.instructions.isNotBlank()) {
                                        Text(item.instructions, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(bottom = 8.dp))
                                    }
                                    item.sections.forEach { section ->
                                        Text(section.heading, style = MaterialTheme.typography.labelSmall, fontWeight = FontWeight.Bold, color = Violet500, modifier = Modifier.padding(bottom = 4.dp, top = 4.dp))
                                        section.items.forEachIndexed { qi, q ->
                                            Row(modifier = Modifier.padding(bottom = 3.dp)) {
                                                Text("${qi + 1}. ", style = MaterialTheme.typography.labelSmall, color = Violet500, fontWeight = FontWeight.Bold)
                                                Text(q, style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
