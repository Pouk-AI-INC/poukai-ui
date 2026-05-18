---
"@poukai-inc/ui": minor
---

Add `--fs-display: clamp(3rem, 1.75rem + 4vw, 5.5rem)` (48–88px). Editorial display rung above `--fs-tagline` (max 68px), 8px below `--fs-stat-large` (max 96px) so numerals stay loudest. Reserved for editorial display moments where the page opens on a single statement and the Hero pattern is being deliberately replaced — at most once per page, not a heading replacement.

Triaged from [poukai-ui#55](https://github.com/poukai-inc/poukai-ui/issues/55) (pouk.ai `/about` v2 Direction A). Consumer asked for two tokens (`--fs-display` 48–120px + `--fs-display-lg` 64–192px); designer counter-proposed one token at a tighter ceiling. See `meta/brand.md` Decision history (2026-05-18) and `meta/proposals/type-display-scale.md` for full rationale.
