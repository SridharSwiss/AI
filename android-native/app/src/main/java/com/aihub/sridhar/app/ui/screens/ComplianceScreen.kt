package com.aihub.sridhar.app.ui.screens

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Shield
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import com.aihub.sridhar.app.data.models.ComplianceFramework
import com.aihub.sridhar.app.data.repository.DataRepository
import com.aihub.sridhar.app.ui.components.*
import com.aihub.sridhar.app.ui.theme.*

private fun riskColors(risk: String) = when (risk.lowercase()) {
    "low"      -> Pair(Green100, Green500)
    "medium"   -> Pair(Blue100, Blue500)
    "high"     -> Pair(Amber100, Amber500)
    "critical" -> Pair(Rose100, Rose500)
    else       -> Pair(Blue100, Blue500)
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ComplianceScreen(repo: DataRepository, onFrameworkClick: (String) -> Unit) {
    val all           = repo.compliance
    val jurisdictions = remember { listOf("All") + all.map { it.jurisdiction }.distinct().sorted() }
    val riskLevels    = remember { listOf("All", "low", "medium", "high", "critical") }

    var jurisdiction by remember { mutableStateOf("All") }
    var riskLevel    by remember { mutableStateOf("All") }

    val filtered = remember(jurisdiction, riskLevel) {
        all.filter {
            (jurisdiction == "All" || it.jurisdiction == jurisdiction) &&
            (riskLevel    == "All" || it.riskLevel == riskLevel)
        }
    }

    Column {
        TopAppBar(title = { Text("Compliance", fontWeight = FontWeight.Bold) })

        Row(modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp, vertical = 8.dp), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            FilterDropdown("Jurisdiction", jurisdiction, jurisdictions, { jurisdiction = it }, Modifier.weight(1f))
            FilterDropdown("Risk Level",   riskLevel,   riskLevels,   { riskLevel    = it }, Modifier.weight(1f))
        }

        Row(modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp).padding(bottom = 8.dp), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
            Text("${filtered.size} of ${all.size} frameworks", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
            if (jurisdiction != "All" || riskLevel != "All") {
                TextButton(onClick = { jurisdiction = "All"; riskLevel = "All" }) { Text("Clear", style = MaterialTheme.typography.labelSmall) }
            }
        }

        HorizontalDivider()

        LazyColumn {
            items(filtered, key = { it.slug }) { f ->
                ComplianceRow(f = f, onClick = { onFrameworkClick(f.slug) })
                HorizontalDivider(color = MaterialTheme.colorScheme.outline.copy(alpha = 0.3f))
            }
        }
    }
}

@Composable
fun ComplianceRow(f: ComplianceFramework, onClick: () -> Unit) {
    val (bg, fg) = riskColors(f.riskLevel)
    Row(
        modifier = Modifier.fillMaxWidth().clickable(onClick = onClick).padding(horizontal = 16.dp, vertical = 12.dp),
        horizontalArrangement = Arrangement.spacedBy(12.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Surface(color = Rose100, contentColor = Rose500, shape = RoundedCornerShape(10.dp), modifier = Modifier.size(40.dp)) {
            Box(contentAlignment = Alignment.Center) { Icon(Icons.Filled.Shield, null, modifier = Modifier.size(20.dp)) }
        }
        Column(modifier = Modifier.weight(1f)) {
            Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                Text(f.name, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold, maxLines = 1, overflow = TextOverflow.Ellipsis, modifier = Modifier.weight(1f, fill = false))
            }
            Text("${f.jurisdiction} · ${f.enforcementDate}", style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant, maxLines = 1)
        }
        BadgeChip("${f.riskLevel} risk".replaceFirstChar { it.uppercase() }, bg, fg)
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ComplianceDetailScreen(repo: DataRepository, slug: String, onBack: () -> Unit) {
    val f = remember(slug) { repo.compliance.find { it.slug == slug } }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(f?.name ?: "Framework", fontWeight = FontWeight.Bold, maxLines = 1, overflow = TextOverflow.Ellipsis) },
                navigationIcon = { IconButton(onClick = onBack) { Icon(Icons.Filled.Shield, null) } },
            )
        }
    ) { padding ->
        if (f == null) { EmptyState("Framework not found", Modifier.padding(padding)); return@Scaffold }
        val (bg, fg) = riskColors(f.riskLevel)
        LazyColumn(contentPadding = PaddingValues(start = 16.dp, end = 16.dp, top = padding.calculateTopPadding() + 8.dp, bottom = 16.dp)) {
            item {
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp), modifier = Modifier.padding(bottom = 16.dp)) {
                    BadgeChip("${f.riskLevel} risk".replaceFirstChar { it.uppercase() }, bg, fg)
                    BadgeChip(f.status, Blue100, Blue500)
                }
            }
            item {
                Text(f.description, style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(bottom = 16.dp))
            }
            item {
                Text("Details", style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold, modifier = Modifier.padding(bottom = 8.dp))
                DetailRow("Jurisdiction",      f.jurisdiction)
                DetailRow("Status",            f.status)
                DetailRow("Enforcement Date",  f.enforcementDate)
                DetailRow("Risk Level",        f.riskLevel.replaceFirstChar { it.uppercase() })
                if (f.scope.isNotBlank())      DetailRow("Scope",    f.scope)
                if (f.penalties.isNotBlank())  DetailRow("Penalties", f.penalties)
            }
            if (f.keyRequirements.isNotEmpty()) {
                item {
                    Spacer(Modifier.height(16.dp))
                    Text("Key Requirements", style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold, modifier = Modifier.padding(bottom = 8.dp))
                    f.keyRequirements.forEach { req ->
                        Row(modifier = Modifier.padding(bottom = 8.dp), verticalAlignment = Alignment.Top) {
                            Icon(Icons.Filled.CheckCircle, null, tint = Emerald500, modifier = Modifier.size(16.dp).padding(top = 2.dp))
                            Spacer(Modifier.width(8.dp))
                            Text(req, style = MaterialTheme.typography.bodySmall)
                        }
                    }
                }
            }
            if (f.aimsAndObjectives.isNotBlank()) {
                item {
                    Spacer(Modifier.height(8.dp))
                    Text("Aims & Objectives", style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold, modifier = Modifier.padding(bottom = 4.dp))
                    Text(f.aimsAndObjectives, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
            }
        }
    }
}
