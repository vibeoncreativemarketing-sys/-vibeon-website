"use client";

import { useRouter } from "next/navigation";
import { CurrencyToggle } from "@/components/currency-toggle";
import { useCart } from "@/context/cart-context";
import { billingLabel, formatPrice } from "@/lib/format";
import type { PackageDTO } from "@/lib/types";

export function PackagesSection({ packages }: { packages: PackageDTO[] }) {
  const { currency, addItem } = useCart();
  const router = useRouter();

  return (
    <section id="packages" className="relative bg-ink py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white">
                  Vibeon
                </p>
                <div className="red-rule mt-2" />
              </div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                SMM Services
              </p>
            </div>
            <h2 className="mt-10 text-[clamp(2.4rem,6vw,4.6rem)] font-semibold uppercase leading-[0.92] tracking-tight text-white">
              SMM Services
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/60 md:text-base">
              Monthly packages designed around your content, strategy and growth
              needs. Prices are stored in our database in both USD and AMD — no
              live conversion.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 lg:items-end">
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/40">
              Regional currency
            </p>
            <CurrencyToggle />
          </div>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {packages.map((pkg) => {
            const price = currency === "USD" ? pkg.priceUsd : pkg.priceAmd;
            return (
              <article
                key={pkg.id}
                className={`package-card relative flex flex-col p-7 transition ${
                  pkg.highlighted ? "ring-1 ring-vibeon/70" : ""
                }`}
              >
                <div className="absolute inset-x-0 top-0 h-[2px] bg-vibeon" />
                {pkg.highlighted ? (
                  <p className="mb-4 text-[10px] uppercase tracking-[0.24em] text-vibeon">
                    Most requested
                  </p>
                ) : (
                  <div className="mb-4 h-[14px]" />
                )}
                <h3 className="text-2xl font-semibold uppercase tracking-[0.08em] text-white">
                  {pkg.name.replace(" Package", "")}
                </h3>
                <p className="mt-3 text-lg font-medium text-vibeon">
                  {formatPrice(price, currency)}{" "}
                  <span className="text-sm text-white/50">
                    / {billingLabel(pkg.billingCycle)}
                  </span>
                </p>
                <p className="mt-4 text-sm leading-relaxed text-white/55">{pkg.tagline}</p>
                <ul className="mt-6 flex-1 space-y-2 text-sm text-white/75">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/50" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => addItem(pkg)}
                    className="border border-white/15 px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition hover:border-white"
                  >
                    Add to cart
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      addItem(pkg);
                      router.push("/checkout");
                    }}
                    className="bg-vibeon px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-vibeon-dark"
                  >
                    Buy now
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
