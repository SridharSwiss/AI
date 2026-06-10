package com.aihub.sridhar.app.data.models

import kotlinx.serialization.Serializable

/* ── Tools ───────────────────────────────────────────────── */

@Serializable
data class PricingTier(
    val name: String = "",
    val price: String = "",
    val features: List<String> = emptyList(),
)

@Serializable
data class Tool(
    val id: String = "",
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
    val useCases: List<String> = emptyList(),
    val pros: List<String> = emptyList(),
    val cons: List<String> = emptyList(),
    val alternatives: List<String> = emptyList(),
    val launchDate: String = "",
    val underlyingModel: List<String> = emptyList(),
    val platforms: List<String> = emptyList(),
    val integrations: List<String> = emptyList(),
    val apiAvailable: Boolean = false,
    val pricingTiers: List<PricingTier> = emptyList(),
    val history: String = "",
    val latestUpdate: String = "",
    val idealFor: List<String> = emptyList(),
)

/* ── Companies ───────────────────────────────────────────── */

@Serializable
data class CompanyModel(
    val name: String = "",
    val type: String = "",
    val contextWindow: String = "",
    val releaseDate: String = "",
    val description: String = "",
)

@Serializable
data class FundingRound(
    val date: String = "",
    val round: String = "",
    val amount: String = "",
    val investors: List<String> = emptyList(),
)

@Serializable
data class CompanyFinancials(
    val totalFunding: String = "",
    val latestValuation: String = "",
    val revenue: String = "",
    val revenueYear: String = "",
    val profitStatus: String = "",
    val employees: String = "",
    val annualRevenueGrowth: String = "",
    val keyInvestors: List<String> = emptyList(),
    val fundingRounds: List<FundingRound> = emptyList(),
)

@Serializable
data class Milestone(
    val date: String = "",
    val event: String = "",
)

@Serializable
data class Company(
    val id: String = "",
    val slug: String,
    val name: String,
    val focus: String,
    val stage: String,
    val description: String,
    val website: String,
    val founded: String,
    val hq: String = "",
    val products: List<String> = emptyList(),
    val tags: List<String> = emptyList(),
    val featured: Boolean = false,
    val employees: String = "",
    val funding: String = "",
    val notableModels: List<String> = emptyList(),
    val keyPeople: List<String> = emptyList(),
    val history: String = "",
    val models: List<CompanyModel> = emptyList(),
    val financials: CompanyFinancials? = null,
    val milestones: List<Milestone> = emptyList(),
    val competitors: List<String> = emptyList(),
)

/* ── Case Studies ────────────────────────────────────────── */

@Serializable
data class ROIBreakdownItem(
    val category: String = "",
    val value: String = "",
    val note: String = "",
)

@Serializable
data class ImplementationPhase(
    val phase: String = "",
    val duration: String = "",
    val description: String = "",
    val keyOutputs: List<String> = emptyList(),
)

@Serializable
data class OpenSourceRepo(
    val name: String = "",
    val url: String = "",
    val description: String = "",
    val stars: String = "",
)

@Serializable
data class CaseStudyReference(
    val label: String = "",
    val url: String = "",
)

@Serializable
data class CaseStudy(
    val id: String = "",
    val slug: String,
    val company: String,
    val industry: String,
    val title: String,
    val problem: String = "",
    val solution: String = "",
    val outcome: String = "",
    val metrics: List<String> = emptyList(),
    val tags: List<String> = emptyList(),
    val featured: Boolean = false,
    val businessContext: String = "",
    val strategicDrivers: List<String> = emptyList(),
    val techStack: List<String> = emptyList(),
    val architecture: String = "",
    val dataRequirements: String = "",
    val investmentEstimate: String = "",
    val annualReturn: String = "",
    val paybackPeriod: String = "",
    val roiMultiple: String = "",
    val roiBreakdown: List<ROIBreakdownItem> = emptyList(),
    val implementationTimeline: String = "",
    val implementationPhases: List<ImplementationPhase> = emptyList(),
    val teamSize: String = "",
    val challenges: List<String> = emptyList(),
    val governanceFramework: List<String> = emptyList(),
    val dataPrivacy: List<String> = emptyList(),
    val humanOversight: String = "",
    val regulatoryConsiderations: List<String> = emptyList(),
    val lessonsLearned: List<String> = emptyList(),
    val whatWorkedWell: List<String> = emptyList(),
    val openSourceRepos: List<OpenSourceRepo> = emptyList(),
    val references: List<CaseStudyReference> = emptyList(),
)

/* ── Compliance ──────────────────────────────────────────── */

@Serializable
data class RiskTier(
    val name: String = "",
    val level: String = "",
    val description: String = "",
    val examples: List<String> = emptyList(),
    val requirements: List<String> = emptyList(),
)

@Serializable
data class IndustryImpact(
    val sector: String = "",
    val impact: String = "",
    val notes: String = "",
)

@Serializable
data class ComplianceTimeline(
    val date: String = "",
    val milestone: String = "",
    val type: String = "",
)

@Serializable
data class ComplianceFramework(
    val id: String = "",
    val slug: String,
    val name: String,
    val shortName: String = "",
    val jurisdiction: String,
    val status: String,
    val riskLevel: String,
    val description: String,
    val enforcementDate: String,
    val enforcingAuthority: String = "",
    val scope: String = "",
    val affectedOrgs: String = "",
    val keyRequirements: List<String> = emptyList(),
    val whoIsAffected: List<String> = emptyList(),
    val whoIsExempt: List<String> = emptyList(),
    val keyProhibitions: List<String> = emptyList(),
    val riskTiers: List<RiskTier> = emptyList(),
    val guardrails: List<String> = emptyList(),
    val technicalRequirements: List<String> = emptyList(),
    val exposureAreas: List<String> = emptyList(),
    val complianceRoadmap: List<String> = emptyList(),
    val industryImpact: List<IndustryImpact> = emptyList(),
    val timeline: List<ComplianceTimeline> = emptyList(),
    val notableEnforcementCases: List<String> = emptyList(),
    val penalties: String = "",
    val tags: List<String> = emptyList(),
    val officialLink: String = "",
    val implementationGuidance: List<String> = emptyList(),
    val relatedFrameworks: List<String> = emptyList(),
)

/* ── Learn ───────────────────────────────────────────────── */

@Serializable
data class LearnResource(
    val id: String = "",
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
