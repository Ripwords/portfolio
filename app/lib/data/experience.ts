export interface ExperienceEntry {
  role: string;
  company: string;
  logo: string;
  type: string;
  period: string;
  location: string;
  highlights: string[];
}

export const experience: ExperienceEntry[] = [
  {
    role: "Backend Team Lead",
    company: "Studio20",
    logo: "/img/logo/studio20.jpg",
    type: "Full-time",
    period: "Aug 2025 - Present",
    location: "Kuala Lumpur · Hybrid",
    highlights: [
      "Promoted to lead backend technical direction across compliance, platform, and client-project work; own architecture decisions, code review, and engineering standards for the team.",
      "Set up and maintain shared infrastructure, project scaffolding, CI/CD, and Docker-based deployments across 17+ concurrent client web and mobile builds.",
      "Act as technical point of contact for clients: gather requirements, translate business needs into architecture, and walk non-technical stakeholders through trade-offs.",
      "Mentor backend engineers and drive hands-on delivery on the hardest parts of the stack: digital signing, multi-tenant data isolation, and API design.",
    ],
  },
  {
    role: "Back End Developer",
    company: "Studio20",
    logo: "/img/logo/studio20.jpg",
    type: "Full-time",
    period: "Mar 2024 - Aug 2025",
    location: "Kuala Lumpur · Hybrid",
    highlights: [
      "Built Malaysia's MyInvois e-invoicing compliance system end to end: document validation, PKI digital signing (XML-DSIG / JSON-DSig, X.509), and direct LHDN API integration.",
      "Designed and shipped backend services and REST APIs with NestJS, PostgreSQL, and MongoDB, with role-based access control and multi-tenant data isolation.",
      "Published an open-source npm SDK encapsulating the compliance flow (signing, sliding-window rate limiting, multi-tenant support) for external integrators.",
    ],
  },
  {
    role: "Software Developer",
    company: "ViTrox Corporation Berhad",
    logo: "/img/logo/vitrox.jpg",
    type: "Part-time",
    period: "Feb 2024 - Present",
    location: "Remote",
    highlights: [
      "Build ViTrox's AgriTech platform end to end: a pnpm monorepo pairing a Tauri desktop controller, a Hono sync backend, and a Vue PWA.",
      "Designed the offline-first bidirectional sync engine (local SQLite to ElectricSQL) that keeps field devices and the cloud dashboard consistent over unreliable networks, with debounced auto-sync and token-authenticated shape streams.",
      "Shipped a Raspberry Pi irrigation dashboard: real-time EC, water-level, and flow-sensor monitoring, cron-based scheduling, MQTT/LoRa hardware control, Firebase sync, and Telegram alerts.",
      "Built a versioned schema-migration system so exported device configs upgrade automatically across app versions.",
    ],
  },
  {
    role: "Industrial Trainee",
    company: "ViTrox Corporation Berhad",
    logo: "/img/logo/vitrox.jpg",
    type: "Internship",
    period: "Oct 2023 - Jan 2024",
    location: "Penang · On-site",
    highlights: [
      "Built a full-stack IoT web app for real-time data visualization and device control (Nuxt 3, D3).",
      "Integrated embedded communication protocols directly with the hardware teams on-site.",
    ],
  },
  {
    role: "Data Entry",
    company: "i-SURVY SDN BHD",
    logo: "/img/logo/isurvy.jpg",
    type: "Part-time",
    period: "Feb 2022 - Jul 2024",
    location: "Remote",
    highlights: ["Automated report generation with Python, cutting manual processing time."],
  },
];
