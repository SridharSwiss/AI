package com.aihub.sridhar.app.ui.screens

import androidx.compose.animation.core.*
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
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
    NavTile("Case Studies",  "31 case studies",     Icons.Filled.BarChart,   Amber100,   Amber500,   Screen.CaseStudies.route),
    NavTile("Learn",         "72 resources",         Icons.Filled.School,    Emerald100, Emerald500, Screen.Learn.route),
    NavTile("Consulting",    "4 phases · 80+ plays", Icons.Filled.Work,      Violet50,   Violet500,  Screen.Consulting.route),
    NavTile("Companies",     "33 companies",         Icons.Filled.Business,  Blue100,    Blue500,    Screen.Companies.route),
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
    val infiniteTransition = rememberInfiniteTransition(label = "hero_glow")
    val glowAlpha by infiniteTransition.animateFloat(
        initialValue = 0.10f,
        targetValue  = 0.25f,
        animationSpec = infiniteRepeatable(
            animation = tween(durationMillis = 2800, easing = FastOutSlowInEasing),
            repeatMode = RepeatMode.Reverse,
        ),
        label = "glow_alpha",
    )

    LazyColumn(
        contentPadding = PaddingValues(bottom = 32.dp),
        modifier = Modifier.background(Dark900),
    ) {

        // ── Hero ───────────────────────────────────────────
        item {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(Dark900),
            ) {
                // Animated radial glow overlay
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(180.dp)
                        .background(
                            Brush.radialGradient(
                                colors = listOf(
                                    NeonViolet.copy(alpha = glowAlpha),
                                    NeonCyan.copy(alpha = glowAlpha * 0.4f),
                                    Color.Transparent,
                                ),
                                radius = 600f,
                            )
                        )
                )
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 20.dp)
                        .padding(top = 32.dp, bottom = 24.dp),
                ) {
                    Text(
                        text = "AIHub",
                        style = MaterialTheme.typography.displayMedium.copy(letterSpacing = (-1).sp),
                        fontWeight = FontWeight.ExtraBold,
                        color = TextPrimary,
                    )
                    // Gradient accent line below wordmark
                    Box(
                        modifier = Modifier
                            .width(80.dp)
                            .height(2.dp)
                            .padding(top = 0.dp)
                            .background(
                                Brush.horizontalGradient(
                                    listOf(NeonViolet, NeonCyan, Color.Transparent)
                                )
                            )
                    )
                    Spacer(Modifier.height(8.dp))
                    Text(
                        text = "Your AI intelligence platform",
                        style = MaterialTheme.typography.bodyMedium,
                        color = TextSecondary,
                    )
                }
            }
        }

        // ── Stats bar ──────────────────────────────────────
        item {
            LazyRow(
                contentPadding = PaddingValues(horizontal = 20.dp, vertical = 8.dp),
                horizontalArrangement = Arrangement.spacedBy(10.dp),
            ) {
                items(globalStats) { stat ->
                    Box(
                        modifier = Modifier
                            .width(90.dp)
                            .clip(RoundedCornerShape(12.dp))
                            .background(Dark700)
                            .border(
                                width = 1.dp,
                                brush = Brush.linearGradient(
                                    listOf(NeonViolet.copy(alpha = 0.4f), NeonCyan.copy(alpha = 0.2f))
                                ),
                                shape = RoundedCornerShape(12.dp),
                            )
                            .padding(12.dp),
                        contentAlignment = Alignment.Center,
                    ) {
                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                            Text(
                                text  = stat.value,
                                style = MaterialTheme.typography.titleLarge.copy(fontSize = 20.sp),
                                fontWeight = FontWeight.ExtraBold,
                                color = NeonVioletBright,
                            )
                            Text(
                                text  = stat.label,
                                style = MaterialTheme.typography.labelSmall,
                                color = TextMuted,
                            )
                        }
                    }
                }
            }
        }

        // ── Section: Explore ───────────────────────────────
        item {
            GradientSectionHeader(
                text = "Explore",
                modifier = Modifier.padding(horizontal = 20.dp, vertical = 12.dp),
            )
        }

        // ── Primary tiles (Tools + Compliance — 2 col) ────
        item {
            Row(
                modifier = Modifier.fillMaxWidth().padding(horizontal = 20.dp),
                horizontalArrangement = Arrangement.spacedBy(12.dp),
            ) {
                PrimaryTile(
                    label       = "AI Tools",
                    stat        = "82 tools across 15 categories",
                    icon        = Icons.Filled.Build,
                    iconGradient = listOf(NeonViolet.copy(0.18f), NeonCyan.copy(0.10f)),
                    iconTint    = NeonVioletBright,
                    route       = Screen.Tools.route,
                    onClick     = onNavigate,
                    modifier    = Modifier.weight(1f),
                )
                PrimaryTile(
                    label       = "Compliance",
                    stat        = "16 regulatory frameworks",
                    icon        = Icons.Filled.Shield,
                    iconGradient = listOf(NeonPink.copy(0.18f), NeonViolet.copy(0.10f)),
                    iconTint    = NeonPink,
                    route       = Screen.Compliance.route,
                    onClick     = onNavigate,
                    modifier    = Modifier.weight(1f),
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

        // Gradient divider
        item {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 20.dp)
                    .height(1.dp)
                    .background(
                        Brush.horizontalGradient(
                            listOf(NeonViolet.copy(0.3f), NeonCyan.copy(0.2f), Color.Transparent)
                        )
                    )
            )
        }

        // ── Featured insight ───────────────────────────────
        item {
            GradientSectionHeader(
                text = "Insight",
                modifier = Modifier.padding(horizontal = 20.dp, vertical = 12.dp),
            )
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

        // Gradient divider
        item {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 20.dp, vertical = 8.dp)
                    .height(1.dp)
                    .background(
                        Brush.horizontalGradient(
                            listOf(Color.Transparent, NeonCyan.copy(0.25f), NeonViolet.copy(0.3f), Color.Transparent)
                        )
                    )
            )
        }

        // ── Quick links ────────────────────────────────────
        item {
            GradientSectionHeader(
                text = "Quick Access",
                modifier = Modifier.padding(horizontal = 20.dp).padding(top = 4.dp, bottom = 12.dp),
            )
        }
        item {
            QuickLinkRow(
                modifier = Modifier.padding(horizontal = 20.dp),
                links = listOf(
                    Triple(Icons.Filled.School,    "Learn AI",  Screen.Learn.route),
                    Triple(Icons.Filled.Work,      "Playbooks", Screen.Consulting.route),
                    Triple(Icons.Filled.Newspaper, "News",      Screen.News.route),
                    Triple(Icons.Filled.Search,    "Search",    Screen.Search.route),
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
    iconGradient: List<Color>,
    iconTint: Color,
    route: String,
    onClick: (String) -> Unit,
    modifier: Modifier = Modifier,
) {
    Box(
        modifier = modifier
            .clip(RoundedCornerShape(16.dp))
            .background(Dark800)
            .border(
                width = 1.dp,
                brush = Brush.linearGradient(
                    listOf(NeonViolet.copy(alpha = 0.5f), NeonCyan.copy(alpha = 0.3f))
                ),
                shape = RoundedCornerShape(16.dp),
            )
            .clickable { onClick(route) }
            .padding(16.dp),
    ) {
        Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
            Box(
                modifier = Modifier
                    .size(44.dp)
                    .clip(RoundedCornerShape(12.dp))
                    .background(Brush.linearGradient(iconGradient)),
                contentAlignment = Alignment.Center,
            ) {
                Icon(icon, null, tint = iconTint, modifier = Modifier.size(22.dp))
            }
            Column {
                Text(
                    label,
                    style = MaterialTheme.typography.titleMedium.copy(letterSpacing = (-0.3).sp),
                    fontWeight = FontWeight.Bold,
                    color = TextPrimary,
                )
                Text(
                    stat,
                    style = MaterialTheme.typography.labelSmall,
                    color = TextMuted,
                    modifier = Modifier.padding(top = 2.dp),
                )
            }
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(4.dp),
            ) {
                Text(
                    "Explore →",
                    style = MaterialTheme.typography.labelMedium,
                    fontWeight = FontWeight.SemiBold,
                    color = NeonVioletBright,
                )
            }
        }
    }
}

