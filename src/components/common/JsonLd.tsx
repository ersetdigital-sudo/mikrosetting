import { WHATSAPP_URL, PHONE, EMAIL } from "@/constants";

export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "MikroSetting",
        url: "https://mikrosetting.com",
        logo: "https://mikrosetting.com/images/fb3b9521-c9c8-4641-b2c5-c60073257a0f.png",
        description:
          "Jasa setting MikroTik, OLT, Ruijie & Access Point profesional.",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: PHONE,
          contactType: "customer service",
          availableLanguage: ["Indonesian", "English"],
        },
        address: {
          "@type": "PostalAddress",
          addressCountry: "ID",
        },
      },
      {
        "@type": "LocalBusiness",
        name: "MikroSetting",
        description:
          "Penyedia jasa setting MikroTik, OLT, Ruijie, dan Access Point profesional untuk RT/RW Net, Hotel, Kantor, Sekolah, dan ISP.",
        url: "https://mikrosetting.com",
        telephone: PHONE,
        email: EMAIL,
        openingHours: "Mo-Su 08:00-21:00",
        priceRange: "Rp",
        image: "https://mikrosetting.com/images/fb3b9521-c9c8-4641-b2c5-c60073257a0f.png",
        address: {
          "@type": "PostalAddress",
          addressCountry: "ID",
        },
      },
      {
        "@type": "ProfessionalService",
        name: "MikroSetting",
        description:
          "Jasa setting dan konfigurasi perangkat jaringan profesional.",
        areaServed: "ID",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Layanan Setting Jaringan",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Jasa Setting MikroTik",
                description:
                  "Konfigurasi MikroTik untuk berbagai kebutuhan jaringan.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Jasa Setting OLT",
                description:
                  "Setting OLT untuk ISP, RT/RW Net, dan jaringan fiber optik.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Jasa Setting Ruijie",
                description:
                  "Konfigurasi Ruijie untuk jaringan yang stabil dan terkelola.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Jasa Setting Access Point",
                description:
                  "Optimasi WiFi untuk Hotel, Kantor, Sekolah & area publik.",
              },
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        name: "MikroSetting",
        url: "https://mikrosetting.com",
        description:
          "Jasa setting MikroTik, OLT, Ruijie & Access Point profesional.",
        inLanguage: "id-ID",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://mikrosetting.com/?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "WebPage",
        name: "Beranda",
        url: "https://mikrosetting.com",
        description:
          "Jasa setting MikroTik, OLT, Ruijie & Access Point profesional.",
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Beranda",
              item: "https://mikrosetting.com",
            },
          ],
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Beranda",
            item: "https://mikrosetting.com",
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Berapa lama proses pengerjaan setting jaringan?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Tergantung kompleksitas jaringan. Setting dasar MikroTik/OLT umumnya selesai dalam 1–3 jam, sementara instalasi skala ISP bisa memakan waktu beberapa hari.",
            },
          },
          {
            "@type": "Question",
            name: "Apakah bisa setting jaringan secara remote?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Bisa. Selama perangkat dapat diakses via VPN atau remote access yang aman, kami dapat mengerjakan konfigurasi dari jarak jauh.",
            },
          },
          {
            "@type": "Question",
            name: "Apakah ada garansi setelah pengerjaan?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Ya, kami memberikan garansi konfigurasi 100%. Jika ada kendala pada hasil setting, kami perbaiki tanpa biaya tambahan.",
            },
          },
          {
            "@type": "Question",
            name: "Apakah melayani seluruh wilayah Indonesia?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Untuk layanan remote menjangkau seluruh Indonesia. Untuk kunjungan on-site, silakan konsultasi terlebih dahulu via WhatsApp.",
            },
          },
          {
            "@type": "Question",
            name: "Bagaimana cara konsultasi atau pemesanan?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Cukup klik tombol Chat WhatsApp di halaman ini, jelaskan kebutuhan Anda, dan tim kami akan membantu prosesnya.",
            },
          },
        ],
      },
      {
        "@type": "Person",
        name: "Tim MikroSetting",
        description: "Praktisi jaringan yang menangani konfigurasi MikroTik, OLT, hotspot, VPN, dan access point.",
        url: "https://mikrosetting.com",
      },
      {
        "@type": "ImageObject",
        url: "https://mikrosetting.com/images/fb3b9521-c9c8-4641-b2c5-c60073257a0f.png",
        width: 1200,
        height: 630,
        caption: "MikroSetting - Jasa Setting Jaringan Profesional",
      },
      {
        "@type": "SiteNavigationElement",
        name: "Navigasi Utama",
        hasPart: [
          { "@type": "SiteNavigationElement", name: "Home", url: "https://mikrosetting.com/#home" },
          { "@type": "SiteNavigationElement", name: "Layanan", url: "https://mikrosetting.com/#layanan" },
          { "@type": "SiteNavigationElement", name: "Mikhmon & Port Forwarding", url: "https://mikrosetting.com/#produk" },
          { "@type": "SiteNavigationElement", name: "Tentang Kami", url: "https://mikrosetting.com/tentang" },
          { "@type": "SiteNavigationElement", name: "Blog", url: "https://mikrosetting.com/blog" },
          { "@type": "SiteNavigationElement", name: "Kontak", url: "https://mikrosetting.com/#kontak" },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}