# ByteCraft About Page — SaaS Brand Story & Mission

## Overview
Build the About page for ByteCraft, a dark-themed premium SaaS brand for technical freelancers. This page tells the founder's story, mission, and vision through a bold typography-first layout with striking cyberpunk imagery. The design maintains the established dark charcoal + pink/lavender gradient system.

## Tech Stack
- analyze the package.json file

## Global Design System

### Colors
- **Background Primary**: `#0F0F11` (near-black charcoal)
- **Background Secondary**: `#1A1A1E` (elevated sections)
- **Background Card**: `#18181B` (content cards)
- **Accent Pink**: `#F4A6C1` (primary accent, gradient start)
- **Accent Lavender**: `#C8A8E9` (gradient end, secondary accents)
- **Text Primary**: `#FFFFFF` (headings)
- **Text Secondary**: `#A1A1AA` (body text)
- **Text Muted**: `#71717A` (dates, metadata)
- **Border**: `rgba(255,255,255,0.06)`

### Typography
- **Headings**: Inter/Geist, Bold (700), tight letter-spacing (-0.02em)
- **Body**: Inter/Geist, Regular (400), line-height 1.6
- **Labels/Tags**: Uppercase sans, 10-11px, tracking-widest
- **H1 (Mission)**: 40-48px, white
- **H2 (Section)**: 28-32px, white
- **Body Paragraphs**: 14-15px, text-zinc-400
- **CTA Link**: 11-12px, uppercase, tracking-wider, pink accent

### Spacing
- Section padding: `py-20` to `py-24` (80-96px)
- Container max-width: `max-w-7xl` (1280px)
- Content gap: `gap-6` to `gap-8`

### Effects
- **Card Hover**: `translateY(-2px)` + border brighten
- **Link Hover**: `translateX(4px)` on arrow
- **Image**: Subtle hover scale 1.02

---

## SECTIONS BREAKDOWN

### SECTION 1: NAVIGATION BAR (Shared)
- **Layout**: Fixed top, full-width, height 64px
- **Left**: "ByteCraft" logo — gradient pink→lavender, font-bold, text-xl
- **Center**: HOME, ABOUT (active/underlined), SERVICES, BILLING, BLOG
  - Active: underline accent, text-white
  - Inactive: text-zinc-400, hover:text-white
  - Font: uppercase, 12-13px, tracking-wider
- **Right**: 
  - "LOGIN" — transparent bg, white border, rounded-md
  - "SIGNUP" — solid pink/lavender gradient bg, dark text, rounded-md
- **Background**: `bg-[#0F0F11]/80 backdrop-blur-md` + bottom border `border-white/5`

### SECTION 2: MISSION STATEMENT (Dark Quote Section)
- **Layout**: Full-width, centered, generous vertical padding (py-24 to py-32)
- **Background**: `#0F0F11` solid
- **Content**: Single centered text block
  - **Text**: "We build the infrastructure that powers the next generation of SaaS. High-fidelity, developer-centric, and fiercely independent."
  - **Style**: Centered, max-width ~700px
  - **Font**: 16-18px, text-zinc-400/500, font-weight 400, line-height 1.7
  - **Color**: Slightly muted — not pure white, more of a soft gray-pink tint
- **No other elements** — pure minimalist statement section
- **Animation**: Fade-in on scroll, subtle

### SECTION 3: FOUNDER STORY (Two-Column Split)
- **Layout**: Container max-w-7xl, two-column grid (55% text / 45% image), gap-12, py-20
- **Background**: `#0F0F11`
- **Left Column — Text Content**:
  - **H1 (Founder Statement)**: 
    - Text: "I build this saas product for starting own freelancing journey because AI can do all repetitive task so don't abandoned our interested career so I planning to move my career this but I am currently work in non developer field"
    - Style: 36-40px, white, font-bold, line-height 1.2, left-aligned
    - Note: Raw, personal, unpolished tone — preserve the authentic voice
  - **Body Paragraphs** (stacked, gap-4, mt-8):
    1. "The genesis of this tool was born from necessity, bridging the gap between ambition and current reality."
    2. "By automating the mundane, we free up cognitive load for complex, creative problem-solving."
    3. "This platform serves as the foundational scaffolding for transitioning into technical domains."
    4. "It's designed for resilience, allowing you to architect solutions regardless of your background."
    5. "We are democratizing the tooling previously reserved for elite engineering teams."
    - **Style**: 14px, text-zinc-400, line-height 1.6, left-aligned
  - **CTA Link**: "PREVIEW PLATFORM →"
    - Style: text-pink-300/accent, 11px, uppercase, tracking-widest, font-semibold
    - Arrow: → icon, hover:translateX(4px)
    - Margin-top: mt-8
