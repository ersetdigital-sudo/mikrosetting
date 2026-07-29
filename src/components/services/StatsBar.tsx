import { STATS } from "@/constants";
import {
  StatRouterIcon,
  StatHotspotIcon,
  StatOltIcon,
  StatGuaranteeIcon,
} from "@/components/common/Icons";

function getStatIcon(icon: string) {
  switch (icon) {
    case "router":
      return <StatRouterIcon />;
    case "hotspot":
      return <StatHotspotIcon />;
    case "olt":
      return <StatOltIcon />;
    case "guarantee":
      return <StatGuaranteeIcon />;
    default:
      return null;
  }
}

export default function StatsBar() {
  return (
    <section className="bg-[var(--navy)] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, index) => (
          <div key={index} className="flex items-center gap-4 text-white">
            <span className="grid place-items-center w-12 h-12 rounded-xl bg-white/10 text-[var(--cyan)] shrink-0">
              {getStatIcon(stat.icon)}
            </span>
            <div>
              <div className="font-head font-extrabold text-2xl">{stat.value}</div>
              <div className="text-slate-300 text-xs sm:text-sm">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
