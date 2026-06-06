"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X, ShieldCheck, BarChart2 } from "lucide-react";

export type ConsentState = {
  analytics: boolean;
  decided: boolean;
  decidedAt: string;
};

const STORAGE_KEY = "aihub_consent";
const CONSENT_TTL_MS = 365 * 24 * 60 * 60 * 1000; // 12 months

export function getConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState & { ts: number };
    if (Date.now() - parsed.ts > CONSENT_TTL_MS) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function saveConsent(analytics: boolean) {
  const value = { analytics, decided: true, decidedAt: new Date().toISOString(), ts: Date.now() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  window.dispatchEvent(new Event("aihub_consent_updated"));
}

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const c = getConsent();
    if (!c?.decided) setVisible(true);
  }, []);

  const accept = () => { saveConsent(true); setVisible(false); };
  const decline = () => { saveConsent(false); setVisible(false); };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[500] p-3 sm:p-4 pointer-events-none">
      <div className="max-w-3xl mx-auto pointer-events-auto">
        <div className="rounded-2xl border border-border bg-card shadow-[0_8px_40px_rgba(0,0,0,0.18)] overflow-hidden">
          {/* top bar */}
          <div className="flex items-center gap-2 px-5 py-3 bg-muted/50 border-b border-border">
            <Cookie className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Privacy &amp; Analytics</span>
          </div>

          <div className="px-5 py-4">
            <p className="text-sm text-foreground leading-relaxed mb-1">
              We use <span className="font-semibold">privacy-respecting analytics</span> to understand how visitors use AIHub — no personal data, no cross-site tracking.
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              Collected: page paths, session duration, device type, traffic source. No cookies.{" "}
              <Link href="/privacy" className="underline hover:text-foreground transition-colors">Privacy policy</Link>
            </p>

            {showDetails && (
              <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="rounded-xl border border-border p-3 bg-muted/30">
                  <div className="flex items-center gap-2 mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-xs font-semibold">Essential (always on)</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Theme preference, consent choice. Required for the site to function.</p>
                </div>
                <div className="rounded-xl border border-border p-3 bg-muted/30">
                  <div className="flex items-center gap-2 mb-1">
                    <BarChart2 className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs font-semibold">Analytics (optional)</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Page views, session duration, traffic source. Stored in our private database — never sold or shared.</p>
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={accept}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                Accept analytics
              </button>
              <button
                onClick={decline}
                className="flex-1 sm:flex-none inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                Essential only
              </button>
              <button
                onClick={() => setShowDetails((v) => !v)}
                className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors ml-auto"
              >
                {showDetails ? "Hide details" : "What do we collect?"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
