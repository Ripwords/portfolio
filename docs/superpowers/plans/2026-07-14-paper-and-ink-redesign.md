# Paper & Ink Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild jjteoh.com's visual identity from cosmic/nebula to an editorial-Swiss "Paper & Ink" system with dual light/dark modes and a standout handcrafted GLSL shader + interactive 3D experience.

**Architecture:** Re-tokenize the existing Tailwind-4 CSS variable system (`main.css`) so the identity cascades through components that already consume tokens. Add a reusable `useShaderCanvas` composable that encapsulates a Three.js fragment-shader-on-a-quad with a strict performance contract (DPR cap, offscreen/blur pause, reduced-motion static frame). Build the signature hero flow-field shader and recurring shader moments on top of it. Unlock the already-installed `@nuxtjs/color-mode` for a real Paper/Ink toggle.

**Tech Stack:** Nuxt 4, Vue 3, TypeScript, TailwindCSS 4, `@nuxtjs/color-mode`, Three.js 0.183, TresJS, `@vueuse/motion`, Geist / Space Grotesk / Geist Mono fonts. Package manager: **bun**.

## Global Constraints

- Package manager is **bun** (`bun run build`, `bun run lint`, `bun run fmt`). Dev server: `bun run dev`.
- **No `any`** and no unnecessary `as unknown as X` casts (user TS rule). Prefer correct Three.js types.
- Conventional Commits (`feat:`, `fix:`, `refactor:`, `style:`, `chore:`).
- **No test framework exists** in this repo and none is being added for this visual work. Per-task verification = `bun run lint` clean + typecheck clean (via build) + dev-server visual check in **both** Paper and Ink modes. Pure logic is kept trivial and verified by construction.
- Both modes must pass **WCAG AA** for body text and interactive controls.
- Every shader respects `prefers-reduced-motion` (single static frame) and degrades to a static fallback on mobile.
- Content/copy is unchanged. No new sections, pages, or backend changes.
- Accent clay: Paper `#cf6a4a` / Ink `#e08865`; it is the ONLY chromatic color. Everything else near-monochrome.
- Colors authored in OKLCH to match existing convention; hexes in this plan are targets.

---

## File Map

**Foundation**

- Modify `app/assets/css/main.css` — token system + utilities (Paper `:root`, Ink `.dark`)
- Modify `nuxt.config.ts` — `colorMode.preference: "system"`
- Modify `app/app.vue` — remove forced dark, remove Cosmos + Splash
- Create `app/composables/useShaderCanvas.ts` — shared shader runner + perf contract
- Create `app/lib/shaders/flow-field.glsl.ts` — GLSL source strings (exported as TS template literals)
- Delete `app/components/Background/Cosmos.vue`, `app/components/Cursor/Splash.vue`, `app/lib/splash-cursor.ts`

**Shader / 3D**

- Create `app/components/Shader/FlowField.vue` — signature hero shader
- Create `app/components/Shader/Divider.vue` — section-divider accent
- Create `app/components/Shader/Instrument.vue` — interactive 3D specimen
- Modify/replace `app/components/Object/Galaxy.vue` usage (Instrument supersedes it in the hero)

**Chrome**

- Create `app/components/Nav/ModeToggle.vue` — Paper/Ink toggle
- Modify `app/components/Nav/Bar.vue`, `app/components/Nav/Mobile.vue`

**Sections** (re-skin, content preserved)

- Modify `app/components/Section/Hero.vue` (rebuild to treatment 3)
- Modify `app/components/Section/Heading.vue`
- Modify `app/components/Section/{About,Projects,Experience,Skills,Writing,Architecture}.vue`
- Modify `app/components/Contact/Form.vue`
- Modify `app/pages/index.vue` (dividers, footer)
- Modify `app/pages/astrophotography/index.vue`

---

## Phase 1 — Foundation (sequential; later phases depend on all of Phase 1)

### Task 1: Rewrite color tokens + typography in `main.css`

**Files:** Modify `app/assets/css/main.css`

**Produces:** Token contract consumed by every component —
`--background --foreground --card --card-foreground --muted --muted-foreground --primary --primary-foreground --secondary --accent --accent-foreground --border --input --ring`, `--font-display --font-sans --font-mono`, utilities `.eyebrow .heading .display .surface .surface-hover .glass .focus-ring .legible .grain`.

