import type { Currency } from "@/lib/types";

export function formatPrice(amount: number, currency: Currency): string {
  if (currency === "USD") {
    return `$${amount.toLocaleString("en-US")}`;
  }
  return `${amount.toLocaleString("en-US")} AMD`;
}

export function formatPriceCompact(amount: number, currency: Currency): string {
  if (currency === "USD") {
    return `$${amount.toLocaleString("en-US")}`;
  }
  return `֏ ${amount.toLocaleString("en-US")}`;
}

export function billingLabel(cycle: string): string {
  if (cycle === "event") return "per event";
  if (cycle === "month") return "month";
  return cycle;
}

export function orderCode(id: number): string {
  return `VBN-${String(id).padStart(4, "0")}`;
}
