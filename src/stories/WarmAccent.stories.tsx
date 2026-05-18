import type { CSSProperties } from "react";
import type { Story, StoryDefault } from "@ladle/react";

export default {
  title: "Showcase / Warm Accent Band",
} satisfies StoryDefault;

/* ---- Shared helpers ---------------------------------------------------- */

const monoSmall: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "var(--fs-micro)",
  color: "var(--fg-muted)",
};

/* ---- Swatch helper ------------------------------------------------------ */

interface SwatchProps {
  token: string;
  label: string;
  border?: boolean;
}

const Swatch = ({ token, label, border }: SwatchProps) => (
  <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
    <div
      style={{
        width: "2.5rem",
        height: "2.5rem",
        borderRadius: "var(--radius-2)",
        background: ("var(" + token + ")") as string,
        border: border ? "1px solid var(--hairline)" : undefined,
        flexShrink: 0,
      }}
    />
    <div>
      <p style={{ ...monoSmall, color: "var(--fg)", marginBottom: "0.125rem" }}>{token}</p>
      <p style={monoSmall}>{label}</p>
    </div>
  </div>
);

/* ---- Stories ------------------------------------------------------------ */

/**
 * Full-bleed editorial band composition showing warm accent token usage in
 * context: text stack + portrait placeholder. Demonstrates how
 * --bg-warm-accent, --fg-on-warm, and --fg-on-warm-muted work together.
 */
export const BandComposition: Story = () => (
  <div style={{ width: "100%" }}>
    <section
      style={{
        background: "var(--bg-warm-accent)",
        padding: "var(--space-16) var(--page-pad)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "var(--space-12)",
          alignItems: "center",
          maxWidth: "var(--content-max)",
          margin: "0 auto",
        }}
      >
        <div style={{ maxWidth: "40ch" }}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--fs-micro)",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              color: "var(--fg-on-warm-muted)",
              marginBottom: "var(--space-4)",
            }}
          >
            Founder
          </p>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.25rem, 1.5rem + 3.5vw, 4.25rem)",
              color: "var(--fg-on-warm)",
              lineHeight: 1.15,
              marginBottom: "var(--space-6)",
            }}
          >
            The decision to build pouk.ai was made by the mountain.
          </p>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1.5rem, 1rem + 1vw, 1.75rem)",
              color: "var(--fg-on-warm-muted)",
            }}
          >
            Arian Faurtosh — Founder, pouk.ai
          </p>
        </div>
        <div
          style={{
            width: "clamp(12rem, 20vw, 18rem)",
            aspectRatio: "3 / 4",
            background: "rgba(255,255,255,0.08)",
            borderRadius: "var(--radius-2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "var(--space-4)",
            flexShrink: 0,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--fs-meta)",
              color: "var(--fg-on-warm-muted)",
              textAlign: "center",
              lineHeight: 1.5,
            }}
          >
            Portrait asset / graded to #C0452C
          </p>
        </div>
      </div>
    </section>
    <div
      style={{
        background: "var(--bg)",
        padding: "var(--space-8) var(--page-pad)",
        borderTop: "1px solid var(--hairline)",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--fs-micro)",
          color: "var(--fg-muted)",
          letterSpacing: "0.04em",
        }}
      >
        Tokens: --bg-warm-accent · --fg-on-warm · --fg-on-warm-muted
      </p>
    </div>
  </div>
);

/**
 * Compact swatch + contrast reference card for the warm accent token tier.
 * Mirrors the pattern from Tokens.stories.tsx Colour story.
 */
export const TokenReference: Story = () => (
  <div style={{ padding: "var(--space-12) var(--space-8)", maxWidth: "var(--content-max)" }}>
    <h2
      style={{
        fontFamily: "var(--font-serif)",
        fontSize: "var(--fs-tagline-intimate)",
        color: "var(--fg)",
        marginBottom: "var(--space-8)",
      }}
    >
      Warm accent tokens
    </h2>
    <div
      style={{
        display: "grid",
        gap: "var(--space-4)",
        maxWidth: "32rem",
        marginBottom: "var(--space-8)",
      }}
    >
      <Swatch token="--bg-warm-accent" label="Editorial band background" />
      <Swatch
        token="--fg-on-warm"
        label="Primary text on warm band — warm-tinted near-white"
        border
      />
      <Swatch
        token="--fg-on-warm-muted"
        label="Supporting text on warm band — display/heading >= 24 px only"
        border
      />
    </div>
    <div
      style={{
        borderTop: "1px solid var(--hairline)",
        paddingTop: "var(--space-6)",
        marginBottom: "var(--space-6)",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--fs-micro)",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: "var(--fg-muted)",
          marginBottom: "var(--space-4)",
        }}
      >
        Contrast ratios (WCAG 2.1)
      </p>
      <div style={{ display: "grid", gap: "var(--space-2)" }}>
        <p
          style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-meta)", color: "var(--fg)" }}
        >
          fg-on-warm / bg-warm-accent — 4.72 : 1 AA
        </p>
        <p
          style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-meta)", color: "var(--fg)" }}
        >
          fg-on-warm-muted / bg-warm-accent — 3.91 : 1 AA-large (display/heading &gt;= 24px)
        </p>
      </div>
    </div>
    <div
      style={{
        borderTop: "1px solid var(--hairline)",
        paddingTop: "var(--space-6)",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--fs-micro)",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: "var(--fg-muted)",
          marginBottom: "var(--space-4)",
        }}
      >
        Restraint rules (from meta/brand.md)
      </p>
      <ul
        style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "var(--space-2)" }}
      >
        {[
          "NEVER use --bg-warm-accent as a button fill, icon tint, or inline accent.",
          "NEVER pair --fg-on-warm-muted with body-size text — AA-large ceiling only (>= 24 px).",
          "NEVER stack two warm-band sections back-to-back on the same page.",
          "NEVER change the hex value of --bg-warm-accent post-ship — portrait asset is graded to match.",
        ].map((rule) => (
          <li
            key={rule}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--fs-micro)",
              color: "var(--fg-muted)",
            }}
          >
            {rule}
          </li>
        ))}
      </ul>
    </div>
  </div>
);
