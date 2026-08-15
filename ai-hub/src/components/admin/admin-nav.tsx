import { BarChart3, Users, ShieldAlert } from "lucide-react";

const TABS = [
  { id: "analytics", label: "Site Analytics", href: "/admin/analytics", icon: BarChart3 },
  { id: "users", label: "User Analytics", href: "/admin/users", icon: Users },
  { id: "gdpr", label: "GDPR / Data", href: "/admin/gdpr", icon: ShieldAlert },
];

/**
 * Unified admin console tab bar. Rendered on every /admin screen so all
 * tools are reachable from one place. Preserves the admin key across tabs.
 * Plain component (no hooks) so it works in both server and client pages.
 */
export function AdminNav({ active, adminKey }: { active: string; adminKey: string }) {
  const key = encodeURIComponent(adminKey);
  return (
    <div className="border-b border-white/8 px-6" style={{ background: "hsl(222 47% 5%)" }}>
      <div className="flex items-center gap-1 max-w-7xl mx-auto -mb-px overflow-x-auto">
        {TABS.map((t) => {
          const isActive = active === t.id;
          return (
            <a
              key={t.id}
              href={`${t.href}?key=${key}`}
              className={`inline-flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                isActive
                  ? "border-violet-500 text-white"
                  : "border-transparent text-white/45 hover:text-white/80"
              }`}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
