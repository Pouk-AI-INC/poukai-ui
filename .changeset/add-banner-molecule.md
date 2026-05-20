---
"@poukai-inc/ui": minor
---

Add `Banner` molecule — persistent inline notice component with four tones: `info`, `warning`, `danger`, and `success`. Anatomy: optional leading icon slot, required body content, optional trailing action slot. `role="status"` (polite) for info/success; `role="alert"` (assertive) for warning/danger. Zero new tokens; re-uses existing warm-accent tier for warning/danger and accent border for success. Static and persistent — consumer controls mount/unmount.

Toast (ephemeral overlay notification) is intentionally deferred to a follow-up PR. Toast requires a state container (Provider), queue management, timing logic, and a portal — scoping it separately keeps this PR focused and reviewable. Banner ships first as the brand-appropriate persistent surface.
