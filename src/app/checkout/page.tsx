"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { CurrencyToggle } from "@/components/currency-toggle";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/format";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, currency, totalUsd, totalAmd, clear, hydrated } = useCart();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");
  const total = currency === "USD" ? totalUsd : totalAmd;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (items.length === 0) return;
    setStatus("loading");
    setError("");
    const form = new FormData(event.currentTarget);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.get("customerName"),
          email: form.get("email"),
          phone: form.get("phone"),
          company: form.get("company"),
          notes: form.get("notes"),
          currency,
          items: items.map((item) => ({
            packageId: item.packageId,
            quantity: item.quantity,
          })),
        }),
      });
      const payload = (await res.json()) as { id?: number; error?: string };
      if (!res.ok || !payload.id) {
        throw new Error(payload.error || "Unable to place order");
      }
      clear();
      router.push(`/checkout/success?order=${payload.id}`);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (!hydrated) {
    return (
      <main className="min-h-screen bg-ink pt-28">
        <p className="px-5 text-white/50">Loading checkout…</p>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-ink pt-28 pb-20">
        <div className="mx-auto max-w-3xl px-5">
          <h1 className="text-4xl font-semibold uppercase text-white">Checkout</h1>
          <p className="mt-4 text-white/60">Your cart is empty.</p>
          <Link href="/#packages" className="mt-8 inline-flex bg-vibeon px-6 py-3 text-xs uppercase tracking-[0.18em]">
            Browse packages
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ink pt-28 pb-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[1fr_380px] lg:px-8">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">Secure booking</p>
          <h1 className="mt-3 text-4xl font-semibold uppercase tracking-tight text-white md:text-5xl">
            Checkout
          </h1>
          <form onSubmit={onSubmit} className="mt-10 space-y-4 bg-panel p-6 md:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field name="customerName" label="Full name" required />
              <Field name="email" label="Email" type="email" required />
              <Field name="phone" label="Phone" required />
              <Field name="company" label="Company" />
            </div>
            <label className="block">
              <span className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-white/45">
                Project notes
              </span>
              <textarea
                name="notes"
                rows={4}
                className="w-full border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none focus:border-vibeon"
              />
            </label>
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-vibeon px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white hover:bg-vibeon-dark disabled:opacity-60"
            >
              {status === "loading" ? "Placing order…" : "Place order"}
            </button>
            {status === "error" ? <p className="text-sm text-vibeon">{error}</p> : null}
          </form>
        </div>

        <aside className="h-fit border border-white/10 bg-panel p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">
              Order summary
            </h2>
            <CurrencyToggle />
          </div>
          <ul className="mt-6 space-y-4">
            {items.map((item) => {
              const unit = currency === "USD" ? item.priceUsd : item.priceAmd;
              return (
                <li key={item.packageId} className="flex justify-between gap-4 text-sm">
                  <span className="text-white/70">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="text-white">{formatPrice(unit * item.quantity, currency)}</span>
                </li>
              );
            })}
          </ul>
          <div className="mt-6 border-t border-white/10 pt-5">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.18em] text-white/45">Total</span>
              <span className="text-2xl font-semibold text-vibeon">
                {formatPrice(total, currency)}
              </span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-white/40">
              Prices are fixed database values in USD and AMD, not live currency
              conversion.
            </p>
          </div>
        </aside>
      </div>
    </main>
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
        className="w-full border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none focus:border-vibeon"
      />
    </label>
  );
}
