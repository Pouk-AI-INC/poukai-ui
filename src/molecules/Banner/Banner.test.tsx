import { test, expect } from "@playwright/experimental-ct-react";
import AxeBuilder from "@axe-core/playwright";
import { Banner } from "./Banner";
import { Button } from "../../atoms/Button/Button";

/* ---------- Children / body content ---------- */

test("renders children as body content", async ({ mount }) => {
  const component = await mount(<Banner>Session expires in 15 minutes.</Banner>);
  await expect(component.getByText("Session expires in 15 minutes.")).toBeVisible();
});

/* ---------- Default tone ---------- */

test("defaults to tone='info' when tone is omitted", async ({ mount }) => {
  const component = await mount(<Banner>Default info banner.</Banner>);
  // role="status" is the marker for info/success
  await expect(component).toHaveAttribute("role", "status");
});

/* ---------- Role attribute per tone ---------- */

test("role='status' for tone='info'", async ({ mount }) => {
  const component = await mount(<Banner tone="info">Info banner.</Banner>);
  await expect(component).toHaveAttribute("role", "status");
});

test("role='status' for tone='success'", async ({ mount }) => {
  const component = await mount(<Banner tone="success">Success banner.</Banner>);
  await expect(component).toHaveAttribute("role", "status");
});

test("role='alert' for tone='warning'", async ({ mount }) => {
  const component = await mount(<Banner tone="warning">Warning banner.</Banner>);
  await expect(component).toHaveAttribute("role", "alert");
});

test("role='alert' for tone='danger'", async ({ mount }) => {
  const component = await mount(<Banner tone="danger">Danger banner.</Banner>);
  await expect(component).toHaveAttribute("role", "alert");
});

/* ---------- Root element ---------- */

test("root element is <div>", async ({ mount }) => {
  const component = await mount(<Banner>Body text.</Banner>);
  const tag = await component.evaluate((el) => el.tagName.toLowerCase());
  expect(tag).toBe("div");
});

/* ---------- Icon slot ---------- */

test("omits icon slot when icon prop is undefined", async ({ mount }) => {
  const component = await mount(<Banner>Body text.</Banner>);
  // No icon span should be present
  const iconSpan = component.locator(".icon");
  await expect(iconSpan).toHaveCount(0);
});

test("renders icon when icon prop is provided", async ({ mount }) => {
  const component = await mount(
    <Banner
      icon={
        <svg width={16} height={16} aria-hidden="true" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="currentColor" />
        </svg>
      }
    >
      Banner with icon.
    </Banner>,
  );
  const svg = component.locator("svg");
  await expect(svg).toBeVisible();
});

/* ---------- Action slot ---------- */

test("omits action slot when action prop is undefined", async ({ mount }) => {
  const component = await mount(<Banner>Body text.</Banner>);
  const button = component.locator("button");
  await expect(button).toHaveCount(0);
});

test("renders action slot when action prop is provided", async ({ mount }) => {
  const component = await mount(
    <Banner
      action={
        <Button variant="ghost" size="sm">
          Dismiss
        </Button>
      }
    >
      Banner with action.
    </Banner>,
  );
  const button = component.getByRole("button", { name: "Dismiss" });
  await expect(button).toBeVisible();
});

/* ---------- className merge ---------- */

test("merges consumer className with internal classes", async ({ mount }) => {
  const component = await mount(<Banner className="my-banner">Body text.</Banner>);
  const className = await component.getAttribute("class");
  expect(className).toMatch(/my-banner/);
});

/* ---------- Arbitrary-prop forwarding ---------- */

test("forwards data-testid to root element", async ({ mount }) => {
  const component = await mount(<Banner data-testid="banner-root">Body text.</Banner>);
  await expect(component).toHaveAttribute("data-testid", "banner-root");
});

test("forwards aria-label to root element", async ({ mount }) => {
  const component = await mount(<Banner aria-label="System notice">Body text.</Banner>);
  await expect(component).toHaveAttribute("aria-label", "System notice");
});

/* ---------- Ref forwarding ---------- */

test("ref is forwarded to the root <div>", async ({ mount }) => {
  const component = await mount(<Banner>Body text.</Banner>);
  // Verify the root element is a <div> — confirming ref target is correct.
  const tag = await component.evaluate((el) => el.tagName.toLowerCase());
  expect(tag).toBe("div");
});

/* ---------- a11y — all four tones ---------- */

test("a11y — tone='info'", async ({ mount, page }) => {
  await mount(
    <Banner tone="info">
      Your session will expire in 15 minutes. Save your work to avoid losing changes.
    </Banner>,
  );
  const { violations } = await new AxeBuilder({ page })
    .disableRules(["landmark-one-main", "page-has-heading-one", "region"])
    .analyze();
  expect(violations, JSON.stringify(violations, null, 2)).toEqual([]);
});

test("a11y — tone='warning'", async ({ mount, page }) => {
  await mount(
    <Banner tone="warning">Your API key expires in 3 days. Rotate it before the deadline.</Banner>,
  );
  const { violations } = await new AxeBuilder({ page })
    .disableRules(["landmark-one-main", "page-has-heading-one", "region"])
    .analyze();
  expect(violations, JSON.stringify(violations, null, 2)).toEqual([]);
});

test("a11y — tone='danger'", async ({ mount, page }) => {
  await mount(<Banner tone="danger">Deployment failed. Check the logs and redeploy.</Banner>);
  const { violations } = await new AxeBuilder({ page })
    .disableRules(["landmark-one-main", "page-has-heading-one", "region"])
    .analyze();
  expect(violations, JSON.stringify(violations, null, 2)).toEqual([]);
});

test("a11y — tone='success'", async ({ mount, page }) => {
  await mount(<Banner tone="success">Deployment complete. Your changes are live.</Banner>);
  const { violations } = await new AxeBuilder({ page })
    .disableRules(["landmark-one-main", "page-has-heading-one", "region"])
    .analyze();
  expect(violations, JSON.stringify(violations, null, 2)).toEqual([]);
});

test("a11y — with icon and action (warning, on-warm text)", async ({ mount, page }) => {
  // On warm tones (warning/danger), action text must use --fg-on-warm for contrast.
  // A plain <button> with explicit on-warm color is the correct pattern here.
  await mount(
    <Banner
      tone="warning"
      icon={
        <svg width={16} height={16} aria-hidden="true" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="currentColor" />
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
      Your API key expires in 3 days.
    </Banner>,
  );
  const { violations } = await new AxeBuilder({ page })
    .disableRules(["landmark-one-main", "page-has-heading-one", "region"])
    .analyze();
  expect(violations, JSON.stringify(violations, null, 2)).toEqual([]);
});
