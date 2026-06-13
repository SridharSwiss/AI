import React from "react";
import Link from "next/link";
import { Brain, Globe, Link2 } from "lucide-react";

const footerLinks = {
  Explore: [
    { label: "AI Tools Directory", href: "/tools" },
    { label: "Companies",          href: "/companies" },
    { label: "Case Studies",       href: "/case-studies" },
    { label: "Resource Library",   href: "/resource-library" },
  ],
  Learn: [
    { label: "Beginner Guides",    href: "/learn#beginner" },
    { label: "Certifications",     href: "/learn#certifications" },
    { label: "YouTube Guides",     href: "/learn#youtube" },
    { label: "All Resources",      href: "/learn" },
  ],
  Governance: [
    { label: "EU AI Act",          href: "/compliance/eu-ai-act" },
    { label: "NIST AI RMF",        href: "/compliance/nist-ai-rmf" },
    { label: "ISO 42001",          href: "/compliance/iso-42001" },
    { label: "GDPR & AI",          href: "/compliance/gdpr-ai" },
  ],
  Toolkit: [
    { label: "Consulting Toolkit", href: "/consulting-toolkit" },
    { label: "Implementation",     href: "/consulting-toolkit?tab=assess" },
    { label: "AI Assessment",      href: "/consulting-toolkit?tab=assess" },
    { label: "Pilot Templates",    href: "/consulting-toolkit?tab=pilot" },
  ],
};

const socialLinks = [
  { href: "https://www.linkedin.com/in/ch-sgande/", label: "LinkedIn", icon: Link2 },
  { href: "https://sridhar-ai.ch", label: "Website", icon: Globe },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border/40 bg-muted/25 dark:bg-muted/10 overflow-hidden">
      {/* Gradient top accent */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="container-site py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-12">
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center shadow-sm group-hover:shadow-violet-500/30 transition-shadow duration-300">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight">AIHub</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xs">
              107 AI tools, 40 vendors, 31 case studies, and 17 compliance frameworks - hand-verified and updated weekly.
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-8 h-8 rounded-lg border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border hover:bg-accent transition-all duration-200">
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold mb-4 tracking-tight">{category}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} AIHub by Sridhar Gande. Curated for educational purposes - always verify with official sources.
          </p>
          <div className="flex items-center gap-5">
            {[{ label: "About", href: "/about" }, { label: "Contribute", href: "/contribute" }, { label: "Privacy", href: "/privacy" }, { label: "News", href: "/news" }].map(({ label, href }) => (
              <Link key={href} href={href} className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-150">{label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
