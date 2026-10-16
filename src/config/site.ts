/**
 * Central source of truth for every destination on the page.
 * Edit URLs here — components only read from this module.
 */

export const SITE = {
  name: "Zenn",
  handle: "ZennLonevyn",
  username: "@zennlonevyn",
  tagline: "Personal Hub",
  bio: "Tinkering with web, building tools, and exploring AI.",
  bioAlt: "Independent developer exploring code, tools, and AI.",
  /** Set to an image path (e.g. "/avatar.jpg") to replace the geometric avatar. */
  avatarImage: null as string | null,
};

/**
 * Live visitor counter.
 * Counts unique browsers (one hit per browser) via the free Abacus counter API
 * (https://abacus.jasoncameron.dev) and re-reads the real number every `pollMs`.
 * Change `namespace` to something unique to you so nobody else shares your counter.
 */
export const VISITORS = {
  namespace: "zenn-link-hub-zl7x",
  key: "visitors",
  /** How often the displayed number is refreshed from the server (ms). */
  pollMs: 10_000,
  /** null = count each browser once, ever. Or a number of hours before the same browser counts again. */
  recountAfterHours: null as number | null,
};

export type BrandKey =
  | "tiktok"
  | "whatsapp"
  | "telegram"
  | "python"
  | "html5"
  | "css3"
  | "javascript"
  | "github"
  | "git"
  | "nodedotjs"
  | "react"
  | "vercel";

export interface Badge {
  label: string;
  tone: "amber" | "cyan";
}

export interface SocialLink {
  id: string;
  brand: BrandKey;
  label: string;
  note: string;
  url: string;
  badge?: Badge;
}

export const SOCIALS: SocialLink[] = [
  {
    id: "tiktok",
    brand: "tiktok",
    label: "TikTok",
    note: "@zennlonevyn",
    url: "https://www.tiktok.com/@zennlonevyn",
    badge: { label: "Follow 🔥", tone: "amber" },
  },
  {
    id: "whatsapp",
    brand: "whatsapp",
    label: "WhatsApp Channel",
    note: "Broadcast updates & announcements",
    url: "https://whatsapp.com/channel/0029Vb8meSp9sBI1MP8jYB3M",
  },
  {
    id: "telegram",
    brand: "telegram",
    label: "Telegram",
    note: "@NancyXi — direct chat",
    url: "https://t.me/NancyXi",
  },
];

export interface Project {
  id: string;
  index: string;
  title: string;
  description: string;
  domain: string;
  url: string;
  icon: "link" | "clipboard" | "nyx";
  badge?: Badge;
}

export const PROJECTS: Project[] = [
  {
    id: "zenn-url",
    index: "01",
    title: "Zenn URL Shortener",
    description: "A personal URL-shortening project.",
    domain: "zenn-url.my.id",
    url: "https://zenn-url.my.id",
    icon: "link",
  },
  {
    id: "zennclip",
    index: "02",
    title: "ZennClip",
    description: "A clipboard-focused web project.",
    domain: "clip.zone.id",
    url: "https://clip.zone.id",
    icon: "clipboard",
  },
  {
    id: "zenn-nyx",
    index: "03",
    title: "ZennNyx AI",
    description: "An AI chatbot project.",
    domain: "z-ai.zone.id",
    url: "https://z-ai.zone.id",
    icon: "nyx",
    badge: { label: "AI Chatbot", tone: "cyan" },
  },
];

export interface TechEntry {
  brand: BrandKey;
  label: string;
}

export const TECH_STACK: TechEntry[] = [
  { brand: "python", label: "Python" },
  { brand: "html5", label: "HTML5" },
  { brand: "css3", label: "CSS3" },
  { brand: "javascript", label: "JavaScript" },
  { brand: "github", label: "GitHub" },
  { brand: "git", label: "Git" },
  { brand: "nodedotjs", label: "Node.js" },
  { brand: "react", label: "React" },
  { brand: "vercel", label: "Vercel" },
];
