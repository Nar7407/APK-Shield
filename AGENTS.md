# Project Design & Engineering Rules (UI-UX-PRO-MAX)

All frontend UI and UX development in this project MUST strictly follow the design guidelines defined in `/.apkskilled/skills/SKILL.md`:

1. **Framer Motion for All Animations**:
   - Use `framer-motion` or `motion` for all component animations, scroll-triggered reveals (`whileInView`, `viewport={{ once: true }}`), staggered lists, and micro-interaction states (`whileHover`, `whileTap`).

2. **Typography Scale**:
   - Adhere strictly to the defined typographic scale (Display H1: `text-4xl` to `text-6xl`, Section H2: `text-2xl` to `text-3xl`, H3: `text-lg` to `text-xl`, Body: `text-sm` to `text-base`, Captions/Badges: `text-xs` with proper line-heights and tracking).
   - Constrain line widths for readability (`max-w-2xl` to `max-w-3xl`).

3. **8px Base Spacing Grid**:
   - Build all layouts, margins, paddings, and card gaps using multiples of the 8px grid (with 4px for micro-spacing).
   - Follow container padding mathematics and nested border-radius calculation (`Inner Radius = Outer Radius - Padding`).

4. **Brand Design Tokens**:
   - Strictly use the project's semantic dark palette: Base `#070b14`, Surface `#0b1329` / `bg-slate-900/60`, Primary Cyan `#38bdf8`, Deep Blue `#3b82f6`, Indigo `#6366f1`, and status tokens (`emerald-400`, `amber-400`, `red-500`). No random disconnected hex values.

5. **Anti-AI-Slop Directives**:
   - No generic purple-to-cyan clichés, no nested card soup, no meaningless SaaS buzzwords, and no unstyled placeholder boxes.

6. **21st.dev Component Integration**:
   - When integrating components from 21st.dev or modern component libraries, match them directly to our design tokens, replace placeholder copy with authentic APK Shield threat security content, and apply scroll-triggered Framer Motion entrance animations.
