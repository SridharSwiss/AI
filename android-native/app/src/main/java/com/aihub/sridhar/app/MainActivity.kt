package com.aihub.sridhar.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.core.*
import androidx.compose.animation.*
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.gestures.detectTapGestures
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.unit.dp
import androidx.navigation.NavDestination.Companion.hierarchy
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.compose.*
import com.aihub.sridhar.app.data.repository.DataRepository
import com.aihub.sridhar.app.ui.components.GlassBackground
import com.aihub.sridhar.app.ui.navigation.*
import com.aihub.sridhar.app.ui.screens.*
import com.aihub.sridhar.app.ui.theme.*

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // Pillar 1: draw behind both status bar and navigation bar so the
        // app fills 100 % of the physical screen. WindowInsets in the
        // composable layer handle safe-zone offsets per-surface.
        enableEdgeToEdge()
        val repo = DataRepository(applicationContext)
        setContent {
            var currentPalette by remember { mutableStateOf(PaletteLight) }
            AIHubTheme(palette = currentPalette, onSelectPalette = { currentPalette = it }) {
                AIHubApp(repo)
            }
        }
    }
}

// ─────────────────────────────────────────────────────────────
// Screen transition specs  (Pillar 5 — motion tokens)
//
// "Push" feel for forward nav:  new screen slides in from right,
//   current screen retreats left at 1/3 speed (parallax depth).
// "Pop" feel for back nav:      mirror of above.
// Top-level tab switches:       shared fade-through (no slide) to
//   avoid implying directionality between peer destinations.
// ─────────────────────────────────────────────────────────────

private val pushEnter: AnimatedContentTransitionScope<*>.() -> EnterTransition = {
    slideInHorizontally(
        tween(310, easing = FastOutSlowInEasing)
    ) { it / 2 } + fadeIn(tween(200))
}

private val pushExit: AnimatedContentTransitionScope<*>.() -> ExitTransition = {
    slideOutHorizontally(
        tween(310, easing = FastOutSlowInEasing)
    ) { -it / 5 } + fadeOut(tween(200))
}

private val popEnter: AnimatedContentTransitionScope<*>.() -> EnterTransition = {
    slideInHorizontally(
        tween(310, easing = FastOutSlowInEasing)
    ) { -it / 5 } + fadeIn(tween(200))
}

private val popExit: AnimatedContentTransitionScope<*>.() -> ExitTransition = {
    slideOutHorizontally(
        tween(310, easing = FastOutSlowInEasing)
    ) { it / 2 } + fadeOut(tween(200))
}

// Peer (tab) transition — pure fade-through, no directional bias
private val tabEnter: AnimatedContentTransitionScope<*>.() -> EnterTransition = {
    fadeIn(tween(220))
}
private val tabExit: AnimatedContentTransitionScope<*>.() -> ExitTransition = {
    fadeOut(tween(160))
}

// Convenience: wrap a composable block in a top-level tab transition.
// The content lambda receiver must be AnimatedContentScope to match what
// NavHost's composable() expects — we cannot forward a plain lambda.
private fun androidx.navigation.NavGraphBuilder.topLevel(
    route: String,
    content: @Composable androidx.compose.animation.AnimatedContentScope.(androidx.navigation.NavBackStackEntry) -> Unit,
) = composable(
    route              = route,
    enterTransition    = { tabEnter() },
    exitTransition     = { tabExit() },
    popEnterTransition = { tabEnter() },
    popExitTransition  = { tabExit() },
    content            = content,
)

