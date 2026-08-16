---
name: ui-ux-pro-max
description: UI/UX Pro Max design system & engineering standards for modern frontend applications. Enforces strict mathematical typography scales, 8px grid systems, cohesive semantic color tokens, component patterns, anti-AI-slop heuristics, 21st.dev component adaptation, and Framer Motion animation patterns.
---

# UI/UX PRO MAX DESIGN & ENGINEERING SYSTEM

This skill establishes production-grade design and engineering standards for all UI components, landing pages, and interactive experiences.

---

## 1. Typography System (Mathematical Scale)

Never use arbitrary, random font sizes. Use a disciplined, proportional typographic scale.

### Type Scale (Base: 16px, Scale Ratio: 1.25 Major Third / 1.125 Major Second for dense UI)
- **Display / Hero (H1)**: `text-4xl` to `text-6xl` (36px - 60px), `leading-[1.1]`, `font-bold` / `font-extrabold`, tracking `-0.025em` (`tracking-tight`)
- **Section Heading (H2)**: `text-2xl` to `text-3xl` (24px - 30px), `leading-[1.25]`, `font-semibold` / `font-bold`, tracking `-0.02em`
- **Card / Subsection Heading (H3)**: `text-lg` to `text-xl` (18px - 20px), `leading-[1.35]`, `font-semibold`
- **Subheadings & Lead Paragraphs**: `text-base` to `text-lg` (16px - 18px), `leading-relaxed` (1.6 - 1.7)
- **Body Regular**: `text-sm` to `text-base` (14px - 16px), `leading-normal` (1.5 - 1.6), `font-normal`
- **Captions, Badges, Meta**: `text-xs` (12px), `leading-normal`, `font-medium` / `font-semibold`, tracking `0.025em` to `0.05em` (`tracking-wide` for badges)

### Baseline Readability Rules
- Line length constrained to 60–75 characters (`max-w-2xl` or `max-w-3xl` for copy).
- Never skip heading levels (e.g. do not jump from H1 directly to H4).
- Text inside buttons, pills, chips, and badges must sit on **one line** (`whitespace-nowrap`).

---

## 2. Spacing & Layout System (8px Base Grid)

All layout margins, paddings, gaps, and structural heights adhere to the 8px grid (with 4px for fine-grained sub-elements):
- `4px` (`p-1`, `gap-1`, `space-y-1`) — Micro gaps, icons to text, badge internal padding
- `8px` (`p-2`, `gap-2`, `space-y-2`) — Compact element spacing, input vertical padding
- `12px` (`p-3`, `gap-3`) — Button padding, list item separation
- `16px` (`p-4`, `gap-4`, `space-y-4`) — Standard container inner padding, card gaps
- `24px` (`p-6`, `gap-6`, `space-y-6`) — Section groupings, modal padding
- `32px` (`p-8`, `gap-8`, `space-y-8`) — Card padding, bento grid cell separation
- `48px` (`py-12`) — Compact section vertical padding
- `64px` - `96px` (`py-16` to `py-24`) — Major landing page section vertical rhythm

### Padding Math & Nested Border Radii
- **Container Rule**: Container outer padding must *always* equal or exceed the inner padding between its child elements.
- **Nested Radius Formula**: `Inner Radius = Outer Radius - Padding Between Them`.
  - Example: Card `rounded-2xl` (16px) with `p-3` (12px) => Inner item `rounded-sm` (4px).

---

## 3. Color Tokens & Semantic Theme

No arbitrary disconnected hex codes. Use coordinated design tokens:

### Dark Theme Palette
- **Canvas Base**: `#070b14` (Deep obsidian blue) / `#050811` (Footer/base depth)
- **Elevated Surfaces**:
  - Surface Tier 1 (Cards/Panels): `#0b1329` / `bg-slate-900/60` with `border-white/10`
  - Surface Tier 2 (Hover/Active): `#111c3d` / `bg-slate-800/80` with `border-blue-500/30`
  - Surface Tier 3 (Pills/Inputs): `bg-blue-950/40` with `border-blue-500/20`
