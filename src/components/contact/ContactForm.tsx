"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { CircleAlert, CircleCheck, LoaderCircle, Send, Tag } from "lucide-react";
import type { ContactForm as FormConfig } from "@/lib/content-types";
import { EMAIL, routes } from "@/lib/routes";
import Link from "next/link";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-xl border border-line-strong bg-bg px-4 py-3 font-[inherit] text-base text-fg placeholder:text-fg-subtle/70 outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/25";
const label = "font-mono text-[11px] tracking-[.14em] text-fg-subtle";

/**
 * Contact form. Posts to Formspree (same endpoint as the old site) with fetch,
 * so the visitor stays on the page. `?product=<name>` (see `contactFor()`)
 * pre-selects the quote topic and names the product in the subject.
 *
 * Email or phone: at least one is required (custom validity on the email field).
 */
export default function ContactForm({ config }: { config: FormConfig }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [product, setProduct] = useState("");
  const [reachMissing, setReachMissing] = useState(false);

  // Read ?product= on the client, so the page itself stays static.
  useEffect(() => {
    const name = (new URLSearchParams(window.location.search).get("product") ?? "").trim().slice(0, 80);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read of the URL after hydration
    if (name) setProduct(name);
  }, []);

  function checkReach(form: HTMLFormElement) {
    const email = form.elements.namedItem("email") as HTMLInputElement;
    const phone = form.elements.namedItem("phone") as HTMLInputElement;
    const ok = email.value.trim() !== "" || phone.value.trim() !== "";
    email.setCustomValidity(ok ? "" : "Please give an email or a phone number.");
    setReachMissing(!ok);
    return ok;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    checkReach(form);
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(config.endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      ref={formRef}
      id="contact-form"
      action={config.endpoint}
      method="POST"
      noValidate
      onSubmit={onSubmit}
      onInput={() => reachMissing && formRef.current && checkReach(formRef.current)}
      className="flex scroll-mt-28 flex-col gap-5 rounded-[24px] border border-line-strong bg-linear-to-b from-card to-card-deep p-[clamp(24px,3vw,40px)] shadow-[0_40px_100px_rgb(0_0_0/0.35)]"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="m-0 font-display text-2xl font-semibold tracking-[-0.015em] text-fg">Send us a message</h3>
        <span className="rounded-full border border-brand/40 bg-brand/10 px-3 py-1 font-mono text-[11px] tracking-[.1em] text-brand">
          REPLY WITHIN 1 BUSINESS DAY
        </span>
      </div>
      <p className="m-0 text-sm text-fg-subtle">Fields marked * are required.</p>

      <input type="hidden" name="_subject" value={product ? `Quote request: ${product}` : config.subject} />
      <input type="hidden" name="product" value={product} />
      {/* Honeypot for bots */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px]" />

      {status === "sent" && (
        <div role="status" className="flex gap-3 rounded-xl border border-brand/40 bg-brand/10 p-4 text-fg">
          <CircleCheck aria-hidden="true" className="size-5 shrink-0 text-brand" />
          <div>
            <strong className="font-semibold">Thank you, your message is sent.</strong>
            <p className="m-0 text-fg-muted">We will reply within one business day.</p>
          </div>
        </div>
      )}
      {status === "error" && (
        <div role="alert" className="flex gap-3 rounded-xl border border-accent/50 bg-accent/10 p-4 text-fg">
          <CircleAlert aria-hidden="true" className="size-5 shrink-0 text-accent" />
          <div>
            <strong className="font-semibold">Message not sent</strong>
            <p className="m-0 text-fg-muted">
              Something went wrong. Please try again, or email us at{" "}
              <a href={`mailto:${EMAIL}`} className="text-brand hover:text-accent-soft">{EMAIL}</a>.
            </p>
          </div>
        </div>
      )}

      {product && (
        <p role="status" className="m-0 flex items-center gap-2 rounded-xl border border-line-strong bg-white/[0.03] px-4 py-3 text-fg-muted">
          <Tag aria-hidden="true" className="size-4 text-brand" />
          You are asking about: <strong className="font-semibold text-fg">{product}</strong>
        </p>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className={label}>YOUR NAME *</span>
          <input name="name" type="text" required autoComplete="name" placeholder="Full name" className={field} />
        </label>
        <label className="flex flex-col gap-2">
          <span className={label}>ORGANISATION</span>
          <input name="company" type="text" autoComplete="organization" placeholder="Optional" className={field} />
        </label>
        <label className="flex flex-col gap-2">
          <span className={label}>EMAIL</span>
          <input name="email" type="email" autoComplete="email" placeholder="you@example.com" aria-describedby="contact-reach-hint" className={field} />
        </label>
        <label className="flex flex-col gap-2">
          <span className={label}>PHONE</span>
          <input name="phone" type="tel" autoComplete="tel" placeholder="+880 1XXX-XXXXXX" aria-describedby="contact-reach-hint" className={field} />
        </label>
      </div>
      <p id="contact-reach-hint" className={`-mt-2 m-0 text-sm ${reachMissing ? "text-accent" : "text-fg-subtle"}`}>
        Please give an email or a phone number. One of the two is enough.
      </p>

      <label className="flex flex-col gap-2">
        <span className={label}>WHAT IS IT ABOUT?</span>
        <select
          key={product ? "quote" : "default"}
          name="service_interest"
          defaultValue={product ? config.quoteTopic : config.topics[0]?.value}
          className={`${field} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 fill=%22none%22 stroke=%22%233dbe5a%22 stroke-width=%222%22 viewBox=%220 0 24 24%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:16px] bg-[right_16px_center] bg-no-repeat pr-11`}
        >
          {config.topics.map((t) => (
            <option key={t.value} value={t.value} className="bg-surface">
              {t.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-2">
        <span className={label}>YOUR MESSAGE *</span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder={
            product
              ? "How many do you need, where will they be used, and when do you need them?"
              : "What do you want to do, roughly how big is it, and when do you need it?"
          }
          className={`${field} resize-y`}
        />
      </label>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex cursor-pointer items-center gap-2 rounded-xl border-0 bg-accent px-6 py-3.5 font-[inherit] text-[15px] font-semibold text-[#1A0A02] transition-[background-color,box-shadow] hover:bg-[#FF7A3A] hover:shadow-[0_10px_36px_rgb(242_101_34/0.4)] disabled:cursor-wait disabled:opacity-70"
        >
          {status === "sending" ? (
            <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
          ) : (
            <Send aria-hidden="true" className="size-4" />
          )}
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        <p className="m-0 text-sm text-fg-subtle">
          We use your details only to reply to you. See our{" "}
          <Link href={routes.privacy} className="text-brand hover:text-accent-soft">Privacy Policy</Link>.
        </p>
      </div>
    </form>
  );
}
