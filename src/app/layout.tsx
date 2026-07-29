import type { Metadata, Viewport } from "next";
import { dmSans, sora } from "@/lib/fonts";
import "./globals.css";

const siteUrl = "https://mikrosetting.com";
const siteName = "MikroSetting";
const description =
  "Jasa setting MikroTik, OLT, Ruijie & Access Point profesional. Solusi jaringan untuk RT/RW Net, Hotel, Kantor, Sekolah, dan ISP.";
const keywords =
  "jasa setting mikrotik, jasa setting OLT, setting ruijie, setting access point, jaringan RT RW Net, mikrotik, OLT, VPN port forwarding, mikhmon online, jaringan fiber optik, teknisi jaringan";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b1b4d",
};

export function generateMetadata(): Metadata {
  return {
    title: {
      default: "MikroSetting — Jasa Setting MikroTik, OLT & Ruijie Profesional",
      template: "%s | MikroSetting",
    },
    description,
    keywords,
    authors: [{ name: "MikroSetting" }],
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: siteUrl,
    },
    openGraph: {
      type: "website",
      locale: "id_ID",
      siteName,
      title: "MikroSetting — Jasa Setting MikroTik, OLT & Ruijie Profesional",
      description,
      url: siteUrl,
      images: [
        {
          url: `${siteUrl}/images/fb3b9521-c9c8-4641-b2c5-c60073257a0f.png`,
          width: 1200,
          height: 630,
          alt: "MikroSetting - Jasa Setting Jaringan Profesional",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "MikroSetting — Jasa Setting MikroTik, OLT & Ruijie Profesional",
      description,
    },
    appleWebApp: {
      capable: true,
      title: siteName,
      statusBarStyle: "black-translucent",
    },
    manifest: "/manifest.json",
    verification: {
      google: "verification_token",
    },
    other: {
      "language": "id",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${dmSans.variable} ${sora.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}