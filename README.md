# Frontend Battle 3.0 — Round 1 Build Prompt

Paste this into Claude Code (or Claude.ai) once your project is scaffolded.

---

I'm building a premium AI-automation SaaS landing page for a timed hackathon.
Stack: **Next.js (App Router) + TypeScript + Tailwind CSS**. No external UI/animation
libraries (no Shadcn, Radix, HeadlessUI, Framer Motion) — everything hand-rolled with
native CSS transitions or WAAPI.

## Design tokens

Colors (use as Tailwind theme extensions, not arbitrary hex scattered in JSX):
- `noir` #172B36 — primary dark background
- `nocturnal` #114C5A — secondary dark surface
- `powder` #F1F6F4 — light background (used sparingly, one breakout section)
- `mint` #D9E8E2 — light surface / card bg
- `forsythia` #FFC801 — primary accent (CTAs, active states)
- `saffron` #FF9932 — secondary accent (hover states, gradients paired with forsythia)

Fonts: `JetBrains Mono` for headers/labels/prices/nav, `Inter` for body text.
Load both via `next/font/google`, expose as CSS variables, wire into Tailwind
`fontFamily` config.

Mood: mostly dark (noir/nocturnal background) with ONE light (powder/mint) breakout
section for contrast — mirrors a dark→light→dark rhythm.

SVG icons are in `/assets/svgs` (chevrons x5, search, x-mark, arrow-path,
arrow-trending-up, chart-pie, cog-8-tooth, cube-16-solid, link, link-solid) — all are
single-path, stroke-based, currently `#000000`. Import as React components and
override stroke/fill via `currentColor` so they inherit theme colors. Use them
meaningfully: chevrons for accordion/carousel controls, search for any search affordance,
arrow-trending-up/chart-pie for stat/bento cards, cog-8-tooth for automation/settings
visuals, cube-16-solid/link(-solid) for integration or workflow visuals. Every icon
should be used somewhere — unused assets lose points.

## Page sections (creative discretion on copy, but include all of these)

1. Header/nav (logo, links, mobile hamburger menu)
2. Hero (headline, subhead, CTA) — entrance animation budget below
3. Logo strip / social proof
4. **Feature Bento Grid** (Feature 2 spec below) — desktop bento, mobile accordion
5. Stats strip (a few bold monospace numbers, e.g. "11ms", "9x", "87%")
6. **Pricing matrix** (Feature 1 spec below)
7. FAQ accordion
8. Footer — large wordmark treatment, link columns, socials

Visual style cues from the reference video: small monospace section labels
(e.g. `// PRICING`), thin vertical/horizontal grid hairlines running through
sections, varied-size bento cards (mix of small square + one wide card per row).

---

## Feature 1 — Matrix-driven pricing + currency switcher

**Requirement:** 3 tiers (Starter, Pro, Enterprise) × 2 billing cycles (Monthly,
Annual — flat 20% discount on annual) × 3 currencies (INR ₹, USD $, EUR €).

Build this as a **pure config object**, not hardcoded JSX strings:

```ts
// pricing-config.ts
type Tier = "starter" | "pro" | "enterprise";
type Cycle = "monthly" | "annual";
type Currency = "INR" | "USD" | "EUR";

const baseMonthlyRate: Record<Tier, number> = {
  starter: 999,    // base rate in INR, pick your own numbers
  pro: 2999,
  enterprise: 9999,
};

const regionalTariff: Record<Currency, number> = {
  INR: 1,
  USD: 0.012,   // conversion-ish multiplier, not live FX — just plausible
  EUR: 0.011,
};

const annualDiscountMultiplier = 0.8; // flat 20% off

function computePrice(tier: Tier, cycle: Cycle, currency: Currency): number {
  const base = baseMonthlyRate[tier] * regionalTariff[currency];
  const withCycle = cycle === "annual" ? base * annualDiscountMultiplier : base;
  return Math.round(withCycle);
}
```

**Critical constraint — DOM-isolated updates, no global re-render:**

When the user changes billing cycle or currency, ONLY the price text nodes
update. The parent pricing section, card layout, and surrounding components
must NOT re-render. This will be checked in Chrome DevTools.

Implementation pattern: keep `cycle`/`currency` selection in a **minimal**
piece of state (e.g. a small context or a single `useState` at the toggle
level), but instead of letting that state drive JSX re-renders for the price
text, use a `ref` per price node and imperatively update
`ref.current.textContent` inside a subscriber/effect — bypassing React's
render cycle for that node specifically. Example shape:

```tsx
const priceRefs = useRef<Record<Tier, HTMLSpanElement | null>>({...});

function updateAllPrices(cycle: Cycle, currency: Currency) {
  (Object.keys(priceRefs.current) as Tier[]).forEach((tier) => {
    const el = priceRefs.current[tier];
    if (el) el.textContent = formatPrice(computePrice(tier, cycle, currency));
  });
}
```

Wire `updateAllPrices` to the toggle's `onClick`/`onChange` directly — don't
route it through a state update that re-renders the card tree. Verify in
React DevTools profiler that toggling produces zero re-renders on the pricing
cards.

Currency symbols (₹ $ €) and the price number should be in the same isolated
text node update — formatting handled in `formatPrice()`.

---

