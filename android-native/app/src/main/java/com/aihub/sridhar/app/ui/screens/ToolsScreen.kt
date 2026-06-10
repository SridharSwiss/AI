package com.aihub.sridhar.app.ui.screens

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
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalUriHandler
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import com.aihub.sridhar.app.data.models.PricingTier
import com.aihub.sridhar.app.data.models.Tool
import com.aihub.sridhar.app.data.repository.DataRepository
import com.aihub.sridhar.app.ui.components.*
import com.aihub.sridhar.app.ui.theme.*

fun pricingColor(pricing: String): Pair<Color, Color> = when (pricing.lowercase()) {
    "free"       -> Pair(Green100, Green500)
    "freemium"   -> Pair(Blue100, Blue500)
    "paid"       -> Pair(Amber100, Amber500)
    "enterprise" -> Pair(Purple100, Purple500)
    else         -> Pair(Blue100, Blue500)
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ToolsScreen(repo: DataRepository, onToolClick: (String) -> Unit) {
    var allTools by remember { mutableStateOf<List<Tool>>(emptyList()) }
    LaunchedEffect(Unit) { allTools = repo.loadTools() }

    val categories = remember(allTools) { listOf("All") + allTools.map { it.category }.distinct().sorted() }
    val pricings   = remember { listOf("All", "Free", "Freemium", "Paid", "Enterprise") }

    var category by remember { mutableStateOf("All") }
    var pricing  by remember { mutableStateOf("All") }

    val filtered = remember(allTools, category, pricing) {
        allTools.filter {
            (category == "All" || it.category == category) &&
            (pricing  == "All" || it.pricing.equals(pricing, ignoreCase = true))
        }
    }

    Column {
        TopAppBar(title = { Text("AI Tools", fontWeight = FontWeight.Bold) })
        Row(modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp, vertical = 8.dp), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            FilterDropdown("Category", category, categories, { category = it }, Modifier.weight(1f))
            FilterDropdown("Pricing",  pricing,  pricings,   { pricing  = it }, Modifier.weight(1f))
        }
        Row(modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp).padding(bottom = 8.dp), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
            Text("${filtered.size} of ${allTools.size} tools", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
            if (category != "All" || pricing != "All") {
                TextButton(onClick = { category = "All"; pricing = "All" }) { Text("Clear", style = MaterialTheme.typography.labelSmall) }
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
        modifier = Modifier.fillMaxWidth().clickable(onClick = onClick).padding(horizontal = 16.dp, vertical = 12.dp),
        horizontalArrangement = Arrangement.spacedBy(12.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Surface(color = Violet100, contentColor = Violet600, shape = RoundedCornerShape(10.dp), modifier = Modifier.size(40.dp)) {
            Box(contentAlignment = Alignment.Center) { Icon(Icons.Filled.Build, null, modifier = Modifier.size(20.dp)) }
        }
        Column(modifier = Modifier.weight(1f)) {
            Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                Text(tool.name, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold, maxLines = 1, overflow = TextOverflow.Ellipsis, modifier = Modifier.weight(1f, fill = false))
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
    var tool by remember { mutableStateOf<Tool?>(null) }
    var allTools by remember { mutableStateOf<List<Tool>>(emptyList()) }
    LaunchedEffect(slug) { allTools = repo.loadTools(); tool = allTools.find { it.slug == slug } }
    val uriHandler = LocalUriHandler.current

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(tool?.name ?: "Tool", fontWeight = FontWeight.Bold, maxLines = 1, overflow = TextOverflow.Ellipsis) },
                navigationIcon = { IconButton(onClick = onBack) { Icon(Icons.Filled.ArrowBack, "Back") } },
                actions = {
                    tool?.website?.let { url ->
                        IconButton(onClick = { uriHandler.openUri(url) }) { Icon(Icons.Filled.OpenInNew, "Open website") }
                    }
                }
            )
        }
    ) { padding ->
        val tool = tool
        if (tool == null) { EmptyState("Loading…", Modifier.padding(padding)); return@Scaffold }
        val (pricingBg, pricingFg) = pricingColor(tool.pricing)
        val alternatives = remember(tool, allTools) { allTools.filter { it.slug in tool.alternatives } }

        LazyColumn(contentPadding = PaddingValues(start = 16.dp, end = 16.dp, top = padding.calculateTopPadding() + 8.dp, bottom = 24.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {

            // Badges
            item {
                Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                    BadgeChip(tool.pricing, pricingBg, pricingFg)
                    BadgeChip(tool.category, Blue100, Blue500)
                    if (tool.featured) BadgeChip("Featured", Purple100, Purple500)
                    if (tool.apiAvailable) BadgeChip("API Available", Blue100, Blue500)
                }
            }

            // Tagline + description
            item {
                Text(tool.tagline, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
                Spacer(Modifier.height(6.dp))
                Text(tool.description, style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.onSurfaceVariant)
            }

            // Key metrics
            if (tool.metrics.isNotEmpty()) {
                item {
                    DetailCard(title = "Key Metrics", icon = Icons.Filled.TrendingUp, iconTint = Emerald500) {
                        tool.metrics.forEach { BulletItem(it, Emerald500) }
                    }
                }
            }

            // History
            if (tool.history.isNotBlank()) {
                item {
                    DetailCard(title = "How did ${tool.name} get started?", icon = Icons.Filled.Star, iconTint = Amber500) {
                        Text(tool.history, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                    }
                }
            }

            // Latest update
            if (tool.latestUpdate.isNotBlank()) {
                item {
                    DetailCard(title = "What's new in ${tool.name} in 2026?", icon = Icons.Filled.FlashOn, iconTint = Amber500) {
                        Text(tool.latestUpdate, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                    }
                }
            }

            // Pricing tiers
            if (tool.pricingTiers.isNotEmpty()) {
                item {
                    DetailCard(title = "How much does ${tool.name} cost?", icon = Icons.Filled.AttachMoney, iconTint = Green500) {
                        tool.pricingTiers.forEach { tier -> PricingTierCard(tier) }
                    }
                }
            }

            // Use cases
            if (tool.useCases.isNotEmpty()) {
                item {
                    DetailCard(title = "What can you do with ${tool.name}?", icon = Icons.Filled.Lightbulb, iconTint = Violet500) {
                        tool.useCases.forEach { BulletItem(it, Violet500, Icons.Filled.ArrowForward) }
                    }
                }
            }

            // Pros & Cons
            if (tool.pros.isNotEmpty() || tool.cons.isNotEmpty()) {
                item {
                    Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                        if (tool.pros.isNotEmpty()) {
                            ElevatedCard(modifier = Modifier.weight(1f), shape = RoundedCornerShape(12.dp)) {
                                Column(Modifier.padding(12.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                                    Text("Pros", style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold, color = Emerald500)
                                    tool.pros.forEach { pro ->
                                        Row(horizontalArrangement = Arrangement.spacedBy(6.dp), verticalAlignment = Alignment.Top) {
                                            Icon(Icons.Filled.CheckCircle, null, tint = Emerald500, modifier = Modifier.size(14.dp).padding(top = 2.dp))
                                            Text(pro, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                                        }
                                    }
                                }
                            }
                        }
                        if (tool.cons.isNotEmpty()) {
                            ElevatedCard(modifier = Modifier.weight(1f), shape = RoundedCornerShape(12.dp)) {
                                Column(Modifier.padding(12.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                                    Text("Cons", style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold, color = Rose500)
                                    tool.cons.forEach { con ->
                                        Row(horizontalArrangement = Arrangement.spacedBy(6.dp), verticalAlignment = Alignment.Top) {
                                            Icon(Icons.Filled.Cancel, null, tint = Rose500, modifier = Modifier.size(14.dp).padding(top = 2.dp))
                                            Text(con, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            // Underlying models
            if (tool.underlyingModel.isNotEmpty()) {
                item {
                    DetailCard(title = "Underlying Models", icon = Icons.Filled.Memory, iconTint = Violet500) {
                        Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                            tool.underlyingModel.forEach { m -> BadgeChip(m, Violet100, Violet600) }
                        }
                    }
                }
            }

            // Platforms & Integrations
            if (tool.platforms.isNotEmpty() || tool.integrations.isNotEmpty()) {
                item {
                    DetailCard(title = "Availability", icon = Icons.Filled.DevicesOther, iconTint = Blue500) {
                        if (tool.platforms.isNotEmpty()) {
                            Text("Platforms", style = MaterialTheme.typography.labelSmall, fontWeight = FontWeight.SemiBold, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(bottom = 4.dp))
                            TagRow(tool.platforms)
                            Spacer(Modifier.height(8.dp))
                        }
                        if (tool.integrations.isNotEmpty()) {
                            Text("Integrations", style = MaterialTheme.typography.labelSmall, fontWeight = FontWeight.SemiBold, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(bottom = 4.dp))
                            TagRow(tool.integrations)
                        }
                    }
                }
            }

            // Ideal for
            if (tool.idealFor.isNotEmpty()) {
                item {
                    DetailCard(title = "Ideal For", icon = Icons.Filled.People, iconTint = Blue500) {
                        tool.idealFor.forEach { BulletItem(it, Blue500, Icons.Filled.ArrowForward) }
                    }
                }
            }

            // Alternatives
            if (alternatives.isNotEmpty()) {
                item {
                    DetailCard(title = "Alternatives to ${tool.name}", icon = Icons.Filled.CompareArrows, iconTint = Zinc400) {
                        alternatives.forEach { alt ->
                            val (bg, fg) = pricingColor(alt.pricing)
                            Row(modifier = Modifier.fillMaxWidth().padding(vertical = 4.dp), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
                                Column(modifier = Modifier.weight(1f)) {
                                    Text(alt.name, style = MaterialTheme.typography.bodySmall, fontWeight = FontWeight.SemiBold)
                                    Text(alt.category, style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                                }
                                BadgeChip(alt.pricing, bg, fg)
                            }
                            HorizontalDivider(color = MaterialTheme.colorScheme.outline.copy(alpha = 0.3f))
                        }
                    }
                }
            }

            // Details table
            item {
                DetailCard(title = "Details", icon = Icons.Filled.Info, iconTint = Blue500) {
                    DetailRow("Vendor", tool.vendor)
                    DetailRow("Category", tool.category)
                    DetailRow("Pricing", tool.pricing)
                    if (tool.launchDate.isNotBlank()) DetailRow("Launch Date", tool.launchDate)
                }
            }

            // Tags
            if (tool.tags.isNotEmpty()) {
                item {
                    Text("Tags", style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold)
                    Spacer(Modifier.height(6.dp))
                    TagRow(tool.tags, wrap = true)
                }
            }
        }
    }
}

@Composable
private fun PricingTierCard(tier: PricingTier) {
    ElevatedCard(modifier = Modifier.fillMaxWidth().padding(bottom = 8.dp), shape = RoundedCornerShape(10.dp)) {
        Column(Modifier.padding(12.dp)) {
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
                Text(tier.name, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold)
                Text(tier.price, style = MaterialTheme.typography.titleSmall, color = Green500, fontWeight = FontWeight.Bold)
            }
            if (tier.features.isNotEmpty()) {
                Spacer(Modifier.height(6.dp))
                tier.features.forEach { feature ->
                    Row(modifier = Modifier.padding(bottom = 3.dp), verticalAlignment = Alignment.Top) {
                        Icon(Icons.Filled.CheckCircle, null, tint = Emerald500, modifier = Modifier.size(12.dp).padding(top = 2.dp))
                        Spacer(Modifier.width(6.dp))
                        Text(feature, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                    }
                }
            }
        }
    }
}
