

# Structural Updates to Smart Energy Pay Landing Page

No redesign — only the specific structural replacements requested.

---

## 1. Replace Email Capture Forms with Omnisend Embed

### Hero Section (`src/components/Hero.tsx`)
- Remove the email form container (lines 37-50): the `Mail` icon, `input`, and `button`
- Remove the `Mail` import from lucide-react
- Replace with: `<div id="omnisend-embedded-v2-699f72cff447765c8535ff85"></div>` inside the same parent area, preserving the `max-w-md mx-auto` centering

### Footer Section (`src/components/FooterCTA.tsx`)
- Remove the email form container (lines 20-34): the `Mail` icon, `input`, `button`, and state logic
- Remove `useState` and `Mail` imports
- Replace with the same Omnisend embed div, preserving centering

### Omnisend Script (`index.html`)
- Add the Omnisend script tag in the `<head>` or before `</body>` so the embed can initialize

---

## 2. Fix Footer Legal Links

In `src/components/FooterCTA.tsx`, line 38:
- Replace the plain text `Terms & Conditions · Privacy Policy · Contact` with three `<a>` tags:
  - "Imprint" linking to `https://smartenergypays.io/legal-regulatory-information`
  - "Privacy Policy" linking to `https://smartenergypays.io/legal/privacy-policy`
  - "Legal" linking to `https://smartenergypays.io/legal-regulatory-information`
- Links open in the same tab (no `target="_blank"`)
- Preserve existing text styling (`text-xs text-muted-foreground`)

---

## 3. Logo / Favicon

The navbar already uses the official `src/assets/logo.png` — no Falcon icon exists in the codebase. No changes needed to the navbar.

For the favicon in `index.html`:
- Update the `<link rel="icon">` to point to the official logo (`/logo.png`), copying `src/assets/logo.png` to `public/logo.png`
- Update the page title from "Lovable App" to "Smart Energy Pays"
- Update meta descriptions and OG tags to match the brand

---

## Files to Modify
| File | Changes |
|------|---------|
| `src/components/Hero.tsx` | Remove email form, add Omnisend div, clean imports |
| `src/components/FooterCTA.tsx` | Remove email form + state, add Omnisend div, update footer links to anchors, clean imports |
| `index.html` | Add Omnisend script, update favicon, update title/meta |
| `public/logo.png` | Copy from `src/assets/logo.png` for favicon use |

