package com.aihub.sridhar.app.ui.screens

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
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
    val all     = repo.companies
    val stages  = remember { listOf("All") + all.map { it.stage }.distinct().sorted() }
    val focuses = remember { listOf("All") + all.map { it.focus }.distinct().sorted() }

    var stage by remember { mutableStateOf("All") }
    var focus by remember { mutableStateOf("All") }

    val filtered = remember(stage, focus) {
        all.filter {
            (stage == "All" || it.stage == stage) &&
            (focus == "All" || it.focus == focus)
        }
    }

    Column {
        TopAppBar(title = { Text("Companies", fontWeight = FontWeight.Bold) })
        Row(modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp, vertical = 8.dp), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            FilterDropdown("Type",  stage, stages,  { stage = it }, Modifier.weight(1f))
            FilterDropdown("Focus", focus, focuses, { focus = it }, Modifier.weight(1f))
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
            Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                Text(company.name, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold, maxLines = 1, overflow = TextOverflow.Ellipsis, modifier = Modifier.weight(1f, fill = false))
                if (company.featured) BadgeChip("Featured", Purple100, Purple500)
            }
            Text("${company.focus} · ${company.founded}", style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant, maxLines = 1)
        }
        BadgeChip(company.stage, bg, fg)
    }
}

/* ── Company detail ──────────────────────────────────────── */

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CompanyDetailScreen(repo: DataRepository, slug: String, onBack: () -> Unit) {
    val company = remember(slug) { repo.companies.find { it.slug == slug } }
    val uriHandler = LocalUriHandler.current

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(company?.name ?: "Company", fontWeight = FontWeight.Bold, maxLines = 1, overflow = TextOverflow.Ellipsis) },
                navigationIcon = { IconButton(onClick = onBack) { Icon(Icons.Filled.ArrowBack, "Back") } },
                actions = {
                    company?.website?.let { url ->
                        IconButton(onClick = { uriHandler.openUri(url) }) { Icon(Icons.Filled.OpenInNew, "Open website") }
                    }
                }
            )
        }
    ) { padding ->
        if (company == null) { EmptyState("Company not found", Modifier.padding(padding)); return@Scaffold }
        val (stageBg, stageFg) = stageColors(company.stage)

        LazyColumn(contentPadding = PaddingValues(start = 16.dp, end = 16.dp, top = padding.calculateTopPadding() + 8.dp, bottom = 24.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {

            // Badges
            item {
                Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                    BadgeChip(company.stage, stageBg, stageFg)
                    BadgeChip(company.focus, Blue100, Blue500)
                    if (company.featured) BadgeChip("Featured", Purple100, Purple500)
                }
            }

            // Description
            item {
                Text(company.description, style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.onSurfaceVariant)
            }

            // Key stats
            item {
                DetailCard(title = "At a Glance", icon = Icons.Filled.Info, iconTint = Blue500) {
                    DetailRow("Founded", company.founded)
                    if (company.hq.isNotBlank()) DetailRow("Headquarters", company.hq)
                    if (company.employees.isNotBlank()) DetailRow("Employees", company.employees)
                    if (company.funding.isNotBlank()) DetailRow("Total Funding", company.funding)
                    company.financials?.let { fin ->
                        if (fin.latestValuation.isNotBlank()) DetailRow("Valuation", fin.latestValuation)
                        if (fin.revenue.isNotBlank()) DetailRow("Revenue", "${fin.revenue} (${fin.revenueYear})")
                        if (fin.profitStatus.isNotBlank()) DetailRow("Profit Status", fin.profitStatus)
                        if (fin.annualRevenueGrowth.isNotBlank()) DetailRow("Revenue Growth", fin.annualRevenueGrowth)
                    }
                }
            }

            // History
            if (company.history.isNotBlank()) {
                item {
                    DetailCard(title = "History", icon = Icons.Filled.History, iconTint = Amber500) {
                        Text(company.history, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                    }
                }
            }

            // Notable Models
            if (company.notableModels.isNotEmpty()) {
                item {
                    DetailCard(title = "Notable Models", icon = Icons.Filled.Memory, iconTint = Violet500) {
                        TagRow(company.notableModels, wrap = true)
                    }
                }
            }

            // Model details
            if (company.models.isNotEmpty()) {
                item {
                    DetailCard(title = "AI Models", icon = Icons.Filled.Psychology, iconTint = Violet500) {
                        company.models.forEach { model ->
                            ElevatedCard(modifier = Modifier.fillMaxWidth().padding(bottom = 8.dp), shape = RoundedCornerShape(10.dp)) {
                                Column(Modifier.padding(12.dp)) {
                                    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
                                        Text(model.name, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold, modifier = Modifier.weight(1f))
                                        BadgeChip(model.type, Violet100, Violet600)
                                    }
                                    if (model.releaseDate.isNotBlank()) Text(model.releaseDate, style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                                    if (model.contextWindow.isNotBlank()) {
                                        Spacer(Modifier.height(4.dp))
                                        BadgeChip("${model.contextWindow} context", Blue100, Blue500)
                                    }
                                    if (model.description.isNotBlank()) {
                                        Spacer(Modifier.height(6.dp))
                                        Text(model.description, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                                    }
                                }
                            }
                        }
                    }
                }
            }

            // Financials — funding rounds
            company.financials?.let { fin ->
                if (fin.fundingRounds.isNotEmpty()) {
                    item {
                        DetailCard(title = "Funding Rounds", icon = Icons.Filled.AttachMoney, iconTint = Green500) {
                            fin.fundingRounds.forEach { round ->
                                Row(modifier = Modifier.fillMaxWidth().padding(bottom = 8.dp), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.Top) {
                                    Column(modifier = Modifier.weight(1f)) {
                                        Text("${round.date} · ${round.round}", style = MaterialTheme.typography.bodySmall, fontWeight = FontWeight.SemiBold)
                                        if (round.investors.isNotEmpty()) Text(round.investors.joinToString(", "), style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                                    }
                                    Spacer(Modifier.width(8.dp))
                                    Text(round.amount, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.Bold, color = Green500)
                                }
                                HorizontalDivider(color = MaterialTheme.colorScheme.outline.copy(alpha = 0.3f))
                            }
                            if (fin.keyInvestors.isNotEmpty()) {
                                Spacer(Modifier.height(8.dp))
                                Text("Key Investors", style = MaterialTheme.typography.labelSmall, fontWeight = FontWeight.SemiBold, color = MaterialTheme.colorScheme.onSurfaceVariant)
                                Spacer(Modifier.height(4.dp))
                                TagRow(fin.keyInvestors, wrap = true)
                            }
                        }
                    }
                }
            }

            // Milestones
            if (company.milestones.isNotEmpty()) {
                item {
                    DetailCard(title = "Milestones", icon = Icons.Filled.Timeline, iconTint = Blue500) {
                        company.milestones.forEach { milestone ->
                            Row(modifier = Modifier.fillMaxWidth().padding(bottom = 8.dp), verticalAlignment = Alignment.Top, horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                                BadgeChip(milestone.date, Blue100, Blue500)
                                Text(milestone.event, style = MaterialTheme.typography.bodySmall, modifier = Modifier.weight(1f))
                            }
                        }
                    }
                }
            }

            // Competitors
            if (company.competitors.isNotEmpty()) {
                item {
                    DetailCard(title = "Competitors", icon = Icons.Filled.CompareArrows, iconTint = Zinc400) {
                        TagRow(company.competitors, wrap = true)
                    }
                }
            }

            // Key People
            if (company.keyPeople.isNotEmpty()) {
                item {
                    DetailCard(title = "Key People", icon = Icons.Filled.People, iconTint = Blue500) {
                        company.keyPeople.forEach { person -> BulletItem(person, Blue500) }
                    }
                }
            }

            // Products
            if (company.products.isNotEmpty()) {
                item {
                    DetailCard(title = "Products", icon = Icons.Filled.Category, iconTint = Violet500) {
                        TagRow(company.products, wrap = true)
                    }
                }
            }

            // Tags
            if (company.tags.isNotEmpty()) {
                item {
                    Text("Tags", style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold)
                    Spacer(Modifier.height(6.dp))
                    TagRow(company.tags, wrap = true)
                }
            }
        }
    }
}
