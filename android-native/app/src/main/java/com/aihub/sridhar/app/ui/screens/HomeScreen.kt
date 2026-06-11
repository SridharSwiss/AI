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
    val iconGradient: List<Color>,
    val iconTint: Color,
    val route: String,
)

private val secondaryTiles = listOf(
    NavTile("Case Studies",  "31 deep-dives",        Icons.Filled.BarChart,   listOf(NeonAmber.copy(0.22f),  NeonGreen.copy(0.12f)),  NeonAmber,  Screen.CaseStudies.route),
    NavTile("Learn",         "72 resources",          Icons.Filled.School,     listOf(NeonGreen.copy(0.22f),  NeonCyan.copy(0.12f)),   NeonGreen,  Screen.Learn.route),
    NavTile("Consulting",    "80+ playbooks",         Icons.Filled.Work,       listOf(NeonViolet.copy(0.22f), NeonPink.copy(0.12f)),   NeonViolet, Screen.Consulting.route),
    NavTile("Companies",     "33 AI companies",       Icons.Filled.Business,   listOf(NeonCyan.copy(0.22f),  NeonViolet.copy(0.12f)), NeonCyan,   Screen.Companies.route),
)

private val globalStats = listOf(
    Triple("AI Tools",    "82+",  NeonVioletBright),
    Triple("Companies",   "33",   NeonCyan),
    Triple("Case Studies","31",   NeonAmber),
    Triple("Learn",       "72",   NeonGreen),
    Triple("Frameworks",  "16",   NeonPink),
)

// ─────────────────────────────────────────────────────────────
// Home screen — full-screen non-scrolling dashboard
// Every section uses Modifier.weight() so content adapts to
// any screen height without a single pixel of vertical scroll.
// ─────────────────────────────────────────────────────────────

@Composable
fun HomeScreen(onNavigate: (String) -> Unit) {
    val inf = rememberInfiniteTransition(label = "glow")
    val glowAlpha by inf.animateFloat(
        initialValue  = 0.08f,
        targetValue   = 0.22f,
        animationSpec = infiniteRepeatable(tween(2800, easing = FastOutSlowInEasing), RepeatMode.Reverse),
        label         = "glow",
    )

    Box(modifier = Modifier.fillMaxSize().background(Dark900)) {
        // Ambient radial glow — drawn behind all content
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(280.dp)
                .background(
                    Brush.radialGradient(
                        listOf(NeonViolet.copy(glowAlpha), NeonCyan.copy(glowAlpha * 0.35f), Color.Transparent),
                        radius = 700f,
                    )
                )
        )

        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(horizontal = 20.dp),
        ) {

            // ── Header ──────────────────────────────────────
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(top = 14.dp, bottom = 6.dp),
            ) {
                Text(
                    "AIHub",
                    style      = MaterialTheme.typography.displaySmall.copy(letterSpacing = (-1).sp),
                    fontWeight = FontWeight.ExtraBold,
                    color      = TextPrimary,
                )
                Box(
                    modifier = Modifier
                        .width(60.dp).height(2.dp)
                        .background(Brush.horizontalGradient(listOf(NeonViolet, NeonCyan, Color.Transparent)))
                )
                Spacer(Modifier.height(4.dp))
                Text(
                    "Your AI intelligence platform",
                    style = MaterialTheme.typography.bodySmall,
                    color = TextSecondary,
                )
            }

            // ── Stats chips ─────────────────────────────────
            LazyRow(
                contentPadding        = PaddingValues(vertical = 6.dp),
                horizontalArrangement = Arrangement.spacedBy(8.dp),
            ) {
                items(globalStats) { (label, value, tint) ->
                    Box(
                        modifier = Modifier
                            .clip(RoundedCornerShape(10.dp))
                            .background(Dark700)
                            .border(1.dp, Brush.linearGradient(listOf(tint.copy(0.35f), tint.copy(0.12f))), RoundedCornerShape(10.dp))
                            .padding(horizontal = 12.dp, vertical = 8.dp),
                        contentAlignment = Alignment.Center,
                    ) {
                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                            Text(value, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.ExtraBold, color = tint)
                            Text(label, style = MaterialTheme.typography.labelSmall, color = TextMuted)
                        }
                    }
                }
            }

            Spacer(Modifier.height(8.dp))

            // ── Primary tiles (Tools + Compliance) ──────────
            Row(
                modifier              = Modifier.fillMaxWidth().height(124.dp),
                horizontalArrangement = Arrangement.spacedBy(10.dp),
            ) {
                PrimaryTile(
                    label        = "AI Tools",
                    stat         = "82 tools · 15 categories",
                    icon         = Icons.Filled.Build,
                    iconGradient = listOf(NeonViolet.copy(0.22f), NeonCyan.copy(0.10f)),
                    iconTint     = NeonVioletBright,
                    route        = Screen.Tools.route,
                    onClick      = onNavigate,
                    modifier     = Modifier.weight(1f).fillMaxHeight(),
                )
                PrimaryTile(
                    label        = "Compliance",
                    stat         = "16 regulatory frameworks",
                    icon         = Icons.Filled.Shield,
                    iconGradient = listOf(NeonPink.copy(0.22f), NeonViolet.copy(0.10f)),
                    iconTint     = NeonPink,
                    route        = Screen.Compliance.route,
                    onClick      = onNavigate,
                    modifier     = Modifier.weight(1f).fillMaxHeight(),
                )
            }

            Spacer(Modifier.height(8.dp))

            // ── 2×2 secondary grid (fills remaining space) ──
            Column(
                modifier              = Modifier.weight(1f).fillMaxWidth(),
                verticalArrangement   = Arrangement.spacedBy(8.dp),
            ) {
                Row(
                    modifier              = Modifier.weight(1f).fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp),
                ) {
                    SecondaryTile(secondaryTiles[0], { onNavigate(secondaryTiles[0].route) }, Modifier.weight(1f).fillMaxHeight())
                    SecondaryTile(secondaryTiles[1], { onNavigate(secondaryTiles[1].route) }, Modifier.weight(1f).fillMaxHeight())
                }
                Row(
                    modifier              = Modifier.weight(1f).fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp),
                ) {
                    SecondaryTile(secondaryTiles[2], { onNavigate(secondaryTiles[2].route) }, Modifier.weight(1f).fillMaxHeight())
                    SecondaryTile(secondaryTiles[3], { onNavigate(secondaryTiles[3].route) }, Modifier.weight(1f).fillMaxHeight())
                }
            }

            Spacer(Modifier.height(8.dp))

            // ── Quick links bar ──────────────────────────────
            Row(
                modifier              = Modifier.fillMaxWidth().padding(bottom = 10.dp),
                horizontalArrangement = Arrangement.spacedBy(8.dp),
            ) {
                listOf(
                    Triple(Icons.Filled.School,    "Learn",     Screen.Learn.route),
                    Triple(Icons.Filled.Work,      "Playbooks", Screen.Consulting.route),
                    Triple(Icons.Filled.Newspaper, "News",      Screen.News.route),
                    Triple(Icons.Filled.Search,    "Search",    Screen.Search.route),
                ).forEach { (icon, label, route) ->
                    Box(
                        modifier = Modifier
                            .weight(1f)
                            .clip(RoundedCornerShape(12.dp))
                            .background(Dark700)
                            .border(1.dp, Brush.linearGradient(listOf(NeonViolet.copy(0.28f), NeonCyan.copy(0.14f))), RoundedCornerShape(12.dp))
                            .clickable { onNavigate(route) }
                            .padding(vertical = 10.dp),
                        contentAlignment = Alignment.Center,
                    ) {
                        Column(horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.spacedBy(5.dp)) {
                            Icon(icon, null, tint = NeonVioletBright, modifier = Modifier.size(17.dp))
                            Text(label, style = MaterialTheme.typography.labelSmall, color = TextSecondary)
                        }
                    }
                }
            }
        }
    }
}

