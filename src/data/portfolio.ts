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
 * An SDK inside the app that sends data off the device. `collects` is the
 * same list that goes on the Play Console Data safety form: the policy and
 * the form have to be written from one list, or app review finds the gap.
 */
export interface AppService extends ThirdParty {
  /** What leaves the device, one row per Data safety category. */
  collects: string[];
  /** Body copy for the service's own section of the policy. */
  note: string;
  /** How long the service keeps what it receives. */
  retention?: string;
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
  /**
   * Where questions go. Must equal the support address the app itself uses
   * (SUPPORT_EMAIL in the app repo's src/services/links.ts): the app, the
   * store listing and this policy name one contact, or the policy contradicts
   * the app it describes.
   */
  contactEmail: string;
  /** What the app writes to the device, staying on the device. */
  onDeviceData: string[];
  /** Ad network. Null means the app shows no ads. */
  advertising: AppService | null;
  /** Crash / diagnostic reports that LEAVE the device. Null means none are sent. */
  diagnostics: AppService | null;
  /** Product analytics. Null means the app measures nothing. */
  analytics: AppService | null;
  permissions: { name: string; reason: string }[];
  childDirected: boolean;
  /** Anything else that receives data, beyond the three slots above. */
  thirdParties: ThirdParty[];
}

/** A two-column table inside an app section, e.g. the Pachisi throw values. */
export interface AppTable {
  columns: [string, string];
  rows: [string, string][];
}

/** A free-form content block on an app page, rendered in order. */
export interface AppSection {
  heading: string;
  lead?: string;
  table?: AppTable;
  bullets?: string[];
  note?: string;
}

/**
 * A phone screenshot on an app page. `file` names an image in
 * src/assets/apps/, which the page resolves so Astro can optimise it.
 */
export interface AppShot {
  file: string;
  alt: string;
}

