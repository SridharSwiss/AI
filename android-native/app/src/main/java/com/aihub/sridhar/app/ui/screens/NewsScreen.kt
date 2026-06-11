package com.aihub.sridhar.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
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
import androidx.compose.ui.graphics.Brush
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
import com.aihub.sridhar.app.ui.components.PulsingDot
import com.aihub.sridhar.app.ui.theme.*
import kotlinx.coroutines.launch

private fun categoryColors(cat: String): Pair<Color, Color> = when (cat) {
    "Tech"        -> Pair(Blue100,    Blue500)
    "Research"    -> Pair(Violet100,  Violet500)
    "Government"  -> Pair(Amber100,   Amber500)
    "Medical"     -> Pair(Emerald100, Emerald500)
    "Financial"   -> Pair(Green100,   Green500)
    "Quantum"     -> Pair(Pink100,    Pink500)
    else          -> Pair(Dark600,    TextSecondary)
}

private val NEWS_CATEGORIES = listOf("All", "Tech", "Research", "Government", "Medical", "Financial", "Quantum", "General")

// ─────────────────────────────────────────────────────────────
// News screen — no tabs, single unified feed
//
// Design rationale:
//   • Sources load from local JSON → always available
//   • Live articles load from network → may be unavailable
//   • When articles fail, a compact inline banner replaces them
//     and sources fill the screen — the screen is NEVER empty
//   • Single LazyColumn = smooth, predictable scroll physics
//     without nested scrollable containers
// ─────────────────────────────────────────────────────────────

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun NewsScreen(repo: DataRepository) {
    val scope = rememberCoroutineScope()

    var articles      by remember { mutableStateOf<List<NewsArticle>>(emptyList()) }
    var sources       by remember { mutableStateOf<List<NewsSource>>(emptyList()) }
    var loadingArts   by remember { mutableStateOf(true) }
    var articleError  by remember { mutableStateOf(false) }
    var selectedCat   by remember { mutableStateOf("All") }

    // Load both in parallel on entry
    LaunchedEffect(Unit) {
        loadingArts  = true
        articleError = false
        sources      = repo.loadNewsSources()
        val result   = repo.fetchNewsArticles()
        articles     = result
        loadingArts  = false
        if (result.isEmpty()) articleError = true
    }

    val filteredArticles = remember(articles, selectedCat) {
        if (selectedCat == "All") articles
        else articles.filter { it.sourceCategory == selectedCat }
    }
    val filteredSources = remember(sources, selectedCat) {
        if (selectedCat == "All") sources
        else sources.filter { it.category == selectedCat }
    }

    Column(modifier = Modifier.fillMaxSize().background(Dark900)) {

        TopAppBar(
            title   = { Text("AI News", fontWeight = FontWeight.ExtraBold, color = TextPrimary, letterSpacing = (-0.5).sp) },
            colors  = TopAppBarDefaults.topAppBarColors(containerColor = Dark900),
        )
        Box(modifier = Modifier.fillMaxWidth().height(1.dp).background(Brush.horizontalGradient(listOf(NeonCyan.copy(0.5f), NeonViolet.copy(0.3f), Color.Transparent))))

        // Category filter — shared across articles + sources
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .horizontalScroll(rememberScrollState())
                .padding(horizontal = 14.dp, vertical = 8.dp),
            horizontalArrangement = Arrangement.spacedBy(6.dp),
        ) {
            NEWS_CATEGORIES.forEach { cat ->
                val sel = cat == selectedCat
                val (bg, fg) = categoryColors(cat)
                FilterChip(
                    selected = sel,
                    onClick  = { selectedCat = cat },
                    label    = { Text(cat, style = MaterialTheme.typography.labelMedium) },
                    colors   = FilterChipDefaults.filterChipColors(
                        selectedContainerColor = if (cat == "All") NeonViolet else bg,
                        selectedLabelColor     = if (cat == "All") Color.White else fg,
                        containerColor         = Dark800,
                        labelColor             = TextSecondary,
                    ),
                )
            }
        }

        // Single unified scrollable feed
        LazyColumn(
            modifier       = Modifier.fillMaxSize(),
            contentPadding = PaddingValues(horizontal = 14.dp, bottom = 20.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp),
        ) {

            // ── Section: Live Feed ─────────────────────────
            item(key = "articles_header") {
                NewsSectionHeader(
                    title    = "Live Feed",
                    trailing = if (!loadingArts && !articleError) "${filteredArticles.size} articles" else "",
                    live     = !loadingArts && !articleError && filteredArticles.isNotEmpty(),
                )
            }

            when {
                loadingArts -> {
                    items(3, key = { "skel_$it" }) { ArticleSkeleton() }
                }
                articleError -> {
                    item(key = "error_banner") {
                        ArticleErrorBanner(
                            onRetry = {
                                scope.launch {
                                    loadingArts  = true
                                    articleError = false
                                    val r    = repo.fetchNewsArticles()
                                    articles = r
                                    loadingArts  = false
                                    if (r.isEmpty()) articleError = true
                                }
                            }
                        )
                    }
                }
                filteredArticles.isEmpty() -> {
                    item(key = "no_articles") {
                        Box(
                            modifier = Modifier.fillMaxWidth().padding(vertical = 12.dp),
                            contentAlignment = Alignment.Center,
                        ) {
                            Text("No $selectedCat articles", style = MaterialTheme.typography.bodySmall, color = TextMuted)
                        }
                    }
                }
                else -> {
                    items(filteredArticles, key = { it.link + it.pubDate }) { ArticleCard(it) }
                }
            }

            // ── Section: Curated Sources ───────────────────
            item(key = "sources_header") {
                Spacer(Modifier.height(4.dp))
                NewsSectionHeader(
                    title    = "Curated Sources",
                    trailing = "${filteredSources.size} feeds",
                    live     = false,
                )
            }

            // Sources in 2-column grid rows
            items(
                items    = filteredSources.chunked(2),
                key      = { row -> row.first().id },
            ) { row ->
                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    row.forEach { source ->
                        SourceCard(source = source, modifier = Modifier.weight(1f))
                    }
                    // pad last row if odd count
                    if (row.size == 1) Spacer(Modifier.weight(1f))
                }
            }
        }
    }
}