@Composable
private fun SecondaryTile(tile: NavTile, onClick: () -> Unit) {
    Box(
        modifier = Modifier
            .width(168.dp)
            .clip(RoundedCornerShape(14.dp))
            .background(Dark800)
            .border(
                width = 1.dp,
                brush = Brush.linearGradient(
                    listOf(NeonViolet.copy(alpha = 0.35f), NeonCyan.copy(alpha = 0.2f))
                ),
                shape = RoundedCornerShape(14.dp),
            )
            .clickable(onClick = onClick)
            .padding(12.dp),
    ) {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(10.dp),
        ) {
            Box(
                modifier = Modifier
                    .size(36.dp)
                    .clip(RoundedCornerShape(8.dp))
                    .background(
                        Brush.linearGradient(listOf(tile.bg, tile.bg.copy(alpha = 0.6f)))
                    ),
                contentAlignment = Alignment.Center,
            ) {
                Icon(tile.icon, null, tint = tile.fg, modifier = Modifier.size(18.dp))
            }
            Column {
                Text(
                    tile.label,
                    style = MaterialTheme.typography.labelLarge,
                    fontWeight = FontWeight.SemiBold,
                    color = TextPrimary,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis,
                )
                Text(
                    tile.stat,
                    style = MaterialTheme.typography.labelSmall,
                    color = TextMuted,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis,
                    modifier = Modifier.padding(top = 1.dp),
                )
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
    Box(
        modifier = modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(16.dp))
            .background(Dark800)
            .border(
                width = 1.dp,
                brush = Brush.linearGradient(
                    listOf(NeonPink.copy(alpha = 0.5f), NeonViolet.copy(alpha = 0.4f), NeonCyan.copy(alpha = 0.25f))
                ),
                shape = RoundedCornerShape(16.dp),
            )
            .padding(18.dp),
    ) {
        Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
            // Neon tag chip
            Box(
                modifier = Modifier
                    .clip(RoundedCornerShape(6.dp))
                    .background(
                        Brush.linearGradient(listOf(NeonPink.copy(0.20f), NeonViolet.copy(0.15f)))
                    )
                    .padding(horizontal = 8.dp, vertical = 3.dp),
            ) {
                Text(
                    label,
                    style = MaterialTheme.typography.labelSmall,
                    fontWeight = FontWeight.SemiBold,
                    color = NeonPink,
                )
            }
            Text(
                title,
                style = MaterialTheme.typography.titleLarge.copy(letterSpacing = (-0.5).sp),
                fontWeight = FontWeight.ExtraBold,
                color = TextPrimary,
            )
            Text(
                body,
                style = MaterialTheme.typography.bodySmall,
                color = TextSecondary,
                lineHeight = 19.sp,
            )
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Box(
                    modifier = Modifier
                        .clip(RoundedCornerShape(8.dp))
                        .background(
                            Brush.linearGradient(listOf(NeonViolet.copy(0.25f), NeonCyan.copy(0.15f)))
                        )
                        .border(
                            width = 1.dp,
                            brush = Brush.linearGradient(listOf(NeonViolet.copy(0.6f), NeonCyan.copy(0.4f))),
                            shape = RoundedCornerShape(8.dp),
                        )
                        .clickable(onClick = onClick)
                        .padding(horizontal = 14.dp, vertical = 8.dp),
                ) {
                    Text(
                        ctaText,
                        style = MaterialTheme.typography.labelLarge,
                        fontWeight = FontWeight.SemiBold,
                        color = NeonVioletBright,
                    )
                }
                Icon(
                    Icons.Filled.Shield,
                    null,
                    tint = NeonPink.copy(alpha = 0.25f),
                    modifier = Modifier.size(32.dp),
                )
            }
        }
    }
}