/** Rendered as a list and emitted as FAQPage JSON-LD. */
export interface AppFaq {
  question: string;
  answer: string;
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
  /** App icon in src/assets/apps/, shown beside the name in the page hero. */
  icon?: string;
  /** Wide image anchoring the app page hero, from src/assets/apps/. */
  heroImage?: AppShot;
  /** Store artwork for the app page gallery, from src/assets/apps/. */
  screenshots?: AppShot[];
  /** Short factual chips under the hero buttons, e.g. "Works offline". */
  highlights?: string[];
  /** Social preview image in public/. Falls back to the site-wide card. */
  ogImage?: string;
  /** schema.org applicationCategory, e.g. "GameApplication". */
  appCategory?: string;
  links: Record<string, string>;
  /** Overrides the title and meta description derived from name and tagline. */
  seo?: { title: string; description: string };
  /** Opening paragraph on the app page. Falls back to description. */
  lead?: string;
  /** Content blocks below the feature list. */
  sections?: AppSection[];
  faq?: AppFaq[];
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
    seo: {
      title: "Pachisi — the Indian original, played by its real rules",
      description:
        "The game Ludo was flattened out of — Chaupar, Chausar, Pachisi. Six cowrie shells, castles, doubled pieces, and an exact count home. Free, offline, in English and हिन्दी.",
    },
    lead:
      "Pachisi is the game Ludo was flattened out of, and this is the original. Six cowrie shells instead of a die. Castles instead of a protected home lane. Pieces that pair up and travel as one. Play it offline against three levels of computer opponent, or pass the phone around for two or four players — on a board that keeps the rules the West left behind.",
    tags: ["React Native", "Expo", "TypeScript"],
    featured: false,
    status: "live",
    hosted: true,
    packageName: "com.g1mishra.pachisi",
    icon: "pachisi-icon.png",
    ogImage: "/pachisi-og.jpg",
    appCategory: "GameApplication",
    highlights: ["Free, with ads", "No account", "Works offline", "English & हिन्दी"],
    heroImage: {
      file: "pachisi-board.jpg",
      alt: "An embroidered cloth Pachisi board laid on dark cloth, with wooden pawns, a brass lamp and cowrie shells.",
    },
    screenshots: [
      {
        file: "pachisi-cloth.jpg",
        alt: "The full cloth board, captioned \"India's game. Not Ludo.\"",
      },
      {
        file: "pachisi-twenty-five.jpg",
        alt: "Six cowrie shells falling into a brass dish: no shell mouth-up counts twenty-five.",
      },
      {
        file: "pachisi-castle.jpg",
        alt: "A pawn safe on a marked castle square, out of reach of the pawn behind it.",
      },
      {
        file: "pachisi-capture.jpg",
        alt: "A pawn landing on an exact count and sending an opponent's pawn home.",
      },
      {
        file: "pachisi-doubled-piece.jpg",
        alt: "Two pawns of one colour locked together on a square, travelling as a single piece.",
      },
      {
        file: "pachisi-lesson.jpg",
        alt: "The in-app lesson highlighting a pawn, on step two of five: throw the shells.",
      },
      {
        file: "pachisi-players.jpg",
        alt: "The board ringed by four seats, and a choice of one, two or four players.",
      },
      {
        file: "pachisi-offline.jpg",
        alt: "The board beside a brass lamp: no account, no internet, ever.",
      },
    ],
    sections: [
      {
        heading: "How a throw works",
        table: {
          columns: ["Shells landing mouth-up", "You move"],
          rows: [
            ["2, 3, 4, 5 or 6", "that many"],
            ["1", "10 — throw again"],
            ["0", "25 — the pachis the game is named for — throw again"],
          ],
        },
        note: "A 6, 10 or 25 is a grace: another throw, and a new pawn may enter. Throws stack up and are spent one at a time, each moving one pawn. Three identical graces in a row and the whole turn is wiped.",
      },
      {
        heading: "What's inside",
        bullets: [
          "Six cowrie shells, thrown the way the game was actually played — no dice, no Ludo shortcuts.",
          "The real ruleset: castles, grace throws, and doubled pieces that must move as a single unit.",
          "Offline computer opponents at three difficulties. No account, no internet, no lobby to wait for.",
          "Two players or four on one phone, in classic teams — everyone's name and numbers turn to face their own side of the board.",
          "A five-lesson course played on the real board, not a wall of text — shells, castles, capture, the road home, doubled pieces.",
          "English and हिन्दी.",
          "Save mid-match and pick it up exactly where you left it.",
          "Every colour also has its own shape, so the board reads without relying on colour.",
        ],
      },
      {
        heading: "Isn't this just Ludo?",
        lead: "Ludo is a Victorian simplification of Pachisi, patented in England in 1896 with most of the game taken out. Here's what came back:",
        bullets: [
          "Shells, not a die. Six cowries give 2–6, 10 and 25 — a spread no die can make.",
          "No protected home lane. Ludo gives you a corridor nothing can touch; Pachisi gives you castles instead.",
          "Castles. Marked squares where a pawn simply cannot be taken.",
          "Doubled pieces. Two of your pawns on one square lock together and move as one — and only a pair or better can take them.",
          "An exact count home. You cannot overshoot; the last square before home is a trap that no throw can leave.",
          "Counter-clockwise, the way it has always been played.",
        ],
      },
    ],
    faq: [
      {
        question: "Is it free?",
        answer: "Yes, supported by ads. No purchases, no subscriptions.",
      },
      {
        question: "Does it need internet?",
        answer: "No. Every mode works fully offline; ads simply don't load.",
      },
      {
        question: "Can I play with friends?",
        answer:
          "Two or four players on one device, passing the phone around. Four players play as two teams of two.",
      },
      {
        question: "Is there online multiplayer?",
        answer:
          "Not yet. Room play — a private room you open and share with a friend, so you can play from different phones — is the next thing I'm building. It has no date yet; the Play Store listing is where it will turn up first.",
      },
      {
        question: "I don't know the rules.",
        answer:
          "The app teaches them in about three minutes, on a real board, one move at a time.",
      },
      {
        question: "Can I play in Hindi?",
        answer: "Yes. The game is translated in full — English and हिन्दी.",
      },
      {
        question: "Does it save my game?",
        answer:
          "Yes. Leave in the middle of a match and the home screen offers to resume it, on the same turn you left.",
      },
      {
        question: "How hard are the computer opponents?",
        answer:
          "Three strengths — easy, medium and hard — picked when you start a new game.",
      },
      {
        question: "I find the colours hard to tell apart.",
        answer:
          "Every colour also carries its own shape, so the board can be read without relying on colour at all.",
      },
    ],
    links: {
      playStore: "https://play.google.com/store/apps/details?id=com.g1mishra.pachisi",
    },
    privacy: {
      effective: "2026-09-12",
      summary:
        "Pachisi is an offline game. It has no account, no sign-in, and no servers of mine, so I never receive anything that identifies you and there is nothing of yours for me to delete. Three Google SDKs inside the app do send data to Google: AdMob to show ads, Crashlytics to report a crash, and Google Analytics for Firebase to tell me how the game is played. This page names each one, what it receives, how long it is kept, and how you can limit it.",
      collectsPersonalData: false,
      requiresAccount: false,
      worksOffline: true,
      contactEmail: "g1mishra.dev@gmail.com",
      onDeviceData: [
        "Your saved game (board position, whose turn it is, and the move history needed to resume it)",
        "Your settings: sound, haptics, language, and the last mode, seat count and difficulty you picked",
        "Your lifetime record against the computer, and which lessons you have finished",
      ],
      advertising: {
        name: "Google AdMob",
        purpose: "Showing ads",
        policyUrl: "https://policies.google.com/technologies/ads",
        collects: [
          "Your device's Advertising ID",
          "Ad interactions: which ads were shown, viewed or tapped",
          "Approximate location, worked out by Google from your IP address",
          "Technical details of your device and the app, such as model, OS version and build",
        ],
        note:
          "Ads are served by Google AdMob, through the Google Mobile Ads SDK. To show them, the SDK sends Google your device's Advertising ID, technical details about your device and the app, and which ads were shown, viewed or tapped. Google also works out an approximate location, roughly to the city, from the IP address of your connection; the app itself never asks for location permission. Ad content is limited to Google's teen rating and no user is treated as a child. All of this happens inside Google's SDK: I never see or store it, and Google shares it with its advertising partners under its own terms.",
      },
      diagnostics: {
        name: "Google Firebase Crashlytics",
        purpose: "Reporting crashes",
        policyUrl: "https://firebase.google.com/support/privacy",
        collects: [
          "Crash logs and stack traces",
          "Device model, operating system version and app build",
          "A random installation identifier Google generates for the app on your device",
        ],
        note:
          "If the app crashes, a diagnostic report is sent to Google Firebase Crashlytics so I can find the fault and fix it. The report describes the failure: the error, the stack trace, your device model and operating system version, and which build of the app you were running, along with a random installation identifier Google generates for the app on your device. It carries no name, no email address, no contact detail, and nothing about how you play.",
        retention:
          "Crashlytics deletes individual crash reports after 90 days.",
      },
      analytics: {
        name: "Google Analytics for Firebase",
        purpose: "Measuring how the game is played",
        policyUrl: "https://firebase.google.com/support/privacy",
        collects: [
          "An app-instance id: a random identifier for this installation of the app, not for you",
          "App interactions: a game starting, ending or being abandoned, the mode and difficulty, a lesson finished or left, whether a game-end ad appeared, frame timing, and the screens visited",
          "Device model, operating system version, the language the app is showing, and app build",
          "Approximate location, worked out by Google from your IP address",
        ],
        note:
          "The app uses Google Analytics for Firebase to answer a handful of questions about how the game is played: whether matches get finished, which mode and difficulty people choose, whether the lessons get completed, how often a game-end ad actually appeared, and whether the board drops frames on a given phone. Seven events in all, plus the screens visited, the language the app is speaking and which build you are on. The SDK also records installs, sessions, updates and uninstalls on its own, and, when an ad is shown, that it was shown and roughly what it earned. Every event is tied to an app-instance id, a random identifier the SDK creates for this installation; it identifies the installation, not you, and a fresh one is issued if you reinstall. Google also derives an approximate location from the IP address. The Advertising ID is deliberately not collected for analytics, so this data cannot be joined to the advertising profile above. Individual throws and moves are never logged.",
        retention:
          "Google Analytics keeps the app-instance id and the events tied to it for 14 months, then deletes them automatically. Aggregated figures, such as how many matches were finished in a month, outlive that, but describe no individual device.",
      },
      permissions: [
        {
          name: "Internet access",
          reason:
            "Used to load ads, to send a crash report if the app stops working, and to send the analytics events described above. Every part of the game itself works with no connection.",
        },
        {
          name: "Vibration",
          reason: "Used for haptic feedback when you throw the cowries or move a piece.",
        },
      ],
      childDirected: false,
      thirdParties: [],
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