@Composable
fun AIHubApp(repo: DataRepository) {
    val navController  = rememberNavController()
    val backstackEntry by navController.currentBackStackEntryAsState()
    val currentRoute   = backstackEntry?.destination?.route

    val topLevelRoutes = bottomNavItems.map { it.screen.route }.toSet()
    val showBottomBar  = currentRoute in topLevelRoutes

    // Pillar 1: measure system bars at runtime — never hardcode dp values.
    val navBarPadding    = WindowInsets.navigationBars.asPaddingValues().calculateBottomPadding()
    val pillBottomPad    = navBarPadding + 12.dp
    val contentBottomPad = if (showBottomBar) navBarPadding + 80.dp else navBarPadding

    CompositionLocalProvider(
        LocalNavigateHome provides {
            navController.navigate(Screen.Home.route) {
                popUpTo(navController.graph.findStartDestination().id) { saveState = true }
                launchSingleTop = true
                restoreState    = true
            }
        }
    ) {
    Box(
        modifier = Modifier
            .fillMaxSize()
            .statusBarsPadding()
            .imePadding()
    ) {
        GlassBackground(modifier = Modifier.fillMaxSize())
        NavHost(
            navController     = navController,
            startDestination  = Screen.Home.route,
            enterTransition   = { pushEnter() },
            exitTransition    = { pushExit() },
            popEnterTransition= { popEnter() },
            popExitTransition = { popExit() },
            modifier          = Modifier
                .fillMaxSize()
                .padding(bottom = contentBottomPad),
        ) {
            // ── Top-level destinations ─────────────────────
            topLevel(Screen.Home.route) {
                HomeScreen(onNavigate = { navController.navigate(it) })
            }
            topLevel(Screen.Tools.route) {
                ToolsScreen(repo = repo, onToolClick = { navController.navigate(Screen.ToolDetail.route(it)) })
            }
            topLevel(Screen.Companies.route) {
                CompaniesScreen(repo = repo, onCompanyClick = { navController.navigate(Screen.CompanyDetail.route(it)) })
            }
            topLevel(Screen.CaseStudies.route) {
                CaseStudiesScreen(repo = repo, onCaseStudyClick = { navController.navigate(Screen.CaseStudyDetail.route(it)) })
            }
            topLevel(Screen.Compliance.route) {
                ComplianceScreen(repo = repo, onFrameworkClick = { navController.navigate(Screen.ComplianceDetail.route(it)) })
            }
            topLevel(Screen.Learn.route) {
                LearnScreen(repo = repo)
            }
            topLevel(Screen.Consulting.route) {
                ConsultingScreen(repo = repo, onPlaybookClick = { phase, idx ->
                    navController.navigate(Screen.PlaybookDetail.route(phase, idx))
                })
            }
            topLevel(Screen.News.route) {
                NewsScreen(repo = repo)
            }
            topLevel(Screen.Search.route) {
                SearchScreen(repo = repo, onNavigate = { navController.navigate(it) })
            }

            // ── Detail destinations ────────────────────────
            composable(Screen.ToolDetail.route) { back ->
                val slug = back.arguments?.getString("slug") ?: return@composable
                ToolDetailScreen(repo = repo, slug = slug, onBack = { navController.popBackStack() })
            }
            composable(Screen.CompanyDetail.route) { back ->
                val slug = back.arguments?.getString("slug") ?: return@composable
                CompanyDetailScreen(repo = repo, slug = slug, onBack = { navController.popBackStack() })
            }
            composable(Screen.CaseStudyDetail.route) { back ->
                val slug = back.arguments?.getString("slug") ?: return@composable
                CaseStudyDetailScreen(repo = repo, slug = slug, onBack = { navController.popBackStack() })
            }
            composable(Screen.ComplianceDetail.route) { back ->
                val slug = back.arguments?.getString("slug") ?: return@composable
                ComplianceDetailScreen(repo = repo, slug = slug, onBack = { navController.popBackStack() })
            }
            composable(Screen.PlaybookDetail.route) { back ->
                val phase = back.arguments?.getString("phase") ?: return@composable
                val index = back.arguments?.getString("index")?.toIntOrNull() ?: return@composable
                PlaybookDetailScreen(repo = repo, phaseId = phase, index = index, onBack = { navController.popBackStack() })
            }
        }

        // Pillar 2 — Floating pill nav
        // Animates in/out as a unit when entering/leaving top-level routes.
        AnimatedVisibility(
            visible = showBottomBar,
            enter   = slideInVertically(tween(260, easing = FastOutSlowInEasing)) { it } + fadeIn(tween(200)),
            exit    = slideOutVertically(tween(200)) { it } + fadeOut(tween(160)),
            modifier = Modifier.align(Alignment.BottomCenter).padding(bottom = pillBottomPad),
        ) {
            FloatingPillNav(
                items          = bottomNavItems,
                currentRoute   = currentRoute,
                backstackEntry = backstackEntry,
                onItemClick    = { item ->
                    navController.navigate(item.screen.route) {
                        popUpTo(navController.graph.findStartDestination().id) { saveState = true }
                        launchSingleTop = true
                        restoreState    = true
                    }
                }
            )
        }
    }
    } // end CompositionLocalProvider(LocalNavigateHome)
}

