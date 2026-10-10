# g1mishra.dev — Portfolio Rebuild Brief

## Intent

Build a personal site for Jeevan Kumar — software engineer, indie developer, creator.
Story-driven on the surface. Positioning-led underneath. Anyone who lands on it —
recruiter, freelance client, random person from Instagram — should leave feeling like
they know him and trust him. Opportunities come from that trust.

---

## Tech Stack

- **Framework:** Astro (static-first, zero JS by default, React islands where needed)
- **Styling:** Tailwind CSS
- **Deploy:** Vercel
- **Font — Display:** Fraunces (serif, Google Fonts)
- **Font — Body:** Instrument Sans (Google Fonts)
- **Font — Tags/Code labels:** JetBrains Mono (small, subtle use only)

---

## Domain & Project Structure

Each subdomain is a separate project with its own stack and design. They share a domain, not a codebase.

```
g1mishra.dev                → this Astro project (portfolio)
jaapmitra.g1mishra.dev      → separate Next.js project, own design (keep as-is)
blog.g1mishra.dev           → dormant, keep as-is
[app2].g1mishra.dev         → future, same pattern as JaapMitra
```

All subdomain routing handled via Vercel domain config. No changes needed to JaapMitra or blog.

> Note: JaapMitra landing page should have a subtle "by Jeevan Kumar → g1mishra.dev"
> in the footer as the only bridge between the two projects.

---

## Site Structure

```
g1mishra.dev/          → single scroll homepage (everything lives here)
g1mishra.dev/uses      → tools, stack, gear
```

No `/work` page — resume PDF handles full detail.
No `/projects` page — projects live inline on homepage.
No `/contact` page — mailto link only.

---

## Content Management — Single Source of Truth

**All content must live such a way that easily customizable**

This is the only file (or whatever serves as the single source of truth) Jeevan needs to touch when updating anything —
experience, apps, projects, resume link. Components just render from it.

```ts
// src/data/portfolio.ts

export const meta = {
  name: "Jeevan Kumar",
  tagline: "I build products — for startups, for myself, and occasionally for ideas that just won't leave me alone.",
  subline: "Engineer by trade. Indie developer by choice. Based in Punjab, India. Open to work — remote or relocation.",
  availability: true, // toggle green badge on/off
  email: "g1mishra.dev@gmail.com",
  resumeUrl: "/resume.pdf", // host in /public, update path here
}

export const social = {
  github: "https://github.com/g1mishra",
  linkedin: "https://linkedin.com/in/g1mishra",
  twitter: "https://twitter.com/g1mishra",
  becomingjeevan: "https://instagram.com/becomingjeevan",
}

export const modes = [
  {
    label: "Engineer",
    emoji: "💼",
    oneliner: "Hired to build things that matter at speed",
  },
  {
    label: "Builder",
    emoji: "🔨",
    oneliner: "Solo products, end to end, idea to Play Store",
  },
  {
    label: "Creator",
    emoji: "📹",
    oneliner: "Documenting the journey on Becoming Jeevan",
  },
]

export const experience = [
  {
    company: "BuildShip",
    role: "Software Engineer (Contract)",
    period: "2025",
    summary: "20+ AI workflow templates used by thousands of no-code developers",
  },
  {
    company: "EXPIA",
    role: "Full-Stack Engineer",
    period: "2022–2024",
    summary: "Norg.ai dashboard, Automatic Technology frontend",
  },
  {
    company: "Freelance",
    role: "Independent Developer",
    period: "2025–present",
    summary: "Full-stack React MVP for a US-based startup",
  },
]

export const apps = [
  {
    name: "JaapMitra",
    description: "Offline-first spiritual mala counter. 100% free, no ads, no account. Built solo.",
    tags: ["React Native", "Expo", "SQLite"],
    links: {
      playStore: "https://play.google.com/...",
      landing: "https://jaapmitra.g1mishra.dev",
    },
  },
  {
    name: "App 2",
    description: "Coming soon",
    tags: [],
    links: {},
  },
]

export const projects = [
  {
    name: "ByteEat",
    description: "QR-code restaurant ordering. Product, design, and engineering — alone.",
    tags: ["Next.js", "TypeScript", "MongoDB"],
    links: {
      live: "https://byteeat.vercel.app",
      github: "https://github.com/g1mishra/ByteEat",
    },
  },
  {
    name: "Automatic Technology",
    description: "Next.js frontend with Umbraco CMS for a 25-year-old Australian brand.",
    tags: ["Next.js", "Umbraco CMS"],
    links: {
      live: "https://www.automatictechnology.com/au",
    },
  },
  {
    name: "Norg.ai",
    description: "Full chatbot dashboard from scratch. Self-serve AI model training for users.",
    tags: ["React", "TypeScript"],
    links: {}, // internal, no public link
  },
]
```

