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
      "Built MyInvois e-invoicing compliance end to end: document validation, PKI signing, and LHDN integration.",
      "Shipped NestJS APIs with role-based access and multi-tenant isolation, plus the team's CI/CD.",
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
      "Ship features for an internal web app used across business units.",
      "Built a cross-platform desktop tool (Tauri, Vue, SQLite) with offline-first background sync.",
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
      "Built a full-stack app for real-time data viz and IoT device control (Nuxt 3, Quasar).",
      "Integrated embedded communication protocols directly with the hardware teams.",
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
