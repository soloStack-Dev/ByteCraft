# ByteCraft Blog Page — Engineering Insights & Articles

## Overview
Build the Blog page for ByteCraft, a dark-themed premium SaaS brand for technical freelancers. This page features a featured article hero, topic filter tabs, a 3-column article grid, and pagination. The design maintains the established dark charcoal + pink/lavender gradient system.

## Tech Stack
- analyze the package.json file

## Global Design System

### Colors
- **Background Primary**: `#0F0F11` (near-black charcoal)
- **Background Secondary**: `#1A1A1E` (elevated sections)
- **Background Card**: `#18181B` (blog cards)
- **Accent Pink**: `#F4A6C1` (primary accent, tags, active states)
- **Accent Lavender**: `#C8A8E9` (gradient end, secondary accents)
- **Text Primary**: `#FFFFFF` (headings)
- **Text Secondary**: `#A1A1AA` (body text, descriptions)
- **Text Muted**: `#71717A` (dates, metadata)
- **Border**: `rgba(255,255,255,0.06)`

### Typography
- **Headings**: Inter/Geist, Bold (700), tight letter-spacing (-0.02em)
- **Body**: Inter/Geist, Regular (400), line-height 1.6
- **Labels/Tags**: Uppercase sans, 10-11px, tracking-widest
- **Hero H1**: 32-36px, white
- **Section H2**: 28-32px, white
- **Body**: 14-15px, text-zinc-400
- **Filter Tabs**: 11-12px, uppercase, tracking-wider

### Spacing
- Section padding: `py-16` to `py-20` (64-80px)
- Container max-width: `max-w-7xl` (1280px)
- Card gap: `gap-6` (24px)

### Effects
- **Card Hover**: Image scale 1.03 + border brighten
- **Filter Active**: Text color change to accent
- **Pagination Hover**: Background brighten

---

## SECTIONS BREAKDOWN

### SECTION 1: NAVIGATION BAR (Shared)
- **Layout**: Fixed top, full-width, height 64px
- **Left**: "ByteCraft" logo — gradient pink→lavender, font-bold, text-xl
- **Center**: HOME, ABOUT, SERVICES, BILLING, BLOG (active/underlined)
  - Active: underline accent, text-white
  - Inactive: text-zinc-400, hover:text-white
  - Font: uppercase, 12-13px, tracking-wider
- **Right**: 
  - "LOGIN" — transparent bg, white border, rounded-md
  - "SIGNUP" — solid pink/lavender gradient bg, dark text, rounded-md
- **Background**: `bg-[#0F0F11]/80 backdrop-blur-md` + bottom border `border-white/5`

### SECTION 2: FEATURED ARTICLE (Hero Blog Post)
- **Layout**: Container max-w-7xl, two-column grid (text left, image right), gap-12, py-16
- **Background**: `#0F0F11`
- **Left Column — Article Meta & Content**:
  - **Tag + Date Row**: Flex row, gap-3, items-center
    - **Tag**: "ENGINEERING" — pill, border `rgba(255,255,255,0.15)`, text-pink-300/accent, 10px, uppercase, tracking-widest, px-3 py-1, rounded-sm
    - **Separator**: "•" — text-zinc-600
    - **Date**: "OCT 24, 2024" — text-zinc-500, 11px, uppercase, tracking-wider
  - **H1 (Title)**: "Architecting for Hyper-Scale: Lessons from the Edge"
    - White, 32-36px, font-bold, line-height 1.2, mt-4
  - **Excerpt**: "Deep dive into the infrastructure choices, distributed systems patterns, and observability tools required to maintain 99.999% uptime during massive traffic spikes."
    - text-zinc-400, 15px, line-height 1.6, mt-4, max-width 480px
  - **Author Row**: Flex row, gap-3, items-center, mt-8
    - **Avatar**: 40x40px circle, object-fit cover, border `rgba(255,255,255,0.10)`
    - **Author Info**:
      - Name: "Sarah Chen" — white, 14px, font-medium
      - Role: "Lead Systems Engineer" — text-zinc-500, 12px
- **Right Column — Featured Image**:
  - Large rectangular image, rounded-xl (12px radius)
  - Aspect ratio: ~16:10 or 3:2
  - Object-fit: cover
  - Border: 1px solid `rgba(255,255,255,0.06)`
  - **Image content**: Futuristic data center / circuit board cityscape with pink light trails (see Image Prompt 1)
  - **Top-left overlay label**: "ENGINEERING LOGS" — text-white, 12px, uppercase, tracking-wider, positioned absolute over image