@Composable
private fun GradientSectionHeader(text: String, modifier: Modifier = Modifier) {
    Column(modifier = modifier) {
        Text(
            text = text.uppercase(),
            style = MaterialTheme.typography.labelMedium,
            color = TextMuted,
            letterSpacing = 1.2.sp,
            fontWeight = FontWeight.SemiBold,
        )
        Spacer(Modifier.height(4.dp))
        Box(
            modifier = Modifier
                .width(28.dp)
                .height(2.dp)
                .background(
                    Brush.horizontalGradient(listOf(NeonViolet, NeonCyan, Color.Transparent))
                )
        )
    }
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
            Box(
                modifier = Modifier
                    .weight(1f)
                    .clip(RoundedCornerShape(12.dp))
                    .background(Dark700)
                    .border(
                        width = 1.dp,
                        brush = Brush.linearGradient(
                            listOf(NeonViolet.copy(alpha = 0.3f), NeonCyan.copy(alpha = 0.15f))
                        ),
                        shape = RoundedCornerShape(12.dp),
                    )
                    .clickable { onNavigate(route) }
                    .padding(10.dp),
                contentAlignment = Alignment.Center,
            ) {
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(6.dp),
                ) {
                    Box(
                        modifier = Modifier
                            .size(32.dp)
                            .clip(RoundedCornerShape(8.dp))
                            .background(
                                Brush.linearGradient(
                                    listOf(NeonViolet.copy(0.18f), NeonCyan.copy(0.10f))
                                )
                            ),
                        contentAlignment = Alignment.Center,
                    ) {
                        Icon(icon, null, tint = NeonVioletBright, modifier = Modifier.size(16.dp))
                    }
                    Text(
                        label,
                        style = MaterialTheme.typography.labelSmall,
                        color = TextSecondary,
                        maxLines = 1,
                    )
                }
            }
        }
    }
}