- **Right Column — Image**:
  - Large rectangular image, rounded-xl (12px radius)
  - Aspect ratio: ~3:4 or 4:5 (portrait-ish)
  - Object-fit: cover
  - Border: 1px solid `rgba(255,255,255,0.06)`
  - **Image content**: Cyberpunk cityscape with neon pink/purple lights (see Image Prompt 1)
- **Responsive**: Stack to single column on mobile (image on top or bottom)

### SECTION 4: LATEST DISPATCHES (Blog Cards)
- **Layout**: Container max-w-7xl, py-20
- **Header** (left-aligned):
  - H2: "Latest Dispatches" — white, 28-32px, font-bold
- **Cards Grid**: 3 columns, gap-6, equal width
  - **Card Style**:
    - Background: `#18181B`
    - Border: 1px solid `rgba(255,255,255,0.06)`
    - Border-radius: 12px
    - Overflow: hidden
  - **Card Structure**:
    - **Image Area**: Top 60% of card, aspect-ratio 16:9, object-fit cover
    - **Content Area**: Bottom 40%, padding 20px
    - **Tag**: Pill/badge — bg-transparent or `rgba(255,255,255,0.05)`, border `rgba(255,255,255,0.15)`, text-zinc-400, 10px uppercase, tracking-widest, px-3 py-1, rounded-sm
    - **Title**: 16-18px, white, font-semibold, mt-3
  - **Card 1**:
    - Image: Server room / data center (monochrome with pink accents)
    - Tag: "ARCHITECTURE"
    - Title: "Scaling the Monolith"
  - **Card 2**:
    - Image: Abstract data crystal / geometric visualization
    - Tag: "PERFORMANCE"
    - Title: "Zero-Latency State"
  - **Card 3**:
    - Image: Dark developer workspace / IDE setup
    - Tag: "WORKFLOW"
    - Title: "The Ideal IDE Setup"
  - **Hover**: Image scale 1.03, card border brighten, 0.3s ease
- **Responsive**: 2 columns tablet, 1 column mobile

### SECTION 5: FOOTER (Shared)
- **Layout**: Full-width, border-t border-white/5, py-12
- **Background**: `#0F0F11`
- **Content** (3-column, max-w-7xl):
  - **Left**: 
    - "ByteCraft" — gradient text, font-bold
    - "Building the underlying architecture for the modern freelance technical workflow." — text-zinc-500, 14px
  - **Center**: 
    - "LEGAL & INFO" — label, text-zinc-400, uppercase, 11px
    - Links: Privacy Policy, Terms of Service, Contact Us, Careers — text-zinc-500, 14px
  - **Right**: 
    - "© 2024 ByteCraft. Engineered for precision." — text-zinc-500
    - Social icons: 2 small buttons (mail, code/GitHub) — bg-zinc-800/50, border border-white/10
- **Responsive**: Stack to single column on mobile

## Responsive Breakpoints
- **Mobile** (&lt;640px): Single column, stacked founder section, single column blog
- **Tablet** (640-1024px): 2-column blog grid
- **Desktop** (&gt;1024px): Full layout as specified

## Animation Specs
- **Scroll Reveal**: Fade-in + translateY(20px→0), staggered
- **Card Hover**: 0.3s ease-out, image scale + border glow
- **Link Hover**: 0.2s ease, arrow translateX