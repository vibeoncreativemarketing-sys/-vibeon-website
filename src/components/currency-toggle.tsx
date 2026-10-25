"use client";

import { useCart } from "@/context/cart-context";

export function CurrencyToggle({ className = "" }: { className?: string }) {
  const { currency, setCurrency } = useCart();

  return (
    <div
      className={`inline-flex items-center rounded-full border border-white/10 bg-black/40 p-1 ${className}`}
      role="group"
      aria-label="Regional currency"
    >
      <button
        type="button"
        onClick={() => setCurrency("AMD")}
        className={`rounded-full px-4 py-2 text-xs font-semibold tracking-[0.16em] uppercase transition ${
          currency === "AMD"
            ? "bg-vibeon text-white"
            : "text-white/60 hover:text-white"
        }`}
      >
        Armenia ֏
      </button>
      <button
        type="button"
        onClick={() => setCurrency("USD")}
        className={`rounded-full px-4 py-2 text-xs font-semibold tracking-[0.16em] uppercase transition ${
          currency === "USD"
            ? "bg-vibeon text-white"
            : "text-white/60 hover:text-white"
        }`}
      >
        USA $
      </button>
    </div>
  );
}
