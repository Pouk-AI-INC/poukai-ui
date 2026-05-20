import type { Story, StoryDefault } from "@ladle/react";
import { Banner } from "./Banner";
import { Button } from "../../atoms/Button/Button";

export default {
  title: "Components / Banner",
} satisfies StoryDefault;

/** InfoDefault — quiet, on-page register. No icon, no action.
 *  Verifies: role="status", --bg background, --hairline border, --fg text,
 *  --font-sans, --fs-body, --lh-body, --radius-2, --space-3/--space-4 padding. */
export const InfoDefault: Story = () => (
  <div style={{ background: "var(--bg)", padding: "var(--space-8) var(--space-4)" }}>
    <Banner tone="info">
      Your session will expire in 15 minutes. Save your work to avoid losing changes.
    </Banner>
  </div>
);

/** Warning — warm-accent surface, assertive live region, decorative left rule.
 *  Verifies: role="alert", --bg-warm-accent background, --fg-on-warm text,
 *  2px border-inline-start using --fg-on-warm-muted. */
export const Warning: Story = () => (
  <div style={{ background: "var(--bg)", padding: "var(--space-8) var(--space-4)" }}>
    <Banner tone="warning">
      Your API key expires in 3 days. Rotate it before the deadline to prevent service interruption.
    </Banner>
  </div>
);

/** Danger — same warm-accent register as warning, assertive live region.
 *  Verifies: role="alert", identical surface to warning, distinct semantic intent. */
export const Danger: Story = () => (
  <div style={{ background: "var(--bg)", padding: "var(--space-8) var(--space-4)" }}>
    <Banner tone="danger">
      Deployment failed. The build exited with code 1. Check the logs and redeploy.
    </Banner>
  </div>
);

/** Success — elevated surface, accent left rule, polite live region.
 *  Verifies: role="status", --bg-elevated background, 2px --accent border-inline-start,
 *  --hairline full border, --fg text. */
export const Success: Story = () => (
  <div style={{ background: "var(--bg)", padding: "var(--space-8) var(--space-4)" }}>
    <Banner tone="success">Deployment complete. Your changes are live at pouk.ai.</Banner>
  </div>
);

/** WithAction — info tone with a ghost Button in the action slot.
 *  Verifies: action slot renders end-aligned, focus order is body→action,
 *  Button variant="ghost" composes cleanly inside Banner. */
export const WithAction: Story = () => (
  <div style={{ background: "var(--bg)", padding: "var(--space-8) var(--space-4)" }}>
    <Banner
      tone="info"
      action={
        <Button variant="ghost" size="sm">
          Dismiss
        </Button>
      }
    >
      A new version of the design system is available. Update to get the latest components.
    </Banner>
  </div>
);

/** WithIcon — success tone with a leading SVG icon in the icon slot.
 *  Verifies: icon slot renders before body, icon is decorative (aria-hidden on SVG),
 *  icon aligns vertically with first line of body text. */
export const WithIcon: Story = () => (
  <div style={{ background: "var(--bg)", padding: "var(--space-8) var(--space-4)" }}>
    <Banner
      tone="success"
      icon={
        <svg
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      }
    >
      Your changes have been saved successfully.
    </Banner>
  </div>
);

/** AllTones — all four tones stacked for visual comparison.
 *  Design-matrix story. */
export const AllTones: Story = () => (
  <div
    style={{
      background: "var(--bg)",
      padding: "var(--space-8) var(--space-4)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-4)",
    }}
  >
    <Banner tone="info">Info — session will expire in 15 minutes.</Banner>
    <Banner tone="warning">Warning — API key expires in 3 days.</Banner>
    <Banner tone="danger">Danger — deployment failed. Check the logs.</Banner>
    <Banner tone="success">Success — deployment complete. Changes are live.</Banner>
  </div>
);

/** WithIconAndAction — full anatomy: icon + body + action. Warning tone.
 *  On warm tones (warning/danger), action elements must use --fg-on-warm for contrast.
 *  A plain <button> with explicit on-warm color is the correct pattern on warm surfaces.
 *  ghost Button uses --fg which does not meet 4.5:1 over --bg-warm-accent. */
export const WithIconAndAction: Story = () => (
  <div style={{ background: "var(--bg)", padding: "var(--space-8) var(--space-4)" }}>
    <Banner
      tone="warning"
      icon={
        <svg
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      }
      action={
        <button
          type="button"
          style={{
            background: "none",
            border: "none",
            color: "var(--fg-on-warm)",
            cursor: "pointer",
            fontFamily: "var(--font-sans)",
            fontSize: "var(--fs-meta)",
            padding: 0,
          }}
        >
          Rotate key
        </button>
      }
    >
      Your API key expires in 3 days. Rotate it before the deadline to prevent service interruption.
    </Banner>
  </div>
);
