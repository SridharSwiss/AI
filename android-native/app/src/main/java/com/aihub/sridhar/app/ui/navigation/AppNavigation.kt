package com.aihub.sridhar.app.ui.navigation

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material.icons.outlined.*
import androidx.compose.ui.graphics.vector.ImageVector

sealed class Screen(val route: String) {
    object Home           : Screen("home")
    object Tools          : Screen("tools")
    object ToolDetail     : Screen("tools/{slug}") {
        fun route(slug: String) = "tools/$slug"
    }
    object Companies      : Screen("companies")
    object CompanyDetail  : Screen("companies/{slug}") {
        fun route(slug: String) = "companies/$slug"
    }
    object CaseStudies    : Screen("case_studies")
    object CaseStudyDetail: Screen("case_studies/{slug}") {
        fun route(slug: String) = "case_studies/$slug"
    }
    object Compliance     : Screen("compliance")
    object ComplianceDetail: Screen("compliance/{slug}") {
        fun route(slug: String) = "compliance/$slug"
    }
    object Learn          : Screen("learn")
    object Consulting     : Screen("consulting")
    object PlaybookDetail : Screen("consulting/{phase}/{index}") {
        fun route(phase: String, index: Int) = "consulting/$phase/$index"
    }
    object Search         : Screen("search")
}

data class BottomNavItem(
    val screen: Screen,
    val label: String,
    val selectedIcon: ImageVector,
    val unselectedIcon: ImageVector,
)

val bottomNavItems = listOf(
    BottomNavItem(Screen.Home,       "Home",       Icons.Filled.Home,          Icons.Outlined.Home),
    BottomNavItem(Screen.Tools,      "Tools",      Icons.Filled.Build,         Icons.Outlined.Build),
    BottomNavItem(Screen.Companies,  "Companies",  Icons.Filled.Business,      Icons.Outlined.Business),
    BottomNavItem(Screen.Compliance, "Compliance", Icons.Filled.Shield,        Icons.Outlined.Shield),
    BottomNavItem(Screen.Search,     "Search",     Icons.Filled.Search,        Icons.Outlined.Search),
)
