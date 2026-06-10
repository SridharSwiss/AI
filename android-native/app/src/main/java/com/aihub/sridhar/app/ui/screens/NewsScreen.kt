package com.aihub.sridhar.app.ui.screens

import androidx.compose.animation.*
import androidx.compose.foundation.clickable
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalUriHandler
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.aihub.sridhar.app.data.models.NewsArticle
import com.aihub.sridhar.app.data.models.NewsSource
import com.aihub.sridhar.app.data.repository.DataRepository
import com.aihub.sridhar.app.ui.components.BadgeChip
import com.aihub.sridhar.app.ui.theme.*
import kotlinx.coroutines.launch

private fun categoryColors(cat: String): Pair<Color, Color> = when (cat) {
    "Tech"        -> Pair(Blue100, Blue500)
    "Research"    -> Pair(Violet100, Violet600)
    "Government"  -> Pair(Amber100, Amber500)
    "Medical"     -> Pair(Emerald100, Emerald500)
    "Financial"   -> Pair(Green100, Green500)
    "Quantum"     -> Pair(Pink100, Pink500)
    else          -> Pair(Zinc100, Zinc600)
}

private val NEWS_CATEGORIES = listOf("All", "Tech", "Research", "Government", "Medical", "Financial", "Quantum", "General")

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun NewsScreen(repo: DataRepository) {
    var selectedTab by remember { mutableStateOf(0) }
    val tabs = listOf("Latest", "Sources")

    Column(modifier = Modifier.fillMaxSize()) {
        TopAppBar(
            title = { Text("AI News", fontWeight = FontWeight.Bold) },
        )

        TabRow(selectedTabIndex = selectedTab, containerColor = MaterialTheme.colorScheme.surface) {
            tabs.forEachIndexed { i, title ->
                Tab(
                    selected  = selectedTab == i,
                    onClick   = { selectedTab = i },
                    text      = { Text(title, style = MaterialTheme.typography.labelLarge) },
                )
            }
        }

        when (selectedTab) {
            0 -> ArticlesTab(repo)
            1 -> SourcesTab(repo)
        }
    }
}

/* ── Articles tab ────────────────────────────────────────── */

