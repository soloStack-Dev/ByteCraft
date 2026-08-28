# ByteCraft Billing Page — Checkout & Payment

## Overview
Build the Billing page for ByteCraft, a dark-themed premium SaaS brand for technical freelancers. This page handles plan selection, payment processing, and billing management. The design maintains the established dark charcoal + pink/lavender gradient system.

## Tech Stack
- analyze the package.json file

## Global Design System

### Colors
- **Background Primary**: `#0F0F11` (near-black charcoal)
- **Background Secondary**: `#1A1A1E` (elevated sections)
- **Background Card**: `#18181B` (billing cards, forms)
- **Accent Pink**: `#F4A6C1` (primary accent, gradient start)
- **Accent Lavender**: `#C8A8E9` (gradient end)
- **Text Primary**: `#FFFFFF` (headings)
- **Text Secondary**: `#A1A1AA` (body text)
- **Text Muted**: `#71717A` (labels, metadata)
- **Border**: `rgba(255,255,255,0.06)`
- **Success**: `#22C55E` (payment success indicators)
- **Error**: `#EF4444` (validation errors)

### Typography
- **Headings**: Inter/Geist, Bold (700), tight letter-spacing (-0.02em)
- **Body**: Inter/Geist, Regular (400), line-height 1.6
- **Labels**: Uppercase sans, 10-11px, tracking-widest
- **H1**: 36-40px, white
- **H2**: 24-28px, white
- **Body**: 14-15px, text-zinc-400
- **Price**: 28-32px, white, font-bold

### Spacing
- Section padding: `py-16` to `py-20` (64-80px)
- Container max-width: `max-w-5xl` (960px) — narrower for forms
- Card gap: `gap-6` (24px)
- Form field gap: `gap-4` (16px)

---

## SECTIONS BREAKDOWN

### SECTION 1: NAVIGATION BAR (Shared)
- **Layout**: Fixed top, full-width, height 64px
- **Left**: "ByteCraft" logo — gradient pink→lavender, font-bold, text-xl
- **Center**: HOME, ABOUT, SERVICES, BILLING (active/underlined), BLOG
  - Active: underline accent, text-white
  - Inactive: text-zinc-400, hover:text-white
  - Font: uppercase, 12-13px, tracking-wider
- **Right**: 
  - "LOGIN" — transparent bg, white border, rounded-md
  - "SIGNUP" — solid pink/lavender gradient bg, dark text, rounded-md
- **Background**: `bg-[#0F0F11]/80 backdrop-blur-md` + bottom border `border-white/5`

### SECTION 2: BILLING HERO / PAGE HEADER
- **Layout**: Container max-w-5xl, centered, py-16
- **Content**:
  - **H1**: "Billing & Plans" or "Choose Your Plan" — white, 36-40px, font-bold, centered
  - **Subtitle**: "Select the plan that fits your workflow. Upgrade, downgrade, or cancel anytime." — text-zinc-400, 16px, centered, max-width 500px
- **No CTA** — leads directly into plan selection below

### SECTION 3: PLAN SELECTION / PRICING COMPARISON
- **Layout**: Container max-w-5xl, 2-3 column grid, gap-6
- **Card Style**:
  - Background: `#18181B`
  - Border: 1px solid `rgba(255,255,255,0.06)`
  - Border-radius: 12px
  - Padding: 32px
- **Card Content**:
  - **Plan Name**: 20-22px, white, font-bold
  - **Price**: "₹XXX/month" — 28-32px, white, font-bold
  - **Billing Period**: "Billed annually" or "Billed monthly" — text-zinc-500, 12px
  - **Feature List**: Gap-3, checkmark + text
  - **CTA Button**: 
    - **Selected Plan**: Gradient bg `linear-gradient(90deg, #F4A6C1, #C8A8E9)`, dark text, "CURRENT PLAN" or "SELECTED"
    - **Other Plans**: Outline style, border `rgba(255,255,255,0.15)`, white text, "SELECT PLAN"
- **Recommended Badge**: Small pill on top card — "MOST POPULAR" — gradient bg, dark text, 10px uppercase
- **Toggle**: Monthly/Yearly toggle above cards — pill switch with gradient thumb

### SECTION 4: PAYMENT METHOD / CHECKOUT FORM
- **Layout**: Container max-w-5xl, two-column (left: order summary, right: payment form), gap-8
- **Background**: `#18181B` card
- **Left — Order Summary**:
  - **H2**: "Order Summary" — white, 20px, font-bold
  - **Plan Details**: Plan name + price
  - **Divider**: 1px solid `rgba(255,255,255,0.06)`
  - **Total**: "Total: ₹XXX" — 24px, white, font-bold
- **Right — Payment Form**:
  - **H2**: "Payment Details" — white, 20px, font-bold
  - **Form Fields**:
    - Card Number: Input with card icon, placeholder "0000 0000 0000 0000"
    - Expiry Date + CVC: Two-column inputs
    - Cardholder Name: Full-width input
    - Billing Address: Full-width input
  - **Input Style**:
    - Background: `#0F0F11`
    - Border: 1px solid `rgba(255,255,255,0.10)`
    - Border-radius: 8px
    - Padding: 12px 16px
    - Text: white, 14px
    - Placeholder: `#71717A`
    - Focus: border `rgba(244,166,193,0.5)` + subtle glow
  - **Submit Button**: Full-width, gradient bg, dark text, "COMPLETE PAYMENT", uppercase, 12px, tracking-wider
  - **Security Note**: Small text with lock icon — "Payments secured by Stripe" — text-zinc-500, 12px

### SECTION 5: BILLING HISTORY (Optional/Logged In)
- **Layout**: Container max-w-5xl, py-12
- **H2**: "Billing History" — white, 24px, font-bold
- **Table Style**:
  - Background: `#18181B`
  - Border: 1px solid `rgba(255,255,255,0.06)`
  - Border-radius: 12px
  - Headers: 11px, uppercase, text-zinc-500, tracking-wider
  - Rows: 14px, text-zinc-400
  - Status pills: "Paid" — green bg/txt, "Pending" — yellow, "Failed" — red
  - Download invoice: Icon button, text-zinc-400 hover:white

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
- **Mobile** (&lt;640px): Single column plans, stacked checkout form
- **Tablet** (640-1024px): 2-column plans
- **Desktop** (&gt;1024px): 3-column plans, side-by-side checkout

## Animation Specs
- **Card Hover**: 0.3s ease-out, translateY(-2px)
- **Input Focus**: 0.2s border color + subtle glow
- **Button Hover**: 0.2s brightness/scale
- **Plan Selection**: Smooth border highlight transition

## billing page main content information 

- **left side**: add large desktop size hight-half-width image 
- **right side**: add plan payment selection type 'add this selection top of the page (UPI/credit card) and in form page when user 
- select the UPI shown the QR code payment block and when user click the (credit card its shown form page input feild card number payment feild with button) for your idea based on the user selection