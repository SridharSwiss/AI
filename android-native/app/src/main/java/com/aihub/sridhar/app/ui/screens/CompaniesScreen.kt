package com.aihub.sridhar.app.ui.screens

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Business
import androidx.compose.material.icons.filled.OpenInNew
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalUriHandler
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import com.aihub.sridhar.app.data.models.Company
import com.aihub.sridhar.app.data.repository.DataRepository
import com.aihub.sridhar.app.ui.components.*
import com.aihub.sridhar.app.ui.theme.*

private fun stageColors(stage: String) = when (stage) {
    "Private"      -> Pair(Blue100, Blue500)
    "Public"       -> Pair(Green100, Green500)
    "Nonprofit"    -> Pair(Purple100, Purple500)
    "Research Lab" -> Pair(Amber100, Amber500)
    else           -> Pair(Blue100, Blue500)
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CompaniesScreen(repo: DataRepository, onCompanyClick: (String) -> Unit) {
    val all = repo.companies
    val stages     = remember { listOf("All") + all.map { it.stage }.distinct().sorted() }
    val focusAreas = remember { listOf("All") + all.map { it.focus }.distinct().sorted() }

    var stage by remember { mutableStateOf("All") }
    var focus by remember { mutableStateOf("All") }

    val filtered = remember(stage, focus) {
        all.filter {
            (stage == "All" || it.stage == stage) &&
            (focus  == "All" || it.focus == focus)
        }
    }

    Column {
        TopAppBar(title = { Text("Companies", fontWeight = FontWeight.Bold) })

        Row(modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp, vertical = 8.dp), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            FilterDropdown("Type",       stage, stages,     { stage = it }, Modifier.weight(1f))
            FilterDropdown("Focus Area", focus, focusAreas, { focus  = it }, Modifier.weight(1f))
        }

        Row(modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp).padding(bottom = 8.dp), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
            Text("${filtered.size} of ${all.size} companies", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
            if (stage != "All" || focus != "All") {
                TextButton(onClick = { stage = "All"; focus = "All" }) { Text("Clear", style = MaterialTheme.typography.labelSmall) }
            }
        }

        HorizontalDivider()

        LazyColumn {
            items(filtered, key = { it.slug }) { company ->
                CompanyRow(company = company, onClick = { onCompanyClick(company.slug) })
                HorizontalDivider(color = MaterialTheme.colorScheme.outline.copy(alpha = 0.3f))
            }
        }
    }
}

@Composable
fun CompanyRow(company: Company, onClick: () -> Unit) {
    val (bg, fg) = stageColors(company.stage)
    Row(
        modifier = Modifier.fillMaxWidth().clickable(onClick = onClick).padding(horizontal = 16.dp, vertical = 12.dp),
        horizontalArrangement = Arrangement.spacedBy(12.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Surface(color = Blue100, contentColor = Blue500, shape = RoundedCornerShape(10.dp), modifier = Modifier.size(40.dp)) {
            Box(contentAlignment = Alignment.Center) { Icon(Icons.Filled.Business, null, modifier = Modifier.size(20.dp)) }
        }
        Column(modifier = Modifier.weight(1f)) {
            Text(company.name, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold, maxLines = 1, overflow = TextOverflow.Ellipsis)
            Text("${company.focus} · ${company.founded}", style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant, maxLines = 1)
        }
        BadgeChip(company.stage, bg, fg)
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CompanyDetailScreen(repo: DataRepository, slug: String, onBack: () -> Unit) {
    val company = remember(slug) { repo.companies.find { it.slug == slug } }
    val uriHandler = LocalUriHandler.current

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(company?.name ?: "Company", fontWeight = FontWeight.Bold, maxLines = 1, overflow = TextOverflow.Ellipsis) },
                navigationIcon = { IconButton(onClick = onBack) { Icon(Icons.Filled.Business, null) } },
                actions = {
                    company?.website?.let { url ->
                        IconButton(onClick = { uriHandler.openUri(url) }) { Icon(Icons.Filled.OpenInNew, "Open website") }
                    }
                }
            )
        }
    ) { padding ->
        if (company == null) { EmptyState("Company not found", Modifier.padding(padding)); return@Scaffold }
        LazyColumn(contentPadding = PaddingValues(start = 16.dp, end = 16.dp, top = padding.calculateTopPadding() + 8.dp, bottom = 16.dp)) {
            item {
                val (bg, fg) = stageColors(company.stage)
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp), modifier = Modifier.padding(bottom = 16.dp)) {
                    BadgeChip(company.stage, bg, fg)
                    BadgeChip(company.focus, Blue100, Blue500)
                }
            }
            item {
                Text(company.description, style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(bottom = 16.dp))
            }
            item {
                Text("Details", style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold, modifier = Modifier.padding(bottom = 8.dp))
                DetailRow("Founded",      company.founded)
                DetailRow("Focus",        company.focus)
                DetailRow("Stage",        company.stage)
                if (company.headquarters.isNotBlank()) DetailRow("HQ", company.headquarters)
                if (company.employees.isNotBlank())    DetailRow("Employees", company.employees)
                if (company.valuation.isNotBlank())    DetailRow("Valuation", company.valuation)
                if (company.funding.isNotBlank())      DetailRow("Funding", company.funding)
            }
            if (company.products.isNotEmpty()) {
                item {
                    Spacer(Modifier.height(16.dp))
                    Text("Products", style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold, modifier = Modifier.padding(bottom = 8.dp))
                    TagRow(company.products)
                }
            }
            if (company.keyPeople.isNotEmpty()) {
                item {
                    Spacer(Modifier.height(16.dp))
                    Text("Key People", style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold, modifier = Modifier.padding(bottom = 8.dp))
                    company.keyPeople.forEach { person ->
                        Row(modifier = Modifier.padding(bottom = 4.dp)) { Text("• ", color = Violet500, fontWeight = FontWeight.Bold); Text(person, style = MaterialTheme.typography.bodySmall) }
                    }
                }
            }
            if (company.recentNews.isNotEmpty()) {
                item {
                    Spacer(Modifier.height(16.dp))
                    Text("Recent News", style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold, modifier = Modifier.padding(bottom = 8.dp))
                    company.recentNews.forEach { news ->
                        Row(modifier = Modifier.padding(bottom = 6.dp), verticalAlignment = Alignment.Top) { Text("• ", color = Violet500, fontWeight = FontWeight.Bold); Text(news, style = MaterialTheme.typography.bodySmall) }
                    }
                }
            }
        }
    }
}
