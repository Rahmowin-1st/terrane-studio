# TERRANE V2 — MOTION GUIDANCE

Status: FRONTEND AUTHORITY for Portfolio V2.
Backend contract is frozen.

## Goal
Motion must make TERRANE feel like architecture unfolding in time. The target is not more animation; the target is stronger choreography, spatial logic, and perceived production value than VeroSpace while keeping native scrolling and clean mobile behavior.

## Ownership lock
- CSS/Tailwind: hover, focus, color, opacity, border, tiny tactile states.
- Motion for React: menu/overlay/form state/layout/component transitions.
- GSAP + ScrollTrigger: hero timeline, scroll-linked storytelling, masks, parallax, section choreography, process rail.
- Never let Motion and GSAP own the same transform/property on the same node. Use wrappers.

## Scene grammar
### 01 Hero — signature opening
- Image starts oversized behind an architectural mask, then decompresses.
- Title enters line-by-line with clipped vertical motion, not a fade stack.
- Kicker, lead, CTAs and technical metadata arrive on distinct vectors.
- Fine plan/grid lines draw after the title establishes hierarchy.
- Scroll: image receives subtle scrubbed parallax/scale; copy releases upward more slowly than the media.
- Mobile: shorter timeline, reduced transforms, no expensive mask choreography.

### 02 Practice
- Large manifesto copy and explanatory text converge from opposite axes.
- Horizontal rules draw from 0 to 100%.
- Proof items resolve sequentially without card-pop gimmicks.

### 03 Selected Work — primary showpiece
Each project must feel like its own frame while preserving one grammar.
- Media mask reveal.
- Image decompression from 1.07–1.11 to 1.
- Subtle scrub parallax on desktop.
- Project number and title counter-move relative to the image.
- Metadata settles after the image is readable.
- Alternate vectors left/right/vertical; never repeat identical fade-up reveals.
- Hover/focus: small crop shift + underline/arrow response; do not hijack cursor.
- Project page entry should reuse the project’s visual direction.

### 04 Expertise
- Dark material field.
- Rows enter with controlled perspective/axis variation.
- Active row produces restrained contrast and line movement.

### 05 Approach
- Desktop: sticky narrative title + vertical progress rail.
- ScrollTrigger draws rail according to section progress.
- Each step transitions from muted to active and resolves before the next dominates.
- Mobile: linear, no long pinning. Rail may remain but animation is simple and fast.

### 06 Studio
- Image and statement converge from opposing axes.
- Secondary material crop drifts subtly under scroll.
- No fake team-page theatrics.

### 07 Consultation — signature closing scene
Consultation is part of the motion system, not a static footer form.
- Section background becomes quieter/darker as the user reaches decision state.
- Copy and form plane converge from opposite sides.
- Form fields enter as a restrained sequence.
- Focus: label/line activation only; never distracting motion while typing.
- Submit: CTA enters a pending state; the form remains spatially stable.
- Success: resolved, calm confirmation plane after actual server persistence.
- Failure/offline: preserve entered content; error plane should not imply success.
- Reduced motion: no overlay travel/scale; opacity-only state change is acceptable.

### 08 Header / navigation
- Header settles once on load.
- Hide/reveal based on scroll direction stays fast and reversible.
- Mobile Index opens as a composed sequence, not all links at once.
- Liquid glass reacts to pointer only on fine-pointer desktop and never reduces legibility.

## Global motion rules
- Native scroll only. No ScrollSmoother, scroll hijacking, forced snap, or fake inertia.
- Use `gsap.matchMedia()` for desktop/mobile divergence.
- Prefer transform + opacity + clip-path; avoid layout-triggering animation.
- Clean every ScrollTrigger and listener on unmount.
- `prefers-reduced-motion` must leave all content visible and usable.
- No animation may delay primary CTA use.
- No section may rely on motion to reveal essential content permanently.

## Quality gate
Automatic FAIL if:
- most elements only fade upward;
- desktop choreography is merely compressed onto mobile;
- project cards all animate identically;
- Motion and GSAP fight for the same transform;
- consultation is visually static while the rest of the site is cinematic;
- reduced-motion hides content;
- the page feels more alive only because it has more triggers.

PASS only when TERRANE feels more composed, architectural, and cinematic than VeroSpace without becoming noisier.