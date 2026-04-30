# PawScout — AI Assistant Guide

## Project Overview

PawScout is a bilingual (ES-MX / EN) pet adoption platform for an animal shelter. The repository is a **Next.js 16 frontend only**; the backend is a separate FastAPI service hosted on Render. The app has two main sections:

- **Public site** — landing page, adoption catalog, volunteer/donation funnels, contact, auth
- **Admin dashboard** — manage pets, adoption applications, volunteers, donations, newsletter, settings

Default language is `es-mx`; route rewrites at the root redirect bare paths (e.g. `/adopt`) to `/es-mx/adopt`.

---

## Tech Stack

| Concern | Library | Version |
|---------|---------|---------|
| Framework | Next.js (App Router) | 16.1.1 |
| UI | React | 19.2.3 |
| Language | TypeScript (strict) | ^5 |
| Styling | Tailwind CSS | ^4 |
| Server state | TanStack React Query | ^5 |
| Forms | React Hook Form | ^7 |
| Validation | Zod | ^4 |
| Animation | Framer Motion | ^12 |
| Headless UI | @headlessui/react | ^2 |
| Icons | @heroicons/react | ^2 |
| Notifications | react-toastify | ^11 |
| Carousel | swiper | ^12 |
| Auth (decode) | jwt-decode | ^4 |
| Package manager | pnpm | — |
| Deploy | Vercel | — |
| Media CDN | Cloudinary | — |

---

## Development Commands

```bash
pnpm dev      # start dev server (localhost:3000)
pnpm build    # production build
pnpm start    # serve production build
pnpm lint     # run ESLint
```

No test runner is configured. If adding tests, use Vitest + @testing-library/react.

---

## Environment Variables

Copy `.env.example` → `.env.local` before running locally.

```
API_URL=http://127.0.0.1:8000           # server-side FastAPI URL (not exposed to browser)
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000  # client-side FastAPI URL
```

Production values are set in the Vercel dashboard (pointing to the Render backend).

---

## Directory Structure

```
/
├── app/
│   ├── layout.tsx                       # root layout — ReactQueryProvider, fonts, toast
│   ├── globals.css                      # Tailwind directives + global resets
│   ├── [lang]/                          # dynamic language segment (es-mx | en)
│   │   ├── layout.tsx                   # language layout (generateStaticParams)
│   │   └── (public)/                    # public route group
│   │       ├── layout.tsx               # header + footer wrapper
│   │       ├── home/page.tsx
│   │       ├── adopt/
│   │       │   ├── page.tsx
│   │       │   └── [slug]/
│   │       │       ├── info/page.tsx
│   │       │       └── adopt-form/
│   │       │           ├── page.tsx
│   │       │           └── success/page.tsx
│   │       ├── donate/page.tsx
│   │       ├── volunteer/
│   │       │   ├── page.tsx
│   │       │   ├── form/page.tsx
│   │       │   └── form/success/page.tsx
│   │       ├── contact/page.tsx
│   │       └── (auth)/
│   │           ├── login/page.tsx + layout.tsx
│   │           └── register/page.tsx + layout.tsx
│   └── (admin)/                         # admin route group (protected)
│       ├── layout.tsx                   # sidebar layout
│       └── admin/
│           ├── dashboard/page.tsx
│           ├── pets/page.tsx
│           ├── adoptions/page.tsx + [slug]/details/page.tsx
│           ├── volunteer/page.tsx + [slug]/details/page.tsx
│           ├── donations/page.tsx
│           ├── newsletter/page.tsx + message/[slug]/details/page.tsx
│           └── settings/page.tsx
│
├── components/
│   ├── ui/                              # shared UI (header, footer, cards, modals, spinner)
│   ├── public/                          # public page sections
│   │   ├── home/                        # HeroSection, HowWorks, NewArrivals, Testimonials, EmailSubscription
│   │   ├── adopt/                       # AdoptPublicMain, AdoptListFilter, AnimalInfo, FormAdopt
│   │   ├── volunteer/                   # HeroVolunteer, VolunteerForm, VolunteerRequirements, VolunteerRoles
│   │   ├── donate/                      # HeroDonate, AmountForm, MoneyInfo
│   │   ├── contact/                     # ContactMain, ContactForm, Faqs
│   │   └── Login/                       # LoginForm, RegisterForm
│   ├── admin/                           # admin-only CRUD components (tables, modals, detail views)
│   ├── providers/
│   │   └── ReactQueryProvider.tsx       # TanStack Query client setup
│   └── skeletons/                       # loading skeleton components
│
├── actions/                             # Next.js Server Actions
│   ├── login/login-action.ts
│   ├── login/logout-action.ts
│   ├── register/create-account-action.ts
│   ├── register/subscribe-email-action.ts
│   ├── adopt/adopt-form-action.ts
│   ├── contact/contact-form-action.ts
│   ├── volunteer/volunteer-form-action.ts
│   ├── settings/update-settings-action.ts
│   └── settings/logo-action.ts
│
├── schemas/                             # Zod validation schemas
│   ├── login-schema/index.ts
│   ├── register-schema/index.ts
│   ├── adopt-schema/index.ts
│   ├── contact-schema/index.ts
│   ├── volunteer-schema/index.ts
│   ├── dashboard-schema/index.ts        # admin pet CRUD forms
│   └── settings-schema/index.ts
│
├── api/
│   └── api.ts                           # all FastAPI fetch functions (~20+ endpoints)
│
├── lib/
│   ├── auth.ts                          # getCurrentUser() — server-side JWT parsing
│   ├── auth/dal.ts                      # verifySession() with React cache()
│   ├── date.ts                          # date formatting helpers
│   ├── fonts.ts                         # Google Sans Flex config
│   └── i18n/                            # translation content (32 files)
│       ├── home/ | login/ | register/ | contact/
│       ├── adopt/ | donate/ | volunteer/ | ui/
│
├── db/
│   └── dogs.ts                          # DogsDataType — animal data shape
│
└── public/                              # static assets (images, icons)
```

