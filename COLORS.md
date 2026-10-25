# Colour System

The complete colour palette for this site. The copy-paste blocks at the bottom work in any new project.

All values below come from `assets/css/styles.css` and the inline SVGs in `index.html`. The core palette was originally sampled from aliabdaal.com.

---

## The idea in one line

**Warm paper, cool ink, three bright accents.**

- **Surfaces are warm.** Cream, soft and line all sit at hue 22–30° (a faint peach-beige).
- **Text is cool.** Ink and its greys sit at hue 260° (a violet-black, not pure black).
- **Accents are loud and light.** Yellow, blue and coral are bright, high-saturation tints. They are used as **fills** (buttons, badges, icon tiles, blobs), never as text colours.

The warm/cool split is what keeps the page from looking beige and flat. If you swap the ink for pure `#000`, most of that character goes away.

---

## 1. Core palette (CSS custom properties)

These are defined on `:root` and used across the stylesheet.

### Neutrals: text

| Token | Hex | RGB | Role | Where it's used |
|---|---|---|---|---|
| `--ink` | `#1B1624` | 27, 22, 36 | **Primary text.** Headings, body copy, button labels, the logo. | Everywhere. Also the dark button (`.btn--ink`) and the tint for every shadow. |
| `--ink-70` | `#54505B` | 84, 80, 91 | **Secondary text.** Longer reading copy that should sit a step back. | About paragraphs, degree lines, tech pills, interest chips. |
| `--muted` | `#76737C` | 118, 115, 124 | **Tertiary text.** Descriptions and supporting copy. | Card descriptions, hero meta row, form helper text. |
| `--muted-2` | `#8D8A91` | 141, 138, 145 | **Labels and meta.** Small uppercase eyebrows, dates, captions. | `EDUCATION` / `AWARDS` labels, timeline dates, footer copyright. |

### Neutrals: surfaces

| Token | Hex | RGB | Role | Where it's used |
|---|---|---|---|---|
| `--white` | `#FFFFFF` | 255, 255, 255 | **Base page background** and raised cards. | `body`, cards sitting on cream (awards, contact inputs, score badges). |
| `--cream` | `#F9F6F3` | 249, 246, 243 | **Section background.** Alternates with white to separate sections. | Hero panel, About and Education panels, pillar and role cards. Also `<meta name="theme-color">`. |
| `--soft` | `#F3EDE9` | 243, 237, 233 | **Recessed fill.** A step darker than cream, for things set *into* a surface. | Photo placeholder backgrounds, the `.tag` chips. |
| `--line` | `#ECE5E1` | 236, 229, 225 | **Borders and dividers.** | Every card border, the timeline rail, table rules, input borders. |

### Accents

| Token | Hex | RGB | Role | Where it's used |
|---|---|---|---|---|
| `--yellow` | `#FDD46B` | 253, 212, 107 | **Warm highlight.** The "signature" colour of the site. | Hero blob, arrow badges (`.link-arrow .dot`), first icon tile in each grid, "Featured build" badge, past-education timeline dots, link underlines. |
| `--blue` | `#5DCDF1` | 93, 205, 241 | **Primary action.** The default button colour. | `.btn` (default), the squiggle under "Hey there", the signature flourish lines, second icon tile. |
| `--coral` | `#FD976D` | 253, 151, 109 | **Emphasis and call-to-action.** Used sparingly. | "Let's work together" nav button, "Send message" button, logo dot, the signature, dotted arc, current-education timeline dot, third icon tile. |
| `--blue-ink` | `#2FB4E0` | 47, 180, 224 | **Interactive state.** A deeper blue for outlines and small strokes where `--blue` is too pale. | `:focus-visible` outline, focused input border, interest icons. |

---

## 2. Supporting colours (hard-coded, not tokens)

These appear as literals in one or two places. If you reuse the system, promote the ones you need to tokens (the copy-paste block in section 6 already does this).

| Name | Hex | Role | Where it's used |
|---|---|---|---|
| Amber | `#D9982B` | A darker yellow for **thin strokes**. `--yellow` is too pale to read as a 2px line on cream. | Every third interest icon. |
| Success green | `#3BC97F` | **Status indicator** only. | The dot on the "Open to opportunities" badge. |
| Rule grey | `#CFC7C1` | Connector lines in diagrams. Slightly darker than `--line` so it shows on white. | Feature diagram (worker → Redis → MongoDB). |
| Terminal bar | `#262032` | Title bar of the dark terminal illustration. One step lighter than ink. | MyGit terminal SVG. |
| Near-white | `#FBFAF8` | Bottom stop of the feature diagram window gradient. | Feature diagram. |

