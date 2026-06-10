package com.aihub.sridhar.app.ui.screens

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.aihub.sridhar.app.ui.navigation.Screen
import com.aihub.sridhar.app.ui.theme.*

private data class NavTile(
    val label: String,
    val stat: String,
    val icon: ImageVector,
    val bg: Color,
    val fg: Color,
    val route: String,
)

private val tiles = listOf(
    NavTile("Case Studies",  "31 case studies",    Icons.Filled.BarChart,   Amber100,   Amber600,   Screen.CaseStudies.route),
    NavTile("Learn",         "72 resources",        Icons.Filled.School,    Emerald100, Emerald600, Screen.Learn.route),
    NavTile("Consulting",    "4 phases · 80+ plays",Icons.Filled.Work,      Violet50,   Violet600,  Screen.Consulting.route),
    NavTile("Companies",     "33 companies",        Icons.Filled.Business,  Blue50,     Blue600,    Screen.Companies.route),
)

private data class StatItem(val label: String, val value: String)

private val globalStats = listOf(
    StatItem("AI Tools",    "82+"),
    StatItem("Companies",   "33"),
    StatItem("Case Studies","31"),
    StatItem("Learn",       "72"),
    StatItem("Frameworks",  "16"),
)

@Composable
fun HomeScreen(onNavigate: (String) -> Unit) {
    LazyColumn(
        contentPadding = PaddingValues(bottom = 24.dp),
    ) {

        // ── Hero ───────────────────────────────────────────
        item {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 20.dp)
                    .padding(top = 24.dp, bottom = 20.dp),
            ) {
                Text(
                    text = "AIHub",
                    style = MaterialTheme.typography.displayMedium,
                    fontWeight = FontWeight.ExtraBold,
                    color = MaterialTheme.colorScheme.primary,
                )
                Text(
                    text = "Your AI intelligence platform",
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    modifier = Modifier.padding(top = 2.dp),
                )
            }
        }

        // ── Stats bar ──────────────────────────────────────
        item {
            LazyRow(
                contentPadding = PaddingValues(horizontal = 20.dp, vertical = 4.dp),
                horizontalArrangement = Arrangement.spacedBy(10.dp),
            ) {
                items(globalStats) { stat ->
                    Surface(
                        color  = MaterialTheme.colorScheme.surfaceVariant,
                        shape  = RoundedCornerShape(10.dp),
                        modifier = Modifier.width(90.dp),
                    ) {
                        Column(
                            modifier = Modifier.padding(12.dp),
                            horizontalAlignment = Alignment.CenterHorizontally,
                        ) {
                            Text(
                                text  = stat.value,
                                style = MaterialTheme.typography.titleLarge.copy(fontSize = 20.sp),
                                fontWeight = FontWeight.ExtraBold,
                                color = MaterialTheme.colorScheme.primary,
                            )
                            Text(
                                text  = stat.label,
                                style = MaterialTheme.typography.labelSmall,
                                color = MaterialTheme.colorScheme.onSurfaceVariant,
                            )
                        }
                    }
                }
            }
        }

        // ── Section: Explore ───────────────────────────────
        item {
            SectionHeader("Explore", modifier = Modifier.padding(horizontal = 20.dp, vertical = 12.dp))
        }

        // ── Primary tiles (Tools + News — 2 col) ──────────
        item {
            Row(
                modifier = Modifier.fillMaxWidth().padding(horizontal = 20.dp),
                horizontalArrangement = Arrangement.spacedBy(12.dp),
            ) {
                PrimaryTile(
                    label = "AI Tools",
                    stat  = "82 tools across 15 categories",
                    icon  = Icons.Filled.Build,
                    bg    = Violet100,
                    fg    = Violet600,
                    route = Screen.Tools.route,
                    onClick = onNavigate,
                    modifier = Modifier.weight(1f),
                )
                PrimaryTile(
                    label = "Compliance",
                    stat  = "16 regulatory frameworks",
                    icon  = Icons.Filled.Shield,
                    bg    = Rose100,
                    fg    = Rose600,
                    route = Screen.Compliance.route,
                    onClick = onNavigate,
                    modifier = Modifier.weight(1f),
                )
            }
        }

        // ── Secondary tiles ────────────────────────────────
        item {
            LazyRow(
                contentPadding = PaddingValues(horizontal = 20.dp, vertical = 12.dp),
                horizontalArrangement = Arrangement.spacedBy(10.dp),
            ) {
                items(tiles) { tile ->
                    SecondaryTile(tile = tile, onClick = { onNavigate(tile.route) })
                }
            }
        }

        // ── Featured insight ───────────────────────────────
        item {
            SectionHeader("Insight", modifier = Modifier.padding(horizontal = 20.dp, vertical = 4.dp))
        }
        item {
            FeaturedInsightCard(
                label   = "Regulatory Update · June 2026",
                title   = "EU AI Act is now in force",
                body    = "The world's first comprehensive AI regulation is fully effective. High-risk system operators must complete conformity assessments. Non-compliance carries penalties up to €35M or 7% of global revenue.",
                ctaText = "Read the Guide",
                onClick = { onNavigate(Screen.Compliance.route) },
                modifier = Modifier.padding(horizontal = 20.dp),
            )
        }

        // ── Quick links ────────────────────────────────────
        item {
            SectionHeader("Quick Access", modifier = Modifier.padding(horizontal = 20.dp).padding(top = 20.dp, bottom = 4.dp))
        }
        item {
            QuickLinkRow(
                modifier = Modifier.padding(horizontal = 20.dp),
                links = listOf(
                    Triple(Icons.Filled.School, "Learn AI", Screen.Learn.route),
                    Triple(Icons.Filled.Work,   "Playbooks", Screen.Consulting.route),
                    Triple(Icons.Filled.Newspaper, "News", Screen.News.route),
                    Triple(Icons.Filled.Search, "Search", Screen.Search.route),
                ),
                onNavigate = onNavigate,
            )
        }
    }
}

