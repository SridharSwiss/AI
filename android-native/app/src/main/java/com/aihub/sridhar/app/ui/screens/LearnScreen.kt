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
import com.aihub.sridhar.app.data.models.LearnResource
import com.aihub.sridhar.app.data.repository.DataRepository
import com.aihub.sridhar.app.ui.components.*
import com.aihub.sridhar.app.ui.theme.*

private fun typeColors(type: String) = when (type) {
    "course"        -> Triple(Blue100, Blue500, Icons.Filled.School)
    "youtube"       -> Triple(Rose100, Rose500, Icons.Filled.PlayArrow)
    "certification" -> Triple(Amber100, Amber500, Icons.Filled.Star)
    "book"          -> Triple(Purple100, Purple500, Icons.Filled.MenuBook)
    "tutorial"      -> Triple(Emerald100, Emerald500, Icons.Filled.Code)
    else            -> Triple(Blue100, Blue500, Icons.Filled.School)
}

private fun levelColors(level: String) = when (level) {
    "beginner"     -> Pair(Green100, Green500)
    "intermediate" -> Pair(Blue100, Blue500)
    "advanced"     -> Pair(Purple100, Purple500)
    else           -> Pair(Blue100, Blue500)
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun LearnScreen(repo: DataRepository) {
    val all    = repo.learnResources
    val types  = remember { listOf("All", "course", "youtube", "certification", "book", "tutorial") }
    val levels = remember { listOf("All", "beginner", "intermediate", "advanced") }

    var type     by remember { mutableStateOf("All") }
    var level    by remember { mutableStateOf("All") }
    var freeOnly by remember { mutableStateOf(false) }

    val filtered = remember(type, level, freeOnly) {
        all.filter {
            (type  == "All" || it.type  == type)  &&
            (level == "All" || it.level == level) &&
            (!freeOnly || it.free)
        }
    }

    val uriHandler = LocalUriHandler.current

    Column {
        TopAppBar(title = { Text("Learn", fontWeight = FontWeight.Bold) })

        Row(modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp, vertical = 8.dp), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            FilterDropdown("Type",  type,  types,  { type  = it }, Modifier.weight(1f))
            FilterDropdown("Level", level, levels, { level = it }, Modifier.weight(1f))
        }

        Row(modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp).padding(bottom = 8.dp), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
            FilterChip(
                selected = freeOnly,
                onClick  = { freeOnly = !freeOnly },
                label    = { Text("Free only", style = MaterialTheme.typography.labelSmall) },
            )
            Row(verticalAlignment = Alignment.CenterVertically) {
                Text("${filtered.size} of ${all.size}", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                if (type != "All" || level != "All" || freeOnly) {
                    TextButton(onClick = { type = "All"; level = "All"; freeOnly = false }) { Text("Clear", style = MaterialTheme.typography.labelSmall) }
                }
            }
        }

        HorizontalDivider()

        LazyColumn {
            items(filtered, key = { it.slug }) { r ->
                val (bg, fg, icon) = typeColors(r.type)
                val (lBg, lFg) = levelColors(r.level)
                Row(
                    modifier = Modifier.fillMaxWidth().clickable { uriHandler.openUri(r.link) }.padding(horizontal = 16.dp, vertical = 12.dp),
                    horizontalArrangement = Arrangement.spacedBy(12.dp),
                    verticalAlignment = Alignment.CenterVertically,
                ) {
                    Surface(color = bg, contentColor = fg, shape = RoundedCornerShape(10.dp), modifier = Modifier.size(40.dp)) {
                        Box(contentAlignment = Alignment.Center) { Icon(icon, null, modifier = Modifier.size(20.dp)) }
                    }
                    Column(modifier = Modifier.weight(1f)) {
                        Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                            Text(r.title, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold, maxLines = 1, overflow = TextOverflow.Ellipsis, modifier = Modifier.weight(1f, fill = false))
                            if (r.free) BadgeChip("Free", Green100, Green500)
                        }
                        Text("${r.provider} · ~${r.readTime}h", style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant, maxLines = 1)
                    }
                    BadgeChip(r.level, lBg, lFg)
                }
                HorizontalDivider(color = MaterialTheme.colorScheme.outline.copy(alpha = 0.3f))
            }
        }
    }
}
