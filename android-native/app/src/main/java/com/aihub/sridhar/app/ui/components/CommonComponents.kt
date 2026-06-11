package com.aihub.sridhar.app.ui.components

import androidx.compose.animation.animateContentSize
import androidx.compose.animation.core.*
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.gestures.detectTapGestures
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.layout.ExperimentalLayoutApi
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
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.text.ExperimentalTextApi
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.aihub.sridhar.app.ui.theme.*

// ─────────────────────────────────────────────────────────────
// App-wide top bar — AIHub brand + screen title + theme toggle
// Use this in every screen for a consistent app header.
// ─────────────────────────────────────────────────────────────

@OptIn(ExperimentalMaterial3Api::class, ExperimentalTextApi::class)
@Composable
fun AppTopBar(
    title: String,
    onToggleTheme: () -> Unit,
    navigationIcon: @Composable () -> Unit = {},
) {
    val isDark = LocalDarkTheme.current
    TopAppBar(
        navigationIcon = navigationIcon,
        title = {
            Row(
                verticalAlignment     = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(6.dp),
            ) {
                Text(
                    "AIHub",
                    style      = MaterialTheme.typography.labelLarge.copy(
                        brush = Brush.linearGradient(listOf(NeonViolet, NeonCyan)),
                    ),
                    fontWeight = FontWeight.ExtraBold,
                )
                Box(
                    modifier = Modifier
                        .size(4.dp)
                        .background(MaterialTheme.colorScheme.onSurfaceVariant.copy(0.35f), RoundedCornerShape(50))
                )
                Text(
                    title,
                    style      = MaterialTheme.typography.titleSmall,
                    fontWeight = FontWeight.ExtraBold,
                    color      = MaterialTheme.colorScheme.onSurface,
                    letterSpacing = (-0.3).sp,
                    maxLines   = 1,
                    overflow   = TextOverflow.Ellipsis,
                )
            }
        },
        actions = {
            IconButton(onClick = onToggleTheme) {
                Icon(
                    imageVector        = if (isDark) Icons.Filled.LightMode else Icons.Filled.DarkMode,
                    contentDescription = "Toggle theme",
                    tint               = if (isDark) NeonAmber else NeonViolet.forLightBackground(),
                    modifier           = Modifier.size(20.dp),
                )
            }
        },
        colors = TopAppBarDefaults.topAppBarColors(containerColor = MaterialTheme.colorScheme.background),
    )
}

// ─────────────────────────────────────────────────────────────
// Motion tokens  (Pillar 5)
// Use these consistently across every animated composable to
// create a unified, physically-intuitive feel.
// ─────────────────────────────────────────────────────────────

/** Standard card press — snappy snap-back. */
val CardPressSpring = spring<Float>(
    dampingRatio = Spring.DampingRatioMediumBouncy,
    stiffness    = Spring.StiffnessHigh,
)

/** Content reveal / expand-collapse — gentle settle. */
val ContentRevealSpring = spring<Float>(
    dampingRatio = Spring.DampingRatioLowBouncy,
    stiffness    = Spring.StiffnessMediumLow,
)

/** State transitions (color, alpha) — quick crossfade. */
val StateTween = tween<Float>(durationMillis = 120, easing = FastOutLinearInEasing)

// ─────────────────────────────────────────────────────────────
// Pillar 4 — AnimatedPressCard
// Replaces every plain Surface/ElevatedCard that is tappable.
// Gives tactile spring-scale feedback on press, gradient border
// at rest, brighter border on focused state.
// ─────────────────────────────────────────────────────────────

@Composable
fun AnimatedPressCard(
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    borderGradient: List<Color> = listOf(
        NeonViolet.copy(alpha = 0.30f),
        NeonCyan.copy(alpha = 0.15f),
    ),
    backgroundColor: Color? = null,
    cornerRadius: Int = 16,
    content: @Composable ColumnScope.() -> Unit,
) {
    var pressed by remember { mutableStateOf(false) }
    val scale by animateFloatAsState(
        targetValue    = if (pressed) 0.965f else 1f,
        animationSpec  = CardPressSpring,
        label          = "cardScale",
    )
    val borderAlpha by animateFloatAsState(
        targetValue   = if (pressed) 0.7f else 1f,
        animationSpec = StateTween,
        label         = "borderAlpha",
    )
    val shape = RoundedCornerShape(cornerRadius.dp)
    val bgColor = backgroundColor ?: MaterialTheme.colorScheme.surface

    Column(
        modifier = modifier
            .graphicsLayer { scaleX = scale; scaleY = scale }
            .clip(shape)
            .background(bgColor)
            .border(
                width = 1.dp,
                brush = Brush.linearGradient(borderGradient.map { it.copy(alpha = it.alpha * borderAlpha) }),
                shape = shape,
            )
            .pointerInput(onClick) {
                detectTapGestures(
                    onPress = { pressed = true; tryAwaitRelease(); pressed = false },
                    onTap   = { onClick() },
                )
            },
        content = content,
    )
}

