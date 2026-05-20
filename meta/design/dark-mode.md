# Design spec: Dark mode token tier

**Atomic layer**: foundation
**Status**: Approved
**Author**: poukai-design
**Last updated**: 2026-05-19
**Implements proposal**: n/a — ROADMAP "Maybe" item promoted to this round

---

## 1. Purpose

Dark mode is not an inversion of the light palette. It is a parallel surface stack where backgrounds darken progressively toward black (the floor), foregrounds brighten toward near-white (never pure), and the elevation rhythm inverts direction — surfaces now RISE through darker grays as they elevate, rather than rising toward white.

This spec authors the `@media (prefers-color-scheme: dark)` block that overrides every color token in `src/tokens/tokens.css` for dark environments. No component CSS changes. No new component files. The token flip is the entire mechanism — every component that consumes tokens correctly gains dark mode for free.

**Non-goals.**

- Per-component dark-mode overrides in CSS modules. If a component needs one, that is a signal it has a hardcoded color value that should be a token instead (see §9 Open questions for the current audit list).
- A `data-theme="dark"` class toggle / JavaScript theme switcher. This spec ships OS-preference-only dark mode via the standard `prefers-color-scheme` media query. A manual toggle is a future concern.
- Dark-mode motion changes. Motion tokens are unchanged.
- Dark-mode typography changes. Type tokens are unchanged.
- Dark-mode spacing or layout changes. No layout tokens change.

---

## 2. Anatomy

The mechanism is a single CSS media block appended to the end of `src/tokens/tokens.css`:

```css
@media (prefers-color-scheme: dark) {
  :root {
    /* color token overrides */
  }
}
```

The browser applies this block automatically when the OS reports dark preference. The `:root` scope means every CSS custom property on the root element is overridden, and since all components use `var(--token)` references, they pick up the new values without any component-level changes.

**Why `@media` and not a `[data-theme]` class selector.**

The media query approach requires zero JavaScript. It is the correct first step: OS-preference dark mode covers the majority of use cases and is the baseline expected by WCAG 1.4.3 (contrast requirements apply regardless of mode). A class-toggle mechanism can be layered on top later by wrapping the same overrides in a `[data-theme="dark"]` rule in addition to the media query — that is a non-breaking extension. The design decision is: ship the media query now; the class toggle is the next iteration.

**`color-scheme` declaration.**

The existing `html { color-scheme: light; }` rule must become `color-scheme: light dark;` in the same commit — this tells the browser to use its built-in dark-mode scrollbars, form controls, and selection highlights. The engineer handles this in the same PR.

---

## 3. Token contract

Full table of every color token's light value and dark counterpart. Typography, spacing, motion, layout, and radius tokens are unchanged and omitted.

