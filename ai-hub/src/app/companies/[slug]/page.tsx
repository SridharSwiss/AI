import { Metadata } from "next";
import { notFound } from "next/navigation";
import { companies } from "@/data/companies";
import type { CompanyModel } from "@/data/companies";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import {
  ExternalLink, Building2, MapPin, Calendar, Users,
  TrendingUp, DollarSign, Cpu, GitBranch, Award, Clock,
} from "lucide-react";

export async function generateStaticParams() {
  return companies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const company = companies.find((c) => c.slug === slug);
  if (!company) return { title: "Company Not Found" };
  return {
    title: `${company.name} — AI Companies`,
    description: company.description.slice(0, 160),
  };
}

const modelTypeBadge: Record<string, string> = {
  LLM: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  Multimodal: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  Vision: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300",
  "Image Gen": "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
  "Video Gen": "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  Audio: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  Code: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  Embedding: "bg-slate-100 text-slate-700 dark:bg-slate-900/40 dark:text-slate-300",
  Reasoning: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  Scientific: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300",
  Hardware: "bg-zinc-100 text-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-300",
};

function ModelCard({ model }: { model: CompanyModel }) {
  return (
    <div className="p-4 rounded-xl border border-border bg-white dark:bg-zinc-900 space-y-3">
      <div className="flex items-start justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-sm">{model.name}</span>
          {model.openSource && (
            <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 font-medium">Open Source</span>
          )}
        </div>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${modelTypeBadge[model.type] ?? "bg-muted text-muted-foreground"}`}>
          {model.type}
        </span>
      </div>

      {model.description && (
        <p className="text-xs text-muted-foreground leading-relaxed">{model.description}</p>
      )}

      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
        {model.params && (
          <span className="flex items-center gap-1">
            <Cpu className="w-3 h-3" />{model.params}
          </span>
        )}
        {model.contextWindow && (
          <span className="flex items-center gap-1">
            <GitBranch className="w-3 h-3" />{model.contextWindow} ctx
          </span>
        )}
        {model.releaseDate && (
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />{model.releaseDate}
          </span>
        )}
      </div>

      {model.benchmarks && model.benchmarks.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Benchmarks</p>
          <div className="grid grid-cols-2 gap-1.5">
            {model.benchmarks.map((b) => (
              <div key={b.name} className="flex items-center justify-between bg-muted rounded-lg px-2.5 py-1.5">
                <span className="text-xs text-muted-foreground">{b.name}</span>
                <span className="text-xs font-bold text-foreground">{b.score}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default async function CompanyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const company = companies.find((c) => c.slug === slug);
  if (!company) notFound();

  const stageColor: Record<string, "green" | "blue" | "amber" | "purple"> = {
    Public: "green",
    Private: "blue",
    Nonprofit: "purple",
    "Research Lab": "amber",
  };

  const fin = company.financials;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumb
        items={[
          { label: "Companies", href: "/companies" },
          { label: company.name },
        ]}
        className="mb-8"
      />

      {/* Header */}
      <div className="flex items-start gap-6 mb-10">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/10 to-blue-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
          <Building2 className="w-8 h-8 text-violet-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap mb-2">
            <h1 className="text-3xl font-bold">{company.name}</h1>
            <Badge variant={stageColor[company.stage] ?? "blue"}>{company.stage}</Badge>
            {company.featured && <Badge variant="purple">Featured</Badge>}
            {fin?.stockSymbol && (
              <span className="text-xs px-2 py-1 rounded-lg bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 font-bold font-mono">
                {fin.stockSymbol}
              </span>
            )}
          </div>
          <p className="text-muted-foreground mb-3">{company.focus}</p>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />Founded {company.founded}</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{company.hq}</span>
            {(company.employees || fin?.employees) && (
              <span className="flex items-center gap-1.5"><Users className="w-4 h-4" />{company.employees || fin?.employees} employees</span>
            )}
          </div>
        </div>
        <a
          href={company.website}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex-shrink-0"
        >
          <ExternalLink className="w-4 h-4" />
          Website
        </a>
      </div>

      {/* Key financial stats bar */}
      {fin && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {fin.latestValuation && (
            <div className="p-3 rounded-xl border border-border bg-white dark:bg-zinc-900 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Valuation</p>
              <p className="text-sm font-bold text-violet-600">{fin.latestValuation}</p>
            </div>
          )}
          {fin.marketCap && (
            <div className="p-3 rounded-xl border border-border bg-white dark:bg-zinc-900 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Market Cap</p>
              <p className="text-sm font-bold text-green-600">{fin.marketCap}</p>
            </div>
          )}
          {(fin.totalFunding || company.funding) && (
            <div className="p-3 rounded-xl border border-border bg-white dark:bg-zinc-900 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Total Funding</p>
              <p className="text-sm font-bold text-blue-600">{fin.totalFunding ?? company.funding}</p>
            </div>
          )}
          {fin.revenue && (
            <div className="p-3 rounded-xl border border-border bg-white dark:bg-zinc-900 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Revenue</p>
              <p className="text-sm font-bold text-emerald-600">{fin.revenue}</p>
            </div>
          )}
          {fin.profitStatus && (
            <div className="p-3 rounded-xl border border-border bg-white dark:bg-zinc-900 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Profit Status</p>
              <p className="text-xs font-semibold">{fin.profitStatus}</p>
            </div>
          )}
          {fin.annualRevenueGrowth && (
            <div className="p-3 rounded-xl border border-border bg-white dark:bg-zinc-900 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Revenue Growth</p>
              <p className="text-sm font-bold text-orange-600">{fin.annualRevenueGrowth}</p>
            </div>
          )}
          {fin.employees && (
            <div className="p-3 rounded-xl border border-border bg-white dark:bg-zinc-900 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Employees</p>
              <p className="text-sm font-bold">{fin.employees}</p>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          {/* About */}
          <Card>
            <CardHeader>
              <CardTitle>About {company.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{company.description}</p>
            </CardContent>
          </Card>

          {/* History */}
          {company.history && (
            <Card>
              <CardHeader>
                <CardTitle>Company History</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{company.history}</p>
              </CardContent>
            </Card>
          )}

          {/* AI Models */}
          {company.models && company.models.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-violet-500" />
                  AI Models & Benchmarks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {company.models.map((model) => (
                    <ModelCard key={model.name} model={model} />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Milestones */}
          {company.milestones && company.milestones.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  Company Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
                  <ul className="space-y-4 pl-6">
                    {company.milestones.map((m, i) => (
                      <li key={i} className="relative">
                        <div className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full border-2 border-primary bg-background" />
                        <p className="text-xs text-primary font-semibold mb-0.5">{m.date}</p>
                        <p className="text-sm text-muted-foreground">{m.event}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Products */}
          <Card>
            <CardHeader>
              <CardTitle>Products & Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {company.products.map((product) => (
                  <span
                    key={product}
                    className="px-3 py-1.5 rounded-lg bg-muted text-sm text-muted-foreground border border-border"
                  >
                    {product}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Company Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Company Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Focus Area</p>
                <p className="text-sm">{company.focus}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Stage</p>
                <Badge variant={stageColor[company.stage] ?? "blue"}>{company.stage}</Badge>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Founded</p>
                <p className="text-sm">{company.founded}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Headquarters</p>
                <p className="text-sm">{company.hq}</p>
              </div>
              {(company.employees || fin?.employees) && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Employees</p>
                  <p className="text-sm">{company.employees || fin?.employees}</p>
                </div>
              )}
              {fin?.stockSymbol && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Stock Ticker</p>
                  <p className="text-sm font-bold font-mono text-green-600">{fin.stockSymbol}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Financials */}
          {fin && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-500" />
                  Financial Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {fin.totalFunding && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Total Funding</p>
                    <p className="text-sm font-semibold text-blue-600">{fin.totalFunding}</p>
                  </div>
                )}
                {fin.latestValuation && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Valuation</p>
                    <p className="text-sm font-semibold text-violet-600">{fin.latestValuation}</p>
                  </div>
                )}
                {fin.marketCap && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Market Cap</p>
                    <p className="text-sm font-semibold text-green-600">{fin.marketCap}</p>
                  </div>
                )}
                {fin.revenue && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
                      Revenue {fin.revenueYear && `(${fin.revenueYear})`}
                    </p>
                    <p className="text-sm font-semibold text-emerald-600">{fin.revenue}</p>
                  </div>
                )}
                {fin.profitStatus && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Profit Status</p>
                    <p className="text-sm">{fin.profitStatus}</p>
                  </div>
                )}
                {fin.annualRevenueGrowth && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Revenue Growth</p>
                    <p className="text-sm font-semibold text-orange-600 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />{fin.annualRevenueGrowth}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Funding Rounds */}
          {fin?.fundingRounds && fin.fundingRounds.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-500" />
                  Funding Rounds
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {fin.fundingRounds.map((r, i) => (
                    <li key={i} className="text-sm border-b border-border pb-3 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-foreground">{r.round}</span>
                        <span className="font-bold text-green-600">{r.amount}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{r.date}</span>
                        <span className="text-xs text-muted-foreground truncate max-w-[140px] text-right">{r.investors.slice(0, 2).join(", ")}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Key Investors */}
          {fin?.keyInvestors && fin.keyInvestors.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Key Investors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5">
                  {fin.keyInvestors.map((inv) => (
                    <span key={inv} className="text-xs px-2 py-1 rounded-lg bg-muted border border-border text-muted-foreground">
                      {inv}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Key People */}
          {company.keyPeople && company.keyPeople.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Key People
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {company.keyPeople.map((person) => (
                    <li key={person} className="text-sm text-muted-foreground">{person}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Competitors */}
          {company.competitors && company.competitors.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Competitive Landscape</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5">
                  {company.competitors.map((c) => (
                    <span key={c} className="text-xs px-2 py-1 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 text-red-700 dark:text-red-300">
                      {c}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1.5">
                {company.tags.map((tag) => (
                  <Badge key={tag} variant="purple" className="text-xs">{tag}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
