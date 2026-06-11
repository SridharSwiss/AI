package com.aihub.sridhar.app.ui.screens

import androidx.compose.animation.core.*
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
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalUriHandler
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.aihub.sridhar.app.data.models.PricingTier
import com.aihub.sridhar.app.data.models.Tool
import com.aihub.sridhar.app.data.repository.DataRepository
import com.aihub.sridhar.app.ui.components.*
import com.aihub.sridhar.app.ui.theme.*

fun pricingColor(pricing: String): Pair<Color, Color> = when (pricing.lowercase()) {
    "free"       -> Pair(Green100,  Green500)
    "freemium"   -> Pair(Blue100,   Blue500)
    "paid"       -> Pair(Amber100,  Amber500)
    "enterprise" -> Pair(Purple100, Purple500)
    else         -> Pair(Blue100,   Blue500)
}

private fun pricingGradient(pricing: String): Pair<Color, Color> = when (pricing.lowercase()) {
    "free"       -> Pair(NeonGreen,  NeonCyan)
    "freemium"   -> Pair(NeonCyan,   NeonViolet)
    "paid"       -> Pair(NeonAmber,  NeonPink)
    "enterprise" -> Pair(NeonViolet, NeonPink)
    else         -> Pair(NeonCyan,   NeonViolet)
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ToolsScreen(repo: DataRepository, onToolClick: (String) -> Unit, onToggleTheme: () -> Unit = {}) {
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

    // Animated gradient for header divider
    val infiniteTransition = rememberInfiniteTransition(label = "divider")
    val animAlpha by infiniteTransition.animateFloat(
        initialValue = 0.25f, targetValue = 0.6f,
        animationSpec = infiniteRepeatable(tween(2200, easing = EaseInOut), RepeatMode.Reverse),
        label = "alpha",
    )

    Column(modifier = Modifier.fillMaxSize().background(MaterialTheme.colorScheme.background)) {
        AppTopBar(title = "AI Tools", onToggleTheme = onToggleTheme)

        // Animated gradient header line
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(1.dp)
                .background(
                    Brush.horizontalGradient(
                        listOf(NeonViolet.copy(alpha = animAlpha), NeonCyan.copy(alpha = animAlpha * 0.7f), Color.Transparent)
                    )
                )
        )

        Row(
            modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp, vertical = 10.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp),
        ) {
            FilterDropdown("Category", category, categories, { category = it }, Modifier.weight(1f))
            FilterDropdown("Pricing",  pricing,  pricings,   { pricing  = it }, Modifier.weight(1f))
        }

        Row(
            modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp).padding(bottom = 8.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically,
        ) {
            Text(
                if (allTools.isEmpty()) "Loading…" else "${filtered.size} of ${allTools.size} tools",
                style = MaterialTheme.typography.labelSmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
            if (category != "All" || pricing != "All") {
                TextButton(onClick = { category = "All"; pricing = "All" }) {
                    Text("Clear", style = MaterialTheme.typography.labelSmall, color = NeonViolet)
                }
            }
        }

        LazyColumn {
            items(filtered, key = { it.slug }) { tool ->
                ToolRow(tool = tool, onClick = { onToolClick(tool.slug) })
                // Subtle gradient divider
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(start = 72.dp)
                        .height(1.dp)
                        .background(
                            Brush.horizontalGradient(
                                listOf(NeonViolet.copy(alpha = 0.08f), NeonCyan.copy(alpha = 0.05f), Color.Transparent)
                            )
                        )
                )
            }
        }
    }
}