@Composable
private fun ArticlesTab(repo: DataRepository) {
    val scope  = rememberCoroutineScope()
    var articles by remember { mutableStateOf<List<NewsArticle>>(emptyList()) }
    var loading  by remember { mutableStateOf(true) }
    var error    by remember { mutableStateOf(false) }
    var selectedCat by remember { mutableStateOf("All") }

    LaunchedEffect(Unit) {
        loading = true; error = false
        val result = repo.fetchNewsArticles()
        articles = result
        loading  = false
        if (result.isEmpty()) error = true
    }

    val filtered = remember(articles, selectedCat) {
        if (selectedCat == "All") articles
        else articles.filter { it.sourceCategory == selectedCat }
    }

    Column {
        // Category chips
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .horizontalScroll(rememberScrollState())
                .padding(horizontal = 16.dp, vertical = 10.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp),
        ) {
            NEWS_CATEGORIES.forEach { cat ->
                val selected = cat == selectedCat
                val (bg, fg) = categoryColors(cat)
                FilterChip(
                    selected = selected,
                    onClick  = { selectedCat = cat },
                    label    = { Text(cat, style = MaterialTheme.typography.labelMedium) },
                    colors   = FilterChipDefaults.filterChipColors(
                        selectedContainerColor = if (cat == "All") MaterialTheme.colorScheme.primary else bg,
                        selectedLabelColor     = if (cat == "All") MaterialTheme.colorScheme.onPrimary else fg,
                    ),
                )
            }
        }

        HorizontalDivider()

        Box(modifier = Modifier.weight(1f)) {
            when {
                loading -> {
                    Column(
                        modifier = Modifier.fillMaxSize().padding(16.dp),
                        verticalArrangement = Arrangement.spacedBy(12.dp),
                    ) {
                        repeat(6) { ArticleSkeleton() }
                    }
                }
                error || (articles.isEmpty() && !loading) -> {
                    Column(
                        modifier = Modifier.fillMaxSize(),
                        horizontalAlignment = Alignment.CenterHorizontally,
                        verticalArrangement = Arrangement.Center,
                    ) {
                        Icon(Icons.Filled.WifiOff, null, tint = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.size(40.dp))
                        Spacer(Modifier.height(12.dp))
                        Text("Couldn't load news", style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold)
                        Text("Check your connection", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(top = 4.dp))
                        Spacer(Modifier.height(16.dp))
                        Button(onClick = {
                            scope.launch {
                                loading = true; error = false
                                val result = repo.fetchNewsArticles()
                                articles = result; loading = false
                                if (result.isEmpty()) error = true
                            }
                        }) { Text("Retry") }
                    }
                }
                filtered.isEmpty() -> {
                    Column(modifier = Modifier.fillMaxSize(), horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.Center) {
                        Text("No $selectedCat articles", style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.onSurfaceVariant)
                    }
                }
                else -> {
                    LazyColumn(contentPadding = PaddingValues(16.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
                        item {
                            Row(modifier = Modifier.padding(bottom = 4.dp), verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                                Surface(color = Emerald100, contentColor = Emerald500, shape = RoundedCornerShape(50)) {
                                    Row(Modifier.padding(horizontal = 8.dp, vertical = 3.dp), horizontalArrangement = Arrangement.spacedBy(4.dp), verticalAlignment = Alignment.CenterVertically) {
                                        Box(modifier = Modifier.size(6.dp))
                                        Text("Live", style = MaterialTheme.typography.labelSmall, fontWeight = FontWeight.Bold)
                                    }
                                }
                                Text("${filtered.size} articles", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                            }
                        }
                        items(filtered, key = { it.link + it.pubDate }) { article ->
                            ArticleCard(article)
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun ArticleCard(article: NewsArticle) {
    val uriHandler = LocalUriHandler.current
    val (catBg, catFg) = categoryColors(article.sourceCategory)

    ElevatedCard(
        modifier = Modifier.fillMaxWidth().clickable { if (article.link.isNotBlank()) uriHandler.openUri(article.link) },
        shape    = RoundedCornerShape(14.dp),
        elevation = CardDefaults.elevatedCardElevation(defaultElevation = 1.dp),
    ) {
        Column(Modifier.padding(14.dp)) {
            // Source + category + time
            Row(
                modifier = Modifier.fillMaxWidth().padding(bottom = 8.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Row(horizontalArrangement = Arrangement.spacedBy(6.dp), verticalAlignment = Alignment.CenterVertically) {
                    BadgeChip(article.sourceCategory, catBg, catFg)
                    if (article.sourceName.isNotBlank()) {
                        Text(article.sourceName, style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant, maxLines = 1)
                    }
                }
                if (article.pubDate.isNotBlank()) {
                    Text(relativeTime(article.pubDate), style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
            }

            // Title
            Text(
                text = article.title,
                style = MaterialTheme.typography.titleSmall.copy(lineHeight = 20.sp),
                fontWeight = FontWeight.SemiBold,
                maxLines = 3,
                overflow = TextOverflow.Ellipsis,
                modifier = Modifier.padding(bottom = 6.dp),
            )

            // Description
            if (article.description.isNotBlank()) {
                Text(
                    text = article.description,
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    maxLines = 2,
                    overflow = TextOverflow.Ellipsis,
                    modifier = Modifier.padding(bottom = 8.dp),
                )
            }

            // Read more
            Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                Icon(Icons.Filled.OpenInNew, null, tint = MaterialTheme.colorScheme.primary, modifier = Modifier.size(12.dp))
                Text("Read article", style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.primary, fontWeight = FontWeight.SemiBold)
            }
        }
    }
}

@Composable
private fun ArticleSkeleton() {
    ElevatedCard(modifier = Modifier.fillMaxWidth(), shape = RoundedCornerShape(14.dp)) {
        Column(Modifier.padding(14.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                ShimmerBox(width = 60.dp, height = 20.dp)
                ShimmerBox(width = 80.dp, height = 16.dp)
            }
            ShimmerBox(modifier = Modifier.fillMaxWidth(), height = 16.dp)
            ShimmerBox(width = 200.dp, height = 16.dp)
            ShimmerBox(modifier = Modifier.fillMaxWidth(), height = 12.dp)
        }
    }
}

@Composable
private fun ShimmerBox(modifier: Modifier = Modifier, width: androidx.compose.ui.unit.Dp = 0.dp, height: androidx.compose.ui.unit.Dp) {
    val m = if (width > 0.dp) modifier.width(width).height(height) else modifier.height(height)
    Surface(color = MaterialTheme.colorScheme.surfaceVariant, shape = RoundedCornerShape(6.dp), modifier = m) {}
}

/* ── Sources tab ─────────────────────────────────────────── */

@Composable
private fun SourcesTab(repo: DataRepository) {
    val uriHandler = LocalUriHandler.current
    val sources = repo.newsSources
    var selectedCat by remember { mutableStateOf("All") }

    val filtered = remember(selectedCat) {
        if (selectedCat == "All") sources else sources.filter { it.category == selectedCat }
    }

    Column {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .horizontalScroll(rememberScrollState())
                .padding(horizontal = 16.dp, vertical = 10.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp),
        ) {
            NEWS_CATEGORIES.forEach { cat ->
                val selected = cat == selectedCat
                val (bg, fg) = categoryColors(cat)
                FilterChip(
                    selected = selected,
                    onClick  = { selectedCat = cat },
                    label    = { Text(cat, style = MaterialTheme.typography.labelMedium) },
                    colors   = FilterChipDefaults.filterChipColors(
                        selectedContainerColor = if (cat == "All") MaterialTheme.colorScheme.primary else bg,
                        selectedLabelColor     = if (cat == "All") MaterialTheme.colorScheme.onPrimary else fg,
                    ),
                )
            }
        }

        HorizontalDivider()

        Text(
            "${filtered.size} sources",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
            modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp),
        )

        LazyColumn(contentPadding = PaddingValues(horizontal = 16.dp, vertical = 4.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            items(filtered, key = { it.id }) { source ->
                SourceCard(source = source, onClick = { uriHandler.openUri(source.website) })
            }
        }
    }
}

@Composable
private fun SourceCard(source: NewsSource, onClick: () -> Unit) {
    val (bg, fg) = categoryColors(source.category)
    ElevatedCard(
        modifier  = Modifier.fillMaxWidth().clickable(onClick = onClick),
        shape     = RoundedCornerShape(14.dp),
        elevation = CardDefaults.elevatedCardElevation(defaultElevation = 1.dp),
    ) {
        Row(
            modifier = Modifier.padding(14.dp),
            horizontalArrangement = Arrangement.spacedBy(12.dp),
            verticalAlignment = Alignment.Top,
        ) {
            Surface(color = bg, contentColor = fg, shape = RoundedCornerShape(10.dp), modifier = Modifier.size(40.dp)) {
                Box(contentAlignment = Alignment.Center) { Icon(Icons.Filled.RssFeed, null, modifier = Modifier.size(20.dp)) }
            }
            Column(modifier = Modifier.weight(1f)) {
                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.Top) {
                    Text(source.name, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold, modifier = Modifier.weight(1f))
                    BadgeChip(source.category, bg, fg)
                }
                Spacer(Modifier.height(4.dp))
                Text(source.description, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant, maxLines = 2, overflow = TextOverflow.Ellipsis)
                Spacer(Modifier.height(6.dp))
                Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                    Icon(Icons.Filled.OpenInNew, null, tint = MaterialTheme.colorScheme.primary, modifier = Modifier.size(12.dp))
                    Text("Visit source", style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.primary)
                }
            }
        }
    }
}

/* ── Helpers ─────────────────────────────────────────────── */

private fun relativeTime(dateStr: String): String {
    return try {
        // parse RFC 2822 or ISO 8601
        val formats = listOf(
            java.text.SimpleDateFormat("EEE, dd MMM yyyy HH:mm:ss z", java.util.Locale.ENGLISH),
            java.text.SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssXXX", java.util.Locale.ENGLISH),
            java.text.SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'", java.util.Locale.ENGLISH),
        )
        val date = formats.firstNotNullOfOrNull { fmt ->
            try { fmt.parse(dateStr) } catch (_: Exception) { null }
        } ?: return dateStr.take(10)
        val diffMs = System.currentTimeMillis() - date.time
        val m = (diffMs / 60_000).toInt()
        val h = m / 60
        val d = h / 24
        when {
            m < 1  -> "Just now"
            m < 60 -> "${m}m ago"
            h < 24 -> "${h}h ago"
            d == 1 -> "Yesterday"
            d < 7  -> "${d}d ago"
            else   -> java.text.SimpleDateFormat("d MMM", java.util.Locale.ENGLISH).format(date)
        }
    } catch (_: Exception) { "" }
}