@Composable
private fun PrimaryTile(
    label: String,
    stat: String,
    icon: ImageVector,
    bg: Color,
    fg: Color,
    route: String,
    onClick: (String) -> Unit,
    modifier: Modifier = Modifier,
) {
    ElevatedCard(
        modifier  = modifier.clickable { onClick(route) },
        shape     = RoundedCornerShape(16.dp),
        elevation = CardDefaults.elevatedCardElevation(defaultElevation = 2.dp),
    ) {
        Column(
            modifier = Modifier.padding(16.dp).fillMaxWidth(),
            verticalArrangement = Arrangement.spacedBy(12.dp),
        ) {
            Surface(color = bg, contentColor = fg, shape = RoundedCornerShape(12.dp), modifier = Modifier.size(44.dp)) {
                Box(contentAlignment = Alignment.Center) { Icon(icon, null, modifier = Modifier.size(22.dp)) }
            }
            Column {
                Text(label, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)
                Text(stat, style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(top = 2.dp))
            }
            Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                Text("Explore", style = MaterialTheme.typography.labelMedium, color = MaterialTheme.colorScheme.primary, fontWeight = FontWeight.SemiBold)
                Icon(Icons.Filled.ArrowForward, null, tint = MaterialTheme.colorScheme.primary, modifier = Modifier.size(14.dp))
            }
        }
    }
}

@Composable
private fun SecondaryTile(tile: NavTile, onClick: () -> Unit) {
    Surface(
        color    = MaterialTheme.colorScheme.surface,
        shape    = RoundedCornerShape(14.dp),
        tonalElevation = 1.dp,
        modifier = Modifier.width(160.dp).clickable(onClick = onClick),
    ) {
        Row(
            modifier = Modifier.padding(12.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(10.dp),
        ) {
            Surface(color = tile.bg, contentColor = tile.fg, shape = RoundedCornerShape(8.dp), modifier = Modifier.size(36.dp)) {
                Box(contentAlignment = Alignment.Center) { Icon(tile.icon, null, modifier = Modifier.size(18.dp)) }
            }
            Column {
                Text(tile.label, style = MaterialTheme.typography.labelLarge, fontWeight = FontWeight.SemiBold, maxLines = 1, overflow = TextOverflow.Ellipsis)
                Text(tile.stat, style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant, maxLines = 1, overflow = TextOverflow.Ellipsis, modifier = Modifier.padding(top = 1.dp))
            }
        }
    }
}

@Composable
private fun FeaturedInsightCard(
    label: String,
    title: String,
    body: String,
    ctaText: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
) {
    ElevatedCard(
        modifier  = modifier.fillMaxWidth(),
        shape     = RoundedCornerShape(16.dp),
        elevation = CardDefaults.elevatedCardElevation(defaultElevation = 2.dp),
    ) {
        Column(modifier = Modifier.padding(18.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                Surface(color = Rose100, contentColor = Rose600, shape = RoundedCornerShape(6.dp)) {
                    Text(label, style = MaterialTheme.typography.labelSmall, modifier = Modifier.padding(horizontal = 8.dp, vertical = 3.dp), fontWeight = FontWeight.SemiBold)
                }
            }
            Text(title, style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.ExtraBold)
            Text(body, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant, lineHeight = 19.sp)
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically,
            ) {
                FilledTonalButton(onClick = onClick) {
                    Text(ctaText, style = MaterialTheme.typography.labelLarge)
                }
                Icon(Icons.Filled.Shield, null, tint = Rose600.copy(alpha = 0.25f), modifier = Modifier.size(32.dp))
            }
        }
    }
}

@Composable
private fun SectionHeader(title: String, modifier: Modifier = Modifier) {
    Text(
        text     = title.uppercase(),
        style    = MaterialTheme.typography.labelMedium,
        color    = MaterialTheme.colorScheme.onSurfaceVariant,
        modifier = modifier,
        letterSpacing = 1.sp,
    )
}

@Composable
private fun QuickLinkRow(
    links: List<Triple<ImageVector, String, String>>,
    onNavigate: (String) -> Unit,
    modifier: Modifier = Modifier,
) {
    Row(
        modifier = modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.spacedBy(8.dp),
    ) {
        links.forEach { (icon, label, route) ->
            Surface(
                color  = MaterialTheme.colorScheme.surfaceVariant,
                shape  = RoundedCornerShape(12.dp),
                modifier = Modifier.weight(1f).clickable { onNavigate(route) },
            ) {
                Column(
                    modifier = Modifier.padding(10.dp),
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(6.dp),
                ) {
                    Icon(icon, null, tint = MaterialTheme.colorScheme.primary, modifier = Modifier.size(22.dp))
                    Text(label, style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant, maxLines = 1)
                }
            }
        }
    }
}
