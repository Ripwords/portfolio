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
    period: "Jul 2025 – Present",
    location: "Kuala Lumpur · Hybrid",
    highlights: [
      "Lead engineer for the Singapore Business Federation's Future Readiness Index - a portal where Singapore companies assess their business readiness; built with Next.js, ElysiaJS and PostgreSQL on AWS.",
      "Load-tested the portal with k6 before launch, fixed eight bottlenecks, and presented the results to the client; took it through a third-party pentest and closed every finding before launch.",
      "Designed and built a white-label AI knowledge assistant - a RAG product over a client's own documents, mixing vector and keyword search so answers cite the right source; runs on OpenAI, Anthropic, Gemini or DeepSeek.",
      "Act as technical point of contact for clients - scope requirements, write proposals, and walk business stakeholders through trade-offs.",
      "Mentor backend engineers and run interviews; set up the project template and CI/CD pipeline used across client projects, with checks that block unsafe database migrations.",
    ],
  },
  {
    role: "Backend Developer",
    company: "Studio20",
    logo: "/img/logo/studio20.jpg",
    type: "Full-time",
    period: "Mar 2024 – Jul 2025",
    location: "Kuala Lumpur · Hybrid",
    highlights: [
      "Built Malaysia's LHDN e-invoicing into a hotel group's booking and point-of-sale systems; traced recurring production freezes to an exhausted database connection pool and fixed them.",
      "Published an open-source TypeScript client for the LHDN e-invoicing API, with per-endpoint rate limiting; in production on client projects.",
    ],
  },
  {
    role: "Software Developer",
    company: "ViTrox Agritech Sdn. Bhd.",
    logo: "/img/logo/vitrox.jpg",
    type: "Part-time",
    period: "Jan 2024 – Present",
    location: "Remote",
    highlights: [
      "Built a desktop app that works offline at 3+ customer sites and syncs with the cloud web app when the connection returns, without overwriting edits made online in the meantime; built with Tauri and SQLite.",
      "Set up release channels so each customer site only gets updates after they are approved.",
    ],
  },
  {
    role: "Industrial Trainee",
    company: "ViTrox Corporation Berhad",
    logo: "/img/logo/vitrox.jpg",
    type: "Internship",
    period: "Oct 2023 – Jan 2024",
    location: "Penang · On-site",
    highlights: ["Built an IoT dashboard in Nuxt 3 for live sensor data and device control."],
  },
  {
    role: "Data Entry",
    company: "i-SURVY SDN BHD",
    logo: "/img/logo/isurvy.jpg",
    type: "Part-time",
    period: "Feb 2022 – Jul 2024",
    location: "Remote",
    highlights: ["Automated report generation with Python, cutting manual processing time."],
  },
];
