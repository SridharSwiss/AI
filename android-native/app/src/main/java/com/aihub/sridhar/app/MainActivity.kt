package com.aihub.sridhar.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalUriHandler
import androidx.navigation.NavDestination.Companion.hierarchy
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.aihub.sridhar.app.data.repository.DataRepository
import com.aihub.sridhar.app.ui.navigation.*
import com.aihub.sridhar.app.ui.screens.*
import com.aihub.sridhar.app.ui.theme.AIHubTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        val repo = DataRepository(applicationContext)
        setContent {
            AIHubTheme {
                AIHubApp(repo)
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AIHubApp(repo: DataRepository) {
    val navController = rememberNavController()
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentDest = navBackStackEntry?.destination

    // Routes where bottom nav should show
    val topLevelRoutes = bottomNavItems.map { it.screen.route }.toSet()
    val showBottomBar = currentDest?.route in topLevelRoutes

    Scaffold(
        modifier = Modifier.fillMaxSize(),
        bottomBar = {
            if (showBottomBar) {
                NavigationBar {
                    bottomNavItems.forEach { item ->
                        val selected = currentDest?.hierarchy?.any { it.route == item.screen.route } == true
                        NavigationBarItem(
                            selected = selected,
                            onClick  = {
                                navController.navigate(item.screen.route) {
                                    popUpTo(navController.graph.findStartDestination().id) { saveState = true }
                                    launchSingleTop = true
                                    restoreState = true
                                }
                            },
                            icon  = { Icon(if (selected) item.selectedIcon else item.unselectedIcon, item.label) },
                            label = { Text(item.label, style = MaterialTheme.typography.labelSmall) },
                        )
                    }
                }
            }
        }
    ) { innerPadding ->
        NavHost(
            navController    = navController,
            startDestination = Screen.Home.route,
            modifier         = Modifier.padding(innerPadding),
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
            composable(Screen.Search.route) {
                SearchScreen(repo = repo, onNavigate = { navController.navigate(it) })
            }
        }
    }
}
