import { db } from "@/db";
import { contacts } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      phone?: string;
      company?: string;
      message?: string;
    };

    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const message = body.message?.trim() ?? "";

    if (!name || !email || !message) {
      return Response.json(
        { error: "Name, email and message are required" },
        { status: 400 },
      );
    }

    const [row] = await db
      .insert(contacts)
      .values({
        name,
        email,
        phone: body.phone?.trim() || null,
        company: body.company?.trim() || null,
        message,
      })
      .returning();

    return Response.json({ ok: true, id: row.id });
  } catch {
    return Response.json({ error: "Unable to send message" }, { status: 500 });
  }
}