@Composable
fun ToolRow(tool: Tool, onClick: () -> Unit) {
    val (g1, g2) = pricingGradient(tool.pricing)
    val firstMetric = tool.metrics.entries.firstOrNull()

    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick)
            .background(MaterialTheme.colorScheme.background)
            .padding(horizontal = 16.dp, vertical = 14.dp),
        horizontalArrangement = Arrangement.spacedBy(14.dp),
        verticalAlignment = Alignment.Top,
    ) {
        // Neon gradient icon container
        Box(
            modifier = Modifier
                .size(44.dp)
                .clip(RoundedCornerShape(12.dp))
                .background(Brush.linearGradient(listOf(NeonViolet.copy(alpha = 0.20f), NeonCyan.copy(alpha = 0.10f)))),
            contentAlignment = Alignment.Center,
        ) {
            Icon(Icons.Filled.Build, null, tint = NeonVioletBright, modifier = Modifier.size(22.dp))
        }

        Column(modifier = Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(3.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                Text(
                    tool.name,
                    style = MaterialTheme.typography.titleSmall,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.onSurface,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis,
                    modifier = Modifier.weight(1f, fill = false),
                )
                if (tool.featured) {
                    Box(
                        modifier = Modifier
                            .clip(RoundedCornerShape(4.dp))
                            .background(Brush.linearGradient(listOf(NeonViolet.copy(0.25f), NeonPink.copy(0.15f))))
                            .padding(horizontal = 6.dp, vertical = 2.dp)
                    ) {
                        Text("★", style = MaterialTheme.typography.labelSmall, color = NeonVioletBright)
                    }
                }
            }
            Text(
                "${tool.vendor} · ${tool.category}",
                style = MaterialTheme.typography.labelSmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                maxLines = 1,
            )
            if (firstMetric != null) {
                Text(
                    "${firstMetric.key}: ${firstMetric.value}",
                    style = MaterialTheme.typography.labelSmall,
                    color = NeonGreen.copy(alpha = 0.85f),
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis,
                )
            }
        }

        // Pricing badge with gradient border
        Box(
            modifier = Modifier
                .clip(RoundedCornerShape(8.dp))
                .border(1.dp, Brush.linearGradient(listOf(g1.copy(alpha = 0.6f), g2.copy(alpha = 0.4f))), RoundedCornerShape(8.dp))
                .padding(horizontal = 9.dp, vertical = 4.dp)
        ) {
            Text(
                tool.pricing,
                style = MaterialTheme.typography.labelSmall,
                fontWeight = FontWeight.SemiBold,
                color = g1,
            )
        }
    }
}

