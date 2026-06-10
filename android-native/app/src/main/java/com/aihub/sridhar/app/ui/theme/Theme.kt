package com.aihub.sridhar.app.ui.theme

import androidx.compose.material3.*
import androidx.compose.runtime.Composable

private val DarkColorScheme = darkColorScheme(
    primary            = NeonViolet,
    onPrimary          = White,
    primaryContainer   = Violet50,
    onPrimaryContainer = NeonVioletBright,
    secondary          = NeonCyan,
    onSecondary        = Dark900,
    secondaryContainer = Dark700,
    onSecondaryContainer = NeonCyan,
    tertiary           = NeonPink,
    onTertiary         = White,
    background         = Dark900,
    onBackground       = TextPrimary,
    surface            = Dark800,
    onSurface          = TextPrimary,
    surfaceVariant     = Dark700,
    onSurfaceVariant   = TextSecondary,
    outline            = Dark400,
    outlineVariant     = Dark500,
    error              = Rose500,
    onError            = White,
    scrim              = Black,
    inverseSurface     = TextPrimary,
    inverseOnSurface   = Dark900,
    inversePrimary     = Violet600,
)

@Composable
fun AIHubTheme(
    content: @Composable () -> Unit,
) {
    MaterialTheme(
        colorScheme = DarkColorScheme,
        typography  = Typography,
        content     = content,
    )
}
