import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Providers } from "@/components/layout/providers";
import { NewsTicker } from "@/components/shared/news-ticker";
import { ClientOverlays } from "@/components/layout/client-overlays";
import { PageTransition } from "@/components/shared/page-transition";

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
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: "%s | AIHub",
    default: "AIHub — AI Tools, Companies & Compliance in One Place",
  },
  description:
    "AIHub is the world's most complete AI knowledge platform: compare 82+ AI tools, explore 33 companies, navigate EU AI Act compliance, and access structured learning paths — all in one place.",
  keywords: [
    "AI tools comparison", "artificial intelligence platform", "EU AI Act compliance",
    "AI companies database", "machine learning resources", "AI governance",
    "ChatGPT alternatives", "Claude AI", "Gemini", "LLM comparison",
    "generative AI tools", "AI regulation", "GDPR AI", "AI strategy",
    "AI implementation guide", "AI case studies", "NIST AI RMF",
  ],
  authors: [{ name: "AIHub", url: BASE_URL }],
  creator: "AIHub",
  publisher: "AIHub",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
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
    title: "AIHub — AI Tools, Companies & Compliance in One Place",
    description:
      "Compare 82+ AI tools, explore AI companies, navigate EU AI Act compliance, and access learning paths — all curated in one platform.",
    url: BASE_URL,
    locale: "en_US",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "AIHub — The AI Knowledge Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: {
      template: "%s | AIHub",
      default: "AIHub — AI Tools, Companies & Compliance in One Place",
    },
    description:
      "Compare 82+ AI tools, explore AI companies, navigate EU AI Act compliance, and access learning paths — all in one platform.",
    images: [`${BASE_URL}/og-image.png`],
    creator: "@AIHubSite",
    site: "@AIHubSite",
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AIHub",
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/icon.svg`,
    width: 32,
    height: 32,
  },
  description:
    "AIHub is the world's most complete AI knowledge platform: 82+ tools, 33 companies, EU AI Act compliance guides, structured learning paths, and consulting playbooks.",
  foundingDate: "2024",
  sameAs: [
    "https://www.linkedin.com/company/aihub",
  ],
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
  alternateName: "AIHub — The AI Knowledge Platform",
  url: BASE_URL,
  description: "Compare AI tools, explore companies, navigate EU AI Act compliance, and access learning resources — all in one platform.",
  inLanguage: "en",
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
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme');if(!t||t==='"dark"'||t==='dark')document.documentElement.classList.add('dark');else if(t==='"light"'||t==='light')document.documentElement.classList.remove('dark');}catch(e){}})();` }} />
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="AIHub" />
        <meta name="theme-color" content="#09090B" />
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
          <ClientOverlays />
          <NewsTicker />
          <Navbar />
          <main className="flex-1 pt-24">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
