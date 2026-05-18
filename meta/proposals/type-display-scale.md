# Proposal: `--fs-display` — editorial display rung above `--fs-tagline`

**Target**: `@poukai-inc/ui` type ramp (`src/tokens/tokens.css`)
**Status**: Counter-proposed (extend existing primitive — at a tighter shape than asked)
**Author**: pouk.ai site team (filed via GH issue [poukai-ui#55](https://github.com/poukai-inc/poukai-ui/issues/55), authored by `pouk-ai-pm` / consumer composition agent)
**Mirrored into the proposal log by**: `poukai-design`
**Filed**: 2026-05-18
**Decision**: 2026-05-18
**Decided by**: `poukai-design` (Arian to ratify on review)
**Implements proposal in spec**: brand decision log entry `meta/brand.md` → "2026-05-18 — Counter-propose `--fs-display`; reject `--fs-display-lg`"

---

## 1. Problem (from consumer)

Current DS type ramp tops out at `--fs-tagline` (clamp `36–68px`). `--fs-tagline-intimate` is a lower-density variant (`32–52px`). Both scoped to `<Hero>`, "used exactly once per page for the Hero title."

There is no token for editorial display moments larger than `--fs-tagline`. Numerals stretch to `96px` via `--fs-stat-large`, but those are constrained to `<Stat>` instances and read as data, not editorial type.

**Driving composition**: pouk.ai `/about` v2 Direction A — single-statement display lead, one sentence at extreme scale owning the page's first viewport. Without a token above `--fs-tagline`, the direction collapses to Hero-title-scale that every other page already uses for its Hero — the move evaporates.

**Reuse surfaces named by consumer**: future `/manifesto`, `/values`, customer-story openers; possible home revision; OG cards / social-share headlines.

Full consumer-side proposal mirrored at `pouk.ai`: `meta/proposals/ds-side/type-display-scale.md`. This file is the canonical in-tree DS-side record per `meta/proposals/README.md`.

---

## 2. Consumer's ask

Two new tokens:

```css
--fs-display: clamp(3rem, 2rem + 5vw, 7.5rem); /* 48–120px */
--fs-display-lg: clamp(4rem, 2rem + 8vw, 12rem); /* 64–192px */
```

Roles: `--fs-display` = mid-scale editorial display; `--fs-display-lg` = brand's loudest typographic move, "page-opening statement fully owns first viewport" (per consumer, ~192px ceiling).

Composition rule proposed by consumer: "at most once per page, not for body text, not for headings."

---

## 3. Decision

**Counter-offer**: ship **`--fs-display` only**, at a **tighter range than asked**. **Reject `--fs-display-lg` outright.**

**Exact token**:

```css
--fs-display: clamp(3rem, 1.75rem + 4vw, 5.5rem); /* 48–88px */
```

- Floor `48px` (3rem) — matches consumer's floor. Mobile rung is unchanged.
- Ceiling `88px` (5.5rem) — **the contested number**. Consumer asked for 120px; Arian's lean was ~80px; my counter is 88. Defended below in §5.
- Slope `1.75rem + 4vw` — reaches the ceiling at roughly 1440px viewport, smooth growth across the marketing-relevant breakpoint band.

**Composition rule** (carries the consumer's framing, made stricter):

- At most once per page.
- Not for body text. Not for `<h1>` (semantic heading stays on `--fs-tagline` via `<Hero>`).
- Reserved for editorial display moments where the page opens on a single statement and the Hero pattern is being deliberately replaced — not augmented.
- Pairs with `<Statement>` or a dedicated display surface (future spec). Does not modify `<Hero>`.

---

## 4. Why `--fs-display-lg` is rejected

The consumer named four reuse surfaces. Only one — pouk.ai `/about` v2 Direction A — has a real, dated composition driving the ask. The other three (future `/manifesto`, OG cards, possible home revision) are speculative reuse. **The token surface is the brand contract; once it ships, it cannot be quietly withdrawn.**

Specific objections to `--fs-display-lg`:

1. **Register violation (brand `§6`).** The primary aesthetic reference is Apple's restrained Human Interface register. Apple's marketing display typography on `apple.com` — including the iPhone hero spreads, the AirPods Max landing, the Mac Studio page — tops out around `80–100px` on the widest viewports. Their condensed editorial register stays well below `192px`. A `192px` ceiling on pouk.ai would be louder than anything Apple ships on their own marketing surfaces; the brand cannot claim "Apple-aligned" with that ceiling in the contract. The current brand reads as restrained because the type ramp tops at `68px`; jumping to `192px` is not a refinement of the existing register, it's a different register.
2. **Runtime-undisciplined.** Tokens encode "at most once per page" by convention, but the DS cannot enforce it. The consumer noting the discipline rule in the proposal does not bind future consumers, future composer agents, or future Arian-in-a-hurry. A `192px` token will be reached for. Once it appears on two pages it normalises; once it's normal it's the brand. We do not want that to be the brand.
3. **One-shot need is not a token need.** The driver is one direction (Direction A) on one page (`/about`). Direction A wanting `192px` to own the viewport is a composition-level decision; it can be served with a site-side `font-size: clamp(...)` declared inside that page's stylesheet. The consumer themselves argues against this path ("codifies the cap", "cross-surface reuse"), but the cross-surface reuse is speculative — there is no second confirmed surface needing `192px`. When the second surface arrives, we revisit. Until then, the site can have its `192px` moment via a local style; the DS does not need to bless it as a brand-level rung.
4. **Two-token symmetry argument doesn't hold.** Consumer cites `--fs-stat` / `--fs-stat-large` symmetry as precedent for shipping two display tokens. But `--fs-stat-large` exists because real stat content varies in importance and arrives at known scales (`56–96px` is calibrated to numerical content under `<Stat>`, a heavily-scoped primitive). Two display tokens with no scoped primitive carrying them is two un-scoped tokens, each independently reachable from any consumer surface. The symmetry is cosmetic, not structural.

---

## 5. Why the `--fs-display` ceiling is `88px`, not `80px` (Arian's lean) or `120px` (consumer)

Arian's steer was "roughly 48-80px, sitting between `--fs-tagline` (max 68) and `--fs-stat-large` (max 96)." I'm pushing the ceiling 8px higher to 88. Reasoning:

1. **Distance from `--fs-tagline` matters for the rung to register.** `--fs-tagline` maxes at `68px`. At ceiling `80px`, the gap is `12px` (1.18× larger). At desktop scale on a 1440px viewport, a 12px delta against a serif display face reads as "a slightly bigger Hero title" — the new rung does not clearly separate. At `88px` the gap is `20px` (1.29× larger), which crosses the threshold where the eye reads two distinct sizes rather than one inconsistent one. **The point of adding the rung is for it to be a different register, not a louder version of the existing one.**
2. **Distance from `--fs-stat-large` matters for the editorial register to stay below the data register.** `--fs-stat-large` maxes at `96px`. At ceiling `88px`, editorial display sits `8px` below numerical-stat display — numerals get to be the loudest, which is Apple-correct. Their largest editorial text on `apple.com` sits around `80px`; their numerical hero stats can and do go larger. The 88-vs-96 ordering preserves that hierarchy. At ceiling `96px` we would collide with the stat rung; at ceiling `100px+` we would invert the hierarchy. `88` keeps the order honest.
3. **`88px` is still inside Apple's marketing-display band.** Apple's iPhone landing hero ranges roughly `72–96px` on its widest viewports; AirPods Max landing peaks around `80–88px`. `88` sits inside that band, just below its top. It is not a register violation; `120` and `192` would be.
4. **Floor stays at `48px`.** The consumer's `48px` floor is the right number on mobile — meaningfully above `--fs-tagline`'s `36px` floor (1.33×), so the mobile rung is also a real rung. I keep this.
5. **Slope `1.75rem + 4vw` reaches `88px` at ~1437px viewport.** Smooth fluid growth across the marketing breakpoint band; the clamp tops out at the laptop / desktop scale where the move is meant to land.

---

## 6. Position on the consumer's framing

| Consumer claim                              | Position   | Rationale                                                                                                                                                                                                                                                                                                                             |
| ------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "No token for editorial display > tagline." | **Agree**  | The gap is real. Numerals at `--fs-stat-large` are data, not type. Adding **one** rung above `--fs-tagline` is the right call.                                                                                                                                                                                                        |
| "Tokens codify the cap."                    | **Partly** | Tokens codify the value, not the cap. The cap is a documentation convention; the DS cannot enforce "once per page." We add the token expecting eventual misuse.                                                                                                                                                                       |
| "Two tokens for two page weights."          | **Reject** | One rung. `/about` v2 Direction A is the only confirmed driver; future pages can use `--fs-display` or argue for a second rung when they exist. Speculative tokens harden into accidental contract.                                                                                                                                   |
| "Ceiling at 120/192 lets the move land."    | **Reject** | The move can land at 88. The composition can also choose to use a local site-side clamp for a one-off direction without polluting the DS token surface. Ceiling 120/192 is a register change, not a token addition.                                                                                                                   |
| "OG cards / social want the same scale."    | **Partly** | OG cards are 1200×630, fixed pixel canvas — they don't consume CSS clamp tokens at runtime; they consume one font-size at one viewport-equivalent. The token is referenced by name in a static OG render, but the value sampled is whatever the ceiling resolves to. `88` works there as well as `120` does; "needs 120" is unargued. |

---

## 7. Trade-offs accepted

1. **The consumer asked for two tokens and gets one, smaller.** Accepted: the brand register won't carry two display rungs. If `/about` Direction A absolutely needs the `192px` moment, the consumer files a follow-up issue with the second confirmed surface and we revisit. Today there is one surface and we ship one rung.
2. **The consumer's Direction A might require composition rework.** If Direction A was specifically designed around a `120–192px` move, it gets rescaled to `88px` ceiling — or the composition shifts to compensate (more whitespace around the line, tighter line-height, slower entrance). The site team owns that rework. This is the cost of restraint-by-discipline.
3. **`--fs-display` at `88px` ceiling could still be misused.** Documented "at most once per page" is a convention, not a runtime check. Acceptable: even worst-case misuse caps at `88px`, which is still inside the Apple-aligned band. The `192px` worst case would have been outside it.
4. **Token surface grows by one entry.** Minor. Documented in `tokens.css` next to `--fs-tagline-intimate`, surfaced in `llms-full.txt` with the composition rule.

---

## 8. Out of scope (deferred)

- `--fs-display-lg` at any ceiling — explicitly rejected today; not deferred, declined.
- A dedicated `<Statement>` molecule consuming `--fs-display` — separate spec when the second surface lands; site can render the moment with a `<p>` + className for now.
- Tracking / letter-spacing / line-height for the display rung — the engineer applies the site's chosen values when the spec is implemented; the token surface is the font-size only. If a recurring tracking value emerges across surfaces, that's a follow-up token.
- Italic display variant — `<h1 em>` italic precedent on `--fs-tagline` extends naturally; not part of this proposal.
- Dark-mode treatment — color is unchanged; the display rung consumes `--fg` like every other editorial face.

---

## 9. Hand-off

The brand decision log entry in `meta/brand.md` (2026-05-18) is the canonical spec. The engineer (`poukai-ds-engineer`) picks up implementation:

- `src/tokens/tokens.css` — add `--fs-display: clamp(3rem, 1.75rem + 4vw, 5.5rem);` inside the existing fluid-type-scale block, immediately after `--fs-tagline-intimate`.
- `llms-full.txt` — document the new token with the composition rule (once-per-page, editorial only, not a heading replacement).
- No component code changes in this PR. No `<Statement>` molecule yet. No `<Hero>` modifications.
- Changeset: minor bump (additive token, no consumer behavior change).

Engineer's domain — not authored by `poukai-design`.

---

## 10. Links

- GitHub issue: <https://github.com/poukai-inc/poukai-ui/issues/55>
- Companion proposals (open at time of decision): one of three DS-gap proposals filed concurrently against `/about` v2.
- Brand decision log entry: `meta/brand.md` → "2026-05-18 — Counter-propose `--fs-display`; reject `--fs-display-lg`"
- Driving composition (site repo): `meta/compositions/proposals/about-v2-explorations.md` §2.3, §3 Direction A
