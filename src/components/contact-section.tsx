"use client";

import { FormEvent, useState } from "react";

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company,
          message: data.message,
        }),
      });
      if (!res.ok) {
        const payload = (await res.json()) as { error?: string };
        throw new Error(payload.error || "Unable to send message");
      }
      setStatus("ok");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <section id="contact" className="bg-ink py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="font-display text-[clamp(3rem,8vw,6.4rem)] leading-[0.88] tracking-tight text-white">
              Let&apos;s work
              <br />
              together.
            </h2>
            <p className="mt-6 text-lg text-white/60">
              Your brand. Your story. Our strategy.
            </p>
            <div className="mt-12 space-y-3 text-sm text-white/70">
              <p className="text-lg font-semibold uppercase tracking-[0.16em] text-white">
                Vibeon
              </p>
              <p>Social Media · Branding · Content · Digital Marketing</p>
              <p>
                Instagram{" "}
                <a
                  href="https://www.instagram.com/vibeon_creative"
                  target="_blank"
                  rel="noreferrer"
                  className="text-vibeon hover:underline"
                >
                  @vibeon_creative
                </a>
              </p>
              <p>
                Phone{" "}
                <a href="tel:+37494918198" className="hover:text-white">
                  +374 94 918 198
                </a>
              </p>
              <p>Yerevan, Armenia · vibeoncreativemarketing.am</p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-4 bg-panel p-6 md:p-8">
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/45">
              Project inquiry
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field name="name" label="Name" required />
              <Field name="email" label="Email" type="email" required />
              <Field name="phone" label="Phone" />
              <Field name="company" label="Company" />
            </div>
            <label className="block">
              <span className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-white/45">
                Message
              </span>
              <textarea
                name="message"
                required
                rows={5}
                className="w-full border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-vibeon"
              />
            </label>
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-vibeon px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-vibeon-dark disabled:opacity-60"
            >
              {status === "loading" ? "Sending…" : "Send message"}
            </button>
            {status === "ok" ? (
              <p className="text-sm text-emerald-400">
                Received. We will get back to you shortly.
              </p>
            ) : null}
            {status === "error" ? <p className="text-sm text-vibeon">{error}</p> : null}
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  type = "text",
  required = false,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-white/45">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-vibeon"
      />
    </label>
  );
}
