import { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "AIHub privacy policy - how we handle your data and protect your privacy.",
};

const sections = [
  {
    title: "Overview",
    content: `AIHub is a periodically updated, read-only knowledge platform. We do not require account creation, do not collect personal information, and do not sell or share user data with third parties. This privacy policy explains what minimal data is collected and how it is used.`,
  },
  {
    title: "Information We Collect",
    content: `We collect minimal anonymous data to understand how the platform is used:

• **Analytics**: We use privacy-respecting analytics to count page views and understand which sections are most useful. This data is aggregated and does not identify individual users.

• **Local Storage**: The News page stores a cache of fetched RSS articles in your browser's localStorage to reduce load times. This data never leaves your device and is not transmitted to our servers.

• **No Cookies for Tracking**: We do not use cookies for advertising or cross-site tracking purposes. The only browser storage used is functional (theme preference, news cache).`,
  },
  {
    title: "Third-Party Links",
    content: `AIHub links to external websites including tool websites, company pages, research papers, compliance documents, and learning resources. When you click an external link, you are subject to that website's privacy policy. We have no control over and assume no responsibility for the privacy practices of third-party sites.`,
  },
  {
    title: "RSS News Feeds",
    content: `The News page fetches article headlines from public RSS feeds via a server-side API route. These requests are made from our server infrastructure, not directly from your browser, so your IP address is not exposed to RSS feed providers. We do not log or store individual user news requests.`,
  },
  {
    title: "Dark Mode / Theme Preference",
    content: `Your theme preference (light or dark mode) is stored in your browser's localStorage. This data is not transmitted to any server and is used solely to remember your display preference between visits.`,
  },
  {
    title: "Hosting & Infrastructure",
    content: `AIHub is hosted on Vercel. Vercel may collect standard web server logs (IP addresses, request timestamps, user agents) as part of normal CDN and hosting operations. Please refer to Vercel's privacy policy at vercel.com/legal/privacy-policy for details on their data practices.`,
  },
  {
    title: "Children's Privacy",
    content: `AIHub is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided personal information through our platform, please contact us so we can take appropriate action.`,
  },
  {
    title: "Changes to This Policy",
    content: `We may update this privacy policy from time to time to reflect changes in our practices or legal requirements. The date of the most recent revision will be noted at the bottom of this page. Continued use of AIHub after changes are posted constitutes acceptance of the updated policy.`,
  },
  {
    title: "Contact",
    content: `If you have questions about this privacy policy or how your data is handled, please open an issue on our GitHub repository or reach out through the Contribute page.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description="We believe in privacy by design. AIHub collects minimal data and never sells or shares your information."
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-6 animate-fade-up">
          {sections.map((section) => (
            <section key={section.title} className="glass-card rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-3">{section.title}</h2>
              <div className="text-muted-foreground leading-relaxed text-sm space-y-2">
                {section.content.split("\n\n").map((para, i) => (
                  <p key={i} className="whitespace-pre-line">{para}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.06] text-xs text-muted-foreground">
          <p>Last updated: June 2026</p>
          <p className="mt-1">AIHub - Educational AI knowledge platform. Content provided for informational purposes only.</p>
        </div>
      </div>
    </>
  );
}
