package com.aihub.sridhar.app.ui.screens

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.TrendingUp
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import com.aihub.sridhar.app.data.models.CaseStudy
import com.aihub.sridhar.app.data.repository.DataRepository
import com.aihub.sridhar.app.ui.components.*
import com.aihub.sridhar.app.ui.theme.*

private fun industryColors(industry: String) = when (industry) {
    "Finance", "FinTech"    -> Pair(Green100, Green500)
    "Healthcare", "Pharma"  -> Pair(Blue100, Blue500)
    "Manufacturing"         -> Pair(Pink100, Pink500)
    "EdTech", "Education"   -> Pair(Purple100, Purple500)
    "Retail"                -> Pair(Amber100, Amber500)
    else                    -> Pair(Blue100, Blue500)
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CaseStudiesScreen(repo: DataRepository, onCaseStudyClick: (String) -> Unit) {
    val all        = repo.caseStudies
    val industries = remember { listOf("All") + all.map { it.industry }.distinct().sorted() }
    val allTags    = remember { listOf("All") + all.flatMap { it.tags }.distinct().sorted() }

    var industry by remember { mutableStateOf("All") }
    var tag      by remember { mutableStateOf("All") }

    val filtered = remember(industry, tag) {
        all.filter {
            (industry == "All" || it.industry == industry) &&
            (tag      == "All" || it.tags.contains(tag))
        }
    }

    Column {
        TopAppBar(title = { Text("Case Studies", fontWeight = FontWeight.Bold) })

        Row(modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp, vertical = 8.dp), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            FilterDropdown("Industry", industry, industries, { industry = it }, Modifier.weight(1f))
            FilterDropdown("AI Tool",  tag,      allTags,   { tag      = it }, Modifier.weight(1f))
        }

        Row(modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp).padding(bottom = 8.dp), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
            Text("${filtered.size} of ${all.size} case studies", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
            if (industry != "All" || tag != "All") {
                TextButton(onClick = { industry = "All"; tag = "All" }) { Text("Clear", style = MaterialTheme.typography.labelSmall) }
            }
        }

        HorizontalDivider()

        LazyColumn {
            items(filtered, key = { it.slug }) { cs ->
                CaseStudyRow(cs = cs, onClick = { onCaseStudyClick(cs.slug) })
                HorizontalDivider(color = MaterialTheme.colorScheme.outline.copy(alpha = 0.3f))
            }
        }
    }
}

@Composable
fun CaseStudyRow(cs: CaseStudy, onClick: () -> Unit) {
    val (bg, fg) = industryColors(cs.industry)
    Row(
        modifier = Modifier.fillMaxWidth().clickable(onClick = onClick).padding(horizontal = 16.dp, vertical = 12.dp),
        horizontalArrangement = Arrangement.spacedBy(12.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Surface(color = Emerald100, contentColor = Emerald500, shape = RoundedCornerShape(10.dp), modifier = Modifier.size(40.dp)) {
            Box(contentAlignment = Alignment.Center) { Icon(Icons.Filled.TrendingUp, null, modifier = Modifier.size(20.dp)) }
        }
        Column(modifier = Modifier.weight(1f)) {
            Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                Text(cs.company, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold, maxLines = 1, overflow = TextOverflow.Ellipsis, modifier = Modifier.weight(1f, fill = false))
                if (cs.featured) BadgeChip("Featured", Purple100, Purple500)
            }
            Text(cs.metrics.firstOrNull() ?: cs.industry, style = MaterialTheme.typography.labelSmall, color = Emerald500, maxLines = 1, overflow = TextOverflow.Ellipsis)
        }
        BadgeChip(cs.industry, bg, fg)
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CaseStudyDetailScreen(repo: DataRepository, slug: String, onBack: () -> Unit) {
    val cs = remember(slug) { repo.caseStudies.find { it.slug == slug } }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(cs?.company ?: "Case Study", fontWeight = FontWeight.Bold, maxLines = 1, overflow = TextOverflow.Ellipsis) },
                navigationIcon = { IconButton(onClick = onBack) { Icon(Icons.Filled.TrendingUp, null) } },
            )
        }
    ) { padding ->
        if (cs == null) { EmptyState("Case study not found", Modifier.padding(padding)); return@Scaffold }
        val (bg, fg) = industryColors(cs.industry)
        LazyColumn(contentPadding = PaddingValues(start = 16.dp, end = 16.dp, top = padding.calculateTopPadding() + 8.dp, bottom = 16.dp)) {
            item {
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp), modifier = Modifier.padding(bottom = 16.dp)) {
                    BadgeChip(cs.industry, bg, fg)
                    if (cs.year.isNotBlank()) BadgeChip(cs.year, Blue100, Blue500)
                    if (cs.featured) BadgeChip("Featured", Purple100, Purple500)
                }
            }
            item {
                Text(cs.title, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold, modifier = Modifier.padding(bottom = 8.dp))
            }
            if (cs.metrics.isNotEmpty()) {
                item {
                    Text("Key Outcomes", style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold, modifier = Modifier.padding(bottom = 8.dp))
                    cs.metrics.forEach { metric ->
                        Row(modifier = Modifier.padding(bottom = 6.dp), verticalAlignment = Alignment.Top) {
                            Text("✓ ", color = Emerald500, fontWeight = FontWeight.Bold)
                            Text(metric, style = MaterialTheme.typography.bodySmall, color = Emerald500, fontWeight = FontWeight.Medium)
                        }
                    }
                    Spacer(Modifier.height(12.dp))
                }
            }
            if (cs.summary.isNotBlank()) {
                item { SectionBlock("Summary", cs.summary) }
            }
            if (cs.challenge.isNotBlank()) {
                item { SectionBlock("Challenge", cs.challenge) }
            }
            if (cs.solution.isNotBlank()) {
                item { SectionBlock("Solution", cs.solution) }
            }
            if (cs.results.isNotBlank()) {
                item { SectionBlock("Results", cs.results) }
            }
            if (cs.toolsUsed.isNotEmpty()) {
                item {
                    Spacer(Modifier.height(8.dp))
                    Text("Tools Used", style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold, modifier = Modifier.padding(bottom = 8.dp))
                    TagRow(cs.toolsUsed)
                }
            }
            if (cs.tags.isNotEmpty()) {
                item {
                    Spacer(Modifier.height(12.dp))
                    Text("Tags", style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold, modifier = Modifier.padding(bottom = 8.dp))
                    TagRow(cs.tags)
                }
            }
        }
    }
}

@Composable
private fun SectionBlock(title: String, body: String) {
    Column(modifier = Modifier.padding(bottom = 12.dp)) {
        Text(title, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold, modifier = Modifier.padding(bottom = 4.dp))
        Text(body, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
    }
}
