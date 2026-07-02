export interface Meta {
  name: string;
  tagline: string;
  subline: string;
  availability: boolean;
  email: string;
  resumeUrl: string;
  photoAlt: string;
}

export interface Social {
  github: string;
  linkedin: string;
  twitter: string;
  becomingjeevan: string;
}

export interface Mode {
  label: string;
  emoji: string;
  oneliner: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  summary: string;
}

export interface App {
  name: string;
  description: string;
  tags: string[];
  links: Record<string, string>;
}

export interface Project {
  name: string;
  description: string;
  tags: string[];
  links: Record<string, string>;
}

export const meta: Meta = {
  name: "Jeevan Kumar",
  tagline:
    "I build products for startups, for myself, and occasionally for ideas that just won't leave me alone.",
  subline: "Engineer by trade. Indie developer by choice. Based in India.",
  availability: true,
  email: "g1mishra.dev@gmail.com",
  resumeUrl: "/resume.pdf",
  photoAlt: "Jeevan Kumar, Software Engineer and Creator",
};

export const social: Social = {
  github: "https://github.com/g1mishra",
  linkedin: "https://linkedin.com/in/g1mishra",
  twitter: "https://twitter.com/g1mishra",
  becomingjeevan: "https://instagram.com/becomingjeevan",
};

export const modes: Mode[] = [
  {
    label: "Engineer",
    emoji: "💼",
    oneliner: "Hired to build things that matter at speed",
  },
  {
    label: "Builder",
    emoji: "🔨",
    oneliner: "Shipping solo products from zero to launch",
  },
  {
    label: "Creator",
    emoji: "📹",
    oneliner: "Documenting the journey of building a life",
  },
];

export const experience: Experience[] = [
  {
    company: "Freelance & Independent",
    role: "Software Engineer",
    period: "2025–present",
    summary:
      "Delivered a patient and inventory management MVP for a US healthcare startup using React, TypeScript, Tailwind, React Query. Independently building and shipping JaapMitra, a spiritual utility app live on Play Store with offline-first architecture.",
  },
  {
    company: "BuildShip",
    role: "Software Engineer (Contract)",
    period: "2025",
    summary:
      "Engineered 20+ production AI workflow templates (Gmail, Calendar, Linear, RAG systems) used by thousands of no-code developers to ship backends without writing code.",
  },
  {
    company: "EXPIA",
    role: "Full-Stack Engineer",
    period: "2022–2024",
    summary:
      "Built the Norg.ai chatbot dashboard from scratch in TypeScript and React, enabling self-serve AI model training. Also delivered the Next.js frontend for automatictechnology.com, a 25-year-old Australian hardware brand, integrated with Umbraco CMS.",
  },
  {
    company: "Intellemo",
    role: "Frontend Engineer",
    period: "2022",
    summary:
      "Migrated the company site to Next.js SSR, tripling SEO visibility in a month. Shipped a form builder from scratch, two weeks ahead of schedule, earning Hero of the Month.",
  },
  {
    company: "Mobilicis / Mobiru India",
    role: "Founding Engineer",
    period: "2020–2022",
    summary:
      "Built a mobile price-comparison platform solo from scratch with React + Django, custom scrapers pulling real-time data from 10+ e-commerce sites. Co-launched oruphones.com, which processed 1,000+ trade-in valuations in its first phase.",
  },
];

export const apps: App[] = [
  {
    name: "JaapMitra",
    description:
      "A digital mala counter for daily naam jaap, built for people who actually do the practice. Volume button counting, custom malas, streaks, smart reminders. No account, no ads, works offline. Built solo.",
    tags: ["React Native", "Expo", "SQLite"],
    links: {
      playStore: "https://play.google.com/store/apps/details?id=com.g1mishra.jaapmitra",
      landing: "https://jaapmitra.jeevanmishra.in",
    },
  },
  {
    name: "Saarthi",
    description:
      "When you feel lost. Your digital Gita jar. Pull divine guidance from Krishna when you feel anxious, confused, or overwhelmed. Choose an emotion, receive curated Bhagavad Gita wisdom, and reflect.",
    tags: ["React Native", "Next.js", "Expo"],
    links: {
      playStore: "https://play.google.com/store/apps/details?id=com.g1mishra.saarthi",
      landing: "https://trysaarthi.in/",
    },
  },
];

export const projects: Project[] = [
  {
    name: "ByteEat",
    description:
      "QR-code ordering system for restaurants. Scan, browse, order, pay, no app download needed. Built solo as founder: product, design, and engineering.",
    tags: ["Next.js", "TypeScript", "MongoDB", "Node.js"],
    links: {
      live: "https://byteeat.vercel.app",
      github: "https://github.com/g1mishra/ByteEat",
    },
  },
  {
    name: "Automatic Technology",
    description:
      "Frontend for a 25-year-old Australian garage door brand, built with Next.js and Umbraco CMS, multi-region site serving AU and US markets.",
    tags: ["Next.js", "Umbraco CMS"],
    links: {
      live: "https://www.automatictechnology.com/au",
    },
  },
  {
    name: "Norg.ai",
    description:
      "Full dashboard for an AI chatbot platform, built from scratch in TypeScript and React, letting users train and manage their own AI assistants without touching code.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Python"],
    links: {},
  },
];
