export interface StackItem {
  label: string
  icon?: string
}

export interface Project {
  id: string
  title: string
  problem: string
  approach: string
  stack: StackItem[]
  impact: string
  github?: string
}

const techIcons: Record<string, string> = {
  'TypeScript': 'devicon:typescript',
  'Node.js': 'devicon:nodejs',
  'SQLite': 'devicon:sqlite',
  'Docker': 'devicon:docker',
  'React': 'devicon:react',
  'Next.js': 'devicon:nextjs',
  'NestJS': 'devicon:nestjs',
  'PostgreSQL': 'devicon:postgresql',
  'Redis': 'devicon:redis',
  'Tauri': 'devicon:tauri',
  'Vue': 'devicon:vuejs',
  'Rust': 'devicon:rust',
  'Nuxt': 'devicon:nuxt',
  'Three.js': 'devicon:threejs',
  'Tailwind CSS': 'devicon:tailwindcss',
  'MQTT': 'ix:mqtt',
}

function toStack(techs: string[]): StackItem[] {
  return techs.map(label => ({ label, icon: techIcons[label] }))
}

export const projects: Project[] = [
  {
    id: 'edge-sync',
    title: 'Edge Device Sync Engine',
    problem: 'Field devices in low-connectivity environments needed reliable bidirectional data sync with cloud.',
    approach: 'Built conflict-resolution engine with offline-first architecture, CRDT-inspired merge strategies, and queue-based sync protocol.',
    stack: toStack(['TypeScript', 'Node.js', 'SQLite', 'MQTT', 'Docker', 'Tauri']),
    impact: 'Enabled reliable operation in environments with <30% uptime connectivity.',
  },
  {
    id: 'e-invoicing',
    title: 'E-Invoicing Compliance System',
    problem: 'Malaysian e-invoicing mandate (MyInvois) required tax-compliant document generation and submission.',
    approach: 'Built end-to-end pipeline: document validation, digital signing, API integration with tax authority, and automated retry/error handling.',
    stack: toStack(['TypeScript', 'NestJS', 'PostgreSQL', 'Redis', 'PKI/X.509']),
    impact: 'Achieved compliance ahead of mandate deadline with zero manual intervention.',
  },
  {
    id: 'starnet-gui',
    title: 'StarnetGUI',
    problem: 'Starnet++ is a powerful star removal tool for astrophotography, but it only has a CLI — making it inaccessible for most hobbyists.',
    approach: 'Built a cross-platform desktop GUI that wraps the Starnet++ CLI with drag-and-drop image handling, real-time previews, and batch processing.',
    stack: toStack(['Tauri', 'Vue', 'TypeScript']),
    impact: 'Open-source with 14+ stars on GitHub. Used by astrophotography hobbyists.',
    github: 'https://github.com/Ripwords/starnetGUI',
  },
  {
    id: 'traverse',
    title: 'Traverse',
    problem: 'Needed a minimal, always-on-top notepad with adjustable transparency for quick notes while working.',
    approach: 'Built a lightweight desktop app with window transparency controls, always-on-top mode, and a distraction-free writing interface.',
    stack: toStack(['Tauri', 'Vue', 'TypeScript']),
    impact: 'Open-source utility app for personal productivity.',
    github: 'https://github.com/Ripwords/Traverse',
  },
]
