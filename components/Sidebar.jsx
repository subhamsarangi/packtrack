"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconLeaf, IconLayoutDashboard, IconRecycle, IconRoute,
  IconId, IconBuildingFactory2, IconFileCertificate, IconScale,
  IconX,
} from "@tabler/icons-react";

const nav = [
  { section: "Overview" },
  { href: "/", label: "Dashboard", icon: IconLayoutDashboard },
  { section: "Compliance" },
  { href: "/recyclability", label: "Recyclability", icon: IconRecycle },
  { href: "/traceability", label: "Traceability", icon: IconRoute },
  { href: "/dpp", label: "Digital Product Passport", icon: IconId },
  { section: "Operations" },
  { href: "/suppliers", label: "Suppliers", icon: IconBuildingFactory2 },
  { href: "/reporting", label: "Reporting", icon: IconFileCertificate },
  { href: "/regulations", label: "Regulation Monitor", icon: IconScale },
];

export default function Sidebar({ onClose }) {
  const path = usePathname();
  
  return (
    <aside className="w-60 shrink-0 bg-bg-primary border-r border-border-tertiary flex flex-col py-6 h-full overflow-y-auto shadow-xl md:shadow-none">
      <div className="px-6 pb-5 border-b border-border-tertiary mb-3 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-base font-semibold text-text-primary">
            <IconLeaf size={20} className="text-[#1D9E75]" />
            PackTrack EU
          </div>
          <div className="text-[11px] text-text-tertiary mt-1 font-medium">PPWR Compliance Suite</div>
        </div>
        <button
          onClick={onClose}
          className="md:hidden p-1.5 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-bg-secondary transition-colors cursor-pointer"
          aria-label="Close menu"
        >
          <IconX size={18} />
        </button>
      </div>
      
      <nav className="flex flex-col gap-0.5" aria-label="Sidebar Navigation">
        {nav.map((item, i) =>
          item.section ? (
            <div key={i} className="px-6 pt-4 pb-1 text-[10px] font-semibold uppercase tracking-widest text-text-tertiary">
              {item.section}
            </div>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-2.5 px-6 py-2.5 text-sm border-l-[3px] transition-all duration-200 ${
                path === item.href
                  ? "text-text-info border-[#378ADD] bg-bg-info font-semibold"
                  : "text-text-secondary border-transparent hover:bg-bg-secondary hover:text-text-primary hover:font-medium"
              }`}
            >
              <item.icon size={18} className="shrink-0" />
              <span>{item.label}</span>
            </Link>
          )
        )}
      </nav>
    </aside>
  );
}
