# Portfolio — ahmedzakirkhan

Retro/8-bit personal landing page. Dark CRT arcade aesthetic: pixel typography,
scanlines, neon-on-black, an RPG-style character sheet and quest log.

`index.html` is **fully self-contained** — the webfont is inlined as base64 and there
are no external requests, no frameworks and no build step required to view it.
Just open the file.

## Structure

| File | Purpose |
|---|---|
| `index.html` | The built, deployable page (open this) |
| `_page.html` | Body content — edit copy here |
| `_style.css` | All styling |
| `_app.js` | Interactions (typewriter, reveals, filters, konami) |
| `build.py` | Inlines the font + CSS + JS into `index.html` |
| `assets/PressStart2P.woff2` | Bitmap font (SIL Open Font License) |
| `Ahmed-Khan-CV.pdf` | Linked from the CV buttons |

## Editing

Edit `_page.html` / `_style.css` / `_app.js`, then rebuild:

```bash
python3 build.py
```

Editing `index.html` directly works too, but the next build overwrites it.

## Preview locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000

## Deploy (GitHub Pages)

```bash
git init && git add . && git commit -m "portfolio"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

Then in the repo: **Settings → Pages → Source: `main` / root**.
Live at `https://<you>.github.io/<repo>/`.

Any static host works — Netlify, Vercel, Cloudflare Pages — since it's one HTML file.

## Notes

- **Fails safe without JS**: the boot screen is hidden by default and only shown
  once JS is confirmed running, so a blocked script (strict CSP, sandboxed viewer)
  can never leave the page stuck behind an overlay. Scroll reveals behave the same
  way. All content lives in the HTML, never injected by JS.
- **Boot screen** dismisses on the 2.2s timer or on any click / tap / key / scroll —
  not keys alone, since an unfocused iframe never receives key events.
- **Accessibility**: respects `prefers-reduced-motion` (skips the boot screen,
  typewriter and scroll animations).
- **Easter egg**: the Konami code (↑↑↓↓←→←→BA) toggles a rainbow mode.
- The skill-level bars in the Character Sheet are a stylistic self-assessment —
  edit the `data-fill` values in `_page.html` to taste.