/* ── Tool detail ─────────────────────────────────────────── */

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ToolDetailScreen(repo: DataRepository, slug: String, onBack: () -> Unit, onToggleTheme: () -> Unit = {}) {
    var tool by remember { mutableStateOf<Tool?>(null) }
    var allTools by remember { mutableStateOf<List<Tool>>(emptyList()) }
    LaunchedEffect(slug) { allTools = repo.loadTools(); tool = allTools.find { it.slug == slug } }
    val uriHandler = LocalUriHandler.current
    var tab by remember { mutableStateOf(0) }

    Scaffold(
        containerColor = MaterialTheme.colorScheme.background,
        topBar = {
            AppTopBar(
                title          = tool?.name ?: "AI Tools",
                onToggleTheme  = onToggleTheme,
                navigationIcon = { IconButton(onClick = onBack) { Icon(Icons.Filled.ArrowBack, "Back", tint = MaterialTheme.colorScheme.onSurface) } },
            )
        }
    ) { padding ->
        val tool = tool
        if (tool == null) { EmptyState("Loading…", Modifier.padding(padding)); return@Scaffold }
        val (g1, g2) = pricingGradient(tool.pricing)
        val alternatives = remember(tool, allTools) { allTools.filter { it.slug in tool.alternatives } }

        Column(modifier = Modifier.fillMaxSize().padding(top = padding.calculateTopPadding())) {
            Row(
                modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp, vertical = 8.dp),
                horizontalArrangement = Arrangement.spacedBy(6.dp),
            ) {
                GradientBadge(tool.pricing, g1, g2)
                GradientBadge(tool.category, NeonCyan, NeonViolet)
                if (tool.featured) GradientBadge("★ Featured", NeonViolet, NeonPink)
                if (tool.apiAvailable) GradientBadge("API", NeonGreen, NeonCyan)
            }
            TabRow(
                selectedTabIndex = tab,
                containerColor = MaterialTheme.colorScheme.background,
                contentColor = NeonViolet,
                divider = { Box(Modifier.fillMaxWidth().height(1.dp).background(MaterialTheme.colorScheme.surfaceVariant)) },
            ) {
                listOf("Overview", "Pricing", "More").forEachIndexed { i, t ->
                    Tab(
                        selected = tab == i, onClick = { tab = i },
                        text = { Text(t, style = MaterialTheme.typography.labelMedium, fontWeight = if (tab == i) FontWeight.Bold else FontWeight.Normal, color = if (tab == i) NeonViolet else MaterialTheme.colorScheme.onSurfaceVariant) },
                    )
                }
            }
            when (tab) {
                0 -> LazyColumn(modifier = Modifier.weight(1f), contentPadding = PaddingValues(16.dp), verticalArrangement = Arrangement.spacedBy(14.dp)) {
                    item {
                        Text(tool.tagline, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold, color = MaterialTheme.colorScheme.onSurface)
                        Spacer(Modifier.height(6.dp))
                        Text(tool.description, style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.onSurfaceVariant, lineHeight = 22.sp)
                    }
                    if (tool.metrics.isNotEmpty()) item {
                        PremiumDetailCard("Key Stats", Icons.Filled.BarChart, NeonGreen) {
                            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                                tool.metrics.entries.toList().chunked(2).forEach { row ->
                                    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                                        row.forEach { (k, v) ->
                                            Box(modifier = Modifier.weight(1f).clip(RoundedCornerShape(10.dp)).background(MaterialTheme.colorScheme.surfaceVariant).border(1.dp, Brush.linearGradient(listOf(NeonGreen.copy(0.3f), NeonCyan.copy(0.15f))), RoundedCornerShape(10.dp)).padding(10.dp)) {
                                                Column {
                                                    Text(k, style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                                                    Text(v, style = MaterialTheme.typography.bodySmall, fontWeight = FontWeight.Bold, color = NeonGreen)
                                                }
                                            }
                                        }
                                        if (row.size == 1) Spacer(Modifier.weight(1f))
                                    }
                                }
                            }
                        }
                    }
                    if (tool.pros.isNotEmpty() || tool.cons.isNotEmpty()) item {
                        Row(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                            if (tool.pros.isNotEmpty()) ProConsCard("Pros", tool.pros, NeonGreen, Modifier.weight(1f))
                            if (tool.cons.isNotEmpty()) ProConsCard("Cons", tool.cons, Rose500, Modifier.weight(1f))
                        }
                    }
                }
                1 -> LazyColumn(modifier = Modifier.weight(1f), contentPadding = PaddingValues(16.dp), verticalArrangement = Arrangement.spacedBy(14.dp)) {
                    if (tool.pricingTiers.isNotEmpty()) item {
                        PremiumDetailCard("Pricing Plans", Icons.Filled.AttachMoney, NeonGreen) {
                            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                                tool.pricingTiers.forEach { PricingTierCard(it) }
                            }
                        }
                    }
                    if (tool.useCases.isNotEmpty()) item {
                        PremiumDetailCard("Use Cases", Icons.Filled.Lightbulb, NeonViolet) {
                            tool.useCases.forEach { BulletItem(it, NeonViolet, Icons.Filled.ArrowForward) }
                        }
                    }
                    if (tool.underlyingModel.isNotEmpty()) item {
                        PremiumDetailCard("Powered By", Icons.Filled.Memory, NeonViolet) {
                            Row(horizontalArrangement = Arrangement.spacedBy(6.dp), modifier = Modifier.fillMaxWidth()) {
                                tool.underlyingModel.forEach { m ->
                                    Box(modifier = Modifier.clip(RoundedCornerShape(6.dp)).background(Brush.linearGradient(listOf(NeonViolet.copy(0.2f), NeonPink.copy(0.1f)))).border(1.dp, Brush.linearGradient(listOf(NeonViolet.copy(0.4f), NeonPink.copy(0.25f))), RoundedCornerShape(6.dp)).padding(horizontal = 8.dp, vertical = 4.dp)) {
                                        Text(m, style = MaterialTheme.typography.labelSmall, color = NeonVioletBright, fontWeight = FontWeight.SemiBold)
                                    }
                                }
                            }
                        }
                    }
                    if (tool.platforms.isNotEmpty() || tool.integrations.isNotEmpty()) item {
                        PremiumDetailCard("Availability", Icons.Filled.DevicesOther, NeonCyan) {
                            if (tool.platforms.isNotEmpty()) {
                                Text("Platforms", style = MaterialTheme.typography.labelSmall, fontWeight = FontWeight.SemiBold, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(bottom = 6.dp))
                                TagRow(tool.platforms)
                                if (tool.integrations.isNotEmpty()) Spacer(Modifier.height(10.dp))
                            }
                            if (tool.integrations.isNotEmpty()) {
                                Text("Integrations", style = MaterialTheme.typography.labelSmall, fontWeight = FontWeight.SemiBold, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(bottom = 6.dp))
                                TagRow(tool.integrations)
                            }
                        }
                    }
                }
                else -> LazyColumn(modifier = Modifier.weight(1f), contentPadding = PaddingValues(16.dp), verticalArrangement = Arrangement.spacedBy(14.dp)) {
                    if (tool.history.isNotBlank()) item {
                        PremiumDetailCard("Origin Story", Icons.Filled.Star, NeonAmber) {
                            Text(tool.history, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant, lineHeight = 20.sp)
                        }
                    }
                    if (tool.latestUpdate.isNotBlank()) item {
                        PremiumDetailCard("Latest in 2026", Icons.Filled.FlashOn, NeonCyan) {
                            Text(tool.latestUpdate, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant, lineHeight = 20.sp)
                        }
                    }
                    if (tool.idealFor.isNotEmpty()) item {
                        PremiumDetailCard("Ideal For", Icons.Filled.People, NeonCyan) {
                            tool.idealFor.forEach { BulletItem(it, NeonCyan, Icons.Filled.ArrowForward) }
                        }
                    }
                    if (alternatives.isNotEmpty()) item {
                        PremiumDetailCard("Alternatives", Icons.Filled.CompareArrows, MaterialTheme.colorScheme.onSurfaceVariant) {
                            alternatives.forEach { alt ->
                                val (ag1, ag2) = pricingGradient(alt.pricing)
                                Row(modifier = Modifier.fillMaxWidth().padding(vertical = 6.dp), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
                                    Column(modifier = Modifier.weight(1f)) {
                                        Text(alt.name, style = MaterialTheme.typography.bodySmall, fontWeight = FontWeight.SemiBold, color = MaterialTheme.colorScheme.onSurface)
                                        Text(alt.category, style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                                    }
                                    Box(modifier = Modifier.clip(RoundedCornerShape(6.dp)).border(1.dp, Brush.linearGradient(listOf(ag1.copy(0.5f), ag2.copy(0.3f))), RoundedCornerShape(6.dp)).padding(horizontal = 8.dp, vertical = 3.dp)) {
                                        Text(alt.pricing, style = MaterialTheme.typography.labelSmall, color = ag1)
                                    }
                                }
                                Box(Modifier.fillMaxWidth().height(1.dp).background(Brush.horizontalGradient(listOf(Dark500, Color.Transparent))))
                            }
                        }
                    }
                    item {
                        PremiumDetailCard("Details", Icons.Filled.Info, NeonCyan) {
                            PremiumDetailRow("Vendor", tool.vendor)
                            PremiumDetailRow("Category", tool.category)
                            PremiumDetailRow("Pricing", tool.pricing)
                            if (tool.launchDate.isNotBlank()) PremiumDetailRow("Launched", tool.launchDate)
                        }
                    }
                    if (tool.tags.isNotEmpty()) item {
                        Text("Tags", style = MaterialTheme.typography.labelMedium, fontWeight = FontWeight.SemiBold, color = MaterialTheme.colorScheme.onSurfaceVariant)
                        Spacer(Modifier.height(8.dp))
                        TagRow(tool.tags, wrap = true)
                    }
                }
            }
        }
    }
}

