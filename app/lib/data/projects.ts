export interface StackItem {
  label: string;
  icon?: string;
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
  github?: string;
}

const techIcons: Record<string, string> = {
  TypeScript: "devicon:typescript",
  "Node.js": "devicon:nodejs",
  SQLite: "devicon:sqlite",
  Docker: "devicon:docker",
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
  MQTT: "ix:mqtt",
  Elysia: "devicon:bun",
  Mastra: "lucide:sparkles",
  Expo: "devicon:react",
  Electron: "devicon:electron",
  TimescaleDB: "devicon:postgresql",
  Vitest: "devicon:vitest",
  Playwright: "devicon:playwright",
  Jest: "devicon-plain:jest",
};

function toStack(techs: string[]): StackItem[] {
  return techs.map((label) => ({ label, icon: techIcons[label] }));
}

export const projects: Project[] = [
  {
    id: "edge-sync",
    title: "Edge Device Sync Engine",
    description:
      "Offline-first bidirectional sync between IoT field devices and cloud infrastructure.",
    category: "IoT Platform",
    problem:
      "Field devices in low-connectivity environments needed reliable bidirectional data sync with cloud.",
    approach:
      "Built conflict-resolution engine with offline-first architecture using ElectricSQL, custom debounced sync watchers, and queue-based protocol across Tauri desktop apps and a Hono API server.",
    primaryStack: toStack(["Tauri", "TypeScript", "SQLite", "MQTT"]),
    stack: toStack([
      "TypeScript",
      "Vue",
      "Tauri",
      "SQLite",
      "PostgreSQL",
      "MQTT",
      "Docker",
      "Vitest",
    ]),
    impact: "Enabled reliable operation in environments with <30% uptime connectivity.",
  },
  {
    id: "hotel-pms",
    title: "Hospitality Management Platform",
    description: "Unified PMS, POS, and e-invoicing system for hotel operations.",
    category: "Enterprise Platform",
    problem:
      "Hotel operations spanning bookings, housekeeping, POS, and financials were fragmented across disconnected tools.",
    approach:
      "Built a unified monorepo platform with a web-based PMS, Electron-based POS for multi-outlet F&B, and an integrated e-invoicing portal — all sharing a common backend and typed API layer.",
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
    title: "AI Trip Planner",
    description:
      "AI-powered travel itinerary planner with real-time collaboration, expense tracking, and Google Maps integration.",
    category: "AI / Full-Stack",
    problem:
      "Planning group trips is tedious — coordinating itineraries, splitting expenses, and finding verified places across multiple tools.",
    approach:
      "Built a full-stack Nuxt 4 PWA with Mastra AI agents and Gemini for itinerary generation, Google Maps API for place verification, real-time collaboration with invite system, expense tracking with splitting, and checklists. Deployed as a serverless PWA with rate-limited AI endpoints.",
    primaryStack: toStack(["Nuxt", "Mastra", "TypeScript", "PostgreSQL"]),
    stack: toStack(["TypeScript", "Nuxt", "Vue", "Mastra", "Tailwind CSS", "PostgreSQL"]),
    impact:
      "Installable PWA with AI-generated itineraries backed by verified Google Maps places and real-time team collaboration.",
  },
  {
    id: "starnet-gui",
    title: "StarNet++ GUI",
    description: "Cross-platform desktop GUI for astronomical image processing.",
    category: "Desktop App",
    problem:
      "StarNet++ is a powerful star removal tool for astrophotography, but its CLI-only interface is inaccessible for most hobbyists.",
    approach:
      "Built a cross-platform desktop GUI wrapping the StarNet++ CLI with drag-and-drop batch processing and auto-update functionality.",
    primaryStack: toStack(["Tauri", "Vue", "Rust"]),
    stack: toStack(["Tauri", "Vue", "TypeScript", "Rust"]),
    impact: "Open-source with 14+ stars on GitHub. Used by astrophotography hobbyists.",
    github: "https://github.com/Ripwords/starnetGUI",
  },
];
