package com.aihub.sridhar.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.ui.draw.clip
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
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
    var phases by remember { mutableStateOf<List<Phase>>(emptyList()) }
    LaunchedEffect(Unit) { phases = repo.loadPhases() }

    val phaseOpts  = remember(phases) { listOf("All") + phases.map { it.label } }
    var phaseFilter by remember { mutableStateOf("All") }

    val filtered = remember(phases, phaseFilter) {
        if (phaseFilter == "All") phases
        else phases.filter { it.label == phaseFilter }
    }

    Column(modifier = Modifier.fillMaxSize().background(MaterialTheme.colorScheme.background)) {
        TopAppBar(
            title = { Text("Consulting Toolkit", fontWeight = FontWeight.ExtraBold, color = MaterialTheme.colorScheme.onSurface, letterSpacing = (-0.5).sp) },
            colors = TopAppBarDefaults.topAppBarColors(containerColor = MaterialTheme.colorScheme.background),
        )
        Box(modifier = Modifier.fillMaxWidth().height(1.dp).background(Brush.horizontalGradient(listOf(NeonViolet.copy(alpha = 0.5f), NeonCyan.copy(alpha = 0.3f), androidx.compose.ui.graphics.Color.Transparent))))

        Row(modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp, vertical = 8.dp).padding(bottom = 4.dp), horizontalArrangement = Arrangement.spacedBy(8.dp), verticalAlignment = Alignment.CenterVertically) {
            FilterDropdown("Phase", phaseFilter, phaseOpts, { phaseFilter = it }, Modifier.width(180.dp))
            Spacer(Modifier.weight(1f))
            Text(
                "${filtered.sumOf { it.playbooks.size }} of ${phases.sumOf { it.playbooks.size }} playbooks",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
        }

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
                    Box(modifier = Modifier.fillMaxWidth().height(1.dp).padding(horizontal = 16.dp).background(MaterialTheme.colorScheme.surfaceVariant))
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
        Box(modifier = Modifier.size(44.dp).background(Brush.linearGradient(listOf(fg.copy(alpha = 0.2f), fg.copy(alpha = 0.1f))), RoundedCornerShape(12.dp)).border(1.dp, fg.copy(0.3f), RoundedCornerShape(12.dp)), contentAlignment = Alignment.Center) {
            Icon(icon, null, tint = fg, modifier = Modifier.size(22.dp))
        }
        Column(modifier = Modifier.weight(1f)) {
            Text(pb.title, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold, color = MaterialTheme.colorScheme.onSurface, maxLines = 1, overflow = TextOverflow.Ellipsis)
            Text("${pb.checklist.size} checklist items", style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant, maxLines = 1)
        }
        BadgeChip(pb.level, lBg, lFg)
    }
}

