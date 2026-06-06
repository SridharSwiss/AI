import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Providers } from "@/components/layout/providers";
import { NewsTicker } from "@/components/shared/news-ticker";
import { ConsentBanner } from "@/components/shared/consent-banner";
import { AnalyticsTracker } from "@/components/shared/analytics-tracker";

const BASE_URL = "https://sridhar-ai.ch";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: "%s | AIHub",
    default: "AIHub - The AI Knowledge Platform",
  },
  description:
    "Your all-in-one AI knowledge hub: tools, companies, learning resources, case studies, compliance guidance, and implementation playbooks - curated for everyone from beginners to executives.",
  keywords: [
    "AI tools", "artificial intelligence", "machine learning", "AI companies",
    "AI compliance", "AI governance", "AI learning", "AI case studies",
    "ChatGPT", "Claude", "Gemini", "LLM", "generative AI", "AI regulation",
    "EU AI Act", "GDPR", "AI implementation", "AI strategy",
  ],
  authors: [{ name: "AIHub", url: BASE_URL }],
  creator: "AIHub",
  publisher: "AIHub",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    siteName: "AIHub",
    title: "AIHub - The AI Knowledge Platform",
    description:
      "Your all-in-one AI knowledge hub: tools, companies, learning resources, case studies, compliance guidance, and implementation playbooks.",
    url: BASE_URL,
    locale: "en_US",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "AIHub - The AI Knowledge Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: {
      template: "%s | AIHub",
      default: "AIHub - The AI Knowledge Platform",
    },
    description:
      "Your all-in-one AI knowledge hub: tools, companies, learning resources, case studies, compliance guidance, and implementation playbooks.",
    images: [`${BASE_URL}/og-image.png`],
    creator: "@AIHubSite",
    site: "@AIHubSite",
  },
  // Add your Google Search Console verification token here:
  // verification: { google: "YOUR_GSC_TOKEN" },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AIHub",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description:
    "AIHub is the all-in-one AI knowledge platform for tools, companies, compliance, learning resources, and implementation playbooks.",
  sameAs: [],
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AIHub",
  url: BASE_URL,
  description: "The AI Knowledge Platform - tools, companies, compliance, learning, case studies.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased dark`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme');if(!t||t==='"dark"'||t==='dark')document.documentElement.classList.add('dark');else if(t==='"light"'||t==='light')document.documentElement.classList.remove('dark');}catch(e){}})();` }} />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Providers>
          <AnalyticsTracker />
          <NewsTicker />
          <Navbar />
          <main className="flex-1 pt-24">{children}</main>
          <Footer />
          <ConsentBanner />
        </Providers>
      </body>
    </html>
  );
}
