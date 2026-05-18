---
"@poukai-inc/ui": minor
---

Add `illustration` slot to `<Hero>` molecule. When provided, Hero switches to a two-column layout (text left, illustration right) above 720px; the illustration column hides below that breakpoint. Default `undefined` preserves the current single-column layout with zero regression for existing consumers. The illustration column animates as the fifth element when `entrance="stagger"` is active. Uses the `--hero-illustration-max` token (25rem) added to `tokens.css` by `poukai-design`.
