export async function POST(request: Request) {
  try {
    const body = await request.json();
    const resp = await fetch("https://formspree.io/f/mldrnwbb", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      // always revalidate to avoid caching
      cache: "no-store",
    });

    if (!resp.ok) {
      return new Response(JSON.stringify({ success: false }), { status: 502 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ success: false }), { status: 400 });
  }
}