### Project thumbnail tints

Each project card uses a two-stop gradient: an accent at 0%, fading to a very pale version of itself at 78%.

| Class | From | To | Colour family |
|---|---|---|---|
| `.t-yellow` | `#FDD46B` | `#FDF3DC` | yellow |
| `.t-blue` | `#5DCDF1` | `#E4F6FD` | blue |
| `.t-coral` | `#FD976D` | `#FDEBE3` | coral |
| `.t-soft` | `#E3DCF3` | `#F5F2FB` | lavender (extra, not in the core palette) |
| `.t-mint` | `#B9E7D4` | `#EEF8F4` | mint (extra, not in the core palette) |

Lavender and mint exist only to add variety across 16 thumbnails. Leave them out of a new project unless you need more than three tints.

### Feature illustration background

`linear-gradient(155deg, #EAF8FE 0%, #FDF6EA 100%)`: a pale blue fading to a pale yellow.

### Shadows and translucent tints

Shadows are **tinted with ink** (`rgba(27,22,36,…)`), not black. That keeps them warm-neutral instead of muddy grey.

| Token / use | Value |
|---|---|
| `--shadow-sm` | `0 2px 6px rgba(27,22,36,.05)` |
| `--shadow-md` | `0 14px 34px -18px rgba(27,22,36,.28)` |
| `--shadow-lg` | `0 30px 60px -30px rgba(27,22,36,.35)` |
| Thumbnail dot pattern | `rgba(27,22,36,.10)` |
| Input focus ring | `0 0 0 4px rgba(93,205,241,.22)` (blue at 22%) |

---

## 3. Usage rules

These rules are what make the palette look consistent.

**Backgrounds**
- The page base is `--white`. Sections alternate `--white` and `--cream`.
- Cards on a cream section are `--white`. Cards on a white section are `--cream`. There is always one step of contrast between a card and its surface.
- Borders are always `--line`, 1px.

**Text**
- All text uses the ink family: `--ink` → `--ink-70` → `--muted` → `--muted-2`, from most to least important.
- **Accent colours are never used for text.** See the contrast table below: every accent fails on light backgrounds.
- Text placed on an accent fill is always `--ink`. The only white text on the site is on the dark `--ink` button.

**Buttons**

| Variant | Background | Text | Use for |
|---|---|---|---|
| `.btn` | `--blue` | `--ink` | Default / primary action |
| `.btn--coral` | `--coral` | `--ink` | The single most important CTA in a region (nav, form submit) |
| `.btn--yellow` | `--yellow` | `--ink` | Secondary highlight ("Explore all repositories") |
| `.btn--ink` | `--ink` | `--white` | Heavy utility action ("Show all projects") |
| `.btn--ghost` | transparent + `--line` inset border | `--ink` | Low-emphasis / external links |

**Rotating accents**
- In any grid of icons or cards, accents cycle **yellow → blue → coral**. That applies to the pillar icons, role icons, award icons and interest icons.

**Coral is the scarce one.**
- Yellow is used liberally, blue is the everyday action, coral marks the one thing per area that matters most. If coral starts appearing everywhere, it stops meaning anything.

---

## 4. Contrast (WCAG 2.x)

Measured ratios. **AA** needs 4.5:1 for body text and 3:1 for large text (≥24px, or ≥18.7px bold).

| Foreground | Background | Ratio | Result |
|---|---|---|---|
| `--ink` | `--cream` | 16.43:1 | ✅ AAA |
| `--ink` | `--white` | 17.69:1 | ✅ AAA |
| `--ink-70` | `--cream` | 7.29:1 | ✅ AAA |
| `--muted` | `--white` | 4.65:1 | ✅ AA |
| `--muted` | `--cream` | 4.32:1 | ⚠️ large text only (just under AA) |
| `--muted-2` | `--white` | 3.40:1 | ⚠️ large text only |
| `--muted-2` | `--cream` | 3.16:1 | ⚠️ large text only |
| `--ink` | `--yellow` | 12.48:1 | ✅ AAA |
| `--ink` | `--blue` | 9.66:1 | ✅ AAA |
| `--ink` | `--coral` | 8.28:1 | ✅ AAA |
| `--white` | `--ink` | 17.69:1 | ✅ AAA |
| `--coral` | `--cream` | 1.99:1 | ❌ decoration only |
| `--blue` | `--white` | 1.83:1 | ❌ decoration only |
| `--blue-ink` | `--white` | 2.41:1 | ❌ decoration only |
| Amber `#D9982B` | `--cream` | 2.30:1 | ❌ decoration only |
| `--yellow` | `--cream` | 1.32:1 | ❌ decoration only |

