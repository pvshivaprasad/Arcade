# ARCADE

> **Every game. One destination.**

ARCADE is a free, browser-first arcade built around quick-to-play classics and original games. The goal is simple: make it easy to discover a game, launch it instantly, and enjoy it on desktop or mobile.

[**Play the preview**](https://arcade-preview.onrender.com) · [**Browse the source**](https://github.com/pvshivaprasad/Arcade) · [**Report a bug**](https://github.com/pvshivaprasad/Arcade/issues)

![ARCADE](https://img.shields.io/badge/ARCADE-Open%20Source-F5D58A?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-20232A?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)
![License](https://img.shields.io/badge/License-MIT-green)

## What is ARCADE?

ARCADE is an evolving collection of games designed to run directly in the browser. No account, sign-up, subscription, or payment is required. We want the experience to stay lightweight, welcoming, and accessible.

### Current game collection

| Game | Style | Description |
|---|---|---|
| Snake | Classic | Eat, grow, and survive. |
| Bounce: Lost Dimensions | Original | A platform adventure with jumps, rings, and hazards. |
| Pong | Classic | A paddle duel inspired by the arcade original. |
| Brick Breaker | Classic | Clear the field and keep the ball in play. |
| Memory Match | Puzzle | Find matching pairs with as few moves as possible. |
| Number Merge | Puzzle | Combine matching tiles and aim for 2048. |
| Starfall | Arcade | Survive the falling patterns. |
| Space Shooter | Arcade | Defend your sector from incoming threats. |
| Neon Drift | Arcade | Dodge traffic across a three-lane road. |

> The project is actively evolving. Game availability and controls may change as features are tested and improved. Please report anything that does not work as expected.

## Screenshots

Screenshots and gameplay previews will be added as the experience stabilizes.

## Tech stack

- **React 18** — user interface
- **TypeScript** — typed game and UI logic
- **Vite 6** — development server and production bundling
- **HTML Canvas** — lightweight game rendering where appropriate
- **CSS** — responsive interface and game presentation
- **localStorage** — local-only progress where implemented

## Run ARCADE locally

### Requirements

- Node.js **20.19+** or **22.12+**
- npm

Check your versions:

```bash
node -v
npm -v
```

### Setup

```bash
git clone https://github.com/pvshivaprasad/Arcade.git
cd Arcade
npm install
npm run dev
```

Open the local URL printed by Vite (usually [http://localhost:5173](http://localhost:5173)).

### Production build

```bash
npm run build
npm run preview
```

## Project structure

```text
Arcade/
├── apps/
│   └── web/
│       ├── index.html
│       ├── package.json
│       └── src/
│           ├── app/
│           ├── components/
│           ├── data/
│           ├── games/
│           ├── pages/
│           ├── styles/
│           └── types/
├── docs/
├── package.json
├── CONTRIBUTING.md
└── LICENSE
```

## Contributing

**Contributions are welcome!** You can contribute a new game, improve an existing one, fix a bug, improve accessibility, or polish the experience.

1. Read [CONTRIBUTING.md](CONTRIBUTING.md).
2. Fork this repository.
3. Create a focused branch from the latest `main`.
4. Make your change and run `npm run build`.
5. Test the affected game in a browser at desktop and mobile sizes.
6. Open a pull request using the repository template.

Please open an issue or discussion before starting a large feature. This helps us avoid duplicated work and agree on the direction before anyone spends time implementing it.

### What makes a good game contribution?

- A genuinely distinct mechanic—not just a reskin of an existing game.
- Clear instructions and controls.
- Responsive keyboard, mouse, and touch input where relevant.
- A complete start, pause/restart, win/loss, and reset flow as appropriate.
- Original code and assets, or assets with licenses compatible with this project.
- No copied commercial game assets, copyrighted music, or unlicensed sprites.

All pull requests are reviewed. A submission is not automatically accepted or merged; maintainers may request changes, testing, or simplification.

## Roadmap

- [x] Browser-first game launcher
- [x] Initial playable game collection
- [ ] Refine and quality-test every game
- [ ] Build a polished original Bounce platformer
- [ ] Add more distinctive retro-inspired games
- [ ] Improve accessibility and mobile controls
- [ ] Add optional local achievements and game history
- [ ] Explore installable PWA support

The roadmap is a direction, not a promise or a release schedule. Check the [Issues](https://github.com/pvshivaprasad/Arcade/issues) and [Pull Requests](https://github.com/pvshivaprasad/Arcade/pulls) for current work.

## Project principles

- Free to play; no paywalls.
- Guest-first; no account required.
- Original mechanics and assets over low-effort clones.
- Quality and playability over game count.
- Friendly, transparent, community-driven development.

## License

ARCADE is released under the [MIT License](LICENSE). You are free to use, modify, and distribute the project under its terms. Contributions are submitted under the same license.

## Community

Found a bug or have a game idea? [Open an issue](https://github.com/pvshivaprasad/Arcade/issues).

Built with curiosity and a love for games. Have fun! 🕹️
