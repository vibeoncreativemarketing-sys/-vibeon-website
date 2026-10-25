import { db } from "@/db";
import { orderItems, orders, packages } from "@/db/schema";
import { inArray } from "drizzle-orm";
import type { Currency } from "@/lib/types";

export const dynamic = "force-dynamic";

type ItemInput = { packageId: number; quantity: number };

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      customerName?: string;
      email?: string;
      phone?: string;
      company?: string;
      notes?: string;
      currency?: Currency;
      items?: ItemInput[];
    };

    const customerName = body.customerName?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const phone = body.phone?.trim() ?? "";
    const currency: Currency = body.currency === "USD" ? "USD" : "AMD";
    const items = Array.isArray(body.items) ? body.items : [];

    if (!customerName || !email || !phone) {
      return Response.json({ error: "Name, email and phone are required" }, { status: 400 });
    }
    if (items.length === 0) {
      return Response.json({ error: "Cart is empty" }, { status: 400 });
    }

    const ids = items.map((item) => Number(item.packageId)).filter((id) => Number.isFinite(id));
    const dbPackages = await db.select().from(packages).where(inArray(packages.id, ids));
    const byId = new Map(dbPackages.map((pkg) => [pkg.id, pkg]));

    let totalUsd = 0;
    let totalAmd = 0;
    const lines: { packageId: number; quantity: number; priceUsd: number; priceAmd: number }[] = [];

    for (const item of items) {
      const pkg = byId.get(Number(item.packageId));
      const quantity = Math.max(1, Math.min(20, Number(item.quantity) || 1));
      if (!pkg) {
        return Response.json({ error: "Unknown package in cart" }, { status: 400 });
      }
      totalUsd += pkg.priceUsd * quantity;
      totalAmd += pkg.priceAmd * quantity;
      lines.push({
        packageId: pkg.id,
        quantity,
        priceUsd: pkg.priceUsd,
        priceAmd: pkg.priceAmd,
      });
    }

    const [order] = await db
      .insert(orders)
      .values({
        customerName,
        email,
        phone,
        company: body.company?.trim() || null,
        currency,
        totalUsd,
        totalAmd,
        status: "pending",
        notes: body.notes?.trim() || null,
      })
      .returning();

    await db.insert(orderItems).values(
      lines.map((line) => ({
        orderId: order.id,
        packageId: line.packageId,
        quantity: line.quantity,
        priceUsd: line.priceUsd,
        priceAmd: line.priceAmd,
      })),
    );

    return Response.json({ id: order.id, totalUsd, totalAmd, currency });
  } catch {
    return Response.json({ error: "Unable to place order" }, { status: 500 });
  }
}
