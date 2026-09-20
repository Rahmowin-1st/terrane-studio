# TERRANE

Native Next.js source for the final **Terrane V3.1** architecture portfolio.

## Production
- Vercel: https://terrane-studio.vercel.app
- Framework: Next.js 15 / React 19
- Styling: Tailwind source + Terrane Webflow/V2/V3.1 local visual layers
- Motion: GSAP + Motion
- Backend: Next.js consultation API + existing persistence/notification path

## V3.1 migration status
The final Webflow master was migrated back into this repository as editable native code.

- Page content and structure live in `components/` and `components/sections/`.
- Final Webflow visual layers live locally in `public/terrane-webflow.css`, `public/terrane-frontend-v2.css`, and `public/terrane-v31-polish.css`.
- Webflow-only DOM behavior was ported into `components/WebflowV31Bridge.tsx`.
- React remains authoritative for navigation, galleries, motion state, and the consultation form.
- `/work?slug=...` remains compatible and redirects to native `/work/[slug]`.
- Production does not require the Webflow site to render or submit the consultation form.

## Development
```bash
npm install
npm run dev
```

## Verification
```bash
npm run build
npm run test:backend
```
