"use client";

import { useState } from "react";

function flagEmoji(alpha2: string) {
  return String.fromCodePoint(
    ...[...alpha2.toUpperCase()].map(c => 0x1f1e6 + c.charCodeAt(0) - 65)
  );
}

interface CountryData {
  country: string;
  country_code: string;
  count: number;
}

interface Props {
  data: CountryData[];
}

// Simplified equirectangular dots for major countries (cx, cy as % of 1000x500 viewBox)
// Generated from standard country centroids
const COUNTRY_DOTS: Record<string, [number, number]> = {
  AF:[660,185], AL:[530,155], DZ:[490,185], AO:[510,310], AR:[270,390],
  AU:[810,360], AT:[525,140], AZ:[590,160], BD:[700,195], BE:[490,130],
  BO:[270,325], BR:[295,310], BG:[545,150], CA:[170,115], CL:[255,370],
  CN:[735,175], CO:[235,270], HR:[530,148], CZ:[525,135], DK:[505,118],
  EC:[230,270], EG:[553,190], ET:[575,260], FI:[540,105], FR:[490,140],
  DE:[510,130], GH:[473,255], GR:[538,158], GT:[200,240], HU:[530,142],
  IN:[680,210], ID:[770,280], IR:[615,175], IQ:[590,170], IE:[472,125],
  IL:[565,180], IT:[520,152], JP:[800,165], JO:[567,178], KZ:[640,145],
  KE:[570,280], KP:[790,158], KR:[792,165], LA:[745,230], LB:[562,172],
  LY:[515,190], MX:[185,220], MN:[725,148], MA:[465,178], MZ:[557,330],
  MM:[730,215], NL:[497,127], NZ:[875,400], NG:[493,255], NO:[510,108],
  PK:[650,185], PE:[240,300], PH:[780,235], PL:[527,130], PT:[462,158],
  RO:[543,145], RU:[665,120], SA:[590,210], SN:[448,245], RS:[535,148],
  SK:[530,138], ZA:[525,375], ES:[478,155], LK:[693,230], SD:[555,240],
  SE:[520,108], CH:[505,140], SY:[571,170], TW:[778,200], TZ:[563,300],
  TH:[745,225], TN:[502,175], TR:[565,158], UA:[555,138], AE:[620,210],
  GB:[485,125], US:[175,165], UZ:[635,162], VE:[255,255], VN:[755,225],
  YE:[590,235], ZW:[543,335],
};

export function WorldMap({ data }: Props) {
  const [hovered, setHovered] = useState<string | null>(null);

  const countByCode: Record<string, CountryData> = {};
  for (const d of data) {
    if (d.country_code) countByCode[d.country_code.toUpperCase()] = d;
  }
  const max = Math.max(...data.map(d => d.count), 1);

  const hoveredEntry = hovered ? countByCode[hovered] : null;

  return (
    <div className="relative w-full select-none">
      {/* tooltip */}
      {hoveredEntry && (
        <div
          className="absolute top-2 left-1/2 -translate-x-1/2 z-10 px-3 py-1.5 rounded-lg text-xs font-medium text-white pointer-events-none"
          style={{ background: "hsl(222 47% 14%)", border: "1px solid rgba(255,255,255,0.12)" }}
        >
          {flagEmoji(hoveredEntry.country_code)} {hoveredEntry.country} — {hoveredEntry.count} session{hoveredEntry.count !== 1 ? "s" : ""}
        </div>
      )}

      <svg
        viewBox="0 0 1000 500"
        className="w-full h-auto"
        style={{ background: "rgba(139,92,246,0.04)", borderRadius: "0.75rem" }}
      >
        {/* grid lines */}
        {[0, 166, 333, 500, 666, 833, 1000].map(x => (
          <line key={`v${x}`} x1={x} y1={0} x2={x} y2={500} stroke="rgba(255,255,255,0.04)" strokeWidth={0.5} />
        ))}
        {[0, 125, 250, 375, 500].map(y => (
          <line key={`h${y}`} x1={0} y1={y} x2={1000} y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth={0.5} />
        ))}

        {/* country dots */}
        {Object.entries(COUNTRY_DOTS).map(([code, [cx, cy]]) => {
          const entry = countByCode[code];
          const isHovered = hovered === code;
          const hasData = !!entry;
          const intensity = hasData ? entry.count / max : 0;
          const r = hasData ? 4 + intensity * 8 : 3;
          const fill = hasData
            ? `rgba(139,92,246,${(0.4 + intensity * 0.6).toFixed(2)})`
            : "rgba(255,255,255,0.08)";

          return (
            <circle
              key={code}
              cx={cx}
              cy={cy}
              r={isHovered ? r + 3 : r}
              fill={isHovered ? "rgba(167,139,250,1)" : fill}
              stroke={isHovered ? "rgba(255,255,255,0.6)" : hasData ? "rgba(139,92,246,0.3)" : "none"}
              strokeWidth={isHovered ? 1.5 : 1}
              style={{ cursor: hasData ? "pointer" : "default", transition: "all 0.15s" }}
              onMouseEnter={() => hasData && setHovered(code)}
              onMouseLeave={() => setHovered(null)}
            />
          );
        })}

        {/* legend */}
        <text x={16} y={488} fill="rgba(255,255,255,0.2)" fontSize={9} fontFamily="monospace">
          ● Visitors  ○ No data
        </text>
      </svg>
    </div>
  );
}