- **Responsive**: Stack to single column on mobile (image on top or bottom)

### SECTION 3: TOPIC FILTER TABS
- **Layout**: Container max-w-7xl, flex row, gap-6, py-8
- **Label**: "FILTER BY TOPIC:" — text-zinc-500, 11px, uppercase, tracking-widest, font-medium
- **Tabs**: Flex row, gap-6
  - **"ALL POSTS"**: text-white, 11px, uppercase, tracking-wider, font-semibold (active/default)
  - **"ENGINEERING"**: text-zinc-400, 11px, uppercase, tracking-wider, hover:text-white
  - **"SECURITY"**: text-zinc-400, 11px, uppercase, tracking-wider, hover:text-white
  - **"CULTURE"**: text-zinc-400, 11px, uppercase, tracking-wider, hover:text-white
  - **"UPDATES"**: text-zinc-400, 11px, uppercase, tracking-wider, hover:text-white
- **Active State**: text-white, font-semibold
- **Hover**: text-white transition, 0.2s ease

### SECTION 4: ARTICLES GRID
- **Layout**: Container max-w-7xl, 3-column grid, gap-6, py-8
- **Card Style**:
  - Background: `#18181B`
  - Border: 1px solid `rgba(255,255,255,0.06)`
  - Border-radius: 12px
  - Overflow: hidden
- **Card Structure**:
  - **Image Area**: Top, aspect-ratio 16:9, object-fit cover
  - **Content Area**: Padding 20px
  - **Tag + Date Row**: Flex row, gap-2, items-center
    - **Tag**: 10px, uppercase, tracking-wider, font-medium (color varies by topic)
    - **Separator**: "|" — text-zinc-600
    - **Date**: text-zinc-500, 10px, uppercase
  - **Title**: 16-18px, white, font-semibold, mt-3, line-height 1.3
  - **Excerpt**: 13-14px, text-zinc-500, mt-2, 2-3 lines max, line-clamp
- **Card 1**:
  - Image: Cybersecurity lock with circuit patterns (see Image Prompt 2)
  - Tag: "SECURITY" — text-pink-300
  - Date: "OCT 18"
  - Title: "Zero Trust Architecture Implementation Guide"
  - Excerpt: "Practical steps for migrating legacy systems to a strict Zero Trust model..."
- **Card 2**:
  - Image: Developer workspace with monitor showing code (see Image Prompt 3)
  - Tag: "CULTURE" — text-pink-300
  - Date: "OCT 12"
  - Title: "Building Remote-First Engineering Teams"
  - Excerpt: "How we maintain alignment, foster innovation, and prevent burnout in a..."
- **Card 3**:
  - Image: Abstract 3D crystal / data visualization (see Image Prompt 4)
  - Tag: "UPDATES" — text-zinc-400
  - Date: "OCT 05"
  - Title: "ByteCraft v2.4 Release Notes"
  - Excerpt: "Introducing the new GraphQL API, enhanced Webhook delivery guarantees..."
- **Hover**: Image scale 1.03, card border brighten to `rgba(255,255,255,0.10)`, 0.3s ease

### SECTION 5: PAGINATION
- **Layout**: Container max-w-7xl, centered, flex row, gap-2, py-12
- **Content**:
  - **Previous Arrow**: `&lt;` — text-zinc-500, hover:text-white, 14px
  - **Page Numbers**:
    - "1" — text-white, font-bold, 14px (current page)
    - "2" — text-zinc-500, hover:text-white, 14px
    - "3" — text-zinc-500, hover:text-white, 14px
    - "..." — text-zinc-600, 14px (ellipsis)
  - **Next Arrow**: `&gt;` — text-zinc-500, hover:text-white, 14px
- **Active Page**: text-white, font-bold
- **Hover**: text-white transition, 0.2s ease

### SECTION 6: FOOTER (Shared)
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
- **Mobile** (&lt;640px): Single column, stacked featured article, single column grid
- **Tablet** (640-1024px): 2-column article grid
- **Desktop** (&gt;1024px): Full layout as specified

## Animation Specs
- **Featured Article**: Fade-in on load
- **Filter Tabs**: Underline slide on active change
- **Card Hover**: 0.3s ease-out, image scale + border glow
- **Pagination Hover**: 0.2s color transition