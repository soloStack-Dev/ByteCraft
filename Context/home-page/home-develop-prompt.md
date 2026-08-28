# ByteCraft — Freelance Workflow SaaS Landing Page

## Overview
Build a dark-themed, premium SaaS landing page for "ByteCraft" — an AI-driven tool suite for technical freelancers. The design should feel engineering-focused, precise, and modern with a soft pink/lavender accent palette against deep charcoal backgrounds.

## Tech Stack
- analyze the package.json file
## Global Design System

### Colors
- **Background Primary**: `#0F0F11` (near-black charcoal)
- **Background Secondary**: `#1A1A1E` (card backgrounds)
- **Background Card**: `#18181B` (feature cards, blog cards)
- **Accent Pink**: `#F4A6C1` (primary CTA, highlights, gradient start)
- **Accent Lavender**: `#C8A8E9` (gradient end, secondary accents)
- **Text Primary**: `#FFFFFF` (headings)
- **Text Secondary**: `#A1A1AA` (body text, descriptions)
- **Text Muted**: `#71717A` (dates, metadata)
- **Border**: `rgba(255,255,255,0.06)` (subtle card borders)

### Typography
- **Headings**: Inter/Geist, Bold (700), tight letter-spacing (-0.02em)
- **Body**: Inter/Geist, Regular (400), line-height 1.6
- **Labels/Tags**: Monospace or uppercase sans, 11-12px, tracking-widest
- **Hero H1**: 48-56px, gradient text (pink → lavender)
- **Section H2**: 32-36px, white
- **Card Title**: 18-20px, white, font-weight 600
- **Body**: 14-16px, zinc-400

### Spacing
- Section padding: `py-20` to `py-24` (80-96px vertical)
- Container max-width: `max-w-7xl` (1280px)
- Card gap: `gap-6` (24px)
- Content padding inside cards: `p-6` to `p-8`

### Effects
- **Gradient Text**: `bg-gradient-to-r from-[#F4A6C1] to-[#C8A8E9] bg-clip-text text-transparent`
- **Card Hover**: `translateY(-4px)` + subtle shadow increase
- **Button Hover**: Brightness increase + slight scale
- **Glow Effect**: Subtle radial gradient glow behind hero text

---

## SECTIONS BREAKDOWN

### SECTION 1: NAVIGATION BAR
- **Layout**: Fixed top, full-width, height ~64px
- **Left**: Logo "ByteCraft" in gradient pink→lavender, font-bold, text-xl
- **Center**: Nav links — HOME (active/underlined), ABOUT, SERVICES, BILLING, BLOG
  - Active state: underline accent, text-white
  - Inactive: text-zinc-400, hover:text-white
  - Font: uppercase, 12-13px, tracking-wider
- **Right**: 
  - "LOGIN" button — transparent bg, white border, rounded-md, px-4 py-1.5
  - "SIGNUP" button — solid pink/lavender gradient bg, dark text, rounded-md, px-4 py-1.5
- **Background**: `bg-[#0F0F11]/80 backdrop-blur-md` with bottom border `border-b border-white/5`

### SECTION 2: HERO SECTION
- **Layout**: Centered, full viewport height minus navbar, flex column, justify-center
- **Background**: Solid `#0F0F11` with subtle radial gradient glow behind text (pink/purple, very low opacity ~5%)
- **Content Stack** (centered, max-width ~700px):
  1. **Tag**: "VERSION 2.0 IS LIVE" — pill/badge style, bg-zinc-800/50, border border-white/10, text-zinc-300, uppercase, 11px, tracking-widest, px-4 py-1.5, rounded-full
  2. **H1**: "Engineer Your" (white) + "Freelance Workflow" (gradient pink→lavender)
     - Size: ~52-56px, font-weight 700, line-height 1.1
  3. **Subtitle**: "ByteCraft provides AI-driven SaaS tools designed exclusively for technical freelancers. Automate the mundane, secure your deployments, and scale your operations with precision."
     - Color: text-zinc-400, size 16-18px, max-width 600px, text-center
  4. **CTA Buttons** (flex row, gap-4, centered):
     - **Primary**: "OUR SERVICES →" — gradient bg (pink→lavender), text-dark (near-black), font-bold, uppercase, 12px, tracking-wider, px-6 py-3, rounded-md. Arrow icon right.
     - **Secondary**: "VIEW DOCUMENTATION &lt;&gt;" — bg-zinc-800/50, border border-white/10, text-white, font-bold, uppercase, 12px, tracking-wider, px-6 py-3, rounded-md. Code brackets icon.
- **Animations**: Fade-in + translateY on load, staggered (tag → heading → subtitle → buttons)