- [ ] **Step 1:** In the `@theme inline` block, set `--font-display: "Space Grotesk", ui-sans-serif, system-ui, sans-serif;` and keep `--font-sans: "Geist"`, `--font-mono: "Geist Mono"`. Remove `--font-heading` (fold into display) and the `--color-nebula-*` lines.
- [ ] **Step 2:** Replace the `:root` block (Paper / light) with these targets, authored in OKLCH:
  - `--background`: `#efece4` → `oklch(0.938 0.008 80)`
  - `--foreground`: `#141414` → `oklch(0.18 0 0)`
  - `--card`: `#e6e2d8` → `oklch(0.905 0.009 82)`
  - `--card-foreground`: same as foreground
  - `--muted`: `oklch(0.9 0.008 82)`; `--muted-foreground`: `#57534e` → `oklch(0.44 0.01 60)` (verify AA ≥ 4.5:1 on `--background`)
  - `--accent`: `oklch(0.88 0.01 82)`; `--accent-foreground`: foreground
  - `--secondary`: `oklch(0.9 0.008 82)`; `--secondary-foreground`: foreground
  - `--primary`: `#cf6a4a` → `oklch(0.63 0.13 40)`; `--primary-foreground`: `oklch(0.99 0 0)`
  - `--border`: `oklch(0.18 0 0 / 0.14)`; `--input`: `oklch(0.18 0 0 / 0.2)`; `--ring`: primary
  - `--radius: 0.625rem` (unchanged)
- [ ] **Step 3:** Replace the `.dark` block (Ink) with:
  - `--background`: `#101216` → `oklch(0.19 0.01 265)`
  - `--foreground`: `#f2f4f8` → `oklch(0.96 0.004 265)`
  - `--card`: `#171a20` → `oklch(0.23 0.012 265)`
  - `--muted-foreground`: `#aeb6c2` → `oklch(0.76 0.015 265)` (verify AA on `--background`)
  - `--accent`: `oklch(0.28 0.015 265)`; `--secondary`: `oklch(0.26 0.014 265)`
  - `--primary`: `#e08865` → `oklch(0.72 0.11 42)`; `--primary-foreground`: `#0b0d11` → `oklch(0.16 0.01 265)`
  - `--border`: `oklch(1 0 0 / 0.1)`; `--input`: `oklch(1 0 0 / 0.14)`; `--ring`: primary
  - Delete `--nebula-*` declarations here and in `body`.
- [ ] **Step 4:** Update utilities:
  - `.legible` → make it a **no-op** (remove `text-shadow`); keep the class so callers don't break. `.grain` unchanged if present or add a faint grain overlay utility.
  - `.glass` → Paper-appropriate: `background: color-mix(in oklch, var(--card) 85%, transparent); backdrop-filter: blur(10px); border: 1px solid var(--border); box-shadow: 0 10px 30px -18px oklch(0.18 0 0 / 0.25);` (works in both modes; the token values differ per mode).
  - `.surface` / `.surface-hover` → flat: `background: var(--card); border: 1px solid var(--border);` remove the heavy tinted drop-shadows; hover lifts `translateY(-2px)` + border to `color-mix(in oklch, var(--foreground) 20%, transparent)`.
  - `.heading` → `font-family: var(--font-display); font-weight: 600; letter-spacing: -0.035em;` (already close; ensure it points at display).
  - Keep `.eyebrow`, `.focus-ring`, `.content` (retint `.content code/pre/a` to new tokens — they already use tokens, so they cascade).
  - `::selection` → `background: color-mix(in oklch, var(--primary) 30%, transparent);`
