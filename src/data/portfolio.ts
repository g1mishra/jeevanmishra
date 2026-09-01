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

export interface ThirdParty {
  name: string;
  purpose: string;
  policyUrl: string;
}

/**
 * Drives the generated privacy policy at /apps/<slug>/privacy.
 * Only apps whose pages are hosted on this site carry one — apps with their
 * own domain (JaapMitra, Saarthi) publish their policy there instead.
 */
export interface AppPrivacy {
  effective: string;
  summary: string;
  collectsPersonalData: boolean;
  requiresAccount: boolean;
  worksOffline: boolean;
  /** What the app writes to the device, staying on the device. */
  onDeviceData: string[];
  advertising: { network: string; policyUrl: string; note: string } | null;
  /** Crash / diagnostic reports that LEAVE the device. Null means none are sent. */
  diagnostics: { service: string; policyUrl: string; note: string; retention: string } | null;
  permissions: { name: string; reason: string }[];
  childDirected: boolean;
  thirdParties: ThirdParty[];
}

export interface App {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  tags: string[];
  /** Shown in the Apps section of the homepage. Unfeatured apps still get pages. */
  featured: boolean;
  status: "live" | "coming-soon";
  /**
   * True when this app's pages are built by this repo. A hosted app is served
   * at <slug>.jeevanmishra.in (see vercel.json) and that subdomain is its
   * canonical address. False means the app keeps its own site elsewhere.
   */
  hosted: boolean;
  packageName?: string;
  features?: string[];
  links: Record<string, string>;
  privacy?: AppPrivacy;
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
    slug: "jaapmitra",
    tagline: "A digital mala counter for daily naam jaap.",
    description:
      "A digital mala counter for daily naam jaap, built for people who actually do the practice. Volume button counting, custom malas, streaks, smart reminders. No account, no ads, works offline. Built solo.",
    tags: ["React Native", "Expo", "SQLite"],
    featured: true,
    status: "live",
    hosted: false,
    packageName: "com.g1mishra.jaapmitra",
    links: {
      playStore: "https://play.google.com/store/apps/details?id=com.g1mishra.jaapmitra",
      landing: "https://jaapmitra.jeevanmishra.in",
    },
  },
  {
    name: "Saarthi",
    slug: "saarthi",
    tagline: "Your digital Gita jar, for when you feel lost.",
    description:
      "When you feel lost. Your digital Gita jar. Pull divine guidance from Krishna when you feel anxious, confused, or overwhelmed. Choose an emotion, receive curated Bhagavad Gita wisdom, and reflect.",
    tags: ["React Native", "Next.js", "Expo"],
    featured: true,
    status: "live",
    hosted: false,
    packageName: "com.g1mishra.saarthi",
    links: {
      playStore: "https://play.google.com/store/apps/details?id=com.g1mishra.saarthi",
      landing: "https://trysaarthi.in/",
    },
  },
  {
    name: "Pachisi",
    slug: "pachisi",
    tagline: "The Indian cowrie-shell board game, played by its real rules.",
    description:
      "Pachisi is the game Ludo was flattened out of, and this is the original: six cowrie shells instead of a die, castles instead of a protected home lane, pieces that pair up and travel as one. Play offline against AI opponents, on a board that keeps the rules the West left behind.",
    tags: ["React Native", "Expo", "TypeScript"],
    featured: false,
    status: "coming-soon",
    hosted: true,
    packageName: "com.g1mishra.pachisi",
    features: [
      "Six cowrie shells, thrown the way the game was actually played — no dice, no Ludo shortcuts. All six down is a 25, one up is a 10, and both throw again.",
      "The real ruleset: castles, grace throws, and doubled pieces that must move as a single unit.",
      "Offline AI opponents at three difficulties. No account, no internet, no waiting for a lobby to fill.",
      "Save a match mid-game and pick it up exactly where you left it.",
      "Hand-drawn board, cloth and embroidery, built to be looked at.",
    ],
    links: {},
    privacy: {
      effective: "2026-08-21",
      summary:
        "Pachisi is an offline game. It has no accounts, no sign-in, and no servers of mine — I never receive any information about you. The only data that leaves your device is what Google's ad service collects to show ads, and a crash report if the app stops working.",
      collectsPersonalData: false,
      requiresAccount: false,
      worksOffline: true,
      onDeviceData: [
        "Your saved game (board position, whose turn it is, and the move history needed to resume it)",
        "Your settings, such as sound and haptics preferences",
      ],
      advertising: {
        network: "Google AdMob",
        policyUrl: "https://policies.google.com/technologies/ads",
        note:
          "Ads are served by Google AdMob. To show them, Google's SDK may collect your device's Advertising ID along with technical device and ad-interaction information. This happens inside Google's SDK — I never see or store it.",
      },
      diagnostics: {
        service: "Google Firebase Crashlytics",
        policyUrl: "https://firebase.google.com/support/privacy",
        note:
          "If the app crashes, a diagnostic report is sent to Google Firebase Crashlytics so I can find the fault and fix it. The report describes the failure — the error, the stack trace, your device model and operating system version, and which build of the app you were running — along with a random installation identifier Google generates for the app on your device. It carries no name, no email address, no contact detail, and nothing about how you play.",
        retention:
          "Crash reports sent to Google Firebase Crashlytics are governed by Google's retention policies; Crashlytics deletes individual reports after 90 days.",
      },
      permissions: [
        {
          name: "Internet access",
          reason:
            "Used to load ads and to send a crash report if the app stops working. Every part of the game itself works with no connection.",
        },
        {
          name: "Vibration",
          reason: "Used for haptic feedback when you throw the cowries or move a piece.",
        },
      ],
      childDirected: false,
      thirdParties: [
        {
          name: "Google AdMob",
          purpose: "Serving ads inside the app",
          policyUrl: "https://policies.google.com/privacy",
        },
        {
          name: "Google Firebase Crashlytics",
          purpose: "Reporting crashes so they can be fixed",
          policyUrl: "https://firebase.google.com/support/privacy",
        },
      ],
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

/** Canonical origin of the portfolio itself. */
export const SITE_URL = "https://jeevanmishra.in";

/**
 * Canonical origin of a hosted app: pachisi -> https://pachisi.jeevanmishra.in
 * vercel.json rewrites that host onto /apps/<slug>, so a new app needs nothing
 * beyond an entry here and its subdomain pointed at this project.
 */
export function appOrigin(app: App): string {
  return `https://${app.slug}.jeevanmishra.in`;
}

/** Where an app actually lives on the web — its subdomain, or its own site. */
export function appUrl(app: App): string {
  if (app.hosted) return `${appOrigin(app)}/`;
  return app.links.landing ?? app.links.playStore ?? `${SITE_URL}/apps`;
}

/**
 * Prefix for links between one app's own pages. Empty in production, because
 * the subdomain serves them at its root; /apps/<slug> in dev, where there is
 * no subdomain to be served from.
 */
export function appBase(app: App): string {
  return import.meta.env.DEV ? `/apps/${app.slug}` : "";
}
