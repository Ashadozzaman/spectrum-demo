import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Blocks from "@/components/blocks/Blocks";
import Section from "@/components/blocks/Section";
import { DetailCta, DetailHero, seoMetadata } from "@/components/detail/DetailParts";
import ContactForm from "@/components/contact/ContactForm";
import IconTile from "@/components/ui/IconTile";
import { getContactPage } from "@/lib/data";
import { getIcon } from "@/lib/icons";
import { EMAIL, PHONE, PHONE_HREF, WHATSAPP_HREF, routes } from "@/lib/routes";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getContactPage();
  return seoMetadata(seo, routes.contact);
}

export default async function ContactPage() {
  const { hero, reasons, office, form, sections, cta } = await getContactPage();

  return (
    <>
      <DetailHero hero={hero} title="Contact" trail={[]} />

      {/* Why are you writing? */}
      <section aria-label="Ways to reach us" className="bg-bg">
        <div className="shell grid grid-cols-1 gap-5 py-[clamp(48px,5vw,80px)] md:grid-cols-3">
          {reasons.map((r, i) => (
            <div key={r.title} className="h-full" data-reveal={i * 70}>
              <a
                href={r.href}
                className="group flex h-full flex-col gap-4 rounded-[20px] border border-line bg-linear-to-b from-card to-card-deep p-7 text-fg no-underline transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-line-strong hover:text-fg hover:shadow-[0_30px_60px_rgb(0_0_0/0.35)]"
              >
                <IconTile icon={getIcon(r.icon!)} />
                <h2 className="m-0 font-display text-xl leading-tight font-semibold tracking-[-0.015em]">{r.title}</h2>
                <p className="m-0 flex-1 text-base leading-relaxed text-fg-muted">{r.text}</p>
                <span className="inline-flex items-center gap-1.5 text-[15px] font-medium text-brand group-hover:text-accent-soft">
                  {r.more}
                  <span aria-hidden="true" className="mono">→</span>
                </span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Office details + form */}
      <Section id="message" eyebrow={office.eyebrow} title={office.title} lead={office.lead} alt>
        <div className="grid items-start gap-[clamp(32px,4vw,64px)] lg:grid-cols-[5fr_7fr]">
          <dl className="m-0 flex flex-col gap-px overflow-hidden rounded-2xl border border-line bg-line" data-reveal="0">
            <Detail icon={<MapPin />} label="Address">
              {office.address}
              <br />
              <a href={office.directions} target="_blank" rel="noopener" className="text-brand hover:text-accent-soft">
                Get directions<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </Detail>
            <Detail icon={<Mail />} label="Email">
              <a href={`mailto:${EMAIL}`} className="text-fg hover:text-brand">{EMAIL}</a>
            </Detail>
            <Detail icon={<Phone />} label="Phone and WhatsApp">
              <a href={PHONE_HREF} className="text-fg hover:text-brand">{PHONE}</a>
              <br />
              <a href={WHATSAPP_HREF} target="_blank" rel="noopener" className="text-brand hover:text-accent-soft">
                Chat on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </Detail>
            <Detail icon={<Clock />} label="Office hours">
              {office.hours}
            </Detail>
          </dl>

          <div data-reveal="80">
            <ContactForm config={form} />
          </div>
        </div>
      </Section>

      {/* Map */}
      <div className="border-t border-line bg-bg">
        <iframe
          src={office.map}
          title="Map showing the Spectrum office at Hasan Holdings, New Eskaton Road, Dhaka"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="block h-[420px] w-full border-0 opacity-90 [filter:grayscale(.35)_contrast(1.05)]"
        />
      </div>

      {/* What happens next · FAQ · certifications */}
      <Blocks blocks={sections} firstAlt={false} />

      <DetailCta cta={cta} fallback={{ title: "Call or message us.", text: "" }} />
    </>
  );
}

function Detail({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-4 bg-surface px-6 py-5">
      <span aria-hidden="true" className="mt-0.5 text-brand [&_svg]:size-5">{icon}</span>
      <div className="flex flex-col gap-1.5">
        <dt className="font-mono text-[11px] tracking-[.14em] text-fg-subtle">{label.toUpperCase()}</dt>
        <dd className="m-0 text-base leading-relaxed text-fg">{children}</dd>
      </div>
    </div>
  );
}
