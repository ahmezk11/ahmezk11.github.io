# Portfolio — ahmedzakirkhan

**Live: https://ahmezk11.github.io**

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

## Deploy

Already live on GitHub Pages at https://ahmezk11.github.io — it redeploys
automatically on every push to `main`:

```bash
python3 build.py          # rebuild index.html after editing _page/_style/_app
git add -A && git commit -m "update" && git push
```

Give it ~30 seconds after pushing. `.nojekyll` is present so GitHub serves the
files as-is instead of running them through Jekyll.

Any static host works too — Netlify, Vercel, Cloudflare Pages — since it is one
self-contained HTML file.

**Note:** `Ahmed-Khan-CV.pdf` here is the public build — same content as the CV in
`~/Desktop/files` but with the phone number removed, since the site is indexable.

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
