"use client";

import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import { useState } from "react";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// ISO 3166-1 numeric → alpha-2 mapping for the countries we're likely to see
// (world-atlas uses numeric codes; ip-api returns alpha-2)
const NUM_TO_ALPHA2: Record<string, string> = {
  "004":"AF","008":"AL","012":"DZ","024":"AO","032":"AR","036":"AU","040":"AT",
  "050":"BD","056":"BE","076":"BR","100":"BG","104":"MM","116":"KH","120":"CM",
  "124":"CA","144":"LK","152":"CL","156":"CN","170":"CO","191":"HR","192":"CU",
  "203":"CZ","208":"DK","818":"EG","233":"EE","231":"ET","246":"FI","250":"FR",
  "276":"DE","288":"GH","300":"GR","320":"GT","324":"GN","348":"HU","356":"IN",
  "360":"ID","364":"IR","368":"IQ","372":"IE","376":"IL","380":"IT","388":"JM",
  "392":"JP","400":"JO","398":"KZ","404":"KE","408":"KP","410":"KR","414":"KW",
  "418":"LA","422":"LB","504":"MA","484":"MX","496":"MN","528":"NL","554":"NZ",
  "566":"NG","578":"NO","586":"PK","591":"PA","604":"PE","608":"PH","616":"PL",
  "620":"PT","630":"PR","634":"QA","642":"RO","643":"RU","682":"SA","686":"SN",
  "703":"SK","705":"SI","706":"SO","710":"ZA","724":"ES","752":"SE","756":"CH",
  "760":"SY","764":"TH","788":"TN","792":"TR","804":"UA","784":"AE","826":"GB",
  "840":"US","858":"UY","860":"UZ","704":"VN","887":"YE","716":"ZW",
};

function flag(alpha2: string) {
  return String.fromCodePoint(
    ...[...alpha2.toUpperCase()].map(c => 0x1f1e6 + c.charCodeAt(0) - 65)
  );
}

interface Props {
  data: { country: string; country_code: string; count: number }[];
}

export function WorldMap({ data }: Props) {
  const [tooltip, setTooltip] = useState("");

  const countByAlpha2: Record<string, { country: string; count: number }> = {};
  for (const d of data) {
    if (d.country_code) countByAlpha2[d.country_code.toUpperCase()] = { country: d.country, count: d.count };
  }

  const max = Math.max(...data.map(d => d.count), 1);

  function getAlpha2(geo: { id?: string }): string | undefined {
    return geo.id ? NUM_TO_ALPHA2[geo.id] : undefined;
  }

  function getFill(geo: { id?: string }) {
    const a2 = getAlpha2(geo);
    if (!a2) return "rgba(255,255,255,0.06)";
    const entry = countByAlpha2[a2];
    if (!entry) return "rgba(255,255,255,0.06)";
    const intensity = entry.count / max;
    // violet scale: low → rgb(109,40,217)/0.25, high → rgb(139,92,246)
    const alpha = 0.2 + intensity * 0.8;
    return `rgba(139,92,246,${alpha.toFixed(2)})`;
  }

  return (
    <div className="w-full" style={{ background: "rgba(255,255,255,0.02)", borderRadius: "1rem", padding: "1rem" }}>
      <ComposableMap
        projection="geoNaturalEarth1"
        style={{ width: "100%", height: "auto" }}
        projectionConfig={{ scale: 140 }}
      >
        <ZoomableGroup zoom={1} center={[10, 20]}>
          <Geographies geography={GEO_URL}>
            {({ geographies }: { geographies: { rsmKey: string; id?: string }[] }) =>
              geographies.map((geo) => {
                const a2 = getAlpha2(geo);
                const entry = a2 ? countByAlpha2[a2] : undefined;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={getFill(geo)}
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth={0.4}
                    data-tooltip-id="map-tip"
                    data-tooltip-content={
                      entry ? `${a2 ? flag(a2) : "🌍"} ${entry.country}: ${entry.count} session${entry.count !== 1 ? "s" : ""}` : ""
                    }
                    style={{
                      default: { outline: "none" },
                      hover: { fill: entry ? "rgba(167,139,250,0.9)" : "rgba(255,255,255,0.12)", outline: "none", transition: "fill 0.15s" },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      <Tooltip
        id="map-tip"
        style={{ background: "hsl(222 47% 14%)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", fontSize: "12px", borderRadius: "8px" }}
      />
    </div>
  );
}
