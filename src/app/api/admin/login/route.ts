import { NextResponse } from "next/server";
import { createSessionToken, COOKIE_NAME, MAX_AGE } from "@/lib/admin-auth";
import { verifyAdminPassword } from "@/lib/admin-credentials";

export async function POST(request: Request) {
  let password = "";
  try {
    const body = await request.json();
    password = String(body?.password ?? "");
  } catch {
    password = "";
  }

  if (!password || !(await verifyAdminPassword(password))) {
    return NextResponse.json({ ok: false, error: "Password salah." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    // Secure hanya kalau request-nya HTTPS (produksi), supaya testing via HTTP localhost tetap jalan
    secure: request.url.startsWith("https://"),
    path: "/",
    maxAge: MAX_AGE,
  });
  return res;
}
