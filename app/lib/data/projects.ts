export interface StackItem {
  label: string;
  icon?: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
  icon?: string;
}

export interface ProjectLink {
  label: string;
  href: string;
  icon: string;
}

export interface ProjectScreenshot {
  src: string;
  alt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  problem: string;
  approach: string;
  stack: StackItem[];
  primaryStack: StackItem[];
  impact: string;
  featured?: boolean;
  displayIcon?: string;
  metrics?: ProjectMetric[];
  highlights?: string[];
  links?: ProjectLink[];
  github?: string;
  screenshot?: ProjectScreenshot;
}

const techIcons: Record<string, string> = {
  TypeScript: "devicon:typescript",
  "Node.js": "devicon:nodejs",
  SQLite: "devicon:sqlite",
  Docker: "devicon:docker",
  Python: "devicon:python",
  FastAPI: "devicon:fastapi",
  React: "devicon:react",
  "React Native": "devicon:react",
  "Next.js": "devicon:nextjs",
  NestJS: "devicon:nestjs",
  PostgreSQL: "devicon:postgresql",
  Redis: "devicon:redis",
  Tauri: "devicon:tauri",
  Vue: "devicon:vuejs",
  Rust: "devicon:rust",
  Nuxt: "devicon:nuxt",
  "Three.js": "devicon:threejs",
  "Tailwind CSS": "devicon:tailwindcss",
  ElectricSQL: "lucide:refresh-cw",
  Elysia: "devicon:bun",
  Hono: "logos:hono",
  Bun: "devicon:bun",
  Mastra: "lucide:sparkles",
  "AI SDK": "lucide:bot",
  LangGraph: "lucide:workflow",
  TradingAgents: "lucide:brain-circuit",
  Drizzle: "lucide:database-zap",
  "Moomoo OpenD": "lucide:chart-candlestick",
  rrweb: "lucide:film",
  "Shadow DOM": "lucide:layers",
  "GitHub App": "lucide:github",
  "Better Auth": "lucide:key-round",
  "Blob Storage": "lucide:archive",
  "Nuxt UI": "devicon:nuxt",
  Expo: "devicon:react",
  Electron: "devicon:electron",
  Preact: "logos:preact",
  TimescaleDB: "devicon:postgresql",
  Vitest: "devicon:vitest",
  Playwright: "devicon:playwright",
  Jest: "lucide:flask-conical",
};

function toStack(techs: string[]): StackItem[] {
  return techs.map((label) => ({ label, icon: techIcons[label] }));
}

