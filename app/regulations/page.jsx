"use client";
import { useState } from "react";
import { regulations } from "@/lib/data";
import { Card, CardTitle, Badge, InfoHelper } from "@/components/ui";
import { IconBook } from "@tabler/icons-react";

export default function Regulations() {
  const [showGuide, setShowGuide] = useState(true);

  return (
    <div className="space-y-6">
      {/* QUICK START GUIDE */}
      {showGuide && (
        <div className="bg-[#EAF3DE] border border-[#d2e7b9] rounded-xl p-5 shadow-sm text-text-primary transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <IconBook size={20} className="text-[#3B6D11] shrink-0" />
              <h3 className="text-sm font-bold text-[#3B6D11]">Regulation Monitor Quick-Start Guide</h3>
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
              <span className="text-xs font-bold text-[#3B6D11] block">1. Check Active Regulations</span>
              <p className="text-[11.5px] text-text-secondary leading-relaxed">
                PPWR 2025/340 is the primary packaging regulatory spine in Europe. Monitor active timestamps and enforcement levels.
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#3B6D11] block">2. Monitor Cross-Overlaps</span>
              <p className="text-[11.5px] text-text-secondary leading-relaxed">
                EUDR deforestation guidelines and ESPR ecodesign frameworks directly affect packaging designs, materials, and sourcing data.
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#3B6D11] block">3. Review Alerts Timely</span>
              <p className="text-[11.5px] text-text-secondary leading-relaxed">
                When amendments or revisals trigger, review affected SKUs to prevent supply chain blocks.
              </p>
            </div>
          </div>
        </div>
      )}

      <Card>
        <CardTitle action={
          <div className="flex items-center gap-2">
            <Badge variant="info">Live monitoring</Badge>
            <InfoHelper text="Dynamic monitor logging primary EU packaging packaging waste rules, deforestation sourcing blocks, and ESPR ecodesign mandates." />
          </div>
        }>
          Active regulation tracker
        </CardTitle>
        <div className="flex flex-col gap-0 divide-y divide-border-tertiary/40">
          {regulations.map((r, i) => (
            <div key={i} className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 py-4 first:pt-0 last:pb-0">
              <Badge variant={r.badgeVariant}>{r.badge}</Badge>
              <div>
                <div className="text-[13.5px] font-semibold text-text-primary">{r.title}</div>
                <div className="text-xs text-text-secondary mt-1 leading-relaxed">{r.desc}</div>
                <div className="text-[11px] text-text-tertiary mt-1.5 font-medium">{r.date}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