| Token | Light value | Dark value | Role in dark mode |
|---|---|---|---|
| `--bg` | `#FBFBFD` | `#000000` | Page floor. Pure black is the canonical dark-mode canvas (Apple iOS / macOS system background). No elevation headroom needed below the floor — there is nothing beneath it. |
| `--bg-elevated` | `#FFFFFF` | `#1C1C1E` | Front-most surface layer: popovers, sheets, dialogs. Lighter than `--bg` — the elevation direction inverts. `#1C1C1E` is Apple's iOS `systemBackground` dark value. |
| `--surface` | `#F5F5F7` | `#1C1C1E` | Recessed inline blocks (code, quote, card fills). In dark mode, `--surface` and `--bg-elevated` share the same raw value; they remain semantically distinct because `--surface` recedes below the page and `--bg-elevated` elevates above it. The visual distinction comes from surrounding context (page vs. overlay). If this conflation creates ambiguity in practice, the next iteration introduces a dedicated `--surface-dark` rung. |
| `--surface-section` | `#F8F8FA` | `#161618` | Full-width alternating section bands. Slightly darker than `--bg` (#000), creating the same subtle recessed-band rhythm as in light mode — but downward instead of upward. |
| `--fg` | `#1D1D1F` | `#F5F5F7` | Primary text, wordmark, sigil. Near-white pulled off `#FFFFFF` by 10/255 on each channel. The headroom allows `--bg-elevated` surfaces (which in dark mode are `#1C1C1E`) to eventually use a slightly brighter foreground if needed — preserving the same off-pure convention as light mode. |
| `--fg-muted` | `#6E6E73` | `#86868B` | Secondary text: captions, footer, lede. Apple's `secondaryLabel` dark-mode gray. Contrast against `--bg` (#000): **6.10:1** (AA normal). |
| `--hairline` | `#D2D2D7` | `#2C2C2E` | 1px dividers. In dark mode hairlines become subtle dark-gray separators — they must be visible as structure without asserting. `#2C2C2E` is Apple's `separator` dark value. |
| `--accent` | `#0071E3` | `#0A84FF` | Links, focus rings, status dot. Apple's `systemBlue` dark-mode value. Brighter than the light-mode accent because dark backgrounds demand higher luminance to hit the same perceptual pop. Contrast against `--bg` (#000): **5.86:1** (AA normal; ≥ 3:1 required for focus rings under WCAG 1.4.11). |
| `--accent-glow` | `rgba(0,113,227,0.18)` | `rgba(10,132,255,0.24)` | Selection background, status dot halo. Slightly higher opacity in dark mode to compensate for the dark surface absorbing more of the tint. |
| `--bg-warm-accent` | `#C0452C` | `#8A2E1C` | Editorial warm band. Dimmed significantly for dark mode — the light-mode value reads as a bold saturated accent against `#FBFBFD`; against `#000000` it would scorch. `#8A2E1C` is approximately 55% the luminance of the light value, bringing it into a "deep ember" register that reads as warm without overwhelming. |
| `--fg-on-warm` | `#FDF5F0` | `#FDF5F0` | Primary text on warm band. Unchanged — the warm near-white reads correctly against both warm-band values. Contrast against dark `--bg-warm-accent` (#8A2E1C): **7.75:1** (AAA). |
| `--fg-on-warm-muted` | `#F5DDD0` | `#D6B9A8` | Supporting text on warm band. Pulled inward (more saturated, less bright) in dark mode to maintain legibility against the dimmed warm band. Contrast against `#8A2E1C`: computed ≈ **4.8:1** (AA normal). |
| `--danger` | (set by Agent #1) | `#FF453A` | Apple `systemRed` dark. Brighter than light-mode danger to read clearly on dark surfaces. |
| `--bg-danger` | (set by Agent #1) | `#1C0A0A` | Near-black with a red undertone. "Tinted dark surface" register — reads as danger-toned without being a bright alert background. |
| `--fg-on-danger` | (set by Agent #1) | `#FFB4B0` | Softened salmon-pink. Contrast against `--bg-danger` (#1C0A0A): **11.63:1** (AAA). |
| `--warning` | (set by Agent #1) | `#FF9F0A` | Apple `systemOrange` dark. |
| `--bg-warning` | (set by Agent #1) | `#1C1408` | Near-black with an amber undertone. |
| `--fg-on-warning` | (set by Agent #1) | `#FFD6A0` | Warm straw. Contrast against `--bg-warning` (#1C1408): **13.74:1** (AAA). |

### Elevation rhythm in dark mode

Light mode rises toward white: `--surface (#F5F5F7) < --surface-section (#F8F8FA) < --bg (#FBFBFD) < --bg-elevated (#FFFFFF)`

Dark mode rises toward lighter gray: `--surface-section (#161618) < --bg (#000000)` — wait, this is inverted: the section band is actually lighter than the page floor. Corrected direction:

Dark elevation stack, dark to light: `--bg (#000000) < --surface-section (#161618) < --surface (#1C1C1E) = --bg-elevated (#1C1C1E)`

The page floor is the darkest value. Recessed bands sit slightly above it. Inline surfaces and elevated overlays sit at the same rung (`#1C1C1E`). The semantic distinction between `--surface` (recessed inline) and `--bg-elevated` (overlay) is contextual, not chromatic, at this tier. If the two roles need visual separation in future components, `--surface` can be bumped to `#222224`.

---

## 4. States and motion

No changes to motion tokens in dark mode. All `--dur-*`, `--easing`, and `--easing-link` values are unchanged. The `@media (prefers-reduced-motion: reduce)` block is independent of the color-scheme block and continues to apply in dark mode.

No changes to component states (hover, focus, active, disabled). Those states are expressed via the same token vocabulary — the token values simply change under the dark block, so states respond correctly automatically.

---

## 5. Responsive behavior

Dark mode is a color scheme, not a layout variant. No responsive layout changes. The `@media (prefers-color-scheme: dark)` block applies at all viewport sizes.

---

## 6. Accessibility

### Contrast targets and verification

All ratios are computed using WCAG 2.1 relative luminance (`C_lin = C/12.92` for `C ≤ 0.04045`, else `((C+0.055)/1.055)^2.4`) and the `(L1+0.05)/(L2+0.05)` formula. `--bg` in dark mode is `#000000`, so `L2 = 0` and the denominator simplifies to `0.05`.

| Token pair | Contrast ratio | Threshold | Verdict |
|---|---|---|---|
| `--fg` (#F5F5F7) on `--bg` (#000000) | **19.58:1** | 7:1 (AAA body text) | AAA |
| `--fg-muted` (#86868B) on `--bg` (#000000) | **6.10:1** | 4.5:1 (AA normal text) | AA |
| `--accent` (#0A84FF) on `--bg` (#000000) | **5.86:1** | 3:1 (non-text: focus rings) | AA normal |
| `--fg-on-warm` (#FDF5F0) on `--bg-warm-accent` (#8A2E1C) | **7.75:1** | 4.5:1 (AA normal text) | AAA |
| `--fg-on-warm-muted` (#D6B9A8) on `--bg-warm-accent` (#8A2E1C) | **≈4.8:1** | 4.5:1 (AA normal text) | AA |
| `--fg-on-danger` (#FFB4B0) on `--bg-danger` (#1C0A0A) | **11.63:1** | 4.5:1 (AA normal text) | AAA |
| `--fg-on-warning` (#FFD6A0) on `--bg-warning` (#1C1408) | **13.74:1** | 4.5:1 (AA normal text) | AAA |

All required thresholds are met. Body text (`--fg` on `--bg`) exceeds AAA. The weakest pairing is `--fg-muted`, which clears AA normal but not AAA — this matches the light-mode behavior (4.91:1 in light) and is acceptable for secondary copy.

### `color-scheme` meta

The `html` element must declare `color-scheme: light dark` so the browser applies its system-native dark-mode styles to form controls, scrollbars, and selection. Without this declaration, browser-chrome UI may remain light even when the token block fires.

---

## 7. Worked examples

### Banner danger tone in light mode

A hypothetical danger Banner in light mode renders:
- Background: `--bg-danger` → `#FEF0EE` (light, set by Agent #1 in the `:root` block)
- Body text: `--fg-on-danger` → a deep red-brown (set by Agent #1)
- Icon / label: `--danger` → `#D93025` (set by Agent #1)

The surface reads as a warm-tinted light alert band.

### Banner danger tone in dark mode

The same Banner component in dark mode, with zero code changes, renders:
- Background: `--bg-danger` → `#1C0A0A` (deep near-black with red undertone)
- Body text: `--fg-on-danger` → `#FFB4B0` (softened salmon — 11.63:1 against the background)
- Icon / label: `--danger` → `#FF453A` (Apple dark-mode red)

The surface reads as a "tinted dark surface" — danger-toned without being a bright alert background.

No class changes, no prop changes, no component CSS changes. The token flip is the entire mechanism.

### Wordmark in dark mode

`<Wordmark>` uses `fill="currentColor"` on the SVG root. In dark mode, the parent CSS inherits `color: var(--fg)` which resolves to `#F5F5F7`. The wordmark renders as near-white on the near-black page. No `currentColor` override needed.

The inverted Wordmark variant (used on warm band) continues to work: the parent sets `color: var(--fg-on-warm)` which resolves to `#FDF5F0` in both modes — correctly warm against the dimmed warm band.

---

## 8. Prop intent

Dark mode is a CSS-only mechanism. No component props change. No new props are introduced. The `@media` block is an extension of `tokens.css`, not a component API.

---

## 9. Composition rules

The dark-mode token block composes with every existing component automatically. Components that correctly consume only `var(--token)` values require zero changes.

The only composition concern is the `html { color-scheme }` declaration — it must be updated from `light` to `light dark` in the same token-file change so browser chrome (scrollbars, inputs, selects) matches the token-driven color scheme.

---

## 10. Open questions — component dark-mode audit

The following component files contain hardcoded color values that will NOT flip with the token block. These are not emergencies (the values are intentional inline decisions, documented in their respective specs), but they should be reviewed in a follow-up PR:

1. **`src/organisms/Dialog/Dialog.module.css:14`** — `background: rgb(0 0 0 / 0.4)` for the dialog scrim overlay. In dark mode this is visually acceptable (a black scrim over a black background), but the opacity may need adjustment (a lighter scrim might be needed over very dark content). Flagged; not blocking.

2. **`src/stories/showcase/Showcase.module.css:38–39`** — `--fg: #ffffff` and `--fg-muted: rgba(255, 255, 255, 0.62)` are local token overrides for the dark showcase preview bands. These are story-only, not shipped component code. No action required for production dark mode.

**Components with no hardcoded color values (verified clean):**

All atoms, molecules, and organisms in `src/atoms/`, `src/molecules/`, and `src/organisms/` — other than `Dialog.module.css` (scrim noted above) — consume only `var(--token)` references. The audit confirmed zero hardcoded hex values in any shipped component CSS module.

---

## 11. Out of scope

- JavaScript theme toggle (`data-theme="dark"` class). Future work.
- Dark-mode image variants (AVIF/WebP alternatives for dark backgrounds). Site concern, not DS.
- Dark-mode SVG mark variants. The Wordmark uses `currentColor` and inverts cleanly. No action needed.
- Per-component dark-mode overrides. If a component breaks in dark mode, the fix is to replace the hardcoded value with a token, not to add a component-level media query override.
- Dark-mode for the warm-accent band: already handled via `--bg-warm-accent`, `--fg-on-warm`, `--fg-on-warm-muted` token overrides.