---

## Homepage Sections (in scroll order)

### 1. Nav
- Logo: `jeevan` — lowercase, no icon, clean
- Links: Work · Apps · Projects · About · Say Hi →
- No hamburger needed

---

### 2. Hero

Availability badge (conditional on `meta.availability`):
> 🟢 Open to work — remote or relocation

Main line (from `meta.tagline`):
> "I build products — for startups, for myself, and occasionally for ideas that just won't leave me alone."

Subline (from `meta.subline`):
> Engineer by trade. Indie developer by choice. Based in Punjab, India. Open to work — remote or relocation.

---

### 3. Three Modes

Rendered from `modes` array.
Identity framing only — no project names, no links.

---

### 4. Experience

Rendered from `experience` array.
Condensed — company, summary, period. One line each.
Resume PDF link at bottom (from `meta.resumeUrl`).

---

### 5. Apps

Rendered from `apps` array.
Small cards — name, description, tags, links.
JaapMitra links to subdomain landing page.

---

### 6. Projects

Rendered from `projects` array.
One-liner + live link where available. No detail pages.

---

### 7. About

Short. Human. Not a bio. Hardcoded — doesn't change often.

> I've been writing code since 2020 — first as a founding engineer at a startup,
> then at a no-code AI platform, now mostly for myself.
>
> I'm currently training for a half marathon, building my second app, and slowly
> documenting all of it on Becoming Jeevan — a project about living intentionally.
>
> I like building things that feel complete. Apps that work offline.
> Products that don't need an account. Code that ships.

---

### 8. Footer

Rendered from `social` object.
Links: GitHub · LinkedIn · Twitter · Becoming Jeevan · Email · Resume PDF
`© Jeevan Kumar · Built with Astro`

---

## /uses Page

Low effort, worth having.
Cover: daily stack, IDE, tools, phone (iPhone 15 Pro Max), gear.
Plain editorial layout — prose/list, no cards.
Hardcoded — update manually when setup changes.

---

## Design Brief

### Aesthetic Direction
Warm editorial. Like a well-designed personal magazine — not a developer tool.
The current site signals "I'm a developer."
The new one should signal "I'm a person who builds things."

### Color Palette
| Token | Value | Use |
|-------|-------|-----|
| Background | `#F7F4EE` | Warm off-white |
| Text | `#1A1814` | Near-black ink |
| Accent | `#E8940A` | Saffron/amber — primary accent |
| Muted | `#8C8880` | Tags, meta, secondary text |

### Typography
| Role | Font | Notes |
|------|------|-------|
| Display / Headings | `Fraunces` | Serif, has personality, feels like a byline |
| Body | `Instrument Sans` | Clean, warm, readable |
| Tags / Code labels | `JetBrains Mono` | Small, subtle use only |

### Motion
- Slow fade-in on scroll for sections
- Hover on project/app items: slight lift + amber underline
- Nothing flashy — nothing that says "look at my website"

---

## Copy Principles

- No buzzwords ("passionate", "innovative", "results-driven")
- No generic opener
- Specific over vague — "1,000+ valuations" not "significant traction"
- Dry, confident tone — like talking to someone at chai, not pitching a VC
- First person throughout

---

## Notes for the AI Agent

- Reference the current portfolio codebase at `github.com/g1mishra/nextfolio`
  to understand existing structure — rewrite in Astro from scratch, do not migrate
- ALL content (experience, apps, projects, resume URL, availability) lives in
  `src/data/portfolio.ts` — components render from this file, nothing is hardcoded
  in components except the About section copy and the /uses page
- Toggling `meta.availability = false` should hide the green badge everywhere
- Resume PDF goes in `/public/resume.pdf` — update `meta.resumeUrl` to point to it
- JaapMitra landing page is a separate project — do not touch it
- Keep all Vercel subdomain routing as-is
- Becoming Jeevan is referenced once in About section only — not a prominent feature
