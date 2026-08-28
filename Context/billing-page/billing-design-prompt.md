# ByteCraft Billing Page — Exact Design Specification

## Brand Identity
- **Name**: ByteCraft
- **Page**: Billing / Checkout / Payment
- **Tone**: Trustworthy, secure, professional, engineering-focused
- **Currency**: Indian Rupee (₹)

---

## COLOR PALETTE (Exact Values)

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#0F0F11` | Page background |
| `--bg-card` | `#18181B` | Cards, forms |
| `--bg-input` | `#0F0F11` | Input fields |
| `--accent-pink` | `#F4A6C1` | Gradient start, focus states |
| `--accent-lavender` | `#C8A8E9` | Gradient end |
| `--text-primary` | `#FFFFFF` | Headings, prices |
| `--text-secondary` | `#A1A1AA` | Body text |
| `--text-muted` | `#71717A` | Labels, placeholders |
| `--border-subtle` | `rgba(255,255,255,0.06)` | Card borders |
| `--border-input` | `rgba(255,255,255,0.10)` | Input borders |
| `--border-focus` | `rgba(244,166,193,0.50)` | Input focus |
| `--success` | `#22C55E` | Paid status |
| `--error` | `#EF4444` | Validation errors |

**CTA Gradient**: `linear-gradient(90deg, #F4A6C1 0%, #C8A8E9 100%)`

---

## TYPOGRAPHY (Exact Specs)

| Element | Font | Weight | Size | Line Height | Letter Spacing | Color |
|---------|------|--------|------|-------------|----------------|-------|
| Logo | Inter | 700 | 20px | 1.2 | -0.01em | Gradient |
| Nav Links | Inter | 500 | 12px | 1 | 0.08em | `#A1A1AA` |
| Nav Active | Inter | 500 | 12px | 1 | 0.08em | `#FFFFFF` + underline |
| Page H1 | Inter | 700 | 38px | 1.2 | -0.02em | `#FFFFFF` |
| Page Subtitle | Inter | 400 | 16px | 1.5 | 0 | `#A1A1AA` |
| Section H2 | Inter | 700 | 24px | 1.2 | -0.01em | `#FFFFFF` |
| Plan Name | Inter | 700 | 22px | 1.2 | -0.01em | `#FFFFFF` |
| Price | Inter | 700 | 30px | 1 | -0.02em | `#FFFFFF` |
| Billing Period | Inter | 400 | 12px | 1 | 0 | `#71717A` |
| Feature Text | Inter | 400 | 14px | 1.5 | 0 | `#A1A1AA` |
| Input Text | Inter | 400 | 14px | 1.5 | 0 | `#FFFFFF` |
| Input Placeholder | Inter | 400 | 14px | 1.5 | 0 | `#71717A` |
| Button Text | Inter | 600 | 12px | 1 | 0.1em | varies |
| Label | Inter | 600 | 11px | 1 | 0.1em | `#A1A1AA` |
| Table Header | Inter | 600 | 11px | 1 | 0.08em | `#71717A` |
| Table Row | Inter | 400 | 14px | 1.5 | 0 | `#A1A1AA` |
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
**Container**: 960px max (narrower for forms), 24px side padding
**Card Padding**: 32px
**Card Radius**: 12px
**Input Radius**: 8px
**Button Radius**: 6px

---

## COMPONENT SPECS

### Plan Card
- **Background**: `#18181B`
- **Border**: 1px solid `rgba(255,255,255,0.06)`
- **Border-radius**: 12px
- **Padding**: 32px
- **Structure**:
  - Plan name (22px, bold)
  - Price (30px, bold) + "/month" (14px, muted)
  - Billing period note (12px, muted)
  - Feature list (gap 12px)
  - CTA button (full width)
- **Selected State**: Border `rgba(244,166,193,0.3)`, subtle pink glow
- **Recommended Badge**: 
  - Position: absolute top, centered
  - Background: gradient
  - Text: dark, 10px, uppercase
  - Padding: 4px 12px
  - Border-radius: 9999px

### Payment Form
- **Background**: `#18181B`
- **Border**: 1px solid `rgba(255,255,255,0.06)`
- **Border-radius**: 12px
- **Padding**: 32px
- **Input Fields**:
  - Background: `#0F0F11`
  - Border: 1px solid `rgba(255,255,255,0.10)`
  - Border-radius: 8px
  - Padding: 12px 16px
  - Font: 14px
  - Focus: border `rgba(244,166,193,0.5)` + box-shadow `0 0 0 3px rgba(244,166,193,0.1)`
- **Submit Button**:
  - Background: gradient
  - Text: dark, 12px, uppercase, bold
  - Padding: 14px
  - Border-radius: 8px
  - Full width
  - Hover: brightness(1.1)

### Billing History Table
- **Background**: `#18181B`
- **Border**: 1px solid `rgba(255,255,255,0.06)`
- **Border-radius**: 12px
- **Padding**: 24px
- **Header Row**: 11px, uppercase, muted, border-bottom
- **Data Rows**: 14px, text-zinc-400, border-bottom subtle
- **Status Pills**:
  - Paid: bg `rgba(34,197,94,0.1)`, text `#22C55E`, px-3 py-1, rounded-full
  - Pending: bg `rgba(234,179,8,0.1)`, text `#EAB308`
  - Failed: bg `rgba(239,68,68,0.1)`, text `#EF4444`

---

## SHADOWS & EFFECTS

| Effect | Value |
|--------|-------|
| Card Shadow | `0 4px 20px rgba(0,0,0,0.2)` |
| Card Hover Shadow | `0 12px 30px rgba(0,0,0,0.3)` |
| Input Focus Glow | `0 0 0 3px rgba(244,166,193,0.1)` |
| Selected Plan Glow | `0 0 40px rgba(244,166,193,0.08)` |
| Transition | `0.2s ease` |

---

## RESPONSIVE SPECIFICATIONS

### Desktop (&gt;1024px)
- 3-column plan selection
- Side-by-side checkout (summary + form)

### Tablet (768-1024px)
- 2-column plans
- Stacked checkout form

### Mobile (&lt;768px)
- Single column plans
- Full-width checkout form
- Table becomes card list