- [ ] **Step 5:** Verify: `bun run dev`, load `/`. Both `:root` (add `class="light"` won't apply yet — use the toggle later; for now temporarily test by toggling `.dark` on `<html>` in devtools). Confirm no nebula references remain: `grep -rn "nebula" app/` returns nothing. Run `bun run lint`.
- [ ] **Step 6:** Commit: `style(theme): replace cosmic tokens with Paper & Ink dual-mode system`

### Task 2: Unlock color-mode + strip global cosmic chrome

**Files:** Modify `nuxt.config.ts`, `app/app.vue`; Delete `app/components/Background/Cosmos.vue`, `app/components/Cursor/Splash.vue`, `app/lib/splash-cursor.ts`

**Interfaces — Consumes:** Task 1 tokens.

- [ ] **Step 1:** `nuxt.config.ts` → `colorMode: { classSuffix: "", preference: "system", fallback: "dark" }`.
- [ ] **Step 2:** `app/app.vue` → delete `colorMode.preference = "dark"` line and the `useColorMode()` call if now unused; delete `<BackgroundCosmos />` and the `<ClientOnly><CursorSplash /></ClientOnly>` block.
- [ ] **Step 3:** Give `app.vue`'s root a base surface: ensure `<html>`/`body` background is `var(--background)` (already in `@layer base`), and add a faint fixed grain overlay div (`pointer-events-none fixed inset-0 -z-10`) with the existing `.grain` SVG at low opacity — mode-agnostic.
- [ ] **Step 4:** Delete the three files. Grep for stale imports: `grep -rn "Cosmos\|Splash\|splash-cursor" app/` → fix any references (there should be none outside app.vue).
- [ ] **Step 5:** Verify: `bun run dev` renders home with a flat paper/ink background, no console errors. Manually toggle `.dark` on `<html>` to confirm both modes have correct base. `bun run lint`.
- [ ] **Step 6:** Commit: `refactor(chrome): remove cosmic background + splash cursor, unlock color-mode`

### Task 3: `useShaderCanvas` composable (perf contract)

**Files:** Create `app/composables/useShaderCanvas.ts`

**Interfaces — Produces:**

```ts
interface ShaderCanvasOptions {
  fragmentShader: string;
  // extra uniforms merged with the built-ins; values are THREE uniform objects
  uniforms?: Record<string, { value: unknown }>;
  dprCap?: number; // default 1.5
  paused?: Ref<boolean>; // optional external pause
}
interface ShaderCanvasHandle {
  canvasRef: Ref<HTMLCanvasElement | null>;
  setMouse: (x: number, y: number) => void; // normalized 0..1
  isStatic: Readonly<Ref<boolean>>; // true when reduced-motion (single frame)
}
export function useShaderCanvas(opts: ShaderCanvasOptions): ShaderCanvasHandle;
```

Built-in uniforms always provided to the shader: `uTime (float)`, `uMouse (vec2)`, `uScroll (float 0..1)`, `uAspect (float)`, `uAccent (vec3)`, `uInk (float 0/1 — 1 in dark mode)`.

- [ ] **Step 1:** Implement with a full-screen `PlaneGeometry(2,2)` + `ShaderMaterial`, `OrthographicCamera`/bare `Camera`, `WebGLRenderer({ canvas, alpha:true, antialias:false })`. Standard vertex shader passing `vUv`.
- [ ] **Step 2:** Perf contract:
  - `renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, dprCap))`.
  - `IntersectionObserver` on the canvas host: pause RAF when `!isIntersecting`.
  - `document` `visibilitychange`: pause when hidden.
  - `usePreferredReducedMotion()` (from `@vueuse/core`): if `reduce`, render exactly one frame, set `isStatic = true`, never start RAF.
  - `ResizeObserver` updates size + `uAspect`.
  - `onBeforeUnmount`: cancel RAF, disconnect observers, dispose geometry/material/renderer, remove listeners.
- [ ] **Step 3:** Mode awareness: read `useColorMode()`; `watch` it to set `uInk.value` (0/1) and `uAccent.value` (clay vec3 per mode: Paper `[0.81,0.42,0.29]`, Ink `[0.88,0.53,0.4]`).
- [ ] **Step 4:** `uScroll`: subscribe to a passive `scroll` listener updating a normalized `scrollY / (scrollHeight - innerHeight)`; throttle via RAF coalescing (update uniform inside the render loop, not the event).
- [ ] **Step 5:** Verify by construction + typecheck: `bun run build` must typecheck this file with no `any`. (Consumed/exercised in Task 4.)
- [ ] **Step 6:** Commit: `feat(shader): add useShaderCanvas composable with perf contract`

---

## Phase 2 — Signature (sequential; depends on Phase 1)

### Task 4: `Shader/FlowField.vue` — hero flow-field shader

**Files:** Create `app/lib/shaders/flow-field.glsl.ts`, `app/components/Shader/FlowField.vue`

**Interfaces — Consumes:** `useShaderCanvas` (Task 3).

- [ ] **Step 1:** In `flow-field.glsl.ts` export `flowFieldFrag` (string). Implement domain-warped fbm advection (value-noise `hash`/`noise`/`fbm`, 4–5 octaves; two-level domain warp using `uTime` and `uMouse` to bend the field; `uScroll` shifts the warp phase). Output: a near-monochrome ink current whose ridges are tinted with `uAccent`. Mix by `uInk`: Paper = dark ink lines on transparent (low alpha, multiply-friendly), Ink = luminous accent ridges on transparent. Keep it tasteful/slow (`uTime * 0.05`).
- [ ] **Step 2:** `FlowField.vue`: a `<ClientOnly>` wrapper hosting a `<canvas>` sized to its container (tall column). Call `useShaderCanvas({ fragmentShader: flowFieldFrag })`. Bind `pointermove` on the host → `setMouse`. Add `#fallback` + a `v-if isStatic`/no-webgl static gradient (clay→transparent) so reduced-motion/mobile still looks intentional.
- [ ] **Step 3:** Style: `aria-hidden`, `pointer-events-none` except where cursor tracking is wanted (track on window but map to panel-local coords). Rounded to match hero panel; respects container.
- [ ] **Step 4:** Verify: temporarily drop `<ShaderFlowField class="h-96"/>` into `index.vue`, `bun run dev`. Confirm: animates in Ink, animates in Paper (toggle `.dark`), pauses when scrolled offscreen (watch GPU or add a temporary console log gated behind dev), single static frame under reduced-motion (OS setting or devtools emulation). Remove the temporary mount. `bun run lint`.
- [ ] **Step 5:** Commit: `feat(shader): add FlowField hero shader`

### Task 5: Rebuild `Section/Hero.vue` to treatment 3

**Files:** Modify `app/components/Section/Hero.vue`

**Interfaces — Consumes:** `Shader/FlowField.vue`.

- [ ] **Step 1:** Rebuild as an editorial split. Grid `md:grid-cols-[1.15fr_0.85fr]`, `min-h-[100dvh]`, generous top padding for the fixed nav.
- [ ] **Step 2:** Left column: mono eyebrow `Software Engineer · AI · Infra` (`.eyebrow`), giant `JJ Teoh` in `.heading`/display at `text-7xl lg:text-8xl xl:text-9xl` weight 700 tracking `-0.045em`, existing lede copy, then two actions: primary clay pill "View work →" (`bg-primary text-primary-foreground`) + text/hairline "Resume" link. Keep the existing `v-motion` blur-fade-up reveals.
- [ ] **Step 3:** Right column: a tall panel (`aspect-[3/4]` or full-height) containing `<ShaderFlowField />`, framed with a hairline border (`border border-border`), slight inset. On mobile it collapses below the type (shorter, still present).
- [ ] **Step 4:** Remove all cosmic-specific styling (galaxy drop-shadow, glow). Remove `.legible` usages (now no-op but drop for cleanliness).
- [ ] **Step 5:** Verify `bun run dev`: hero reads as editorial Swiss in both modes, shader column alive, type dominant, AA contrast holds. Mobile: stacks cleanly. `bun run lint`.
- [ ] **Step 6:** Commit: `feat(hero): rebuild hero as editorial type + living shader panel`

### Task 6: `Nav/ModeToggle.vue` + wire into nav

**Files:** Create `app/components/Nav/ModeToggle.vue`; Modify `app/components/Nav/Bar.vue`, `app/components/Nav/Mobile.vue`

- [ ] **Step 1:** `ModeToggle.vue`: `const colorMode = useColorMode()`, a button toggling `colorMode.preference` between `"light"`/`"dark"`, sun/moon lucide icons, `.focus-ring interactive`, `aria-label` reflecting target mode, `aria-pressed`. `<ClientOnly>` to avoid hydration mismatch (render a neutral icon in fallback).
- [ ] **Step 2:** Add `<NavModeToggle />` into the desktop dock (`Bar.vue`, after the social list, with a hairline separator) and the mobile dock (`Mobile.vue`, as an extra item).
- [ ] **Step 3:** Verify: toggle flips Paper↔Ink instantly, persists across reload, no hydration warning in console. `bun run lint`.
- [ ] **Step 4:** Commit: `feat(nav): add Paper/Ink mode toggle`

---

## Phase 3 — Recurring shaders + section re-skins (parallelizable; each depends only on Phase 1, plus Task 4 for shader-using tasks)

> Re-skin tasks preserve all existing markup structure, props, data, `v-motion` reveals, and copy. They change classes/styling to the Paper & Ink system: flat surfaces + hairline borders instead of glass/glow, `.eyebrow` mono metadata, display headings, clay used only for links/CTAs/active states. Remove `.legible`. Each task verifies in both modes + lint, then commits.

### Task 7: `Shader/Divider.vue`

**Files:** Create `app/components/Shader/Divider.vue`

- [ ] **Step 1:** A slim (`h-px` to `h-24` decorative band) shader/CSS accent marking section boundaries: a thin animated clay-tinted flow line using `useShaderCanvas` at low height, OR — if an FPS check shows multiple `useShaderCanvas` instances are marginal — a CSS-only animated hairline gradient. Decide against a real check; default to CSS if unsure (cheaper, and dividers are subtle).
- [ ] **Step 2:** `aria-hidden`, reduced-motion static.
- [ ] **Step 3:** Verify + commit: `feat(shader): add section Divider accent`

### Task 8: `Shader/Instrument.vue` — interactive 3D specimen

**Files:** Create `app/components/Shader/Instrument.vue`

**Interfaces — Consumes:** TresJS (`@tresjs/nuxt`, auto-imported `<TresCanvas>` etc.). May reuse geometry ideas from `app/components/Object/`.

- [ ] **Step 1:** A `<ClientOnly>` `<TresCanvas>` with a single striking matte object (e.g. an icosahedron/torus-knot or a refined particle form) under soft studio lighting with a **clay rim light**. Pointer-drag to rotate (OrbitControls from cientos, damping on, zoom/pan disabled) + gentle auto-spin when idle.
- [ ] **Step 2:** Matte, near-monochrome material that reads in both modes (reads mode via `useColorMode` to swap base color/emissive). Cap DPR, pause offscreen (Tres `render-mode="on-demand"` or manual), dispose on unmount. Static poster fallback for reduced-motion/mobile.
- [ ] **Step 3:** Mono caption slot beneath (editorial "specimen" label).
- [ ] **Step 4:** Verify 60fps, both modes, drag works, fallback OK. Commit: `feat(shader): add interactive 3D Instrument specimen`

### Task 9: `Section/Heading.vue` re-skin

- [ ] **Step 1:** Title → display voice (`.heading`, `text-4xl md:text-5xl`, tracking tight), remove `.legible`. Optional mono kicker above the title (small, `.eyebrow`) — add a `kicker?` prop (default empty; when empty render nothing) so sections can label themselves.
- [ ] **Step 2:** Verify + commit: `style(section): editorial Heading`

### Task 10: `Section/About.vue` re-skin (+ Instrument)

- [ ] **Step 1:** Keep copy + focus-area data. Convert the 3-up focus grid to hairline-divided cells (already close: `gap-px`, `bg-card/40`) using new tokens; drop glow. Lead paragraph large, editorial.
- [ ] **Step 2:** Place `<ShaderInstrument>` as an editorial interlude within/after About (specimen + mono caption), whitespace around it.
- [ ] **Step 3:** Verify both modes + commit: `style(about): Paper & Ink re-skin with Instrument interlude`

### Task 11: `Section/Projects.vue` re-skin (+ card hover)

- [ ] **Step 1:** Preserve all data/expand logic. Featured cards → `.surface` flat + hairline; supporting rows keep the `gap-px` hairline grid retinted. Metric chips + tech tags → hairline pills, clay only on the metric icon/label. Remove `backdrop-blur`/glow.
- [ ] **Step 2:** Card hover: a subtle clay glow bleed (CSS radial using `--primary` at low alpha, or a tiny shader if perf allows — default CSS). Keep the lift.
- [ ] **Step 3:** Verify both modes, expand/collapse still works + commit: `style(projects): Paper & Ink re-skin`

### Task 12: `Section/Experience.vue` re-skin

- [ ] **Step 1:** Read file; convert to editorial timeline/list with hairline rules, mono dates (`.eyebrow`), display role titles, clay for company links. Preserve data + reveals.
- [ ] **Step 2:** Verify + commit: `style(experience): Paper & Ink re-skin`

### Task 13: `Section/Skills.vue` re-skin

- [ ] **Step 1:** Read file; convert skill groups to hairline-separated editorial rows/columns; icons monochrome, clay on hover. Preserve data.
- [ ] **Step 2:** Verify + commit: `style(skills): Paper & Ink re-skin`

### Task 14: `Section/Writing.vue` re-skin

- [ ] **Step 1:** Read file; article list → editorial index (mono date/kicker, display title, hairline separators). Preserve `@nuxt/content` querying + links.
- [ ] **Step 2:** Verify + commit: `style(writing): Paper & Ink re-skin`

### Task 15: `Section/Architecture.vue` re-skin

- [ ] **Step 1:** Read file (this renders the `Diagram/*` system maps). Retint diagram containers to hairline/flat; ensure the `Diagram/*.vue` SVG/line colors use tokens (`--foreground`, `--primary`, `--border`) not hardcoded cosmic colors — update any hardcoded hex in `app/components/Diagram/*` to token-based `currentColor`/CSS vars so they work in both modes.
- [ ] **Step 2:** Verify diagrams legible in both modes + commit: `style(architecture): Paper & Ink re-skin + tokenize diagrams`

### Task 16: `Contact/Form.vue` + footer + `index.vue` dividers

**Files:** Modify `app/components/Contact/Form.vue`, `app/pages/index.vue`

- [ ] **Step 1:** Form inputs → editorial (hairline bordered or underline style using `--input`/`--border`), labels mono, submit = clay pill. Preserve vee-validate/zod logic + toasts untouched.
- [ ] **Step 2:** `index.vue`: insert `<ShaderDivider />` between major sections; re-skin the GitHub contribution panel (`glass` → flat surface); footer stays minimal + mono (retint to tokens). Keep the force-dark comment logic removed (contribution SVG: keep dark SVG only if in Ink — optionally swap by `useColorMode`; if simpler, keep dark and note it).
- [ ] **Step 3:** Verify submit still works (validation + toast), both modes + commit: `style(contact): editorial form, dividers, footer`

### Task 17: `Nav/Bar.vue` + `Nav/Mobile.vue` full re-skin

- [ ] **Step 1:** Dock: in Paper use a solid/hairline dock (lighter than the heavy cosmic glass); in Ink a subtle glass — the `.glass` utility now handles both via tokens, so mainly verify + tune padding. Active nav pill → clay (`bg-primary text-primary-foreground`), replace `shadow-[...var(--primary)]` glow with a restrained clay tint. Logo unchanged.
- [ ] **Step 2:** Verify active states, both modes, mobile dock incl. toggle + commit: `style(nav): Paper & Ink docks`

### Task 18: `astrophotography/index.vue` re-skin

- [ ] **Step 1:** Read file; re-skin gallery to editorial (hairline frames, mono captions, generous whitespace, clay accents). Keep all images/content. Optionally add a shader-driven hover/reveal on gallery items (reuse Divider/FlowField sparingly; default to a tasteful CSS reveal to protect perf on an image-heavy page).
- [ ] **Step 2:** Verify both modes, images load, `Parallax/DayMoon` still works (retint if it uses cosmic tokens) + commit: `style(astro): Paper & Ink gallery re-skin`

---

## Phase 4 — Integration & verification

### Task 19: Full-site verification pass

- [ ] **Step 1:** `bun run lint` (fix all), `bun run fmt`, `bun run build` (must succeed, typecheck clean, no `any`).
- [ ] **Step 2:** `bun run dev` (or `bun run preview` on the build) and walk every route (`/`, `/astrophotography`, an `/articles/[slug]`) in **both** Paper and Ink: verify no cosmic remnants, no broken layouts, toggle persists, contact form validates, nav active states correct.
- [ ] **Step 3:** Accessibility/perf: emulate `prefers-reduced-motion` → all shaders static, no motion. Throttle to mobile → shaders show static fallback, no jank. Spot-check AA contrast on body text + clay controls in both modes (use a contrast checker on the actual token hexes).
- [ ] **Step 4:** Behavior diff vs `master`: confirm no functional regressions (nav routing, form submit, astro page, article rendering, mobile dock offset logic).
- [ ] **Step 5:** Final commit + summary. Leave branch `redesign/paper-and-ink` ready for review (do NOT merge/push unless asked).

---

## Self-Review (against spec)

- **Spec §3 color** → Task 1. **§4 type** → Task 1 + Task 9. **§5 shader subsystem** → Tasks 3,4,7,8 (+ usage 5,10,11,18). **§5.5 removals** → Task 2. **§6 sections** → Tasks 5,9–16,18. **§7 nav + toggle + color-mode unlock** → Tasks 2,6,17. **§8 a11y/perf** → baked into Task 3 contract + Task 19. **§9 out-of-scope** honored (no copy/backend changes). ✅ All spec sections mapped.
- **Placeholders:** none — each task names exact files and concrete transformations; novel code (composable interface, shader approach, token values) is specified. Re-skin tasks intentionally instruct "read file then apply the documented system" because the content already exists and must be preserved verbatim; the styling system is fully specified in Task 1 + the Phase 3 preamble.
- **Type consistency:** `useShaderCanvas` interface (Task 3) is the single shared surface; Task 4 is its only direct consumer and uses the documented built-in uniforms. Uniform names (`uTime,uMouse,uScroll,uAspect,uAccent,uInk`) are consistent across Tasks 3–4.
