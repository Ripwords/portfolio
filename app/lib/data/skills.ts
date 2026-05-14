export interface Skill {
  label: string;
  icon?: string;
  invertIcon?: boolean;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

const skillIcons: Record<string, string> = {
  TypeScript: "devicon:typescript",
  JavaScript: "devicon:javascript",
  Rust: "devicon:rust",
  Python: "devicon:python",
  Vue: "devicon:vuejs",
  Nuxt: "devicon:nuxt",
  React: "devicon:react",
  Preact: "logos:preact",
  "Next.js": "devicon:nextjs",
  "Tailwind CSS": "devicon:tailwindcss",
  "Three.js": "devicon:threejs",
  "Node.js": "devicon:nodejs",
  NestJS: "devicon:nestjs",
  FastAPI: "devicon:fastapi",
  "AI SDK": "lucide:bot",
  LangGraph: "lucide:workflow",
  Drizzle: "lucide:database-zap",
  PostgreSQL: "devicon:postgresql",
  SQLite: "devicon:sqlite",
  Redis: "devicon:redis",
  MongoDB: "devicon:mongodb",
  Docker: "devicon:docker",
  Linux: "devicon:linux",
  Nginx: "devicon:nginx",
  "GitHub Actions": "devicon:githubactions",
  Git: "devicon:git",
  Bun: "devicon:bun",
  Tauri: "devicon:tauri",
  GraphQL: "lucide:braces",
  Expo: "devicon:expo",
  "Elysia.js": "skill-icons:elysia-light",
  Hono: "logos:hono",
  Mastra: "lucide:sparkles",
  WebSocket: "logos:websocket",
  ElectricSQL: "lucide:refresh-cw",
  "Shadow DOM": "lucide:layers",
  "GitHub Apps": "lucide:github",
  "SDK Design": "lucide:package-check",
  Vitest: "devicon:vitest",
  Playwright: "devicon:playwright",
  Jest: "lucide:flask-conical",
};

const invertIcons = new Set(["WebSocket"]);

function toSkills(names: string[]): Skill[] {
  return names.map((label) => ({
    label,
    icon: skillIcons[label],
    invertIcon: invertIcons.has(label),
  }));
}

export const skills: SkillCategory[] = [
  {
    title: "Languages",
    icon: "lucide:code",
    skills: toSkills(["TypeScript", "JavaScript", "Rust", "Python", "SQL"]),
  },
  {
    title: "Frontend",
    icon: "lucide:layout",
    skills: toSkills([
      "Vue",
      "Nuxt",
      "React",
      "Preact",
      "Next.js",
      "Expo",
      "Tailwind CSS",
      "Three.js",
      "Shadow DOM",
    ]),
  },
  {
    title: "Backend",
    icon: "lucide:server",
    skills: toSkills([
      "Node.js",
      "NestJS",
      "FastAPI",
      "Elysia.js",
      "Hono",
      "Mastra",
      "AI SDK",
      "LangGraph",
      "REST",
      "GraphQL",
      "WebSocket",
    ]),
  },
  {
    title: "Databases",
    icon: "lucide:database",
    skills: toSkills(["PostgreSQL", "SQLite", "Drizzle", "Redis", "MongoDB"]),
  },
  {
    title: "Infrastructure & DevOps",
    icon: "lucide:container",
    skills: toSkills(["Docker", "CI/CD", "Linux", "Nginx", "GitHub Actions", "Bun"]),
  },
  {
    title: "Tools & Practices",
    icon: "lucide:wrench",
    skills: toSkills([
      "Git",
      "TDD",
      "Vitest",
      "Jest",
      "Playwright",
      "Monorepos",
      "SDK Design",
      "GitHub Apps",
      "Tauri",
      "ElectricSQL",
      "PKI/X.509",
    ]),
  },
];
