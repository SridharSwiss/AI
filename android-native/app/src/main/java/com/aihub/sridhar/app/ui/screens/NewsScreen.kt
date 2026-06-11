package com.aihub.sridhar.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
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
import com.aihub.sridhar.app.data.models.NewsSource
import com.aihub.sridhar.app.data.repository.DataRepository
import com.aihub.sridhar.app.ui.components.BadgeChip
import com.aihub.sridhar.app.ui.theme.*

private fun categoryColors(cat: String): Pair<Color, Color> = when (cat) {
    "Tech"        -> Pair(Blue100,    Blue500)
    "Research"    -> Pair(Violet100,  Violet500)
    "Government"  -> Pair(Amber100,   Amber500)
    "Medical"     -> Pair(Emerald100, Emerald500)
    "Financial"   -> Pair(Green100,   Green500)
    "Quantum"     -> Pair(Pink100,    Pink500)
    else          -> Pair(Color(0xFF3F3F46), Color(0xFF71717A))
}

private val NEWS_CATEGORIES = listOf("All", "Tech", "Research", "Government", "Medical", "Financial", "Quantum", "General")

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun NewsScreen(repo: DataRepository) {
    var sources     by remember { mutableStateOf<List<NewsSource>>(emptyList()) }
    var selectedCat by remember { mutableStateOf("All") }

    LaunchedEffect(Unit) { sources = repo.loadNewsSources() }

    val filtered = remember(sources, selectedCat) {
        if (selectedCat == "All") sources else sources.filter { it.category == selectedCat }
    }

    Column(modifier = Modifier.fillMaxSize().background(MaterialTheme.colorScheme.background)) {

        TopAppBar(
            title  = { Text("AI News", fontWeight = FontWeight.ExtraBold, color = MaterialTheme.colorScheme.onSurface, letterSpacing = (-0.5).sp) },
            colors = TopAppBarDefaults.topAppBarColors(containerColor = MaterialTheme.colorScheme.background),
        )
        Box(modifier = Modifier.fillMaxWidth().height(1.dp).background(Brush.horizontalGradient(listOf(NeonCyan.copy(0.5f), NeonViolet.copy(0.3f), Color.Transparent))))

        // Category filter chips
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .horizontalScroll(rememberScrollState())
                .padding(horizontal = 14.dp, vertical = 8.dp),
            horizontalArrangement = Arrangement.spacedBy(6.dp),
        ) {
            NEWS_CATEGORIES.forEach { cat ->
                val (bg, fg) = categoryColors(cat)
                FilterChip(
                    selected = cat == selectedCat,
                    onClick  = { selectedCat = cat },
                    label    = { Text(cat, style = MaterialTheme.typography.labelMedium) },
                    colors   = FilterChipDefaults.filterChipColors(
                        selectedContainerColor = if (cat == "All") NeonViolet else bg,
                        selectedLabelColor     = if (cat == "All") Color.White else fg,
                        containerColor         = MaterialTheme.colorScheme.surface,
                        labelColor             = MaterialTheme.colorScheme.onSurfaceVariant,
                    ),
                )
            }
        }

        // Count
        Row(
            modifier = Modifier.fillMaxWidth().padding(horizontal = 14.dp).padding(bottom = 6.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically,
        ) {
            Text(
                "${filtered.size} curated sources",
                style = MaterialTheme.typography.labelSmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
            if (selectedCat != "All") {
                TextButton(onClick = { selectedCat = "All" }) {
                    Text("Clear", style = MaterialTheme.typography.labelSmall, color = NeonViolet)
                }
            }
        }

        // Sources in 2-column grid
        LazyColumn(
            modifier            = Modifier.fillMaxSize(),
            contentPadding      = PaddingValues(start = 14.dp, end = 14.dp, bottom = 20.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp),
        ) {
            items(
                items = filtered.chunked(2),
                key   = { row -> row.first().id },
            ) { row ->
                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    row.forEach { source ->
                        SourceCard(source = source, modifier = Modifier.weight(1f))
                    }
                    if (row.size == 1) Spacer(Modifier.weight(1f))
                }
            }
        }
    }
}

@Composable
private fun SourceCard(source: NewsSource, modifier: Modifier = Modifier) {
    val uriHandler = LocalUriHandler.current
    val (bg, fg) = categoryColors(source.category)

    Surface(
        modifier = modifier
            .clickable { uriHandler.openUri(source.website) }
            .border(1.dp, Brush.linearGradient(listOf(NeonCyan.copy(0.22f), NeonViolet.copy(0.12f))), RoundedCornerShape(14.dp)),
        shape = RoundedCornerShape(14.dp),
        color = MaterialTheme.colorScheme.surface,
    ) {
        Column(modifier = Modifier.padding(12.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                Box(
                    modifier = Modifier
                        .size(34.dp)
                        .background(Brush.linearGradient(listOf(NeonCyan.copy(0.22f), NeonViolet.copy(0.12f))), RoundedCornerShape(10.dp))
                        .border(1.dp, NeonCyan.copy(0.3f), RoundedCornerShape(10.dp)),
                    contentAlignment = Alignment.Center,
                ) {
                    Icon(Icons.Filled.RssFeed, null, tint = NeonCyan, modifier = Modifier.size(16.dp))
                }
                Text(
                    source.name,
                    style      = MaterialTheme.typography.labelLarge,
                    fontWeight = FontWeight.SemiBold,
                    color      = MaterialTheme.colorScheme.onSurface,
                    maxLines   = 1,
                    overflow   = TextOverflow.Ellipsis,
                    modifier   = Modifier.weight(1f),
                )
            }
            Spacer(Modifier.height(6.dp))
            BadgeChip(source.category, bg, fg)
            Spacer(Modifier.height(5.dp))
            Text(
                source.description,
                style    = MaterialTheme.typography.labelSmall,
                color    = MaterialTheme.colorScheme.onSurfaceVariant,
                maxLines = 2,
                overflow = TextOverflow.Ellipsis,
            )
            Spacer(Modifier.height(8.dp))
            Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                Icon(Icons.Filled.OpenInNew, null, tint = NeonViolet, modifier = Modifier.size(11.dp))
                Text("Visit source", style = MaterialTheme.typography.labelSmall, color = NeonViolet, fontWeight = FontWeight.SemiBold)
            }
        }
    }
}
