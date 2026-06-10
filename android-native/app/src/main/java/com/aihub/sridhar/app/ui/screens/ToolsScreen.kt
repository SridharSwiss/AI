package com.aihub.sridhar.app.ui.screens

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Build
import androidx.compose.material.icons.filled.OpenInNew
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalUriHandler
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import com.aihub.sridhar.app.data.models.Tool
import com.aihub.sridhar.app.data.repository.DataRepository
import com.aihub.sridhar.app.ui.components.*
import com.aihub.sridhar.app.ui.theme.*

private fun pricingColor(pricing: String) = when (pricing.lowercase()) {
    "free"       -> Pair(Green100, Green500)
    "freemium"   -> Pair(Blue100, Blue500)
    "paid"       -> Pair(Amber100, Amber500)
    "enterprise" -> Pair(Purple100, Purple500)
    else         -> Pair(Blue100, Blue500)
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ToolsScreen(repo: DataRepository, onToolClick: (String) -> Unit) {
    val allTools = repo.tools
    val categories = remember { listOf("All") + allTools.map { it.category }.distinct().sorted() }
    val pricings   = remember { listOf("All", "Free", "Freemium", "Paid", "Enterprise") }

    var category by remember { mutableStateOf("All") }
    var pricing  by remember { mutableStateOf("All") }

    val filtered = remember(category, pricing) {
        allTools.filter {
            (category == "All" || it.category == category) &&
            (pricing  == "All" || it.pricing.equals(pricing, ignoreCase = true))
        }
    }

    Column {
        TopAppBar(title = { Text("AI Tools", fontWeight = FontWeight.Bold) })

        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp, vertical = 8.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp),
        ) {
            FilterDropdown("Category", category, categories, { category = it }, Modifier.weight(1f))
            FilterDropdown("Pricing",  pricing,  pricings,   { pricing  = it }, Modifier.weight(1f))
        }

        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp)
                .padding(bottom = 8.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically,
        ) {
            Text(
                "${filtered.size} of ${allTools.size} tools",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
            if (category != "All" || pricing != "All") {
                TextButton(onClick = { category = "All"; pricing = "All" }) {
                    Text("Clear", style = MaterialTheme.typography.labelSmall)
                }
            }
        }

        HorizontalDivider()

        LazyColumn {
            items(filtered, key = { it.slug }) { tool ->
                ToolRow(tool = tool, onClick = { onToolClick(tool.slug) })
                HorizontalDivider(color = MaterialTheme.colorScheme.outline.copy(alpha = 0.3f))
            }
        }
    }
}

@Composable
fun ToolRow(tool: Tool, onClick: () -> Unit) {
    val (bg, fg) = pricingColor(tool.pricing)
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick)
            .padding(horizontal = 16.dp, vertical = 12.dp),
        horizontalArrangement = Arrangement.spacedBy(12.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Surface(
            color = Violet100,
            contentColor = Violet600,
            shape = RoundedCornerShape(10.dp),
            modifier = Modifier.size(40.dp),
        ) {
            Box(contentAlignment = Alignment.Center) {
                Icon(Icons.Filled.Build, null, modifier = Modifier.size(20.dp))
            }
        }

        Column(modifier = Modifier.weight(1f)) {
            Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                Text(tool.name, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold, maxLines = 1, overflow = TextOverflow.Ellipsis)
                if (tool.featured) BadgeChip("Featured", Purple100, Purple500)
            }
            Text("${tool.vendor} · ${tool.category}", style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant, maxLines = 1)
        }

        BadgeChip(tool.pricing, bg, fg)
    }
}

/* ── Tool detail ─────────────────────────────────────────── */

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ToolDetailScreen(repo: DataRepository, slug: String, onBack: () -> Unit) {
    val tool = remember(slug) { repo.tools.find { it.slug == slug } }
    val uriHandler = LocalUriHandler.current
    val (pricingBg, pricingFg) = pricingColor(tool?.pricing ?: "")

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(tool?.name ?: "Tool", fontWeight = FontWeight.Bold, maxLines = 1, overflow = TextOverflow.Ellipsis) },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.Filled.Build, null)  // back arrow
                    }
                },
                actions = {
                    tool?.website?.let { url ->
                        IconButton(onClick = { uriHandler.openUri(url) }) {
                            Icon(Icons.Filled.OpenInNew, "Open website")
                        }
                    }
                }
            )
        }
    ) { padding ->
        if (tool == null) {
            EmptyState("Tool not found", Modifier.padding(padding))
            return@Scaffold
        }
        LazyColumn(contentPadding = PaddingValues(start = 16.dp, end = 16.dp, top = padding.calculateTopPadding() + 8.dp, bottom = 16.dp)) {
            item {
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp), modifier = Modifier.padding(bottom = 16.dp)) {
                    BadgeChip(tool.pricing, pricingBg, pricingFg)
                    BadgeChip(tool.category, Blue100, Blue500)
                    if (tool.featured) BadgeChip("Featured", Purple100, Purple500)
                }
            }
            item {
                Text(tool.tagline, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold, modifier = Modifier.padding(bottom = 8.dp))
                Text(tool.description, style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(bottom = 16.dp))
            }
            if (tool.metrics.isNotEmpty()) {
                item {
                    Text("Key Metrics", style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold, modifier = Modifier.padding(bottom = 8.dp))
                    tool.metrics.forEach { metric ->
                        Row(modifier = Modifier.padding(bottom = 4.dp), verticalAlignment = Alignment.Top) {
                            Text("• ", color = Green500, fontWeight = FontWeight.Bold)
                            Text(metric, style = MaterialTheme.typography.bodySmall)
                        }
                    }
                    Spacer(Modifier.height(16.dp))
                }
            }
            item {
                Text("Details", style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold, modifier = Modifier.padding(bottom = 8.dp))
                DetailRow("Vendor",  tool.vendor)
                DetailRow("Category", tool.category)
                DetailRow("Pricing", tool.pricing)
                if (tool.founded.isNotBlank()) DetailRow("Founded", tool.founded)
                if (tool.employees.isNotBlank()) DetailRow("Employees", tool.employees)
            }
            if (tool.tags.isNotEmpty()) {
                item {
                    Spacer(Modifier.height(16.dp))
                    Text("Tags", style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold, modifier = Modifier.padding(bottom = 8.dp))
                    TagRow(tool.tags)
                }
            }
        }
    }
}
