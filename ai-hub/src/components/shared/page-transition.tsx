"use client";

import React from "react";
import { usePathname } from "next/navigation";

/**
 * Wraps page content and replays an entrance animation on every route
 * change by keying the wrapper on the pathname. Keep the animation
 * lightweight (opacity + small lift) so navigation stays snappy.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="animate-page-in">
      {children}
    </div>
  );
}
