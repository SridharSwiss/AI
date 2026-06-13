"use client";
import React from "react";

export function AuroraBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden>
      <div className="aurora-orb aurora-orb-1" />
      <div className="aurora-orb aurora-orb-2" />
      <div className="aurora-orb aurora-orb-3" />
      <div className="aurora-orb aurora-orb-4" />
      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-grid opacity-60" />
      {/* Mesh gradient layer */}
      <div className="absolute inset-0 mesh-gradient" />
      {/* Bottom fade to background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
    </div>
  );
}
