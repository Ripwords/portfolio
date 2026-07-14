# Paper & Ink — Portfolio Redesign Spec

**Date:** 2026-07-14
**Branch:** `redesign/paper-and-ink`
**Status:** Approved for autonomous build

## 1. Goal

Revamp jjteoh.com from its current cosmic/nebula identity into a **premium editorial-Swiss identity ("Paper & Ink")** with a **standout, handcrafted shader + 3D experience**. The astrophotography content stays as a personal thread, but the space _aesthetic_ is fully retired.

The site must feel expensive through **typography, whitespace, restraint, and one decisive interactive shader** — not through glow, blur, and busy backgrounds.

## 2. Decisions (locked)

| Decision                 | Choice                                                                                                                                                                            |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Visual direction         | Paper & Ink — editorial Swiss, near-monochrome                                                                                                                                    |
| Modes                    | Dual: **Paper** (light) + **Ink** (dark), real toggle, follows OS, remembered, fallback Ink                                                                                       |
| Hero treatment           | **Type / Living panel split** — giant Space Grotesk type + tall cursor/scroll-reactive shader column                                                                              |
| Accent                   | **Clay `#cf6a4a`** (lifts to ~`#e08865` in Ink); the _only_ chromatic color                                                                                                       |
| Shader ambition          | **Signature + recurring** — one handcrafted GLSL flow-field hero shader, one interactive 3D "Instrument", lighter shader moments at dividers / project-card hover / astro gallery |
| Type                     | Space Grotesk (display), Geist (body), Geist Mono (labels). Playfair retired from primary use                                                                                     |
| Astro                    | Kept as content (`/astrophotography`), re-skinned                                                                                                                                 |
| Splash cursor            | Retired (reads gimmicky for editorial); cursor reactivity lives in the hero shader instead                                                                                        |
| Global cosmos background | Removed; replaced by flat Paper/Ink surface + subtle grain                                                                                                                        |

## 3. Color System

Rewrite `app/assets/css/main.css` token layer. Retire all `--nebula-*` tokens and the violet/cyan cosmic palette.

### Paper (`:root`, light)

- `--background: #efece4` (warm off-white)
- `--foreground: #141414` (near-black ink)
- `--card: #e6e2d8`, `--muted-foreground: ~#57534e` (warm gray, must pass AA on paper)
- `--border: #1a1a1a` at ~14% (hairline)
- `--primary` (clay): `#cf6a4a`, `--primary-foreground: #ffffff`

### Ink (`.dark`)

- `--background: #101216` (deep desaturated slate)
- `--foreground: #f2f4f8`
- `--card: #171a20`, `--muted-foreground: ~#aeb6c2`
- `--border: #ffffff` at ~10%
- `--primary` (clay, lifted): `#e08865`, `--primary-foreground: #0b0d11`
- Shader glow uses `--primary` in both modes.

All colors expressed in OKLCH (matching existing convention) with the hexes above as targets. **Both modes must pass WCAG AA** for body text and interactive elements — verified, not assumed.

## 4. Typography

- `--font-display: "Space Grotesk"` — used by `.heading`, `.display`, hero H1. Tight tracking `-0.045em`, weight 700 for hero / 600 for section heads.
- `--font-sans: "Geist"` — body.
- `--font-mono: "Geist Mono"` — eyebrows, metadata, nav labels, wide tracking `0.2em–0.28em`, uppercase.
- Playfair: removed from `--font-display`; family declaration may stay in `nuxt.config.ts` but is unused (optional single italic pull-quote only).
- `.legible` text-shadow halo is **removed** (there is no glowing backdrop to fight anymore) — replaced with a no-op or deleted; callers cleaned up.

## 5. Shader / 3D Subsystem

### 5.1 `useShaderCanvas` composable (`app/composables/useShaderCanvas.ts`)

A reusable Three.js fragment-shader-on-a-quad runner encapsulating the perf contract so every shader moment shares one implementation:

- Accepts fragment shader source + uniforms.
- **Perf contract:** caps `devicePixelRatio` (≤ configurable, default 1.5); pauses the RAF loop when the host element is offscreen (IntersectionObserver); pauses on tab blur; renders a single static frame + stops on `prefers-reduced-motion`; disposes cleanly on unmount.
- Exposes reactive uniforms for mouse (`uMouse`), scroll (`uScroll`), time (`uTime`), aspect, and mode tint (`uAccent`, `uInk`).
- Mode-aware: reads `useColorMode()` and updates palette uniforms on change.

### 5.2 Hero living panel (`app/components/Shader/FlowField.vue`)