// ─────────────────────────────────────────────────────────────
// Pillar 4 + 5 — ExpandableCard
// DetailCard replacement: tap the header to collapse/expand.
// Uses animateContentSize() with ContentRevealSpring so the
// height change is physically continuous rather than a cut.
// ─────────────────────────────────────────────────────────────

@Composable
fun ExpandableCard(
    title: String,
    icon: ImageVector,
    iconTint: Color,
    modifier: Modifier = Modifier,
    initiallyExpanded: Boolean = true,
    content: @Composable ColumnScope.() -> Unit,
) {
    var expanded by remember { mutableStateOf(initiallyExpanded) }
    val shape = RoundedCornerShape(16.dp)

    Column(
        modifier = modifier
            .fillMaxWidth()
            .clip(shape)
            .background(MaterialTheme.colorScheme.surface)
            .border(
                1.dp,
                Brush.linearGradient(listOf(iconTint.copy(0.28f), NeonViolet.copy(0.12f))),
                shape,
            )
            .animateContentSize(
                animationSpec = spring(
                    dampingRatio = Spring.DampingRatioLowBouncy,
                    stiffness    = Spring.StiffnessMediumLow,
                )
            ),
    ) {
        // Header row — always visible
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .clickable { expanded = !expanded }
                .padding(horizontal = 14.dp, vertical = 11.dp),
            verticalAlignment    = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(10.dp),
        ) {
            Box(
                modifier = Modifier
                    .size(28.dp)
                    .background(
                        Brush.linearGradient(listOf(iconTint.copy(0.22f), iconTint.copy(0.08f))),
                        RoundedCornerShape(8.dp),
                    ),
                contentAlignment = Alignment.Center,
            ) {
                Icon(icon, null, tint = iconTint, modifier = Modifier.size(15.dp))
            }
            Text(
                title,
                style         = MaterialTheme.typography.titleSmall,
                fontWeight    = FontWeight.SemiBold,
                color         = MaterialTheme.colorScheme.onSurface,
                modifier      = Modifier.weight(1f),
            )
            val chevronRotation by animateFloatAsState(
                targetValue   = if (expanded) 0f else -90f,
                animationSpec = tween(200, easing = FastOutSlowInEasing),
                label         = "chevron",
            )
            Icon(
                Icons.Filled.ExpandMore,
                null,
                tint     = MaterialTheme.colorScheme.onSurfaceVariant,
                modifier = Modifier.size(18.dp).graphicsLayer { rotationZ = chevronRotation },
            )
        }

        // Collapsible body
        if (expanded) {
            Box(modifier = Modifier.fillMaxWidth().height(1.dp).background(MaterialTheme.colorScheme.surfaceVariant))
            Column(modifier = Modifier.padding(14.dp), content = content)
        }
    }
}

// ─────────────────────────────────────────────────────────────
// Legacy DetailCard — now delegates to ExpandableCard
// All existing callers continue to compile unchanged.
// ─────────────────────────────────────────────────────────────

@Composable
fun DetailCard(
    title: String,
    icon: ImageVector,
    iconTint: Color,
    modifier: Modifier = Modifier,
    content: @Composable ColumnScope.() -> Unit,
) = ExpandableCard(
    title = title, icon = icon, iconTint = iconTint,
    modifier = modifier, initiallyExpanded = true,
    content = content,
)

// ─────────────────────────────────────────────────────────────
// Filter Dropdown  (Pillar 3 — WCAG AA contrast)
// ─────────────────────────────────────────────────────────────

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun FilterDropdown(
    label: String,
    selected: String,
    options: List<String>,
    onSelected: (String) -> Unit,
    modifier: Modifier = Modifier,
) {
    var expanded by remember { mutableStateOf(false) }
    ExposedDropdownMenuBox(expanded = expanded, onExpandedChange = { expanded = it }, modifier = modifier) {
        OutlinedTextField(
            value          = selected,
            onValueChange  = {},
            readOnly       = true,
            label          = { Text(label, style = MaterialTheme.typography.labelSmall) },
            trailingIcon   = { ExposedDropdownMenuDefaults.TrailingIcon(expanded) },
            modifier       = Modifier.menuAnchor().fillMaxWidth(),
            singleLine     = true,
            shape          = RoundedCornerShape(10.dp),
            textStyle      = MaterialTheme.typography.bodySmall,
            colors         = ExposedDropdownMenuDefaults.outlinedTextFieldColors(
                focusedBorderColor   = NeonViolet,
                unfocusedBorderColor = MaterialTheme.colorScheme.outline,
                focusedTextColor     = MaterialTheme.colorScheme.onSurface,
                unfocusedTextColor   = MaterialTheme.colorScheme.onSurface,
                focusedLabelColor    = NeonViolet,
            ),
        )
        ExposedDropdownMenu(
            expanded          = expanded,
            onDismissRequest  = { expanded = false },
            modifier          = Modifier.background(MaterialTheme.colorScheme.surfaceVariant),
        ) {
            options.forEach { option ->
                DropdownMenuItem(
                    text    = { Text(option, style = MaterialTheme.typography.bodySmall, color = if (option == selected) NeonViolet else MaterialTheme.colorScheme.onSurface) },
                    onClick = { onSelected(option); expanded = false },
                )
            }
        }
    }
}

