<div align="center">

# PawScout Frontend

Modern web experience that connects future pet parents, donors, and volunteers with PawScout's rescue initiatives.

</div>

## 🌟 Project Overview

PawScout centralizes the organization's public-facing touchpoints into a single, responsive Next.js application. Visitors can browse adoptable dogs, learn how to donate, submit volunteer applications, and follow success stories. The UI emphasizes high visual polish, bilingual messaging, and clear calls-to-action to increase conversions across adoption, donation, and volunteering funnels.

### Objectives

- Showcase adoptable dogs with rich media and contextual info.
- Guide donors through transparent, story-driven contribution flows.
- Capture volunteer intent with structured forms and status feedback.
- Maintain a cohesive brand experience while enabling route-specific layouts (e.g., login, volunteer success, etc.).

## 🔗 Live Demo

Experience the latest build at [https://paw-scout.vercel.app/](https://paw-scout.vercel.app/).

## 🧰 Tech Stack

| Layer        | Tools                                                            |
| ------------ | ---------------------------------------------------------------- |
| Framework    | Next.js 16 (App Router, Server Components)                       |
| Language     | TypeScript 5 + React 19                                          |
| Styling      | Tailwind CSS 4, custom utility classes, CSS Modules where needed |
| Tooling      | pnpm, ESLint 9 with `eslint-config-next`, PostCSS                |
| Content/Data | Local mock data (`db/dogs.ts`), public assets in `/public`       |

## 🗂️ Project Structure

```
frontend/
├── app/
│   ├── layout.tsx            # Root layout with global providers/styles
│   ├── globals.css           # Tailwind base + design tokens
│   ├── page.tsx              # Home landing page
│   ├── adopt/                # Adoption listing + detail flows
│   ├── donate/               # Donation hero, tiers, stories
│   └── volunteer/            # Volunteer info, forms, success screens
├── components/
│   ├── adopt/                # Feature-specific UI blocks
│   ├── donate/
│   ├── volunteer/
│   └── ui/                   # Shared cards, header/footer, etc.
├── db/dogs.ts                # Mock dataset for adoptable dogs
├── public/                   # Static assets (images, icons, etc.)
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
└── tailwind/postcss configs
```

## ✨ Key Features

- **Adoption Library** – Filterable cards, detailed profiles, and application entry points for every dog.
- **Donation Experience** – Tiered amount selector, donor stories, and progress highlights to drive trust.
- **Volunteer Journey** – Requirements overview, role descriptions, rich application form, and success confirmation screen.
- **Composable UI Kit** – Reusable headers, footers, CTA blocks, and cards to keep visuals consistent.
- **Dark-Mode Ready** – Tailwind utility strategy already accounts for light/dark surfaces on key screens.

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- pnpm 8+ (recommended package manager)

### Installation

```bash
pnpm install
```

### Local Development

```bash
pnpm dev
# Visit http://localhost:3000
```

### Linting & Type-Checking

```bash
pnpm lint
```

### Production Build

```bash
pnpm build
pnpm start  # Serves .next/ output
```

## 🧭 Architectural Notes

- **App Router First**: Every route segment (e.g., `adopt`, `donate`, `volunteer/form`) can declare its own layout for bespoke storytelling and UX.
- **Tailwind v4**: Utility-first styling with design tokens allows rapid iteration while staying on brand.
- **Component Domains**: UI is grouped by feature domains (`adopt`, `donate`, `volunteer`) plus a `ui` folder for primitives to encourage reuse.
- **Mock Data Layer**: `db/dogs.ts` feeds adoption pages until a real API is wired in, keeping the UI decoupled from backend delivery.
- **Accessibility**: Focus states, semantic headings, and responsive typography baked into components to ensure inclusive design.

## 🧪 Testing & Quality

- Run `pnpm lint` before every commit to catch accessibility and best-practice issues early.
- Component-level props are strongly typed via TypeScript; favor explicit interfaces when adding new shared components.

## 📦 Deployment

1. Ensure a fresh `pnpm build` succeeds locally.
2. Deploy through Vercel (recommended) or any platform that supports Next.js standalone output.
3. Configure environment variables (if/when backend integration is added) via the chosen host's dashboard.

## 🤝 Contributing

1. Fork or branch off `main`.
2. Create feature-specific components under the relevant domain folder to keep the UI scalable.
3. Submit PRs with screenshots/GIFs for UI changes to speed up reviews.

---

Questions or suggestions? Open an issue or start a discussion so we can keep improving the PawScout experience.
