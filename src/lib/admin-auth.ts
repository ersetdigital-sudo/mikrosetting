import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "ms_admin";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 hari

function getSecret(): string {
  return (
    process.env.ADMIN_SECRET ??
    `${process.env.ADMIN_PASSWORD ?? "mikrosetting2026"}|${process.env.SUPABASE_SERVICE_ROLE_KEY ?? ""}`
  );
}

export function checkPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? "mikrosetting2026";
  try {
    return timingSafeEqual(Buffer.from(password), Buffer.from(expected));
  } catch {
    return false;
  }
}

function sign(value: string): string {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function createSessionToken(): string {
  const exp = String(Date.now() + MAX_AGE * 1000);
  return `${exp}.${sign(exp)}`;
}

export function verifySessionToken(token: string | null | undefined): boolean {
  if (!token) return false;
  const dot = token.lastIndexOf(".");
  if (dot < 0) return false;
  const exp = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!/^\d+$/.test(exp) || Number(exp) < Date.now()) return false;
  try {
    return timingSafeEqual(Buffer.from(sig), Buffer.from(sign(exp)));
  } catch {
    return false;
  }
}

export async function isAdminAuthed(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(COOKIE_NAME)?.value);
}

/** Panggil di awal halaman admin — lempar ke /admin/login kalau belum login */
export async function requireAdmin(): Promise<void> {
  if (!(await isAdminAuthed())) redirect("/admin/login");
}

export { COOKIE_NAME, MAX_AGE };