The signature. A handcrafted GLSL **flow-field / domain-warped fluid** (shaders.com lineage — curl/fbm noise advection), clay-tinted.

- Paper: ink-on-paper current, low opacity, drawn like flowing graphite.
- Ink: luminous clay/warm current on slate.
- Reacts to cursor position (`uMouse`) and scroll depth (`uScroll`).
- Static gradient fallback (mobile + reduced-motion).

### 5.3 The Instrument (`app/components/Shader/Instrument.vue`)

One interactive 3D object (TresJS) presented as an editorial "specimen" — draggable/spinnable, with a mono caption. Repurposes existing `Object/` geometry work into the new visual language (matte material, clay rim light). Placed in a lower section (e.g. About or a dedicated interlude).

### 5.4 Recurring moments

- **Section dividers** (`app/components/Shader/Divider.vue`): a thin animated shader hairline / flow accent between sections.
- **Project card hover**: subtle shader glow bleed on hover (reuses `useShaderCanvas` at tiny size, or a cheaper CSS approximation if perf-marginal — decided during build against a real FPS check).
- **Astro gallery**: shader-driven reveal/treatment on `/astrophotography` (kept as content, restyled).

### 5.5 Removed

- `app/components/Background/Cosmos.vue` (global cosmic shader) — deleted; `app.vue` no longer renders it.
- `app/components/Cursor/Splash.vue` + `app/lib/splash-cursor.ts` — retired.

## 6. Layout & Sections

Content is unchanged; layouts are re-skinned to the editorial system. Section list (in `app/pages/index.vue`): Hero → About → Projects → Experience → Skills → Writing → Architecture → Contact → footer.

- **Hero** (`Section/Hero.vue`): rebuilt to treatment 3 (type/living-panel split). Left: mono eyebrow, giant "JJ Teoh", lede, clay CTA + resume link. Right: `Shader/FlowField.vue` column.
- **Section/Heading.vue**: switch title to Space Grotesk display voice, remove `.legible` halo, refine spacing.
- **About / Projects / Experience / Skills / Writing / Architecture**: inherit new tokens; tune to Paper & Ink (hairline grids, generous whitespace, mono metadata, clay used sparingly). Replace glassy/glow surfaces with flat paper/ink surfaces + hairline borders. Add `Shader/Divider` between major sections.
- **Contact / Form**: re-skin inputs to editorial (hairline underline-style or bordered), clay submit.
- **Footer**: minimal, mono.

## 7. Navigation

- `Nav/Bar.vue` + `Nav/Mobile.vue`: restyle from glass-cosmic to Paper & Ink (solid/hairline dock, not heavy glass in Paper). Active state uses clay.
- **Add a Paper/Ink mode toggle** to both docks (sun/moon), wired to `useColorMode()`.
- `app.vue`: remove forced `colorMode.preference = "dark"`; `nuxt.config.ts` colorMode → `preference: "system"`, `fallback: "dark"`.

## 8. Accessibility & Performance

- WCAG AA contrast in both modes (verified with a contrast check during build).
- `prefers-reduced-motion`: shaders render one static frame; all transitions collapse (existing media query extended).
- `prefers-reduced-transparency`: honored.
- Keyboard focus rings retained (clay ring).
- Shaders: capped DPR, offscreen pause, tab-blur pause, mobile static fallback. Target 60fps desktop; no jank on scroll.
- Lighthouse: no regression vs current; shaders must not block LCP (hero text renders immediately; shader is progressive/`ClientOnly`).

## 9. Out of Scope

- No content rewrites (copy stays).
- No new sections or pages.
- No backend/API changes (contact form untouched functionally).
- No CMS/article content changes.

## 10. Build Sequence

1. **Foundation (sequential, main thread):** color tokens + typography in `main.css`; unlock color-mode; `useShaderCanvas` composable; remove Cosmos + Splash from `app.vue`.
2. **Signature (main thread):** `Shader/FlowField.vue` + hero rebuild; mode toggle in nav.
3. **Recurring + sections (parallelizable across subagents, one .vue per agent):** Instrument, Divider, each Section re-skin, astro page, contact form.
4. **Integration & verification:** build, typecheck, lint, run dev, visual check both modes, reduced-motion + mobile fallback, contrast audit, commit incrementally.

## 11. Verification

- `bun run build` + typecheck clean (no `any`, no unnecessary casts).
- `bun run lint` clean.
- Dev server renders both modes correctly; toggle persists.
- Shader runs at 60fps desktop, static fallback on reduced-motion.
- Manual diff of behavior vs `master` for regressions (nav, contact form, astro page, articles).
- Where logic is testable (perf-guard state, mode palette mapping, fallback selection), add focused unit tests first (TDD).
