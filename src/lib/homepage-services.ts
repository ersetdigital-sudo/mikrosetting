import defaultServices from "@/content/homepage-services.json";

export type HomeServiceId = "mikrotik" | "olt" | "ruijie" | "access-point";

export interface HomeServiceConfig {
  id: HomeServiceId;
  badge: string;
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  features: [string, string, string, string];
}

interface SiteSettingRow {
  key: string;
  value: unknown;
  updated_at?: string;
}

const DEFAULT_HOMEPAGE_SERVICES = defaultServices as HomeServiceConfig[];
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://webwuckjwmjfcgmyreyx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "sb_publishable_CVTzHHOTG-39CKs9SevR8g_SK_SwR1K";
const HOMEPAGE_SERVICES_KEY = "homepage_services";

function publicHeaders(): HeadersInit {
  return {
    apikey: SUPABASE_PUBLISHABLE_KEY,
    Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
  };
}

function serviceHeaders(): HeadersInit {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };
}

function asText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asFeatures(value: unknown, fallback: [string, string, string, string]): [string, string, string, string] {
  const source = Array.isArray(value) ? value : [];
  return fallback.map((item, index) => asText(source[index]) || item) as [string, string, string, string];
}

function normalizeService(value: unknown, fallback: HomeServiceConfig): HomeServiceConfig {
  const raw = value && typeof value === "object" ? (value as Partial<HomeServiceConfig>) : {};
  return {
    id: fallback.id,
    badge: asText(raw.badge) || fallback.badge,
    image: asText(raw.image),
    imageAlt: asText(raw.imageAlt),
    title: asText(raw.title) || fallback.title,
    description: asText(raw.description) || fallback.description,
    features: asFeatures(raw.features, fallback.features),
  };
}

function normalizeServices(value: unknown): HomeServiceConfig[] {
  const raw = Array.isArray(value) ? value : [];
  return DEFAULT_HOMEPAGE_SERVICES.map((fallback, index) => normalizeService(raw[index], fallback));
}

export function validateHomepageServices(services: HomeServiceConfig[]): string | null {
  if (services.length !== DEFAULT_HOMEPAGE_SERVICES.length) {
    return "Jumlah card layanan tidak valid.";
  }

  for (const service of services) {
    if (!service.title) return `Judul layanan ${service.id} wajib diisi.`;
    if (service.title.length > 60) return `Judul layanan ${service.id} maksimal 60 karakter.`;
    if (!service.description) return `Deskripsi layanan ${service.id} wajib diisi.`;
    if (service.description.length > 180) return `Deskripsi layanan ${service.id} maksimal 180 karakter.`;
    if (service.badge.length > 20) return `Badge layanan ${service.id} maksimal 20 karakter.`;
    if (service.image && !service.image.startsWith("/")) {
      return `Path gambar layanan ${service.id} harus diawali /.`;
    }
    if (service.imageAlt.length > 140) return `Alt gambar layanan ${service.id} maksimal 140 karakter.`;
    if (service.features.length !== 4) return `Fitur layanan ${service.id} harus berjumlah 4.`;
    for (const [index, feature] of service.features.entries()) {
      if (!feature) return `Fitur ${index + 1} pada layanan ${service.id} wajib diisi.`;
      if (feature.length > 40) return `Fitur ${index + 1} pada layanan ${service.id} maksimal 40 karakter.`;
    }
  }

  return null;
}

async function readErrorText(res: Response): Promise<string> {
  try {
    const data = (await res.json()) as { message?: string; error?: string; details?: string; hint?: string };
    return [data.message, data.error, data.details, data.hint].filter(Boolean).join(" | ") || `${res.status} ${res.statusText}`;
  } catch {
    return `${res.status} ${res.statusText}`;
  }
}

function missingTableMessage(details: string): string {
  return `Tabel Supabase public.site_settings belum siap. Jalankan SQL di supabase/site-settings.sql. Detail: ${details}`;
}

function isMissingTable(details: string): boolean {
  return /site_settings|relation .* does not exist|could not find the table/i.test(details);
}

export async function getHomepageServices(): Promise<HomeServiceConfig[]> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/site_settings?select=value&key=eq.${encodeURIComponent(HOMEPAGE_SERVICES_KEY)}&limit=1`,
      { headers: publicHeaders(), cache: "no-store" }
    );

    if (!res.ok) {
      const details = await readErrorText(res);
      if (isMissingTable(details)) return DEFAULT_HOMEPAGE_SERVICES;
      return DEFAULT_HOMEPAGE_SERVICES;
    }

    const rows = (await res.json()) as SiteSettingRow[];
    return normalizeServices(rows[0]?.value);
  } catch {
    return DEFAULT_HOMEPAGE_SERVICES;
  }
}

export async function saveHomepageServices(input: unknown): Promise<HomeServiceConfig[]> {
  const services = normalizeServices(input);
  const error = validateHomepageServices(services);
  if (error) throw new Error(error);

  const res = await fetch(`${SUPABASE_URL}/rest/v1/site_settings?on_conflict=key`, {
    method: "POST",
    headers: {
      ...serviceHeaders(),
      Prefer: "resolution=merge-duplicates,return=representation",
    },
    body: JSON.stringify({
      key: HOMEPAGE_SERVICES_KEY,
      value: services,
      updated_at: new Date().toISOString(),
    }),
  });

  if (!res.ok) {
    const details = await readErrorText(res);
    if (isMissingTable(details)) throw new Error(missingTableMessage(details));
    throw new Error(`Supabase save gagal: ${details}`);
  }

  const rows = (await res.json()) as SiteSettingRow[];
  return normalizeServices(rows[0]?.value ?? services);
}
