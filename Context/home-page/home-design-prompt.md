# ByteCraft — Exact Design Specification

## Brand Identity
- **Name**: ByteCraft
- **Positioning**: Premium AI SaaS for technical freelancers
- **Personality**: Precise, engineering-focused, modern, trustworthy
- **Vibe**: Dark mode terminal aesthetic meets soft gradient warmth

---

## COLOR PALETTE (Exact Values)

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#0F0F11` | Page background, nav, footer |
| `--bg-secondary` | `#1A1A1E` | Elevated surfaces |
| `--bg-card` | `#18181B` | Cards, containers |
| `--accent-pink` | `#F4A6C1` | Primary accent, gradient start, CTAs |
| `--accent-lavender` | `#C8A8E9` | Secondary accent, gradient end |
| `--text-primary` | `#FFFFFF` | Headings, important text |
| `--text-secondary` | `#A1A1AA` | Body text, descriptions |
| `--text-muted` | `#71717A` | Metadata, dates, placeholders |
| `--border-subtle` | `rgba(255,255,255,0.06)` | Card borders, dividers |
| `--border-medium` | `rgba(255,255,255,0.10)` | Input borders, tags |

**Gradient Definitions**:
- **Text Gradient**: `linear-gradient(90deg, #F4A6C1 0%, #C8A8E9 100%)`
- **CTA Gradient**: `linear-gradient(135deg, #F4A6C1 0%, #C8A8E9 100%)`
- **Glow**: `radial-gradient(ellipse at center, rgba(244,166,193,0.08) 0%, transparent 70%)`

---

## TYPOGRAPHY (Exact Specs)

| Element | Font | Weight | Size | Line Height | Letter Spacing | Color |
|---------|------|--------|------|-------------|----------------|-------|
| Logo | Inter | 700 | 20px | 1.2 | -0.01em | Gradient |
| Nav Links | Inter | 500 | 12px | 1 | 0.08em (uppercase) | `#A1A1AA` |
| Nav Active | Inter | 500 | 12px | 1 | 0.08em | `#FFFFFF` + underline |
| Hero Tag | Inter | 500 | 11px | 1 | 0.12em | `#A1A1AA` |
| Hero H1 Line 1 | Inter | 700 | 52px | 1.1 | -0.02em | `#FFFFFF` |
| Hero H1 Line 2 | Inter | 700 | 52px | 1.1 | -0.02em | Gradient |
| Hero Subtitle | Inter | 400 | 16px | 1.6 | 0 | `#A1A1AA` |
| CTA Primary | Inter | 600 | 12px | 1 | 0.08em | `#0F0F11` |
| CTA Secondary | Inter | 600 | 12px | 1 | 0.08em | `#FFFFFF` |
| Section H2 | Inter | 700 | 32px | 1.2 | -0.01em | `#FFFFFF` |
| Section Subtitle | Inter | 400 | 16px | 1.5 | 0 | `#A1A1AA` |
| Card Title | Inter | 600 | 18px | 1.3 | -0.01em | `#FFFFFF` |
| Card Body | Inter | 400 | 14px | 1.6 | 0 | `#A1A1AA` |
| Card Link | Inter | 600 | 11px | 1 | 0.1em | `#F4A6C1` |
| Blog Tag | Inter | 500 | 10px | 1 | 0.1em | varies |
| Blog Title (Large) | Inter | 700 | 22px | 1.3 | -0.01em | `#FFFFFF` |
| Blog Title (Small) | Inter | 600 | 16px | 1.3 | 0 | `#FFFFFF` |
| Blog Date | Inter | 500 | 12px | 1 | 0.05em | `#71717A` |
| Footer Label | Inter | 600 | 11px | 1 | 0.1em | `#A1A1AA` |
| Footer Link | Inter | 400 | 14px | 1.5 | 0 | `#71717A` |
| Footer Body | Inter | 400 | 14px | 1.5 | 0 | `#71717A` |

---

## SPACING SYSTEM (Exact Values)

| Token | Value |
|-------|-------|
| `space-1` | 4px |
| `space-2` | 8px |
| `space-3` | 12px |
| `space-4` | 16px |
| `space-5` | 20px |
| `space-6` | 24px |
| `space-8` | 32px |
| `space-10` | 40px |
| `space-12` | 48px |
| `space-16` | 64px |
| `space-20` | 80px |
| `space-24` | 96px |

**Section Padding**: `80px` top/bottom (desktop), `48px` (mobile)
**Container Max-Width**: `1280px` with `24px` side padding
**Card Padding**: `24px` (standard), `32px` (large)
**Card Border-Radius**: `12px` (standard), `16px` (large)
**Button Border-Radius**: `6px`
**Pill Border-Radius`: `9999px` (full)

---

## COMPONENT SPECS

### Navigation Bar
- **Height**: 64px
- **Background**: `#0F0F11` at 80% opacity + `backdrop-filter: blur(12px)`
- **Border Bottom**: 1px solid `rgba(255,255,255,0.05)`
- **Logo**: Left-aligned, 24px from edge
- **Nav Group**: Centered horizontally, gap 32px between items
- **Action Group**: Right-aligned, gap 12px
- **Login Button**: 
  - Size: `padding 8px 16px`
  - Border: 1px solid `rgba(255,255,255,0.15)`
  - Background: transparent
  - Text: `#FFFFFF`, 12px, uppercase, weight 500
