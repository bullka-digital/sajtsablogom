<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server on http://localhost:3000
npm run build    # production build (also runs type generation)
npm run start    # serve production build
npm run lint     # ESLint (no test suite configured yet)
```

## Stack

- **Next.js 16** with App Router (`src/app/`) — **not** the Pages Router
- **React 19**, **TypeScript 5**, **Tailwind CSS 4**
- No test framework installed yet

## Architecture

All routing lives under `src/app/` using the App Router file conventions (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`). The root layout (`src/app/layout.tsx`) applies Geist fonts via CSS variables and wraps the full page tree.

Tailwind v4 is configured via PostCSS (`postcss.config.mjs`) — there is no `tailwind.config.*` file; theme customization goes in `src/app/globals.css` using `@theme`.

Before writing any Next.js code, read the relevant guide in `node_modules/next/dist/docs/` — this version has breaking changes from prior releases.
