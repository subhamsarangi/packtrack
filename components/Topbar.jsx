"use client";
import { usePathname } from "next/navigation";
import { IconCircleCheck, IconMenu2, IconAlertCircle } from "@tabler/icons-react";
import { useCompliance } from "@/components/ComplianceContext";

const titles = {
  "/": "Compliance Dashboard",
  "/recyclability": "Recyclability & Recycled Content",
  "/traceability": "Traceability & Supply Chain",
  "/dpp": "Digital Product Passport",
  "/suppliers": "Supplier Management",
  "/epr": "EPR Exporter Hub",
  "/retailer": "Retailer & Distributor Hub",
  "/reporting": "Regulatory Reporting",
  "/regulations": "Regulation Monitor"
};

export default function Topbar({ onMenuClick }) {
  const pathname = usePathname();
  const title = titles[pathname] || "Compliance Dashboard";
  const { actorTypes } = useCompliance();
  
  return (
    <header className="bg-bg-primary border-b border-border-tertiary px-4 sm:px-8 py-4 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <button
          onClick={onMenuClick}
          className="md:hidden p-1.5 -ml-1 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-colors cursor-pointer shrink-0"
          aria-label="Open menu"
        >
          <IconMenu2 size={20} />
        </button>
        <h2 className="text-base sm:text-lg font-semibold text-text-primary truncate" id="topbar-title">{title}</h2>
      </div>
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {actorTypes.microEnterprise && (
          <span className="bg-[#e0f2fe] text-[#0284c7] text-[10px] sm:text-[11px] font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-[6px] inline-flex items-center gap-1 border border-[#bae6fd]">
            <IconAlertCircle size={12} className="shrink-0" />
            <span className="hidden xs:inline">Micro-enterprise Waiver</span>
            <span className="xs:hidden">Micro</span>
          </span>
        )}
        <span className="bg-bg-success text-text-success text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-[6px] inline-flex items-center gap-1">
          <IconCircleCheck size={12} className="shrink-0" />
          <span className="hidden xs:inline">PPWR </span>2025/340
        </span>
        <span className="text-[11px] sm:text-xs text-text-tertiary font-medium">Q2 2026</span>
      </div>
    </header>
  );
}
