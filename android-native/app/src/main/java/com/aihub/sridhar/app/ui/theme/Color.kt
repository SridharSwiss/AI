package com.aihub.sridhar.app.ui.theme

import androidx.compose.runtime.staticCompositionLocalOf
import androidx.compose.ui.graphics.Color

// ── Base backgrounds (near-black) ─────────────────────────
val Black     = Color(0xFF050507)
val Dark900   = Color(0xFF0C0C10)
val Dark800   = Color(0xFF111116)
val Dark700   = Color(0xFF18181F)
val Dark600   = Color(0xFF1F1F28)
val Dark500   = Color(0xFF27272F)
val Dark400   = Color(0xFF32323C)
val Dark300   = Color(0xFF3E3E4A)

// ── Text ─────────────────────────────────────────────────
val TextPrimary   = Color(0xFFF8F8FF)
val TextSecondary = Color(0xFF9898A8)
val TextMuted     = Color(0xFF5E5E6E)

// ── Neon brand ────────────────────────────────────────────
val NeonViolet    = Color(0xFF8B5CF6)   // electric violet
val NeonVioletBright = Color(0xFFA78BFA)
val NeonPink      = Color(0xFFF059DA)   // hot pink
val NeonCyan      = Color(0xFF22D3EE)   // electric cyan
val NeonGreen     = Color(0xFF4ADE80)   // acid green
val NeonAmber     = Color(0xFFFBBF24)   // electric amber

// ── Semantic (dark-mode tuned) ────────────────────────────
val Violet600 = Color(0xFF7C3AED)
val Violet500 = Color(0xFF8B5CF6)
val Violet400 = Color(0xFFA78BFA)
val Violet100 = Color(0xFF2E1F4A)   // dark tint
val Violet50  = Color(0xFF1A1030)

val Blue500  = Color(0xFF60A5FA)
val Blue400  = Color(0xFF93C5FD)
val Blue100  = Color(0xFF1A2A4A)

val Emerald500 = Color(0xFF34D399)
val Emerald400 = Color(0xFF6EE7B7)
val Emerald100 = Color(0xFF0E2D22)

val Amber500 = Color(0xFFFBBF24)
val Amber400 = Color(0xFFFCD34D)
val Amber100 = Color(0xFF2D2010)

val Rose500  = Color(0xFFFB7185)
val Rose400  = Color(0xFFFDA4AF)
val Rose100  = Color(0xFF2D0F15)

val Pink500  = Color(0xFFF472B6)
val Pink400  = Color(0xFFF9A8D4)
val Pink100  = Color(0xFF2D0F22)

val Green500 = Color(0xFF4ADE80)
val Green400 = Color(0xFF86EFAC)
val Green100 = Color(0xFF0F2D1A)

val Purple500 = Color(0xFFC084FC)
val Purple400 = Color(0xFFD8B4FE)
val Purple100 = Color(0xFF250A3C)

val Sky500   = Color(0xFF38BDF8)
val Sky100   = Color(0xFF0A2035)

// ── Neutral ───────────────────────────────────────────────
val Zinc950  = Color(0xFF09090B)
val Zinc900  = Color(0xFF111113)
val Zinc800  = Color(0xFF27272A)
val Zinc700  = Color(0xFF3F3F46)
val Zinc600  = Color(0xFF52525B)
val Zinc500  = Color(0xFF71717A)
val Zinc400  = Color(0xFFA1A1AA)
val Zinc300  = Color(0xFFD4D4D8)
val Zinc200  = Color(0xFFE4E4E7)
val Zinc100  = Color(0xFFF4F4F5)
val Zinc50   = Color(0xFFFAFAFA)
val White    = Color(0xFFFFFFFF)

// ── Aliases ───────────────────────────────────────────────
val Emerald600 = Emerald500
val Blue600    = Blue500
val Amber600   = Amber500
val Rose600    = Rose500
val Green600   = Green500
val Purple600  = Purple500
val Violet50_light  = Violet50
val BrandPrimary    = NeonViolet
val BrandSecondary  = NeonCyan
val SurfaceLight    = White
val SurfaceDark     = Dark700
val BgLight         = Zinc50
val BgDark          = Dark900

