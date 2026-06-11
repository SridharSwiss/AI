package com.aihub.sridhar.app.ui.screens

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalUriHandler
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.aihub.sridhar.app.data.models.CaseStudy
import com.aihub.sridhar.app.data.repository.DataRepository
import com.aihub.sridhar.app.ui.components.*
import com.aihub.sridhar.app.ui.theme.*

private fun industryColors(industry: String) = when (industry) {
    "Finance", "FinTech", "Banking" -> Pair(Green100, Green500)
    "Healthcare", "Pharma"          -> Pair(Blue100, Blue500)
    "Manufacturing"                 -> Pair(Pink100, Pink500)
    "EdTech", "Education"           -> Pair(Purple100, Purple500)
    "Retail", "E-Commerce"          -> Pair(Amber100, Amber500)
    "Insurance"                     -> Pair(Emerald100, Emerald500)
    else                            -> Pair(Blue100, Blue500)
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CaseStudiesScreen(repo: DataRepository, onCaseStudyClick: (String) -> Unit) {
    var all by remember { mutableStateOf<List<CaseStudy>>(emptyList()) }
    LaunchedEffect(Unit) { all = repo.loadCaseStudies() }

    val industries = remember(all) { listOf("All") + all.map { it.industry }.distinct().sorted() }
    val allTags    = remember(all) { listOf("All") + all.flatMap { it.tags }.distinct().sorted() }

    var industry by remember { mutableStateOf("All") }
    var tag      by remember { mutableStateOf("All") }

    val filtered = remember(all, industry, tag) {
        all.filter {
            (industry == "All" || it.industry == industry) &&
            (tag      == "All" || it.tags.contains(tag))
        }
    }

    Column(modifier = Modifier.fillMaxSize().background(Dark900)) {
        TopAppBar(
            title = { Text("Case Studies", fontWeight = FontWeight.ExtraBold, color = TextPrimary, letterSpacing = (-0.5).sp) },
            colors = TopAppBarDefaults.topAppBarColors(containerColor = Dark900),
        )
        Box(modifier = Modifier.fillMaxWidth().height(1.dp).background(Brush.horizontalGradient(listOf(NeonAmber.copy(alpha = 0.5f), NeonGreen.copy(alpha = 0.3f), Color.Transparent))))
        Row(modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp, vertical = 8.dp), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            FilterDropdown("Industry", industry, industries, { industry = it }, Modifier.weight(1f))
            FilterDropdown("AI Tool",  tag,      allTags,   { tag      = it }, Modifier.weight(1f))
        }
        Row(modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp).padding(bottom = 8.dp), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
            Text(if (all.isEmpty()) "Loading…" else "${filtered.size} of ${all.size} case studies", style = MaterialTheme.typography.labelSmall, color = TextMuted)
            if (industry != "All" || tag != "All") {
                TextButton(onClick = { industry = "All"; tag = "All" }) { Text("Clear", style = MaterialTheme.typography.labelSmall, color = NeonViolet) }
            }
        }
        LazyColumn {
            items(filtered, key = { it.slug }) { cs ->
                CaseStudyRow(cs = cs, onClick = { onCaseStudyClick(cs.slug) })
                Box(modifier = Modifier.fillMaxWidth().padding(start = 68.dp).height(1.dp).background(Brush.horizontalGradient(listOf(NeonAmber.copy(alpha = 0.08f), Color.Transparent))))
            }
        }
    }
}

@Composable
fun CaseStudyRow(cs: CaseStudy, onClick: () -> Unit) {
    val (bg, fg) = industryColors(cs.industry)
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick)
            .padding(horizontal = 16.dp, vertical = 11.dp),
        horizontalArrangement = Arrangement.spacedBy(12.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        // Uniform gradient icon box — matches Tools/Companies/Compliance style
        Box(
            modifier = Modifier
                .size(44.dp)
                .background(
                    Brush.linearGradient(listOf(NeonAmber.copy(alpha = 0.22f), NeonGreen.copy(alpha = 0.12f))),
                    RoundedCornerShape(12.dp),
                )
                .border(
                    1.dp,
                    Brush.linearGradient(listOf(NeonAmber.copy(0.40f), NeonGreen.copy(0.25f))),
                    RoundedCornerShape(12.dp),
                ),
            contentAlignment = Alignment.Center,
        ) {
            Icon(Icons.Filled.TrendingUp, null, tint = NeonAmber, modifier = Modifier.size(22.dp))
        }
        Column(modifier = Modifier.weight(1f)) {
            // Explicit color = TextPrimary ensures visibility on Dark900 background
            Text(
                cs.company,
                style      = MaterialTheme.typography.titleSmall,
                fontWeight = FontWeight.SemiBold,
                color      = TextPrimary,
                maxLines   = 1,
                overflow   = TextOverflow.Ellipsis,
            )
            Text(
                cs.title,
                style    = MaterialTheme.typography.labelSmall,
                color    = TextSecondary,
                maxLines = 1,
                overflow = TextOverflow.Ellipsis,
            )
        }
        Column(horizontalAlignment = Alignment.End) {
            BadgeChip(cs.industry, bg, fg)
            if (cs.featured) {
                Spacer(Modifier.height(4.dp))
                BadgeChip("Featured", Purple100, Purple500)
            }
        }
    }
}

