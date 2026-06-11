package com.aihub.sridhar.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.navigation.NavDestination.Companion.hierarchy
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.compose.*
import com.aihub.sridhar.app.data.repository.DataRepository
import com.aihub.sridhar.app.ui.navigation.*
import com.aihub.sridhar.app.ui.screens.*
import com.aihub.sridhar.app.ui.theme.*

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        val repo = DataRepository(applicationContext)
        setContent {
            AIHubTheme { AIHubApp(repo) }
        }
    }
}

@Composable
fun AIHubApp(repo: DataRepository) {
    val navController   = rememberNavController()
    val backstackEntry  by navController.currentBackStackEntryAsState()
    val currentRoute    = backstackEntry?.destination?.route

    val topLevelRoutes  = bottomNavItems.map { it.screen.route }.toSet()
    val showBottomBar   = currentRoute in topLevelRoutes

    // Measure the system navigation bar height so we never overlap it
    val navBarPadding   = WindowInsets.navigationBars.asPaddingValues().calculateBottomPadding()
    // Pill + gap above nav bar
    val pillBottomPad   = navBarPadding + 12.dp
    val contentBottomPad = if (showBottomBar) navBarPadding + 80.dp else navBarPadding

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Dark900)
            .statusBarsPadding()           // push content below status bar
    ) {
        NavHost(
            navController    = navController,
            startDestination = Screen.Home.route,
            modifier         = Modifier
                .fillMaxSize()
                .padding(bottom = contentBottomPad),
        ) {
            composable(Screen.Home.route) {
                HomeScreen(onNavigate = { navController.navigate(it) })
            }
            composable(Screen.Tools.route) {
                ToolsScreen(repo = repo, onToolClick = { navController.navigate(Screen.ToolDetail.route(it)) })
            }
            composable(Screen.ToolDetail.route) { back ->
                val slug = back.arguments?.getString("slug") ?: return@composable
                ToolDetailScreen(repo = repo, slug = slug, onBack = { navController.popBackStack() })
            }
            composable(Screen.Companies.route) {
                CompaniesScreen(repo = repo, onCompanyClick = { navController.navigate(Screen.CompanyDetail.route(it)) })
            }
            composable(Screen.CompanyDetail.route) { back ->
                val slug = back.arguments?.getString("slug") ?: return@composable
                CompanyDetailScreen(repo = repo, slug = slug, onBack = { navController.popBackStack() })
            }
            composable(Screen.CaseStudies.route) {
                CaseStudiesScreen(repo = repo, onCaseStudyClick = { navController.navigate(Screen.CaseStudyDetail.route(it)) })
            }
            composable(Screen.CaseStudyDetail.route) { back ->
                val slug = back.arguments?.getString("slug") ?: return@composable
                CaseStudyDetailScreen(repo = repo, slug = slug, onBack = { navController.popBackStack() })
            }
            composable(Screen.Compliance.route) {
                ComplianceScreen(repo = repo, onFrameworkClick = { navController.navigate(Screen.ComplianceDetail.route(it)) })
            }
            composable(Screen.ComplianceDetail.route) { back ->
                val slug = back.arguments?.getString("slug") ?: return@composable
                ComplianceDetailScreen(repo = repo, slug = slug, onBack = { navController.popBackStack() })
            }
            composable(Screen.Learn.route) {
                LearnScreen(repo = repo)
            }
            composable(Screen.Consulting.route) {
                ConsultingScreen(repo = repo, onPlaybookClick = { phase, idx ->
                    navController.navigate(Screen.PlaybookDetail.route(phase, idx))
                })
            }
            composable(Screen.PlaybookDetail.route) { back ->
                val phase = back.arguments?.getString("phase") ?: return@composable
                val index = back.arguments?.getString("index")?.toIntOrNull() ?: return@composable
                PlaybookDetailScreen(repo = repo, phaseId = phase, index = index, onBack = { navController.popBackStack() })
            }
            composable(Screen.News.route) {
                NewsScreen(repo = repo)
            }
            composable(Screen.Search.route) {
                SearchScreen(repo = repo, onNavigate = { navController.navigate(it) })
            }
        }

        // Floating pill — sits above the system navigation bar
        if (showBottomBar) {
            FloatingPillNav(
                items          = bottomNavItems,
                currentRoute   = currentRoute,
                backstackEntry = backstackEntry,
                modifier       = Modifier
                    .align(Alignment.BottomCenter)
                    .padding(bottom = pillBottomPad),
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
}

@Composable
private fun FloatingPillNav(
    items: List<BottomNavItem>,
    currentRoute: String?,
    backstackEntry: androidx.navigation.NavBackStackEntry?,
    modifier: Modifier = Modifier,
    onItemClick: (BottomNavItem) -> Unit,
) {
    Box(
        modifier = modifier
            .clip(RoundedCornerShape(50))
            .background(Dark800.copy(alpha = 0.96f))
            .border(1.dp, Brush.linearGradient(listOf(NeonViolet.copy(0.35f), NeonCyan.copy(0.2f), NeonViolet.copy(0.1f))), RoundedCornerShape(50))
    ) {
        Row(
            modifier = Modifier.padding(horizontal = 6.dp, vertical = 6.dp),
            horizontalArrangement = Arrangement.spacedBy(2.dp),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            items.forEach { item ->
                val selected = backstackEntry?.destination
                    ?.hierarchy?.any { it.route == item.screen.route } == true
                val iconTint = if (selected) NeonViolet else TextSecondary

                Surface(
                    color    = if (selected) NeonViolet.copy(alpha = 0.15f) else Color.Transparent,
                    shape    = RoundedCornerShape(50),
                    onClick  = { onItemClick(item) },
                ) {
                    Column(
                        modifier = Modifier.padding(horizontal = 16.dp, vertical = 9.dp),
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
        }
    }
}