// ─────────────────────────────────────────────────────────────
// Badge chip (Pillar 3 — typography + contrast)
// ─────────────────────────────────────────────────────────────

@Composable
fun BadgeChip(
    text: String,
    containerColor: Color,
    contentColor: Color,
    modifier: Modifier = Modifier,
) {
    val isDark = LocalDarkTheme.current
    val adaptedContainer = if (isDark) containerColor else contentColor.copy(alpha = 0.12f)
    val adaptedContent   = if (isDark) contentColor   else contentColor.forLightBackground()
    Surface(
        color        = adaptedContainer,
        contentColor = adaptedContent,
        shape        = RoundedCornerShape(50),
        modifier     = modifier,
    ) {
        Text(
            text      = text,
            style     = MaterialTheme.typography.labelSmall,
            fontWeight = FontWeight.SemiBold,
            modifier  = Modifier.padding(horizontal = 8.dp, vertical = 3.dp),
            maxLines  = 1,
            overflow  = TextOverflow.Ellipsis,
        )
    }
}

// ─────────────────────────────────────────────────────────────
// Bullet item  (fixed: now uses TextPrimary/TextSecondary)
// ─────────────────────────────────────────────────────────────

@Composable
fun BulletItem(
    text: String,
    color: Color,
    icon: ImageVector = Icons.Filled.ArrowForward,
    modifier: Modifier = Modifier,
) {
    Row(
        modifier              = modifier.fillMaxWidth().padding(bottom = 5.dp),
        verticalAlignment     = Alignment.Top,
        horizontalArrangement = Arrangement.spacedBy(8.dp),
    ) {
        Icon(icon, null, tint = color, modifier = Modifier.size(13.dp).padding(top = 2.dp))
        Text(text, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.weight(1f))
    }
}

// ─────────────────────────────────────────────────────────────
// Detail row  (fixed: uses Dark700 divider, WCAG AA contrast)
// ─────────────────────────────────────────────────────────────

