package com.aihub.sridhar.app.data.models

import kotlinx.serialization.Serializable

/* ── News ────────────────────────────────────────────────── */

@Serializable
data class NewsSource(
    val id: String = "",
    val name: String,
    val category: String,
    val rssUrl: String = "",
    val website: String,
    val description: String,
)

@Serializable
data class NewsArticle(
    val title: String = "",
    val link: String = "",
    val pubDate: String = "",
    val description: String = "",
    val sourceName: String = "",
    val sourceCategory: String = "",
)
