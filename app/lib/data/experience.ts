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
    role: "Back End Developer",
    company: "Studio20",
    logo: "/img/logo/studio20.jpg",
    type: "Full-time",
    period: "Mar 2024 - Present",
    location: "Kuala Lumpur · Hybrid",
    highlights: [
      "Set up and maintain shared infrastructure, project scaffolding, and CI/CD across 17+ concurrent client web and mobile builds.",
      "Maintain the studio's internal core that new client projects are bootstrapped from, keeping auth, API, and UI foundations consistent.",
      "Run client requirement and delivery meetings, then coordinate scope and hand-off across the development team.",
      "Delivered MyInvois e-invoicing compliance end to end: document validation, PKI digital signing, and LHDN submission.",
      "Shipped NestJS APIs with role-based access and multi-tenant isolation on a typed, self-hosted stack.",
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
