package com.aihub.sridhar.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalUriHandler
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
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

private fun impactColors(impact: String) = when (impact.lowercase()) {
    "low"      -> Pair(Green100, Green500)
    "moderate" -> Pair(Blue100, Blue500)
    "high"     -> Pair(Amber100, Amber500)
    "critical" -> Pair(Rose100, Rose500)
    else       -> Pair(Blue100, Blue500)
}

private fun timelineTypeColor(type: String) = when (type.lowercase()) {
    "past"     -> Blue500
    "current"  -> Green500
    "upcoming" -> Amber500
    else       -> Blue500
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ComplianceScreen(repo: DataRepository, onFrameworkClick: (String) -> Unit) {
    var all by remember { mutableStateOf<List<ComplianceFramework>>(emptyList()) }
    LaunchedEffect(Unit) { all = repo.loadCompliance() }

    val jurisdictions = remember(all) { listOf("All") + all.map { it.jurisdiction }.distinct().sorted() }
    val riskLevels    = remember { listOf("All", "low", "medium", "high", "critical") }

    var jurisdiction by remember { mutableStateOf("All") }
    var riskLevel    by remember { mutableStateOf("All") }

    val filtered = remember(all, jurisdiction, riskLevel) {
        all.filter {
            (jurisdiction == "All" || it.jurisdiction == jurisdiction) &&
            (riskLevel    == "All" || it.riskLevel == riskLevel)
        }
    }

    Column(modifier = Modifier.fillMaxSize().background(Dark900)) {
        TopAppBar(
            title = { Text("Compliance", fontWeight = FontWeight.ExtraBold, color = TextPrimary, letterSpacing = (-0.5).sp) },
            colors = TopAppBarDefaults.topAppBarColors(containerColor = Dark900),
        )
        Box(modifier = Modifier.fillMaxWidth().height(1.dp).background(Brush.horizontalGradient(listOf(NeonPink.copy(alpha = 0.5f), NeonViolet.copy(alpha = 0.3f), Color.Transparent))))
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
        LazyColumn {
            items(filtered, key = { it.slug }) { f ->
                ComplianceRow(f = f, onClick = { onFrameworkClick(f.slug) })
                Box(modifier = Modifier.fillMaxWidth().height(1.dp).padding(horizontal = 16.dp).background(Dark700))
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
        Box(
            modifier = Modifier.size(44.dp).background(Brush.linearGradient(listOf(NeonPink.copy(alpha = 0.25f), NeonViolet.copy(alpha = 0.15f))), RoundedCornerShape(12.dp)).border(1.dp, Brush.linearGradient(listOf(NeonPink.copy(0.4f), NeonViolet.copy(0.2f))), RoundedCornerShape(12.dp)),
            contentAlignment = Alignment.Center,
        ) { Icon(Icons.Filled.Shield, null, tint = NeonPink, modifier = Modifier.size(22.dp)) }
        Column(modifier = Modifier.weight(1f)) {
            Text(f.name, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold, color = TextPrimary, maxLines = 1, overflow = TextOverflow.Ellipsis)
            Text("${f.jurisdiction} · ${f.enforcementDate}", style = MaterialTheme.typography.labelSmall, color = TextSecondary, maxLines = 1)
        }
        BadgeChip(f.riskLevel.replaceFirstChar { it.uppercase() }, bg, fg)
    }
}

/* ── Compliance detail ───────────────────────────────────── */

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ComplianceDetailScreen(repo: DataRepository, slug: String, onBack: () -> Unit) {
    var f by remember { mutableStateOf<ComplianceFramework?>(null) }
    var allCompliance by remember { mutableStateOf<List<ComplianceFramework>>(emptyList()) }
    LaunchedEffect(slug) { allCompliance = repo.loadCompliance(); f = allCompliance.find { it.slug == slug } }
    val uriHandler = LocalUriHandler.current

    Scaffold(
        containerColor = Dark900,
        topBar = {
            TopAppBar(
                title = { Text(f?.shortName.takeIf { !it.isNullOrBlank() } ?: f?.name ?: "Framework", fontWeight = FontWeight.Bold, color = TextPrimary, maxLines = 1, overflow = TextOverflow.Ellipsis) },
                navigationIcon = { IconButton(onClick = onBack) { Icon(Icons.Filled.ArrowBack, "Back", tint = TextPrimary) } },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = Dark900),
                actions = {
                    f?.officialLink?.let { url ->
                        if (url.isNotBlank()) IconButton(onClick = { uriHandler.openUri(url) }) { Icon(Icons.Filled.OpenInNew, "Official link", tint = NeonViolet) }
                    }
                }
            )
        }
    ) { padding ->
        val f = f
        if (f == null) { EmptyState("Loading…", Modifier.padding(padding)); return@Scaffold }
        val (bg, fg) = riskColors(f.riskLevel)

        LazyColumn(contentPadding = PaddingValues(start = 16.dp, end = 16.dp, top = padding.calculateTopPadding() + 8.dp, bottom = 24.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {

            // Full name + badges
            item {
                if (f.shortName.isNotBlank() && f.shortName != f.name) {
                    Text(f.name, style = MaterialTheme.typography.titleSmall, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(bottom = 6.dp))
                }
                Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                    BadgeChip(f.riskLevel.replaceFirstChar { it.uppercase() } + " Risk", bg, fg)
                    BadgeChip(f.status, Blue100, Blue500)
                    BadgeChip(f.jurisdiction, Emerald100, Emerald500)
                }
            }

            // Description
            item {
                Text(f.description, style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.onSurfaceVariant)
            }

            // Key details
            item {
                DetailCard(title = "Details", icon = Icons.Filled.Info, iconTint = Blue500) {
                    DetailRow("Jurisdiction",      f.jurisdiction)
                    DetailRow("Status",            f.status)
                    DetailRow("Enforcement Date",  f.enforcementDate)
                    DetailRow("Risk Level",        f.riskLevel.replaceFirstChar { it.uppercase() })
                    if (f.enforcingAuthority.isNotBlank()) DetailRow("Enforcing Authority", f.enforcingAuthority)
                    if (f.scope.isNotBlank())       DetailRow("Scope", f.scope)
                    if (f.affectedOrgs.isNotBlank()) DetailRow("Affected Orgs", f.affectedOrgs)
                    if (f.penalties.isNotBlank())   DetailRow("Penalties", f.penalties)
                }
            }

            // Key requirements
            if (f.keyRequirements.isNotEmpty()) {
                item {
                    DetailCard(title = "Key Requirements", icon = Icons.Filled.CheckCircle, iconTint = Emerald500) {
                        f.keyRequirements.forEach { BulletItem(it, Emerald500, Icons.Filled.CheckCircle) }
                    }
                }
            }

            // Who is affected / exempt
            if (f.whoIsAffected.isNotEmpty() || f.whoIsExempt.isNotEmpty()) {
                item {
                    DetailCard(title = "Scope of Application", icon = Icons.Filled.People, iconTint = Blue500) {
                        if (f.whoIsAffected.isNotEmpty()) {
                            Text("Who Is Affected", style = MaterialTheme.typography.labelSmall, fontWeight = FontWeight.SemiBold, modifier = Modifier.padding(bottom = 4.dp))
                            f.whoIsAffected.forEach { BulletItem(it, Amber500) }
                        }
                        if (f.whoIsExempt.isNotEmpty()) {
                            if (f.whoIsAffected.isNotEmpty()) Spacer(Modifier.height(8.dp))
                            Text("Who Is Exempt", style = MaterialTheme.typography.labelSmall, fontWeight = FontWeight.SemiBold, modifier = Modifier.padding(bottom = 4.dp))
                            f.whoIsExempt.forEach { BulletItem(it, Green500) }
                        }
                    }
                }
            }

            // Key prohibitions
            if (f.keyProhibitions.isNotEmpty()) {
                item {
                    DetailCard(title = "Key Prohibitions", icon = Icons.Filled.Block, iconTint = Rose500) {
                        f.keyProhibitions.forEach { BulletItem(it, Rose500, Icons.Filled.Cancel) }
                    }
                }
            }

            // Risk Tiers
            if (f.riskTiers.isNotEmpty()) {
                item {
                    DetailCard(title = "Risk Tiers", icon = Icons.Filled.Layers, iconTint = Amber500) {
                        f.riskTiers.forEach { tier ->
                            val (tBg, tFg) = riskColors(tier.level)
                            ElevatedCard(modifier = Modifier.fillMaxWidth().padding(bottom = 8.dp), shape = RoundedCornerShape(10.dp)) {
                                Column(Modifier.padding(12.dp)) {
                                    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
                                        Text(tier.name, style = MaterialTheme.typography.bodySmall, fontWeight = FontWeight.SemiBold, modifier = Modifier.weight(1f))
                                        BadgeChip(tier.level.replaceFirstChar { it.uppercase() }, tBg, tFg)
                                    }
                                    if (tier.description.isNotBlank()) {
                                        Spacer(Modifier.height(4.dp))
                                        Text(tier.description, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                                    }
                                    if (tier.examples.isNotEmpty()) {
                                        Spacer(Modifier.height(6.dp))
                                        Text("Examples:", style = MaterialTheme.typography.labelSmall, fontWeight = FontWeight.SemiBold, color = MaterialTheme.colorScheme.onSurfaceVariant)
                                        tier.examples.forEach { BulletItem(it, Amber500) }
                                    }
                                    if (tier.requirements.isNotEmpty()) {
                                        Spacer(Modifier.height(4.dp))
                                        Text("Requirements:", style = MaterialTheme.typography.labelSmall, fontWeight = FontWeight.SemiBold, color = MaterialTheme.colorScheme.onSurfaceVariant)
                                        tier.requirements.forEach { BulletItem(it, Emerald500, Icons.Filled.CheckCircle) }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            // Guardrails
            if (f.guardrails.isNotEmpty()) {
                item {
                    DetailCard(title = "Guardrails", icon = Icons.Filled.Security, iconTint = Violet500) {
                        f.guardrails.forEach { BulletItem(it, Violet500) }
                    }
                }
            }

            // Technical Requirements
            if (f.technicalRequirements.isNotEmpty()) {
                item {
                    DetailCard(title = "Technical Requirements", icon = Icons.Filled.Code, iconTint = Blue500) {
                        f.technicalRequirements.forEach { BulletItem(it, Blue500) }
                    }
                }
            }

            // Exposure Areas
            if (f.exposureAreas.isNotEmpty()) {
                item {
                    DetailCard(title = "Exposure Areas", icon = Icons.Filled.Warning, iconTint = Amber500) {
                        f.exposureAreas.forEach { BulletItem(it, Amber500) }
                    }
                }
            }

            // Implementation Guidance
            if (f.implementationGuidance.isNotEmpty()) {
                item {
                    DetailCard(title = "Implementation Guidance", icon = Icons.Filled.PlayArrow, iconTint = Green500) {
                        f.implementationGuidance.forEach { BulletItem(it, Green500, Icons.Filled.ArrowForward) }
                    }
                }
            }

            // Industry Impact
            if (f.industryImpact.isNotEmpty()) {
                item {
                    DetailCard(title = "Industry Impact", icon = Icons.Filled.Business, iconTint = Blue500) {
                        f.industryImpact.forEach { impact ->
                            val (iBg, iFg) = impactColors(impact.impact)
                            Row(modifier = Modifier.fillMaxWidth().padding(bottom = 8.dp), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.Top) {
                                Column(modifier = Modifier.weight(1f)) {
                                    Text(impact.sector, style = MaterialTheme.typography.bodySmall, fontWeight = FontWeight.SemiBold)
                                    if (impact.notes.isNotBlank()) Text(impact.notes, style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                                }
                                Spacer(Modifier.width(8.dp))
                                BadgeChip(impact.impact.replaceFirstChar { it.uppercase() }, iBg, iFg)
                            }
                            Box(modifier = Modifier.fillMaxWidth().height(1.dp).background(Dark700))
                        }
                    }
                }
            }

            // Timeline
            if (f.timeline.isNotEmpty()) {
                item {
                    DetailCard(title = "Timeline", icon = Icons.Filled.Timeline, iconTint = Blue500) {
                        f.timeline.forEach { event ->
                            val dotColor = timelineTypeColor(event.type)
                            Row(modifier = Modifier.padding(bottom = 10.dp), verticalAlignment = Alignment.Top, horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                                BadgeChip(event.date, Blue100, dotColor)
                                Text(event.milestone, style = MaterialTheme.typography.bodySmall, modifier = Modifier.weight(1f))
                            }
                        }
                    }
                }
            }

            // Compliance Roadmap
            if (f.complianceRoadmap.isNotEmpty()) {
                item {
                    DetailCard(title = "Compliance Roadmap", icon = Icons.Filled.Route, iconTint = Green500) {
                        f.complianceRoadmap.forEachIndexed { i, step ->
                            Row(modifier = Modifier.padding(bottom = 8.dp), verticalAlignment = Alignment.Top, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                                Surface(color = Green100, contentColor = Green500, shape = RoundedCornerShape(50), modifier = Modifier.size(20.dp)) {
                                    Box(contentAlignment = Alignment.Center) { Text("${i + 1}", style = MaterialTheme.typography.labelSmall, fontWeight = FontWeight.Bold) }
                                }
                                Text(step, style = MaterialTheme.typography.bodySmall, modifier = Modifier.weight(1f))
                            }
                        }
                    }
                }
            }

            // Notable Enforcement Cases
            if (f.notableEnforcementCases.isNotEmpty()) {
                item {
                    DetailCard(title = "Notable Enforcement Cases", icon = Icons.Filled.Policy, iconTint = Rose500) {
                        f.notableEnforcementCases.forEach { case ->
                            Row(modifier = Modifier.padding(bottom = 6.dp), verticalAlignment = Alignment.Top, horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                                Icon(Icons.Filled.FiberManualRecord, null, tint = Rose500, modifier = Modifier.size(8.dp).padding(top = 4.dp))
                                Text(case, style = MaterialTheme.typography.bodySmall, modifier = Modifier.weight(1f))
                            }
                        }
                    }
                }
            }

            // Related Frameworks
            if (f.relatedFrameworks.isNotEmpty()) {
                item {
                    val relatedNames = remember(f.relatedFrameworks) {
                        f.relatedFrameworks.map { rid -> allCompliance.find { it.slug == rid || it.id == rid }?.name ?: rid }
                    }
                    DetailCard(title = "Related Frameworks", icon = Icons.Filled.Schema, iconTint = Blue500) {
                        TagRow(relatedNames, wrap = true)
                    }
                }
            }

            // Tags
            if (f.tags.isNotEmpty()) {
                item {
                    Text("Tags", style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold)
                    Spacer(Modifier.height(6.dp))
                    TagRow(f.tags, wrap = true)
                }
            }
        }
    }
}
