export const sectionLinks = [
  {
    label: "Projects",
    icon: "line-md:document-list",
    to: "#projects",
  },
  {
    label: "Experience",
    icon: "line-md:briefcase",
    to: "#experience",
  },
  {
    label: "Writing",
    icon: "line-md:edit-twotone",
    to: "#writing",
  },
  {
    label: "Contact",
    icon: "line-md:email",
    to: "#contact",
  },
] as const;

export const pageLinks = [
  {
    label: "Astro",
    icon: "line-md:sunny-outline-to-moon-alt-loop-transition",
    to: "/astrophotography",
  },
  {
    label: "Resume",
    icon: "line-md:file-document",
    to: "/resume",
    target: "_blank",
    external: true,
  },
] as {
  label: string;
  icon: string;
  to: string;
  target?: string;
  external?: boolean;
}[];

export const mobileLinks = [
  {
    label: "Home",
    icon: "line-md:home-md-twotone",
    to: "/#hero",
  },
  {
    label: "Projects",
    icon: "line-md:document-list",
    to: "/#projects",
  },
  {
    label: "Experience",
    icon: "line-md:briefcase",
    to: "/#experience",
  },
  {
    label: "Writing",
    icon: "line-md:edit-twotone",
    to: "/#writing",
  },
  {
    label: "Astro",
    icon: "line-md:sunny-outline-to-moon-alt-loop-transition",
    to: "/astrophotography",
  },
] as const;

export const socialLinks = [
  {
    label: "LinkedIn",
    icon: "line-md:linkedin",
    to: "https://www.linkedin.com/in/jjteoh/",
    target: "_blank",
  },
  {
    label: "GitHub",
    icon: "line-md:github-loop",
    to: "https://github.com/Ripwords",
    target: "_blank",
  },
  {
    label: "X",
    icon: "line-md:twitter-x",
    to: "https://x.com/Ripwords_",
    target: "_blank",
  },
  {
    label: "Bluesky",
    icon: "meteor-icons:bluesky",
    to: "https://bsky.app/profile/ripwords.bsky.social",
    target: "_blank",
  },
] as const;
