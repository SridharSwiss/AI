package com.aihub.sridhar.app.ui.screens

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.ui.draw.clip
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

    Column(modifier = Modifier.fillMaxSize().background(MaterialTheme.colorScheme.background)) {
        TopAppBar(
            title = { Text("Case Studies", fontWeight = FontWeight.ExtraBold, color = MaterialTheme.colorScheme.onSurface, letterSpacing = (-0.5).sp) },
            colors = TopAppBarDefaults.topAppBarColors(containerColor = MaterialTheme.colorScheme.background),
        )
        Box(modifier = Modifier.fillMaxWidth().height(1.dp).background(Brush.horizontalGradient(listOf(NeonAmber.copy(alpha = 0.5f), NeonGreen.copy(alpha = 0.3f), Color.Transparent))))
        Row(modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp, vertical = 8.dp), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            FilterDropdown("Industry", industry, industries, { industry = it }, Modifier.weight(1f))
            FilterDropdown("AI Tool",  tag,      allTags,   { tag      = it }, Modifier.weight(1f))
        }
        Row(modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp).padding(bottom = 8.dp), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
            Text(if (all.isEmpty()) "Loading…" else "${filtered.size} of ${all.size} case studies", style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
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
            // Explicit color ensures visibility on background
            Text(
                cs.company,
                style      = MaterialTheme.typography.titleSmall,
                fontWeight = FontWeight.SemiBold,
                color      = MaterialTheme.colorScheme.onSurface,
                maxLines   = 1,
                overflow   = TextOverflow.Ellipsis,
            )
            Text(
                cs.title,
                style    = MaterialTheme.typography.labelSmall,
                color    = MaterialTheme.colorScheme.onSurfaceVariant,
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
    var tab by remember { mutableStateOf(0) }

    Scaffold(
        containerColor = MaterialTheme.colorScheme.background,
        topBar = {
            TopAppBar(
                title = { Text(cs?.company ?: "Loading…", fontWeight = FontWeight.ExtraBold, color = MaterialTheme.colorScheme.onSurface, maxLines = 1, overflow = TextOverflow.Ellipsis) },
                navigationIcon = { IconButton(onClick = onBack) { Icon(Icons.Filled.ArrowBack, "Back", tint = MaterialTheme.colorScheme.onSurface) } },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = MaterialTheme.colorScheme.background),
            )
        }
    ) { padding ->
        val cs = cs
        if (cs == null) { EmptyState("Loading…", Modifier.padding(padding)); return@Scaffold }
        val (indBg, indFg) = industryColors(cs.industry)

        Column(modifier = Modifier.fillMaxSize().padding(top = padding.calculateTopPadding())) {
            Row(
                modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp, vertical = 8.dp),
                horizontalArrangement = Arrangement.spacedBy(6.dp),
            ) {
                BadgeChip(cs.industry, indBg, indFg)
                if (cs.featured) BadgeChip("Featured", Purple100, Purple500)
            }
            TabRow(
                selectedTabIndex = tab,
                containerColor = MaterialTheme.colorScheme.background,
                contentColor = NeonAmber,
                divider = { Box(Modifier.fillMaxWidth().height(1.dp).background(MaterialTheme.colorScheme.surfaceVariant)) },
            ) {
                listOf("Story", "Solution", "Results").forEachIndexed { i, t ->
                    Tab(
                        selected = tab == i, onClick = { tab = i },
                        text = { Text(t, style = MaterialTheme.typography.labelMedium, fontWeight = if (tab == i) FontWeight.Bold else FontWeight.Normal, color = if (tab == i) NeonAmber else MaterialTheme.colorScheme.onSurfaceVariant) },
                    )
                }
            }
            when (tab) {
                0 -> LazyColumn(modifier = Modifier.weight(1f), contentPadding = PaddingValues(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                    item {
                        Text(cs.title, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold, color = MaterialTheme.colorScheme.onSurface)
                    }
                    if (cs.metrics.isNotEmpty()) item {
                        DetailCard(title = "Key Outcomes", icon = Icons.Filled.TrendingUp, iconTint = Emerald500) {
                            cs.metrics.forEach { metric ->
                                Row(modifier = Modifier.padding(bottom = 6.dp), verticalAlignment = Alignment.Top, horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                                    Icon(Icons.Filled.CheckCircle, null, tint = Emerald500, modifier = Modifier.size(14.dp).padding(top = 2.dp))
                                    Text(metric, style = MaterialTheme.typography.bodySmall, color = Emerald500, fontWeight = FontWeight.Medium)
                                }
                            }
                        }
                    }
                    item {
                        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                            if (cs.teamSize.isNotBlank() || cs.implementationTimeline.isNotBlank()) {
                                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                                    if (cs.teamSize.isNotBlank()) DarkStatChip("Team", cs.teamSize, NeonCyan, Modifier.weight(1f))
                                    if (cs.implementationTimeline.isNotBlank()) DarkStatChip("Timeline", cs.implementationTimeline, NeonViolet, Modifier.weight(1f))
                                }
                            }
                            if (cs.investmentEstimate.isNotBlank() || cs.annualReturn.isNotBlank()) {
                                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                                    if (cs.investmentEstimate.isNotBlank()) DarkStatChip("Investment", cs.investmentEstimate, NeonAmber, Modifier.weight(1f))
                                    if (cs.annualReturn.isNotBlank()) DarkStatChip("Annual Return", cs.annualReturn, NeonGreen, Modifier.weight(1f))
                                }
                            }
                            if (cs.paybackPeriod.isNotBlank() || cs.roiMultiple.isNotBlank()) {
                                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                                    if (cs.paybackPeriod.isNotBlank()) DarkStatChip("Payback", cs.paybackPeriod, NeonCyan, Modifier.weight(1f))
                                    if (cs.roiMultiple.isNotBlank()) DarkStatChip("ROI", cs.roiMultiple, NeonPink, Modifier.weight(1f))
                                }
                            }
                        }
                    }
                }
                1 -> LazyColumn(modifier = Modifier.weight(1f), contentPadding = PaddingValues(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                    if (cs.businessContext.isNotBlank() || cs.strategicDrivers.isNotEmpty()) item {
                        DetailCard(title = "Business Context", icon = Icons.Filled.Business, iconTint = Blue500) {
                            if (cs.businessContext.isNotBlank()) Text(cs.businessContext, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                            if (cs.strategicDrivers.isNotEmpty()) {
                                if (cs.businessContext.isNotBlank()) Spacer(Modifier.height(8.dp))
                                Text("Strategic Drivers", style = MaterialTheme.typography.labelSmall, fontWeight = FontWeight.SemiBold, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(bottom = 4.dp))
                                cs.strategicDrivers.forEach { BulletItem(it, Violet500) }
                            }
                        }
                    }
                    if (cs.problem.isNotBlank()) item {
                        DetailCard(title = "The Problem", icon = Icons.Filled.Warning, iconTint = Amber500) {
                            Text(cs.problem, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                        }
                    }
                    if (cs.solution.isNotBlank()) item {
                        DetailCard(title = "The Solution", icon = Icons.Filled.Lightbulb, iconTint = Violet500) {
                            Text(cs.solution, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                        }
                    }
                    if (cs.techStack.isNotEmpty() || cs.architecture.isNotBlank() || cs.dataRequirements.isNotBlank()) item {
                        DetailCard(title = "Technical Stack", icon = Icons.Filled.Code, iconTint = Blue500) {
                            if (cs.techStack.isNotEmpty()) {
                                Text("Tech Stack", style = MaterialTheme.typography.labelSmall, fontWeight = FontWeight.SemiBold, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(bottom = 4.dp))
                                TagRow(cs.techStack, wrap = true)
                                if (cs.architecture.isNotBlank() || cs.dataRequirements.isNotBlank()) Spacer(Modifier.height(8.dp))
                            }
                            if (cs.architecture.isNotBlank()) {
                                Text("Architecture", style = MaterialTheme.typography.labelSmall, fontWeight = FontWeight.SemiBold, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(bottom = 4.dp))
                                Text(cs.architecture, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                                if (cs.dataRequirements.isNotBlank()) Spacer(Modifier.height(8.dp))
                            }
                            if (cs.dataRequirements.isNotBlank()) {
                                Text("Data Requirements", style = MaterialTheme.typography.labelSmall, fontWeight = FontWeight.SemiBold, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(bottom = 4.dp))
                                Text(cs.dataRequirements, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                            }
                        }
                    }
                    if (cs.implementationPhases.isNotEmpty()) item {
                        DetailCard(title = "Implementation Phases", icon = Icons.Filled.Schema, iconTint = Blue500) {
                            cs.implementationPhases.forEachIndexed { index, phase ->
                                Row(modifier = Modifier.padding(bottom = 12.dp), verticalAlignment = Alignment.Top, horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                                    Box(modifier = Modifier.size(22.dp).clip(RoundedCornerShape(50)).background(Brush.linearGradient(listOf(Violet500.copy(0.3f), NeonViolet.copy(0.2f)))).border(1.dp, Violet500.copy(0.4f), RoundedCornerShape(50)), contentAlignment = Alignment.Center) {
                                        Text("${index + 1}", style = MaterialTheme.typography.labelSmall, fontWeight = FontWeight.Bold, color = NeonViolet)
                                    }
                                    Column(modifier = Modifier.weight(1f)) {
                                        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                                            Text(phase.phase, style = MaterialTheme.typography.bodySmall, fontWeight = FontWeight.SemiBold, color = MaterialTheme.colorScheme.onSurface, modifier = Modifier.weight(1f))
                                            BadgeChip(phase.duration, Blue100, Blue500)
                                        }
                                        if (phase.description.isNotBlank()) {
                                            Spacer(Modifier.height(4.dp))
                                            Text(phase.description, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                                        }
                                        if (phase.keyOutputs.isNotEmpty()) {
                                            Spacer(Modifier.height(4.dp))
                                            phase.keyOutputs.forEach { output -> BulletItem(output, Blue500) }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else -> LazyColumn(modifier = Modifier.weight(1f), contentPadding = PaddingValues(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                    if (cs.roiBreakdown.isNotEmpty()) item {
                        DetailCard(title = "ROI Breakdown", icon = Icons.Filled.BarChart, iconTint = Green500) {
                            cs.roiBreakdown.forEach { roiItem ->
                                Row(modifier = Modifier.fillMaxWidth().padding(bottom = 8.dp), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.Top) {
                                    Column(modifier = Modifier.weight(1f)) {
                                        Text(roiItem.category, style = MaterialTheme.typography.bodySmall, fontWeight = FontWeight.SemiBold, color = MaterialTheme.colorScheme.onSurface)
                                        if (roiItem.note.isNotBlank()) Text(roiItem.note, style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                                    }
                                    Spacer(Modifier.width(8.dp))
                                    Text(roiItem.value, style = MaterialTheme.typography.bodySmall, fontWeight = FontWeight.Bold, color = Green500)
                                }
                                Box(Modifier.fillMaxWidth().height(1.dp).background(MaterialTheme.colorScheme.surfaceVariant))
                            }
                        }
                    }
                    if (cs.challenges.isNotEmpty()) item {
                        DetailCard(title = "Challenges", icon = Icons.Filled.ReportProblem, iconTint = Amber500) {
                            cs.challenges.forEachIndexed { index, challenge ->
                                Row(modifier = Modifier.padding(bottom = 6.dp), verticalAlignment = Alignment.Top, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                                    Box(modifier = Modifier.size(20.dp).clip(RoundedCornerShape(50)).background(NeonAmber.copy(0.15f)).border(1.dp, NeonAmber.copy(0.3f), RoundedCornerShape(50)), contentAlignment = Alignment.Center) {
                                        Text("${index + 1}", style = MaterialTheme.typography.labelSmall, fontWeight = FontWeight.Bold, color = NeonAmber)
                                    }
                                    Text(challenge, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.weight(1f))
                                }
                            }
                        }
                    }
                    val hasGov = cs.governanceFramework.isNotEmpty() || cs.dataPrivacy.isNotEmpty() || cs.humanOversight.isNotBlank() || cs.regulatoryConsiderations.isNotEmpty()
                    if (hasGov) item {
                        DetailCard(title = "Governance", icon = Icons.Filled.Shield, iconTint = Rose500) {
                            if (cs.governanceFramework.isNotEmpty()) {
                                Text("Governance Framework", style = MaterialTheme.typography.labelSmall, fontWeight = FontWeight.SemiBold, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(bottom = 4.dp))
                                cs.governanceFramework.forEach { BulletItem(it, Rose500, Icons.Filled.CheckCircle) }
                                Spacer(Modifier.height(8.dp))
                            }
                            if (cs.dataPrivacy.isNotEmpty()) {
                                Text("Data Privacy", style = MaterialTheme.typography.labelSmall, fontWeight = FontWeight.SemiBold, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(bottom = 4.dp))
                                cs.dataPrivacy.forEach { BulletItem(it, Blue500, Icons.Filled.CheckCircle) }
                            }
                            if (cs.humanOversight.isNotBlank()) {
                                Spacer(Modifier.height(8.dp))
                                Box(modifier = Modifier.fillMaxWidth().clip(RoundedCornerShape(8.dp)).background(Blue500.copy(0.1f)).border(1.dp, Blue500.copy(0.25f), RoundedCornerShape(8.dp)).padding(10.dp)) {
                                    Text(cs.humanOversight, style = MaterialTheme.typography.bodySmall, color = Blue500)
                                }
                            }
                        }
                    }
                    if (cs.lessonsLearned.isNotEmpty() || cs.whatWorkedWell.isNotEmpty()) item {
                        DetailCard(title = "Lessons & Wins", icon = Icons.Filled.School, iconTint = Purple500) {
                            if (cs.lessonsLearned.isNotEmpty()) {
                                if (cs.whatWorkedWell.isNotEmpty()) Text("Lessons Learned", style = MaterialTheme.typography.labelSmall, fontWeight = FontWeight.SemiBold, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(bottom = 4.dp))
                                cs.lessonsLearned.forEach { BulletItem(it, Purple500) }
                            }
                            if (cs.whatWorkedWell.isNotEmpty()) {
                                if (cs.lessonsLearned.isNotEmpty()) Spacer(Modifier.height(8.dp))
                                Text("What Worked Well", style = MaterialTheme.typography.labelSmall, fontWeight = FontWeight.SemiBold, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(bottom = 4.dp))
                                cs.whatWorkedWell.forEach { BulletItem(it, Emerald500, Icons.Filled.CheckCircle) }
                            }
                        }
                    }
                    if (cs.outcome.isNotBlank()) item {
                        DetailCard(title = "Outcome", icon = Icons.Filled.OutlinedFlag, iconTint = Emerald500) {
                            Text(cs.outcome, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                        }
                    }
                    if (cs.openSourceRepos.isNotEmpty()) item {
                        DetailCard(title = "Open Source", icon = Icons.Filled.Code, iconTint = Zinc400) {
                            cs.openSourceRepos.forEach { repo ->
                                Box(modifier = Modifier.fillMaxWidth().padding(bottom = 6.dp).clip(RoundedCornerShape(8.dp)).background(MaterialTheme.colorScheme.surfaceVariant).border(1.dp, MaterialTheme.colorScheme.outline, RoundedCornerShape(8.dp))) {
                                    Row(modifier = Modifier.padding(10.dp).fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.Top) {
                                        Column(modifier = Modifier.weight(1f)) {
                                            Text(repo.name, style = MaterialTheme.typography.bodySmall, fontWeight = FontWeight.SemiBold, color = MaterialTheme.colorScheme.onSurface)
                                            if (repo.description.isNotBlank()) Text(repo.description, style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                                        }
                                        if (repo.stars.isNotBlank()) {
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
                    if (cs.references.isNotEmpty()) item {
                        DetailCard(title = "References", icon = Icons.Filled.Link, iconTint = Blue500) {
                            cs.references.forEach { ref ->
                                Row(modifier = Modifier.fillMaxWidth().clickable { uriHandler.openUri(ref.url) }.padding(vertical = 6.dp), verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                                    Icon(Icons.Filled.OpenInNew, null, tint = Blue500, modifier = Modifier.size(14.dp))
                                    Text(ref.label, style = MaterialTheme.typography.bodySmall, color = Blue500, modifier = Modifier.weight(1f), maxLines = 2, overflow = TextOverflow.Ellipsis)
                                }
                                Box(Modifier.fillMaxWidth().height(1.dp).background(MaterialTheme.colorScheme.surfaceVariant))
                            }
                        }
                    }
                    if (cs.tags.isNotEmpty()) item {
                        Text("Tags", style = MaterialTheme.typography.labelMedium, fontWeight = FontWeight.SemiBold, color = MaterialTheme.colorScheme.onSurfaceVariant)
                        Spacer(Modifier.height(8.dp))
                        TagRow(cs.tags, wrap = true)
                    }
                }
            }
        }
    }
}

@Composable
private fun DarkStatChip(label: String, value: String, accentColor: Color, modifier: Modifier = Modifier) {
    Box(
        modifier = modifier
            .clip(RoundedCornerShape(10.dp))
            .background(Brush.linearGradient(listOf(accentColor.copy(0.15f), MaterialTheme.colorScheme.surface)))
            .border(1.dp, Brush.linearGradient(listOf(accentColor.copy(0.4f), accentColor.copy(0.15f))), RoundedCornerShape(10.dp))
            .padding(10.dp),
    ) {
        Column {
            Text(label, style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
            Text(value, style = MaterialTheme.typography.bodySmall, fontWeight = FontWeight.Bold, color = accentColor, maxLines = 2)
        }
    }
}