## Feature 2 — Bento-to-Accordion with state-persisted active index

**Desktop (≥1024px):** Bento grid, 4 feature cards, varied sizes (e.g. one
2-col-span card + three standard cards, similar to the demo's mixed stat
card sizing). Hovering/focusing a card sets it as the "active" card via a
shared index state (lift this state to a parent, e.g. `useState<number | null>`
at the section level, or a lightweight custom store/context — NOT inside
either child component alone, since both bento and accordion need to read it).

**Mobile (<1024px):** Same 4 features render as an accordion list (one
open panel at a time). Built from scratch — `<button>` headers toggling
`aria-expanded`, animated height via CSS `grid-template-rows: 0fr → 1fr`
transition (avoids the “height: auto can’t transition” problem) or
`overflow: hidden` + measured `scrollHeight`. No Framer Motion, no
accordion library.

**Context Lock Constraint:** If the user is hovering/focused on bento
card index `N` on desktop and resizes the window past the mobile
breakpoint mid-interaction, the accordion must open panel `N` automatically,
with the same 300–400ms ease-in-out structural transition — not snap open
instantly. Implementation: a single shared `activeIndex` state read by both
components + a `resize` event listener (debounced) that checks viewport
width crossing the breakpoint and triggers the accordion's open transition
for `activeIndex` without resetting it to null first.

---

## Motion constraints (apply globally)

- Micro-interactions (hover, toggle clicks): **150–200ms, ease-out**
- Structural layout reflows (accordion open/close, bento↔accordion swap):
  **300–400ms, ease-in-out**
- Total initial load + entrance animation orchestration: **must complete
  within 500ms** and must NOT delay semantic HTML indexing or Time To
  Interactive — keep entrance animations to opacity/transform only (GPU-
  accelerated), no animating layout-triggering properties (width/height/top/left)
  on page load.
- All animation via native CSS transitions/`@keyframes` or WAAPI
  (`element.animate(...)`) — no runtime CSS-in-JS animation engines.

## SEO & semantic structure

- Use `<header>`, `<nav>`, `<main>`, `<section>` (with `aria-label` or
  heading), `<footer>` — avoid unnecessary wrapping `<div>` soup.
- One `<h1>` (hero headline), logical `<h2>`/`<h3>` hierarchy per section.
- `next/head` or App Router `metadata` export: title, description, Open
  Graph tags (`og:title`, `og:description`, `og:image`), viewport meta.
- All images/icons need meaningful `alt` text (empty `alt=""` only for
  pure decoration).
- Accessible labels: `aria-expanded` on accordion triggers, `aria-current`
  on active pricing toggle, `aria-label` on icon-only buttons (hamburger,
  close, search).

## Build order (work with me section by section)

Start with **project scaffold + design tokens + fonts** first, then build
in this order: Header → Hero → Bento/Accordion feature section → Pricing
→ Stats strip → FAQ → Footer. After each section, show me the code so I
can preview before moving on. Flag any assumption you make (copy, exact
spacing, exact tier pricing numbers) rather than silently guessing — but
don't stop and ask unless something is genuinely blocking.

## Environment note — Next.js version

This project is on **Next.js 16.2.9** (confirmed via `node_modules/next/package.json`).
Relevant version-specific behavior to follow:

- Async Request APIs are fully enforced — if any page/layout reads
  `params` or `searchParams`, they must be awaited
  (`const { slug } = await params`), never destructured synchronously.
  This landing page likely won't need dynamic params at all, but don't
  write old-style synchronous param access if a route ever needs one.
- Turbopack is the default bundler for `next dev`/`next build` — no
  `--turbopack` flag needed, this is expected behavior, not an error.
- Data fetching/caching is opt-in via `"use cache"` directives now,
  not implicit — not relevant here since this page has no server data
  fetching, just client-side state.
- Use App Router conventions throughout (`app/` directory, not `pages/`).

Use React 19.2 conventions where relevant — e.g. `useActionState` instead
of the old `useFormState` (deprecated but still works with a warning) —
though this static landing page likely won't need form actions at all.

## File output format — REQUIRED

I'm copy-pasting your code manually into a GitHub Codespace project (no
direct file system access on your end). For every file you generate:

1. Give me a plain code block (not an interactive artifact/canvas).
2. Immediately above each code block, state the **exact file path from
   the project root**, e.g.:

   `app/page.tsx`
   `components/Header.tsx`
   `components/PricingSection.tsx`
   `lib/pricing-config.ts`
   `app/layout.tsx`
   `app/globals.css`
   `tailwind.config.ts`

3. If a file already exists and you're editing it (e.g. adding an import
   to `app/layout.tsx`), tell me explicitly: "Replace the existing
   `app/layout.tsx` with this" or "Add this import near the top of the
   existing `app/layout.tsx`" — don't assume I'll merge it myself.
4. If a new folder needs to be created that doesn't exist yet (e.g.
   `components/`, `lib/`), say so explicitly before the code block.
5. After each section's files, give me a one-line summary list of every
   file path touched in that step, so I can checklist my copy-paste.

Assume my project root looks like a standard `create-next-app` output:
```
/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/        (create this if it doesn't exist)
├── lib/                (create this if it doesn't exist)
├── public/
├── tailwind.config.ts
├── package.json
└── tsconfig.json
```