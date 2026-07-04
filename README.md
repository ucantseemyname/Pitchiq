# Aizo — AI Proposal Generator

Generate winning, client-ready proposals in seconds. Fill out a short multi-step
form and Claude writes a structured, seven-section proposal — streamed live —
that you can export as a polished, branded PDF.

> **Stack:** React + Vite + TypeScript + Tailwind CSS (frontend) · Express (backend) ·
> Anthropic Claude API (`claude-sonnet-4-6`) · jsPDF (export) · React Router.

---

## Features

- **Editorial landing page** — hero, animated stat counters, feature accordion,
  dark results section, how-it-works, Us-vs-Manual comparison, pricing, FAQ, and
  CTA sections. Light/dark mode, glassmorphism, scroll reveals, and count-up
  animations throughout.
- **Multi-step form** (`/generate`) — Your Info → Client Info → Project Details →
  Tone, with a progress bar, per-step validation, back/next navigation.
- **Live proposal output** (`/proposal`) — streaming "typing" effect, loading
  skeletons, error and empty states, regenerate / start-over, and one-click PDF.
- **Production-minded** — strong TypeScript types, accessible components (labels,
  focus rings, `aria-*`, reduced-motion support), error handling on both ends.

---

## Project structure

```
Aizo/
├── client/                 # React + Vite + Tailwind frontend
│   ├── src/
│   │   ├── components/      # Atomic design: atoms / molecules / organisms
│   │   ├── context/        # Theme + Proposal form providers
│   │   ├── data/           # Static landing copy, form options, demo proposal
│   │   ├── hooks/          # useCountUp, useScrollReveal, useProposalGenerator
│   │   ├── lib/            # api client, section parser, PDF export, types
│   │   └── pages/          # LandingPage, GeneratePage, ProposalPage
│   └── vite.config.ts      # Dev proxy: /api → http://localhost:3001
├── server/                 # Express backend
│   ├── index.js            # POST /api/generate (streams Claude) + /api/health
│   ├── prompt.js           # System prompt + section format
│   └── validation.js       # Request validation
├── .env.example            # Copy to .env and add your key
└── package.json            # Root scripts (run both apps together)
```

---

## Getting started

### 1. Prerequisites

- Node.js 18+ (this was built and tested on Node 20)
- An Anthropic API key — <https://console.anthropic.com/settings/keys>

### 2. Configure your environment

```bash
cp .env.example .env
```

Open `.env` and set your key:

```
ANTHROPIC_API_KEY=sk-ant-...
PORT=3001
ANTHROPIC_MODEL=claude-sonnet-4-6
```

### 3. Install dependencies

Install root, server, and client packages in one command:

```bash
npm run install:all
```

### 4. Run in development

From the repo root, start both the backend and frontend together:

```bash
npm run dev
```

- Frontend: <http://localhost:5173>
- Backend:  <http://localhost:3001> (Vite proxies `/api` here automatically)

Prefer separate terminals? Run `npm run dev:server` and `npm run dev:client`.

> **No API key yet?** The landing page and form work without one. Click
> **See Example** on the hero (or visit `/proposal?demo=1`) to preview a fully
> rendered proposal with the live typing effect — no key required.

---

## How generation works

1. The form collects inputs into a typed `ProposalForm` (held in React context).
2. `POST /api/generate` validates the payload, then calls Claude with a system
   prompt that asks for seven sections, each delimited by a `[[SECTION:key]]`
   marker.
3. The server **streams** Claude's text response back as `text/plain` chunks.
4. The client reads the stream, parses sections incrementally (tolerating partial
   final sections), and renders them with a live typing caret.
5. **Download as PDF** turns the parsed sections into a branded A4 document via
   jsPDF.

### Proposal sections

1. Executive Summary
2. Our Understanding
3. Proposed Approach
4. Deliverables
5. Timeline
6. Investment
7. Next Steps

---

## API

### `POST /api/generate`

Request body (all required unless noted):

```jsonc
{
  "senderName": "Studio Northstar",
  "serviceType": "Video Production",   // one of the fixed service types
  "location": "Austin, TX",             // optional
  "clientName": "Northwind Co.",
  "industry": "DTC skincare",           // optional
  "projectDescription": "…",
  "budget": "$5k–$15k",                 // one of the fixed budget ranges
  "timeline": "1 month",                // one of the fixed timelines
  "deliverables": "…",
  "tone": "Professional"                // Professional | Friendly | Bold | Minimal
}
```

Responds with a streamed `text/plain` body. Validation/config failures return a
JSON `{ "error": "…" }` with an appropriate status code.

### `GET /api/health`

Returns `{ ok, model, hasApiKey }` — handy for verifying configuration.

---

## Production build

```bash
npm run build          # builds client/dist
npm start              # serves the API (host client/dist behind your own static host/CDN)
```

The frontend is a static bundle (`client/dist`) deployable to any static host
(Vercel, Netlify, Cloudflare Pages, S3). Point its `/api` requests at the
deployed Express server. Keep `ANTHROPIC_API_KEY` server-side only — it is never
exposed to the browser.

---

## Design system

| Token            | Value     | Usage                              |
| ---------------- | --------- | ---------------------------------- |
| Background       | `#EEF0F5` | Light page background              |
| Dark sections    | `#0a0a0a` | Results / CTA / document header    |
| Primary (accent) | `#FF0000` | Buttons, CTAs, highlights          |
| Text primary     | `#0a0a0a` | Headings & body                    |
| Text secondary   | `#6B7280` | Muted copy                         |
| Hairline         | `#C8D0E0` | Borders & dividers                 |

Font: **Inter** (Google Fonts). Border radius: **12px** base. Soft, subtle
shadows. Generous, airy spacing.

---

## MVP scope

No auth, no database, no payments — by design. The flow is **Form → Claude →
Proposal → PDF**. Everything lives in the browser for the current session.
