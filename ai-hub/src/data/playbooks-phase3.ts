import type { Phase } from "./playbooks-types";

export const phase3: Phase = {
  phase: "scale",
  label: "Phase 3: Scale",
  color: "from-emerald-500 to-teal-500",
  bg: "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/50",
  description: "Expand from pilot to production with governance and change management.",
  playbooks: [
    {
      title: "MLOps Maturity Roadmap",
      level: "practitioner",
      desc: "From manual deployments to automated ML pipelines.",
      guidance: "MLOps maturity progresses through four levels: Level 0 (manual), Level 1 (ML pipeline automation), Level 2 (CI/CD for ML), Level 3 (full automation with monitoring). Target Level 1–2 as your first goal.",
      checklist: [
        {
          item: "Audit current model deployment process (manual vs. automated)",
          templateTitle: "Current-State MLOps Assessment",
          templateType: "questionnaire",
          instructions: "Assess where you are today before planning where to go. Be honest - most organisations overestimate their MLOps maturity.",
          sections: [
            {
              heading: "Deployment Process Today",
              items: [
                "How are models currently deployed: ☐ Manual (Jupyter notebook export) ☐ Manual scripts  ☐ Semi-automated  ☐ Fully automated CI/CD",
                "Average time from 'model ready' to 'in production': ___ days",
                "Number of models currently in production: ___",
                "Do you have a staging/pre-prod environment for models: ☐ Yes  ☐ No",
                "Is there a rollback process: ☐ Yes - time to rollback: ___ hours  ☐ No",
              ],
            },
            {
              heading: "Current MLOps Maturity Level",
              items: [
                "LEVEL 0: Manual process - models deployed as scripts, no monitoring, no versioning → Score: 0",
                "LEVEL 1: ML pipeline automation - reproducible training pipelines, model registry, basic monitoring → Score: 1",
                "LEVEL 2: CI/CD for ML - automated testing, continuous deployment, A/B testing → Score: 2",
                "LEVEL 3: Full MLOps - automated retraining, self-healing pipelines, advanced monitoring → Score: 3",
                "Current level: ___ | Target level (12 months): ___ | Priority gaps: ___",
              ],
            },
          ],
        },
        {
          item: "Establish model registry and versioning",
          templateTitle: "Model Registry Setup Checklist",
          templateType: "template",
          instructions: "A model registry is your source of truth for all ML models - it enables rollback, audit trails, and team collaboration. MLflow, Weights & Biases, and SageMaker Model Registry are common options.",
          sections: [
            {
              heading: "Registry Requirements",
              items: [
                "Selected model registry tool: ☐ MLflow  ☐ Weights & Biases  ☐ SageMaker Model Registry  ☐ Vertex AI Model Registry  ☐ Neptune.ai  ☐ Other: ___",
                "Metadata to store per model: version, training date, training data hash, hyperparameters, evaluation metrics, author, approved by",
                "Model lifecycle stages: Staging → Validated → Production → Archived",
                "Promotion approval process: Who must approve to move from Staging → Production: ___",
                "Retention policy: Keep all versions ☐ / Keep last ___ versions ☐ / Archive after ___ months ☐",
              ],
            },
            {
              heading: "Implementation Steps",
              items: [
                "Week 1: Install and configure registry, define metadata schema, document workflow",
                "Week 2: Register all existing production models retroactively",
                "Week 3: Update all new model training runs to log to registry automatically",
                "Week 4: Train all ML engineers on registry workflow; add registry check to PR template",
                "Verification: Can we roll back to any previous model version in <30 min? ☐ Yes  ☐ No",
              ],
            },
          ],
        },
        {
          item: "Implement feature store for consistent training/serving features",
          templateTitle: "Feature Store Requirements Specification",
          templateType: "template",
          instructions: "A feature store prevents training-serving skew - the #1 cause of silent production model failures. Implement when you have multiple models sharing features or strict latency requirements.",
          sections: [
            {
              heading: "Feature Store Needs Assessment",
              items: [
                "Do multiple models share the same features (yes = strong case for feature store): ☐ Yes  ☐ No",
                "Does training-serving skew cause production issues currently: ☐ Yes  ☐ Suspected  ☐ No",
                "Real-time feature serving required (<100ms latency): ☐ Yes  ☐ No",
                "Number of distinct features across all models: ___",
                "Tool candidates: ☐ Feast  ☐ Tecton  ☐ Databricks Feature Store  ☐ Vertex AI Feature Store  ☐ Hopsworks",
              ],
            },
            {
              heading: "Feature Catalogue Template",
              items: [
                "Feature name | Description | Data type | Source | Refresh frequency | Owner | Used by models",
                "Example: customer_lifetime_value_12m | LTV over last 12 months | Float | CRM | Daily | Data team | Churn, upsell, pricing models",
                "Example: transaction_velocity_7d | # transactions in last 7 days | Int | Payments DB | Real-time | Payments team | Fraud model",
                "Backfilling plan for historical feature values: ___ weeks of history needed | Approach: ___",
              ],
            },
          ],
        },
        {
          item: "Create automated training pipelines",
          templateTitle: "ML Training Pipeline Design Template",
          templateType: "template",
          instructions: "Reproducible training pipelines are the foundation of reliable ML. Every training run should be triggered by code, not by a person running a Jupyter notebook.",
          sections: [
            {
              heading: "Pipeline Components",
              items: [
                "Step 1 - Data ingestion: Pull from source ___ | Validate schema | Log data version hash",
                "Step 2 - Data preprocessing: Apply transformations | Validate output statistics | Flag anomalies",
                "Step 3 - Feature engineering: Compute features | Store in feature store | Log feature importance",
                "Step 4 - Model training: Train on defined config | Log hyperparameters and metrics to registry",
                "Step 5 - Model evaluation: Run on held-out test set | Compare vs production model | Gate on threshold",
                "Step 6 - Model registration: If evaluation passes, register to model registry with metadata",
              ],
            },
            {
              heading: "Pipeline Requirements",
              items: [
                "Orchestration tool: ☐ Airflow  ☐ Prefect  ☐ Kubeflow Pipelines  ☐ Azure ML Pipelines  ☐ Vertex AI Pipelines  ☐ Other: ___",
                "Containerised steps: ☐ Yes (Docker)  ☐ No - dependency risk: ___",
                "Pipeline run triggered by: ☐ Schedule  ☐ New data  ☐ Drift alert  ☐ Manual  ☐ Code commit",
                "Full pipeline run time target: ≤ ___ hours",
                "Pipeline test coverage: Unit tests for each step ☐ | Integration test (full run) ☐",
              ],
            },
          ],
        },
        {
          item: "Set up CI/CD for model deployment",
          templateTitle: "ML CI/CD Pipeline Configuration Guide",
          templateType: "template",
          instructions: "Treat ML models like software - every model change should go through automated testing before deployment. This dramatically reduces deployment failures and rollback events.",
          sections: [
            {
              heading: "CI Pipeline (on every code commit)",
              items: [
                "Lint and static analysis (ruff, mypy): Pass required",
                "Unit tests for data processing functions: ≥80% coverage required",
                "Schema validation tests: All input/output schemas validated",
                "Model smoke test: Train on tiny sample, ensure no errors, assert output shapes",
                "Security scan (bandit, Snyk): No high/critical vulnerabilities",
                "Estimated CI runtime target: ≤15 minutes",
              ],
            },
            {
              heading: "CD Pipeline (on merge to main)",
              items: [
                "Staging deployment: Auto-deploy to staging environment",
                "Integration tests: Run full pipeline on staging data",
                "Performance benchmark: Model latency p50/p99 within SLA",
                "Shadow mode: Run new model alongside production for ___ hours before full cutover",
                "Canary release: Route ___% traffic to new model, monitor for ___ hours",
                "Full production cutover: Automated if canary metrics pass; manual approval if Amber",
                "Rollback trigger: Automated rollback if error rate >___% or latency >___ ms p99",
              ],
            },
          ],
        },
        {
          item: "Implement A/B testing infrastructure",
          templateTitle: "ML A/B Testing Design Template",
          templateType: "template",
          instructions: "A/B testing validates that a new model actually improves business metrics - not just ML metrics. Poor A/B design leads to false positives. Calculate required sample size before starting.",
          sections: [
            {
              heading: "A/B Test Design",
              items: [
                "Test name: ___________________ | Model A (control): ___ | Model B (challenger): ___",
                "Primary metric (business KPI): ___________________ | Minimum detectable effect: ___%",
                "Secondary metrics to monitor (guardrails - must not worsen): ___________________________",
                "Required sample size (per arm): ___ users/requests (use power calculator at 80% power, α=0.05)",
                "Estimated duration at current traffic: ___ days",
                "Traffic split: Control ___% / Challenger ___%",
              ],
            },
            {
              heading: "A/B Test Execution & Decision",
              items: [
                "Randomisation unit: ☐ User  ☐ Session  ☐ Request  ☐ Organisation",
                "Stratification variables (to ensure balanced groups): ___________________________",
                "Analysis method: ☐ Frequentist (t-test)  ☐ Bayesian  ☐ Sequential testing",
                "Decision criteria: Ship if primary metric improvement is statistically significant (p<0.05) AND no guardrail metrics degraded by >5%",
                "Result: ___ | Primary metric lift: ___% (p=___) | Decision: ☐ Ship  ☐ Iterate  ☐ Roll back",
              ],
            },
          ],
        },
        {
          item: "Deploy model performance monitoring (data drift, concept drift)",
          templateTitle: "Model Monitoring Setup Worksheet",
          templateType: "worksheet",
          instructions: "Production models degrade silently - monitoring is the only way to catch it. Set up monitoring before going live, not after the first incident.",
          sections: [
            {
              heading: "Monitoring Metrics to Track",
              items: [
                "DATA DRIFT: Input feature distribution vs training distribution | Tool: ☐ Evidently  ☐ WhyLogs  ☐ NannyML  ☐ Custom",
                "CONCEPT DRIFT: Model output distribution change over time | Detection method: ☐ PSI  ☐ KL-divergence  ☐ Statistical test",
                "MODEL PERFORMANCE: Accuracy / precision / recall vs baseline (requires ground truth labels)",
                "PREDICTION QUALITY: Confidence score distribution, output distribution, error rate",
                "BUSINESS KPIs: Downstream business metrics that the model influences (most important)",
              ],
            },
            {
              heading: "Alert Configuration",
              items: [
                "Data drift alert threshold: PSI > 0.2 OR feature distribution shifts >2 standard deviations",
                "Performance degradation alert: Accuracy drops >___% from baseline over ___ day rolling window",
                "Prediction anomaly alert: Error rate spikes >___× baseline in ___ hour window",
                "Alert channel: ☐ Email  ☐ Slack/Teams  ☐ PagerDuty  ☐ OpsGenie",
                "On-call owner for monitoring alerts: ___________________ | Escalation: ___",
                "Dashboard tool: ☐ Grafana  ☐ Datadog  ☐ MLflow  ☐ Custom  ☐ W&B",
              ],
            },
          ],
        },
        {
          item: "Establish data quality monitoring and alerting",
          templateTitle: "Data Quality Alert Configuration",
          templateType: "template",
          instructions: "Model quality is bounded by data quality. Monitor data at every stage - ingestion, preprocessing, and feature computation. Silent data issues are more dangerous than loud ones.",
          sections: [
            {
              heading: "Data Quality Checks",
              items: [
                "Schema validation: All expected columns present, correct dtypes, no unexpected nulls",
                "Statistical checks: Column means/std within ___× historical range",
                "Completeness: Null rate per column <___% (set per-column thresholds)",
                "Freshness: Data updated within ___ hours of expected refresh time",
                "Volume: Row count within ___% of expected (flag anomalous drops/spikes)",
                "Referential integrity: Foreign keys valid, no orphaned records",
              ],
            },
            {
              heading: "Alert & Response",
              items: [
                "Tool: ☐ Great Expectations  ☐ dbt tests  ☐ Soda  ☐ Monte Carlo  ☐ Custom",
                "Alert severity levels: CRITICAL (pipeline blocked) | HIGH (alert + human review) | MEDIUM (log + weekly review) | LOW (dashboard only)",
                "Response SLA: CRITICAL: fix within ___ hours | HIGH: investigate within ___ hours",
                "Data quality score target: ≥___% of checks passing at all times",
              ],
            },
          ],
        },
        {
          item: "Create automated model retraining triggers",
          templateTitle: "Retraining Trigger Criteria Template",
          templateType: "template",
          instructions: "Define retraining triggers before you need them. Reactive retraining (after performance collapse) is expensive - proactive retraining (on drift detection) is cheap.",
          sections: [
            {
              heading: "Trigger Criteria",
              items: [
                "PERFORMANCE TRIGGER: Retrain when accuracy drops >___% from baseline (requires ground truth)",
                "DRIFT TRIGGER: Retrain when data drift score (PSI) exceeds 0.2 on ≥___ key features",
                "SCHEDULE TRIGGER: Retrain every ___ days/weeks regardless of performance (for fast-changing domains)",
                "DATA VOLUME TRIGGER: Retrain when new training examples exceed ___ (accumulation threshold)",
                "MANUAL TRIGGER: On-demand by ML team following incident review or model card review",
              ],
            },
            {
              heading: "Retraining Workflow",
              items: [
                "Trigger detected → automated alert sent to ML team and logged in model registry",
                "Automated retraining pipeline runs: data prep → train → evaluate vs current production model",
                "If new model outperforms on holdout set: auto-promote to staging for human review",
                "Human approval required before production deployment: ☐ Yes (all cases)  ☐ Yes (performance change >5%)  ☐ Automated",
                "Retraining frequency limit: No more than ___ retrains per ___ days (prevent instability)",
              ],
            },
          ],
        },
        {
          item: "Set up model serving infrastructure with SLAs",
          templateTitle: "Model Serving SLA Definition Template",
          templateType: "template",
          instructions: "Define serving SLAs before go-live and test under realistic load. Latency problems discovered in production require emergency infrastructure work - catch them in load testing.",
          sections: [
            {
              heading: "Serving SLA Requirements",
              items: [
                "Serving pattern: ☐ Synchronous REST API  ☐ Async batch  ☐ Streaming  ☐ Embedded (on-device)",
                "Latency SLA: p50 ≤___ ms | p95 ≤___ ms | p99 ≤___ ms | Max ≤___ ms",
                "Throughput SLA: ___ requests/second sustained | ___ requests/second peak",
                "Availability SLA: ___% uptime | Max ___ minutes downtime/month",
                "Serving infrastructure: ☐ SageMaker Endpoints  ☐ Azure ML Endpoints  ☐ Vertex AI  ☐ TorchServe  ☐ TF Serving  ☐ FastAPI + K8s  ☐ Other: ___",
              ],
            },
            {
              heading: "Load Testing",
              items: [
                "Load test tool: ☐ Locust  ☐ k6  ☐ JMeter  ☐ Gatling",
                "Load test scenarios: Nominal load ___ rps, Peak load ___ rps, Stress test ___ rps (find breaking point)",
                "Load test results: p50: ___ ms | p99: ___ ms | Max throughput before degradation: ___ rps | SLA met: ☐ Yes  ☐ No",
                "Auto-scaling configured: Min ___ instances | Max ___ instances | Scale-out trigger: CPU >___% or latency >___ ms",
              ],
            },
          ],
        },
        {
          item: "Implement shadow mode deployment capability",
          templateTitle: "Shadow Mode Deployment Checklist",
          templateType: "template",
          instructions: "Shadow mode runs a new model on live traffic without affecting users - the new model's outputs are logged but not used. It's the safest way to validate production performance before cutover.",
          sections: [
            {
              heading: "Shadow Mode Setup",
              items: [
                "Traffic duplication method: ☐ API gateway mirroring  ☐ Application-level duplication  ☐ Message queue fan-out",
                "Shadow model logs: All inputs and outputs stored in ☐ S3  ☐ BigQuery  ☐ Snowflake - with zero impact on user experience",
                "Shadow model latency requirement: Shadow calls must not add latency to user-facing requests (fire-and-forget)",
                "Duration of shadow mode: ___ days (enough to cover all seasonal patterns and edge cases)",
                "Analysis plan: Compare shadow outputs to production model daily, look for systematic differences",
              ],
            },
            {
              heading: "Shadow Mode Evaluation",
              items: [
                "Agreement rate between shadow and production: ___% (high agreement means safe to switch)",
                "Cases where they disagree: ___ sample of disagreements manually reviewed",
                "Shadow model preferred by domain experts (where ground truth available): ___% of cases",
                "Performance difference in shadow: Shadow is ___% faster/slower than production",
                "Decision to proceed with canary/full cutover: ☐ Yes  ☐ No - issues: ___",
              ],
            },
          ],
        },
        {
          item: "Document model cards for all production models",
          templateTitle: "Model Card Template",
          templateType: "template",
          instructions: "A model card is a standardised fact sheet for a ML model - like a nutrition label. Complete one for every production model. Store in your model registry. Update on every model version.",
          sections: [
            {
              heading: "Model Card: Identity & Purpose",
              items: [
                "Model Name: ___________________ | Version: ___ | Date: ___",
                "Model Type: ☐ Classification  ☐ Regression  ☐ Ranking  ☐ Generation  ☐ Clustering  ☐ Other: ___",
                "Primary use case: ___________________________",
                "Intended users: ___________________ | Intended deployment context: ___________________",
                "Out-of-scope uses (explicit): ___________________________",
                "Model owner: ___ | Last reviewed: ___ | Next review: ___",
              ],
            },
            {
              heading: "Model Card: Performance & Limitations",
              items: [
                "Training data: ___ examples | Date range: ___ to ___ | Sources: ___",
                "Evaluation metrics (on holdout test set): Accuracy: ___ | Precision: ___ | Recall: ___ | F1: ___ | AUC: ___",
                "Performance by subgroup (bias testing): Group A: ___ | Group B: ___ | Worst group: ___",
                "Known failure modes: ___________________________",
                "Known limitations and biases: ___________________________",
                "Ethical considerations: ___________________________",
              ],
            },
          ],
        },
        {
          item: "Create rollback procedures and runbooks",
          templateTitle: "Model Rollback Runbook Template",
          templateType: "template",
          instructions: "A rollback runbook is a step-by-step procedure that any on-call engineer can execute at 3am. If it requires expert knowledge to run, it will be executed slowly under pressure.",
          sections: [
            {
              heading: "Rollback Triggers (pre-defined, no ambiguity)",
              items: [
                "AUTOMATIC rollback: Error rate >___% for ___ consecutive minutes | Latency p99 >___ ms for ___ minutes",
                "HUMAN-TRIGGERED rollback: Accuracy below minimum threshold | Bias incident detected | Data breach | Sponsor decision",
                "Who can trigger manual rollback: ☐ Any on-call engineer  ☐ ML Lead only  ☐ Sponsor approval required",
              ],
            },
            {
              heading: "Rollback Steps (Model [Name] v[X] → v[X-1])",
              items: [
                "Step 1: Log incident in incident tracker - time, trigger, current metrics",
                "Step 2: Notify: Slack #ml-incidents: '@ml-team Rolling back [model] due to [trigger]. ETA: 10 min'",
                "Step 3: In model registry, set v[X-1] as 'Production' and v[X] as 'Staging'",
                "Step 4: Update serving endpoint to v[X-1] - command: [specific command for your infra]",
                "Step 5: Verify rollback: Check latency, error rate, and model version in monitoring dashboard",
                "Step 6: Notify: '@ml-team Rollback complete. [Metrics]. RCA meeting at [time].'",
                "Step 7: Post-mortem within 48 hours - root cause, fix plan, prevention measures",
              ],
            },
          ],
        },
        {
          item: "Establish on-call rotation for model incidents",
          templateTitle: "ML On-Call Setup Guide",
          templateType: "template",
          instructions: "ML incidents are different from software incidents - they can be subtle, gradual, and hard to diagnose. Your on-call process must account for this.",
          sections: [
            {
              heading: "On-Call Structure",
              items: [
                "On-call rotation: ___ engineers | Rotation period: ___ days each",
                "Primary on-call responsibilities: Respond to monitoring alerts, execute runbooks, escalate if needed",
                "Secondary on-call (backup): Available if primary unavailable | Escalation time: ___ minutes",
                "Escalation chain: On-call Engineer → ML Lead → CTO (for P1 incidents)",
                "On-call tooling: ☐ PagerDuty  ☐ OpsGenie  ☐ VictorOps  ☐ On-call schedule in Slack",
              ],
            },
            {
              heading: "Incident Severity Levels",
              items: [
                "P1 - Critical: Production model down or causing incorrect decisions at scale | Response: 15 min | Resolution: 1 hour",
                "P2 - High: Significant performance degradation or bias detected | Response: 1 hour | Resolution: 4 hours",
                "P3 - Medium: Drift detected, no immediate user impact | Response: 4 hours | Resolution: 24 hours",
                "P4 - Low: Monitoring alert, investigation needed | Response: Next business day",
                "All P1/P2 incidents require post-mortem within 48 hours | Post-mortem owner: ___",
              ],
            },
          ],
        },
        {
          item: "Implement cost monitoring for model serving",
          templateTitle: "ML Cost Monitoring Dashboard Template",
          templateType: "template",
          instructions: "ML serving costs can grow unexpectedly with usage scale - or be wasted on idle infrastructure. Monitor costs weekly and set budget alerts before they become problems.",
          sections: [
            {
              heading: "Cost Tracking Setup",
              items: [
                "Cost tracking tool: ☐ AWS Cost Explorer  ☐ Azure Cost Management  ☐ GCP Billing  ☐ Infracost  ☐ Datadog",
                "Tag all AI infrastructure with: project=___, model=___, environment=prod/staging, team=___",
                "Cost categories to track: Compute (GPU/CPU), Storage (model artefacts, logs, features), Inference (API calls to external models), Data transfer/egress",
                "Monthly budget by category: Compute: £/$ ___ | Storage: £/$ ___ | External APIs: £/$ ___ | Total: £/$ ___",
              ],
            },
            {
              heading: "Cost Alerts & Optimisation",
              items: [
                "Budget alert thresholds: Alert at 70% of monthly budget | Escalate at 90%",
                "Cost anomaly detection: Alert if daily spend exceeds ___× 7-day average",
                "Weekly cost review: ML Lead reviews cost dashboard every Monday",
                "Optimisation opportunities to review quarterly: right-sizing instances, spot/preemptible instances, batching inference requests, caching frequent predictions, pruning/quantising models",
                "Cost per prediction target: £/$ ___ | Current cost per prediction: £/$ ___ | Variance: ___",
              ],
            },
          ],
        },
        {
          item: "Create model audit trails for compliance",
          templateTitle: "Model Audit Trail Requirements",
          templateType: "template",
          instructions: "Regulators increasingly require evidence of model governance. Build audit trails from day one - retrofitting them is very expensive. GDPR Article 22 and EU AI Act require audit logs for automated decision-making.",
          sections: [
            {
              heading: "What to Log (for every production prediction)",
              items: [
                "Timestamp (UTC, millisecond precision)",
                "Model name and version number",
                "Input features (or hash if PII - never log raw PII in audit logs)",
                "Model output / prediction",
                "Confidence score or probability",
                "Downstream action taken (what the system did with the prediction)",
                "Human override (if applicable): override flag, reason, override actor",
              ],
            },
            {
              heading: "Audit Log Management",
              items: [
                "Log storage: ☐ S3 + Athena  ☐ BigQuery  ☐ Azure Blob + Synapse  ☐ Splunk  ☐ Other: ___",
                "Retention period: ___ years (min 5 years for regulated industries)",
                "Tamper-evident: ☐ Write-once / immutable storage  ☐ Cryptographic signing  ☐ Neither (risk: ___)",
                "Access controls: Audit logs accessible only to: ☐ Compliance  ☐ Legal  ☐ Audit team  ☐ On-call",
                "Audit log query SLA (for regulatory requests): Provide logs within ___ business days",
              ],
            },
          ],
        },
        {
          item: "Set up automated bias monitoring",
          templateTitle: "Production Bias Monitoring Configuration",
          templateType: "template",
          instructions: "Bias can emerge in production even if pre-deployment testing was clean - due to data distribution shifts, feedback loops, or changing user populations. Continuous monitoring is essential.",
          sections: [
            {
              heading: "Production Bias Metrics",
              items: [
                "Metric 1: Demographic parity - prediction rate by protected group | Alert if gap >___% | Frequency: daily",
                "Metric 2: Equalised odds - TPR and FPR by protected group | Alert if ratio >___ | Frequency: weekly",
                "Metric 3: Calibration by group - confidence scores vs actual outcomes | Frequency: monthly",
                "Protected attributes monitored: ___________________________",
                "Ground truth availability: ☐ Real-time  ☐ Delayed (___ days)  ☐ Sample only (___% of cases)  ☐ None (use proxy metrics)",
              ],
            },
            {
              heading: "Bias Alert & Response",
              items: [
                "Alert tool: ☐ Evidently AI  ☐ Fiddler  ☐ Arthur AI  ☐ Custom dashboard",
                "Alert recipient: ___________________ | Escalation: ___________________",
                "Response SLA: Bias alert → investigation within ___ hours | Mitigation plan within ___ business days",
                "Mitigation options: Model retraining with fairness constraints | Post-processing calibration | Emergency human review for affected group | Suspend model for affected cases",
                "Regulatory notification required if bias incident confirmed: ☐ Yes - notify: ___ within ___ days  ☐ No",
              ],
            },
          ],
        },
        {
          item: "Document MLOps runbooks and playbooks",
          templateTitle: "MLOps Runbook Template",
          templateType: "template",
          instructions: "A runbook is a specific step-by-step procedure. A playbook is a collection of runbooks for a system. Write them for the person who has never seen the system before.",
          sections: [
            {
              heading: "Runbook Index (create one runbook per scenario)",
              items: [
                "RB-01: Deploy new model version to production",
                "RB-02: Roll back model to previous version",
                "RB-03: Trigger and monitor model retraining",
                "RB-04: Investigate data drift alert",
                "RB-05: Investigate prediction quality degradation",
                "RB-06: Scale serving infrastructure (up/down)",
                "RB-07: Rotate API keys / secrets for ML services",
                "RB-08: Recover from complete model serving outage",
              ],
            },
            {
              heading: "Runbook Standard Format",
              items: [
                "Title: [Runbook name] | ID: RB-0X | Owner: ___ | Last tested: ___ | Next review: ___",
                "Trigger: What event triggers this runbook (alert, schedule, request)",
                "Prerequisites: Access, tools, and knowledge required before starting",
                "Steps: Numbered list - specific commands, links, decision points",
                "Verification: How to confirm the runbook completed successfully",
                "Escalation: If steps fail or situation is unclear, contact: ___",
              ],
            },
          ],
        },
      ],
    },
    {
      title: "Change Management Playbook",
      level: "manager",
      desc: "Drive adoption with training and communication plans.",
      guidance: "AI deployments fail more often due to people and process issues than technical issues. Use the ADKAR model (Awareness, Desire, Knowledge, Ability, Reinforcement) as your framework. Invest proportionally.",
      checklist: [
        {
          item: "Conduct stakeholder impact analysis for AI change",
          templateTitle: "AI Change Impact Assessment",
          templateType: "worksheet",
          instructions: "Assess how this AI change affects each stakeholder group before designing your change programme. Impact severity determines how much change management investment each group needs.",
          sections: [
            {
              heading: "Stakeholder Impact Map",
              items: [
                "Stakeholder Group | Impact Type | Severity (H/M/L) | Change in role | Change in process | Change in skills needed",
                "Group 1: ___ | ☐ Job change  ☐ Process change  ☐ Tool change | H/M/L | Describe: ___",
                "Group 2: ___ | ☐ Job change  ☐ Process change  ☐ Tool change | H/M/L | Describe: ___",
                "Group 3: ___ | ☐ Job change  ☐ Process change  ☐ Tool change | H/M/L | Describe: ___",
                "Most impacted group: ___________________ | High-touch engagement plan required: ☐ Yes  ☐ No",
              ],
            },
            {
              heading: "ADKAR Readiness Assessment per Group",
              items: [
                "AWARENESS of why the change is needed (1–5): ___ | Gap: ___",
                "DESIRE to support and participate in the change (1–5): ___ | Gap: ___",
                "KNOWLEDGE of how to change (1–5): ___ | Gap: ___",
                "ABILITY to implement skills and behaviours (1–5): ___ | Gap: ___",
                "REINFORCEMENT to sustain change (1–5): ___ | Gap: ___",
                "Weakest ADKAR element (drives change programme priority): ___",
              ],
            },
          ],
        },
        {
          item: "Create AI adoption communication plan",
          templateTitle: "AI Communication Plan Template",
          templateType: "template",
          instructions: "Communicate early, frequently, and honestly. Never let the rumour mill fill the information vacuum - someone will always fill it with fear.",
          sections: [
            {
              heading: "Communication Timeline",
              items: [
                "T-8 weeks: Leadership announcement - why AI, what we're doing, what it means for our people",
                "T-6 weeks: Department briefings - what changes in your team, timeline, how to ask questions",
                "T-4 weeks: Pilot team announcement - who's involved, what they'll test, how to follow along",
                "T-2 weeks: Pre-launch briefing - what's launching, what to expect, support available",
                "Launch day: Go-live announcement - how to access, where to get help, success story from pilot",
                "T+2 weeks: Early adopter feedback share - what we heard, what we're improving",
                "Monthly: Progress update - adoption stats, wins, improvements made",
              ],
            },
            {
              heading: "Message Templates",
              items: [
                "LAUNCH EMAIL SUBJECT: 'AI is live - here's what changes for you [and what doesn't]'",
                "OPENING LINE: 'Today we launch [AI feature]. This is designed to [specific benefit] so you can spend more time on [high-value work].'",
                "CONCERN ADDRESSED: 'We know some of you have questions about what this means for your role. Here's what we know: [facts]. Here's what will stay the same: [facts].'",
                "CALL TO ACTION: 'Start using [feature] by [specific date]. Your manager will schedule a 30-minute demo in the next two weeks.'",
                "SUPPORT LINE: 'Questions? Contact [AI champion name] in your team or email [alias].'",
              ],
            },
          ],
        },
        {
          item: "Develop role-specific AI training curriculum",
          templateTitle: "AI Training Curriculum Design Template",
          templateType: "template",
          instructions: "One-size-fits-all training doesn't work. Design role-specific tracks. The executive track is fundamentally different from the data scientist track - both in content and format.",
          sections: [
            {
              heading: "Training Tracks by Role",
              items: [
                "EXECUTIVE TRACK (2 hrs): AI strategy, ethical leadership, ROI frameworks, regulatory responsibilities - format: workshop",
                "MANAGER TRACK (4 hrs): AI project management, reading dashboards, change management, escalation - format: workshop + self-paced",
                "BUSINESS USER TRACK (3 hrs): Using the specific AI tool, prompting effectively, knowing when to override, giving feedback - format: hands-on lab",
                "DATA ANALYST TRACK (8 hrs): AI/ML concepts, interpreting model outputs, bias awareness, when to trust AI - format: course + exercises",
                "DEVELOPER TRACK (16 hrs): AI APIs, fine-tuning, prompt engineering, responsible AI coding - format: technical course",
                "ML ENGINEER TRACK (40 hrs): Full MLOps curriculum - format: certification path",
              ],
            },
            {
              heading: "Training Delivery Checklist",
              items: [
                "Training content created/curated: ☐ Yes  ☐ In progress - completion date: ___",
                "Platform selected: ☐ LMS (Moodle/Cornerstone)  ☐ Course platform (Coursera/LinkedIn)  ☐ In-person  ☐ Hybrid",
                "Training mandatory or optional: ☐ Mandatory for all impacted roles  ☐ Optional  ☐ Mandatory for specific roles: ___",
                "Completion deadline: ___ | Completion tracking method: ___",
                "Assessment / certification: ☐ Yes - passing score: ___  ☐ No",
                "Training evaluation (did it work): Survey 2 weeks after training on confidence and application",
              ],
            },
          ],
        },
        {
          item: "Launch AI champion network in each department",
          templateTitle: "AI Champion Programme Setup Guide",
          templateType: "template",
          instructions: "AI champions are respected peers who help colleagues adopt AI. They are not the IT team - they are enthusiastic business users. The champion network is one of the highest-ROI change investments you can make.",
          sections: [
            {
              heading: "Champion Selection & Recruitment",
              items: [
                "Target ratio: 1 champion per ___ users (recommended: 1:15–1:25)",
                "Selection criteria: Respected by peers ✓ | Enthusiastic about AI ✓ | Good communicator ✓ | Available ≥2 hrs/week ✓",
                "How to recruit: Manager nominations + self-nomination + screening interview",
                "Champion commitment: 2 hrs/week for first 3 months, 1 hr/week ongoing",
                "Champion incentives: ☐ Time in job description  ☐ Recognition programme  ☐ AI skills certification  ☐ First access to new AI features  ☐ Bonus recognition",
              ],
            },
            {
              heading: "Champion Training & Support",
              items: [
                "Champion onboarding: Full-day session - AI overview, tool deep dive, coaching skills, escalation paths",
                "Champion community: Monthly 60-min call | Shared Slack channel | Resource library",
                "Champion toolkit: FAQ document, demo scripts, troubleshooting guide, escalation contacts",
                "Champion feedback to programme team: Weekly Slack update on top questions received | Monthly report on adoption barriers",
                "Success metric: ≥80% of users in champion's area use AI tool at least weekly within 90 days of launch",
              ],
            },
          ],
        },
        {
          item: "Create feedback channels for frontline users",
          templateTitle: "Employee AI Feedback System Design",
          templateType: "template",
          instructions: "Frontline users see AI failures that never make it to dashboards. A good feedback loop is your early warning system. Make it easy to give feedback - five taps not five minutes.",
          sections: [
            {
              heading: "Feedback Channels",
              items: [
                "In-product: 👍 / 👎 button on every AI output - captures sentiment with zero friction",
                "In-product: 'Report a problem' link → short form: what AI output, what was wrong, what you expected",
                "Champion: Users can bring feedback to their AI champion verbally - champion logs it weekly",
                "Monthly survey (3 Qs): Satisfaction score 1–5 | What AI helps most | What frustrates most",
                "Quarterly focus groups: 6–8 frontline users | 60 min facilitated session | All feedback anonymised",
              ],
            },
            {
              heading: "Feedback Loop Process",
              items: [
                "All feedback reviewed weekly by: PM + Champion Lead",
                "Categorise: Bug/error ☐ | UX issue ☐ | Training need ☐ | Process gap ☐ | Feature request ☐",
                "Action within 5 business days: Bug → engineering | Training need → champion | Feature request → backlog",
                "Close the loop: Monthly 'You said, we did' email to all users",
                "Escalation: Any feedback suggesting safety/compliance risk → immediate escalation to Steering Committee",
              ],
            },
          ],
        },
        {
          item: "Develop FAQ and myth-busting resources",
          templateTitle: "AI FAQ Document Template",
          templateType: "template",
          instructions: "Publish the FAQ before launch. Update it monthly based on real questions received. Nothing erodes trust faster than an AI programme that doesn't address the obvious questions.",
          sections: [
            {
              heading: "Universal AI FAQ (Adapt for Your Context)",
              items: [
                "Q: Will AI replace my job? A: Our AI is designed to automate repetitive tasks so you can focus on [higher-value work]. We are not reducing headcount as a result of this programme. We will invest savings in [upskilling / growth].",
                "Q: Is the AI always right? A: No - AI makes mistakes. Always apply your judgement. If the AI output seems wrong, trust your instincts and use the override button. Please also report it so we can improve.",
                "Q: Who sees the data I enter into the AI? A: [Specify: only our systems / vendor processes but doesn't train on it / etc]. Never enter [specific prohibited data types] into the AI.",
                "Q: What if I disagree with the AI's recommendation? A: You always have the final say. Use the override button and note your reason - this helps improve the system.",
                "Q: Will my AI usage be monitored and used to evaluate my performance? A: [Specific policy]. AI usage data is used only to improve the system, not to evaluate individual performance.",
              ],
            },
            {
              heading: "Myth Busting",
              items: [
                "MYTH: 'AI is 100% accurate' - TRUTH: AI has error rates. For [our use case], accuracy is ___%. Always review critical outputs.",
                "MYTH: 'AI understands the business like we do' - TRUTH: AI recognises patterns in data. It doesn't understand context, relationships, or nuance the way you do.",
                "MYTH: 'I can't make mistakes if I follow the AI' - TRUTH: Following AI blindly removes human oversight - which is the most important safeguard we have.",
                "MYTH: 'The AI learns from my corrections immediately' - TRUTH: Model updates happen on [retraining schedule]. Your corrections are valuable but don't change the model in real time.",
              ],
            },
          ],
        },
        {
          item: "Run pre-launch readiness assessment",
          templateTitle: "Pre-Launch AI Readiness Checklist",
          templateType: "template",
          instructions: "Run this checklist 2 weeks before launch. Any RED item is a go/no-go blocker. Any AMBER item needs a named owner and 48-hour resolution plan.",
          sections: [
            {
              heading: "Technical Readiness",
              items: [
                "☐ Model performance meets all defined KPI thresholds on holdout test set",
                "☐ Production infrastructure load-tested at 2× expected peak traffic",
                "☐ Monitoring and alerting configured and tested (send a test alert)",
                "☐ Rollback runbook tested end-to-end by on-call engineer",
                "☐ Security review completed and no critical/high findings open",
                "☐ Accessibility tested (WCAG 2.1 AA): ☐ Passed  ☐ Exceptions documented",
              ],
            },
            {
              heading: "People & Process Readiness",
              items: [
                "☐ Training completed: ___% of mandatory audience trained (target: 100%)",
                "☐ AI champions in place in every impacted department",
                "☐ FAQ published and shared with all champions",
                "☐ Feedback channels configured and tested",
                "☐ Support process documented and support team briefed",
                "☐ Launch communication sent to all impacted staff",
                "☐ Rollback communication template prepared (in case we need to pause)",
                "☐ Executive sponsor signed off on launch",
              ],
            },
          ],
        },
        {
          item: "Create incentive structure for AI adoption",
          templateTitle: "AI Adoption Incentive Framework",
          templateType: "framework",
          instructions: "People adopt behaviours when they see clear personal benefit. Design incentives to accelerate early adoption - the fastest adopters become your informal champions.",
          sections: [
            {
              heading: "Intrinsic Incentives (most durable)",
              items: [
                "Time savings: Communicate clearly that time saved goes to [high-value work, not workload increase]",
                "Skill development: AI proficiency becomes a career-valued skill - include in job grade frameworks",
                "Recognition: Public recognition for AI power users ('AI Pioneer' programme)",
                "Autonomy: Power users get early access to new AI features",
              ],
            },
            {
              heading: "Extrinsic Incentives (accelerate early adoption)",
              items: [
                "Adoption milestone rewards: First department to 80% active users receives [team recognition/event]",
                "Certification bonus: Complete AI certification → £/$ ___ learning credit or recognition",
                "Feedback incentive: Users who submit ≥___ pieces of quality feedback per month highlighted in comms",
                "Avoid: Penalising non-adoption (creates resentment) | Tying AI usage to performance reviews (creates gaming)",
              ],
            },
          ],
        },
        {
          item: "Measure and report adoption metrics weekly",
          templateTitle: "AI Adoption Metrics Dashboard Template",
          templateType: "template",
          instructions: "Define what 'adoption' means before launch. Active usage is not the same as feature access. Track the metric that measures genuine value delivery - not vanity metrics.",
          sections: [
            {
              heading: "Adoption Metrics Hierarchy",
              items: [
                "LEVEL 1 - Access: ___ users with access to AI feature | Target: ___% of eligible users",
                "LEVEL 2 - Activation: ___ users who used AI feature at least once | Target: ___% of users with access",
                "LEVEL 3 - Active use: ___ users using AI at least weekly | Target: ___% of activated users",
                "LEVEL 4 - Power users: ___ users using AI daily | Target: ___% of active users",
                "LEVEL 5 - Value delivery: Business KPI impacted by AI users vs non-AI users | Gap: ___",
              ],
            },
            {
              heading: "Weekly Reporting Template",
              items: [
                "Week ending: ___ | Total eligible users: ___ | Active users (weekly): ___ (___% of eligible)",
                "New activations this week: ___ | Churned (stopped using): ___ | Net change: ___",
                "Top departments by adoption: 1) ___ at ___% | 2) ___ at ___% | 3) ___ at ___%",
                "Bottom departments (need intervention): ___________________ | Action: ___",
                "Top feedback themes this week: 1) ___ 2) ___ 3) ___",
                "Changes made based on feedback: ___________________________",
              ],
            },
          ],
        },
        {
          item: "Develop escalation path for user concerns",
          templateTitle: "User Concern Escalation Framework",
          templateType: "framework",
          instructions: "Make it easy for users to raise concerns - a system that suppresses concerns will have bigger problems later. Separate the 'I need help' path from the 'I think something is wrong' path.",
          sections: [
            {
              heading: "Concern Categories & Routing",
              items: [
                "HELP NEEDED: Contact AI champion → champion resolves or escalates to support team | SLA: same day",
                "TOOL ERROR / BUG: 'Report a problem' in-app → engineering ticket | SLA: 48 hours to acknowledge",
                "AI RESULT SEEMS WRONG: Document and report via feedback form → PM review → model team if systematic | SLA: review weekly",
                "ETHICS / FAIRNESS CONCERN: Named email address (ai-ethics@company.com) → DPO + Ethics lead review | SLA: 5 business days",
                "FORMAL COMPLAINT (AI decision affected me unfairly): Written submission → HR + Legal + DPO | SLA: 10 business days",
              ],
            },
            {
              heading: "Escalation Response Templates",
              items: [
                "ACKNOWLEDGEMENT: 'Thank you for raising this concern about [AI feature]. We take this seriously and will review it by [date]. Reference number: [#].'",
                "INVESTIGATION UNDERWAY: 'We are investigating your concern. [Name] is leading the review. We will update you by [date].'",
                "RESOLUTION: 'We have investigated and [found / did not find] a problem with [specific issue]. We have [taken action / explanation]. Here is what this means for you: [next steps].'",
                "ESCALATION TRIGGER: Any concern involving potential legal liability, regulatory breach, or systemic bias must be escalated to Legal Counsel within 24 hours.",
              ],
            },
          ],
        },
        {
          item: "Create success story repository for internal sharing",
          templateTitle: "AI Success Story Capture Template",
          templateType: "template",
          instructions: "Nothing drives adoption like a colleague's success story. Collect them systematically. Use them in all-hands, newsletters, and new employee onboarding.",
          sections: [
            {
              heading: "Success Story Collection Form",
              items: [
                "Contributor name: ___________________ | Department: ___________________ | Date: ___",
                "AI feature used: ___________________________",
                "What problem were you solving: ___________________________",
                "What did you do without AI (before): ___________________________",
                "What did you do with AI (after): ___________________________",
                "Quantified outcome (time saved / cost saved / quality improved): ___________________________",
                "Quote for use in communications: '___________________________'",
                "Permission to share publicly: ☐ Yes – with name  ☐ Yes – anonymised  ☐ No",
              ],
            },
            {
              heading: "Story Amplification Plan",
              items: [
                "Monthly all-hands: Feature 1 story (video testimonial if possible)",
                "Internal newsletter: 'AI Win of the Week' section",
                "New employee onboarding: 3 curated stories from relevant departments",
                "Board/Steering Committee: Quarterly compilation of ROI case stories",
                "Repository location: ___________________ | Owner: ___________________ | Review frequency: monthly",
              ],
            },
          ],
        },
        {
          item: "Run 30/60/90 day adoption review process",
          templateTitle: "30-60-90 Day AI Adoption Review Template",
          templateType: "template",
          instructions: "Structured reviews at 30, 60, and 90 days prevent the common problem of launching AI and then forgetting about adoption. Each review should produce specific actions.",
          sections: [
            {
              heading: "Day 30 Review (Activation Focus)",
              items: [
                "Adoption rate: ___% (target: ≥___% at day 30)",
                "Top barrier to activation identified: ___________________________",
                "Training completion rate: ___% (target: 100% of mandatory audience)",
                "Champion network effectiveness: ___ / 10 (from champion survey)",
                "Top 3 bugs/UX issues raised: 1) ___ 2) ___ 3) ___",
                "Day 30 actions: 1) ___ Owner: ___ By: ___ | 2) ___ Owner: ___ By: ___",
              ],
            },
            {
              heading: "Day 60 Review (Active Use Focus)",
              items: [
                "Weekly active users: ___% (target: ≥___% at day 60)",
                "KPI impact vs baseline: Primary KPI: ___ (was ___, target ___)",
                "User satisfaction score: ___ / 5 (from monthly survey)",
                "Departments lagging (below 40% adoption): ___________________ | Intervention plan: ___",
                "Day 60 actions: 1) ___ Owner: ___ By: ___ | 2) ___ Owner: ___ By: ___",
              ],
            },
            {
              heading: "Day 90 Review (Value Delivery Focus)",
              items: [
                "Sustained weekly active users: ___% (target: ≥___% at day 90)",
                "Full KPI measurement vs baseline: ___________________ | ROI to date: £/$ ___",
                "Recommendation: ☐ Scale to more users/use cases  ☐ Continue current programme  ☐ Intensive intervention needed",
                "Lessons for next AI rollout: ___________________________",
                "90-day review report to: ☐ AI Steering Committee  ☐ Board  ☐ Leadership team",
              ],
            },
          ],
        },
      ],
    },
    {
      title: "AI ROI Measurement Framework",
      level: "executive",
      desc: "Track and report business value of AI investments.",
      guidance: "Establish your ROI baseline before deployment - you can't measure what you didn't measure before. Mix hard metrics (revenue, cost, time) with soft metrics (quality, satisfaction). Track total cost of ownership.",
      checklist: [
        {
          item: "Define ROI baseline metrics before deployment",
          templateTitle: "Pre-Deployment Baseline Measurement Plan",
          templateType: "template",
          instructions: "Capture baselines within 4 weeks of go-live decision - not after launch. Without a baseline, ROI calculation is impossible and claims are unverifiable.",
          sections: [
            {
              heading: "Baseline Metrics to Capture",
              items: [
                "Process time: Average time to complete [task] today: ___ minutes | Method: time-and-motion study / system logs",
                "Error rate: Current [error/defect/rework] rate: ___% | Method: audit of last ___ months records",
                "Volume capacity: Current throughput: ___ units/day with ___ FTE | Method: operational data",
                "Cost: Current cost per [unit/transaction/case]: £/$ ___ | Method: finance data",
                "Customer metric: Current [NPS/CSAT/resolution time]: ___ | Method: CRM / survey data",
                "Capture date: ___ | Data range: ___ to ___ | Data owner: ___",
              ],
            },
            {
              heading: "Measurement Method",
              items: [
                "PREFERRED: A/B comparison - half users get AI, half continue without. Measure both groups simultaneously.",
                "ALTERNATIVE: Before/after - measure same group before launch and after. Account for seasonal variation.",
                "MINIMUM: Expert estimate - have domain experts estimate improvement with confidence ranges. Least reliable.",
                "Selected method: ___ | Rationale: ___ | Confidence level: H/M/L",
                "When will we first measure post-launch: ___ weeks after go-live | Full measurement at: ___ months",
              ],
            },
          ],
        },
        {
          item: "Identify direct cost savings and efficiency gains",
          templateTitle: "Cost Savings Quantification Worksheet",
          templateType: "worksheet",
          instructions: "Quantify savings conservatively - use the lower bound of your estimates for the business case. Executives who over-promise on AI ROI lose credibility for future investment requests.",
          sections: [
            {
              heading: "Time Savings → FTE Cost",
              items: [
                "Task automated: ___________________ | Time saved per instance: ___ minutes",
                "Instances per week: ___ | Total time saved per week: ___ hours",
                "Staff affected: ___ FTE | Average loaded cost per FTE: £/$ ___ /year",
                "Annual time savings value: ___ hours × (£/$ ___ / 2080) = £/$ ___ per year",
                "Is this time redirected to value-added work (benefit) or headcount reduction (saving): ___",
                "Conservative estimate (70% of calculated value): £/$ ___ per year",
              ],
            },
            {
              heading: "Error Reduction Savings",
              items: [
                "Current error rate: ___% | Expected error rate post-AI: ___%",
                "Cost per error (rework + remediation): £/$ ___",
                "Annual volume of transactions: ___ | Annual error cost today: £/$ ___",
                "Annual error cost post-AI: £/$ ___ | Annual saving: £/$ ___",
                "Other cost reductions (materials waste, compliance penalties avoided, etc.): £/$ ___",
                "Total direct cost savings (annual): £/$ ___",
              ],
            },
          ],
        },
        {
          item: "Quantify revenue impact and new value creation",
          templateTitle: "Revenue Impact Measurement Framework",
          templateType: "framework",
          instructions: "Revenue impact is harder to attribute than cost savings. Use controlled tests where possible. Be conservative - revenue attribution is contested in budget reviews.",
          sections: [
            {
              heading: "Revenue Impact Measurement",
              items: [
                "Revenue impact type: ☐ Conversion rate lift  ☐ Average order value lift  ☐ Retention rate improvement  ☐ New market/product enabled  ☐ Churn reduction",
                "Metric baseline: ___________________ | Post-AI metric: ___________________ | Change: ___%",
                "Revenue calculation: ___ lift × ___ total revenue base = £/$ ___ incremental revenue",
                "Attribution method: ☐ A/B test (most robust)  ☐ Regression analysis  ☐ Expert estimate",
                "Confidence level: ☐ High (A/B confirmed)  ☐ Medium  ☐ Low (estimate only)",
              ],
            },
            {
              heading: "New Value Creation",
              items: [
                "New capability enabled by AI (was previously impossible): ___________________________",
                "Revenue or strategic value of this capability: £/$ ___ | Method of valuation: ___",
                "Total revenue impact (conservative): £/$ ___ per year",
                "Key assumption for board review: ___________________________",
              ],
            },
          ],
        },
        {
          item: "Track total cost of ownership (build + run + maintain)",
          templateTitle: "AI Total Cost of Ownership Calculator",
          templateType: "worksheet",
          instructions: "TCO over 3 years is the right comparison for AI investment decisions - not just year 1 build cost. Include hidden costs: model maintenance, retraining, and change management.",
          sections: [
            {
              heading: "3-Year Cost Summary",
              items: [
                "BUILD COSTS (Year 1): Discovery: £/$ ___ | Data prep: £/$ ___ | Development: £/$ ___ | Integration: £/$ ___ | Testing: £/$ ___ | Change management: £/$ ___ | Total build: £/$ ___",
                "RUN COSTS (annual): Cloud/infrastructure: £/$ ___ | External API/vendor: £/$ ___ | Monitoring tools: £/$ ___ | Support/maintenance: £/$ ___ | Annual run total: £/$ ___",
                "PEOPLE COSTS (annual): ML Engineer (% of time): £/$ ___ | Data Engineer: £/$ ___ | PM: £/$ ___ | Total people: £/$ ___",
                "PERIODIC COSTS: Model retraining (quarterly): £/$ ___ × 4 | Annual audit: £/$ ___ | Training refresh: £/$ ___",
                "Year 1 total: £/$ ___ | Year 2 total: £/$ ___ | Year 3 total: £/$ ___ | 3-YEAR TCO: £/$ ___",
              ],
            },
            {
              heading: "ROI Summary",
              items: [
                "3-year total benefit (cost savings + revenue): £/$ ___",
                "3-year TCO: £/$ ___",
                "3-year net value: £/$ ___",
                "Payback period: ___ months",
                "3-year ROI: ___% | Simple IRR: ___%",
                "Break-even scenario (minimum benefit needed to break even): £/$ ___ per year",
              ],
            },
          ],
        },
        {
          item: "Create executive AI value dashboard",
          templateTitle: "AI Executive Dashboard Specification",
          templateType: "template",
          instructions: "The executive dashboard should show value delivered, not technical metrics. Executives don't care about model accuracy - they care about business outcomes and costs.",
          sections: [
            {
              heading: "Dashboard KPIs (Top of Page - at-a-glance)",
              items: [
                "ROI to date: £/$ ___ | Target: £/$ ___ | Status: ☐ On track  ☐ At risk  ☐ Ahead",
                "Cost savings YTD: £/$ ___ vs target £/$ ___",
                "Revenue impact YTD: £/$ ___ vs target £/$ ___",
                "Total AI investment YTD: £/$ ___ | % of approved budget: ___%",
                "Active AI use cases in production: ___ | In pilot: ___ | In pipeline: ___",
                "AI adoption rate: ___% of target users actively using AI weekly",
              ],
            },
            {
              heading: "Dashboard Sections",
              items: [
                "Section 1: Financial summary (cost savings, revenue, TCO, 3-year projection)",
                "Section 2: Operational metrics (adoption, user satisfaction, model uptime/performance)",
                "Section 3: Risk indicators (incidents, bias flags, compliance status, vendor health)",
                "Section 4: Portfolio (use case pipeline, upcoming launches, decisions needed)",
                "Update frequency: Monthly | Owner: ___ | Distribution: AI Steering Committee",
              ],
            },
          ],
        },
        {
          item: "Define ROI reporting cadence to leadership",
          templateTitle: "AI ROI Report Template",
          templateType: "template",
          instructions: "Quarterly ROI reports to leadership create accountability and justify continued investment. Use this template - keep it to 2 pages maximum.",
          sections: [
            {
              heading: "Quarterly ROI Report Structure",
              items: [
                "PAGE 1 - EXECUTIVE SUMMARY: Total value delivered YTD | Vs target | Top 3 wins | Top 3 risks | Recommendation",
                "PAGE 2 - FINANCIAL DETAIL: Cost savings (by use case) | Revenue impact | Investment spent | Net value | Quarterly trend",
                "PAGE 2 - PORTFOLIO STATUS: Each active use case RAG status | Upcoming launches | Decision requests",
                "APPENDIX (optional): Methodology notes | Use case deep-dives | Case study testimonials",
                "Distribution: Board (summary only) | AI Steering (full) | Finance (financial pages)",
              ],
            },
            {
              heading: "ROI Report Table Template",
              items: [
                "Use Case | Status | Investment YTD | Benefit YTD | Net Value | KPI vs Target | Next Milestone",
                "Use Case 1: ___ | ☐ Live  ☐ Pilot  ☐ Paused | £/$ ___ | £/$ ___ | £/$ ___ | ___% | ___",
                "Use Case 2: ___ | ___ | £/$ ___ | £/$ ___ | £/$ ___ | ___% | ___",
                "TOTAL: - | - | £/$ ___ | £/$ ___ | £/$ ___ | - | -",
              ],
            },
          ],
        },
        {
          item: "Establish comparison methodology (A/B or before-after)",
          templateTitle: "A/B vs Before-After Methodology Selection Guide",
          templateType: "template",
          instructions: "Choose your comparison method based on your ability to control the experiment. A/B is more reliable but requires simultaneous comparison groups. Before-after is easier but subject to seasonal/external confounds.",
          sections: [
            {
              heading: "Method Selection Decision Tree",
              items: [
                "Can you randomly assign users to AI vs no-AI groups simultaneously? → YES: Use A/B Test (most reliable)",
                "Can you identify a control group that doesn't use AI naturally? → YES: Use Quasi-experimental (difference-in-differences)",
                "Is historical data clean enough for comparison? → YES: Use Before-After with seasonality adjustment",
                "None of the above? → Use expert estimation with confidence intervals (least reliable; acceptable for early pilots)",
                "Selected method for this use case: ___________________ | Rationale: ___",
              ],
            },
            {
              heading: "Measurement Validity Checklist",
              items: [
                "Sample size sufficient for statistical significance: ☐ Yes - calculated: ___ per group  ☐ Not yet - use power calculator",
                "Measurement period long enough to capture seasonal variation: ☐ Yes  ☐ No - risk: ___",
                "External confounds identified and accounted for: ☐ Yes: ___  ☐ No - risk: ___",
                "Attribution: Can we isolate AI contribution from other simultaneous changes: ☐ Yes  ☐ Partially  ☐ No",
                "Measurement reviewed by Finance: ☐ Yes  ☐ No",
              ],
            },
          ],
        },
      ],
    },
    {
      title: "Responsible AI & Bias Testing Playbook",
      level: "practitioner",
      desc: "Detect, measure, and mitigate bias before and after deployment.",
      guidance: "Bias in AI is not a theoretical risk — it causes real harm to real people and exposes organisations to regulatory liability. Test every model against protected characteristics before go-live, monitor continuously at scale, and document your methodology. A model that passes bias checks at launch can drift into unfairness within months as input distributions shift.",
      checklist: [
        {
          item: "Define fairness criteria and protected attributes",
          templateTitle: "Fairness Criteria Definition Worksheet",
          templateType: "worksheet",
          instructions: "Agree fairness definitions with Legal, HR, and business before any bias testing begins. Different fairness metrics are mathematically incompatible — you must choose which matters most for your context. Document the rationale so it is auditable.",
          sections: [
            {
              heading: "Protected Attributes in Scope",
              items: [
                "Legally protected attributes applicable to this use case: ☐ Age  ☐ Sex/Gender  ☐ Race/Ethnicity  ☐ Disability  ☐ Religion  ☐ Pregnancy  ☐ Sexual orientation  ☐ Other: ___",
                "Proxy variables to test (correlated with protected attributes): ___________________________",
                "Data source for attribute labels (for testing): ☐ Self-reported  ☐ Inferred (note risk)  ☐ Not available — use proxies",
                "Legal counsel sign-off on attribute use in testing: ☐ Yes  ☐ Pending  ☐ Not required",
              ],
            },
            {
              heading: "Fairness Metric Selection",
              items: [
                "DEMOGRAPHIC PARITY: Positive outcome rate equal across groups — Use when: equal representation is required regardless of underlying differences",
                "EQUALISED ODDS: Equal true positive and false positive rates across groups — Use when: both missing true positives and wrongly flagging negatives are harmful",
                "PREDICTIVE PARITY: Equal precision (PPV) across groups — Use when: cost of a false positive is equal across groups",
                "INDIVIDUAL FAIRNESS: Similar individuals receive similar predictions — Use when: discrimination against specific people is the primary concern",
                "Selected primary metric: ___________________ | Rationale approved by: ___ | Date: ___",
                "Acceptable maximum disparity threshold: ___% difference between best and worst group | Basis: ___",
              ],
            },
            {
              heading: "Use Case Risk Classification",
              items: [
                "Outcome type: ☐ Binary (approve/reject)  ☐ Score/ranking  ☐ Content recommendation  ☐ Classification  ☐ Other: ___",
                "Stakes if biased outcome: ☐ Employment  ☐ Credit/finance  ☐ Healthcare  ☐ Education  ☐ Housing  ☐ Low-stakes (content/internal)",
                "EU AI Act risk classification: ☐ High-risk (Annex III)  ☐ Limited risk  ☐ Minimal risk",
                "Magnitude of harm if bias not caught: ___ (describe worst-case scenario)",
                "Frequency of decisions: ___ per day — scale amplifies any bias; flag if >100 decisions/day",
              ],
            },
          ],
        },
        {
          item: "Audit training data for representation and labelling bias",
          templateTitle: "Training Data Bias Audit Template",
          templateType: "template",
          instructions: "Bias baked into training data produces biased models. Audit before training, not after. Labelling bias (human annotators' prejudices encoded as ground truth) is especially insidious because it is invisible in standard data quality checks.",
          sections: [
            {
              heading: "Representation Audit",
              items: [
                "Total training records: ___ | Date range: ___ to ___",
                "Group distribution for each protected attribute (fill in %):",
                "  Age: <25 ___% | 25–44 ___% | 45–64 ___% | 65+ ___%",
                "  Gender: Male ___% | Female ___% | Non-binary/other ___% | Unknown ___%",
                "  Ethnicity: ___________________________ (list groups and %)",
                "  Disability status: Disclosed disabled ___% | Not disabled ___% | Unknown ___%",
                "Under-represented groups (any group <5% of training data): ___________________________",
                "Action for under-representation: ☐ Oversample minority  ☐ Collect more data  ☐ Use synthetic augmentation  ☐ Accept with documented risk",
              ],
            },
            {
              heading: "Label Quality Audit",
              items: [
                "Were labels created by humans: ☐ Yes — audit for inter-annotator agreement  ☐ No — skip this section",
                "Inter-annotator agreement score (Cohen's Kappa or Fleiss Kappa): ___  Acceptable threshold: >0.7",
                "Labels reviewed for consistency across demographic groups: ☐ Yes  ☐ No — required before training",
                "Historical bias risk: Do labels reflect past human decisions that were themselves biased: ☐ Yes — document and weight accordingly  ☐ No  ☐ Unknown",
                "Label audit completed by: ___ | Date: ___ | Findings: ___",
              ],
            },
            {
              heading: "Feature Selection Review",
              items: [
                "Features directly encoding protected attributes: List and justify inclusion or exclusion: ___________________________",
                "Proxy features identified (e.g., postcode, school name, surname as proxies for race): ___________________________",
                "Decision on proxy features: ☐ Remove all proxies  ☐ Keep with documented justification and legal sign-off  ☐ Test impact before deciding",
                "Causal graph reviewed to identify spurious correlations: ☐ Yes  ☐ No — add to pre-training checklist",
                "Feature audit sign-off: Data Scientist ___ | Legal ___ | Date ___",
              ],
            },
          ],
        },
        {
          item: "Run pre-deployment bias testing suite",
          templateTitle: "Pre-Deployment Bias Testing Report",
          templateType: "scorecard",
          instructions: "Run all tests on a held-out test set that reflects real-world deployment distribution — not the training distribution. Use tools such as Fairlearn, IBM AI Fairness 360, or Google What-If Tool. Document every result. No model should be deployed with a known bias disparity above your agreed threshold without explicit sign-off.",
          sections: [
            {
              heading: "Disparate Impact Tests",
              items: [
                "Test 1 — Demographic parity difference (positive rate gap): ___ | Threshold: ≤0.1 | ☐ Pass  ☐ Fail",
                "Test 2 — Equalised odds difference (TPR gap): ___ | Threshold: ≤0.1 | ☐ Pass  ☐ Fail",
                "Test 3 — Equalised odds difference (FPR gap): ___ | Threshold: ≤0.1 | ☐ Pass  ☐ Fail",
                "Test 4 — Predictive parity (PPV gap): ___ | Threshold: ≤0.1 | ☐ Pass  ☐ Fail",
                "Test 5 — Disparate impact ratio (adverse impact rule): ___ | Threshold: ≥0.8 (80% rule) | ☐ Pass  ☐ Fail",
                "Overall test result: ☐ All pass — approve for deployment  ☐ Failures present — remediation required",
              ],
            },
            {
              heading: "Subgroup Performance Breakdown",
              items: [
                "Report accuracy / F1 / AUC per subgroup for each protected attribute:",
                "  Age groups: <25: ___ | 25–44: ___ | 45–64: ___ | 65+: ___",
                "  Gender: Male: ___ | Female: ___ | Non-binary: ___",
                "  Ethnicity subgroups: ___________________________ (list all)",
                "Worst-performing subgroup: ___________________ | Performance: ___ vs. overall: ___",
                "Is the worst-performing group a historically marginalised group: ☐ Yes — escalate  ☐ No",
                "Subgroup analysis reviewed by Responsible AI lead: ☐ Yes  ☐ Pending",
              ],
            },
            {
              heading: "Remediation Actions",
              items: [
                "If bias threshold exceeded — remediations attempted:",
                "  ☐ Resampling / reweighting training data for under-represented groups",
                "  ☐ Threshold adjustment per subgroup (with legal review)",
                "  ☐ Algorithm change (e.g., switch to fairness-constrained optimisation)",
                "  ☐ Feature removal (confirm no performance cliff before removing)",
                "  ☐ Collect additional representative training data",
                "Re-test after remediation: Date ___ | Results: ___ | Final disposition: ☐ Approved  ☐ Escalate to steering committee",
                "If deployed with known residual bias — documented exception: Owner ___ | Review date ___ | Human oversight mechanism: ___",
              ],
            },
          ],
        },
        {
          item: "Implement continuous fairness monitoring in production",
          templateTitle: "Production Fairness Monitoring Plan",
          templateType: "template",
          instructions: "Models drift. What is fair at launch can become unfair within months as real-world inputs shift. Wire fairness metrics into your MLOps monitoring dashboard alongside accuracy metrics. Set alerting thresholds and a clear escalation path.",
          sections: [
            {
              heading: "Monitoring Setup",
              items: [
                "Fairness monitoring tool: ☐ Fairlearn  ☐ Evidently AI  ☐ WhyLabs  ☐ Arize AI  ☐ Custom  ☐ Other: ___",
                "Metrics monitored in production: ___________________________",
                "Monitoring frequency: ☐ Real-time streaming  ☐ Daily batch  ☐ Weekly  ☐ Monthly",
                "Alert threshold for demographic parity drift: ___% change triggers review",
                "Dashboard link / location: ___________________________",
                "Who receives alerts: ___________________________",
              ],
            },
            {
              heading: "Escalation & Response Protocol",
              items: [
                "YELLOW alert (disparity approaching threshold): Notify ML lead + business owner | Auto-investigate root cause | No immediate action required",
                "RED alert (disparity exceeds threshold): Notify ML lead + Responsible AI lead + Executive Sponsor within 24 hrs",
                "RED response options: ☐ Increase human review rate  ☐ Roll back to previous model version  ☐ Suspend automated decisions pending review",
                "Mandatory review timeline after RED alert: ___ business days",
                "Escalation path to AI Steering Committee if RED alert not resolved within ___  days: ___",
              ],
            },
            {
              heading: "Quarterly Fairness Review",
              items: [
                "Quarterly fairness report covers: trend in all fairness metrics | subgroup performance breakdown | incident log | comparison to pre-deployment baseline",
                "Report prepared by: ___________________ | Reviewed by: Responsible AI Lead + Legal",
                "Report shared with: ☐ AI Steering Committee  ☐ Board Risk Committee  ☐ Regulator (if required)",
                "Annual external fairness audit required: ☐ Yes — provider: ___  ☐ No",
                "Next quarterly review date: ___ | Owner: ___",
              ],
            },
          ],
        },
        {
          item: "Document and publish AI transparency disclosure",
          templateTitle: "AI Transparency Disclosure Template",
          templateType: "template",
          instructions: "Transparency disclosures build public trust and meet emerging legal requirements (EU AI Act Article 13, UK ICO AI guidance). Write in plain language — aim for a reading age of 14. Avoid jargon. Have someone outside the team review it for clarity.",
          sections: [
            {
              heading: "Model Card (Internal Technical Record)",
              items: [
                "Model name and version: ___________________ | Date: ___",
                "Intended use: ___________________________",
                "Out-of-scope uses: ___________________________",
                "Training data description (without revealing confidential details): ___________________________",
                "Known limitations: ___________________________",
                "Bias testing results summary: ___________________________",
                "Performance metrics (overall + worst subgroup): ___________________________",
                "Human oversight mechanisms in place: ___________________________",
                "Model card owner: ___ | Review date: ___",
              ],
            },
            {
              heading: "Public / User-Facing Transparency Notice",
              items: [
                "Explain in plain language that AI is used and what for: ___________________________",
                "Describe what data is used and how it affects the outcome: ___________________________",
                "Explain right to human review / appeal (if applicable): ___________________________",
                "Contact for questions or complaints: ___________________________",
                "Plain language reviewed by: ___ | Date: ___",
                "Published at: ☐ Website privacy policy  ☐ Point of decision notice  ☐ App settings  ☐ Other: ___",
              ],
            },
          ],
        },
      ],
    },
    {
      title: "Data Pipeline & Feature Engineering Playbook",
      level: "practitioner",
      desc: "Build reliable, reproducible ML data pipelines from raw data to model-ready features.",
      guidance: "The majority of ML project time is spent on data — collecting, cleaning, transforming, and engineering features. A poorly designed data pipeline creates technical debt that multiplies as you scale. This playbook takes you from raw source data through a production-grade feature store, with reproducibility, data validation, and monitoring built in from day one.",
      checklist: [
        {
          item: "Audit and document all upstream data sources",
          templateTitle: "Data Source Inventory & Contract Template",
          templateType: "template",
          instructions: "Map every upstream data source your pipeline will consume. Capture schema, freshness SLA, owner, and known quality issues before writing a single line of pipeline code. Surprises here become production incidents later.",
          sections: [
            {
              heading: "Source Inventory Table",
              items: [
                "Source name | Type | Owner | Update frequency | Format | Access method | SLA | Known issues",
                "Example: orders_db | PostgreSQL | Data Eng | Real-time CDC | rows | Airbyte connector | <5 min lag | NULL product_id ~0.3%",
                "Example: product_events_s3 | Parquet files | Platform Eng | Hourly batch | Parquet | S3 SDK | <2 hr | Late arrivals up to 4 hr",
                "→ Add one row per source consumed by this pipeline",
              ],
            },
            {
              heading: "Data Contract per Source",
              items: [
                "Schema version and owner: ___________________________",
                "Breaking change notification process: ☐ Slack alert  ☐ Jira ticket  ☐ No formal process — flag as risk",
                "Schema drift handling strategy: ☐ Fail pipeline  ☐ Quarantine rows  ☐ Apply defaults  ☐ Alert only",
                "Upstream team contact for incidents: ___________________________",
                "Data SLA breach escalation path: ___________________________",
              ],
            },
            {
              heading: "Ingestion Risk Assessment",
              items: [
                "Sources with no SLA or owner: ___ — action: establish contact before pipeline build",
                "Sources with known late-arrival patterns: ___ — action: add watermark tolerance of ___ hours",
                "Sources requiring PII handling: ___ — action: apply pseudonymisation at ingestion layer",
                "Sources prone to schema changes without notice: ___ — action: add schema validation gate at entry point",
              ],
            },
          ],
        },
        {
          item: "Design and implement data validation checks",
          templateTitle: "Pipeline Data Quality Gate Specification",
          templateType: "template",
          instructions: "Define explicit pass/fail quality gates at each pipeline stage. Never let bad data silently propagate to model training. Use Great Expectations, Soda, or dbt tests — the tool matters less than having gates at all.",
          sections: [
            {
              heading: "Validation Gate Locations",
              items: [
                "Gate 1 — At ingestion: raw source data before any transformation",
                "Gate 2 — Post-transformation: cleaned and joined data before feature engineering",
                "Gate 3 — Feature layer: final feature set before training data export",
                "Gate 4 — Training data: final train/val/test split before model consumption",
                "Validation tool selected: ☐ Great Expectations  ☐ Soda Core  ☐ dbt tests  ☐ Custom  ☐ Other: ___",
              ],
            },
            {
              heading: "Standard Checks per Gate (customise per use case)",
              items: [
                "NULL rate: ___ column must have null_rate < ___% — action on breach: ☐ Fail  ☐ Warn  ☐ Quarantine",
                "Row count: expect row count between ___ and ___ — deviation triggers: ___",
                "Value range: ___ column must be between ___ and ___ — outlier action: ___",
                "Referential integrity: ___ column must match ___ lookup — orphan action: ___",
                "Freshness: newest record in ___ must be less than ___ hours old — stale action: ___",
                "Uniqueness: ___ column(s) must be unique — duplicate action: ___",
              ],
            },
            {
              heading: "Breach Handling & Alerting",
              items: [
                "Hard failure (pipeline stops): criteria: ___________________________",
                "Soft warning (pipeline continues, alert sent): criteria: ___________________________",
                "Alert destination: ☐ Slack #data-alerts  ☐ PagerDuty  ☐ Email  ☐ Monitoring dashboard",
                "On-call owner for pipeline failures: ___________________ | Escalation: ___",
                "Quarantine bucket/table for failed records: ___________________________",
                "SLA for resolving hard failures: ___ hours | Owner: ___",
              ],
            },
          ],
        },
        {
          item: "Build reproducible feature engineering transforms",
          templateTitle: "Feature Engineering Specification Sheet",
          templateType: "template",
          instructions: "Document every feature transformation so it can be reproduced exactly at training time and inference time. The training–serving skew problem (different features at train vs. serve) is one of the most common sources of silent model degradation. This spec is your single source of truth.",
          sections: [
            {
              heading: "Feature Definition Table",
              items: [
                "Feature name | Source column(s) | Transform logic | Dtype | Range/cardinality | Null handling | Owner",
                "Example: user_purchase_count_30d | orders.user_id, orders.created_at | COUNT(*) WHERE created_at > NOW()-30d GROUP BY user_id | INT | 0–5000 | Fill 0 (new users) | DS: Jane",
                "Example: product_category_encoded | products.category | LabelEncoder fitted on train set — MUST use same fitted encoder at serve time | INT | 0–47 | Fill -1 (unknown) | DS: Jane",
                "→ Document all ___ features in this format before implementation",
              ],
            },
            {
              heading: "Training–Serving Parity Controls",
              items: [
                "Feature computation is identical at train and serve time: ☐ Verified  ☐ Not yet checked",
                "Fitted encoders/scalers serialised and versioned alongside model: ☐ Yes  ☐ No — action required",
                "Point-in-time correctness ensured (no future leakage): ☐ Yes  ☐ No — describe risk: ___",
                "Time-based features use UTC timestamps consistently: ☐ Yes  ☐ No",
                "Train/validation/test split method: ☐ Random  ☐ Time-ordered (recommended for time series)  ☐ Group-aware",
                "Data leakage review completed: ☐ Yes — reviewer: ___  ☐ No",
              ],
            },
            {
              heading: "Feature Importance & Pruning",
              items: [
                "Baseline feature importance run (SHAP / permutation importance): ☐ Yes  ☐ Pending",
                "Features with importance < threshold to drop: ___________________________",
                "Highly correlated feature pairs (r > 0.95) to de-duplicate: ___________________________",
                "Final feature count approved for training: ___",
                "Feature set sign-off: Data Scientist ___ | ML Engineer ___ | Date ___",
              ],
            },
          ],
        },
        {
          item: "Implement feature store or shared feature layer",
          templateTitle: "Feature Store Adoption Decision & Setup Checklist",
          templateType: "template",
          instructions: "A feature store centralises feature computation, enables sharing across teams, and eliminates training–serving skew at scale. Evaluate whether you need a dedicated feature store now or can start with a simpler shared feature table approach.",
          sections: [
            {
              heading: "Feature Store Need Assessment",
              items: [
                "Number of models sharing features: ___ — if >2, a feature store significantly reduces duplication",
                "Real-time serving latency requirement: ☐ <100ms (needs online store)  ☐ <1s  ☐ Batch only (offline store sufficient)",
                "Team size writing features: ___ — if >3 data scientists, governance becomes critical",
                "Decision: ☐ Dedicated feature store  ☐ Shared dbt feature tables  ☐ Per-project feature scripts (small scale only)",
              ],
            },
            {
              heading: "Feature Store Options",
              items: [
                "Feast (open source): ☐ Consider — good for offline+online, Kubernetes-native, free",
                "Hopsworks: ☐ Consider — managed option, strong governance, enterprise support",
                "Tecton: ☐ Consider — enterprise, real-time first, high cost",
                "Databricks Feature Store: ☐ Consider — if already on Databricks",
                "dbt + Snowflake/BigQuery materialised views: ☐ Consider — simplest, batch-only but often sufficient",
                "Selected approach: ___________________ | Rationale: ___",
              ],
            },
            {
              heading: "Feature Registration & Governance",
              items: [
                "Feature naming convention agreed: ☐ Yes — convention: ___  ☐ No — agree before first feature registered",
                "Feature description and owner required fields: ☐ Enforced  ☐ Recommended  ☐ Not required",
                "Stale feature detection: alert if feature not updated within ___ hours",
                "Feature deprecation process: ___ weeks notice + migration guide required",
                "Access control: ☐ All features open to all teams  ☐ ACL by feature group  ☐ Managed by platform team",
              ],
            },
          ],
        },
        {
          item: "Set up pipeline orchestration and scheduling",
          templateTitle: "Pipeline Orchestration Setup Checklist",
          templateType: "template",
          instructions: "Choose an orchestration framework and set up dependency management, scheduling, retry logic, and alerting. Ad-hoc scripts run manually are not production pipelines.",
          sections: [
            {
              heading: "Orchestration Tool Selection",
              items: [
                "Apache Airflow: ☐ Consider — most widely adopted, rich operator ecosystem, self-hosted complexity",
                "Prefect: ☐ Consider — Python-native, easier setup than Airflow, cloud managed option",
                "Dagster: ☐ Consider — asset-centric model, excellent observability, modern DX",
                "Mage: ☐ Consider — lower barrier to entry, good for smaller teams",
                "Cloud-native (Step Functions / Cloud Composer / Dataflow): ☐ Consider — if deep in a single cloud",
                "Selected tool: ___________________ | Rationale: ___________________ | Managed or self-hosted: ___",
              ],
            },
            {
              heading: "Pipeline Configuration Standards",
              items: [
                "All pipeline code in version control: ☐ Yes  ☐ No — required before production",
                "DAG / flow definitions reviewed in PR before merge: ☐ Yes  ☐ No",
                "Retry policy: max ___ retries | backoff: ___ min exponential | alert after ___ failures",
                "Timeout per task: ___ min | timeout per full run: ___ min",
                "Pipeline run concurrency limit: ___",
                "Backfill strategy for missed runs: ☐ Auto-backfill  ☐ Manual trigger  ☐ Skip",
              ],
            },
            {
              heading: "Monitoring & SLA Enforcement",
              items: [
                "Pipeline SLA (must complete by): ___ daily / ___ for each run",
                "SLA miss alert destination: ___________________________",
                "Dashboard for pipeline health: ☐ Airflow UI  ☐ Grafana  ☐ Datadog  ☐ Other: ___",
                "Runbook for each pipeline failure mode: ☐ Written  ☐ In progress  ☐ Not yet",
                "On-call rotation covering pipeline failures: ☐ Yes  ☐ No — assign owner before go-live",
              ],
            },
          ],
        },
        {
          item: "Document pipeline lineage and create data dictionary",
          templateTitle: "Pipeline Lineage & Data Dictionary Template",
          templateType: "template",
          instructions: "Lineage tracks where data comes from and what transforms it. A data dictionary defines what every field means. Both are essential for debugging, compliance, and onboarding new team members. Many organisations skip this until a production incident forces them to rebuild it under pressure.",
          sections: [
            {
              heading: "Lineage Diagram",
              items: [
                "Source systems → ingestion layer → raw zone → transformation layer → feature layer → model input",
                "Lineage documentation tool: ☐ OpenLineage / Marquez  ☐ dbt lineage graph  ☐ DataHub  ☐ Atlan  ☐ Manual diagram  ☐ Other: ___",
                "Every transformation step has: named owner ☐ | version ☐ | description ☐ | last-updated timestamp ☐",
                "Impact analysis: can we trace which models are affected by a source schema change: ☐ Yes  ☐ No — gap",
              ],
            },
            {
              heading: "Data Dictionary (per key table/feature set)",
              items: [
                "Field name | Business definition | Data type | Example values | Null allowed | Source | Last updated",
                "Example: user_lifetime_value_usd | Total revenue attributed to user since first order in USD | FLOAT | 0.0–50000.0 | No (fill 0.0) | orders table | 2025-01-15",
                "→ Complete one row per feature/column in the training dataset",
                "Data dictionary owner: ___________________ | Review cadence: ☐ With each model version  ☐ Quarterly  ☐ Ad-hoc",
                "Data dictionary location: ___________________________",
              ],
            },
            {
              heading: "Compliance & Audit Trail",
              items: [
                "PII fields identified and documented: ☐ Yes  ☐ No — required for GDPR compliance",
                "Data retention period per dataset documented: ☐ Yes  ☐ No",
                "Training data snapshot archived for audit/reproduction: ☐ Yes — location: ___  ☐ No",
                "Lineage documentation reviewed by DPO: ☐ Yes  ☐ No  ☐ Not required",
                "Last full lineage audit date: ___  | Next scheduled: ___",
              ],
            },
          ],
        },
      ],
    },
  ],
};
