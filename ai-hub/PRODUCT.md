# AIHub — Product Design Brief

## Core Audience

| Role | Primary Need | Behaviour |
|---|---|---|
| **Builder / Practitioner** | Find the right tool, understand pricing, compare APIs | Scans fast, needs data density, trusts specifics |
| **Manager / Decision-Maker** | ROI evidence, vendor comparison, implementation risk | Reads selectively, trusts citations and numbers |
| **Governance / Compliance officer** | Regulatory requirements, framework mapping, deadlines | Needs precision, hates ambiguity, reads footnotes |
| **Learner** | Structured entry point, free resources, progression path | Needs guidance, responds to clear hierarchy |

**Primary persona driving all layout decisions: the Builder.**  
They skim, compare, and act. Every screen must be scannable in under 8 seconds.

---

## Brand Voice

**Tone:** Clinical, precise, and direct. Data-first. Confident without marketing inflation.  
**Not:** "Discover, explore, curate, empower, revolutionize, transformative, all-in-one."  
**Yes:** Specific numbers. Named entities. Imperative or declarative sentences. No wasted words.

| Generic (delete) | Specific (use) |
|---|---|
| "Navigate AI with clarity & confidence" | "82 tools. 33 companies. 16 regulations." |
| "Curated and organized for you" | "Hand-verified. Updated weekly." |
| "All-in-one AI knowledge platform" | "The reference layer for the AI landscape." |
| "Real business value" | "31 case studies with measured ROI." |
| "Learning resources for every level" | "72 resources — beginner to production ML." |

---

## Design Principles

1. **High contrast over atmosphere.** Every border must be visible. No ghost dividers.
2. **Typography carries the hierarchy.** Size and weight, not color gradients or glows.
3. **Real icons, not letter initials.** Every tool and company gets a category-accurate icon.
4. **Subtract before you add.** Remove decorative blur orbs, noise overlays, and shimmer text first.
5. **Spatial rigour.** Use whitespace deliberately. Asymmetric spacing groups content — not nested boxes.
6. **Data over decoration.** Stats and metrics are the primary visual assets.

---

## Anti-Patterns to Eliminate (Audit Findings)

| Violation | Severity | Action |
|---|---|---|
| Animated gradient text on hero headline | HIGH | → Plain `font-black` heading, no gradient |
| Gradient text on "Hub" in logo/footer | HIGH | → Solid foreground color |
| Letter-only avatars (ToolAvatar, CompanyAvatar) | HIGH | → Category-mapped Lucide icons |
| `blur-[120px]` decorative orbs | HIGH | → Remove entirely |
| `.noise::after` SVG overlay | MEDIUM | → Remove entirely |
| `border-border/40` ghost borders | MEDIUM | → Minimum `border-border` (full opacity) |
| 37× generic violet/pink/blue gradients | MEDIUM | → Solid muted backgrounds + accent color |
| Orphaned stat cards (4+1, 4+2 layouts) | MEDIUM | → 3-col or 4-col complete rows |
| Uniform graduation cap icon on all learn types | MEDIUM | → Type-specific icons (YouTube, Book, Award) |
| Generic copy: "all-in-one", "curated" × 8+ | LOW | → Eliminate or replace with specifics |
| Emoji in featured section (💬🤖🎨⚡) | LOW | → Replace with Lucide category icons |
| Decorative dot grids on headers/footer | LOW | → Remove |

---

## Design System

### Typography
- **Display (h1 hero):** Geist Sans, 800 weight, -0.04em tracking, size 4rem–5rem
- **Headline (h1 interior):** Geist Sans, 700 weight, -0.03em tracking, size 2rem–2.5rem
- **Section title (h2):** Geist Sans, 600 weight, -0.02em tracking
- **Body:** Geist Sans, 400 weight, 1.6 line-height
- **Label / eyebrow:** Geist Sans, 600 weight, 0.1em tracking, uppercase, 0.7rem
- **Mono (code, data):** Geist Mono

### Color (revised)
```
--background:        hsl(0, 0%, 100%)          /* pure white */
--foreground:        hsl(222, 47%, 10%)         /* near-black slate */
--primary:           hsl(258, 85%, 42%)         /* darker, more precise violet */
--primary-fg:        hsl(0, 0%, 100%)
--muted:             hsl(220, 16%, 96%)         /* true light gray, not purple-tinted */
--muted-fg:          hsl(220, 10%, 44%)
--border:            hsl(220, 13%, 82%)         /* FULL OPACITY — always visible */
--card:              hsl(0, 0%, 100%)
--accent-amber:      hsl(38, 92%, 48%)          /* amber for featured/CTA accents */
--emerald:           hsl(152, 69%, 31%)         /* success / ROI metrics */
```

### Spacing scale (4px base)
4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96px

### Border treatment
- Cards: `border border-border` (full opacity) + `rounded-lg`
- Hover: `border-foreground/20` (slight darkening, not color shift)
- Active state: `border-primary` with `ring-2 ring-primary/20`

### Icon system
| Context | Icon source | Treatment |
|---|---|---|
| Tool category | Lucide (category-mapped) | 18px, text-foreground/60, in 36px muted rounded-lg |
| Company type | Lucide (type-mapped) | Same |
| Learn resource type | Lucide (YouTube/BookOpen/Award/Code2/GraduationCap) | Same |
| Navigation | Lucide | 16px, text-foreground/70 |
| Status / metric | Lucide | 14px inline |

---

## Category Icon Map

### Tools
| Category | Icon |
|---|---|
| Language Models | `MessageSquare` |
| Code Assistance | `Code2` |
| Image Generation | `ImageIcon` |
| Video Generation | `Video` |
| Voice & Audio | `Mic2` |
| Search & Research | `SearchCheck` |
| Infrastructure | `Server` |
| Frameworks | `Layers` |
| Platforms | `LayoutGrid` |
| APIs | `Zap` |
| Productivity | `Rocket` |
| Design | `Pen` |
| Data & Analytics | `BarChart2` |
| Customer Service | `Headphones` |

### Companies
| Focus | Icon |
|---|---|
| Foundation Models | `Brain` |
| AI Applications | `Sparkles` |
| Developer Tools | `Code2` |
| Research | `FlaskConical` |
| Enterprise AI | `Building2` |
| Autonomous Systems | `Bot` |
| Creative AI | `Palette` |
| AI Safety | `ShieldCheck` |

### Learn Resources
| Type | Icon |
|---|---|
| course | `GraduationCap` |
| youtube | `Youtube` |
| certification | `Award` |
| book | `BookOpen` |
| tutorial | `Code2` |