// ─────────────────────────────────────────────────────────────
// Section header
// ─────────────────────────────────────────────────────────────

@Composable
private fun NewsSectionHeader(title: String, trailing: String, live: Boolean) {
    Row(
        modifier             = Modifier.fillMaxWidth().padding(vertical = 6.dp),
        verticalAlignment    = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.SpaceBetween,
    ) {
        Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(6.dp)) {
            if (live) PulsingDot(NeonGreen)
            Text(title, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.Bold, color = TextPrimary)
        }
        if (trailing.isNotBlank()) {
            Text(trailing, style = MaterialTheme.typography.labelSmall, color = TextMuted)
        }
    }
}

// ─────────────────────────────────────────────────────────────
// Compact error banner — replaces the full-screen dead state
// ─────────────────────────────────────────────────────────────

@Composable
private fun ArticleErrorBanner(onRetry: () -> Unit) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .background(Dark800, RoundedCornerShape(12.dp))
            .border(1.dp, Brush.linearGradient(listOf(Rose500.copy(0.3f), Dark700)), RoundedCornerShape(12.dp))
            .padding(horizontal = 14.dp, vertical = 10.dp),
        verticalAlignment    = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.SpaceBetween,
    ) {
        Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            Icon(Icons.Filled.WifiOff, null, tint = TextMuted, modifier = Modifier.size(16.dp))
            Column {
                Text("Live feed unavailable", style = MaterialTheme.typography.labelLarge, fontWeight = FontWeight.SemiBold, color = TextSecondary)
                Text("Browse curated sources below", style = MaterialTheme.typography.labelSmall, color = TextMuted)
            }
        }
        TextButton(onClick = onRetry) {
            Text("Retry", style = MaterialTheme.typography.labelMedium, color = NeonViolet)
        }
    }
}

// ─────────────────────────────────────────────────────────────
// Article card
// ─────────────────────────────────────────────────────────────

@Composable
private fun ArticleCard(article: NewsArticle) {
    val uriHandler = LocalUriHandler.current
    val (catBg, catFg) = categoryColors(article.sourceCategory)

    Surface(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { if (article.link.isNotBlank()) uriHandler.openUri(article.link) }
            .border(1.dp, Brush.linearGradient(listOf(NeonCyan.copy(0.18f), NeonViolet.copy(0.12f), Dark700)), RoundedCornerShape(14.dp)),
        shape = RoundedCornerShape(14.dp),
        color = Dark800,
    ) {
        Column(Modifier.padding(13.dp)) {
            Row(
                modifier              = Modifier.fillMaxWidth().padding(bottom = 7.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment     = Alignment.CenterVertically,
            ) {
                Row(horizontalArrangement = Arrangement.spacedBy(6.dp), verticalAlignment = Alignment.CenterVertically) {
                    BadgeChip(article.sourceCategory, catBg, catFg)
                    if (article.sourceName.isNotBlank()) {
                        Text(article.sourceName, style = MaterialTheme.typography.labelSmall, color = TextMuted, maxLines = 1, overflow = TextOverflow.Ellipsis)
                    }
                }
                if (article.pubDate.isNotBlank()) {
                    Text(relativeTime(article.pubDate), style = MaterialTheme.typography.labelSmall, color = TextMuted)
                }
            }
            Text(
                article.title,
                style      = MaterialTheme.typography.titleSmall.copy(lineHeight = 19.sp),
                fontWeight = FontWeight.SemiBold,
                color      = TextPrimary,
                maxLines   = 2,
                overflow   = TextOverflow.Ellipsis,
                modifier   = Modifier.padding(bottom = 5.dp),
            )
            if (article.description.isNotBlank()) {
                Text(
                    article.description,
                    style    = MaterialTheme.typography.bodySmall,
                    color    = TextSecondary,
                    maxLines = 2,
                    overflow = TextOverflow.Ellipsis,
                    modifier = Modifier.padding(bottom = 7.dp),
                )
            }
            Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                Icon(Icons.Filled.OpenInNew, null, tint = NeonCyan, modifier = Modifier.size(11.dp))
                Text("Read article", style = MaterialTheme.typography.labelSmall, color = NeonCyan, fontWeight = FontWeight.SemiBold)
            }
        }
    }
}

