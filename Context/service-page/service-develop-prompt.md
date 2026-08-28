# ByteCraft Services Page — SaaS Product & Pricing

## Overview
Build the Services page for ByteCraft, a dark-themed premium SaaS brand for technical freelancers. This page showcases the company's service offerings through a terminal-style hero, a comprehensive 6-tier pricing grid, and an engineering blog section. The design maintains the established dark charcoal + pink/lavender gradient system with Indian Rupee (₹) pricing.

## Tech Stack
- analyze the package.json file

## Global Design System

### Colors
- **Background Primary**: `#0F0F11` (near-black charcoal)
- **Background Secondary**: `#1A1A1E` (elevated sections, hero card)
- **Background Card**: `#18181B` (pricing cards)
- **Accent Pink**: `#F4A6C1` (primary accent, gradient start, checkmarks)
- **Accent Lavender**: `#C8A8E9` (gradient end, tags)
- **Text Primary**: `#FFFFFF` (headings, prices)
- **Text Secondary**: `#A1A1AA` (body text, descriptions)
- **Text Muted**: `#71717A` (metadata, dates)
- **Border**: `rgba(255,255,255,0.06)`
- **Border Highlight**: `rgba(255,255,255,0.10)` (hover state)
- **CTA Gradient**: `linear-gradient(90deg, #F4A6C1, #C8A8E9)` (Professional tier button)

### Typography
- **Headings**: Inter/Geist, Bold (700), tight letter-spacing (-0.02em)
- **Body**: Inter/Geist, Regular (400), line-height 1.6
- **Labels/Tags**: Uppercase sans, 10-11px, tracking-widest
- **Hero H1**: 48-56px, white
- **Section H2**: 32-36px, white, centered
- **Card Title**: 20-24px, white, font-semibold
- **Price**: 32-36px, white, font-bold
- **Body**: 14-15px, text-zinc-400
- **CTA Button**: 11-12px, uppercase, tracking-wider

### Spacing
- Section padding: `py-20` to `py-24` (80-96px)
- Container max-width: `max-w-7xl` (1280px)
- Card gap: `gap-6` (24px)
- Card padding: `p-6` to `p-8`

### Effects
- **Card Hover**: `translateY(-4px)` + border brighten + shadow increase
- **Button Hover**: Brightness increase + slight scale
- **Terminal Cursor**: Blinking cursor animation
- **Gradient CTA**: Pink→lavender gradient with subtle glow

---

## SECTIONS BREAKDOWN

### SECTION 1: NAVIGATION BAR (Shared)
- **Layout**: Fixed top, full-width, height 64px
- **Left**: "ByteCraft" logo — gradient pink→lavender, font-bold, text-xl
- **Center**: HOME, ABOUT, SERVICES (active/underlined), BILLING, BLOG
  - Active: underline accent, text-white
  - Inactive: text-zinc-400, hover:text-white
  - Font: uppercase, 12-13px, tracking-wider
- **Right**: 
  - "LOGIN" — transparent bg, white border, rounded-md
  - "SIGNUP" — solid pink/lavender gradient bg, dark text, rounded-md
- **Background**: `bg-[#0F0F11]/80 backdrop-blur-md` + bottom border `border-white/5`

### SECTION 2: HERO / WELCOME SECTION
- **Layout**: Container max-w-7xl, centered card with internal padding
- **Background**: `#1A1A1E` card on `#0F0F11` page background
- **Card Style**: 
  - Background: `#1A1A1E`
  - Border: 1px solid `rgba(255,255,255,0.06)`
  - Border-radius: 12px
  - Padding: 48px to 64px
