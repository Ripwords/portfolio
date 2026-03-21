export interface Skill {
  label: string
  icon?: string
  invertIcon?: boolean
}

export interface SkillCategory {
  title: string
  icon: string
  skills: Skill[]
}

const skillIcons: Record<string, string> = {
  'TypeScript': 'devicon:typescript',
  'JavaScript': 'devicon:javascript',
  'Rust': 'devicon:rust',
  'Python': 'devicon:python',
  'Vue': 'devicon:vuejs',
  'Nuxt': 'devicon:nuxt',
  'React': 'devicon:react',
  'Next.js': 'devicon:nextjs',
  'Tailwind CSS': 'devicon:tailwindcss',
  'Three.js': 'devicon:threejs',
  'Node.js': 'devicon:nodejs',
  'NestJS': 'devicon:nestjs',
  'PostgreSQL': 'devicon:postgresql',
  'SQLite': 'devicon:sqlite',
  'Redis': 'devicon:redis',
  'MongoDB': 'devicon:mongodb',
  'Docker': 'devicon:docker',
  'Linux': 'devicon:linux',
  'Nginx': 'devicon:nginx',
  'GitHub Actions': 'devicon:githubactions',
  'Git': 'devicon:git',
  'Tauri': 'devicon:tauri',
  'GraphQL': 'vscode-icons:file-type-graphql',
  'Expo': 'devicon:expo',
  'Elysia.js': 'skill-icons:elysia-light',
  'Hono': 'logos:hono',
  'WebSocket': 'logos:websocket',
  'MQTT': 'ix:mqtt',
  'Vitest': 'devicon:vitest',
  'Playwright': 'devicon:playwright',
  'Jest': 'devicon-plain:jest',
}

const invertIcons = new Set(['WebSocket'])

function toSkills(names: string[]): Skill[] {
  return names.map(label => ({ label, icon: skillIcons[label], invertIcon: invertIcons.has(label) }))
}

export const skills: SkillCategory[] = [
  {
    title: 'Languages',
    icon: 'lucide:code',
    skills: toSkills(['TypeScript', 'JavaScript', 'Rust', 'Python', 'SQL']),
  },
  {
    title: 'Frontend',
    icon: 'lucide:layout',
    skills: toSkills(['Vue', 'Nuxt', 'React', 'Next.js', 'Expo', 'Tailwind CSS', 'Three.js']),
  },
  {
    title: 'Backend',
    icon: 'lucide:server',
    skills: toSkills(['Node.js', 'NestJS', 'Elysia.js', 'Hono', 'REST', 'GraphQL', 'WebSocket']),
  },
  {
    title: 'Databases',
    icon: 'lucide:database',
    skills: toSkills(['PostgreSQL', 'SQLite', 'Redis', 'MongoDB']),
  },
  {
    title: 'Infrastructure & DevOps',
    icon: 'lucide:container',
    skills: toSkills(['Docker', 'CI/CD', 'Linux', 'Nginx', 'GitHub Actions']),
  },
  {
    title: 'Tools & Practices',
    icon: 'lucide:wrench',
    skills: toSkills(['Git', 'TDD', 'Vitest', 'Jest', 'Playwright', 'Monorepos', 'Tauri', 'MQTT', 'PKI/X.509']),
  },
]
