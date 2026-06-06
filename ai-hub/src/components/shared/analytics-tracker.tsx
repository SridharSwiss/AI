"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { getConsent } from "./consent-banner";

/* ── helpers ─────────────────────────────────────── */

function uid() {
  return crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
}

function deviceType() {
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return "tablet";
  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) return "mobile";
  return "desktop";
}

function browserName() {
  const ua = navigator.userAgent;
  if (ua.includes("Edg/") || ua.includes("Edge")) return "Edge";
  if (ua.includes("OPR") || ua.includes("Opera")) return "Opera";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Chrome") && !ua.includes("Chromium")) return "Chrome";
  if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
  return "Other";
}

function osName() {
  const ua = navigator.userAgent;
  if (ua.includes("Windows")) return "Windows";
  if (ua.includes("Mac OS")) return "macOS";
  if (ua.includes("Android")) return "Android";
  if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
  if (ua.includes("Linux")) return "Linux";
  return "Other";
}

function referrerSource(ref: string, utmSource: string) {
  if (utmSource) return utmSource;
  if (!ref) return "Direct";
  try {
    const h = new URL(ref).hostname;
    if (h.includes("google")) return "Google";
    if (h.includes("bing")) return "Bing";
    if (h.includes("duckduckgo")) return "DuckDuckGo";
    if (h.includes("linkedin")) return "LinkedIn";
    if (h.includes("twitter") || h.includes("t.co") || h.includes("x.com")) return "Twitter/X";
    if (h.includes("facebook")) return "Facebook";
    if (h.includes("github")) return "GitHub";
    if (h.includes("reddit")) return "Reddit";
    return "Referral";
  } catch {
    return "Referral";
  }
}

function getUTM(param: string) {
  try {
    return new URLSearchParams(window.location.search).get(param) ?? "";
  } catch {
    return "";
  }
}

/* ── tracker ─────────────────────────────────────── */

export function AnalyticsTracker() {
  const pathname = usePathname();
  const sessionId = useRef<string | null>(null);
  const pageStarted = useRef<number>(Date.now());
  const prevPath = useRef<string | null>(null);
  const sessionStarted = useRef<number>(Date.now());

  function hasConsent() {
    return getConsent()?.analytics === true;
  }

  async function flushPageView(path: string, spent: number) {
    if (!sessionId.current || !hasConsent()) return;
    await fetch("/api/analytics/pageview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        session_id: sessionId.current,
        page_path: path,
        page_title: document.title,
        time_spent_secs: Math.round(spent / 1000),
      }),
      keepalive: true,
    }).catch(() => {});
  }

  async function updateSessionDuration() {
    if (!sessionId.current || !hasConsent()) return;
    const secs = Math.round((Date.now() - sessionStarted.current) / 1000);
    await fetch("/api/analytics/session", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId.current, session_duration_secs: secs }),
      keepalive: true,
    }).catch(() => {});
  }

  /* init session once */
  useEffect(() => {
    if (!hasConsent()) {
      // re-check when consent is given
      const handler = () => {
        if (hasConsent() && !sessionId.current) initSession();
      };
      window.addEventListener("aihub_consent_updated", handler);
      return () => window.removeEventListener("aihub_consent_updated", handler);
    }
    initSession();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function initSession() {
    const id = uid();
    sessionId.current = id;
    sessionStarted.current = Date.now();
    pageStarted.current = Date.now();

    const ref = document.referrer;
    await fetch("/api/analytics/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        session_id: id,
        device_type: deviceType(),
        browser: browserName(),
        os: osName(),
        referrer_source: referrerSource(ref, getUTM("utm_source")),
        referrer_url: ref || null,
        utm_source: getUTM("utm_source") || null,
        utm_medium: getUTM("utm_medium") || null,
        utm_campaign: getUTM("utm_campaign") || null,
      }),
    }).catch(() => {});
  }

  /* track page changes */
  useEffect(() => {
    if (!hasConsent()) return;
    const now = Date.now();
    if (prevPath.current && prevPath.current !== pathname) {
      const spent = now - pageStarted.current;
      flushPageView(prevPath.current, spent);
    }
    prevPath.current = pathname;
    pageStarted.current = now;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  /* flush on tab close */
  useEffect(() => {
    const handler = () => {
      if (!hasConsent()) return;
      if (prevPath.current) {
        flushPageView(prevPath.current, Date.now() - pageStarted.current);
      }
      updateSessionDuration();
    };
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") handler();
    });
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