// ── Light theme colours ───────────────────────────────────
val LightBackground   = Color(0xFFF8F7FF)   // barely-violet white
val LightSurface      = Color(0xFFFFFFFF)
val LightSurfaceVar   = Color(0xFFF1F0F9)
val LightBorder       = Color(0xFFE0DFEA)
val LightOnBg         = Color(0xFF111116)
val LightOnSurface    = Color(0xFF18181F)
val LightOnSurfaceVar = Color(0xFF52525B)
val LightOnMuted      = Color(0xFF71717A)

// ── Theme CompositionLocal ────────────────────────────────
val LocalDarkTheme = staticCompositionLocalOf { true }

// ── Light-mode colour darkening for accessibility ─────────
// Darkens a neon colour ~42 % so it passes WCAG AA on white.
fun Color.forLightBackground(): Color = Color(
    red   = (red   * 0.58f).coerceIn(0f, 1f),
    green = (green * 0.58f).coerceIn(0f, 1f),
    blue  = (blue  * 0.58f).coerceIn(0f, 1f),
    alpha = alpha,
)

// ── Multi-colour palettes ─────────────────────────────────
// Each palette provides 6 distinct vivid tile accent colours
// (t1-t6) plus a global gradient pair (g1/g2) used by the
// app bar brand text, nav pill border, and divider lines.

data class AppPalette(
    val name: String,
    val seed: Color,
    // tile accent colours (one per home tile, all distinct)
    val t1: Color, val t2: Color, val t3: Color,
    val t4: Color, val t5: Color, val t6: Color,
    // global gradient pair
    val g1: Color, val g2: Color,
)

val PaletteCosmicDark = AppPalette(
    name = "Cosmic",  seed = Color(0xFF8B5CF6),
    t1   = Color(0xFF8B5CF6), t2 = Color(0xFFF059DA), t3 = Color(0xFFFBBF24),
    t4   = Color(0xFF4ADE80), t5 = Color(0xFFA78BFA), t6 = Color(0xFF22D3EE),
    g1   = Color(0xFF8B5CF6), g2 = Color(0xFF22D3EE),
)
val PaletteEmber = AppPalette(
    name = "Ember",   seed = Color(0xFFFF6B35),
    t1   = Color(0xFFFF6B35), t2 = Color(0xFFFF3355), t3 = Color(0xFFFFCC00),
    t4   = Color(0xFFCCFF00), t5 = Color(0xFFFF8C42), t6 = Color(0xFFFF4488),
    g1   = Color(0xFFFF6B35), g2 = Color(0xFFFFCC00),
)
val PaletteJade = AppPalette(
    name = "Jade",    seed = Color(0xFF00E896),
    t1   = Color(0xFF00E896), t2 = Color(0xFF00D4C8), t3 = Color(0xFF88FF00),
    t4   = Color(0xFF00FFAA), t5 = Color(0xFF00CCFF), t6 = Color(0xFF66FF55),
    g1   = Color(0xFF00E896), g2 = Color(0xFF00D4C8),
)
val PaletteSakura = AppPalette(
    name = "Sakura",  seed = Color(0xFFFF6EB4),
    t1   = Color(0xFFFF6EB4), t2 = Color(0xFFFF91DC), t3 = Color(0xFFBB66FF),
    t4   = Color(0xFFFF4466), t5 = Color(0xFFFF44CC), t6 = Color(0xFFDD66FF),
    g1   = Color(0xFFFF6EB4), g2 = Color(0xFFBB66FF),
)
val PaletteOcean = AppPalette(
    name = "Ocean",   seed = Color(0xFF00AAFF),
    t1   = Color(0xFF00AAFF), t2 = Color(0xFF00FFEA), t3 = Color(0xFF4D88FF),
    t4   = Color(0xFF00CCFF), t5 = Color(0xFF6644FF), t6 = Color(0xFF00EEFF),
    g1   = Color(0xFF00AAFF), g2 = Color(0xFF00FFEA),
)

val AllPalettes = listOf(PaletteCosmicDark, PaletteEmber, PaletteJade, PaletteSakura, PaletteOcean)

// Provided by AIHubTheme / AIHubApp — read anywhere in the tree.
val LocalAppPalette   = staticCompositionLocalOf<AppPalette> { PaletteCosmicDark }
val LocalSelectPalette = staticCompositionLocalOf<(AppPalette) -> Unit> { {} }
val LocalNavigateHome  = staticCompositionLocalOf<() -> Unit> { {} }
