import { APP_URL } from "@/lib/site";

/**
 * The form posts here (same origin, as in the original draft) and the request is
 * forwarded to the main app, which builds the chart and returns `{ id }`.
 */
export async function POST(request: Request) {
  const body = await request.text();
  try {
    const upstream = await fetch(`${APP_URL}/api/quiz`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      cache: "no-store",
    });
    return new Response(await upstream.text(), {
      status: upstream.status,
      headers: { "Content-Type": upstream.headers.get("Content-Type") ?? "application/json" },
    });
  } catch {
    return Response.json({ error: "upstream_unreachable" }, { status: 502 });
  }
}
