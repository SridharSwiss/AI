"use client";

import dynamic from "next/dynamic";

const ConsentBanner = dynamic(
  () => import("@/components/shared/consent-banner").then((m) => ({ default: m.ConsentBanner })),
  { ssr: false }
);

const AnalyticsTracker = dynamic(
  () => import("@/components/shared/analytics-tracker").then((m) => ({ default: m.AnalyticsTracker })),
  { ssr: false }
);

export function ClientOverlays() {
  return (
    <>
      <AnalyticsTracker />
      <ConsentBanner />
    </>
  );
}