/* ── Shared premium components ───────────────────────────── */

@Composable
private fun GradientBadge(text: String, c1: Color, c2: Color) {
    Box(
        modifier = Modifier
            .clip(RoundedCornerShape(6.dp))
            .background(Brush.linearGradient(listOf(c1.copy(0.18f), c2.copy(0.1f))))
            .border(1.dp, Brush.linearGradient(listOf(c1.copy(0.5f), c2.copy(0.3f))), RoundedCornerShape(6.dp))
            .padding(horizontal = 8.dp, vertical = 3.dp)
    ) {
        Text(text, style = MaterialTheme.typography.labelSmall, fontWeight = FontWeight.SemiBold, color = c1)
    }
}

@Composable
fun PremiumDetailCard(
    title: String,
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    iconTint: Color,
    modifier: Modifier = Modifier,
    content: @Composable ColumnScope.() -> Unit,
) {
    Box(
        modifier = modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(16.dp))
            .background(MaterialTheme.colorScheme.surface)
            .border(1.dp, Brush.linearGradient(listOf(iconTint.copy(alpha = 0.35f), NeonViolet.copy(alpha = 0.15f), Color.Transparent)), RoundedCornerShape(16.dp))
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                modifier = Modifier.padding(bottom = 12.dp),
            ) {
                Box(
                    modifier = Modifier
                        .size(28.dp)
                        .clip(RoundedCornerShape(8.dp))
                        .background(Brush.linearGradient(listOf(iconTint.copy(0.2f), iconTint.copy(0.05f)))),
                    contentAlignment = Alignment.Center,
                ) {
                    Icon(icon, null, tint = iconTint, modifier = Modifier.size(16.dp))
                }
                Text(title, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.Bold, color = MaterialTheme.colorScheme.onSurface)
            }
            content()
        }
    }
}