- **Signup Button**:
  - Size: `padding 8px 16px`
  - Background: gradient `linear-gradient(135deg, #F4A6C1, #C8A8E9)`
  - Text: `#0F0F11`, 12px, uppercase, weight 600

### Hero Section
- **Min Height**: `calc(100vh - 64px)`
- **Content Width**: max 700px, centered
- **Vertical Alignment**: Centered
- **Content Stack Gap**: 24px between elements
- **Tag (Version Badge)**:
  - Background: `rgba(255,255,255,0.05)`
  - Border: 1px solid `rgba(255,255,255,0.08)`
  - Border-radius: 9999px
  - Padding: 6px 16px
- **H1**:
  - Two lines, centered
  - Line 1: White
  - Line 2: Gradient text with `background-clip: text`
  - Text-shadow: subtle glow `0 0 80px rgba(244,166,193,0.15)`
- **CTA Group**:
  - Flex row, gap 16px, centered
  - Primary: Gradient bg, dark text, arrow icon (→) at 16px
  - Secondary: `rgba(255,255,255,0.05)` bg, border `rgba(255,255,255,0.08)`, code icon (⟨⟩)

### Feature Cards (3-Column)
- **Grid**: `grid-template-columns: repeat(3, 1fr)`, gap 24px
- **Card**:
  - Background: `#18181B`
  - Border: 1px solid `rgba(255,255,255,0.06)`
  - Border-radius: 12px
  - Padding: 32px
- **Icon Container**:
  - Size: 40x40px
  - Background: `rgba(255,255,255,0.05)`
  - Border-radius: 8px
  - Icon color: `#F4A6C1` (pink) or `#C8A8E9` (lavender) at 80% opacity
- **Hover State**:
  - Transform: `translateY(-4px)`
  - Border: 1px solid `rgba(255,255,255,0.12)`
  - Transition: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`
  - Shadow: `0 20px 40px rgba(0,0,0,0.3)`

### Blog Section
- **Layout**: CSS Grid
  - `grid-template-columns: 1.2fr 1fr`
  - `grid-template-rows: auto auto`
  - Left card: `row-span: 2`
  - Right: 2 rows, bottom row split 1fr 1fr
- **Large Blog Card**:
  - Aspect ratio: ~4:3
  - Background image with overlay: `linear-gradient(to top, rgba(15,15,17,0.95) 0%, rgba(15,15,17,0.4) 50%, transparent 100%)`
  - Content padding: 32px
  - Positioned at bottom
- **Standard Blog Card**:
  - Background: `#18181B`
  - Border: 1px solid `rgba(255,255,255,0.06)`
  - Border-radius: 12px
  - Padding: 24px
  - Min-height: 160px
- **Tag Pills**:
  - Background: `rgba(255,255,255,0.05)` or transparent
  - Border: 1px solid `rgba(255,255,255,0.15)`
  - Padding: 4px 10px
  - Border-radius: 4px
  - Font: 10px uppercase, weight 500

### Footer
- **Border Top**: 1px solid `rgba(255,255,255,0.05)`
- **Padding**: 48px 24px
- **Layout**: 3-column flex, space-between
- **Social Icons**:
  - Size: 36x36px
  - Background: `rgba(255,255,255,0.05)`
  - Border: 1px solid `rgba(255,255,255,0.08)`
  - Border-radius: 6px
  - Icon color: `#A1A1AA`, 16px size

---

## ICONOGRAPHY
- **Style**: Minimal, outlined, 1.5px stroke
- **Size**: 20-24px (standard), 16px (small)
- **Color**: Inherit from parent (pink/lavender/white)
- **Icons Needed**:
  - Clock (Time Management)
  - Cpu/Chip (AI Automation)
  - Shield/Lock (Secure Deployment)
  - Arrow Right (CTAs)
  - Code brackets (Documentation)
  - Mail (Footer)
  - GitHub/Code (Footer)

---

## SHADOWS & EFFECTS

| Effect | Value |
|--------|-------|
| Card Shadow | `0 4px 20px rgba(0,0,0,0.2)` |
| Card Hover Shadow | `0 20px 40px rgba(0,0,0,0.4)` |
| Glow (Hero) | `0 0 120px rgba(244,166,193,0.08)` |
| Button Hover | `brightness(1.1)` |
| Backdrop Blur | `12px` |

---

## RESPONSIVE SPECIFICATIONS

### Desktop (&gt;1024px)
- Full layout as described
- 3-column features
- Asymmetric blog grid

### Tablet (768-1024px)
- 2-column features
- Blog grid: 2 equal columns
- Nav: condensed spacing

### Mobile (&lt;768px)
- Single column everything
- Hamburger menu (not shown, standard implementation)
- Hero H1: 36-40px
- Stacked CTA buttons (full width)
- Blog: single column stack
- Footer: stacked, center-aligned