### SECTION 3: CORE INFRASTRUCTURE (Features)
- **Layout**: Container max-w-7xl, py-20
- **Header** (left-aligned):
  - H2: "Core Infrastructure" — white, 32-36px, font-bold
  - Subtitle: "Built for speed, reliability, and precision execution." — text-zinc-400, 16px
- **Cards Grid**: 3 columns, gap-6, equal height
  - **Card Style**: bg-[#18181B], border border-white/[0.06], rounded-xl, p-6
  - **Card Content**:
    - Icon: 40x40px container, rounded-lg, bg-zinc-800/50, centered icon (pink/lavender tint)
    - Title: 18-20px, white, font-semibold, mt-4
    - Description: 14px, text-zinc-400, mt-2, line-height 1.6
    - Link: "EXPLORE MODULE →" — text-pink-300, uppercase, 11px, tracking-wider, mt-6, hover:translateX
  - **Card 1**: Clock icon (pink) — "Time Management" — "Good time management to deliver the product perfectly on schedule. Track cycles, optimize sprints, and forecast delivery timelines effortlessly."
  - **Card 2**: AI/Chip icon (lavender) — "AI Automation" — "Leverage machine learning models to automate repetitive coding tasks, generate boilerplate, and analyze code quality in real-time."
  - **Card 3**: Shield/Lock icon (pink) — "Secure Deployment" — "End-to-end encrypted pipelines ensuring your freelance projects are deployed securely with zero-trust architecture built-in."
- **Hover**: Card lifts -4px, border brightens slightly

### SECTION 4: LATEST TRANSMISSIONS (Blog)
- **Layout**: Container max-w-7xl, py-20
- **Header** (left-aligned):
  - H2: "Latest Transmissions" — white, 32-36px, font-bold
  - Subtitle: "Insights and engineering logs from the ByteCraft team." — text-zinc-400
- **Grid**: Asymmetric 2-column layout (left large, right stacked)
  - **Left Column** (spans full height):
    - Large blog card with background image (server room/dashboard)
    - Overlay: gradient from transparent to dark at bottom
    - Tag: "ENGINEERING" — pill, bg-transparent, border border-white/20, text-white, uppercase, 10px
    - Title: "Optimizing AI Pipelines for Freelance Scale" — white, 20-24px, font-bold
    - Excerpt: "A deep dive into how we restructured our neural network deployment models to reduce latency by 40% for individual..." — text-zinc-400, 14px, 2-3 lines max
  - **Right Column** (2 stacked cards):
    - **Top Card**: 
      - Tag: "UPDATE" — pill, bg-zinc-800, text-zinc-300
      - Title: "ByteCraft v2.0 Release Notes" — white, 16-18px, font-bold
      - Excerpt: "Major architectural changes and new API endpoints." — text-zinc-400
      - Date: "OCT 12, 2024" — text-zinc-500, 12px, uppercase, tracking-wider
    - **Bottom Row** (2 smaller cards side by side):
      - **Card A**: Tag "SECURITY" — "Zero-Trust Workflows" — Date "OCT 08, 2024"
      - **Card B**: Tag "CULTURE" — "The Freelance Dev Ethos" — Date "SEP 29, 2024"
  - **All Cards**: bg-[#18181B], rounded-xl, border border-white/[0.06], overflow-hidden
  - **Hover**: Image scale 1.05, card border brightens

### SECTION 5: FOOTER
- **Layout**: Full-width, border-t border-white/5, py-12
- **Background**: `#0F0F11`
- **Content** (3-column, max-w-7xl):
  - **Left**: 
    - Logo: "ByteCraft" — gradient text, font-bold, text-xl
    - Tagline: "Building the underlying architecture for the modern freelance technical workflow." — text-zinc-500, 14px, max-width 280px
  - **Center**: 
    - Label: "LEGAL & INFO" — text-zinc-400, uppercase, 11px, tracking-widest, font-semibold
    - Links: Privacy Policy, Terms of Service, Contact Us, Careers — text-zinc-500, 14px, hover:text-white
  - **Right**: 
    - Copyright: "© 2024 ByteCraft. Engineered for precision." — text-zinc-500, 14px
    - Social icons: 2 small square buttons (GitHub/code icon, mail icon) — bg-zinc-800/50, border border-white/10, rounded-md, p-2
- **Responsive**: Stack to single column on mobile, center-align

## Responsive Breakpoints
- **Mobile** (&lt;640px): Single column, hamburger menu, stacked hero buttons, single column features
- **Tablet** (640-1024px): 2-column features, adjusted blog grid
- **Desktop** (&gt;1024px): Full layout as specified

## Animation Specs
- **Page Load**: Staggered fade-in (0.1s delay between elements)
- **Scroll Reveal**: Sections fade-in + translateY(20px→0) when entering viewport
- **Card Hover**: 0.3s ease-out, transform + shadow
- **Button Hover**: 0.2s ease, brightness/scale
- **Nav Link Hover**: 0.15s color transition