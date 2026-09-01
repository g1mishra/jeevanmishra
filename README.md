# jeevanmishra.in (v2) 🚀

This repository houses the second iteration of my personal portfolio and product showcase. Built to be modern, incredibly fast, and lightweight, it acts as a central hub for my freelance/contract work, solo-built apps (like JaapMitra), and independent projects.

> "I build products — for startups, for myself, and occasionally for ideas that just won't leave me alone."

---

## 🛠️ Tech Stack & Highlights

- **Framework:** [Astro v6](https://astro.build/) (Static Site Generation for speed and SEO)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (using the new Vite plugin integration)
- **Language:** TypeScript
- **Package Manager:** `pnpm`
- **Features:**
  - Fully componentized UI architecture.
  - Interactive dark/light mode toggle with custom design.
  - Structured, easily updatable portfolio data file.
  - Responsive, mobile-first design with smooth navigation.

---

## 📂 Project Structure

Here is an overview of how this project is structured:

```text
me-v2/
├── public/                 # Static assets (favicons, OG image, resume.pdf,
│                           # app-ads.txt for AdMob in-app inventory)
├── src/
│   ├── assets/             # Images and visual resources
│   ├── components/         # Modular UI components:
│   │   ├── Hero.astro      # Main landing/intro section
│   │   ├── About.astro     # Core bio and background info
│   │   ├── Modes.astro     # Multi-faceted roles (Engineer, Builder, Creator)
│   │   ├── Apps.astro      # Dedicated showcase for mobile/web apps (JaapMitra)
│   │   ├── Projects.astro  # Interactive web project showcase
│   │   ├── Experience.astro# Interactive timeline of professional history
│   │   ├── Nav.astro       # Header navigation and hamburger menu
│   │   ├── Footer.astro    # Footer with socials
│   │   └── ThemeToggle.astro# Dark/Light theme toggler
│   ├── data/
│   │   └── portfolio.ts    # Centralized source of truth for all content & experiences
│   ├── layouts/
│   │   └── Layout.astro    # Base HTML template & page styling wrappers
│   ├── pages/
│   │   ├── index.astro     # Main landing page
│   │   ├── apps/           # App pages, served at <slug>.jeevanmishra.in
│   │   └── uses.astro      # Developer setup & tooling page ("uses")
│   └── styles/
│       └── global.css      # Core styles & Tailwind CSS entry point
├── astro.config.mjs        # Astro & Vite plugin configurations
├── vercel.json             # App subdomain rewrites + apex redirects
├── package.json            # Scripts and dependency declarations
└── tsconfig.json           # TypeScript configuration
```

---

## 🌐 App subdomains

Apps flagged `hosted: true` in `src/data/portfolio.ts` are built at
`/apps/<slug>` but served — and indexed — at `<slug>.jeevanmishra.in`.
`vercel.json` does the host-to-path mapping generically, so the routing needs
no change when a new app ships.

| Request | Result |
| :--- | :--- |
| `pachisi.jeevanmishra.in/` | rewrite → `/apps/pachisi` (URL stays on the subdomain) |
| `pachisi.jeevanmishra.in/privacy` | rewrite → `/apps/pachisi/privacy` |
| `jeevanmishra.in/apps/pachisi` | 301 → `https://pachisi.jeevanmishra.in/` |
| `pachisi.jeevanmishra.in/_astro/…`, `/favicon.ico` | passed through to the shared root |

The subdomain is each app's canonical URL: `Layout.astro` takes a `canonical`
prop, the sitemap rewrites those entries to the subdomain, and the apex path
301s away so only one address is indexable. `Nav` and `Footer` take a `base`
prop, which app pages set to `SITE_URL` so navigation still points back at the
portfolio from a subdomain; links *within* an app use `appBase(app)`, which is
empty in production and `/apps/<slug>` in dev.

### Shipping a new app

1. Add the entry to `apps` in `src/data/portfolio.ts` with `hosted: true`.
2. Add a CNAME at the DNS provider: `<slug>` → the target Vercel shows for
   the domain (normally `cname.vercel-dns.com`). DNS for jeevanmishra.in is
   managed at the registrar, not on Vercel nameservers.
3. Add `<slug>.jeevanmishra.in` to this project in Vercel → Settings →
   Domains, and wait for the certificate to issue.
4. Deploy. The page, the privacy policy, the redirect, the canonical, and the
   sitemap entry all follow from the flag.

Apps with `hosted: false` (JaapMitra, Saarthi) have their own sites and are
only linked out to from `/apps`.

---

## 🧞 Commands

All commands are executed from the root of the project using a terminal:

| Command | Action |
| :--- | :--- |
| `pnpm install` | Installs project dependencies |
| `pnpm dev` | Starts the local dev server at `http://localhost:4321` |
| `pnpm build` | Builds the production-ready static site into `./dist/` |
| `pnpm preview` | Previews the build output locally before deploying |
| `pnpm astro ...` | Executes Astro CLI commands (e.g. check, add) |

---

## 🤝 Connect With Me

- **Website:** [jeevanmishra.in](https://jeevanmishra.in)
- **GitHub:** [@g1mishra](https://github.com/g1mishra)
- **LinkedIn:** [Jeevan Kumar](https://linkedin.com/in/g1mishra)
- **Twitter:** [@g1mishra](https://twitter.com/g1mishra)
- **Email:** [g1mishra.dev@gmail.com](mailto:g1mishra.dev@gmail.com)