@Composable
fun DetailRow(label: String, value: String, modifier: Modifier = Modifier) {
    if (value.isBlank()) return
    Column(modifier = modifier.fillMaxWidth()) {
        Row(
            modifier              = Modifier.fillMaxWidth().padding(vertical = 7.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
        ) {
            Text(label, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.weight(1f))
            Text(
                value,
                style     = MaterialTheme.typography.bodySmall,
                fontWeight = FontWeight.Medium,
                color     = MaterialTheme.colorScheme.onSurface,
                modifier  = Modifier.weight(2f),
                textAlign = TextAlign.End,
            )
        }
        Box(modifier = Modifier.fillMaxWidth().height(1.dp).background(MaterialTheme.colorScheme.surfaceVariant))
    }
}

// ─────────────────────────────────────────────────────────────
// Tag row  (fixed: Dark700 surface, TextSecondary text)
// ─────────────────────────────────────────────────────────────

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun TagRow(tags: List<String>, wrap: Boolean = false, modifier: Modifier = Modifier) {
    if (wrap) {
        FlowRow(
            modifier              = modifier,
            horizontalArrangement = Arrangement.spacedBy(6.dp),
            verticalArrangement   = Arrangement.spacedBy(6.dp),
        ) {
            tags.forEach { tag ->
                Surface(
                    color        = MaterialTheme.colorScheme.surfaceVariant,
                    contentColor = MaterialTheme.colorScheme.onSurfaceVariant,
                    shape        = RoundedCornerShape(50),
                ) {
                    Text(
                        tag,
                        style    = MaterialTheme.typography.labelSmall,
                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
                        maxLines = 1,
                    )
                }
            }
        }
    } else {
        Row(modifier = modifier, horizontalArrangement = Arrangement.spacedBy(6.dp)) {
            tags.take(4).forEach { tag ->
                Surface(color = MaterialTheme.colorScheme.surfaceVariant, contentColor = MaterialTheme.colorScheme.onSurfaceVariant, shape = RoundedCornerShape(50)) {
                    Text(
                        tag,
                        style    = MaterialTheme.typography.labelSmall,
                        modifier = Modifier.padding(horizontal = 7.dp, vertical = 3.dp),
                        maxLines = 1,
                    )
                }
            }
        }
    }
}

// ─────────────────────────────────────────────────────────────
// Empty state  (upgraded: icon + subtitle support)
// ─────────────────────────────────────────────────────────────

@Composable
fun EmptyState(
    message: String,
    modifier: Modifier = Modifier,
    icon: ImageVector = Icons.Filled.SearchOff,
    subtitle: String = "",
) {
    Column(
        modifier              = modifier.fillMaxSize(),
        horizontalAlignment   = Alignment.CenterHorizontally,
        verticalArrangement   = Arrangement.Center,
    ) {
        Box(
            modifier = Modifier
                .size(64.dp)
                .background(Brush.radialGradient(listOf(NeonViolet.copy(0.15f), Color.Transparent)), RoundedCornerShape(20.dp)),
            contentAlignment = Alignment.Center,
        ) {
            Icon(icon, null, tint = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.size(28.dp))
        }
        Spacer(Modifier.height(16.dp))
        Text(message, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold, color = MaterialTheme.colorScheme.onSurfaceVariant)
        if (subtitle.isNotBlank()) {
            Spacer(Modifier.height(4.dp))
            Text(subtitle, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant.copy(0.6f), textAlign = TextAlign.Center)
        }
    }
}

// ─────────────────────────────────────────────────────────────
// Pillar 5 — PulsingDot  (live / active indicator)
// ─────────────────────────────────────────────────────────────

@Composable
fun PulsingDot(
    color: Color = NeonGreen,
    modifier: Modifier = Modifier,
) {
    val inf = rememberInfiniteTransition(label = "pulse")
    val alpha by inf.animateFloat(
        initialValue   = 0.3f,
        targetValue    = 1f,
        animationSpec  = infiniteRepeatable(tween(700, easing = FastOutSlowInEasing), RepeatMode.Reverse),
        label          = "dotAlpha",
    )
    Box(
        modifier = modifier
            .size(8.dp)
            .background(color.copy(alpha = alpha), RoundedCornerShape(50)),
    )
}

// ─────────────────────────────────────────────────────────────
// Premium dark utility components (unchanged public API)
// ─────────────────────────────────────────────────────────────

@Composable
fun GradientBorderCard(
    gradient: List<Color> = listOf(NeonViolet.copy(alpha = 0.5f), NeonCyan.copy(alpha = 0.3f)),
    modifier: Modifier = Modifier,
    content: @Composable BoxScope.() -> Unit,
) {
    Box(
        modifier = modifier
            .clip(RoundedCornerShape(16.dp))
            .background(MaterialTheme.colorScheme.surface)
            .border(1.dp, Brush.linearGradient(gradient), RoundedCornerShape(16.dp)),
        content = content,
    )
}

@Composable
fun GradientDivider(modifier: Modifier = Modifier) {
    Box(
        modifier = modifier
            .fillMaxWidth()
            .height(1.dp)
            .background(
                Brush.horizontalGradient(
                    listOf(NeonViolet.copy(alpha = 0.3f), NeonCyan.copy(alpha = 0.2f), Color.Transparent)
                )
            )
    )
}

@Composable
fun NeonIconBox(
    icon: ImageVector,
    gradient: List<Color> = listOf(NeonViolet.copy(alpha = 0.18f), NeonCyan.copy(alpha = 0.10f)),
    tint: Color = NeonVioletBright,
    modifier: Modifier = Modifier,
) {
    Box(
        modifier = modifier
            .size(40.dp)
            .clip(RoundedCornerShape(12.dp))
            .background(Brush.linearGradient(gradient)),
        contentAlignment = Alignment.Center,
    ) {
        Icon(icon, null, tint = tint, modifier = Modifier.size(20.dp))
    }
}

@Composable
fun SectionLabel(text: String, modifier: Modifier = Modifier) {
    Column(modifier = modifier) {
        Text(
            text          = text.uppercase(),
            style         = MaterialTheme.typography.labelMedium,
            color         = MaterialTheme.colorScheme.onSurfaceVariant,
            letterSpacing = 1.2.sp,
            fontWeight    = FontWeight.SemiBold,
        )
        Spacer(Modifier.height(4.dp))
        Box(
            modifier = Modifier
                .width(28.dp)
                .height(2.dp)
                .background(Brush.horizontalGradient(listOf(NeonViolet, NeonCyan, Color.Transparent)))
        )
    }
}
