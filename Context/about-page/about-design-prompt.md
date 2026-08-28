# ByteCraft About Page — Exact Design Specification

## Brand Identity
- **Name**: ByteCraft
- **Page**: About / Story / Mission
- **Tone**: Personal, authentic, engineering-focused, aspirational

---

## COLOR PALETTE (Exact Values)

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#0F0F11` | Page background |
| `--bg-card` | `#18181B` | Cards, containers |
| `--accent-pink` | `#F4A6C1` | Gradient start, CTAs |
| `--accent-lavender` | `#C8A8E9` | Gradient end |
| `--text-primary` | `#FFFFFF` | Headings |
| `--text-secondary` | `#A1A1AA` | Body text |
| `--text-muted` | `#71717A` | Metadata |
| `--border-subtle` | `rgba(255,255,255,0.06)` | Card borders |

**Gradient**: `linear-gradient(90deg, #F4A6C1 0%, #C8A8E9 100%)`

---

## TYPOGRAPHY (Exact Specs)

| Element | Font | Weight | Size | Line Height | Letter Spacing | Color |
|---------|------|--------|------|-------------|----------------|-------|
| Logo | Inter | 700 | 20px | 1.2 | -0.01em | Gradient |
| Nav Links | Inter | 500 | 12px | 1 | 0.08em | `#A1A1AA` |
| Nav Active | Inter | 500 | 12px | 1 | 0.08em | `#FFFFFF` + underline |
| Mission Text | Inter | 400 | 17px | 1.7 | 0 | `#A1A1AA` |
| Founder H1 | Inter | 700 | 38px | 1.2 | -0.02em | `#FFFFFF` |
| Body Paragraph | Inter | 400 | 14px | 1.6 | 0 | `#A1A1AA` |
| CTA Link | Inter | 600 | 11px | 1 | 0.1em | `#F4A6C1` |
| Section H2 | Inter | 700 | 30px | 1.2 | -0.01em | `#FFFFFF` |
| Blog Tag | Inter | 500 | 10px | 1 | 0.1em | `#A1A1AA` |
| Blog Title | Inter | 600 | 16px | 1.3 | 0 | `#FFFFFF` |
| Footer Label | Inter | 600 | 11px | 1 | 0.1em | `#A1A1AA` |
| Footer Link | Inter | 400 | 14px | 1.5 | 0 | `#71717A` |

---

## SPACING SYSTEM

| Token | Value |
|-------|-------|
| `space-4` | 16px |
| `space-6` | 24px |
| `space-8` | 32px |
| `space-12` | 48px |
| `space-16` | 64px |
| `space-20` | 80px |
| `space-24` | 96px |

**Section Padding**: 80px vertical (desktop), 48px (mobile)
**Container**: 1280px max, 24px side padding
**Card Radius**: 12px
**Button Radius**: 6px

---

## COMPONENT SPECS

### Mission Statement Section
- **Padding**: `py-32` (128px top/bottom)
- **Text**: Centered, max-width 680px
- **Font**: 17px, weight 400, color `#A1A1AA`
- **No decorations** — pure text on dark bg

### Founder Story Section
- **Layout**: CSS Grid `grid-template-columns: 1.1fr 0.9fr`, gap 48px
- **Left Content**:
  - H1: 38px, bold, white, max-width 500px
  - Paragraphs: Stack of 5 items, gap 16px, mt-32px
  - CTA: mt-32px, pink text, uppercase, 11px, arrow icon
- **Right Image**:
  - Border-radius: 12px
  - Border: 1px solid `rgba(255,255,255,0.06)`
  - Aspect: ~4:5
  - Object-fit: cover

### Blog Cards (3-Column)
- **Grid**: `repeat(3, 1fr)`, gap 24px
- **Card**:
  - Background: `#18181B`
  - Border: 1px solid `rgba(255,255,255,0.06)`
  - Border-radius: 12px
  - Overflow: hidden
- **Image Area**: 60% height, aspect 16:9
- **Content Area**: 40% height, padding 20px
- **Tag**:
  - Border: 1px solid `rgba(255,255,255,0.15)`
  - Padding: 4px 10px
  - Font: 10px uppercase
  - Color: `#A1A1AA`
- **Title**: 16px, weight 600, white, mt-12px

### Footer
- **Border Top**: 1px solid `rgba(255,255,255,0.05)`
- **Padding**: 48px 24px
- **3-Column**: Logo/Tagline | Legal Links | Copyright/Social
- **Social Icons**: 36x36px, bg `rgba(255,255,255,0.05)`, border `rgba(255,255,255,0.08)`

---

## SHADOWS & EFFECTS

| Effect | Value |
|--------|-------|
| Card Hover Shadow | `0 12px 30px rgba(0,0,0,0.3)` |
| Image Hover Scale | `scale(1.03)` |
| Link Arrow Hover | `translateX(4px)` |
| Transition | `0.3s cubic-bezier(0.4, 0, 0.2, 1)` |

---

## RESPONSIVE SPECIFICATIONS

### Desktop (&gt;1024px)
- 2-column founder story
- 3-column blog grid

### Tablet (768-1024px)
- Founder story: stacked, image full width
- Blog: 2 columns

### Mobile (&lt;768px)
- Single column everything
- Founder image: full width, rounded-xl
- Blog: single column stack
- Footer: stacked center-aligned