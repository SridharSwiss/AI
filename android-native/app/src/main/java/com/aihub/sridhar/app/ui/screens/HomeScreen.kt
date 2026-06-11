package com.aihub.sridhar.app.ui.screens

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.*
import androidx.compose.animation.expandVertically
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.shrinkVertically
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
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
import com.aihub.sridhar.app.ui.components.PalettePickerRow
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

@OptIn(ExperimentalTextApi::class)
@Composable
fun HomeScreen(onNavigate: (String) -> Unit) {
    val palette         = LocalAppPalette.current
    val onSelectPalette = LocalSelectPalette.current

    val allTiles = remember(palette) {
        listOf(
            NavTile("AI Tools",     "82 tools",       "Discover & compare leading AI tools across 15 categories",
                Icons.Filled.Build,     palette.t1, listOf(palette.t1.copy(0.28f), palette.t2.copy(0.12f)), Screen.Tools.route),
            NavTile("Compliance",   "16 frameworks",  "EU AI Act, GDPR & global regulatory frameworks",
                Icons.Filled.Shield,    palette.t2, listOf(palette.t2.copy(0.28f), palette.t1.copy(0.12f)), Screen.Compliance.route),
            NavTile("Case Studies", "31 deep-dives",  "Real ROI data from enterprise AI deployments",
                Icons.Filled.BarChart,  palette.t3, listOf(palette.t3.copy(0.28f), palette.t4.copy(0.12f)), Screen.CaseStudies.route),
            NavTile("Learn",        "72 resources",   "Courses, certifications, papers & tutorials",
                Icons.Filled.School,    palette.t4, listOf(palette.t4.copy(0.28f), palette.t5.copy(0.12f)), Screen.Learn.route),
            NavTile("Consulting",   "80+ playbooks",  "Expert playbooks, templates & implementation guides",
                Icons.Filled.Work,      palette.t5, listOf(palette.t5.copy(0.28f), palette.t1.copy(0.12f)), Screen.Consulting.route),
            NavTile("Companies",    "33 companies",   "Track funding, models & news from top AI companies",
                Icons.Filled.Business,  palette.t6, listOf(palette.t6.copy(0.28f), palette.t2.copy(0.12f)), Screen.Companies.route),
        )
    }

    val globalStats = remember(palette) {
        listOf(
            Triple("AI Tools",    "82+", palette.t1),
            Triple("Companies",   "33",  palette.t6),
            Triple("Case Studies","31",  palette.t3),
            Triple("Learn",       "72",  palette.t4),
            Triple("Frameworks",  "16",  palette.t2),
        )
    }

    val inf = rememberInfiniteTransition(label = "glow")
    val glowAlpha by inf.animateFloat(
        initialValue  = 0.05f,
        targetValue   = 0.16f,
        animationSpec = infiniteRepeatable(tween(2800, easing = FastOutSlowInEasing), RepeatMode.Reverse),
        label         = "glow",
    )

    var showPicker by remember { mutableStateOf(false) }

    Box(modifier = Modifier.fillMaxSize().background(Color.Transparent)) {
        // Animated radial glow tinted to current palette
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(300.dp)
                .background(Brush.radialGradient(
                    listOf(palette.g1.copy(glowAlpha), palette.g2.copy(glowAlpha * 0.4f), Color.Transparent),
                    radius = 900f,
                ))
        )

        Column(modifier = Modifier.fillMaxSize().padding(horizontal = 16.dp)) {

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
                            brush = Brush.linearGradient(listOf(palette.g1, palette.g2)),
                        ),
                        fontWeight = FontWeight.ExtraBold,
                    )
                    Text(
                        "Your AI intelligence platform",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                    )
                }
                // Palette circle — opens picker
                Box(
                    modifier = Modifier
                        .size(36.dp)
                        .clip(CircleShape)
                        .background(Brush.linearGradient(listOf(palette.t1, palette.t3, palette.t5)))
                        .border(
                            width = if (showPicker) 2.dp else 1.dp,
                            color = White.copy(if (showPicker) 0.9f else 0.3f),
                            shape = CircleShape,
                        )
                        .clickable { showPicker = !showPicker },
                )
            }

            // ── Palette picker ───────────────────────────────
            AnimatedVisibility(
                visible = showPicker,
                enter   = expandVertically(tween(220, easing = FastOutSlowInEasing)) + fadeIn(tween(180)),
                exit    = shrinkVertically(tween(180)) + fadeOut(tween(140)),
            ) {
                PalettePickerRow(
                    onSelect = { p -> onSelectPalette(p); showPicker = false },
                    modifier = Modifier.padding(vertical = 4.dp),
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
                            .background(MaterialTheme.colorScheme.surfaceVariant)
                            .border(1.dp, Brush.linearGradient(listOf(tint.copy(0.5f), tint.copy(0.18f))), RoundedCornerShape(10.dp))
                            .padding(horizontal = 12.dp, vertical = 7.dp),
                        contentAlignment = Alignment.Center,
                    ) {
                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                            Text(value, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.ExtraBold, color = tint)
                            Text(label, style = MaterialTheme.typography.labelSmall,  color = MaterialTheme.colorScheme.onSurfaceVariant)
                        }
                    }
                }
            }

            Spacer(Modifier.height(6.dp))

            // ── 3 × 2 tile grid ─────────────────────────────
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
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
) {
    Box(
        modifier = modifier
            .clip(RoundedCornerShape(16.dp))
            .background(MaterialTheme.colorScheme.surface)
            .border(
                1.dp,
                Brush.linearGradient(listOf(tile.accentColor.copy(0.45f), tile.accentColor.copy(0.12f))),
                RoundedCornerShape(16.dp),
            )
            .clickable(onClick = onClick)
            .padding(12.dp),
    ) {
        Column(modifier = Modifier.fillMaxSize()) {
            Box(
                modifier = Modifier
                    .size(38.dp)
                    .clip(RoundedCornerShape(10.dp))
                    .background(Brush.linearGradient(tile.gradientColors)),
                contentAlignment = Alignment.Center,
            ) {
                Icon(tile.icon, null, tint = tile.accentColor, modifier = Modifier.size(19.dp))
            }
            Spacer(Modifier.height(8.dp))
            Row(
                modifier              = Modifier.fillMaxWidth(),
                verticalAlignment     = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween,
            ) {
                Text(tile.label, style = MaterialTheme.typography.labelLarge, fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.onSurface, maxLines = 1)
                Text(tile.stat, style = MaterialTheme.typography.labelSmall, color = tile.accentColor, maxLines = 1)
            }
            Spacer(Modifier.height(4.dp))
            Text(
                tile.desc,
                style    = MaterialTheme.typography.labelSmall,
                color    = MaterialTheme.colorScheme.onSurfaceVariant,
                maxLines = 3,
                overflow = TextOverflow.Ellipsis,
                modifier = Modifier.weight(1f),
            )
            Row(
                verticalAlignment     = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(3.dp),
                modifier              = Modifier.padding(top = 4.dp),
            ) {
                Text("Explore", style = MaterialTheme.typography.labelSmall,
                    fontWeight = FontWeight.SemiBold, color = tile.accentColor)
                Icon(Icons.Filled.ArrowForward, null, tint = tile.accentColor, modifier = Modifier.size(10.dp))
            }
        }
    }
}