- **Brand & Accent Colors**:
  - Primary Electric Cyan: `#38bdf8` (`text-sky-400`, `bg-sky-500`, `shadow-[0_0_20px_rgba(56,189,248,0.25)]`)
  - Deep Brand Blue: `#3b82f6` (`text-blue-500`, `bg-blue-600`)
  - Accent Indigo/Violet: `#6366f1` (`text-indigo-400`, `bg-indigo-500`)
- **Status Semantic Tokens**:
  - Safe / Clean: `#10b981` (Emerald / `emerald-400`)
  - Warning / Suspicious: `#f59e0b` (Amber / `amber-400`)
  - Malicious / Danger: `#ef4444` (Rose / `red-500`)
  - Neutral / Informational: `#94a3b8` (Slate / `slate-400`)
- **Typography Colors**:
  - Primary Text: `#f8fafc` (`text-slate-50` / `text-white`)
  - Secondary Text: `#cbd5e1` (`text-slate-300`)
  - Muted / Supporting: `#94a3b8` (`text-slate-400`)
  - Subtle Borders: `rgba(255, 255, 255, 0.08)` to `rgba(59, 130, 246, 0.2)`

---

## 4. Component Patterns

### Button States
- **Primary Action**: Solid brand background (`bg-blue-600 hover:bg-blue-500 active:scale-[0.98]`), high-contrast text, smooth `transition-all duration-200`, subtle glow on hover (`hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]`), focus ring `focus-visible:ring-2 focus-visible:ring-blue-400`.
- **Secondary / Outline**: Translucent background (`bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/40 active:scale-[0.98]`).
- **Ghost Action**: Text with background reveal on hover (`hover:bg-white/5 text-slate-300 hover:text-white`).

### Card Structure
- High-contrast visual boundary (`border border-white/10` or `border-blue-500/20`).
- Subtle radial highlight or directional gradient surface (`bg-gradient-to-b from-slate-900/80 to-slate-950/80`).
- Interactive hover transition (`transition-transform duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]`).

### Form & Input Controls
- Clear default, focus, active, error, and disabled states.
- High contrast background (`bg-slate-950/60 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none`).
- Minimum touch target: `44px` on mobile screens.

---

## 5. Anti-AI-Slop Directives

1. **No Purple-to-Cyan Clichés**: Avoid rainbow gradient text or garish neon purple buttons. Stick to coordinated brand tokens.
2. **No Nested Card Soup**: Never place multiple nested cards inside cards. Flatten depth with subtle dividers, typography hierarchy, and whitespace.
3. **No Meaningless Generic Copy**: Use concrete domain terms (e.g., "Real-time APK Sandbox & Phishing Heuristics", not "Supercharge your safety with powerful next-gen insights").
4. **No Fake Numbers**: Do not add random artificial stat blocks without functional meaning or context.
5. **No Broken Mobile Padding**: Ensure horizontal padding is scaled appropriately (`px-4 sm:px-6 lg:px-8`).

---

## 6. Framer Motion Animation Standards

Use `motion` or `framer-motion` for all dynamic transitions and interactive states:

### Scroll-Triggered Entrance Animations
```tsx
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-80px" }}
  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
>
  {/* Content */}
</motion.div>
```

### Staggered Children Lists
```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};
```

### Micro-Interactions & Tap States
- Buttons: `whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}`
- Cards: `whileHover={{ y: -4, transition: { duration: 0.2 } }}`

---

## 7. 21st.dev Component Integration Protocol

When integrating components from `21st.dev`:
1. **Token Alignment**: Map all hardcoded colors, borders, and shadows to the project's brand design tokens (`#38bdf8`, `#3b82f6`, `#070b14`, `slate-300`, etc.).
2. **Copy Replacement**: Replace all generic placeholder text, lorem ipsum, and dummy logos with context-accurate APK Shield copy and assets.
3. **Framer Motion Integration**: Wrap the component with scroll-triggered entrance reveals (`whileInView`, `viewport={{ once: true }}`) and responsive touch states.
4. **Accessibility & Clean DOM**: Ensure unique HTML IDs, accessible labels, no broken layout overflow, and responsive wrapping across mobile to desktop.