// ─────────────────────────────────────────────────────────────
// Floating pill navigation (Pillar 2 + 5)
//
// Each tab button has its own spring-based scale animation on
// press so taps feel instantaneous and physical.
// Selected indicator uses animateFloatAsState for smooth
// alpha fade between active / inactive states.
// ─────────────────────────────────────────────────────────────

@Composable
private fun FloatingPillNav(
    items: List<BottomNavItem>,
    currentRoute: String?,
    backstackEntry: androidx.navigation.NavBackStackEntry?,
    modifier: Modifier = Modifier,
    onItemClick: (BottomNavItem) -> Unit,
) {
    val palette = LocalAppPalette.current
    val isDark  = LocalDarkTheme.current
    val pillBg  = if (isDark) Color(0x99000000) else Color(0xCCFFFFFF)
    Box(
        modifier = modifier
            .clip(RoundedCornerShape(50))
            .background(pillBg)
            .border(
                1.dp,
                Brush.linearGradient(listOf(palette.g1.copy(0.40f), palette.g2.copy(0.22f), palette.g1.copy(0.10f))),
                RoundedCornerShape(50),
            )
    ) {
        Row(
            modifier              = Modifier.padding(horizontal = 6.dp, vertical = 6.dp),
            horizontalArrangement = Arrangement.spacedBy(2.dp),
            verticalAlignment     = Alignment.CenterVertically,
        ) {
            items.forEach { item ->
                val selected = backstackEntry?.destination
                    ?.hierarchy?.any { it.route == item.screen.route } == true

                PillTab(
                    item     = item,
                    selected = selected,
                    onClick  = { onItemClick(item) },
                )
            }
        }
    }
}

@Composable
private fun PillTab(
    item: BottomNavItem,
    selected: Boolean,
    onClick: () -> Unit,
) {
    var pressed by remember { mutableStateOf(false) }
    val scale by animateFloatAsState(
        targetValue   = if (pressed) 0.88f else 1f,
        animationSpec = spring(Spring.DampingRatioMediumBouncy, Spring.StiffnessHigh),
        label         = "tabScale",
    )
    val palette = LocalAppPalette.current
    val bgAlpha by animateFloatAsState(
        targetValue   = if (selected) 0.18f else 0f,
        animationSpec = tween(200),
        label         = "tabBg",
    )
    val iconTint by animateColorAsState(
        targetValue   = if (selected) palette.g1 else MaterialTheme.colorScheme.onSurfaceVariant,
        animationSpec = tween(200),
        label         = "tabTint",
    )

    Box(
        modifier = Modifier
            .graphicsLayer { scaleX = scale; scaleY = scale }
            .clip(RoundedCornerShape(50))
            .background(palette.g1.copy(alpha = bgAlpha))
            .pointerInput(onClick) {
                detectTapGestures(
                    onPress = { pressed = true; tryAwaitRelease(); pressed = false },
                    onTap   = { onClick() },
                )
            }
    ) {
        Column(
            modifier            = Modifier.padding(horizontal = 16.dp, vertical = 9.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(3.dp),
        ) {
            Icon(
                imageVector        = if (selected) item.selectedIcon else item.unselectedIcon,
                contentDescription = item.label,
                tint               = iconTint,
                modifier           = Modifier.size(21.dp),
            )
            Text(
                text  = item.label,
                style = MaterialTheme.typography.labelSmall,
                color = iconTint,
            )
        }
    }
}
