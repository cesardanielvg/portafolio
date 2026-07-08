# Portfolio — Info + CV (guided build)

## Context

Personal portfolio. Fresh `create-next-app` scaffold at `portafolio/portafolio`
(Next 16.2.10, React 19, Tailwind v4, App Router, TypeScript). Project name stays
Spanish ("portafolio"); all UI copy in English. Goal: two routes — **Info** (contact
+ project cards) and **CV** (full experience). Clean, minimal, standard patterns.

This is a **guidance plan, not an implementation** — you build it to sharpen skills.
Each step says *what* and *why*, leaves the *how* (code) to you. Illustrative shapes
only, not finished code.

Decisions locked:
- Projects → **MDX files with frontmatter** (Vercel Portfolio Starter Kit pattern).
- CV → **web sections + print-friendly** (Cmd+P → clean PDF).
- Nav → **shared nav in root layout** shown on both routes.

> ⚠️ Next 16 differs from older knowledge (`AGENTS.md`). Before coding MDX, read
> `node_modules/next/dist/docs/01-app/02-guides/mdx.md`. Next's own docs link the
> [Portfolio Starter Kit](https://vercel.com/templates/next.js/portfolio-starter-kit)
> — skim it; it is this exact architecture.

---

## Step 0 — Clean the scaffold first

Small cruft to remove so the base is honest:
- `app/pageOriginal.tsx` — leftover template. Delete.
- `app/.layout.tsx.swp` — stray vim swap. Delete.
- `app/page.tsx` — has a duplicate `import info from "@/components/info"` (lowercase,
  unused). Remove it; keep the `Info` import only.
- `app/layout.tsx` — `metadata` still says "Create Next App". Set your real
  `title` / `description`.
- `app/globals.css` — `body { font-family: Arial... }` overrides the Geist font the
  layout wires up on `<html>`. Pick one: drop the Arial line to use Geist (cleaner),
  or delete the Geist wiring. Don't leave both fighting.

Dark mode via `prefers-color-scheme` is already in `globals.css` for free — keep it,
let text/card colors read from the CSS vars.

## Step 1 — Shared nav in root layout

`app/layout.tsx` already renders `{children}` inside a flex-column body. Add a small
`<nav>` (a `components/nav.tsx`) above `{children}` with two links: **Info** (`/`) and
**CV** (`/cv`). Use `next/link`. Keep it minimal — text links, active state optional.
Because it lives in the layout, it shows on every route with zero duplication.

*Why:* one source of truth for navigation; scales if you add routes later.

## Step 2 — Project content as MDX + frontmatter

Content lives outside `app/` so routing doesn't pick it up as pages:
```
content/projects/
  my-first-project.mdx
  another.mdx
```
Each file's frontmatter carries the **card** data; the body (optional) is the long
write-up:
```mdx
---
title: Guest RSVP
summary: One-line pitch for the card.
tech: [Next.js, Postgres]
repo: https://github.com/...
demo: https://...
date: 2025-11
---
Optional long-form body (only needed if you build detail pages).
```

Add a tiny reader — `lib/projects.ts` — that:
- reads `content/projects` with `fs`,
- parses frontmatter,
- returns a typed `Project[]` sorted by `date` desc.

**Deps decision (minimal path):** the Starter Kit ships a ~20-line regex frontmatter
parser and uses **zero** extra deps beyond `@next/mdx` — recommended for "simple and
minimal." Alternative is `gray-matter` (robust parser) if you'd rather not hand-roll.
Either way, define one `Project` type and reuse it everywhere.

If you want rendered MDX bodies later, install per the Next MDX guide
(`@next/mdx @mdx-js/loader @mdx-js/react @types/mdx`, add `createMDX` to
`next.config.ts`, add the required `mdx-components.tsx`). **Skip until you actually
build detail pages (YAGNI).** For cards you only need frontmatter, so you can defer
the whole MDX toolchain and just parse frontmatter to start.

## Step 3 — Info page (contact + cards)

`components/info.tsx` currently just prints the email. Grow it into:
- a small **contact** block (email — already have it — plus GitHub/LinkedIn as you like),
- a **projects grid**: call `getProjects()` from `lib/projects.ts` (Server Component,
  so `fs` reads are fine — no `"use client"`), map to a `components/project-card.tsx`.

`ProjectCard` takes one `Project`, renders title / summary / tech tags / repo+demo
links. Keep markup semantic (`<article>`, `<h3>`), style with Tailwind utility classes.
Grid via `grid gap-* sm:grid-cols-2`. `app/page.tsx` stays a thin wrapper around `Info`.

*Why split:* `Info` owns layout/data, `ProjectCard` owns one item — easy to restyle,
easy to reuse.

## Step 4 — CV page (web + print)

`app/cv/page.tsx` becomes semantic sections: header (name/role/contact), Experience,
Education, Skills. Model the CV data as a typed object/array in the file (or a
`lib/cv.ts` if you prefer) and map over it — don't hand-write repeated markup.

Print-friendly, minimal effort:
- Structure with real headings and `<section>`s.
- A `@media print` block (in `globals.css` or a scoped class) that hides the nav,
  removes background colors, sets black-on-white, tightens margins.
- Tailwind has `print:` variants (e.g. `print:hidden` on the nav) — use those instead
  of raw CSS where handy.

Test with Cmd+P → "Save as PDF". That *is* your downloadable CV; no PDF lib needed.

## Step 5 — Link Info → CV

Covered by the shared nav (Step 1). Optionally add a prominent inline "View CV →" link
in the Info contact block too.

---

## Critical files

| File | Role |
|---|---|
| `app/layout.tsx` | metadata + shared `<nav>` |
| `components/nav.tsx` | Info / CV links (new) |
| `content/projects/*.mdx` | project data (new) |
| `lib/projects.ts` | typed frontmatter reader (new) |
| `components/info.tsx` | contact + projects grid |
| `components/project-card.tsx` | one card (new) |
| `app/cv/page.tsx` | CV sections + print |
| `app/globals.css` | font fix + `@media print` |

## Reuse / don't reinvent
- One `Project` type shared by `lib/projects.ts`, `info.tsx`, `project-card.tsx`.
- `next/link` for all nav; `next/font` (Geist) is already wired — don't add fonts.
- Tailwind `print:` variants over bespoke print CSS where possible.
- Server Components by default; only add `"use client"` if you introduce interactivity.

## Build order (suggested)
0 → 1 → 2 (frontmatter reader only) → 3 → 4 → 5. Ship after each step; keep commits small.

## Verification
- `npm run dev`, open `/` — nav visible, contact shows, cards render from the MDX files;
  add/remove an `.mdx` and confirm the grid updates.
- Click **CV** → `/cv` renders sections.
- Cmd+P on `/cv` → nav hidden, clean black-on-white PDF.
- `npm run lint` and `npm run build` both pass (build catches Server/Client and type errors).
- Resize to mobile — grid collapses to one column, nothing overflows.