**What this means when you reuse the palette:**

1. **Ink on any accent is always safe.** That's why every button uses ink text.
2. **Accents as text are never safe.** Use them for fills, icons, strokes and illustration only.
3. **`--muted-2` is only for meta text.** Dates, eyebrows and captions are fine. Don't use it for anything a reader must be able to read.
4. **`--muted` on cream is 0.18 short of AA.** If a new project puts long descriptions on cream, darken it to about `#6E6B74` (≈4.8:1).
5. **The `--blue-ink` focus outline is 2.41:1 on white**, below the 3:1 that WCAG asks of focus indicators. In a new project, use `--ink` for focus outlines, or darken blue-ink to about `#1B8DB5` (≈3.8:1).

Points 4 and 5 are known gaps on this site as well.

---

## 5. Quick reference

```
TEXT      ink #1B1624 · ink-70 #54505B · muted #76737C · muted-2 #8D8A91
SURFACE   white #FFFFFF · cream #F9F6F3 · soft #F3EDE9 · line #ECE5E1
ACCENT    yellow #FDD46B · blue #5DCDF1 · coral #FD976D
STATE     blue-ink #2FB4E0 · amber #D9982B · success #3BC97F
```

---

## 6. Copy-paste for a new project

### Plain CSS

```css
:root{
  /* text: cool violet-black family */
  --ink:      #1B1624;
  --ink-70:   #54505B;
  --muted:    #76737C;
  --muted-2:  #8D8A91;

  /* surfaces: warm paper family */
  --white:    #FFFFFF;
  --cream:    #F9F6F3;
  --soft:     #F3EDE9;
  --line:     #ECE5E1;

  /* accents: fills, never text */
  --yellow:   #FDD46B;
  --blue:     #5DCDF1;
  --coral:    #FD976D;

  /* states and strokes (promoted from literals in this project) */
  --blue-ink: #2FB4E0;
  --amber:    #D9982B;
  --success:  #3BC97F;

  /* shadows tinted with ink, not black */
  --shadow-sm: 0 2px 6px rgba(27,22,36,.05);
  --shadow-md: 0 14px 34px -18px rgba(27,22,36,.28);
  --shadow-lg: 0 30px 60px -30px rgba(27,22,36,.35);
  --focus-ring: 0 0 0 4px rgba(93,205,241,.22);
}
```

### Tailwind (`tailwind.config.js`)

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        ink:   { DEFAULT: '#1B1624', 70: '#54505B' },
        muted: { DEFAULT: '#76737C', 2: '#8D8A91' },
        cream: '#F9F6F3',
        soft:  '#F3EDE9',
        line:  '#ECE5E1',
        yellow:{ DEFAULT: '#FDD46B', ink: '#D9982B' },
        blue:  { DEFAULT: '#5DCDF1', ink: '#2FB4E0' },
        coral: '#FD976D',
        success: '#3BC97F',
      },
      boxShadow: {
        sm: '0 2px 6px rgba(27,22,36,.05)',
        md: '0 14px 34px -18px rgba(27,22,36,.28)',
        lg: '0 30px 60px -30px rgba(27,22,36,.35)',
      },
    },
  },
};
```

Note: this `extend` block replaces Tailwind's built-in `yellow` and `blue` scales. Rename them (for example `brandYellow`) if you still need the defaults.

### Describing it to a designer or an AI

> Warm off-white surfaces (`#FFFFFF` base, `#F9F6F3` cream sections, `#ECE5E1` 1px borders) with cool violet-black text (`#1B1624`, secondary `#54505B`, muted `#76737C`). Three bright accents used only as fills: yellow `#FDD46B`, sky blue `#5DCDF1` for primary buttons, coral `#FD976D` for the single most important CTA. Text on accents is always `#1B1624`. Shadows are tinted with the ink colour, never pure black. Accents rotate yellow → blue → coral across grids.
