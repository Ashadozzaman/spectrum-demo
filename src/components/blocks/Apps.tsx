/* eslint-disable @next/next/no-img-element */
import { Star } from "lucide-react";
import type { AppInfo } from "@/lib/content-types";
import ButtonLink from "@/components/ui/ButtonLink";
import { Rich } from "./RichText";

function StoreButtons({ stores }: { stores?: AppInfo["stores"] }) {
  if (!stores) return null;
  const cls =
    "inline-flex items-center gap-2 rounded-xl border border-line-strong bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-fg transition-colors hover:border-brand hover:bg-brand/10 hover:text-fg";
  return (
    <>
      {stores.google && (
        <a href={stores.google} target="_blank" rel="noopener" className={cls}>
          Get it on Google Play
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      )}
      {stores.apple && (
        <a href={stores.apple} target="_blank" rel="noopener" className={cls}>
          Download on the App Store
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      )}
    </>
  );
}

function AppHead({ app }: { app: AppInfo }) {
  return (
    <div className="flex items-center gap-4">
      <img src={app.icon} alt="" width="64" height="64" className="size-16 shrink-0 rounded-[16px] border border-line" />
      <div className="flex flex-col gap-1">
        <h3 className="m-0 font-display text-xl leading-tight font-semibold text-fg">{app.name}</h3>
        <p className="m-0 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-fg-subtle">
          <span>{app.platforms}</span>
          {app.downloads && <span>· {app.downloads}</span>}
          {app.rating && (
            <span className="inline-flex items-center gap-1">
              · <Star aria-hidden="true" className="size-3.5 fill-brand text-brand" />
              {app.rating}
            </span>
          )}
          {app.version && <span>· {app.version}</span>}
        </p>
      </div>
    </div>
  );
}

/** One app in a grid (mobile apps page). */
export function AppCard({ app }: { app: AppInfo }) {
  return (
    <article className="flex h-full flex-col gap-5 rounded-[20px] border border-line bg-linear-to-b from-card to-card-deep p-7">
      <AppHead app={app} />
      {app.text && (
        <p className="m-0 text-[15px] leading-relaxed text-pretty text-fg-muted">
          <Rich text={app.text} />
        </p>
      )}
      <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-line pt-5">
        <StoreButtons stores={app.stores} />
        {app.more && <ButtonLink href={app.more.href} label={app.more.label} variant="text" />}
      </div>
    </article>
  );
}

/** One app with its screenshots (case studies, Upokari). */
export function AppShowcase({ app }: { app: AppInfo }) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-6" data-reveal="0">
        <AppHead app={app} />
        <div className="flex flex-wrap gap-3">
          <StoreButtons stores={app.stores} />
        </div>
      </div>
      {app.text && (
        <p className="m-0 max-w-[760px] text-[17px] leading-[1.7] text-pretty text-fg-muted">
          <Rich text={app.text} />
        </p>
      )}
      {app.screenshots && (
        <ul className="m-0 -mx-1 flex list-none snap-x gap-5 overflow-x-auto p-1 pb-4">
          {app.screenshots.map((s, i) => (
            <li key={s.src} className="w-[min(70vw,220px)] shrink-0 snap-start" data-reveal={Math.min(i, 5) * 60}>
              <figure className="m-0 flex flex-col gap-3">
                <img
                  src={s.src}
                  alt={`${app.name} app screen: ${s.caption}`}
                  loading="lazy"
                  className="aspect-[341/720] w-full rounded-[22px] border border-line-strong bg-surface object-cover"
                />
                <figcaption className="text-sm leading-snug text-fg-muted">{s.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
