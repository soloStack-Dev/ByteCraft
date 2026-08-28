# ByteCraft Blog Page — Exact Design Specification

## Brand Identity
- **Name**: ByteCraft
- **Page**: Blog / Engineering Insights
- **Tone**: Technical, authoritative, engineering-focused, premium

---

## COLOR PALETTE (Exact Values)

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#0F0F11` | Page background |
| `--bg-card` | `#18181B` | Blog cards |
| `--accent-pink` | `#F4A6C1` | Tags, active filters |
| `--accent-lavender` | `#C8A8E9` | Secondary accents |
| `--text-primary` | `#FFFFFF` | Headings |
| `--text-secondary` | `#A1A1AA` | Body text |
| `--text-muted` | `#71717A` | Dates, metadata |
| `--border-subtle` | `rgba(255,255,255,0.06)` | Card borders |
| `--border-medium` | `rgba(255,255,255,0.10)` | Hover borders |

---

## TYPOGRAPHY (Exact Specs)

| Element | Font | Weight | Size | Line Height | Letter Spacing | Color |
|---------|------|--------|------|-------------|----------------|-------|
| Logo | Inter | 700 | 20px | 1.2 | -0.01em | Gradient |
| Nav Links | Inter | 500 | 12px | 1 | 0.08em | `#A1A1AA` |
| Nav Active | Inter | 500 | 12px | 1 | 0.08em | `#FFFFFF` + underline |
| Hero Tag | Inter | 500 | 10px | 1 | 0.12em | `#F4A6C1` |
| Hero Date | Inter | 500 | 11px | 1 | 0.08em | `#71717A` |
| Hero H1 | Inter | 700 | 34px | 1.2 | -0.02em | `#FFFFFF` |
| Hero Excerpt | Inter | 400 | 15px | 1.6 | 0 | `#A1A1AA` |
| Author Name | Inter | 500 | 14px | 1 | 0 | `#FFFFFF` |
| Author Role | Inter | 400 | 12px | 1 | 0 | `#71717A` |
| Image Label | Inter | 500 | 12px | 1 | 0.08em | `#FFFFFF` |
| Filter Label | Inter | 500 | 11px | 1 | 0.08em | `#71717A` |
| Filter Tab | Inter | 500 | 11px | 1 | 0.08em | `#A1A1AA` |
| Filter Active | Inter | 600 | 11px | 1 | 0.08em | `#FFFFFF` |
| Blog Tag | Inter | 500 | 10px | 1 | 0.1em | varies |
| Blog Date | Inter | 500 | 10px | 1 | 0.05em | `#71717A` |
| Blog Title | Inter | 600 | 17px | 1.3 | 0 | `#FFFFFF` |
| Blog Excerpt | Inter | 400 | 13px | 1.5 | 0 | `#71717A` |
| Page Number | Inter | 400 | 14px | 1 | 0 | `#71717A` |
| Page Active | Inter | 700 | 14px | 1 | 0 | `#FFFFFF` |
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

**Section Padding**: 64px vertical
**Container**: 1280px max, 24px side padding
**Card Radius**: 12px
**Avatar Radius**: 9999px (full circle)

---

## COMPONENT SPECS

### Featured Article Section
- **Layout**: Grid `1fr 1.1fr`, gap 48px
- **Left Content**:
  - Tag + date row (flex, gap 12px)
  - H1: 34px, bold, mt-16px
  - Excerpt: 15px, mt-16px, max-width 480px
  - Author: flex row, gap 12px, mt-32px
    - Avatar: 40x40px, rounded-full
    - Name: 14px, white
    - Role: 12px, muted
- **Right Image**:
  - Border-radius: 12px
  - Aspect: ~16:10
  - Object-fit: cover
  - Border: 1px solid `rgba(255,255,255,0.06)`
  - Overlay label: absolute top-left, 12px, white, uppercase

### Filter Tabs
- **Layout**: Flex row, gap 24px
- **Label**: "FILTER BY TOPIC:" — 11px, muted, uppercase
- **Tabs**: gap 24px
- **Active**: text-white, font-semibold
- **Inactive**: text-zinc-400
- **Hover**: text-white, 0.2s ease

### Blog Card
- **Background**: `#18181B`
- **Border**: 1px solid `rgba(255,255,255,0.06)`
- **Border-radius**: 12px
- **Overflow**: hidden
- **Image**: 16:9 aspect, object-fit cover
- **Content Padding**: 20px
- **Tag Row**: flex, gap 8px
  - Tag: 10px, uppercase, color by topic
  - Separator: "|"
  - Date: 10px, muted
- **Title**: 17px, weight 600, mt-12px
- **Excerpt**: 13px, muted, mt-8px, 2-3 lines

### Pagination
- **Layout**: Flex row, centered, gap 8px
- **Arrows**: `&lt;` `&gt;`, 14px, muted, hover:white
- **Numbers**: 14px, gap 16px
- **Active**: white, bold
- **Inactive**: muted, hover:white
- **Ellipsis**: muted

---

## SHADOWS & EFFECTS

| Effect | Value |
|--------|-------|
| Card Hover Shadow | `0 12px 30px rgba(0,0,0,0.3)` |
| Image Hover Scale | `scale(1.03)` |
| Border Hover | `rgba(255,255,255,0.10)` |
| Transition | `0.3s cubic-bezier(0.4, 0, 0.2, 1)` |

---

## RESPONSIVE SPECIFICATIONS

### Desktop (&gt;1024px)
- 2-column featured article
- 3-column blog grid

### Tablet (768-1024px)
- Stacked featured article
- 2-column blog grid

### Mobile (&lt;768px)
- Single column everything
- Featured image full width
- Single column blog grid
- Footer: stacked