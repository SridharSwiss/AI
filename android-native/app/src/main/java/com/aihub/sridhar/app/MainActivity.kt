package com.aihub.sridhar.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
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
    val navController = rememberNavController()
    val backstackEntry by navController.currentBackStackEntryAsState()
    val currentRoute   = backstackEntry?.destination?.route

    val topLevelRoutes = bottomNavItems.map { it.screen.route }.toSet()
    val showBottomBar  = currentRoute in topLevelRoutes

    Box(modifier = Modifier.fillMaxSize()) {
        NavHost(
            navController    = navController,
            startDestination = Screen.Home.route,
            modifier         = Modifier
                .fillMaxSize()
                .padding(bottom = if (showBottomBar) 88.dp else 0.dp),
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

        // Floating pill navigation
        if (showBottomBar) {
            FloatingPillNav(
                items         = bottomNavItems,
                currentRoute  = currentRoute,
                backstackEntry = backstackEntry,
                modifier      = Modifier.align(Alignment.BottomCenter).padding(bottom = 20.dp),
                onItemClick   = { item ->
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
    Surface(
        modifier = modifier.clip(RoundedCornerShape(50)),
        color    = Dark800.copy(alpha = 0.95f),
        shadowElevation = 16.dp,
        shape    = RoundedCornerShape(50),
        tonalElevation = 4.dp,
    ) {
        Row(
            modifier = Modifier.padding(horizontal = 8.dp, vertical = 8.dp),
            horizontalArrangement = Arrangement.spacedBy(4.dp),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            items.forEach { item ->
                val selected = backstackEntry?.destination
                    ?.hierarchy?.any { it.route == item.screen.route } == true

                val bgColor = if (selected) NeonViolet.copy(alpha = 0.18f) else Color.Transparent
                val iconTint = if (selected) NeonViolet else TextSecondary

                Surface(
                    color  = bgColor,
                    shape  = RoundedCornerShape(50),
                    modifier = Modifier,
                    onClick = { onItemClick(item) },
                ) {
                    Column(
                        modifier = Modifier.padding(horizontal = 14.dp, vertical = 8.dp),
                        horizontalAlignment = Alignment.CenterHorizontally,
                        verticalArrangement = Arrangement.spacedBy(3.dp),
                    ) {
                        Icon(
                            imageVector = if (selected) item.selectedIcon else item.unselectedIcon,
                            contentDescription = item.label,
                            tint     = iconTint,
                            modifier = Modifier.size(22.dp),
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