- **Content**: Two-column layout inside card (text left, terminal right)
  - **Left Column**:
    - **H1**: "Welcome to" — white, 48-52px, font-bold, line-height 1.1
    - **Description**: "We build precision software solutions for the modern web. From simple landing pages to complex AI-driven SaaS applications, our focus is on performance, security, and scalability."
      - Color: text-zinc-400, 15-16px, line-height 1.6
      - Max-width: ~400px
  - **Right Column — Terminal Window**:
    - Background: `#0F0F11` or slightly darker
    - Border: 1px solid `rgba(255,255,255,0.08)`
    - Border-radius: 8px
    - Padding: 24px
    - Font: Monospace (JetBrains Mono, Fira Code, or similar), 13-14px
    - **Lines** (each prefixed with `&gt;` in pink/lavender):
      - `&gt; Set up load balancing...`
      - `&gt; Deploy personal portfolios...`
      - `&gt; Integrate Auth0 security...`
      - `&gt; Build RAG software pipelines...`
    - **Line Style**: `&gt;` arrow in pink (#F4A6C1), text in text-zinc-400
    - **Spacing**: Each line separated by ~16-20px vertical gap
    - **Effect**: Subtle typing animation or static with blinking cursor on last line
- **Responsive**: Stack to single column on mobile (terminal below text)

### SECTION 3: SERVICE TIERS — PRICING GRID (Row 1)
- **Layout**: Container max-w-7xl, py-20
- **Header**: 
  - H2: "Service Tiers" — white, 32-36px, font-bold, centered
- **Cards Grid**: 3 columns, gap-6
- **Card Style**:
  - Background: `#18181B`
  - Border: 1px solid `rgba(255,255,255,0.06)`
  - Border-radius: 12px
  - Padding: 32px
  - Min-height: ~420px
  - Display: flex column, justify-between
- **Card Structure**:
  - **Tier Label**: Uppercase, 10-11px, tracking-widest, text-zinc-500, font-semibold
  - **Plan Name**: 20-22px, white, font-bold, mt-2
  - **Features List**: mt-6, stack with gap-3
    - Each item: ✓ checkmark icon (pink #F4A6C1, 14px) + feature text (text-zinc-400, 14px)
  - **Divider**: 1px solid `rgba(255,255,255,0.06)`, my-6
  - **Price**: "₹1,000" / "₹950" / "₹2,500" — 32-36px, white, font-bold
  - **CTA Button**: Full-width, mt-4
    - **Standard**: bg-transparent, border 1px solid `rgba(255,255,255,0.15)`, text-white, uppercase, 11px, tracking-wider, py-3, rounded-md
    - **Highlighted** (Professional): Gradient bg `linear-gradient(90deg, #F4A6C1, #C8A8E9)`, text-dark (#0F0F11), font-bold, uppercase, 11px, py-3, rounded-md, subtle shadow
- **Card 1 — STARTER / Portfolio Build**:
  - Price: ₹1,000
  - Features: Building personal portfolio, Deploy & domain setup, Simple blog websites, Email support setup, External basic auth
  - CTA: "SELECT PLAN" (standard outline)
- **Card 2 — GROWTH / Security & Scale**:
  - Price: ₹950
  - Features: Advanced security protocols, Payment gateway integration, Technical SEO improvement, Custom authentication, Basic load balancing
  - CTA: "SELECT PLAN" (standard outline)
- **Card 3 — PROFESSIONAL / SaaS Foundation**:
  - Price: ₹2,500
  - Features: Full SaaS application build, AI smart feature integration, Secured database setup, Auth0 security authentication, Payment & external services
  - CTA: "SELECT PLAN" (gradient highlight)
- **Hover**: Card lifts -4px, border brightens to `rgba(255,255,255,0.12)`, shadow increases

### SECTION 4: SERVICE TIERS — PRICING GRID (Row 2)
- **Layout**: Same 3-column grid, continues below Row 1
- **Same card styling** as Row 1
- **Card 4 — ADVANCED / Agentic AI**:
  - Price: ₹5,000
  - Features: Agentic AI software build, RAG software pipelines, Vector database integration, MCP integration & deploy, Rate limiting & balancing
  - CTA: "SELECT PLAN" (standard outline)
- **Card 5 — ENTERPRISE / Data Management**:
  - Price: ₹8,000
  - Features: Data entry software, Custom admin dashboards, AI smart features, Complex MCP integration, Full deployment pipeline
  - CTA: "SELECT PLAN" (standard outline)
- **Card 6 — ULTIMATE / Mobile Ecosystem**:
  - Price: ₹10,000
  - Features: Native mobile app build, Playstore deployment, Embedded AI features, Distributed databases, Global load balancing
  - CTA: "SELECT PLAN" (standard outline)
- **Note**: Professional tier (₹2,500) is the visually highlighted plan with gradient CTA

### SECTION 5: ENGINEERING BLOG (Latest Insights)
- **Layout**: Container max-w-7xl, py-20
- **Header** (flex row, justify-between, items-center):
  - **Left Group**:
    - Label: "LATEST INSIGHTS" — text-pink-300/accent, 10px, uppercase, tracking-widest
    - H2: "Engineering Blog" — white, 32px, font-bold
  - **Right**: "VIEW ALL ARTICLES -&gt;" — text-pink-300, 11px, uppercase, tracking-wider, hover:translateX
- **Cards Grid**: 3 columns, gap-6
- **Card Style**:
  - Background: `#18181B`
  - Border: 1px solid `rgba(255,255,255,0.06)`
  - Border-radius: 12px
  - Overflow: hidden
- **Card Structure**:
  - **Image Area**: Top, aspect-ratio 16:9, object-fit cover
  - **Content Area**: Padding 20px
  - **Tag**: 10px, lowercase, text-pink-300/accent, font-medium
  - **Title**: 16-18px, white, font-semibold, mt-2, line-height 1.3
  - **Excerpt**: 13-14px, text-zinc-500, mt-2, 2-3 lines max
- **Card 1**:
  - Image: Server room / data center hardware close-up
  - Tag: "Architecture"
  - Title: "Scaling RAG Systems for Enterprise SaaS"
  - Excerpt: "Deep dive into implementing resilient Retrieval-Augmented Generation pipelines using vector databases and..."
- **Card 2**:
  - Image: Abstract network nodes / security visualization
  - Tag: "Security"
  - Title: "Zero-Trust Authentication in 2024"
  - Excerpt: "Why traditional session management is failing and how to implement robust zero-trust models using Auth0 and edge..."
- **Card 3**:
  - Image: Laptop with code / mobile development setup
  - Tag: "Mobile"
  - Title: "Deploying Edge AI on Mobile"
  - Excerpt: "Techniques for running small language models directly on device to ensure offline capability and reduced server..."
- **Hover**: Image scale 1.03, card border brighten, 0.3s ease

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
- **Mobile** (&lt;640px): Single column pricing, stacked hero, single column blog
- **Tablet** (640-1024px): 2-column pricing grid, 2-column blog
- **Desktop** (&gt;1024px): 3-column pricing grid, full layout

## Animation Specs
- **Page Load**: Staggered fade-in for pricing cards
- **Card Hover**: 0.3s ease-out, translateY(-4px) + border glow
- **Terminal**: Typing effect or blinking cursor
- **Button Hover**: 0.2s ease, brightness/scale
- **Scroll Reveal**: Fade-in + translateY(20px→0)