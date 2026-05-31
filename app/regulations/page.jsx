"use client";
import { useState, useEffect } from "react";
import { regulations } from "@/lib/data";
import { Card, CardTitle, Badge, InfoHelper, Btn } from "@/components/ui";
import { IconBook, IconX, IconScale, IconChevronRight, IconFileText } from "@tabler/icons-react";

export default function Regulations() {
  const [showGuide, setShowGuide] = useState(true);
  const [selectedRegulation, setSelectedRegulation] = useState(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedRegulation(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
          Active regulation tracker <span className="text-[11px] text-text-tertiary font-normal lowercase ml-2">(click row to view AI Regulatory Briefing & Roadmap)</span>
        </CardTitle>
        <div className="flex flex-col gap-0 divide-y divide-border-tertiary/40">
          {regulations.map((r, i) => (
            <div 
              key={i} 
              onClick={() => setSelectedRegulation(r)}
              className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 py-4.5 first:pt-0 last:pb-0 hover:bg-bg-secondary/40 px-3 -mx-3 rounded-lg cursor-pointer transition-all duration-200 group"
            >
              <div className="flex items-center gap-2.5 sm:flex-col sm:items-start shrink-0">
                <Badge variant={r.badgeVariant}>{r.badge}</Badge>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13.5px] font-semibold text-text-primary group-hover:text-text-info transition-colors duration-150 flex items-center gap-1.5 justify-between">
                  <span>{r.title}</span>
                  <IconChevronRight size={14} className="text-text-tertiary group-hover:text-text-info opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0.5 transition-all duration-200" />
                </div>
                <div className="text-xs text-text-secondary mt-1 leading-relaxed">{r.desc}</div>
                <div className="text-[11px] text-text-tertiary mt-1.5 font-medium">{r.date}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* REGULATION AUDIT DETAIL MODAL OVERLAY */}
      {selectedRegulation && (
        <div className="fixed inset-0 bg-[#0f172a]/45 backdrop-blur-xs z-50 flex items-center justify-center p-4 transition-all duration-300">
          <div className="bg-bg-primary rounded-xl border border-border-tertiary p-6 max-w-2xl w-full shadow-2xl relative transition-all duration-200 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            
            {/* Close button */}
            <button 
              onClick={() => setSelectedRegulation(null)}
              className="absolute top-4 right-4 text-text-tertiary hover:text-text-primary hover:bg-bg-secondary p-1.5 rounded-lg cursor-pointer transition-colors"
              aria-label="Close regulation modal"
            >
              <IconX size={18} />
            </button>

            {/* Header */}
            <div className="flex items-center gap-2.5 border-b border-border-tertiary pb-3.5 mb-4">
              <IconScale size={22} className="text-text-info shrink-0" />
              <div>
                <h3 className="text-base font-bold text-text-primary leading-tight">Regulatory Compliance Briefing</h3>
                <span className="text-[11px] text-text-tertiary mt-0.5 block">Official Policy Database ID: {selectedRegulation.title.split(" — ")[0]}</span>
              </div>
              <Badge className="ml-auto" variant={selectedRegulation.badgeVariant}>
                {selectedRegulation.badge}
              </Badge>
            </div>

            {/* Body */}
            <div className="space-y-4 text-xs">
              
              {/* Full Title Card */}
              <div className="bg-bg-secondary/40 p-4 rounded-xl border border-border-tertiary/40 space-y-1.5">
                <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider block">Official Regulation Title</span>
                <h4 className="text-[13px] font-bold text-text-primary leading-snug">{selectedRegulation.title}</h4>
                <div className="text-[11px] text-text-tertiary font-medium">{selectedRegulation.date}</div>
              </div>

              {/* Grid: Scope and Detailed description */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Affected Material Scope */}
                <div className="bg-bg-secondary/40 p-4 rounded-xl border border-border-tertiary/40 space-y-2">
                  <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider block">Affected Packaging Scope</span>
                  <p className="text-text-primary font-semibold leading-relaxed">
                    {selectedRegulation.scope}
                  </p>
                  <p className="text-[10.5px] text-text-secondary leading-relaxed font-medium">
                    All linked packaging components made of these polymers or substances are subject to audit logs.
                  </p>
                </div>

                {/* Compliance Target Status */}
                <div className="bg-bg-secondary/40 p-4 rounded-xl border border-border-tertiary/40 space-y-2">
                  <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider block">PackTrack Status</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#185FA5] shrink-0 animate-pulse" />
                    <span className="font-bold text-text-primary">Monitor Active & Tracking</span>
                  </div>
                  <p className="text-[10.5px] text-text-secondary leading-relaxed font-medium">
                    Continuous AI parsing scans official EU Commission journals daily to flag new amendments.
                  </p>
                </div>

              </div>

              {/* Policy In-depth Details */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider block">Policy Intent & Background</span>
                <p className="text-text-secondary leading-relaxed bg-bg-secondary/20 p-3 rounded-lg border border-border-tertiary/30 font-medium">
                  {selectedRegulation.details}
                </p>
              </div>

              {/* Milestones timeline */}
              <div className="space-y-2.5">
                <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider block">Compliance Roadmap & Key Milestones</span>
                <div className="relative pl-4 border-l border-border-secondary/60 ml-2 space-y-3.5">
                  {(selectedRegulation.milestones || []).map((ms, idx) => (
                    <div key={idx} className="relative">
                      {/* Timeline dot */}
                      <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full border-2 border-border-tertiary bg-bg-primary shrink-0" />
                      <div className="space-y-0.5">
                        <span className="font-bold text-[#185FA5] block text-[10.5px]">{ms.date}</span>
                        <span className="text-text-primary leading-normal font-medium">{ms.task}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="flex justify-end gap-2.5 border-t border-border-tertiary pt-4 mt-5">
              <Btn onClick={() => setSelectedRegulation(null)}>
                <span>Dismiss Briefing</span>
              </Btn>
              
              <Btn primary onClick={() => {
                alert(selectedRegulation.actionMsg);
                setSelectedRegulation(null);
              }}>
                <IconFileText size={14} className="shrink-0" />
                <span>{selectedRegulation.actionText}</span>
              </Btn>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
