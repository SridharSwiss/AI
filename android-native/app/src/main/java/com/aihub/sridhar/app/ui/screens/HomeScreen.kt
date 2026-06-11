package com.aihub.sridhar.app.ui.screens

import androidx.compose.animation.core.*
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
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
import androidx.compose.ui.text.ExperimentalTextApi
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.aihub.sridhar.app.ui.navigation.Screen
import com.aihub.sridhar.app.ui.theme.*

private data class NavTile(
    val label: String,
    val stat: String,
    val desc: String,
    val icon: ImageVector,
    val accentColor: Color,
    val gradientColors: List<Color>,
    val route: String,
)

// 6 tiles — 3 rows × 2 — all destinations in one unified grid
private val allTiles = listOf(
    NavTile(
        label = "AI Tools", stat = "82 tools", desc = "Discover & compare leading AI tools across 15 categories",
        icon = Icons.Filled.Build, accentColor = NeonViolet,
        gradientColors = listOf(NeonViolet.copy(0.25f), NeonCyan.copy(0.12f)), route = Screen.Tools.route,
    ),
    NavTile(
        label = "Compliance", stat = "16 frameworks", desc = "EU AI Act, GDPR & global regulatory frameworks",
        icon = Icons.Filled.Shield, accentColor = NeonPink,
        gradientColors = listOf(NeonPink.copy(0.25f), NeonViolet.copy(0.12f)), route = Screen.Compliance.route,
    ),
    NavTile(
        label = "Case Studies", stat = "31 deep-dives", desc = "Real ROI data from enterprise AI deployments",
        icon = Icons.Filled.BarChart, accentColor = NeonAmber,
        gradientColors = listOf(NeonAmber.copy(0.25f), NeonGreen.copy(0.12f)), route = Screen.CaseStudies.route,
    ),
    NavTile(
        label = "Learn", stat = "72 resources", desc = "Courses, certifications, papers & tutorials",
        icon = Icons.Filled.School, accentColor = NeonGreen,
        gradientColors = listOf(NeonGreen.copy(0.25f), NeonCyan.copy(0.12f)), route = Screen.Learn.route,
    ),
    NavTile(
        label = "Consulting", stat = "80+ playbooks", desc = "Expert playbooks, templates & implementation guides",
        icon = Icons.Filled.Work, accentColor = NeonVioletBright,
        gradientColors = listOf(NeonViolet.copy(0.25f), NeonPink.copy(0.12f)), route = Screen.Consulting.route,
    ),
    NavTile(
        label = "Companies", stat = "33 companies", desc = "Track funding, models & news from top AI companies",
        icon = Icons.Filled.Business, accentColor = NeonCyan,
        gradientColors = listOf(NeonCyan.copy(0.25f), NeonViolet.copy(0.12f)), route = Screen.Companies.route,
    ),
)

private val globalStats = listOf(
    Triple("AI Tools",    "82+",  NeonVioletBright),
    Triple("Companies",   "33",   NeonCyan),
    Triple("Case Studies","31",   NeonAmber),
    Triple("Learn",       "72",   NeonGreen),
    Triple("Frameworks",  "16",   NeonPink),
)

