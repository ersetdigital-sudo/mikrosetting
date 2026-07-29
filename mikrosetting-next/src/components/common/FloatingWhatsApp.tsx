import { WHATSAPP_URL } from "@/constants";
import { WhatsAppIcon } from "@/components/common/Icons";

export default function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener"
      aria-label="Chat WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid place-items-center w-14 h-14 rounded-full btn-green text-white shadow-xl transition hover:scale-105"
    >
      <WhatsAppIcon className="w-7 h-7" />
    </a>
  );
}