// Kredensial admin — disimpan di Supabase (tabel public.site_settings, key "admin_credentials")
// supaya ganti password dari panel admin tersimpan permanen (aman dipakai di serverless/Vercel).
// Hanya diakses server-side dengan service role key.

import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://webwuckjwmjfcgmyreyx.supabase.co";
const SETTINGS_KEY = "admin_credentials";
const MIN_PASSWORD_LENGTH = 8;

interface StoredCredentials {
  salt: string;
  hash: string;
}

function serviceHeaders(): HeadersInit {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };
}

function hashPassword(password: string, salt: string): string {
  return scryptSync(password, salt, 64).toString("hex");
}

function isStoredCredentials(value: unknown): value is StoredCredentials {
  return (
    !!value &&
    typeof value === "object" &&
    typeof (value as StoredCredentials).salt === "string" &&
    typeof (value as StoredCredentials).hash === "string"
  );
}

async function getStoredCredentials(): Promise<StoredCredentials | null> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/site_settings?select=value&key=eq.${SETTINGS_KEY}&limit=1`,
      { headers: serviceHeaders(), cache: "no-store" }
    );
    if (!res.ok) return null;
    const rows = (await res.json()) as { value: unknown }[];
    const value = rows[0]?.value;
    return isStoredCredentials(value) ? value : null;
  } catch {
    return null;
  }
}

async function saveCredentials(credentials: StoredCredentials): Promise<void> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/site_settings?on_conflict=key`, {
    method: "POST",
    headers: { ...serviceHeaders(), Prefer: "resolution=merge-duplicates,return=representation" },
    body: JSON.stringify({
      key: SETTINGS_KEY,
      value: credentials,
      updated_at: new Date().toISOString(),
    }),
  });
  if (!res.ok) {
    throw new Error(`Gagal menyimpan password baru: ${res.status} ${await res.text()}`);
  }
}

function safeCompareHex(a: string, b: string): boolean {
  try {
    const bufA = Buffer.from(a, "hex");
    const bufB = Buffer.from(b, "hex");
    return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

/** Cek password login. Kalau belum pernah diganti lewat admin, fallback ke env ADMIN_PASSWORD. */
export async function verifyAdminPassword(password: string): Promise<boolean> {
  if (!password) return false;

  const stored = await getStoredCredentials();
  if (stored) {
    return safeCompareHex(hashPassword(password, stored.salt), stored.hash);
  }

  const fallback = process.env.ADMIN_PASSWORD ?? "mikrosetting2026";
  try {
    return timingSafeEqual(Buffer.from(password), Buffer.from(fallback));
  } catch {
    return false;
  }
}

export async function changeAdminPassword(currentPassword: string, newPassword: string): Promise<void> {
  const valid = await verifyAdminPassword(currentPassword);
  if (!valid) throw new Error("Password saat ini salah.");
  if (newPassword.length < MIN_PASSWORD_LENGTH) {
    throw new Error(`Password baru minimal ${MIN_PASSWORD_LENGTH} karakter.`);
  }
  if (newPassword === currentPassword) {
    throw new Error("Password baru harus berbeda dari password lama.");
  }

  const salt = randomBytes(16).toString("hex");
  const hash = hashPassword(newPassword, salt);
  await saveCredentials({ salt, hash });
}
