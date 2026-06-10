package com.aihub.sridhar.app.ui.theme

import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.platform.LocalContext

private val DarkColorScheme = darkColorScheme(
    primary            = Violet400,
    onPrimary          = Zinc950,
    primaryContainer   = Violet600,
    onPrimaryContainer = Zinc100,
    secondary          = Sky500,
    onSecondary        = Zinc950,
    background         = Zinc950,
    onBackground       = Zinc50,
    surface            = SurfaceDark,
    onSurface          = Zinc100,
    surfaceVariant     = Zinc800,
    onSurfaceVariant   = Zinc400,
    outline            = Zinc700,
    outlineVariant     = Zinc800,
    error              = Rose500,
    scrim              = Zinc950,
    inverseSurface     = Zinc100,
    inverseOnSurface   = Zinc900,
    inversePrimary     = Violet600,
)

private val LightColorScheme = lightColorScheme(
    primary            = BrandPrimary,
    onPrimary          = White,
    primaryContainer   = Violet100,
    onPrimaryContainer = Violet600,
    secondary          = BrandSecondary,
    onSecondary        = White,
    background         = BgLight,
    onBackground       = Zinc950,
    surface            = SurfaceLight,
    onSurface          = Zinc950,
    surfaceVariant     = Zinc100,
    onSurfaceVariant   = Zinc600,
    outline            = Zinc200,
    outlineVariant     = Zinc100,
    error              = Rose600,
    scrim              = Zinc950,
    inverseSurface     = Zinc900,
    inverseOnSurface   = Zinc100,
    inversePrimary     = Violet400,
)

@Composable
fun AIHubTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    dynamicColor: Boolean = false,
    content: @Composable () -> Unit,
) {
    val colorScheme = when {
        dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S -> {
            val ctx = LocalContext.current
            if (darkTheme) dynamicDarkColorScheme(ctx) else dynamicLightColorScheme(ctx)
        }
        darkTheme -> DarkColorScheme
        else      -> LightColorScheme
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography  = Typography,
        content     = content,
    )
}
