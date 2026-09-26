# Paris Chic — Homepage

Responsive homepage for **Paris Chic**, a Dubai boutique for independent Parisian eyewear (Anne et Valentin, Bali Paris, Lesca, IZIPIZI, Le Petit Lunetier). Built as plain HTML, CSS and JavaScript from the Figma design. No framework and no build step needed to run it.

- **Figma source:** [Paris Chic file](https://www.figma.com/design/3WwaOyPNWekdXUMuFkonxd/Untitled?node-id=0-1)
- **Live site (GitHub Pages):** https://hellominamagdy-byte.github.io/paris-chic/
- **Repository:** https://github.com/hellominamagdy-byte/paris-chic
- **Preview (private Claude artifact):** https://claude.ai/artifact/7XnANXrKA8mX6mexZUdDdh
- **Current status:** Client preview. Everything below the hero is blurred behind a "Coming Soon" popup.

---

## Run locally

Open `index.html` in a browser. That's it.

To serve it over HTTP instead (recommended, same as GitHub Pages):

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy to GitHub Pages

1. Push this folder to a GitHub repo.
2. **Settings → Pages → Build and deployment → Deploy from a branch**, pick `main` and `/ (root)`.
3. The site goes live at `https://<user>.github.io/<repo>/`.

## Single-file version

To get one self-contained HTML file with every CSS, JS and image inlined (used for the Claude artifact preview):

```bash
python3 tools/build_standalone.py
# → dist/paris-chic-standalone.html  (dist/ is git-ignored)
```

---

## Project structure

```
paris-chic/
├── index.html                 # All markup: header, 3 views (home / about / contact), footer
├── css/styles.css             # All styles, design tokens at the top (:root)
├── js/main.js                 # Slider, mega menu, cards, routing, forms, coming-soon mode
├── assets/
│   ├── images/                # Hero slides, categories, sections, logo
│   │   ├── products/          # Product photos (+ model photo for hover)
│   │   └── ugc/               # "Worn by our customers" strip
│   ├── icons/                 # SVG icons exported from Figma
│   └── swatches/              # Colour swatch dots used on product cards
├── tools/build_standalone.py  # Builds dist/paris-chic-standalone.html
└── README.md
```

## Pages (hash routing, one HTML file)

| URL | View | Notes |
|---|---|---|
| `#home` (or no hash) | Homepage | Hero slider + all sections |
| `#about` | About Paris Chic | Story, kiosk photo, brands |
| `#contact` | Contact Us | Form, contact details, map card |

In-page anchors like `#best-sellers`, `#new-arrivals`, `#try-on` and `#boutique` open the homepage and scroll to that section.

---

## Features

**Header**
- Announcement bar (delivery, pickup, fitting) with UAE/KSA and EN/عربي switches.
- Navy header: logo on the left, nav centred (Sunglasses, Optical, Brands, Boutique & Fitting, About, Contact), thin-stroke icons on the right.
- Cart and wishlist badges update live from the product cards.
- **Mega menu** opens on hover over *Sunglasses* (also keyboard / click): Shop By, Brands, Style, plus a "New Season" editorial image.
- Under 1024px the nav collapses into a side drawer.

**Offers ticker**: continuous marquee of current offers, pauses on hover, static when the user prefers reduced motion.

**Hero slider**: 3 slides (New Season · Sunglasses · Boutique), arrows, dots, autoplay every 6s (pauses on hover), swipe on touch, arrow keys. Dark gradient behind the copy on every slide.

**Product cards** (Best Sellers + New Arrivals)
- Hover: image swaps to a model photo (where one exists), corners round, name underlines.
- ♥ toggles wishlist (filled red heart + header badge).
- **+** adds to bag (header badge bumps, toast confirmation).
- "Try it on" jumps to the virtual try-on section.
- Mobile: Best Sellers become a horizontal swipe track, New Arrivals a 2-column grid.

**Other sections**: category tiles, The Paris Chic Edit, Virtual Try-On mockup, Dubai boutique, trust bar, reviews, UGC strip, Chic Club signup, footer, floating WhatsApp button.

**About page**: story copy, kiosk photo, brand chips, CTAs.

**Contact page**: Name / Email* / Phone / Comment form with validation, contact details with copy buttons, map card that opens Google Maps.

---

## Coming Soon mode (client preview)

While on, everything below the hero on the homepage is blurred, locked (not clickable, not focusable) and covered by a sticky navy "Coming Soon" popup with a *Notify me* field. About and Contact are not affected.

Turn it off in `js/main.js`:

```js
var COMING_SOON=true;   // set to false to show the full homepage
```

---

## Design tokens

| Token | Value | Use |
|---|---|---|
| `--navy` | `#14213d` | Primary text, header, buttons |
| `--cream` | `#faf7f1` | Page background |
| `--sand` | `#f2ede3` | Alternate section background, ticker |
| `--line` | `#dcd4c4` | Borders and dividers |
| `--grey` | `#6d717c` | Secondary text |
| `--card` | `#f4f2ee` | Product image background |
| `--red` | `#b3262e` | Sale price, offer badges |
| `--wa` | `#128c7e` | WhatsApp button ring |

**Type:** Playfair Display (headings) + Poppins (body/UI), loaded from Google Fonts.

**Breakpoints:** desktop ≥ 1200 · compact desktop 1024–1199 · tablet 768–1023 · mobile ≤ 767.

**Figma frames used:** Desktop `14:4` · Mobile `14:593` · Mega Menu `15:2` · Hero slides `14:52`, `19:27`, `19:45` · Card hover `24:6`.

---

## Changes from the Figma design (approved during review)

- Header background changed from cream to **navy** so the (cream) logo is visible; logo moved to the left and shown uncropped; nav centred.
- Header icons redrawn as thin-stroke icons; cart shown as a badge instead of "(2)".
- Offers ticker added under the header.
- Hero slides 1 and 3: dark gradient on the left with cream text (was navy text on a light photo).
- Mega menu editorial image replaced with the sunglasses street photo.
- About and Contact pages added (content from the existing site).
- "Coming Soon" overlay for the client preview.

## Open items

- [ ] **Opening hours conflict:** homepage/footer say *Mon–Sat 10AM–10PM · Sun 12PM–8PM* (Figma), Contact page says *Mon–Sat 9:00AM–10:00PM, Sun 10:00AM–6:00PM* (old site). Pick one.
- [ ] Model (hover) photos exist only for **IZIPIZI Sun #D**. Add the rest in Figma → `assets/images/products/<name>-model.jpg`.
- [ ] Forms (Chic Club, Contact, Notify me) validate but don't send anywhere yet. Connect to email/CRM.
- [ ] Kiosk photo on About is cropped from a screenshot (720px wide). Replace with the original.
- [ ] Nav links Optical, Brands, category tiles and footer links don't go anywhere yet.
- [ ] Social links (Instagram, X, Facebook) need real URLs.
- [ ] Keep client files out of the repo: `files/` and `files.zip` (proposal PDFs) are listed in `.gitignore`. Don't drag them into GitHub's web uploader.

---

## Changelog

### v1.0.2 — 2026-09-26
- Mobile header now uses the full Paris Chic logo image (centred, 46px) instead of the icon + text wordmark.

### v1.0.1 — 2026-09-26
- Published to GitHub (`hellominamagdy-byte/paris-chic`) and deployed on GitHub Pages.
- Added live site and repository links to this README.

### v1.0 — 2026-09-26
- Built the homepage from Figma (desktop + mobile, responsive).
- Hero slider with arrows, dots, autoplay and swipe.
- Sunglasses mega menu.
- Product cards: model-photo hover, wishlist heart, quick add to bag.
- Dark gradient behind hero copy (slides 1 and 3).
- Navy header, offers ticker, logo left + centred nav, modern thin-stroke icons.
- Removed then re-added About; added Contact. Both as in-page views.
- Coming Soon overlay below the hero for the client preview.
- Split into `index.html` / `css` / `js` / `assets` for GitHub, plus `tools/build_standalone.py`.
