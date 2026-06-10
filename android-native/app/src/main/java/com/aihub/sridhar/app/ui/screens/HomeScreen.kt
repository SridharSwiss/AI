package com.aihub.sridhar.app.ui.screens

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.aihub.sridhar.app.ui.navigation.Screen
import com.aihub.sridhar.app.ui.theme.*

data class NavCard(
    val label: String,
    val desc: String,
    val stat: String,
    val icon: ImageVector,
    val containerColor: androidx.compose.ui.graphics.Color,
    val contentColor: androidx.compose.ui.graphics.Color,
    val route: String,
)

private val navCards = listOf(
    NavCard("AI Tools",          "82+ tools compared",               "82 tools · 15 categories", Icons.Filled.Build,         Violet100,   Violet600,  Screen.Tools.route),
    NavCard("Companies",         "Vendors & AI startups",            "33 companies",              Icons.Filled.Business,      Blue100,     Blue500,    Screen.Companies.route),
    NavCard("Case Studies",      "Real-world ROI data",              "31 case studies",           Icons.Filled.BarChart,      Amber100,    Amber500,   Screen.CaseStudies.route),
    NavCard("Learn",             "Courses & certifications",         "72 resources",              Icons.Filled.School,        Emerald100,  Emerald500, Screen.Learn.route),
    NavCard("Compliance",        "EU AI Act & more",                 "16 frameworks",             Icons.Filled.Shield,        Rose100,     Rose500,    Screen.Compliance.route),
    NavCard("Consulting Toolkit","Implementation playbooks",         "4 phases",                  Icons.Filled.Work,          Pink100,     Pink500,    Screen.Consulting.route),
)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HomeScreen(onNavigate: (String) -> Unit) {
    LazyColumn(
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp),
    ) {
        item {
            Column(modifier = Modifier.padding(bottom = 8.dp)) {
                Text(
                    text = "AIHub",
                    style = MaterialTheme.typography.headlineLarge,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.primary,
                )
                Text(
                    text = "Your complete AI knowledge base",
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                )
            }
        }

        item {
            Text(
                text = "Explore",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.SemiBold,
                modifier = Modifier.padding(bottom = 4.dp),
            )
        }

        navCards.chunked(2).forEach { row ->
            item {
                Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                    row.forEach { card ->
                        HomeNavCard(
                            card = card,
                            onClick = { onNavigate(card.route) },
                            modifier = Modifier.weight(1f),
                        )
                    }
                    if (row.size == 1) Spacer(Modifier.weight(1f))
                }
            }
        }

        item {
            ElevatedCard(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(top = 8.dp),
                shape = RoundedCornerShape(16.dp),
            ) {
                Column(
                    modifier = Modifier.padding(16.dp),
                    verticalArrangement = Arrangement.spacedBy(8.dp),
                ) {
                    Surface(
                        color = Violet600,
                        contentColor = androidx.compose.ui.graphics.Color.White,
                        shape = RoundedCornerShape(6.dp),
                    ) {
                        Text(
                            "What's New · 2026",
                            style = MaterialTheme.typography.labelSmall,
                            modifier = Modifier.padding(horizontal = 8.dp, vertical = 3.dp),
                        )
                    }
                    Text(
                        "EU AI Act enters force.",
                        style = MaterialTheme.typography.titleLarge,
                        fontWeight = FontWeight.Bold,
                    )
                    Text(
                        "The world's first comprehensive AI regulation is now in effect. Is your organisation ready?",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                    )
                    Button(
                        onClick = { onNavigate(Screen.Compliance.route) },
                        modifier = Modifier.align(Alignment.End),
                    ) {
                        Text("Read the Guide")
                    }
                }
            }
        }
    }
}

@Composable
private fun HomeNavCard(card: NavCard, onClick: () -> Unit, modifier: Modifier = Modifier) {
    Surface(
        color = MaterialTheme.colorScheme.surface,
        tonalElevation = 1.dp,
        shape = RoundedCornerShape(14.dp),
        modifier = modifier
            .clickable(onClick = onClick)
            .aspectRatio(1f),
    ) {
        Column(
            modifier = Modifier.padding(14.dp),
            verticalArrangement = Arrangement.SpaceBetween,
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.Top,
            ) {
                Surface(
                    color = card.containerColor,
                    contentColor = card.contentColor,
                    shape = RoundedCornerShape(10.dp),
                    modifier = Modifier.size(38.dp),
                ) {
                    Box(contentAlignment = Alignment.Center) {
                        Icon(card.icon, null, modifier = Modifier.size(20.dp))
                    }
                }
                Surface(
                    color = MaterialTheme.colorScheme.surfaceVariant,
                    shape = RoundedCornerShape(50),
                ) {
                    Text(
                        text = card.stat,
                        style = MaterialTheme.typography.labelSmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                        modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp),
                        maxLines = 1,
                    )
                }
            }
            Column {
                Text(card.label, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.Bold)
                Text(card.desc, style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant, maxLines = 2)
            }
        }
    }
}
