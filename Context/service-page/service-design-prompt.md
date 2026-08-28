# ByteCraft Services Page — Exact Design Specification

## Brand Identity
- **Name**: ByteCraft
- **Page**: Services / Pricing
- **Tone**: Technical, precise, engineering-focused, premium
- **Currency**: Indian Rupee (₹)

---

## COLOR PALETTE (Exact Values)

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#0F0F11` | Page background |
| `--bg-card` | `#18181B` | Pricing cards, blog cards |
| `--bg-elevated` | `#1A1A1E` | Hero card background |
| `--accent-pink` | `#F4A6C1` | Checkmarks, tags, gradient start |
| `--accent-lavender` | `#C8A8E9` | Gradient end, secondary accents |
| `--text-primary` | `#FFFFFF` | Headings, prices |
| `--text-secondary` | `#A1A1AA` | Body text, descriptions |
| `--text-muted` | `#71717A` | Tier labels, dates |
| `--border-subtle` | `rgba(255,255,255,0.06)` | Card borders |
| `--border-medium` | `rgba(255,255,255,0.10)` | Hover borders |
| `--border-strong` | `rgba(255,255,255,0.15)` | Button borders |

**CTA Gradient**: `linear-gradient(90deg, #F4A6C1 0%, #C8A8E9 100%)`

---

## TYPOGRAPHY (Exact Specs)

| Element | Font | Weight | Size | Line Height | Letter Spacing | Color |
|---------|------|--------|------|-------------|----------------|-------|
| Logo | Inter | 700 | 20px | 1.2 | -0.01em | Gradient |
| Nav Links | Inter | 500 | 12px | 1 | 0.08em | `#A1A1AA` |
| Nav Active | Inter | 500 | 12px | 1 | 0.08em | `#FFFFFF` + underline |
| Hero H1 | Inter | 700 | 48px | 1.1 | -0.02em | `#FFFFFF` |
| Hero Body | Inter | 400 | 15px | 1.6 | 0 | `#A1A1AA` |
| Terminal Text | Mono | 400 | 13px | 1.5 | 0 | `#A1A1AA` |
| Terminal Arrow | Mono | 400 | 13px | 1.5 | 0 | `#F4A6C1` |
| Section H2 | Inter | 700 | 32px | 1.2 | -0.01em | `#FFFFFF` |
| Tier Label | Inter | 600 | 10px | 1 | 0.12em | `#71717A` |
| Plan Name | Inter | 700 | 22px | 1.2 | -0.01em | `#FFFFFF` |
| Feature Text | Inter | 400 | 14px | 1.5 | 0 | `#A1A1AA` |
| Price | Inter | 700 | 34px | 1 | -0.02em | `#FFFFFF` |
| CTA Button | Inter | 600 | 11px | 1 | 0.1em | varies |
| Blog Label | Inter | 500 | 10px | 1 | 0.1em | `#F4A6C1` |
| Blog Title | Inter | 600 | 17px | 1.3 | 0 | `#FFFFFF` |
| Blog Excerpt | Inter | 400 | 13px | 1.5 | 0 | `#71717A` |
| Footer Label | Inter | 600 | 11px | 1 | 0.1em | `#A1A1AA` |
| Footer Link | Inter | 400 | 14px | 1.5 | 0 | `#71717A` |

---

## SPACING SYSTEM

| Token | Value |
|-------|-------|
| `space-4` | 16px |
| `space-6` | 24px |
| `space-8` | 32px |
| `space-10` | 40px |
| `space-12` | 48px |
| `space-16` | 64px |
| `space-20` | 80px |

**Section Padding**: 80px vertical
**Container**: 1280px max, 24px side padding
**Card Padding**: 32px
**Card Radius**: 12px
**Button Radius**: 6px

---

## COMPONENT SPECS

### Hero Card
- **Background**: `#1A1A1E`
- **Border**: 1px solid `rgba(255,255,255,0.06)`
- **Border-radius**: 12px
- **Padding**: 48px
- **Layout**: Grid `1fr 1fr`, gap 48px
- **Left**: H1 + description, max-width 400px
- **Right**: Terminal window
  - Background: `#0F0F11`
  - Border: 1px solid `rgba(255,255,255,0.08)`
  - Border-radius: 8px
  - Padding: 24px
  - Lines with `&gt;` prefix in pink

### Pricing Card
- **Background**: `#18181B`
- **Border**: 1px solid `rgba(255,255,255,0.06)`
- **Border-radius**: 12px
- **Padding**: 32px
- **Min-height**: 420px
- **Structure**:
  - Tier label (10px, muted)
  - Plan name (22px, bold)
  - Feature list (gap 12px, checkmark + text)
  - Divider (1px, subtle)
  - Price (34px, bold)
  - CTA button (full width)
- **Standard CTA**: Transparent bg, border `rgba(255,255,255,0.15)`, white text
- **Gradient CTA**: `linear-gradient(90deg, #F4A6C1, #C8A8E9)`, dark text, subtle glow

### Blog Card
- **Background**: `#18181B`
- **Border**: 1px solid `rgba(255,255,255,0.06)`
- **Border-radius**: 12px
- **Image**: 16:9 aspect, object-fit cover
- **Content Padding**: 20px
- **Tag**: 10px, pink, lowercase
- **Title**: 17px, weight 600
- **Excerpt**: 13px, 2-3 lines, muted

---

## SHADOWS & EFFECTS

| Effect | Value |
|--------|-------|
| Card Shadow | `0 4px 20px rgba(0,0,0,0.2)` |
| Card Hover Shadow | `0 20px 40px rgba(0,0,0,0.4)` |
| Gradient Button Glow | `0 4px 20px rgba(244,166,193,0.2)` |
| Transition | `0.3s cubic-bezier(0.4, 0, 0.2, 1)` |

---

## RESPONSIVE SPECIFICATIONS

### Desktop (&gt;1024px)
- 3-column pricing grid
- 2-column hero with terminal

### Tablet (768-1024px)
- 2-column pricing grid
- Stacked hero

### Mobile (&lt;768px)
- Single column pricing
- Hero: text above, terminal below
- Single column blog
- Footer: stacked