export const projects: Project[] = [
  {
    id: "ai-trader",
    title: "AI Trading Copilot",
    description:
      "Self-hosted market research and trading workstation with broker tools, multi-agent analysis, and gated execution paths.",
    category: "AI / Fintech Systems",
    problem:
      "Retail trading workflows were scattered across broker terminals, watchlists, news tabs, portfolio trackers, and LLM chats with no shared context or audit trail.",
    approach:
      "Built a Dockerized Nuxt + FastAPI system where an AI chat can call broker tools, stream real market charts, mutate moomoo watchlists, read positions, and run a LangGraph TradingAgents research pipeline with analyst, debate, risk, and portfolio-manager roles persisted to Postgres.",
    primaryStack: toStack(["Nuxt", "FastAPI", "LangGraph", "PostgreSQL"]),
    stack: toStack([
      "TypeScript",
      "Nuxt",
      "Vue",
      "Nuxt UI",
      "AI SDK",
      "Python",
      "FastAPI",
      "LangGraph",
      "TradingAgents",
      "PostgreSQL",
      "Drizzle",
      "Docker",
      "Moomoo OpenD",
      "Playwright",
      "Vitest",
    ]),
    impact:
      "Turns live market data, watchlists, portfolio state, news, and multi-agent research into one streaming interface with paper/live trading gates.",
    featured: true,
    displayIcon: "lucide:chart-candlestick",
    metrics: [
      { label: "apps", value: "Nuxt + FastAPI", icon: "lucide:blocks" },
      { label: "agent roles", value: "10-role pipeline", icon: "lucide:brain-circuit" },
      { label: "broker surface", value: "market + account tools", icon: "lucide:plug-zap" },
      { label: "runtime", value: "Dockerized stack", icon: "lucide:container" },
    ],
    highlights: [
      "Streams candlestick charts, tool calls, analyst reports, debate turns, risk reviews, and final decisions as structured NDJSON.",
      "Wraps moomoo OpenD for watchlists, k-lines, paper portfolio reads, and gated order execution from a Python FastAPI service.",
      "Persists chat, algo state, LangGraph checkpoints, and per-role reflections in a shared Postgres schema.",
    ],
    links: [
      {
        label: "Source",
        href: "https://github.com/Ripwords/ai-trader",
        icon: "line-md:github-loop",
      },
    ],
    github: "https://github.com/Ripwords/ai-trader",
    screenshot: {
      src: "/img/projects/ai-trader.png",
      alt: "AI Trading Copilot research intelligence dashboard with per-symbol theses and ticker signals.",
    },
  },
  {
    id: "repro",
    title: "Repro Feedback SDK & Dashboard",
    description:
      "Framework-agnostic feedback widget with annotated screenshots, session replay, diagnostics, and a self-hostable Nuxt dashboard.",
    category: "SDK / Full-Stack",
    problem:
      "Reproducing user-reported bugs in production web apps is slow because reporters cannot describe the exact state they saw and teams lack diagnostics.",
    approach:
      "Built a Preact widget rendered inside a Shadow DOM root for host-style isolation, with a hand-written rrweb-compatible recorder buffering the last 30s of DOM events. Reports bundle an annotated screenshot, console + network logs, cookies, and system info, then POST to a Nuxt 4 intake API backed by Drizzle, Postgres, better-auth, and pluggable local / S3-compatible blob storage.",
    primaryStack: toStack(["Nuxt", "Preact", "TypeScript", "PostgreSQL"]),
    stack: toStack([
      "TypeScript",
      "Nuxt",
      "Vue",
      "Preact",
      "Shadow DOM",
      "rrweb",
      "PostgreSQL",
      "Drizzle",
      "Better Auth",
      "Blob Storage",
      "GitHub App",
      "Bun",
      "Docker",
      "Tailwind CSS",
    ]),
    impact:
      "Open-source and self-hostable end to end: SDK, dashboard, Postgres, blob storage, tester extension, and optional GitHub Issues sync.",
    featured: true,
    displayIcon: "lucide:bug",
    metrics: [
      { label: "deliverables", value: "SDK + dashboard", icon: "lucide:package-check" },
      { label: "capture window", value: "30s replay", icon: "lucide:history" },
      { label: "embed modes", value: "script + ESM", icon: "lucide:code-xml" },
      { label: "hosting", value: "self-hostable", icon: "lucide:server-cog" },
    ],
    highlights: [
      "Ships a host-isolated widget that works across vanilla JS, React, Vue, Svelte, Angular, Nuxt, and Next.js apps.",
      "Collects annotated screenshots, DOM replay, console logs, network logs, cookies, and browser/system info automatically.",
      "Includes a Nuxt triage dashboard, Chrome tester extension, project keys, origin allowlists, blob storage adapters, and GitHub issue sync.",
    ],
    links: [
      {
        label: "Source",
        href: "https://github.com/Ripwords/ReproJs",
        icon: "line-md:github-loop",
      },
      {
        label: "Docs",
        href: "https://ripwords.github.io/ReproJs/",
        icon: "lucide:book-open",
      },
    ],
    github: "https://github.com/Ripwords/ReproJs",
    screenshot: {
      src: "/img/projects/repro.png",
      alt: "Repro landing page highlighting feedback reports with annotated screenshots and session replay.",
    },
  },
  {
    id: "edge-sync",
    displayIcon: "lucide:radio-tower",
    title: "Edge Device Sync Engine",
    description:
      "Offline-first bidirectional sync between IoT field devices and cloud infrastructure.",
    category: "IoT Platform",
    problem:
      "Field devices in low-connectivity environments needed reliable bidirectional data sync with cloud.",
    approach:
      "Built conflict-resolution engine with offline-first architecture using ElectricSQL, custom debounced sync watchers, and queue-based protocol across Tauri desktop apps and a Hono API server.",
    primaryStack: toStack(["Tauri", "TypeScript", "SQLite", "ElectricSQL"]),
    stack: toStack([
      "TypeScript",
      "Vue",
      "Tauri",
      "SQLite",
      "ElectricSQL",
      "PostgreSQL",
      "Hono",
      "Docker",
      "Vitest",
    ]),
    impact: "Enabled reliable operation in environments with <30% uptime connectivity.",
  },
  {
    id: "hotel-pms",
    displayIcon: "lucide:building-2",
    title: "Hospitality Management Platform",
    description: "Unified PMS, POS, and e-invoicing system for hotel operations.",
    category: "Enterprise Platform",
    problem:
      "Hotel operations spanning bookings, housekeeping, POS, and financials were fragmented across disconnected tools.",
    approach:
      "Built a unified monorepo platform with a web-based PMS, Electron-based POS for multi-outlet F&B, and an integrated e-invoicing portal, all sharing a common backend and typed API layer.",
    primaryStack: toStack(["Next.js", "NestJS", "Electron", "PostgreSQL"]),
    stack: toStack([
      "TypeScript",
      "Next.js",
      "React",
      "NestJS",
      "Electron",
      "PostgreSQL",
      "Docker",
      "Jest",
      "Playwright",
    ]),
    impact:
      "Consolidated hotel operations into a single platform with real-time WebSocket-driven order management.",
  },
  {
    id: "fitness-platform",
    displayIcon: "lucide:dumbbell",
    title: "Fitness Coaching Platform",
    description:
      "Cross-platform coaching tool with web dashboard, mobile app, and native health integrations.",
    category: "Cross-Platform",
    problem:
      "Coaching businesses lacked a unified system to manage clients, workouts, progress tracking, and billing across web and mobile.",
    approach:
      "Built a full-stack monorepo with a React web dashboard, Expo mobile app, and NestJS backend. Auto-generated type-safe API clients from Swagger specs. Integrated Apple HealthKit and Google Health Connect for native health data.",
    primaryStack: toStack(["React", "Expo", "NestJS", "PostgreSQL"]),
    stack: toStack([
      "TypeScript",
      "React",
      "React Native",
      "Expo",
      "NestJS",
      "PostgreSQL",
      "Docker",
      "Jest",
      "Vitest",
    ]),
    impact:
      "Cross-platform coaching tool with native health integrations and multi-tier role management.",
  },
  {
    id: "e-invoicing",
    displayIcon: "lucide:receipt-text",
    title: "E-Invoicing Compliance SDK",
    description:
      "Published npm SDK for Malaysian e-invoicing with digital signing and rate limiting.",
    category: "Developer Tool",
    problem:
      "Malaysian e-invoicing mandate required tax-compliant document generation, digital signing, and submission.",
    approach:
      "Built an npm SDK with full XML-DSIG/JSON-DSig signing, X.509 certificate handling, sliding-window rate limiting per endpoint, and multi-tenant support. Published as an open-source package.",
    primaryStack: toStack(["TypeScript", "Node.js", "Vitest"]),
    stack: toStack(["TypeScript", "Node.js", "PKI/X.509", "Vitest"]),
    impact:
      "Published npm package enabling developers to achieve MyInvois compliance with minimal integration effort.",
  },
  {
    id: "ai-trip",
    displayIcon: "lucide:map",
    title: "AI Trip Planner",
    description:
      "AI-powered travel itinerary planner with real-time collaboration, expense tracking, and Google Maps integration.",
    category: "AI / Full-Stack",
    problem:
      "Planning group trips is tedious: coordinating itineraries, splitting expenses, and finding verified places across multiple tools.",
    approach:
      "Built a full-stack Nuxt 4 PWA with Mastra AI agents and Gemini for itinerary generation, Google Maps API for place verification, real-time collaboration with invite system, expense tracking with splitting, and checklists. Deployed as a serverless PWA with rate-limited AI endpoints.",
    primaryStack: toStack(["Nuxt", "Mastra", "TypeScript", "PostgreSQL"]),
    stack: toStack(["TypeScript", "Nuxt", "Vue", "Mastra", "Tailwind CSS", "PostgreSQL"]),
    impact:
      "Installable PWA with AI-generated itineraries backed by verified Google Maps places and real-time team collaboration.",
    screenshot: {
      src: "/img/projects/ai-trip.png",
      alt: "AI Trip Planner itinerary for a Tokyo trip with day-by-day activities, ratings, and cost estimates.",
    },
  },
];
