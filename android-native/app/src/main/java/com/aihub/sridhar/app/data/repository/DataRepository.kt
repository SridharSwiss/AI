package com.aihub.sridhar.app.data.repository

import android.content.Context
import com.aihub.sridhar.app.data.models.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import kotlinx.serialization.json.Json

private val json = Json { ignoreUnknownKeys = true; coerceInputValues = true }

private fun Context.asset(name: String) =
    assets.open(name).bufferedReader().readText()

class DataRepository(private val context: Context) {

    // All lazy delegates are intentionally loaded on IO thread via loadXxx() helpers.
    // Never call these properties directly from a Composable — use the suspend wrappers.

    private val _tools by lazy { json.decodeFromString<List<Tool>>(context.asset("tools.json")) }
    private val _companies by lazy { json.decodeFromString<List<Company>>(context.asset("companies.json")) }
    private val _caseStudies by lazy { json.decodeFromString<List<CaseStudy>>(context.asset("case_studies.json")) }
    private val _compliance by lazy { json.decodeFromString<List<ComplianceFramework>>(context.asset("compliance.json")) }
    private val _learnResources by lazy { json.decodeFromString<List<LearnResource>>(context.asset("learn.json")) }
    private val _phases by lazy { json.decodeFromString<List<Phase>>(context.asset("playbooks.json")) }
    private val _newsSources by lazy { json.decodeFromString<List<NewsSource>>(context.asset("news_sources.json")) }

    suspend fun loadTools()        = withContext(Dispatchers.IO) { runCatching { _tools }.getOrElse { emptyList() } }
    suspend fun loadCompanies()    = withContext(Dispatchers.IO) { runCatching { _companies }.getOrElse { emptyList() } }
    suspend fun loadCaseStudies()  = withContext(Dispatchers.IO) { runCatching { _caseStudies }.getOrElse { emptyList() } }
    suspend fun loadCompliance()   = withContext(Dispatchers.IO) { runCatching { _compliance }.getOrElse { emptyList() } }
    suspend fun loadLearn()        = withContext(Dispatchers.IO) { runCatching { _learnResources }.getOrElse { emptyList() } }
    suspend fun loadPhases()       = withContext(Dispatchers.IO) { runCatching { _phases }.getOrElse { emptyList() } }
    suspend fun loadNewsSources()  = withContext(Dispatchers.IO) { runCatching { _newsSources }.getOrElse { emptyList() } }

    suspend fun fetchNewsArticles(): List<NewsArticle> = withContext(Dispatchers.IO) {
        try {
            val url  = java.net.URL("https://sridhar-ai.ch/api/news")
            val conn = url.openConnection() as java.net.HttpURLConnection
            conn.connectTimeout = 12_000
            conn.readTimeout    = 20_000
            conn.setRequestProperty("Accept",     "application/json")
            conn.setRequestProperty("User-Agent",
                "Mozilla/5.0 (Linux; Android 14; Mobile) AppleWebKit/537.36 Chrome/124.0.0.0 Safari/537.36")
            conn.setRequestProperty("Referer",    "https://sridhar-ai.ch/")
            conn.setRequestProperty("Origin",     "https://sridhar-ai.ch")
            val code = conn.responseCode
            if (code != 200) { conn.disconnect(); return@withContext emptyList() }
            val text = conn.inputStream.bufferedReader().readText()
            conn.disconnect()
            json.decodeFromString(text)
        } catch (_: Exception) {
            emptyList()
        }
    }
}
