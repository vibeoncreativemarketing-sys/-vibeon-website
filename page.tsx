"use client";

import Link from "next/link";
import { CurrencyToggle } from "@/components/currency-toggle";
import { useCart } from "@/context/cart-context";
import { billingLabel, formatPrice } from "@/lib/format";

export default function CartPage() {
  const { items, currency, totalUsd, totalAmd, setQuantity, removeItem, hydrated } = useCart();
  const total = currency === "USD" ? totalUsd : totalAmd;

  return (
    <main className="min-h-screen bg-ink pt-28 pb-20">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">Studio store</p>
            <h1 className="mt-3 text-4xl font-semibold uppercase tracking-tight text-white md:text-5xl">
              Cart
            </h1>
          </div>
          <CurrencyToggle />
        </div>

        {!hydrated ? (
          <p className="mt-16 text-white/50">Loading cart…</p>
        ) : items.length === 0 ? (
          <div className="mt-16 border border-white/10 bg-panel p-10">
            <p className="text-lg text-white">Your cart is empty.</p>
            <p className="mt-2 text-sm text-white/50">
              Choose a retainer or event package to get started.
            </p>
            <Link
              href="/#packages"
              className="mt-8 inline-flex bg-vibeon px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white"
            >
              Browse packages
            </Link>
          </div>
        ) : (
          <div className="mt-12 space-y-4">
            {items.map((item) => {
              const unit = currency === "USD" ? item.priceUsd : item.priceAmd;
              return (
                <article
                  key={item.packageId}
                  className="flex flex-col gap-5 border border-white/10 bg-panel p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h2 className="text-lg font-semibold uppercase tracking-wide text-white">
                      {item.name}
                    </h2>
                    <p className="mt-1 text-sm text-white/50">
                      {formatPrice(unit, currency)} / {billingLabel(item.billingCycle)}
                    </p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center border border-white/15">
                      <button
                        type="button"
                        className="px-3 py-2 text-white/70"
                        onClick={() => setQuantity(item.packageId, item.quantity - 1)}
                      >
                        −
                      </button>
                      <span className="min-w-8 text-center text-sm">{item.quantity}</span>
                      <button
                        type="button"
                        className="px-3 py-2 text-white/70"
                        onClick={() => setQuantity(item.packageId, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <p className="min-w-28 text-right font-medium text-vibeon">
                      {formatPrice(unit * item.quantity, currency)}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeItem(item.packageId)}
                      className="text-[11px] uppercase tracking-[0.16em] text-white/40 hover:text-white"
                    >
                      Remove
                    </button>
                  </div>
                </article>
              );
            })}

            <div className="flex flex-col items-start justify-between gap-6 border border-white/10 bg-panel-2 p-6 sm:flex-row sm:items-center">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">Total</p>
                <p className="mt-1 text-3xl font-semibold text-white">
                  {formatPrice(total, currency)}
                </p>
                <p className="mt-1 text-xs text-white/40">
                  Hardcoded {currency} pricing from the VIBEON database.
                </p>
              </div>
              <Link
                href="/checkout"
                className="bg-vibeon px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white hover:bg-vibeon-dark"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
