# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server with HMR at http://localhost:5173
npm run build     # Production build (outputs to dist/)
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
```

## Architecture

Single-page landing page for homeopath Britta Piesbergen. All UI lives in two files:

- **`src/App.jsx`** — entire page: Nav, Hero, Über mich, Leistungen, Kontakt, Footer. Small sub-components (`RevealSection`, `Field`, `JacarandaFlower`, icon components) are defined at the bottom of the same file. Scroll-reveal uses `IntersectionObserver` via a custom `useReveal` hook.
- **`src/App.css`** — all styles, organized by section with CSS custom properties (tokens at top). Google Fonts (`Cormorant Garamond` + `Inter`) loaded via `<link>` in `index.html`.

Design system: violet (`#7C3AED`), lavender (`#EDE9FE`/`#DDD6FE`/`#C4B5FD`), cream (`#FDFAF7`). Photo frames are CSS blob shapes (placeholder SVG silhouettes until real photos are provided).

**ESLint** is configured via `eslint.config.js` (flat config format). Unused variables matching `^[A-Z_]` are allowed (constants/components). Note: `varsIgnorePattern` does not cover destructured params — avoid the `tag: Tag` pattern.
