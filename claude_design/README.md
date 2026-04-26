# Handoff: Garage Sale — "Me Estoy Mudando y Vendo Todo"

## Overview
A full-screen, scroll-jacked product listing site for a personal moving sale. The user browses items one at a time via horizontal push transitions, adds items to a wishlist, and contacts the seller via WhatsApp. Items can be marked as VENDIDO (sold). A floating thumbnail grid gives a bird's-eye overview of all listings.

## About the Design Files
The files in this bundle (`index.html`, `tweaks-panel.jsx`) are **high-fidelity HTML prototypes** — they show the intended look, copy, interactions, and motion. They are not production code to ship directly. The task is to **recreate these designs in your target codebase** (e.g. Next.js, Astro, SvelteKit) using its established patterns and libraries. The data (`ITEMS` array) should be backed by a real CMS or data source.

## Fidelity
**High-fidelity.** Colors, typography, spacing, interactions, and animations are all final. Recreate pixel-accurately. The only placeholder content is the striped SVG product images — swap these for real product photos (ideally transparent PNGs on the cream background).

---

## Design System

### Color Tokens
| Token | Value | Usage |
|---|---|---|
| `--bg` | `#F5F0E8` | Page background (cream) |
| `--accent` | `#AAFF00` | Lime green — button fills, box shadows, badges |
| `--black` | `#000000` | All borders, text, outlines |
| `--red` | `#FF3333` | VENDIDO stamp only |

### Typography
| Role | Font | Weights |
|---|---|---|
| Display / Headlines | Bricolage Grotesque | 700, 800, 900 |
| Body / UI | Space Grotesk | 400, 500, 600, 700 |

Load via Google Fonts:
```
https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800;12..96,900&family=Space+Grotesk:wght@400;500;600;700&display=swap
```

### Borders & Shadows
```css
border: 3px solid #000000;
box-shadow: 6px 6px 0px #AAFF00;   /* default */
box-shadow: 6px 6px 0px #000000;   /* hover/press */
box-shadow: 8px 8px 0px #000000;   /* hover (shifted) */
box-shadow: 3px 3px 0px #000000;   /* active/pressed */
```

All interactive elements translate slightly on hover/press:
```css
/* hover */ transform: translate(-2px, -2px);
/* active */ transform: translate(3px, 3px);
```

---

## Screens / Views

### 1. Hero Slide
**Purpose:** Entry point. Sets tone, communicates the premise.

**Layout:**
- Full viewport, cream background
- Centered vertically and horizontally (flexbox, column)
- Content: eyebrow text → display headline → subtitle
- Two marquee strips pinned to the bottom edge

**Components:**

**Eyebrow:**
- Font: Space Grotesk, 11–15px (clamp), weight 600
- Letter-spacing: 0.18em, uppercase
- Opacity: 0.5
- Content: location + date (e.g. "Barcelona · Abril 2026") — editable via Tweaks

**Headline:**
- Font: Bricolage Grotesque, clamp(3rem, 9vw, 11rem), weight 900
- Line-height: 0.9, letter-spacing: -0.03em, uppercase
- "TODO" gets a lime yellow highlight underline (pseudo-element, height 0.14em, bg `#AAFF00`, z-index -1)
- Text: "Me estoy / mudando / y VENDO / todo"

**Subtitle:**
- Font: Space Grotesk, 13–18px, weight 500, opacity 0.7
- Content: "{N} artículos disponibles · Precios sin regateo"

**Hero Marquees (bottom):**
- Two strips stacked: lime bg strip on top, black bg strip below
- See Marquee component spec below

---

### 2. Item Slide
**Purpose:** Full-screen product listing for a single item.

**Layout:**
- CSS grid, 2 equal columns (`1fr 1fr`), 100vh height
- Left: image panel — centered, padded clamp(2rem, 5vw, 5rem)
- Right: content panel — flex column, justify center, left border `3px solid #000`, padded similarly

**Mobile (≤700px):** Stack vertically (grid becomes 1 row), border-top on content instead of border-left.

**Image Panel:**
- Frame: `border: 3px solid #000`, `box-shadow: 6px 6px 0px #AAFF00`
- Max-width 560px, aspect-ratio 4/3
- Background `#E8E3DA`
- If item is sold: `filter: grayscale(0.7) brightness(0.85)` on the frame
- Real product photos: `object-fit: contain`, `padding: 1.5rem`, transparent bg (cream shows through)

