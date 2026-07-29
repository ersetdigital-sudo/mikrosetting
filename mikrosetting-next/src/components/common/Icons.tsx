interface IconProps {
  className?: string;
}

export function MenuIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.5 14.4c-.3-.15-1.7-.84-2-.94s-.46-.15-.66.15-.76.94-.93 1.13-.34.22-.63.08a8.2 8.2 0 0 1-2.4-1.48 9 9 0 0 1-1.67-2.06c-.17-.3 0-.46.13-.6s.3-.34.44-.51.19-.3.29-.5.05-.37 0-.52-.66-1.6-.9-2.18-.48-.5-.66-.5h-.56a1.1 1.1 0 0 0-.79.37 3.27 3.27 0 0 0-1 2.43 5.68 5.68 0 0 0 1.2 3 13 13 0 0 0 5 4.42 16.9 16.9 0 0 0 1.67.62 4 4 0 0 0 1.85.12 3 3 0 0 0 2-1.4 2.47 2.47 0 0 0 .17-1.39c-.07-.13-.26-.2-.55-.35zM12 2a10 10 0 0 0-8.6 15.06L2 22l5.06-1.33A10 10 0 1 0 12 2z" />
    </svg>
  );
}

export function RouterIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="3" y="8" width="18" height="8" rx="2" />
      <path d="M7 12h.01M11 12h.01" strokeLinecap="round" />
    </svg>
  );
}

export function OltIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="3" y="5" width="18" height="5" rx="1" />
      <rect x="3" y="14" width="18" height="5" rx="1" />
      <path d="M7 7.5h.01M7 16.5h.01" strokeLinecap="round" />
    </svg>
  );
}

export function RuijieIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M4 7l8-4 8 4-8 4-8-4z" />
      <path d="M4 12l8 4 8-4M4 17l8 4 8-4" />
    </svg>
  );
}

export function AccessPointIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M5 12a7 7 0 0 1 14 0M8.5 12a3.5 3.5 0 0 1 7 0" strokeLinecap="round" />
      <circle cx="12" cy="16" r="1.5" />
    </svg>
  );
}

export function StatRouterIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="6" rx="1" />
      <rect x="3" y="14" width="18" height="6" rx="1" />
      <path d="M7 7h.01M7 17h.01" strokeLinecap="round" />
    </svg>
  );
}

export function StatHotspotIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M5 12a7 7 0 0 1 14 0M8.5 12a3.5 3.5 0 0 1 7 0M12 12v6" strokeLinecap="round" />
    </svg>
  );
}

export function StatOltIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v18M3 12h18" />
    </svg>
  );
}

export function StatGuaranteeIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ShieldIcon({ className = "w-16 h-16" }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function EyeIcon({ className = "w-16 h-16" }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path d="M5 12a7 7 0 0114 0M8.5 12a3.5 3.5 0 017 0M12 12v6" />
      <circle cx="12" cy="19" r="1" fill="currentColor" />
    </svg>
  );
}

export function WifiIcon({ className = "w-16 h-16" }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path d="M3 9a14 14 0 0118 0M6 12a9 9 0 0112 0M9 15a4.5 4.5 0 016 0" />
      <circle cx="12" cy="18" r="1" fill="currentColor" />
    </svg>
  );
}

export function SearchIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}

export function SparkleIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M12 3l1.4 4.2L18 9l-4.6 1.8L12 15l-1.4-4.2L6 9l4.6-1.8z" />
      <path d="M19 15l.7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7z" />
    </svg>
  );
}

export function ArrowRightIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}