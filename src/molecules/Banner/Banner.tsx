import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import clsx from "clsx";
import styles from "./Banner.module.css";

export type BannerTone = "info" | "warning" | "danger" | "success";

export interface BannerProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * Visual register of the banner.
   * - `info` (default): quiet, page-background surface, hairline border, --fg text.
   * - `warning`: warm-accent surface, --fg-on-warm text. Assertive live region.
   * - `danger`: warm-accent surface, --fg-on-warm text. Assertive live region.
   * - `success`: elevated surface, accent left rule, --fg text. Polite live region.
   */
  tone?: BannerTone;
  /**
   * Optional leading icon slot. Consumer controls the icon — no auto-icon.
   * Pass an SVG with aria-hidden="true" for decorative icons.
   */
  icon?: ReactNode;
  /**
   * Optional trailing action slot. Typically a `<Button variant="ghost">`.
   * Receives natural focus order after the body content.
   */
  action?: ReactNode;
  /**
   * Required body content. Accepts ReactNode to support inline <strong>, <em>, <a>.
   */
  children: ReactNode;
}

/**
 * Banner — persistent inline notice molecule.
 *
 * Sits in document flow. No timing, no portal, no dismissal in v1.
 * Consumer controls mount/unmount for dismissal behavior.
 *
 * A11y:
 *   - role="status"  (aria-live="polite")  for info + success
 *   - role="alert"   (aria-live="assertive") for warning + danger
 */
export const Banner = forwardRef<HTMLDivElement, BannerProps>(function Banner(
  { tone = "info", icon, action, className, children, ...rest },
  ref,
) {
  const isAssertive = tone === "warning" || tone === "danger";

  return (
    <div
      ref={ref}
      role={isAssertive ? "alert" : "status"}
      className={clsx(styles.root, styles[tone], className)}
      {...rest}
    >
      {icon !== undefined && (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      )}
      <span className={styles.body}>{children}</span>
      {action !== undefined && <span className={styles.action}>{action}</span>}
    </div>
  );
});

Banner.displayName = "Banner";
