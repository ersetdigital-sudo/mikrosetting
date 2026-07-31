import Navbar from "@/components/navbar/Navbar";
import HeroSection from "@/components/hero/HeroSection";
import StatsBar from "@/components/services/StatsBar";
import ServicesSection from "@/components/services/ServicesSection";
import ProductsSection from "@/components/products/ProductsSection";
import FaqSection from "@/components/faq/FaqSection";
import CtaSection from "@/components/common/CtaSection";
import Footer from "@/components/footer/Footer";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import JsonLd from "@/components/common/JsonLd";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <StatsBar />
        <ServicesSection />
        <ProductsSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}