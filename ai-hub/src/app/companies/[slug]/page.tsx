import { Metadata } from "next";
import { notFound } from "next/navigation";
import { companies } from "@/data/companies";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { ExternalLink, Building2, MapPin, Calendar, Users } from "lucide-react";

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

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
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
          </div>
          <p className="text-muted-foreground mb-3">{company.focus}</p>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              Founded {company.founded}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              {company.hq}
            </span>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About {company.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{company.description}</p>
            </CardContent>
          </Card>

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

          {company.notableModels && company.notableModels.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Notable AI Models</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {company.notableModels.map((model) => (
                    <Badge key={model} variant="purple">{model}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
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
              {company.funding && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Funding</p>
                  <p className="text-sm">{company.funding}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {company.keyPeople && company.keyPeople.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Key People
                  </span>
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

