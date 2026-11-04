# ARCADE

A modern browser-first gaming platform for classic and original casual games.

## Phase 1: Platform shell

This starter includes:
- React + TypeScript + Vite
- Responsive ARCADE landing page
- Home / Explore navigation
- Search and category filtering
- Typed game catalogue and reusable game cards
- Design tokens and responsive styling

## Requirements

- Node.js 20.19+ or 22.12+
- npm 10+

Check versions:

```bash
node -v
npm -v
```

## Run locally

From the `arcade` project root:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (normally http://localhost:5173).

## Production build

```bash
npm run build
npm run preview
```

## Project structure

```text
arcade/
├── apps/
│   └── web/
│       ├── index.html
│       ├── package.json
│       ├── vite.config.ts
│       └── src/
│           ├── app/
│           ├── components/
│           ├── data/
│           ├── pages/
│           ├── styles/
│           ├── types/
│           └── main.tsx
├── docs/
└── package.json
```

## Current status

Phase 1 is a frontend foundation using local mock data. There is no backend, account system, leaderboard API, or real game engine integration yet. Those are deliberately deferred.

## Next milestones

1. Create the shared game SDK and game launcher.
2. Integrate the existing Snake game as the first playable module.
3. Add Phaser for games that need a full game engine.
4. Introduce FastAPI and PostgreSQL when score persistence and accounts are needed.