---

## Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| React components | PascalCase | `HomeHeader.tsx`, `AdoptCards.tsx` |
| Pages / layouts | Next.js lowercase | `page.tsx`, `layout.tsx` |
| Server actions | `kebab-case-action.ts` | `login-action.ts` |
| Schema files | `<name>-schema/index.ts` | `schemas/contact-schema/index.ts` |
| Utilities | `camelCase.ts` | `date.ts`, `fonts.ts` |
| Type exports | `type` keyword | `type DogsDataType`, `type ContactData` |

**Imports always use the `@/` alias** (never relative paths):

```ts
import { getCurrentUser } from "@/lib/auth";
import AdoptCards from "@/components/ui/AdoptCards";
import { getContactSchema } from "@/schemas/contact-schema";
```

---

## Key Architectural Patterns

### Server vs Client Components

- **Server components** (default): pages, layouts, data fetching, auth checks
- **Client components** (`"use client"`): forms, animations, React Query hooks, interactive UI

Typical pattern — server wrapper hands data to a client component:

```tsx
// HomeHeader.tsx (Server Component)
export default async function HomeHeader() {
  const user = await getCurrentUser();
  return <HomeHeaderClient user={user} />;
}
```

### Authentication

JWT stored in the `pawscout_token` httpOnly cookie.

```ts
// lib/auth.ts — use in Server Components / Server Actions
const user = await getCurrentUser(); // returns null if not authenticated

// lib/auth/dal.ts — use when you need to guard a route
await verifySession(); // throws redirect if invalid
```

JWT payload shape:
```ts
type TokenPayload = {
  sub: string;       // email
  user_id: number;
  isAdmin: boolean;
  name: string;
  lastName: string;
  exp: number;
};
```

Admin routes: check `isAdmin` from the token payload.

### Internationalization (i18n)

All UI text lives in `lib/i18n/<feature>/<section>.ts`. Language normalises to `"es-mx"` for anything that isn't explicitly `"en"`.

```ts
// lib/i18n/home/hero.ts
export function getHeroContent(lang?: string) {
  const key = lang === "en" ? "en" : "es-mx";
  return { lang: key, content: heroContent[key] } as const;
}
```

Zod schemas also accept a `lang` parameter so validation error messages are localised:

```ts
const schema = getContactSchema(lang); // "es-mx" | "en"
```

### API Client (`api/api.ts`)

Single file. All functions are plain `async` fetch wrappers. Authenticated endpoints receive the JWT token as the first argument:

```ts
export async function createAnimal(token: string, data: CreateAnimalFormData) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/animals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}
```

Functions return raw `res.json()`. Error handling belongs in the caller.

### Server Actions

Standard signature — always validate with Zod before hitting the API:

```ts
"use server";

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function contactFormAction(
  prevState: ActionStateType,
  formData: FormData,
): Promise<ActionStateType> {
  const schema = getContactSchema(lang);
  const result = schema.safeParse({ /* extract from formData */ });

  if (!result.success) {
    return { errors: result.error.issues.map((i) => i.message), success: "" };
  }

  await submitContact(result.data);
  return { errors: [], success: "Message sent!" };
}
```

Server Action body size limit is **5 MB** (configured in `next.config.ts`).

### Zod Schemas

Schemas are factory functions so they can emit localised error messages:

```ts
export const getContactSchema = (lang = "en") =>
  z.object({
    email: z.email(lang === "es-mx" ? "Correo inválido" : "Invalid email"),
  });

export type ContactData = z.infer<ReturnType<typeof getContactSchema>>;
```

### TanStack Query

`ReactQueryProvider` wraps the app in the root layout (`staleTime: 60 000`, `refetchOnWindowFocus: false`). In client components:

```ts
// reads
const { data, isLoading } = useQuery({ queryKey: ["animals"], queryFn: getAllAnimals });

// writes — always invalidate the related query on success
const mutation = useMutation({
  mutationFn: ({ id, status }) => updateAdoptionStatus(token, id, status),
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ["adoptionRequests"] }),
});
```

---

## Styling

- **Tailwind CSS 4** utility classes only — no CSS modules.
- Mobile-first responsive design.
- **Framer Motion** for animations.
- **Headless UI** for accessible interactive elements (dialogs, menus).

```tsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4"
```

---

## Route Rewrites

Bare paths redirect to `es-mx` by default (configured in `next.config.ts`):

```
/          → /es-mx/home
/adopt     → /es-mx/adopt
/donate    → /es-mx/donate
/volunteer → /es-mx/volunteer
/contact   → /es-mx/contact
/login     → /es-mx/login
/register  → /es-mx/register
```

---

## Image Handling

Next.js `<Image>` is configured to allow remote images from `res.cloudinary.com`. Always use the `<Image>` component (not `<img>`) for media stored in Cloudinary. The `DogsDataType` media array includes `url`, `public_id`, and `resource_type`.

---

## Adding New Features — Checklist

1. **New page**: add under `app/[lang]/(public)/` or `app/(admin)/admin/`
2. **New form**: create a Zod schema in `schemas/<name>-schema/index.ts`, a server action in `actions/<feature>/`, and a Client Component with `useActionState`
3. **New API call**: add a typed function to `api/api.ts`
4. **New i18n content**: add translation objects to `lib/i18n/<feature>/`
5. **Protected admin page**: call `verifySession()` at the top of the page and check `isAdmin`
6. **Media upload**: use the Cloudinary upload endpoint via the existing pattern in `actions/settings/logo-action.ts`
