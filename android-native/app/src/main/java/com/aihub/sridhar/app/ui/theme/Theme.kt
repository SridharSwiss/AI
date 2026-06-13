package com.aihub.sridhar.app.ui.theme

import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.ui.graphics.Color

// Dark glass — frosted white surfaces over deep bg gradient
private fun glassColorScheme(palette: AppPalette) = darkColorScheme(
    primary              = palette.seed,
    onPrimary            = White,
    primaryContainer     = palette.seed.copy(alpha = 0.20f),
    onPrimaryContainer   = palette.g1,
    secondary            = palette.g2,
    onSecondary          = White,
    secondaryContainer   = palette.g2.copy(alpha = 0.15f),
    onSecondaryContainer = palette.g2,
    tertiary             = palette.t2,
    onTertiary           = White,
    background           = palette.bgTop,
    onBackground         = White,
    surface              = Color(0x26FFFFFF),       // 15% frosted glass
    onSurface            = White,
    surfaceVariant       = Color(0x33FFFFFF),       // 20% elevated glass
    onSurfaceVariant     = White.copy(alpha = 0.70f),
    outline              = Color(0x55FFFFFF),       // 33% white border
    outlineVariant       = Color(0x33FFFFFF),
    error                = Rose500,
    onError              = White,
    scrim                = Black,
    inverseSurface       = White,
    inverseOnSurface     = palette.bgTop,
    inversePrimary       = palette.g1,
)

// Light glass — soft frosted surfaces over pale lavender bg
private fun lightGlassColorScheme(palette: AppPalette) = lightColorScheme(
    primary              = palette.seed.forLightBackground(),
    onPrimary            = White,
    primaryContainer     = palette.seed.copy(alpha = 0.12f),
    onPrimaryContainer   = palette.seed.forLightBackground(),
    secondary            = palette.g1.forLightBackground(),
    onSecondary          = White,
    secondaryContainer   = palette.g1.copy(alpha = 0.10f),
    onSecondaryContainer = palette.g1.forLightBackground(),
    tertiary             = palette.t2.forLightBackground(),
    onTertiary           = White,
    background           = LightBackground,
    onBackground         = LightOnBg,
    surface              = Color(0xCCFFFFFF),       // 80% white frosted glass
    onSurface            = LightOnSurface,
    surfaceVariant       = Color(0xFFF1F0F9),
    onSurfaceVariant     = LightOnSurfaceVar,
    outline              = LightBorder,
    outlineVariant       = Color(0xFFE8E6F2),
    error                = Color(0xFFDC2626),
    onError              = White,
    scrim                = Color(0xFF000000),
    inverseSurface       = Color(0xFF1A1030),
    inverseOnSurface     = White,
    inversePrimary       = palette.g1,
)

@Composable
fun AIHubTheme(
    palette: AppPalette = PaletteLight,
    onSelectPalette: (AppPalette) -> Unit = {},
    content: @Composable () -> Unit,
) {
    val isDark = palette.isDark
    CompositionLocalProvider(
        LocalDarkTheme      provides isDark,
        LocalAppPalette     provides palette,
        LocalSelectPalette  provides onSelectPalette,
    ) {
        MaterialTheme(
            colorScheme = if (isDark) glassColorScheme(palette) else lightGlassColorScheme(palette),
            typography  = Typography,
            content     = content,
        )
    }
}
