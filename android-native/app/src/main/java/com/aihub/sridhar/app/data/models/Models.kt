package com.aihub.sridhar.app.data.models

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

/* ── Tools ───────────────────────────────────────────────── */

@Serializable
data class Tool(
    val slug: String,
    val name: String,
    val vendor: String,
    val category: String,
    val pricing: String,
    val tagline: String,
    val description: String,
    val website: String,
    val tags: List<String> = emptyList(),
    val featured: Boolean = false,
    val metrics: List<String> = emptyList(),
    val founded: String = "",
    val employees: String = "",
    val revenue: String = "",
)

/* ── Companies ───────────────────────────────────────────── */

@Serializable
data class Company(
    val slug: String,
    val name: String,
    val focus: String,
    val stage: String,
    val description: String,
    val website: String,
    val founded: String,
    val products: List<String> = emptyList(),
    val employees: String = "",
    val valuation: String = "",
    val funding: String = "",
    val headquarters: String = "",
    val keyPeople: List<String> = emptyList(),
    val recentNews: List<String> = emptyList(),
)

/* ── Case Studies ────────────────────────────────────────── */

@Serializable
data class CaseStudy(
    val slug: String,
    val company: String,
    val industry: String,
    val title: String,
    val metrics: List<String> = emptyList(),
    val tags: List<String> = emptyList(),
    val featured: Boolean = false,
    val summary: String = "",
    val challenge: String = "",
    val solution: String = "",
    val results: String = "",
    val year: String = "",
    val toolsUsed: List<String> = emptyList(),
)

/* ── Compliance ──────────────────────────────────────────── */

@Serializable
data class ComplianceFramework(
    val slug: String,
    val name: String,
    val jurisdiction: String,
    val status: String,
    val riskLevel: String,
    val description: String,
    val enforcementDate: String,
    val keyRequirements: List<String> = emptyList(),
    val penalties: String = "",
    val scope: String = "",
    val summary: String = "",
    val aimsAndObjectives: String = "",
)

/* ── Learn ───────────────────────────────────────────────── */

@Serializable
data class LearnResource(
    val id: String,
    val slug: String,
    val title: String,
    val type: String,
    val provider: String,
    val level: String,
    val free: Boolean,
    val description: String,
    val link: String,
    val readTime: Int,
    val tags: List<String> = emptyList(),
)

/* ── Playbooks ───────────────────────────────────────────── */

@Serializable
data class TemplateSection(
    val heading: String,
    val items: List<String> = emptyList(),
)

@Serializable
data class ChecklistItem(
    val item: String,
    val templateTitle: String = "",
    val templateType: String = "",
    val instructions: String = "",
    val sections: List<TemplateSection> = emptyList(),
)

@Serializable
data class Playbook(
    val title: String,
    val level: String,
    val desc: String,
    val guidance: String = "",
    val checklist: List<ChecklistItem> = emptyList(),
)

@Serializable
data class Phase(
    val phase: String,
    val label: String,
    val color: String = "",
    val bg: String = "",
    val description: String,
    val playbooks: List<Playbook> = emptyList(),
)
