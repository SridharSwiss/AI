package com.aihub.sridhar.app.ui.theme

import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.platform.LocalContext

private val DarkColorScheme = darkColorScheme(
    primary            = Violet500,
    onPrimary          = Zinc950,
    primaryContainer   = Violet600,
    secondary          = Emerald500,
    onSecondary        = Zinc950,
    background         = Zinc950,
    onBackground       = Zinc100,
    surface            = Zinc900,
    onSurface          = Zinc100,
    surfaceVariant     = Zinc800,
    onSurfaceVariant   = Zinc400,
    outline            = Zinc700,
    error              = Rose500,
)

private val LightColorScheme = lightColorScheme(
    primary            = Violet600,
    onPrimary          = Zinc50,
    primaryContainer   = Violet100,
    secondary          = Emerald500,
    onSecondary        = Zinc50,
    background         = Zinc50,
    onBackground       = Zinc950,
    surface            = Color(0xFFFFFFFF),
    onSurface          = Zinc950,
    surfaceVariant     = Zinc100,
    onSurfaceVariant   = Zinc700,
    outline            = Color(0xFFE4E4E7),
    error              = Rose500,
)

// pull in white as a named constant to keep the import clean
private val Color = androidx.compose.ui.graphics.Color

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