@Composable
private fun PremiumDetailRow(label: String, value: String) {
    if (value.isBlank()) return
    Row(
        modifier = Modifier.fillMaxWidth().padding(vertical = 5.dp),
        horizontalArrangement = Arrangement.SpaceBetween,
    ) {
        Text(label, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.weight(1f))
        Text(value, style = MaterialTheme.typography.bodySmall, fontWeight = FontWeight.SemiBold, color = MaterialTheme.colorScheme.onSurface, modifier = Modifier.weight(2f), textAlign = androidx.compose.ui.text.style.TextAlign.End)
    }
    Box(Modifier.fillMaxWidth().height(1.dp).background(Brush.horizontalGradient(listOf(Dark500, Color.Transparent))))
}

@Composable
private fun ProConsCard(title: String, items: List<String>, color: Color, modifier: Modifier = Modifier) {
    Box(
        modifier = modifier
            .clip(RoundedCornerShape(14.dp))
            .background(MaterialTheme.colorScheme.surface)
            .border(1.dp, Brush.linearGradient(listOf(color.copy(0.35f), color.copy(0.1f))), RoundedCornerShape(14.dp))
    ) {
        Column(modifier = Modifier.padding(12.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
            Text(title, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.Bold, color = color)
            items.forEach { item ->
                Row(horizontalArrangement = Arrangement.spacedBy(6.dp), verticalAlignment = Alignment.Top) {
                    Icon(
                        if (color == NeonGreen) Icons.Filled.CheckCircle else Icons.Filled.Cancel,
                        null, tint = color, modifier = Modifier.size(14.dp).padding(top = 2.dp),
                    )
                    Text(item, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.weight(1f))
                }
            }
        }
    }
}

@Composable
private fun PricingTierCard(tier: PricingTier) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(12.dp))
            .background(MaterialTheme.colorScheme.surfaceVariant)
            .border(1.dp, Brush.linearGradient(listOf(NeonGreen.copy(0.3f), NeonCyan.copy(0.15f))), RoundedCornerShape(12.dp))
    ) {
        Column(modifier = Modifier.padding(14.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Text(tier.name, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.Bold, color = MaterialTheme.colorScheme.onSurface)
                Text(tier.price, style = MaterialTheme.typography.titleSmall, color = NeonGreen, fontWeight = FontWeight.ExtraBold)
            }
            if (tier.features.isNotEmpty()) {
                Spacer(Modifier.height(8.dp))
                tier.features.forEach { feature ->
                    Row(modifier = Modifier.padding(bottom = 4.dp), verticalAlignment = Alignment.Top, horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                        Icon(Icons.Filled.CheckCircle, null, tint = NeonGreen, modifier = Modifier.size(13.dp).padding(top = 2.dp))
                        Text(feature, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                    }
                }
            }
        }
    }
}
