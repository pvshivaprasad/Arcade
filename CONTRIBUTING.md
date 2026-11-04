# Contributing to ARCADE

Thanks for wanting to help build ARCADE! Contributions from friends and the wider community are welcome.

Our goal is a free, guest-first browser arcade with games that feel genuinely different from one another. We value thoughtful, tested contributions over large numbers of rushed additions.

## Before you start

- Check open issues and pull requests to avoid duplicate work.
- For a new game or a large change, open an issue first and describe the idea.
- Keep contributions focused. One well-scoped pull request is easier to review.
- Be respectful and constructive in reviews and discussions.

## Getting started

1. Fork `pvshivaprasad/Arcade` on GitHub.
2. Clone your fork:
   ```bash
   git clone https://github.com/<your-username>/Arcade.git
   cd Arcade
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a branch:
   ```bash
   git checkout -b feat/your-feature-name
   ```
5. Start the app:
   ```bash
   npm run dev
   ```

## Game contribution guidelines

A good game should:

- Have a distinct core mechanic and a clear objective.
- Include a short, understandable instruction panel.
- Support keyboard controls and provide touch controls when practical.
- Work at common desktop and mobile viewport sizes.
- Include a complete game loop: start, play, pause/restart, and a clear end state where relevant.
- Handle rapid input, restart, resize, and game-over edge cases.
- Keep rendering and input responsive.
- Avoid unnecessary dependencies and heavy assets.

Do not submit a game that is only a renamed copy or visual reskin of another ARCADE game.

## Art, audio, and intellectual property

- Submit assets you created, assets you have permission to use, or assets with a license compatible with the MIT-licensed project.
- Include attribution and license details for third-party assets in your pull request.
- Do not copy assets, levels, music, source code, logos, or branding from commercial games.
- Retro-inspired mechanics are welcome; copied proprietary expression is not.

## Code expectations

- Use TypeScript and follow the existing project patterns.
- Keep components and game logic modular.
- Avoid adding dependencies for functionality that can be implemented simply with existing tools.
- Make the UI accessible and responsive.
- Do not commit secrets, API keys, credentials, build output, or `node_modules`.

## Before opening a pull request

Run:

```bash
npm run build
```

Then manually test the changed experience:

- [ ] The app starts and the affected game launches.
- [ ] Main controls work and are explained.
- [ ] Restart and pause behave correctly where supported.
- [ ] Win/loss and edge cases behave correctly.
- [ ] No obvious console errors.
- [ ] Desktop and mobile layouts are usable.
- [ ] New assets have compatible licenses and attribution.
- [ ] README or game instructions are updated if needed.

In your pull request, explain what changed, why it is useful, how to test it, and any known limitations. Include screenshots or a short recording for visual changes.

## Review and merging

Maintainers review contributions for quality, originality, usability, performance, licensing, and fit with ARCADE's direction. We may ask for changes or decline a contribution that does not meet these standards. Please do not merge your own pull request unless you have been given repository maintainer permission.

Thanks for helping make ARCADE better! 🕹️
