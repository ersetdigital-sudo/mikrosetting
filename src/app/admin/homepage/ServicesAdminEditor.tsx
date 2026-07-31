"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { HomeServiceConfig } from "@/lib/homepage-services";

type Props = {
  initial: HomeServiceConfig[];
};

const SERVICE_LABELS: Record<HomeServiceConfig["id"], string> = {
  mikrotik: "Card 1 · MikroTik",
  olt: "Card 2 · OLT",
  ruijie: "Card 3 · Ruijie",
  "access-point": "Card 4 · Access Point",
};

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

async function uploadImageToCloudinary(file: File): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error(
      "Upload gambar belum dikonfigurasi. Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME dan NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET."
    );
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", "mikrosetting/homepage-services");

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData,
  });

  const data = (await res.json().catch(() => null)) as { secure_url?: string; error?: { message?: string } } | null;

  if (!res.ok || !data?.secure_url) {
    throw new Error(data?.error?.message ?? "Upload gambar gagal. Coba lagi.");
  }

  return data.secure_url;
}

export default function ServicesAdminEditor({ initial }: Props) {
  const router = useRouter();
  const [services, setServices] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(null);
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const [uploadError, setUploadError] = useState<Record<string, string | null>>({});

  const updateService = (index: number, patch: Partial<HomeServiceConfig>) => {
    setServices((current) => current.map((service, i) => (i === index ? { ...service, ...patch } : service)));
  };

  const updateFeature = (serviceIndex: number, featureIndex: number, value: string) => {
    setServices((current) =>
      current.map((service, i) => {
        if (i !== serviceIndex) return service;
        const features = [...service.features] as HomeServiceConfig["features"];
        features[featureIndex] = value;
        return { ...service, features };
      })
    );
  };

  const handleFileChange = async (serviceIndex: number, file: File | undefined) => {
    if (!file) return;
    const serviceId = services[serviceIndex].id;

    setUploadError((prev) => ({ ...prev, [serviceId]: null }));

    if (!file.type.startsWith("image/")) {
      setUploadError((prev) => ({ ...prev, [serviceId]: "File harus berupa gambar (JPG, PNG, atau WebP)." }));
      return;
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      setUploadError((prev) => ({ ...prev, [serviceId]: "Ukuran gambar maksimal 5MB." }));
      return;
    }

    setUploading((prev) => ({ ...prev, [serviceId]: true }));
    try {
      const url = await uploadImageToCloudinary(file);
      updateService(serviceIndex, { image: url });
    } catch (err) {
      setUploadError((prev) => ({ ...prev, [serviceId]: err instanceof Error ? err.message : "Upload gambar gagal." }));
    } finally {
      setUploading((prev) => ({ ...prev, [serviceId]: false }));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setNotice(null);

    const res = await fetch("/api/admin/homepage-services", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ services }),
    });

    const data = (await res.json().catch(() => null)) as
      | { ok: true; services: HomeServiceConfig[] }
      | { ok: false; error?: string }
      | null;

    setSaving(false);

    if (!res.ok || !data?.ok) {
      setNotice({ ok: false, text: data && "error" in data ? data.error ?? "Gagal menyimpan." : "Gagal menyimpan." });
      return;
    }

    setServices(data.services);
    setNotice({ ok: true, text: "Perubahan layanan homepage berhasil disimpan." });
    router.refresh();
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-[var(--blue)]">Homepage</p>
          <h1 className="font-head font-extrabold text-2xl text-[var(--navy)] mt-1">Edit Card Layanan</h1>
          <p className="text-sm text-slate-500 mt-1 max-w-3xl">
            Konten card bisa diubah dari sini tanpa mengubah layout. Data disimpan ke Supabase, dan gambar diupload langsung
            ke Cloudinary. Jumlah card tetap 4, masing-masing card wajib punya 4 fitur, dan area gambar/icon di homepage tetap
            memakai ukuran yang sama.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 hover:border-blue-300 hover:text-[var(--blue)] transition"
          >
            Lihat Homepage ↗
          </Link>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center rounded-xl bg-[var(--blue)] px-5 py-2.5 text-sm font-bold text-white hover:bg-[var(--navy-2)] transition disabled:opacity-50"
          >
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </div>

      {notice && (
        <div className={`mb-5 rounded-xl border px-4 py-3 text-sm font-semibold ${notice.ok ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-rose-200 bg-rose-50 text-rose-700"}`}>
          {notice.text}
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6">
          {services.map((service, serviceIndex) => (
            <section key={service.id} className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="border-b border-slate-100 px-5 sm:px-6 py-4 bg-slate-50/70">
                <h2 className="font-head font-extrabold text-lg text-[var(--navy)]">{SERVICE_LABELS[service.id]}</h2>
                <p className="text-xs text-slate-400 mt-1">Struktur card terkunci. Yang bisa diedit: badge, judul, deskripsi, gambar, alt, dan 4 poin fitur.</p>
              </div>

              <div className="p-5 sm:p-6 space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">Badge</label>
                    <input
                      value={service.badge}
                      onChange={(e) => updateService(serviceIndex, { badge: e.target.value })}
                      maxLength={20}
                      className="w-full h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-800 outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-[var(--blue)]/10 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">Judul</label>
                    <input
                      value={service.title}
                      onChange={(e) => updateService(serviceIndex, { title: e.target.value })}
                      maxLength={60}
                      className="w-full h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-800 outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-[var(--blue)]/10 transition"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between gap-3 mb-1.5">
                    <label className="block text-xs font-bold text-slate-500">Deskripsi</label>
                    <span className="text-[11px] font-bold text-slate-400">{service.description.length}/180</span>
                  </div>
                  <textarea
                    value={service.description}
                    onChange={(e) => updateService(serviceIndex, { description: e.target.value })}
                    maxLength={180}
                    rows={3}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-[var(--blue)]/10 resize-y transition"
                  />
                </div>

                <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5">Gambar</label>
                      <div className="flex flex-wrap items-center gap-3">
                        <label
                          htmlFor={`upload-${service.id}`}
                          className={`inline-flex items-center rounded-xl px-4 py-2.5 text-sm font-bold transition cursor-pointer ${
                            uploading[service.id]
                              ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                              : "bg-[var(--blue)] text-white hover:bg-[var(--navy-2)]"
                          }`}
                        >
                          {uploading[service.id] ? "Mengunggah..." : "Upload Gambar"}
                        </label>
                        <input
                          id={`upload-${service.id}`}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          disabled={uploading[service.id]}
                          onChange={(e) => {
                            void handleFileChange(serviceIndex, e.target.files?.[0]);
                            e.target.value = "";
                          }}
                        />
                        {service.image && (
                          <button
                            type="button"
                            onClick={() => updateService(serviceIndex, { image: "" })}
                            className="text-xs font-bold text-rose-500 hover:underline"
                          >
                            Hapus gambar
                          </button>
                        )}
                      </div>
                      {uploadError[service.id] && (
                        <p className="text-xs font-semibold text-rose-500 mt-1.5">{uploadError[service.id]}</p>
                      )}
                      <p className="text-[11px] text-slate-400 mt-1.5">
                        Kosongkan jika ingin pakai icon default. Format JPG/PNG/WebP, maksimal 5MB.
                      </p>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5">Alt gambar</label>
                      <input
                        value={service.imageAlt}
                        onChange={(e) => updateService(serviceIndex, { imageAlt: e.target.value })}
                        maxLength={140}
                        className="w-full h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-800 outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-[var(--blue)]/10 transition"
                      />
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Preview media</p>
                    <div className="aspect-[4/3] overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center">
                      {service.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={service.image} alt={service.imageAlt || service.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="px-6 text-center">
                          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-xl shadow-sm border border-slate-200">🛠️</div>
                          <p className="text-xs font-bold text-slate-500 mt-3">Icon fallback aktif</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <label className="block text-xs font-bold text-slate-500">4 poin fitur</label>
                    <span className="text-[11px] text-slate-400">Wajib terisi semua agar tinggi card tetap konsisten</span>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {service.features.map((feature, featureIndex) => (
                      <input
                        key={`${service.id}-${featureIndex}`}
                        value={feature}
                        onChange={(e) => updateFeature(serviceIndex, featureIndex, e.target.value)}
                        maxLength={40}
                        placeholder={`Fitur ${featureIndex + 1}`}
                        className="w-full h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-800 outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-[var(--blue)]/10 transition"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        <aside className="space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5">
            <h3 className="font-head font-bold text-sm text-[var(--navy)]">Aturan aman layout</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>• Jumlah card dikunci tetap 4.</li>
              <li>• Area gambar/icon selalu aspect ratio 4:3.</li>
              <li>• Setiap card wajib punya 4 poin fitur.</li>
              <li>• Kalau gambar dikosongkan, homepage otomatis pakai icon fallback.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5">
            <h3 className="font-head font-bold text-sm text-[var(--navy)]">Upload gambar</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>• Klik &quot;Upload Gambar&quot;, pilih file dari perangkat.</li>
              <li>• Gambar otomatis tersimpan di Cloudinary dan langsung terpasang.</li>
              <li>• Data editor ini disimpan permanen di Supabase.</li>
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}