@OptIn(ExperimentalTextApi::class)
@Composable
fun HomeScreen(onNavigate: (String) -> Unit, onToggleTheme: () -> Unit = {}) {
    val isDark = LocalDarkTheme.current
    val inf = rememberInfiniteTransition(label = "glow")
    val glowAlpha by inf.animateFloat(
        initialValue  = 0.06f,
        targetValue   = 0.18f,
        animationSpec = infiniteRepeatable(tween(2800, easing = FastOutSlowInEasing), RepeatMode.Reverse),
        label         = "glow",
    )

    Box(modifier = Modifier.fillMaxSize().background(MaterialTheme.colorScheme.background)) {
        if (isDark) {
            Box(
                modifier = Modifier
                    .fillMaxWidth().height(300.dp)
                    .background(Brush.radialGradient(
                        listOf(NeonViolet.copy(glowAlpha), NeonCyan.copy(glowAlpha * 0.3f), Color.Transparent),
                        radius = 800f,
                    ))
            )
        }

        Column(
            modifier = Modifier.fillMaxSize().padding(horizontal = 16.dp),
        ) {
            // ── Header ──────────────────────────────────────
            Row(
                modifier              = Modifier.fillMaxWidth().padding(top = 12.dp, bottom = 4.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment     = Alignment.CenterVertically,
            ) {
                Column(modifier = Modifier.weight(1f)) {
                    Text(
                        "AIHub",
                        style      = MaterialTheme.typography.displaySmall.copy(
                            letterSpacing = (-1).sp,
                            brush = Brush.linearGradient(listOf(NeonViolet, NeonCyan)),
                        ),
                        fontWeight = FontWeight.ExtraBold,
                    )
                    Text(
                        "Your AI intelligence platform",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                    )
                }
                IconButton(onClick = onToggleTheme) {
                    Icon(
                        imageVector        = if (isDark) Icons.Filled.LightMode else Icons.Filled.DarkMode,
                        contentDescription = "Toggle theme",
                        tint               = if (isDark) NeonAmber else NeonViolet.forLightBackground(),
                        modifier           = Modifier.size(22.dp),
                    )
                }
            }

            // ── Stats chips ─────────────────────────────────
            LazyRow(
                contentPadding        = PaddingValues(vertical = 6.dp),
                horizontalArrangement = Arrangement.spacedBy(8.dp),
            ) {
                items(globalStats) { (label, value, tint) ->
                    val chipTint = if (isDark) tint else tint.forLightBackground()
                    Box(
                        modifier = Modifier
                            .clip(RoundedCornerShape(10.dp))
                            .background(MaterialTheme.colorScheme.surfaceVariant)
                            .border(1.dp, Brush.linearGradient(listOf(chipTint.copy(0.45f), chipTint.copy(0.15f))), RoundedCornerShape(10.dp))
                            .padding(horizontal = 12.dp, vertical = 7.dp),
                        contentAlignment = Alignment.Center,
                    ) {
                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                            Text(value, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.ExtraBold, color = chipTint)
                            Text(label, style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                        }
                    }
                }
            }

            Spacer(Modifier.height(6.dp))

            // ── 3 × 2 tile grid — fills all remaining space ──
            Column(
                modifier            = Modifier.weight(1f).fillMaxWidth().padding(bottom = 10.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp),
            ) {
                allTiles.chunked(2).forEach { row ->
                    Row(
                        modifier              = Modifier.weight(1f).fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(8.dp),
                    ) {
                        row.forEach { tile ->
                            DashboardTile(
                                tile     = tile,
                                isDark   = isDark,
                                onClick  = { onNavigate(tile.route) },
                                modifier = Modifier.weight(1f).fillMaxHeight(),
                            )
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun DashboardTile(
    tile: NavTile,
    isDark: Boolean,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
) {
    val accent = if (isDark) tile.accentColor else tile.accentColor.forLightBackground()
    Box(
        modifier = modifier
            .clip(RoundedCornerShape(16.dp))
            .background(MaterialTheme.colorScheme.surface)
            .border(
                1.dp,
                Brush.linearGradient(listOf(accent.copy(0.40f), accent.copy(0.12f))),
                RoundedCornerShape(16.dp),
            )
            .clickable(onClick = onClick)
            .padding(12.dp),
    ) {
        Column(modifier = Modifier.fillMaxSize()) {
            // Icon pill
            Box(
                modifier = Modifier
                    .size(38.dp)
                    .clip(RoundedCornerShape(10.dp))
                    .background(Brush.linearGradient(tile.gradientColors)),
                contentAlignment = Alignment.Center,
            ) {
                Icon(tile.icon, null, tint = accent, modifier = Modifier.size(19.dp))
            }
            Spacer(Modifier.height(8.dp))
            // Title + stat on same line
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween,
            ) {
                Text(
                    tile.label,
                    style      = MaterialTheme.typography.labelLarge,
                    fontWeight = FontWeight.Bold,
                    color      = MaterialTheme.colorScheme.onSurface,
                    maxLines   = 1,
                )
                Text(
                    tile.stat,
                    style   = MaterialTheme.typography.labelSmall,
                    color   = accent,
                    maxLines = 1,
                )
            }
            Spacer(Modifier.height(4.dp))
            // Description fills remaining space naturally
            Text(
                tile.desc,
                style    = MaterialTheme.typography.labelSmall,
                color    = MaterialTheme.colorScheme.onSurfaceVariant,
                maxLines = 3,
                overflow = TextOverflow.Ellipsis,
                modifier = Modifier.weight(1f),
            )
            // Accent explore link always pinned to bottom
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(3.dp),
                modifier = Modifier.padding(top = 4.dp),
            ) {
                Text(
                    "Explore",
                    style      = MaterialTheme.typography.labelSmall,
                    fontWeight = FontWeight.SemiBold,
                    color      = accent,
                )
                Icon(Icons.Filled.ArrowForward, null, tint = accent, modifier = Modifier.size(10.dp))
            }
        }
    }
}
