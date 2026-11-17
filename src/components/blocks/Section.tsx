import type { ReactNode } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { Paragraphs, Rich } from "./RichText";

/**
 * One band of a detail page. `alt` uses the home services band (darker, dotted
 * background) so consecutive sections alternate like the home page.
 */
export default function Section({
  id,
  eyebrow,
  title,
  lead,
  after,
  alt = false,
  heading = true,
  split = false,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  lead?: string;
  after?: string[];
  alt?: boolean;
  /** false when the block renders its own heading (e.g. feature). */
  heading?: boolean;
  /** Heading in a left column, content on the right (large screens). For text-heavy blocks. */
  split?: boolean;
  children: ReactNode;
}) {
  const headingId = id ? `${id}-h` : undefined;
  const head = heading && (title || eyebrow) && (
    <SectionHeading
      id={headingId}
      eyebrow={eyebrow}
      title={title ? <Rich text={title} /> : undefined}
      lead={lead}
      className={split ? "mb-10 lg:sticky lg:top-28 lg:mb-0 lg:[&_.section-title]:text-[clamp(30px,2.8vw,44px)]" : "mb-[clamp(32px,3.5vw,56px)]"}
    />
  );
  const content = (
    <>
      {children}
      {after && <Paragraphs items={after} className="mt-10" />}
    </>
  );
  const body = split && head ? (
    <div className="grid items-start gap-x-[clamp(40px,5vw,96px)] lg:grid-cols-[5fr_7fr]">
      {head}
      <div>{content}</div>
    </div>
  ) : (
    <>
      {head}
      {content}
    </>
  );

  return alt ? (
    <section id={id} aria-labelledby={heading && title ? headingId : undefined} className="services scroll-mt-28">
      <div className="services__dots" aria-hidden="true" />
      <div className="services__inner py-[clamp(64px,7vw,112px)]">{body}</div>
    </section>
  ) : (
    <section
      id={id}
      aria-labelledby={heading && title ? headingId : undefined}
      className="scroll-mt-28 border-t border-line bg-bg"
    >
      <div className="shell py-[clamp(64px,7vw,112px)]">{body}</div>
    </section>
  );
}
