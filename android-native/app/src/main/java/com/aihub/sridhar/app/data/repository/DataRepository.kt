package com.aihub.sridhar.app.data.repository

import android.content.Context
import com.aihub.sridhar.app.data.models.*
import kotlinx.serialization.json.Json

private val json = Json { ignoreUnknownKeys = true; coerceInputValues = true }

private fun Context.asset(name: String) =
    assets.open(name).bufferedReader().readText()

class DataRepository(private val context: Context) {

    val tools: List<Tool> by lazy {
        json.decodeFromString(context.asset("tools.json"))
    }

    val companies: List<Company> by lazy {
        json.decodeFromString(context.asset("companies.json"))
    }

    val caseStudies: List<CaseStudy> by lazy {
        json.decodeFromString(context.asset("case_studies.json"))
    }

    val compliance: List<ComplianceFramework> by lazy {
        json.decodeFromString(context.asset("compliance.json"))
    }

    val learnResources: List<LearnResource> by lazy {
        json.decodeFromString(context.asset("learn.json"))
    }

    val phases: List<Phase> by lazy {
        json.decodeFromString(context.asset("playbooks.json"))
    }

    val allPlaybooks: List<Pair<Phase, Playbook>> by lazy {
        phases.flatMap { phase -> phase.playbooks.map { phase to it } }
    }

    val newsSources: List<NewsSource> by lazy {
        json.decodeFromString(context.asset("news_sources.json"))
    }

    suspend fun fetchNewsArticles(): List<NewsArticle> {
        return try {
            val url = java.net.URL("https://sridhar-ai.ch/api/news")
            val conn = url.openConnection() as java.net.HttpURLConnection
            conn.connectTimeout = 10_000
            conn.readTimeout    = 15_000
            conn.setRequestProperty("Accept", "application/json")
            val text = conn.inputStream.bufferedReader().readText()
            conn.disconnect()
            json.decodeFromString(text)
        } catch (_: Exception) {
            emptyList()
        }
    }
}