**Content Panel:**
- Slide counter: Space Grotesk 11px, weight 600, uppercase, opacity 0.35 — "Artículo 01 / 08"
- Item name: Bricolage Grotesque, clamp(2rem, 4.5vw, 5.5rem), weight 800, uppercase, letter-spacing -0.03em
- Brand/model: Space Grotesk, 12–14px, weight 600, uppercase, letter-spacing 0.12em, opacity 0.5
- Description: Space Grotesk, 13–16px, weight 400, line-height 1.65, opacity 0.75, max-width 42ch
- Price: Bricolage Grotesque, clamp(1.8rem, 3vw, 3.5rem), weight 700 — conditionally shown
- CTA button: see "Me interesa" Button spec below

**Item Marquee (bottom):**
- Small black strip pinned to bottom of slide
- Alternates scroll direction per slide index
- Content: item name + brand + price + sale conditions

---

### 3. Thumbnail Grid Overlay
**Purpose:** Bird's-eye view of all items. Opens over current slide.

**Trigger:** Bottom-left floating button.
**Animation:** Slides up from `translateY(100%)` to `translateY(0)` — GSAP, duration 0.5s, `power3.out`. Closes with `power3.in`, 0.4s.

**Layout:**
- Fixed, full-screen, cream background, z-index 200
- Header row: title ("Todos los artículos (N)") + close button — border-bottom
- Scrollable body: CSS grid `repeat(auto-fill, minmax(200px, 1fr))`, gap 1.5rem

**Thumbnail Card:**
- Border: 3px solid #000, box-shadow: 6px 6px 0px #AAFF00
- Hover: translate(-3px, -3px), shadow 9px 9px
- Image area: aspect-ratio 4/3, bg `#E8E3DA`
- Sold items: grayscale filter + small VENDIDO stamp (red, rotated -15deg)
- Label area: border-top, item name (Bricolage Grotesque 15px bold uppercase) + price (Space Grotesk 12px, opacity 0.5)
- Click: navigate to that item slide + close overlay

---

### 4. Cart / Lista Drawer
**Purpose:** Wishlist of items the user is interested in. Opens from bottom-right button.

**Trigger:** Bottom-right floating button.
**Animation:** CSS `transform: translateX(100%)` → `translateX(0)`, transition 0.35s `cubic-bezier(0.22, 1, 0.36, 1)`.

**Layout:**
- Fixed right drawer, width `min(400px, 100vw)`, full height
- Border-left 3px black, box-shadow `-8px 0 0 0 #AAFF00`
- Header: title + close button
- Body: scrollable list of cart items, or empty state
- Footer (when cart has items): total + WhatsApp CTA

**Cart Item:**
- Grid: 80px thumbnail | name+price | remove button
- Border: 3px solid #000, shadow 4px 4px #AAFF00
- Thumbnail: 1:1 aspect-ratio

**WhatsApp Button:**
- Full width, lime fill, 3px black border, shadow 6px 6px #000
- Generates pre-filled WhatsApp message listing all items + total
- Message format: `Hola! Me interesan los siguientes artículos:\n• {name} — {price} €\n\nTotal: {total} €`
- Link: `https://wa.me/{PHONE_NUMBER}?text={encoded_message}` — **replace phone number**

---

## Components

### "Me interesa" Button
```css
background: #AAFF00;
border: 3px solid #000;
box-shadow: 6px 6px 0px #000;
font-family: Space Grotesk, bold, uppercase;
font-size: 13–15px, letter-spacing 0.08em;
padding: 14px 28px;
/* hover */
transform: translate(-2px, -2px);
box-shadow: 8px 8px 0px #000;
/* active */
transform: translate(3px, 3px);
box-shadow: 3px 3px 0px #000;
/* disabled (sold) */
opacity: 0.4; cursor: not-allowed; background: #ccc;
/* in cart */
background: var(--bg); label changes to "✓ En tu lista"
```

### VENDIDO Stamp
- Absolutely positioned, centered over image frame
- Font: Bricolage Grotesque, clamp(2rem, 4vw, 4.5rem), weight 900, white text
- Background: `#FF3333`, border 3px black, shadow 4px 4px #000
- Transform: `rotate(-15deg)`
- Pointer-events: none

