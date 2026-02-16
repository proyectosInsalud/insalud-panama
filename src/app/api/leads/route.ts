import { NextRequest, NextResponse } from "next/server";
import { formLeadsSchema } from "@/schemas";

export async function POST(req: NextRequest) {
  try {
    const scriptUrl = process.env.GOOGLE_SHEETS_WEBAPP_URL;
    if (!scriptUrl) {
      return NextResponse.json(
        { ok: false, error: "GOOGLE_SHEETS_WEBAPP_URL no configurada" },
        { status: 500 }
      );
    }

    const body = await req.json();

    // Honeypot: si viene lleno, respondemos como éxito sin procesar
    if (body?.website) {
      return NextResponse.json({ ok: true, skipped: true });
    }

    const parseResult = formLeadsSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { ok: false, error: "Datos inválidos", issues: parseResult.error.issues },
        { status: 400 }
      );
    }

    const data = parseResult.data;

    // Metadata
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    const payload = {
      ...data,
      ip,
      userAgent,
    };

    // Opcional: Cloudflare Turnstile (si las env están)
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret) {
      const token = body["cf-turnstile-response"];
      if (!token) {
        return NextResponse.json(
          { ok: false, error: "Falta token de Turnstile" },
          { status: 400 }
        );
      }

      const verify = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `secret=${encodeURIComponent(turnstileSecret)}&response=${encodeURIComponent(
            token
          )}`,
        }
      );

      const verifyJson = await verify.json().catch(() => ({} as any));
      if (!verify.ok || !verifyJson.success) {
        return NextResponse.json(
          { ok: false, error: "Turnstile no válido" },
          { status: 400 }
        );
      }
    }

    const res = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "Error en Apps Script");
      const shortText = errText.slice(0, 300);
      return NextResponse.json(
        { ok: false, error: `Apps Script respondió ${res.status}: ${shortText}` },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, message: "Lead registrado" });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: "Error inesperado" },
      { status: 500 }
    );
  }
}
