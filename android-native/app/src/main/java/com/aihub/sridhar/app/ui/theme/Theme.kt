package com.aihub.sridhar.app.ui.theme

import android.os.Build
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.platform.LocalContext

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

/**
 * On Android 12+ (API 31), [dynamicColor] uses the user's wallpaper to generate a harmonious
 * M3 tonal palette. Set to false (default) to preserve the neon brand identity.
 * Toggle to true in Settings to let users personalise.
 */
@Composable
fun AIHubTheme(
    dynamicColor: Boolean = false,
    content: @Composable () -> Unit,
) {
    val colorScheme = when {
        dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S ->
            dynamicDarkColorScheme(LocalContext.current)
        else -> DarkColorScheme
    }
    MaterialTheme(
        colorScheme = colorScheme,
        typography  = Typography,
        content     = content,
    )
}