/* ── Case study detail ───────────────────────────────────── */

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CaseStudyDetailScreen(repo: DataRepository, slug: String, onBack: () -> Unit) {
    var cs by remember { mutableStateOf<CaseStudy?>(null) }
    LaunchedEffect(slug) { cs = repo.loadCaseStudies().find { it.slug == slug } }
    val uriHandler = LocalUriHandler.current

    Scaffold(
        containerColor = Dark900,
        topBar = {
            TopAppBar(
                title = { Text(cs?.company ?: "Loading…", fontWeight = FontWeight.ExtraBold, color = TextPrimary, maxLines = 1, overflow = TextOverflow.Ellipsis) },
                navigationIcon = { IconButton(onClick = onBack) { Icon(Icons.Filled.ArrowBack, "Back", tint = TextPrimary) } },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = Dark900),
            )
        }
    ) { padding ->
        val cs = cs
        if (cs == null) { EmptyState("Loading…", Modifier.padding(padding)); return@Scaffold }
        val (indBg, indFg) = industryColors(cs.industry)

        LazyColumn(contentPadding = PaddingValues(start = 16.dp, end = 16.dp, top = padding.calculateTopPadding() + 8.dp, bottom = 24.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {

            // Badges
            item {
                Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                    BadgeChip(cs.industry, indBg, indFg)
                    if (cs.featured) BadgeChip("Featured", Purple100, Purple500)
                }
            }

            // Title
            item {
                Text(cs.title, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
            }

            // Key metrics (outcome highlights)
            if (cs.metrics.isNotEmpty()) {
                item {
                    DetailCard(title = "Key Outcomes", icon = Icons.Filled.TrendingUp, iconTint = Emerald500) {
                        cs.metrics.forEach { metric ->
                            Row(modifier = Modifier.padding(bottom = 6.dp), verticalAlignment = Alignment.Top, horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                                Icon(Icons.Filled.CheckCircle, null, tint = Emerald500, modifier = Modifier.size(14.dp).padding(top = 2.dp))
                                Text(metric, style = MaterialTheme.typography.bodySmall, color = Emerald500, fontWeight = FontWeight.Medium)
                            }
                        }
                    }
                }
            }

            // Sidebar stats
            item {
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    if (cs.teamSize.isNotBlank()) StatChip("Team", cs.teamSize, Modifier.weight(1f))
                    if (cs.implementationTimeline.isNotBlank()) StatChip("Timeline", cs.implementationTimeline, Modifier.weight(1f))
                }
                if (cs.investmentEstimate.isNotBlank() || cs.annualReturn.isNotBlank()) {
                    Spacer(Modifier.height(8.dp))
                    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        if (cs.investmentEstimate.isNotBlank()) StatChip("Investment", cs.investmentEstimate, Modifier.weight(1f), containerColor = Amber100, contentColor = Amber500)
                        if (cs.annualReturn.isNotBlank()) StatChip("Annual Return", cs.annualReturn, Modifier.weight(1f), containerColor = Emerald100, contentColor = Emerald500)
                    }
                }
                if (cs.paybackPeriod.isNotBlank() || cs.roiMultiple.isNotBlank()) {
                    Spacer(Modifier.height(8.dp))
                    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        if (cs.paybackPeriod.isNotBlank()) StatChip("Payback", cs.paybackPeriod, Modifier.weight(1f), containerColor = Blue100, contentColor = Blue500)
                        if (cs.roiMultiple.isNotBlank()) StatChip("ROI Multiple", cs.roiMultiple, Modifier.weight(1f), containerColor = Violet100, contentColor = Violet600)
                    }
                }
            }

            // Business Context + Strategic Drivers
            if (cs.businessContext.isNotBlank() || cs.strategicDrivers.isNotEmpty()) {
                item {
                    DetailCard(title = "Business Context", icon = Icons.Filled.Business, iconTint = Blue500) {
                        if (cs.businessContext.isNotBlank()) {
                            Text(cs.businessContext, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                        }
                        if (cs.strategicDrivers.isNotEmpty()) {
                            if (cs.businessContext.isNotBlank()) Spacer(Modifier.height(8.dp))
                            Text("Strategic Drivers", style = MaterialTheme.typography.labelSmall, fontWeight = FontWeight.SemiBold, modifier = Modifier.padding(bottom = 4.dp))
                            cs.strategicDrivers.forEach { BulletItem(it, Violet500) }
                        }
                    }
                }
            }

            // Problem
            if (cs.problem.isNotBlank()) {
                item {
                    DetailCard(title = "The Problem", icon = Icons.Filled.Warning, iconTint = Amber500) {
                        Text(cs.problem, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                    }
                }
            }

            // Solution
            if (cs.solution.isNotBlank()) {
                item {
                    DetailCard(title = "The Solution", icon = Icons.Filled.Lightbulb, iconTint = Violet500) {
                        Text(cs.solution, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                    }
                }
            }

            // Tech Stack + Architecture
            if (cs.techStack.isNotEmpty() || cs.architecture.isNotBlank() || cs.dataRequirements.isNotBlank()) {
                item {
                    DetailCard(title = "Technical Implementation", icon = Icons.Filled.Code, iconTint = Blue500) {
                        if (cs.techStack.isNotEmpty()) {
                            Text("Tech Stack", style = MaterialTheme.typography.labelSmall, fontWeight = FontWeight.SemiBold, modifier = Modifier.padding(bottom = 4.dp))
                            TagRow(cs.techStack, wrap = true)
                            Spacer(Modifier.height(8.dp))
                        }
                        if (cs.architecture.isNotBlank()) {
                            Text("Architecture", style = MaterialTheme.typography.labelSmall, fontWeight = FontWeight.SemiBold, modifier = Modifier.padding(bottom = 4.dp))
                            Text(cs.architecture, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                            Spacer(Modifier.height(8.dp))
                        }
                        if (cs.dataRequirements.isNotBlank()) {
                            Text("Data Requirements", style = MaterialTheme.typography.labelSmall, fontWeight = FontWeight.SemiBold, modifier = Modifier.padding(bottom = 4.dp))
                            Text(cs.dataRequirements, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                        }
                    }
                }
            }

            // ROI Breakdown
            if (cs.roiBreakdown.isNotEmpty()) {
                item {
                    DetailCard(title = "ROI Breakdown", icon = Icons.Filled.BarChart, iconTint = Green500) {
                        cs.roiBreakdown.forEach { item ->
                            Row(modifier = Modifier.fillMaxWidth().padding(bottom = 8.dp), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.Top) {
                                Column(modifier = Modifier.weight(1f)) {
                                    Text(item.category, style = MaterialTheme.typography.bodySmall, fontWeight = FontWeight.SemiBold)
                                    if (item.note.isNotBlank()) Text(item.note, style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                                }
                                Spacer(Modifier.width(8.dp))
                                Text(item.value, style = MaterialTheme.typography.bodySmall, fontWeight = FontWeight.Bold, color = Green500)
                            }
                            HorizontalDivider(color = MaterialTheme.colorScheme.outline.copy(alpha = 0.3f))
                        }
                    }
                }
            }

            // Implementation Phases
            if (cs.implementationPhases.isNotEmpty()) {
                item {
                    DetailCard(title = "Implementation Phases", icon = Icons.Filled.Schema, iconTint = Blue500) {
                        cs.implementationPhases.forEachIndexed { index, phase ->
                            Row(modifier = Modifier.padding(bottom = 12.dp), verticalAlignment = Alignment.Top, horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                                Surface(color = Violet600, contentColor = androidx.compose.ui.graphics.Color.White, shape = RoundedCornerShape(50), modifier = Modifier.size(22.dp)) {
                                    Box(contentAlignment = Alignment.Center) { Text("${index + 1}", style = MaterialTheme.typography.labelSmall, fontWeight = FontWeight.Bold) }
                                }
                                Column(modifier = Modifier.weight(1f)) {
                                    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                                        Text(phase.phase, style = MaterialTheme.typography.bodySmall, fontWeight = FontWeight.SemiBold, modifier = Modifier.weight(1f))
                                        BadgeChip(phase.duration, Blue100, Blue500)
                                    }
                                    if (phase.description.isNotBlank()) {
                                        Spacer(Modifier.height(4.dp))
                                        Text(phase.description, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                                    }
                                    if (phase.keyOutputs.isNotEmpty()) {
                                        Spacer(Modifier.height(4.dp))
                                        Text("Outputs:", style = MaterialTheme.typography.labelSmall, fontWeight = FontWeight.SemiBold, color = MaterialTheme.colorScheme.onSurfaceVariant)
                                        phase.keyOutputs.forEach { output -> BulletItem(output, Blue500) }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            // Challenges
            if (cs.challenges.isNotEmpty()) {
                item {
                    DetailCard(title = "Challenges", icon = Icons.Filled.ReportProblem, iconTint = Amber500) {
                        cs.challenges.forEachIndexed { index, challenge ->
                            Row(modifier = Modifier.padding(bottom = 6.dp), verticalAlignment = Alignment.Top, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                                Surface(color = Amber100, contentColor = Amber500, shape = RoundedCornerShape(50), modifier = Modifier.size(20.dp)) {
                                    Box(contentAlignment = Alignment.Center) { Text("${index + 1}", style = MaterialTheme.typography.labelSmall, fontWeight = FontWeight.Bold) }
                                }
                                Text(challenge, style = MaterialTheme.typography.bodySmall, modifier = Modifier.weight(1f))
                            }
                        }
                    }
                }
            }

            // Governance & Compliance
            val hasGov = cs.governanceFramework.isNotEmpty() || cs.dataPrivacy.isNotEmpty() || cs.humanOversight.isNotBlank() || cs.regulatoryConsiderations.isNotEmpty()
            if (hasGov) {
                item {
                    DetailCard(title = "Governance & Compliance", icon = Icons.Filled.Shield, iconTint = Rose500) {
                        if (cs.governanceFramework.isNotEmpty()) {
                            Text("Governance Framework", style = MaterialTheme.typography.labelSmall, fontWeight = FontWeight.SemiBold, modifier = Modifier.padding(bottom = 4.dp))
                            cs.governanceFramework.forEach { BulletItem(it, Rose500, Icons.Filled.CheckCircle) }
                            Spacer(Modifier.height(8.dp))
                        }
                        if (cs.dataPrivacy.isNotEmpty()) {
                            Text("Data Privacy", style = MaterialTheme.typography.labelSmall, fontWeight = FontWeight.SemiBold, modifier = Modifier.padding(bottom = 4.dp))
                            cs.dataPrivacy.forEach { BulletItem(it, Blue500, Icons.Filled.CheckCircle) }
                            Spacer(Modifier.height(8.dp))
                        }
                        if (cs.humanOversight.isNotBlank()) {
                            Text("Human Oversight", style = MaterialTheme.typography.labelSmall, fontWeight = FontWeight.SemiBold, modifier = Modifier.padding(bottom = 4.dp))
                            Surface(color = Blue100, shape = RoundedCornerShape(8.dp), modifier = Modifier.fillMaxWidth()) {
                                Text(cs.humanOversight, style = MaterialTheme.typography.bodySmall, color = Blue500, modifier = Modifier.padding(10.dp))
                            }
                            Spacer(Modifier.height(8.dp))
                        }
                        if (cs.regulatoryConsiderations.isNotEmpty()) {
                            Text("Regulatory Considerations", style = MaterialTheme.typography.labelSmall, fontWeight = FontWeight.SemiBold, modifier = Modifier.padding(bottom = 4.dp))
                            cs.regulatoryConsiderations.forEach { BulletItem(it, Violet500) }
                        }
                    }
                }
            }

            // Lessons Learned + What Worked
            if (cs.lessonsLearned.isNotEmpty() || cs.whatWorkedWell.isNotEmpty()) {
                item {
                    DetailCard(title = "Lessons Learned", icon = Icons.Filled.School, iconTint = Purple500) {
                        if (cs.lessonsLearned.isNotEmpty()) {
                            if (cs.whatWorkedWell.isNotEmpty()) Text("Lessons Learned", style = MaterialTheme.typography.labelSmall, fontWeight = FontWeight.SemiBold, modifier = Modifier.padding(bottom = 4.dp))
                            cs.lessonsLearned.forEachIndexed { i, lesson ->
                                Row(modifier = Modifier.padding(bottom = 6.dp), verticalAlignment = Alignment.Top, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                                    Surface(color = Purple100, contentColor = Purple500, shape = RoundedCornerShape(50), modifier = Modifier.size(20.dp)) {
                                        Box(contentAlignment = Alignment.Center) { Text("${i + 1}", style = MaterialTheme.typography.labelSmall, fontWeight = FontWeight.Bold) }
                                    }
                                    Text(lesson, style = MaterialTheme.typography.bodySmall, modifier = Modifier.weight(1f))
                                }
                            }
                        }
                        if (cs.whatWorkedWell.isNotEmpty()) {
                            if (cs.lessonsLearned.isNotEmpty()) Spacer(Modifier.height(8.dp))
                            Text("What Worked Well", style = MaterialTheme.typography.labelSmall, fontWeight = FontWeight.SemiBold, modifier = Modifier.padding(bottom = 4.dp))
                            cs.whatWorkedWell.forEach { BulletItem(it, Emerald500, Icons.Filled.CheckCircle) }
                        }
                    }
                }
            }

            // Outcome
            if (cs.outcome.isNotBlank()) {
                item {
                    DetailCard(title = "Outcome", icon = Icons.Filled.OutlinedFlag, iconTint = Emerald500) {
                        Text(cs.outcome, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                    }
                }
            }

            // Open Source Repos
            if (cs.openSourceRepos.isNotEmpty()) {
                item {
                    DetailCard(title = "Open Source", icon = Icons.Filled.Code, iconTint = Zinc400) {
                        cs.openSourceRepos.forEach { repo ->
                            ElevatedCard(modifier = Modifier.fillMaxWidth().padding(bottom = 6.dp), shape = RoundedCornerShape(8.dp)) {
                                Row(modifier = Modifier.padding(10.dp).fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.Top) {
                                    Column(modifier = Modifier.weight(1f)) {
                                        Text(repo.name, style = MaterialTheme.typography.bodySmall, fontWeight = FontWeight.SemiBold)
                                        if (repo.description.isNotBlank()) Text(repo.description, style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                                    }
                                    if (repo.stars.isNotBlank()) {
                                        Spacer(Modifier.width(6.dp))
                                        Row(verticalAlignment = Alignment.CenterVertically) {
                                            Icon(Icons.Filled.Star, null, tint = Amber500, modifier = Modifier.size(12.dp))
                                            Text(repo.stars, style = MaterialTheme.typography.labelSmall, color = Amber500)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            // References
            if (cs.references.isNotEmpty()) {
                item {
                    DetailCard(title = "References", icon = Icons.Filled.Link, iconTint = Blue500) {
                        cs.references.forEach { ref ->
                            Row(
                                modifier = Modifier.fillMaxWidth().clickable { uriHandler.openUri(ref.url) }.padding(vertical = 6.dp),
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.spacedBy(8.dp),
                            ) {
                                Icon(Icons.Filled.OpenInNew, null, tint = Blue500, modifier = Modifier.size(14.dp))
                                Text(ref.label, style = MaterialTheme.typography.bodySmall, color = Blue500, modifier = Modifier.weight(1f), maxLines = 2, overflow = TextOverflow.Ellipsis)
                            }
                            HorizontalDivider(color = MaterialTheme.colorScheme.outline.copy(alpha = 0.3f))
                        }
                    }
                }
            }

            // Tags
            if (cs.tags.isNotEmpty()) {
                item {
                    Text("Tags", style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold)
                    Spacer(Modifier.height(6.dp))
                    TagRow(cs.tags, wrap = true)
                }
            }
        }
    }
}

@Composable
private fun StatChip(
    label: String,
    value: String,
    modifier: Modifier = Modifier,
    containerColor: androidx.compose.ui.graphics.Color = MaterialTheme.colorScheme.surfaceVariant,
    contentColor: androidx.compose.ui.graphics.Color = MaterialTheme.colorScheme.onSurfaceVariant,
) {
    Surface(color = containerColor, shape = RoundedCornerShape(10.dp), modifier = modifier) {
        Column(modifier = Modifier.padding(10.dp)) {
            Text(label, style = MaterialTheme.typography.labelSmall, color = contentColor.copy(alpha = 0.7f))
            Text(value, style = MaterialTheme.typography.bodySmall, fontWeight = FontWeight.SemiBold, color = contentColor, maxLines = 2)
        }
    }
}
