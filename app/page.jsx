"use client";
import { useState } from "react";
import { metrics, alerts, activity } from "@/lib/data";
import { MetricCard, Card, CardTitle, Alert, Badge, InfoHelper } from "@/components/ui";
import { IconBook } from "@tabler/icons-react";

export default function Dashboard() {
  const [showGuide, setShowGuide] = useState(true);

  return (
    <div className="space-y-6">
      {/* PPWR 101 ONBOARDING WIZARD GUIDE */}
      {showGuide && (
        <div className="bg-[#EAF3DE] border border-[#d2e7b9] rounded-xl p-5 shadow-sm text-text-primary transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <IconBook size={20} className="text-[#3B6D11] shrink-0" />
              <h3 className="text-sm font-bold text-[#3B6D11]">Welcome to PackTrack EU! PPWR 101 Compliance Quick-Start Guide</h3>
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
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#3B6D11] text-white text-[10px] font-bold flex items-center justify-center shrink-0">1</span>
                <span className="text-xs font-bold text-[#3B6D11]">Onboard Suppliers</span>
              </div>
              <p className="text-[11.5px] text-text-secondary leading-relaxed pl-7">
                Sync material specs and recycled content from suppliers. Over 87% are connected. Resolve the remaining 18 data gaps in the <strong className="font-semibold text-[#3B6D11]">Suppliers</strong> tab.
              </p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#3B6D11] text-white text-[10px] font-bold flex items-center justify-center shrink-0">2</span>
                <span className="text-xs font-bold text-[#3B6D11]">Verify Recyclability</span>
              </div>
              <p className="text-[11.5px] text-text-secondary leading-relaxed pl-7">
                Review SKUs to ensure they achieve Grades A-C. Switch underperforming D/E laminates to mono-materials. Details are available in the <strong className="font-semibold text-[#3B6D11]">Recyclability</strong> tab.
              </p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#3B6D11] text-white text-[10px] font-bold flex items-center justify-center shrink-0">3</span>
                <span className="text-xs font-bold text-[#3B6D11]">Publish Passports (DPP)</span>
              </div>
              <p className="text-[11.5px] text-text-secondary leading-relaxed pl-7">
                Generate carbon footprints, complete declarations of conformity (DoCs), and render QR codes for consumers in the <strong className="font-semibold text-[#3B6D11]">Digital Product Passport (DPP)</strong> tab.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* METRICS DASHBOARD GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {metrics.map((m) => {
          let tooltip = "";
          if (m.label === "Overall score") tooltip = "Aggregated performance score across all packaging materials, recyclability grades, and supplier onboarding parameters.";
          if (m.label === "SKUs tracked") tooltip = "Total active packaging product Stock Keeping Units (SKUs) currently catalogued in the PackTrack system.";
          if (m.label === "Recyclability A/B") tooltip = "Percentage of active SKUs grading A or B in recyclability. Mandated to rise to 70% by 2026.";
          if (m.label === "Recycled content") tooltip = "Average percentage of post-consumer recycled plastic (PCR) used in rigid and flexible packaging SKUs.";
          if (m.label === "Suppliers onboarded") tooltip = "Percent of suppliers who have synced materials data and signed chemical compliance sheets.";
          
          return (
            <MetricCard
              key={m.label}
              label={
                <span className="flex items-center gap-1">
                  <span>{m.label}</span>
                  <InfoHelper text={tooltip} />
                </span>
              }
              value={m.value}
              sub={m.sub}
              color={m.color}
            />
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardTitle action={<Badge variant="danger">3 critical</Badge>}>
            Active alerts
          </CardTitle>
          <div className="space-y-1">
            {alerts.map((a, i) => (
              <Alert key={i} {...a} />
            ))}
          </div>
        </Card>

        <Card>
          <CardTitle>Recent activity</CardTitle>
          <div className="flex flex-col gap-0">
            {activity.map((a, i) => (
              <div key={i} className="flex gap-3.5 py-3 border-b border-border-tertiary/40 last:border-0 last:pb-0 first:pt-0">
                <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${a.color}`} />
                <div>
                  <div className="text-[13px] text-text-primary font-medium">{a.text}</div>
                  <div className="text-[11px] text-text-tertiary mt-1 font-medium">{a.meta}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
