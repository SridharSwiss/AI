import React from "react";
import Link from "next/link";
import { Brain, Globe, X, Link2, ExternalLink } from "lucide-react";

const footerLinks = {
  Explore: [
    { label: "AI Tools Directory", href: "/tools" },
    { label: "Companies", href: "/companies" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Resource Library", href: "/resource-library" },
  ],
  Learn: [
    { label: "Beginner Guides", href: "/learn?level=beginner" },
    { label: "Certifications", href: "/learn?type=certification" },
    { label: "YouTube Guides", href: "/learn?type=youtube" },
    { label: "Code & Repos", href: "/learn?type=code" },
  ],
  Governance: [
    { label: "EU AI Act", href: "/compliance/eu-ai-act" },
    { label: "NIST AI RMF", href: "/compliance/nist-ai-rmf" },
    { label: "ISO 42001", href: "/compliance/iso-42001" },
    { label: "GDPR & AI", href: "/compliance/gdpr" },
  ],
  Toolkit: [
    { label: "Consulting Toolkit", href: "/consulting-toolkit" },
    { label: "Implementation Playbooks", href: "/consulting-toolkit/playbooks" },
    { label: "AI Assessment", href: "/consulting-toolkit/assess" },
    { label: "Pilot Templates", href: "/consulting-toolkit/pilot" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg">
                AI<span className="gradient-text">Hub</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              The all-in-one AI knowledge platform for everyone — from curious
              beginners to C-suite executives navigating the AI landscape.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-8 h-8 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border/80 transition-colors"
                aria-label="X (Twitter)"
              >
                <X className="w-3.5 h-3.5" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border/80 transition-colors"
                aria-label="LinkedIn"
              >
                <Link2 className="w-3.5 h-3.5" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border/80 transition-colors"
                aria-label="Website"
              >
                <Globe className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-sm mb-4">{category}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2025 AIHub. Content is curated for educational purposes. Always verify information with official sources.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/contribute" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Contribute
            </Link>
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