// ─────────────────────────────────────────────────────────────
// Tile composables
// ─────────────────────────────────────────────────────────────

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
            .border(1.dp, Brush.linearGradient(listOf(NeonViolet.copy(0.45f), NeonCyan.copy(0.25f))), RoundedCornerShape(16.dp))
            .clickable { onClick(route) }
            .padding(14.dp),
    ) {
        Column(modifier = Modifier.fillMaxSize(), verticalArrangement = Arrangement.SpaceBetween) {
            Box(
                modifier = Modifier
                    .size(40.dp)
                    .clip(RoundedCornerShape(11.dp))
                    .background(Brush.linearGradient(iconGradient)),
                contentAlignment = Alignment.Center,
            ) {
                Icon(icon, null, tint = iconTint, modifier = Modifier.size(20.dp))
            }
            Column {
                Text(label, style = MaterialTheme.typography.titleSmall.copy(letterSpacing = (-0.2).sp), fontWeight = FontWeight.Bold, color = TextPrimary)
                Text(stat, style = MaterialTheme.typography.labelSmall, color = TextMuted, maxLines = 1, overflow = TextOverflow.Ellipsis, modifier = Modifier.padding(top = 2.dp))
            }
            Text("Explore →", style = MaterialTheme.typography.labelMedium, fontWeight = FontWeight.SemiBold, color = NeonVioletBright)
        }
    }
}

@Composable
private fun SecondaryTile(tile: NavTile, onClick: () -> Unit, modifier: Modifier = Modifier) {
    Box(
        modifier = modifier
            .clip(RoundedCornerShape(14.dp))
            .background(Dark800)
            .border(1.dp, Brush.linearGradient(listOf(tile.iconTint.copy(0.30f), NeonViolet.copy(0.15f), Dark700)), RoundedCornerShape(14.dp))
            .clickable(onClick = onClick)
            .padding(12.dp),
    ) {
        Column(modifier = Modifier.fillMaxSize(), verticalArrangement = Arrangement.SpaceBetween) {
            Box(
                modifier = Modifier
                    .size(36.dp)
                    .clip(RoundedCornerShape(9.dp))
                    .background(Brush.linearGradient(tile.iconGradient)),
                contentAlignment = Alignment.Center,
            ) {
                Icon(tile.icon, null, tint = tile.iconTint, modifier = Modifier.size(18.dp))
            }
            Column {
                Text(tile.label, style = MaterialTheme.typography.labelLarge, fontWeight = FontWeight.SemiBold, color = TextPrimary, maxLines = 1)
                Text(tile.stat, style = MaterialTheme.typography.labelSmall, color = TextMuted, maxLines = 1, overflow = TextOverflow.Ellipsis, modifier = Modifier.padding(top = 2.dp))
            }
        }
    }
}
