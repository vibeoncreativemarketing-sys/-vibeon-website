import { getPackages } from "@/lib/packages";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const packages = await getPackages();
    return Response.json({ packages });
  } catch {
    return Response.json({ error: "Unable to load packages" }, { status: 500 });
  }
}
