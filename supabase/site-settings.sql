create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.site_settings enable row level security;

drop policy if exists "Public can read homepage services" on public.site_settings;
create policy "Public can read homepage services"
on public.site_settings
for select
using (key = 'homepage_services');

insert into public.site_settings (key, value)
values (
  'homepage_services',
  '[
    {
      "id": "mikrotik",
      "badge": "MikroTik",
      "image": "/images/jasa-setting-mikrotik-v2.png",
      "imageAlt": "Teknisi mengonfigurasi MikroTik di ruang server",
      "title": "Jasa Setting MikroTik",
      "description": "Konfigurasi MikroTik untuk berbagai kebutuhan jaringan Anda.",
      "features": ["PPPoE Server", "Load Balance", "VPN & Firewall", "VLAN & Routing"]
    },
    {
      "id": "olt",
      "badge": "Fiber",
      "image": "",
      "imageAlt": "",
      "title": "Jasa Setting OLT",
      "description": "Setting OLT untuk ISP, RT/RW Net, dan jaringan fiber optik.",
      "features": ["VSOL, OLT", "HSGQ OLT", "Global / Hioso", "Registrasi ONU/ONT"]
    },
    {
      "id": "ruijie",
      "badge": "Ruijie",
      "image": "",
      "imageAlt": "",
      "title": "Jasa Setting Ruijie",
      "description": "Konfigurasi Ruijie untuk jaringan yang stabil dan terkelola.",
      "features": ["Ruijie Gateway", "Ruijie Access Point", "Cloud Management", "Switch Managed"]
    },
    {
      "id": "access-point",
      "badge": "WiFi",
      "image": "",
      "imageAlt": "",
      "title": "Jasa Setting Access Point",
      "description": "Optimasi WiFi untuk Hotel, Kantor, Sekolah & area publik.",
      "features": ["Penempatan AP", "Optimasi Coverage", "SSID & VLAN", "Manajemen Bandwidth"]
    }
  ]'::jsonb
)
on conflict (key)
do update set
  value = excluded.value,
  updated_at = timezone('utc', now());
