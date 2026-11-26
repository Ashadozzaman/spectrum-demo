import { CalendarCheck } from "lucide-react";
import { Rich } from "@/components/blocks/RichText";
import type { LegalBody, LegalPage } from "@/lib/content-types";

/**
 * Body of a legal page (privacy policy, terms): a sticky "On this page" list
 * on the left and the numbered sections on the right, in the home design.
 */
export default function LegalDocument({ page }: { page: LegalPage }) {
  return (
    <section className="bg-bg py-[clamp(64px,8vw,120px)]">
      <div className="shell grid items-start gap-[clamp(32px,5vw,72px)] lg:grid-cols-[280px_1fr]">
        <nav aria-label="On this page" className="lg:sticky lg:top-28">
          <div className="rounded-[20px] border border-line bg-linear-to-b from-card to-card-deep p-5">
            <p className="m-0 mb-3 font-mono text-[11px] tracking-[.16em] text-fg-subtle">ON THIS PAGE</p>
            <ol className="m-0 flex list-none flex-col gap-0.5 p-0">
              {page.sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}
                    className="flex gap-3 rounded-lg px-2 py-1.5 text-[14px] text-fg-muted transition-colors hover:bg-white/5 hover:text-fg">
                    <span className="font-mono text-[12px] leading-[1.6] text-brand">{String(i + 1).padStart(2, "0")}</span>
                    <span>{s.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <article className="min-w-0 max-w-[780px]">
          <h2 className="section-title m-0">{page.title}</h2>
          <p className="m-0 mt-4 inline-flex items-center gap-2 font-mono text-[12px] tracking-[.12em] text-fg-subtle">
            <CalendarCheck size={14} aria-hidden="true" className="text-brand" />
            LAST UPDATED {page.updated.toUpperCase()}
          </p>
          {page.intro.map((p, i) => (
            <p key={i} className="m-0 mt-6 text-[18px] leading-[1.7] text-pretty text-fg-muted">
              <Rich text={p} />
            </p>
          ))}

          <div className="mt-12 flex flex-col">
            {page.sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-28 border-t border-line py-10">
                <h3 className="m-0 flex items-baseline gap-4 font-display text-[clamp(22px,2.2vw,28px)] font-semibold tracking-[-0.02em] text-fg">
                  <span className="font-mono text-[14px] font-normal text-brand">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </h3>
                <div className="mt-5 flex flex-col gap-4">
                  {s.body.map((b, j) => <BodyPart key={j} part={b} />)}
                </div>
              </section>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

function BodyPart({ part }: { part: LegalBody }) {
  if (typeof part === "string") {
    return (
      <p className="m-0 text-[16px] leading-[1.75] text-pretty text-fg-muted">
        <Rich text={part} />
      </p>
    );
  }
  if ("heading" in part) {
    return <h4 className="m-0 mt-2 font-display text-[18px] font-semibold text-fg">{part.heading}</h4>;
  }
  return (
    <ul className="m-0 flex list-none flex-col gap-3 p-0">
      {part.list.map((item, i) => (
        <li key={i} className="flex gap-3 text-[16px] leading-[1.7] text-fg-muted">
          <span aria-hidden="true" className="mt-[11px] size-1.5 shrink-0 rounded-full bg-brand" />
          <span><Rich text={item} /></span>
        </li>
      ))}
    </ul>
  );
}
