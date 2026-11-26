import type { ReactNode } from "react";

/**
 * Eyebrow + title + lead, using the home page's typography classes
 * (.eyebrow, .section-title, .lead).
 */
export default function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  align = "left",
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  lead?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const center = align === "center" ? "mx-auto items-center text-center" : "";
  return (
    <div className={`flex max-w-[720px] flex-col gap-5 ${center} ${className}`}>
      {eyebrow && <div className="eyebrow" data-reveal="0">{eyebrow.toUpperCase()}</div>}
      {title && (
        <h2 id={id} className="section-title section-title--balance text-fg [&_em]:text-brand [&_em]:not-italic" data-reveal="80">
          {title}
        </h2>
      )}
      {lead && <p className="lead lead--pretty" data-reveal="140">{lead}</p>}
    </div>
  );
}
