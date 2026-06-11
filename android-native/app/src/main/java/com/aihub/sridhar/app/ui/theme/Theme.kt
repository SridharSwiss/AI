package com.aihub.sridhar.app.ui.theme

import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.ui.graphics.Color

private val DarkColorScheme = darkColorScheme(
    primary              = NeonViolet,
    onPrimary            = White,
    primaryContainer     = Violet50,
    onPrimaryContainer   = NeonVioletBright,
    secondary            = NeonCyan,
    onSecondary          = Dark900,
    secondaryContainer   = Dark700,
    onSecondaryContainer = NeonCyan,
    tertiary             = NeonPink,
    onTertiary           = White,
    background           = Dark900,
    onBackground         = TextPrimary,
    surface              = Dark800,
    onSurface            = TextPrimary,
    surfaceVariant       = Dark700,
    onSurfaceVariant     = TextSecondary,
    outline              = Dark400,
    outlineVariant       = Dark500,
    error                = Rose500,
    onError              = White,
    scrim                = Black,
    inverseSurface       = TextPrimary,
    inverseOnSurface     = Dark900,
    inversePrimary       = Violet600,
)

private val LightColorScheme = lightColorScheme(
    primary              = Violet600,
    onPrimary            = White,
    primaryContainer     = Color(0xFFEDE9FE),
    onPrimaryContainer   = Violet600,
    secondary            = Color(0xFF0891B2),
    onSecondary          = White,
    secondaryContainer   = Color(0xFFE0F7FA),
    onSecondaryContainer = Color(0xFF004A57),
    tertiary             = Color(0xFFBE185D),
    onTertiary           = White,
    background           = LightBackground,
    onBackground         = LightOnBg,
    surface              = LightSurface,
    onSurface            = LightOnSurface,
    surfaceVariant       = LightSurfaceVar,
    onSurfaceVariant     = LightOnSurfaceVar,
    outline              = LightBorder,
    outlineVariant       = Color(0xFFECEBF5),
    error                = Color(0xFFDC2626),
    onError              = White,
    scrim                = Color(0xFF000000),
    inverseSurface       = LightOnBg,
    inverseOnSurface     = White,
    inversePrimary       = NeonVioletBright,
)

@Composable
fun AIHubTheme(
    darkTheme: Boolean = true,
    content: @Composable () -> Unit,
) {
    val colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme
    CompositionLocalProvider(LocalDarkTheme provides darkTheme) {
        MaterialTheme(
            colorScheme = colorScheme,
            typography  = Typography,
            content     = content,
        )
    }
}