### Marquee Strip
- Infinite CSS animation: `translateX(0)` → `translateX(-50%)`, duration 22s linear
- Reverse variant: `animation-direction: reverse`, duration 26s
- Content duplicated 4× to create seamless loop
- Separator: `✦` character, opacity 0.5
- **Lime strip:** bg `#AAFF00`, border top + bottom 3px black, height 48px — Bricolage Grotesque 15px weight 800 uppercase
- **Black strip (small):** bg `#000`, height 36px, duration 18s — Space Grotesk 11px weight 700 uppercase, text color `#F5F0E8`, separator color `#AAFF00`

### Floating Action Buttons (FABs)
- 54×54px square
- Background: cream, border: 3px black, shadow: 6px 6px #AAFF00
- Hover: translate(-2px,-2px), shadow 8px 8px #AAFF00
- Active: translate(3px,3px), shadow 3px 3px #AAFF00
- Cart badge: 22×22px square (no border-radius), bg #AAFF00, border 2px black, positioned top-right (-10px, -10px)

### Navigation Arrows
- 48×48px, same neo-brutalist style as FABs
- Hidden (opacity 0, pointer-events none) at first/last slide
- Left arrow hidden on hero; right arrow hidden on last item

---

## Interactions & Behavior

### Slide Navigation
- GSAP horizontal push: current slide exits left/right, next enters from opposite side
- Duration: 0.55s (configurable), easing: `power3.inOut`
- Keyboard: ← → ↑ ↓ arrow keys
- Touch: swipe left/right (threshold: 50px)
- Lock during transition (`transitioning` ref prevents double-fire)

### Data / Items Array
Each item has:
```js
{
  id: Number,
  name: String,          // e.g. "Sofá Sectional"
  brand: String,         // e.g. "IKEA — Kivik"
  desc: String,          // 1–2 sentence description
  price: Number,         // in euros
  sold: Boolean,         // true = VENDIDO
  color: String,         // hex — used for placeholder stripe bg
  label: String,         // alt text / placeholder label
  imageUrl?: String,     // optional real photo URL
}
```

### Sold Items
- Image frame gets `filter: grayscale(0.7) brightness(0.85)`
- VENDIDO stamp overlays the image
- CTA button is `disabled`, shows "— Vendido", bg `#ccc`
- Thumbnail card also gets greyscale + mini VENDIDO stamp

### Cart Logic
- Add: only if not already in cart, only if not sold
- Remove: by item id
- Persists in React state (connect to localStorage or backend as needed)
- Cart count badge on FAB updates reactively

---

## Design Tokens (summary)
```css
--bg: #F5F0E8;
--accent: #AAFF00;
--black: #000000;
--red: #FF3333;
--border: 3px solid #000000;
--shadow-lime: 6px 6px 0px #AAFF00;
--shadow-black: 6px 6px 0px #000000;
--font-display: 'Bricolage Grotesque', sans-serif;
--font-body: 'Space Grotesk', sans-serif;
```

---

## Assets
- **Product images:** Currently striped SVG placeholders. Replace with real photos. Transparent PNGs render best (cream bg shows through, `object-fit: contain`).
- **Icons:** All inline SVG — no icon library needed. Drawn as simple geometric paths.
- **Fonts:** Google Fonts (Bricolage Grotesque + Space Grotesk). Self-host for production.
- **GSAP:** Loaded from cdnjs (`gsap@3.12.5`). Use your preferred install method for production (`npm install gsap`).

---

## Files in This Bundle
| File | Description |
|---|---|
| `index.html` | Full self-contained prototype. All logic, styles, and data in one file. |
| `tweaks-panel.jsx` | Tweaks panel helper (design-time only — omit from production). |
| `README.md` | This document. |

---

## Production Checklist
- [ ] Replace `ITEMS` array with CMS/database-backed data
- [ ] Add real WhatsApp phone number to `makeWhatsApp()`
- [ ] Swap SVG placeholders with real product photos (transparent PNGs preferred)
- [ ] Self-host Bricolage Grotesque + Space Grotesk
- [ ] Add OG meta tags + favicon
- [ ] Add persistence for cart (localStorage minimum, or a backend wishlist)
- [ ] Consider SEO: each item could be a route (`/items/sofa-sectional`) with static generation
- [ ] Mark sold items dynamically from CMS rather than hardcoding `sold: true`
