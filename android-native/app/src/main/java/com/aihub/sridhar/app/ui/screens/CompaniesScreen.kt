package com.aihub.sridhar.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.ui.draw.clip
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.animation.core.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalUriHandler
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
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
    var all by remember { mutableStateOf<List<Company>>(emptyList()) }
    LaunchedEffect(Unit) { all = repo.loadCompanies() }

    val stages  = remember(all) { listOf("All") + all.map { it.stage }.distinct().sorted() }
    val focuses = remember(all) { listOf("All") + all.map { it.focus }.distinct().sorted() }

    var stage by remember { mutableStateOf("All") }
    var focus by remember { mutableStateOf("All") }

    val filtered = remember(all, stage, focus) {
        all.filter {
            (stage == "All" || it.stage == stage) &&
            (focus == "All" || it.focus == focus)
        }
    }

    val infiniteTransition = rememberInfiniteTransition(label = "divider")
    val animAlpha by infiniteTransition.animateFloat(
        initialValue = 0.25f, targetValue = 0.6f,
        animationSpec = infiniteRepeatable(tween(2200, easing = EaseInOut), RepeatMode.Reverse),
        label = "alpha",
    )

    Column(modifier = Modifier.fillMaxSize().background(Color.Transparent)) {
        AppTopBar(title = "Companies")
        Box(
            modifier = Modifier.fillMaxWidth().height(1.dp)
                .background(Brush.horizontalGradient(listOf(NeonCyan.copy(alpha = animAlpha), NeonViolet.copy(alpha = animAlpha * 0.7f), Color.Transparent)))
        )
        Row(modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp, vertical = 10.dp), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            FilterDropdown("Type",  stage, stages,  { stage = it }, Modifier.weight(1f))
            FilterDropdown("Focus", focus, focuses, { focus = it }, Modifier.weight(1f))
        }
        Row(modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp).padding(bottom = 8.dp), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
            Text(
                if (all.isEmpty()) "Loading…" else "${filtered.size} of ${all.size} companies",
                style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
            if (stage != "All" || focus != "All") {
                TextButton(onClick = { stage = "All"; focus = "All" }) { Text("Clear", style = MaterialTheme.typography.labelSmall, color = NeonViolet) }
            }
        }
        LazyColumn {
            items(filtered, key = { it.slug }) { company ->
                CompanyRow(company = company, onClick = { onCompanyClick(company.slug) })
                Box(
                    modifier = Modifier.fillMaxWidth().padding(start = 72.dp).height(1.dp)
                        .background(Brush.horizontalGradient(listOf(NeonCyan.copy(alpha = 0.08f), NeonViolet.copy(alpha = 0.05f), Color.Transparent)))
                )
            }
        }
    }
}

@Composable
fun CompanyRow(company: Company, onClick: () -> Unit) {
    val (bg, fg) = stageColors(company.stage)
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick)
            .padding(horizontal = 16.dp, vertical = 12.dp),
        horizontalArrangement = Arrangement.spacedBy(12.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Box(
            modifier = Modifier
                .size(40.dp)
                .clip(RoundedCornerShape(12.dp))
                .background(
                    Brush.linearGradient(
                        listOf(NeonCyan.copy(alpha = 0.18f), NeonViolet.copy(alpha = 0.10f))
                    )
                ),
            contentAlignment = Alignment.Center,
        ) {
            Icon(Icons.Filled.Business, null, tint = NeonCyan, modifier = Modifier.size(20.dp))
        }
        Column(modifier = Modifier.weight(1f)) {
            Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                Text(
                    company.name,
                    style = MaterialTheme.typography.titleSmall,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.onSurface,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis,
                    modifier = Modifier.weight(1f, fill = false),
                )
                if (company.featured) BadgeChip("Featured", Purple100, Purple500)
            }
            Text(
                buildString {
                    append(company.focus)
                    if (company.hq.isNotBlank()) append(" · ${company.hq}")
                    else if (company.founded > 0) append(" · ${company.founded}")
                },
                style = MaterialTheme.typography.labelSmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                maxLines = 1,
            )
        }
        Box(
            modifier = Modifier
                .clip(RoundedCornerShape(6.dp))
                .background(Brush.linearGradient(listOf(bg, bg.copy(alpha = 0.7f))))
                .padding(horizontal = 8.dp, vertical = 3.dp),
        ) {
            Text(company.stage, style = MaterialTheme.typography.labelSmall, fontWeight = FontWeight.SemiBold, color = fg)
        }
    }
}

