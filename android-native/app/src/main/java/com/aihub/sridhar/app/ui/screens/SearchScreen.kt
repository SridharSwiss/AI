package com.aihub.sridhar.app.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.aihub.sridhar.app.data.repository.DataRepository
import com.aihub.sridhar.app.ui.navigation.Screen

sealed class SearchResult(val route: String) {
    data class ToolResult(val slug: String, val name: String, val sub: String) : SearchResult(Screen.ToolDetail.route(slug))
    data class CompanyResult(val slug: String, val name: String, val sub: String) : SearchResult(Screen.CompanyDetail.route(slug))
    data class CaseStudyResult(val slug: String, val name: String, val sub: String) : SearchResult(Screen.CaseStudyDetail.route(slug))
    data class ComplianceResult(val slug: String, val name: String, val sub: String) : SearchResult(Screen.ComplianceDetail.route(slug))
    data class LearnResult(val slug: String, val name: String, val sub: String, val link: String) : SearchResult("learn")
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SearchScreen(repo: DataRepository, onNavigate: (String) -> Unit) {
    var query by remember { mutableStateOf("") }

    val results: List<SearchResult> = remember(query) {
        if (query.length < 2) emptyList()
        else {
            val q = query.lowercase()
            buildList {
                repo.tools.filter { it.name.lowercase().contains(q) || it.tagline.lowercase().contains(q) || it.vendor.lowercase().contains(q) }
                    .take(5).forEach { add(SearchResult.ToolResult(it.slug, it.name, "${it.vendor} · ${it.category}")) }
                repo.companies.filter { it.name.lowercase().contains(q) || it.focus.lowercase().contains(q) || it.description.lowercase().contains(q) }
                    .take(5).forEach { add(SearchResult.CompanyResult(it.slug, it.name, "${it.focus} · ${it.stage}")) }
                repo.caseStudies.filter { it.company.lowercase().contains(q) || it.title.lowercase().contains(q) || it.industry.lowercase().contains(q) }
                    .take(5).forEach { add(SearchResult.CaseStudyResult(it.slug, it.company, it.industry)) }
                repo.compliance.filter { it.name.lowercase().contains(q) || it.jurisdiction.lowercase().contains(q) }
                    .take(4).forEach { add(SearchResult.ComplianceResult(it.slug, it.name, it.jurisdiction)) }
                repo.learnResources.filter { it.title.lowercase().contains(q) || it.provider.lowercase().contains(q) }
                    .take(4).forEach { add(SearchResult.LearnResult(it.slug, it.title, it.provider, it.link)) }
            }
        }
    }

    Column {
        TopAppBar(title = { Text("Search", fontWeight = FontWeight.Bold) })

        OutlinedTextField(
            value = query,
            onValueChange = { query = it },
            placeholder = { Text("Search tools, companies, compliance…") },
            leadingIcon = { Icon(Icons.Filled.Search, null) },
            modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp, vertical = 8.dp),
            singleLine = true,
            shape = MaterialTheme.shapes.medium,
        )

        if (query.length < 2) {
            Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                Text("Type to search everything", color = MaterialTheme.colorScheme.onSurfaceVariant, style = MaterialTheme.typography.bodyMedium)
            }
        } else if (results.isEmpty()) {
            Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                Text("No results for \"$query\"", color = MaterialTheme.colorScheme.onSurfaceVariant, style = MaterialTheme.typography.bodyMedium)
            }
        } else {
            Text(
                "${results.size} results",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                modifier = Modifier.padding(horizontal = 16.dp, vertical = 4.dp),
            )
            LazyColumn {
                items(results) { result ->
                    val (label, type) = when (result) {
                        is SearchResult.ToolResult      -> result.name to "Tool"
                        is SearchResult.CompanyResult   -> result.name to "Company"
                        is SearchResult.CaseStudyResult -> result.name to "Case Study"
                        is SearchResult.ComplianceResult-> result.name to "Compliance"
                        is SearchResult.LearnResult     -> result.name to "Learn"
                    }
                    val sub = when (result) {
                        is SearchResult.ToolResult      -> result.sub
                        is SearchResult.CompanyResult   -> result.sub
                        is SearchResult.CaseStudyResult -> result.sub
                        is SearchResult.ComplianceResult-> result.sub
                        is SearchResult.LearnResult     -> result.sub
                    }
                    ListItem(
                        headlineContent  = { Text(label, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold) },
                        supportingContent = { Text(sub, style = MaterialTheme.typography.bodySmall) },
                        trailingContent  = {
                            Surface(color = MaterialTheme.colorScheme.surfaceVariant, shape = MaterialTheme.shapes.small) {
                                Text(type, style = MaterialTheme.typography.labelSmall, modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp))
                            }
                        },
                        modifier = Modifier.clickable(onClick = { onNavigate(result.route) }),
                    )
                    HorizontalDivider(color = MaterialTheme.colorScheme.outline.copy(alpha = 0.3f))
                }
            }
        }
    }
}

private fun <T> Modifier.clickable(onClick: () -> T): Modifier =
    this.then(Modifier.clickable { onClick() })