// ─────────────────────────────────────────────────────────────
// Source card — compact for 2-col grid
// ─────────────────────────────────────────────────────────────

@Composable
private fun SourceCard(source: NewsSource, modifier: Modifier = Modifier) {
    val uriHandler = LocalUriHandler.current
    val (bg, fg) = categoryColors(source.category)

    Surface(
        modifier = modifier
            .clickable { uriHandler.openUri(source.website) }
            .border(1.dp, Brush.linearGradient(listOf(NeonCyan.copy(0.18f), NeonViolet.copy(0.10f), Dark700)), RoundedCornerShape(12.dp)),
        shape = RoundedCornerShape(12.dp),
        color = Dark800,
    ) {
        Column(modifier = Modifier.padding(11.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                Box(
                    modifier = Modifier
                        .size(32.dp)
                        .background(Brush.linearGradient(listOf(NeonCyan.copy(0.2f), NeonViolet.copy(0.1f))), RoundedCornerShape(9.dp))
                        .border(1.dp, NeonCyan.copy(0.28f), RoundedCornerShape(9.dp)),
                    contentAlignment = Alignment.Center,
                ) {
                    Icon(Icons.Filled.RssFeed, null, tint = NeonCyan, modifier = Modifier.size(16.dp))
                }
                Column(modifier = Modifier.weight(1f)) {
                    Text(source.name, style = MaterialTheme.typography.labelLarge, fontWeight = FontWeight.SemiBold, color = TextPrimary, maxLines = 1, overflow = TextOverflow.Ellipsis)
                    BadgeChip(source.category, bg, fg)
                }
            }
            Spacer(Modifier.height(6.dp))
            Text(source.description, style = MaterialTheme.typography.labelSmall, color = TextSecondary, maxLines = 2, overflow = TextOverflow.Ellipsis)
            Spacer(Modifier.height(5.dp))
            Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(3.dp)) {
                Icon(Icons.Filled.OpenInNew, null, tint = NeonViolet, modifier = Modifier.size(10.dp))
                Text("Visit", style = MaterialTheme.typography.labelSmall, color = NeonViolet)
            }
        }
    }
}

// ─────────────────────────────────────────────────────────────
// Loading skeleton
// ─────────────────────────────────────────────────────────────

@Composable
private fun ArticleSkeleton() {
    Surface(modifier = Modifier.fillMaxWidth(), shape = RoundedCornerShape(14.dp), color = Dark800) {
        Column(Modifier.padding(13.dp), verticalArrangement = Arrangement.spacedBy(7.dp)) {
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                ShimmerBox(width = 56.dp,  height = 18.dp)
                ShimmerBox(width = 80.dp,  height = 14.dp)
            }
            ShimmerBox(modifier = Modifier.fillMaxWidth(), height = 14.dp)
            ShimmerBox(width = 180.dp, height = 14.dp)
            ShimmerBox(modifier = Modifier.fillMaxWidth(0.7f), height = 12.dp)
        }
    }
}

@Composable
private fun ShimmerBox(modifier: Modifier = Modifier, width: androidx.compose.ui.unit.Dp = 0.dp, height: androidx.compose.ui.unit.Dp) {
    val m = if (width > 0.dp) modifier.width(width).height(height) else modifier.height(height)
    Surface(color = Dark700, shape = RoundedCornerShape(6.dp), modifier = m) {}
}

// ─────────────────────────────────────────────────────────────
// Relative time helper
// ─────────────────────────────────────────────────────────────

private fun relativeTime(dateStr: String): String {
    return try {
        val formats = listOf(
            java.text.SimpleDateFormat("EEE, dd MMM yyyy HH:mm:ss z",  java.util.Locale.ENGLISH),
            java.text.SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssXXX",     java.util.Locale.ENGLISH),
            java.text.SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'",     java.util.Locale.ENGLISH),
        )
        val date = formats.firstNotNullOfOrNull { fmt ->
            try { fmt.parse(dateStr) } catch (_: Exception) { null }
        } ?: return dateStr.take(10)
        val m = ((System.currentTimeMillis() - date.time) / 60_000).toInt()
        val h = m / 60; val d = h / 24
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
