# ARCADE — Phase 1 implementation plan

## Goal

Deliver a clean, responsive platform shell before investing in game mechanics or backend infrastructure.

## Tasks

- [x] Establish monorepo and web workspace
- [x] Configure React, TypeScript and Vite
- [x] Create ARCADE visual tokens
- [x] Build responsive home page
- [x] Build Explore view with search and category filters
- [x] Create typed game catalogue
- [x] Add reusable game card component
- [ ] Run locally and verify in target browsers
- [ ] Review layout on mobile
- [ ] Commit the Phase 1 baseline to local Git

## Acceptance criteria

- `npm install` completes successfully.
- `npm run dev` starts the application.
- Home and Explore navigation work.
- Search filters games by title and description.
- Category filters work.
- Layout adapts to mobile widths.
- `npm run build` completes without TypeScript errors.

## Architecture decisions

- Keep game catalogue metadata separate from UI.
- Use stable game slugs as identifiers.
- Keep game implementation out of the home page.
- Use local mock data until the backend is introduced.
- Add game SDK contracts before adding more games.
