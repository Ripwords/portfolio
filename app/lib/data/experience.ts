export interface ExperienceEntry {
  role: string
  company: string
  logo: string
  type: string
  period: string
  location: string
  highlights: string[]
}

export const experience: ExperienceEntry[] = [
  {
    role: 'Back End Developer',
    company: 'Studio20',
    logo: '/img/logo/studio20.jpg',
    type: 'Full-time',
    period: 'Mar 2024 — Present',
    location: 'Bangsar, Kuala Lumpur · Hybrid',
    highlights: [
      'Built e-invoicing compliance system (MyInvois) with document validation, PKI digital signing, and API integration with LHDN',
      'Developed backend services and REST APIs using NestJS with PostgreSQL and MongoDB',
      'Implemented role-based access control and multi-tenant data isolation for internal platform',
      'Set up CI/CD pipelines and established code review workflows for the backend team',
    ],
  },
  {
    role: 'Software Developer',
    company: 'ViTrox Corporation Berhad',
    logo: '/img/logo/vitrox.jpg',
    type: 'Part-time',
    period: 'Feb 2024 — Present',
    location: 'Remote',
    highlights: [
      'Maintain and ship features for internal web application used across business units',
      'Built cross-platform desktop application for user management using Tauri, Vue, and SQLite',
      'Implemented offline-first data handling with background sync for desktop tooling',
    ],
  },
  {
    role: 'Industrial Trainee',
    company: 'ViTrox Corporation Berhad',
    logo: '/img/logo/vitrox.jpg',
    type: 'Internship',
    period: 'Oct 2023 — Jan 2024',
    location: 'Penang, Malaysia · On-site',
    highlights: [
      'Built full-stack web application for real-time data visualization and IoT device control',
      'Implemented frontend with Nuxt 3, Quasar, and Tailwind CSS connected to device APIs',
      'Worked directly with hardware teams to integrate embedded communication protocols',
    ],
  },
  {
    role: 'Data Entry',
    company: 'i-SURVY SDN BHD',
    logo: '/img/logo/isurvy.jpg',
    type: 'Part-time',
    period: 'Feb 2022 — Jul 2024',
    location: 'Malaysia · Remote',
    highlights: [
      'Automated report generation workflows using Python scripts and Excel templates',
      'Reduced manual data processing time through scripted pipelines',
    ],
  },
]