/* ── Company detail ──────────────────────────────────────── */

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CompanyDetailScreen(repo: DataRepository, slug: String, onBack: () -> Unit) {
    var company by remember { mutableStateOf<Company?>(null) }
    LaunchedEffect(slug) { company = repo.loadCompanies().find { it.slug == slug } }
    val uriHandler = LocalUriHandler.current
    var tab by remember { mutableStateOf(0) }

    Scaffold(
        containerColor = Color.Transparent,
        topBar = {
            AppTopBar(
                title          = company?.name ?: "Companies",
                navigationIcon = { IconButton(onClick = onBack) { Icon(Icons.Filled.ArrowBack, "Back", tint = MaterialTheme.colorScheme.onSurface) } },
            )
        }
    ) { padding ->
        val company = company
        if (company == null) { EmptyState("Loading…", Modifier.padding(padding)); return@Scaffold }
        val (stageBg, stageFg) = stageColors(company.stage)

        Column(modifier = Modifier.fillMaxSize().padding(top = padding.calculateTopPadding())) {
            Row(
                modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp, vertical = 8.dp),
                horizontalArrangement = Arrangement.spacedBy(6.dp),
            ) {
                BadgeChip(company.stage, stageBg, stageFg)
                BadgeChip(company.focus, Blue100, Blue500)
                if (company.featured) BadgeChip("Featured", Purple100, Purple500)
            }
            TabRow(
                selectedTabIndex = tab,
                containerColor = Color.Transparent,
                contentColor = NeonCyan,
                divider = { Box(Modifier.fillMaxWidth().height(1.dp).background(MaterialTheme.colorScheme.surfaceVariant)) },
            ) {
                listOf("Overview", "Models", "More").forEachIndexed { i, t ->
                    Tab(
                        selected = tab == i, onClick = { tab = i },
                        text = { Text(t, style = MaterialTheme.typography.labelMedium, fontWeight = if (tab == i) FontWeight.Bold else FontWeight.Normal, color = if (tab == i) NeonCyan else MaterialTheme.colorScheme.onSurfaceVariant) },
                    )
                }
            }
            when (tab) {
                0 -> LazyColumn(modifier = Modifier.weight(1f), contentPadding = PaddingValues(16.dp), verticalArrangement = Arrangement.spacedBy(14.dp)) {
                    item {
                        Text(company.description, style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.onSurfaceVariant, lineHeight = 22.sp)
                    }
                    item {
                        DetailCard(title = "At a Glance", icon = Icons.Filled.Info, iconTint = Blue500) {
                            if (company.founded > 0) DetailRow("Founded", company.founded.toString())
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
                    if (company.notableModels.isNotEmpty()) item {
                        DetailCard(title = "Notable Models", icon = Icons.Filled.Memory, iconTint = Violet500) {
                            TagRow(company.notableModels, wrap = true)
                        }
                    }
                }
                1 -> LazyColumn(modifier = Modifier.weight(1f), contentPadding = PaddingValues(16.dp), verticalArrangement = Arrangement.spacedBy(14.dp)) {
                    if (company.models.isNotEmpty()) item {
                        DetailCard(title = "AI Models", icon = Icons.Filled.Psychology, iconTint = Violet500) {
                            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                                company.models.forEach { model ->
                                    Box(modifier = Modifier.fillMaxWidth().clip(RoundedCornerShape(10.dp)).background(MaterialTheme.colorScheme.surfaceVariant).border(1.dp, Brush.linearGradient(listOf(Violet500.copy(0.3f), NeonViolet.copy(0.15f))), RoundedCornerShape(10.dp))) {
                                        Column(modifier = Modifier.padding(12.dp)) {
                                            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
                                                Text(model.name, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold, color = MaterialTheme.colorScheme.onSurface, modifier = Modifier.weight(1f))
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
                    company.financials?.let { fin ->
                        if (fin.fundingRounds.isNotEmpty()) item {
                            DetailCard(title = "Funding Rounds", icon = Icons.Filled.AttachMoney, iconTint = Green500) {
                                fin.fundingRounds.forEach { round ->
                                    Row(modifier = Modifier.fillMaxWidth().padding(bottom = 8.dp), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.Top) {
                                        Column(modifier = Modifier.weight(1f)) {
                                            Text("${round.date} · ${round.round}", style = MaterialTheme.typography.bodySmall, fontWeight = FontWeight.SemiBold, color = MaterialTheme.colorScheme.onSurface)
                                            if (round.investors.isNotEmpty()) Text(round.investors.joinToString(", "), style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                                        }
                                        Spacer(Modifier.width(8.dp))
                                        Text(round.amount, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.Bold, color = Green500)
                                    }
                                    Box(Modifier.fillMaxWidth().height(1.dp).background(MaterialTheme.colorScheme.surfaceVariant))
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
                    if (company.milestones.isNotEmpty()) item {
                        DetailCard(title = "Milestones", icon = Icons.Filled.Timeline, iconTint = Blue500) {
                            company.milestones.forEach { milestone ->
                                Row(modifier = Modifier.fillMaxWidth().padding(bottom = 8.dp), verticalAlignment = Alignment.Top, horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                                    BadgeChip(milestone.date, Blue100, Blue500)
                                    Text(milestone.event, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.weight(1f))
                                }
                            }
                        }
                    }
                }
                else -> LazyColumn(modifier = Modifier.weight(1f), contentPadding = PaddingValues(16.dp), verticalArrangement = Arrangement.spacedBy(14.dp)) {
                    if (company.history.isNotBlank()) item {
                        DetailCard(title = "History", icon = Icons.Filled.History, iconTint = Amber500) {
                            Text(company.history, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant, lineHeight = 20.sp)
                        }
                    }
                    if (company.competitors.isNotEmpty()) item {
                        DetailCard(title = "Competitors", icon = Icons.Filled.CompareArrows, iconTint = Zinc400) {
                            TagRow(company.competitors, wrap = true)
                        }
                    }
                    if (company.keyPeople.isNotEmpty()) item {
                        DetailCard(title = "Key People", icon = Icons.Filled.People, iconTint = Blue500) {
                            company.keyPeople.forEach { person -> BulletItem(person, Blue500) }
                        }
                    }
                    if (company.products.isNotEmpty()) item {
                        DetailCard(title = "Products", icon = Icons.Filled.Category, iconTint = Violet500) {
                            TagRow(company.products, wrap = true)
                        }
                    }
                    if (company.tags.isNotEmpty()) item {
                        Text("Tags", style = MaterialTheme.typography.labelMedium, fontWeight = FontWeight.SemiBold, color = MaterialTheme.colorScheme.onSurfaceVariant)
                        Spacer(Modifier.height(8.dp))
                        TagRow(company.tags, wrap = true)
                    }
                }
            }
        }
    }
}
