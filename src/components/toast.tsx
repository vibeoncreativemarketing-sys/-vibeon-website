"use client";

import { useCart } from "@/context/cart-context";

export function Toast() {
  const { toast, dismissToast } = useCart();
  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[80]">
      <div className="flex items-center gap-4 rounded-sm border border-white/10 bg-[#111] px-5 py-3 shadow-[0_18px_50px_rgba(0,0,0,0.45)]">
        <span className="h-2 w-2 rounded-full bg-vibeon" />
        <p className="text-sm text-white">{toast.message}</p>
        <button
          type="button"
          onClick={dismissToast}
          className="text-xs uppercase tracking-[0.16em] text-white/40 hover:text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
}
