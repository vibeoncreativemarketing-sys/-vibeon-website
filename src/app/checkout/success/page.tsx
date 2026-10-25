import Link from "next/link";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { eq } from "drizzle-orm";
import { formatPrice, orderCode } from "@/lib/format";
import type { Currency } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const params = await searchParams;
  const orderId = Number(params.order);
  const valid = Number.isFinite(orderId) && orderId > 0;

  const [order] = valid
    ? await db.select().from(orders).where(eq(orders.id, orderId))
    : [];

  return (
    <main className="min-h-screen bg-ink pt-28 pb-20">
      <div className="mx-auto max-w-2xl px-5">
        <p className="text-[11px] uppercase tracking-[0.22em] text-vibeon">Confirmed</p>
        <h1 className="mt-4 font-display text-5xl leading-tight text-white md:text-6xl">
          Thank you.
        </h1>
        <p className="mt-5 text-white/60">
          Your booking request is in. A producer from VIBEON CREATIVE will follow up
          to confirm scope, kickoff and content calendar.
        </p>
        {order ? (
          <div className="mt-10 border border-white/10 bg-panel p-6">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">
              Order {orderCode(order.id)}
            </p>
            <p className="mt-3 text-2xl font-semibold text-white">{order.customerName}</p>
            <p className="mt-2 text-sm text-white/55">{order.email}</p>
            <p className="mt-6 text-vibeon">
              {formatPrice(
                order.currency === "USD" ? order.totalUsd : order.totalAmd,
                order.currency as Currency,
              )}
            </p>
          </div>
        ) : null}
        <Link
          href="/"
          className="mt-10 inline-flex border border-white/15 px-6 py-3 text-xs uppercase tracking-[0.18em] text-white"
        >
          Back to studio
        </Link>
      </div>
    </main>
  );
}
