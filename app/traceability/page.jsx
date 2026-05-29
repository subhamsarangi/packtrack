"use client";
import { useState } from "react";
import { Card, CardTitle, ProgressBar, InfoHelper } from "@/components/ui";
import {
  IconBuildingFactory2, IconBox, IconTruck, IconBuildingStore,
  IconShoppingCart, IconRecycle, IconBook
} from "@tabler/icons-react";

const chainNodes = [
  { label: "Raw glass mfg", bg: "bg-[#EAF3DE] text-[#3B6D11]", icon: IconBuildingFactory2 },
  { label: "Vetri Italia SpA", bg: "bg-[#E6F1FB] text-[#185FA5]", icon: IconBox },
  { label: "DHL Logistics DE", bg: "bg-[#E6F1FB] text-[#185FA5]", icon: IconTruck },
  { label: "Brand Co. NL", bg: "bg-[#FAEEDA] text-[#854F0B]", icon: IconBuildingStore },
  { label: "Retail EU", bg: "bg-[#FAEEDA] text-[#854F0B]", icon: IconShoppingCart },
  { label: "Glass recycler AT", bg: "bg-[#EAF3DE] text-[#3B6D11]", icon: IconRecycle },
];

const events = [
  { color: "bg-[#639922]", text: "Glass melted & formed — Vetri Italia, Padova", meta: "Jan 12, 2026 · IoT sensor" },
  { color: "bg-[#378ADD]", text: "QC passed, pallet 4412 sealed", meta: "Jan 14 · RFID scan" },
  { color: "bg-[#378ADD]", text: "Shipped to Brand Co. NL warehouse", meta: "Jan 16 · GPS track" },
  { color: "bg-[#BA7517]", text: "Filled & labelled at Brand Co. NL", meta: "Jan 22 · ERP sync" },
  { color: "bg-[#639922]", text: "Retail distribution — 4 EU markets", meta: "Jan 25 · EDI" },
];

const coverages = [
  { label: "Tier 1 suppliers", value: 100 },
  { label: "Tier 2 suppliers", value: 84 },
  { label: "Tier 3 suppliers", value: 51 },
  { label: "End-of-life coverage", value: 38 },
];

export default function Traceability() {
  const [showGuide, setShowGuide] = useState(true);

  return (
    <div className="space-y-6">
      {/* QUICK START GUIDE */}
      {showGuide && (
        <div className="bg-[#EAF3DE] border border-[#d2e7b9] rounded-xl p-5 shadow-sm text-text-primary transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <IconBook size={20} className="text-[#3B6D11] shrink-0" />
              <h3 className="text-sm font-bold text-[#3B6D11]">Traceability Quick-Start Guide</h3>
            </div>
            <button
              onClick={() => setShowGuide(false)}
              className="text-xs font-semibold text-[#3B6D11] hover:text-[#25460a] bg-white/40 hover:bg-white/60 px-2.5 py-1 rounded-[6px] cursor-pointer transition-colors duration-150 shrink-0"
            >
              Hide Guide
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-4 pt-3 border-t border-[#d2e7b9]/40">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#3B6D11] block">1. Check Custody Flow</span>
              <p className="text-[11.5px] text-text-secondary leading-relaxed">
                Review the step-by-step custody pathway to verify standard tracking from raw glass melters and converters to retailers.
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#3B6D11] block">2. Track IoT Logs</span>
              <p className="text-[11.5px] text-text-secondary leading-relaxed">
                Confirm timeline points (IoT melts, RFID seals, carrier GPS logs) to prepare audit records.
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#3B6D11] block">3. Support Deeper Tiers</span>
              <p className="text-[11.5px] text-text-secondary leading-relaxed">
                Verify Tier 2 and Tier 3 suppliers. Achieve minimum 80% coverage to prevent audit gaps.
              </p>
            </div>
          </div>
        </div>
      )}

      <Card>
        <CardTitle action={<InfoHelper text="Step-by-step custody pathway verifying converters, retail distribution, and post-consumer recycling facilities." />}>
          Custody chain — PKG-1041 Olive Oil Bottle 1L
        </CardTitle>
        <div className="flex flex-wrap items-center gap-1.5 py-4">
          {chainNodes.map((n, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-xs font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.02)] ${n.bg}`}>
                <n.icon size={14} className="shrink-0" />
                <span>{n.label}</span>
              </span>
              {i < chainNodes.length - 1 && (
                <span className="text-text-tertiary mx-1.5 font-semibold text-sm">→</span>
              )}
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardTitle action={<InfoHelper text="Live audit trail verified by IoT sensors, RFID scans, and carrier GPS tracking." />}>
            Chain-of-custody events
          </CardTitle>
          <div className="flex flex-col gap-0">
            {events.map((e, i) => (
              <div key={i} className="flex gap-3.5 py-3 border-b border-border-tertiary/40 last:border-0 last:pb-0 first:pt-0">
                <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${e.color}`} />
                <div>
                  <div className="text-[13px] text-text-primary font-medium">{e.text}</div>
                  <div className="text-[11px] text-text-tertiary mt-1 font-medium">{e.meta}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardTitle action={<InfoHelper text="Measures documentation compliance across distinct supplier tiers and post-life disposal loops." />}>
            Traceability coverage
          </CardTitle>
          <div className="space-y-4 mt-2">
            {coverages.map((c, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between items-center text-[13px]">
                  <span className="text-text-secondary font-medium">{c.label}</span>
                  <span className="text-text-primary font-semibold">{c.value}%</span>
                </div>
                <ProgressBar value={c.value} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
