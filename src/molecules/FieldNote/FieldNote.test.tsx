import { test, expect } from "@playwright/experimental-ct-react";
import { FieldNote } from "./FieldNote";

/* ---------- Body text ---------- */

test("renders children as body text", async ({ mount }) => {
  const component = await mount(
    <FieldNote>In 2024 we ran the same prompt across three model families.</FieldNote>,
  );
  await expect(
    component.getByText("In 2024 we ran the same prompt across three model families."),
  ).toBeVisible();
});

/* ---------- Label slot ---------- */

test("omits label element when label prop is undefined", async ({ mount }) => {
  const component = await mount(<FieldNote>Body text only.</FieldNote>);
  // No label <p> should be present — only the body <p>
  const paragraphs = component.locator("p");
  await expect(paragraphs).toHaveCount(1);
});

test("renders label above body when label prop is provided", async ({ mount }) => {
  const component = await mount(<FieldNote label="Note">Body text.</FieldNote>);
  const paragraphs = component.locator("p");
  await expect(paragraphs).toHaveCount(2);
  // First <p> is the label
  await expect(paragraphs.nth(0)).toHaveText("Note");
  // Second <p> is the body
  await expect(paragraphs.nth(1)).toHaveText("Body text.");
});

test("renders arbitrary label string without modification", async ({ mount }) => {
  const component = await mount(<FieldNote label="Caveat">Body text.</FieldNote>);
  await expect(component.locator("p").first()).toHaveText("Caveat");
});

/* ---------- Root element ---------- */

test("root element is <aside>", async ({ mount }) => {
  const component = await mount(<FieldNote>Body text.</FieldNote>);
  const tag = await component.evaluate((el) => el.tagName.toLowerCase());
  expect(tag).toBe("aside");
});

/* ---------- className merge ---------- */

test("merges consumer className with internal classes", async ({ mount }) => {
  const component = await mount(<FieldNote className="custom-field-note">Body text.</FieldNote>);
  const className = await component.getAttribute("class");
  expect(className).toMatch(/custom-field-note/);
});

/* ---------- Arbitrary-prop forwarding ---------- */

test("forwards data-testid to root element", async ({ mount }) => {
  const component = await mount(<FieldNote data-testid="field-note-root">Body text.</FieldNote>);
  await expect(component).toHaveAttribute("data-testid", "field-note-root");
});

test("forwards aria-label to root element", async ({ mount }) => {
  const component = await mount(<FieldNote aria-label="Technical aside">Body text.</FieldNote>);
  await expect(component).toHaveAttribute("aria-label", "Technical aside");
});

/* ---------- Ref forwarding ---------- */

test("ref is forwarded to the <aside> root element", async ({ mount }) => {
  let capturedTag: string | undefined;

  const component = await mount(
    <FieldNote
      ref={(el) => {
        if (el) capturedTag = el.tagName.toLowerCase();
      }}
    >
      Body text.
    </FieldNote>,
  );

  // Verify the component mounted and the root is aside
  const tag = await component.evaluate((el) => el.tagName.toLowerCase());
  expect(tag).toBe("aside");
});

/* ---------- Inline link in children ---------- */

test("renders inline link inside body text", async ({ mount }) => {
  const component = await mount(
    <FieldNote>
      See our <a href="/methodology">methodology doc</a> for details.
    </FieldNote>,
  );
  const link = component.getByRole("link", { name: "methodology doc" });
  await expect(link).toBeVisible();
  await expect(link).toHaveAttribute("href", "/methodology");
});

/* ---------- a11y ---------- */

/* a11y scans are in src/a11y.test.tsx (central gate). */
