# nilmakvana.com

A personal site for **Nil Makvana** — software engineer, distributed systems, backend & ML.

Plain HTML, CSS and vanilla JS. No build step, no dependencies, no framework.
Open `index.html` in a browser and it works.

---

## Layout

```
.
├── index.html              ← all the content lives here
├── assets
│   ├── css/styles.css      ← design system + every style
│   ├── js/main.js          ← nav, reveals, marquee, contact form
│   └── img/                ← put your photo here
└── .nojekyll               ← required for GitHub Pages
```

## Before you publish — three edits

1. **Your email.** Open `assets/js/main.js` and change the `email` value at the top
   (line ~15). It feeds the Email card, the footer icon and the contact form.
2. **Your photo.** See `assets/img/README.md`. Currently falls back to your GitHub avatar.
3. **Your résumé.** Save a PDF as `assets/Nil-Makvana-Resume.pdf`, or delete the
   Résumé card in the "Where Else To Find Me" section of `index.html`.

Your email lives in **two** places — `assets/js/main.js` (used by the contact
form) and the two `mailto:` links in `index.html` (the no-JS fallback). Change
both together.

Also worth a glance: the four rows under **About** (location, current role, focus,
languages) and the sentence mentioning RejoiceHub LLP — those came from your GitHub
profile, so correct them if anything has changed.

## After you edit CSS or JS

`index.html` links them with a version query:

```html
<link rel="stylesheet" href="assets/css/styles.css?v=2">
<script src="assets/js/main.js?v=2" defer></script>
```

Bump both numbers when you change either file. Browsers (and GitHub Pages'
CDN) cache static assets aggressively, so without the bump returning visitors
keep running the old stylesheet and script after you deploy.

## Run it locally

```bash
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## Deploy

**GitHub Pages** — free, and the URL matches your username.

```bash
git init
git add -A
git commit -m "Personal site"
git branch -M main
git remote add origin https://github.com/nilmakvana/nilmakvana.github.io.git
git push -u origin main
```

Then in that repo: *Settings → Pages → Source: `main` / root*.
Live at `https://nilmakvana.github.io` within a minute or two.

**Netlify / Vercel / Cloudflare Pages** — drag the folder onto their dashboard,
or point them at the repo. There's no build command and no output directory;
it's a static site, so leave both blank.

**Custom domain** — add a file called `CNAME` containing just your domain
(e.g. `nilmakvana.com`), then point an `ALIAS`/`CNAME` DNS record at your host.

## Design

The layout, type scale, spacing rhythm and palette follow
[aliabdaal.com](https://aliabdaal.com):

| Token   | Value     | Used for                         |
|---------|-----------|----------------------------------|
| ink     | `#1B1624` | all text                         |
| cream   | `#F9F6F3` | alternating section bands        |
| line    | `#ECE5E1` | card borders and rules           |
| blue    | `#5DCDF1` | primary buttons                  |
| yellow  | `#FDD46B` | arrow badges, accents            |
| coral   | `#FD976D` | the nav CTA and send button      |

Fonts: **Fraunces** for headings (a soft serif standing in for Recoleta) and
**Plus Jakarta Sans** for body text (standing in for Elza). Both are free on
Google Fonts; the originals are commercial licences.