/* ── Playbook detail ─────────────────────────────────────── */

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PlaybookDetailScreen(repo: DataRepository, phaseId: String, index: Int, onBack: () -> Unit) {
    var phase by remember { mutableStateOf<Phase?>(null) }
    LaunchedEffect(phaseId) { phase = repo.loadPhases().find { it.phase == phaseId } }
    val pb = remember(phase, index) { phase?.playbooks?.getOrNull(index) }

    val checkedItems  = remember { mutableStateListOf<Boolean>() }
    val expandedItems = remember { mutableStateListOf<Boolean>() }
    LaunchedEffect(pb) {
        if (pb != null && checkedItems.isEmpty()) {
            repeat(pb.checklist.size) { checkedItems.add(false); expandedItems.add(false) }
        }
    }
    var tab by remember { mutableStateOf(0) }

    Scaffold(
        containerColor = MaterialTheme.colorScheme.background,
        topBar = {
            TopAppBar(
                title = { Text(pb?.title ?: "Playbook", fontWeight = FontWeight.Bold, color = MaterialTheme.colorScheme.onSurface, maxLines = 1, overflow = TextOverflow.Ellipsis) },
                navigationIcon = { IconButton(onClick = onBack) { Icon(Icons.Filled.ArrowBack, "Back", tint = MaterialTheme.colorScheme.onSurface) } },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = MaterialTheme.colorScheme.background),
            )
        }
    ) { padding ->
        val pb = pb
        val phase = phase
        if (pb == null || phase == null) { EmptyState("Loading…", Modifier.padding(padding)); return@Scaffold }
        val done  = checkedItems.count { it }
        val total = pb.checklist.size
        val (lBg, lFg) = levelColors(pb.level)
        val (phBg, phFg, phIcon) = phaseColors(phase.phase)

        Column(modifier = Modifier.fillMaxSize().padding(top = padding.calculateTopPadding())) {
            // Progress bar always visible at top
            Box(modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp, vertical = 8.dp)) {
                Column {
                    Row(horizontalArrangement = Arrangement.SpaceBetween, modifier = Modifier.fillMaxWidth()) {
                        Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                            BadgeChip(pb.level, lBg, lFg)
                            BadgeChip(phase.label, Blue100, Blue500)
                        }
                        Text("$done / $total", style = MaterialTheme.typography.labelSmall, fontWeight = FontWeight.Bold, color = if (done == total && total > 0) NeonGreen else MaterialTheme.colorScheme.onSurfaceVariant)
                    }
                    Spacer(Modifier.height(8.dp))
                    Box(modifier = Modifier.fillMaxWidth().height(4.dp).clip(RoundedCornerShape(2.dp)).background(MaterialTheme.colorScheme.surfaceVariant)) {
                        Box(modifier = Modifier.fillMaxWidth(if (total > 0) done.toFloat() / total else 0f).height(4.dp).clip(RoundedCornerShape(2.dp)).background(Brush.horizontalGradient(listOf(NeonGreen, NeonCyan))))
                    }
                }
            }
            TabRow(
                selectedTabIndex = tab,
                containerColor = MaterialTheme.colorScheme.background,
                contentColor = NeonGreen,
                divider = { Box(Modifier.fillMaxWidth().height(1.dp).background(MaterialTheme.colorScheme.surfaceVariant)) },
            ) {
                listOf("About", "Checklist").forEachIndexed { i, t ->
                    Tab(
                        selected = tab == i, onClick = { tab = i },
                        text = { Text(t, style = MaterialTheme.typography.labelMedium, fontWeight = if (tab == i) FontWeight.Bold else FontWeight.Normal, color = if (tab == i) NeonGreen else MaterialTheme.colorScheme.onSurfaceVariant) },
                    )
                }
            }
            when (tab) {
                0 -> LazyColumn(modifier = Modifier.weight(1f), contentPadding = PaddingValues(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                    item {
                        Text(pb.desc, style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.onSurfaceVariant, lineHeight = 22.sp)
                    }
                    if (pb.guidance.isNotBlank()) item {
                        Box(modifier = Modifier.fillMaxWidth().clip(RoundedCornerShape(12.dp)).background(Brush.linearGradient(listOf(NeonViolet.copy(0.12f), Dark800))).border(1.dp, Brush.linearGradient(listOf(NeonViolet.copy(0.35f), NeonViolet.copy(0.1f))), RoundedCornerShape(12.dp)).padding(14.dp)) {
                            Column {
                                Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp), modifier = Modifier.padding(bottom = 8.dp)) {
                                    Icon(Icons.Filled.Lightbulb, null, tint = NeonViolet, modifier = Modifier.size(16.dp))
                                    Text("Guidance", style = MaterialTheme.typography.labelMedium, fontWeight = FontWeight.SemiBold, color = NeonViolet)
                                }
                                Text(pb.guidance, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant, lineHeight = 20.sp)
                            }
                        }
                    }
                    item {
                        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            Box(modifier = Modifier.weight(1f).clip(RoundedCornerShape(10.dp)).background(MaterialTheme.colorScheme.surface).border(1.dp, MaterialTheme.colorScheme.surfaceVariant, RoundedCornerShape(10.dp)).padding(12.dp)) {
                                Column {
                                    Text("Phase", style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                                    Spacer(Modifier.height(2.dp))
                                    Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                                        Icon(phIcon, null, tint = phFg, modifier = Modifier.size(14.dp))
                                        Text(phase.label, style = MaterialTheme.typography.bodySmall, fontWeight = FontWeight.SemiBold, color = MaterialTheme.colorScheme.onSurface)
                                    }
                                }
                            }
                            Box(modifier = Modifier.weight(1f).clip(RoundedCornerShape(10.dp)).background(MaterialTheme.colorScheme.surface).border(1.dp, MaterialTheme.colorScheme.surfaceVariant, RoundedCornerShape(10.dp)).padding(12.dp)) {
                                Column {
                                    Text("Items", style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                                    Spacer(Modifier.height(2.dp))
                                    Text("$total checklist items", style = MaterialTheme.typography.bodySmall, fontWeight = FontWeight.SemiBold, color = MaterialTheme.colorScheme.onSurface)
                                }
                            }
                        }
                    }
                }
                else -> LazyColumn(modifier = Modifier.weight(1f), contentPadding = PaddingValues(start = 16.dp, end = 16.dp, top = 8.dp, bottom = 16.dp)) {
                    itemsIndexed(pb.checklist) { i, item ->
                        val checked = checkedItems.getOrElse(i) { false }
                        Box(
                            modifier = Modifier.fillMaxWidth().padding(bottom = 6.dp).clip(RoundedCornerShape(10.dp))
                                .background(if (checked) Brush.linearGradient(listOf(NeonGreen.copy(0.12f), Dark800)) else Brush.linearGradient(listOf(Dark800, Dark800)))
                                .border(1.dp, if (checked) NeonGreen.copy(0.4f) else Dark700, RoundedCornerShape(10.dp)),
                        ) {
                            Column {
                                Row(
                                    modifier = Modifier.fillMaxWidth().padding(12.dp),
                                    verticalAlignment = Alignment.CenterVertically,
                                    horizontalArrangement = Arrangement.spacedBy(10.dp),
                                ) {
                                    Checkbox(
                                        checked = checked,
                                        onCheckedChange = { if (i < checkedItems.size) checkedItems[i] = it },
                                        colors = CheckboxDefaults.colors(checkedColor = NeonGreen, uncheckedColor = MaterialTheme.colorScheme.onSurfaceVariant),
                                        modifier = Modifier.size(20.dp),
                                    )
                                    Text(
                                        text = item.item,
                                        style = MaterialTheme.typography.bodySmall,
                                        modifier = Modifier.weight(1f),
                                        color = if (checked) MaterialTheme.colorScheme.onSurfaceVariant else MaterialTheme.colorScheme.onSurface,
                                    )
                                    if (item.sections.isNotEmpty()) {
                                        IconButton(onClick = { if (i < expandedItems.size) expandedItems[i] = !expandedItems[i] }, modifier = Modifier.size(24.dp)) {
                                            Icon(
                                                if (expandedItems.getOrElse(i) { false }) Icons.Filled.ExpandLess else Icons.Filled.ExpandMore,
                                                "Toggle",
                                                modifier = Modifier.size(18.dp),
                                                tint = NeonViolet,
                                            )
                                        }
                                    }
                                }
                                if (expandedItems.getOrElse(i) { false } && item.sections.isNotEmpty()) {
                                    Box(modifier = Modifier.fillMaxWidth().background(NeonViolet.copy(alpha = 0.06f))) {
                                        Column(modifier = Modifier.padding(12.dp)) {
                                            if (item.templateTitle.isNotBlank()) Text(item.templateTitle, style = MaterialTheme.typography.labelSmall, fontWeight = FontWeight.SemiBold, color = NeonViolet, modifier = Modifier.padding(bottom = 4.dp))
                                            if (item.instructions.isNotBlank()) Text(item.instructions, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(bottom = 8.dp))
                                            item.sections.forEach { section ->
                                                Text(section.heading, style = MaterialTheme.typography.labelSmall, fontWeight = FontWeight.Bold, color = NeonViolet, modifier = Modifier.padding(bottom = 4.dp, top = 4.dp))
                                                section.items.forEachIndexed { qi, q ->
                                                    Row(modifier = Modifier.padding(bottom = 3.dp)) {
                                                        Text("${qi + 1}. ", style = MaterialTheme.typography.labelSmall, color = NeonViolet, fontWeight = FontWeight.Bold)
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
    }
}
