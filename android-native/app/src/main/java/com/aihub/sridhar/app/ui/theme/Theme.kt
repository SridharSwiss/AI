package com.aihub.sridhar.app.ui.theme

import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.ui.graphics.Color

// Glass colour scheme — palette.seed drives primary; surfaces are frosted white over the deep bg.
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
    background           = palette.bgTop,          // used by transparent containers
    onBackground         = White,
    surface              = Color(0x1AFFFFFF),       // 10 % frosted glass
    onSurface            = White,
    surfaceVariant       = Color(0x26FFFFFF),       // 15 % for elevated glass
    onSurfaceVariant     = White.copy(alpha = 0.65f),
    outline              = Color(0x40FFFFFF),       // 25 % white border
    outlineVariant       = Color(0x26FFFFFF),
    error                = Rose500,
    onError              = White,
    scrim                = Black,
    inverseSurface       = White,
    inverseOnSurface     = palette.bgTop,
    inversePrimary       = palette.g1,
)

@Composable
fun AIHubTheme(
    palette: AppPalette = PaletteCosmicDark,
    onSelectPalette: (AppPalette) -> Unit = {},
    content: @Composable () -> Unit,
) {
    CompositionLocalProvider(
        LocalDarkTheme      provides true,
        LocalAppPalette     provides palette,
        LocalSelectPalette  provides onSelectPalette,
    ) {
        MaterialTheme(
            colorScheme = glassColorScheme(palette),
            typography  = Typography,
            content     = content,
        )
    }
}
