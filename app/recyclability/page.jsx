"use client";
import { useState } from "react";
import { skus } from "@/lib/data";
import { Card, CardTitle, Grade, Td, ProgressBar, Badge, Btn, InfoHelper } from "@/components/ui";
import { IconDownload, IconChevronDown, IconChevronUp, IconBook } from "@tabler/icons-react";

export default function Recyclability() {
  const [expandedSkuId, setExpandedSkuId] = useState(null);
  const [showGuide, setShowGuide] = useState(true);

  const toggleRow = (id) => {
    setExpandedSkuId(expandedSkuId === id ? null : id);
  };

  const exportCSV = () => {
    const headers = ["SKU", "Description", "Material", "Grade", "Recycled Content", "Food Contact Safe", "Status"];
    const rows = skus.map(s => [
      s.id,
      `"${s.name.replace(/"/g, '""')}"`,
      s.material,
      s.grade,
      `${s.recycled}%`,
      s.foodSafe,
      s.status
    ]);
    
    const csvContent = [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "recyclability_assessment.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* QUICK START GUIDE */}
      {showGuide && (
        <div className="bg-[#EAF3DE] border border-[#d2e7b9] rounded-xl p-5 shadow-sm text-text-primary transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <IconBook size={20} className="text-[#3B6D11] shrink-0" />
              <h3 className="text-sm font-bold text-[#3B6D11]">Recyclability Quick-Start Guide</h3>
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
              <span className="text-xs font-bold text-[#3B6D11] block">1. Check Grade Ranges</span>
              <p className="text-[11.5px] text-text-secondary leading-relaxed">
                All packaging placed on the EU market must achieve Grades A-C. Underperforming D or E grades will be fined or banned under 2026 regulations.
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#3B6D11] block">2. Fix Gaps Proactively</span>
              <p className="text-[11.5px] text-text-secondary leading-relaxed">
                Click any table row to slide down its AI Compliance Remediation Guide. Swap multi-layer foils for recyclable PE/PP mono-materials.
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#3B6D11] block">3. Keep Food Suitability Safe</span>
              <p className="text-[11.5px] text-text-secondary leading-relaxed">
                Confirm your plastic materials have official European Food Safety Authority (EFSA) clearances if packaging food items.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2.5">
        <select className="font-sans text-[13px] px-3 py-1.5 rounded-[6px] border border-border-secondary bg-bg-primary text-text-primary outline-none transition-colors duration-200 focus:border-text-info cursor-pointer flex-1 sm:flex-initial min-w-[140px]" aria-label="Filter by packaging type">
          <option>All packaging types</option>
          <option>Rigid plastic</option>
          <option>Flexible film</option>
          <option>Glass</option>
          <option>Paper/Board</option>
          <option>Metal</option>
        </select>
        
        <select className="font-sans text-[13px] px-3 py-1.5 rounded-[6px] border border-border-secondary bg-bg-primary text-text-primary outline-none transition-colors duration-200 focus:border-text-info cursor-pointer flex-1 sm:flex-initial min-w-[110px]" aria-label="Filter by grade">
          <option>All grades</option>
          <option>Grade A</option>
          <option>Grade B</option>
          <option>Grade C</option>
          <option>Grade D</option>
          <option>Grade E</option>
        </select>
        
        <Btn onClick={exportCSV} className="flex-1 sm:flex-initial">
          <IconDownload size={14} className="shrink-0" />
          <span>Export CSV</span>
        </Btn>
      </div>

      <Card>
        <CardTitle action={
          <div className="hidden sm:flex items-center gap-3 text-xs font-normal text-text-secondary select-none">
            <span className="flex items-center gap-1"><Grade grade="A" /> Excellent</span>
            <span className="flex items-center gap-1"><Grade grade="C" /> Moderate</span>
            <span className="flex items-center gap-1"><Grade grade="E" /> Non-recyclable</span>
          </div>
        }>
          Recyclability assessment by SKU <span className="text-[11px] text-text-tertiary font-normal lowercase ml-2">(click row to view AI Remediation Guide)</span>
        </CardTitle>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead>
              <tr className="border-b border-border-tertiary">
                <th className="px-3 py-2.5 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">SKU</th>
                <th className="px-3 py-2.5 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Description</th>
                <th className="px-3 py-2.5 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Material</th>
                <th className="px-3 py-2.5 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">
                  <span>Grade</span>
                  <InfoHelper text="Compliance status: Grades A-C are compliant. Grades D-E are banned or heavily penalized under 2026 PPWR rules." />
                </th>
                <th className="px-3 py-2.5 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Recycled Content</th>
                <th className="px-3 py-2.5 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">
                  <span>Food Safe</span>
                  <InfoHelper text="Verifies if the packaging material conforms with strict EFSA guidelines for food-contact suitability." />
                </th>
                <th className="px-3 py-2.5 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Status</th>
                <th className="px-3 py-2.5 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Guide</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-tertiary/40">
              {skus.map((s) => (
                <>
                  <tr
                    key={s.id}
                    onClick={() => toggleRow(s.id)}
                    className="hover:bg-bg-secondary transition-colors duration-150 cursor-pointer"
                  >
                    <Td className="font-mono text-xs text-text-tertiary font-semibold">{s.id}</Td>
                    <Td className="font-semibold text-text-primary">{s.name}</Td>
                    <Td className="text-text-secondary font-medium">{s.material}</Td>
                    <Td><Grade grade={s.grade} /></Td>
                    <Td>
                      <ProgressBar value={s.recycled} />
                    </Td>
                    <Td>
                      <Badge variant={s.foodSafe === "Yes" ? "success" : s.foodSafe === "Review" ? "warning" : "danger"}>
                        {s.foodSafe}
                      </Badge>
                    </Td>
                    <Td>
                      <Badge variant={s.status === "Compliant" ? "success" : s.status === "At risk" ? "warning" : "danger"}>
                        {s.status}
                      </Badge>
                    </Td>
                    <Td className="text-text-tertiary">
                      {expandedSkuId === s.id ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
                    </Td>
                  </tr>

                  {/* REMEDIATION DRAWER EXPANSION */}
                  {expandedSkuId === s.id && (
                    <tr className="bg-bg-secondary/40 select-none">
                      <td colSpan={8} className="p-4 border-b border-border-tertiary">
                        <div className="bg-bg-primary rounded-xl border border-border-tertiary p-5 space-y-4 shadow-sm">
                          <div className="flex items-center justify-between border-b border-border-tertiary/60 pb-2.5">
                            <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider flex items-center gap-1.5">
                              <span>🤖 AI Compliance Remediation Guide</span>
                              <span className="text-[10px] text-text-tertiary font-medium font-mono">({s.id})</span>
                            </h4>
                            <Badge variant={s.status === "Compliant" ? "success" : s.status === "At risk" ? "warning" : "danger"}>
                              {s.status}
                            </Badge>
                          </div>
                          
                          {s.id === "PKG-1023" ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                              <div className="space-y-1 bg-bg-secondary p-3.5 rounded-[6px] border border-border-tertiary/50">
                                <strong className="font-semibold text-text-primary">Identified Packaging Gaps:</strong>
                                <p className="text-text-secondary leading-relaxed mt-1">
                                  1. Multi-layer laminate containing aluminium foil barrier layer. This makes the pouch non-recyclable in standard mechanical sorting streams.
                                  <br />
                                  2. Extremely low recycled plastic content fraction (only 8% PCR).
                                </p>
                              </div>
                              <div className="space-y-1 bg-bg-info/30 p-3.5 rounded-[6px] border border-bg-info/50 text-[#185FA5]">
                                <strong className="font-semibold text-[#185FA5]">PPWR 2026 Formulation Fix:</strong>
                                <p className="text-[#185FA5] leading-relaxed mt-1">
                                  Switch from PET/Alu/PE multi-layer laminate to a high-barrier mono-oriented PE (MDO-PE) or mono-PP laminate. This preserves critical oxygen/moisture barrier protection while raising the recyclability grade from <span className="font-bold underline text-text-danger">D</span> to <span className="font-bold underline text-text-success">B</span>.
                                </p>
                              </div>
                            </div>
                          ) : s.id === "PKG-1005" ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                              <div className="space-y-1 bg-bg-secondary p-3.5 rounded-[6px] border border-border-tertiary/50">
                                <strong className="font-semibold text-text-primary">Identified Packaging Gaps:</strong>
                                <p className="text-text-secondary leading-relaxed mt-1">
                                  1. Contains 0% recycled material feed (violates the mandatory minimum 30% recycled PCR fraction required from 2026/2030).
                                  <br />
                                  2. Fails optical carbon-black scanning detection, causing sorting failure.
                                </p>
                              </div>
                              <div className="space-y-1 bg-[#FCEBEB] p-3.5 rounded-[6px] border border-[#fca5a5]/50 text-[#A32D2D]">
                                <strong className="font-semibold text-[#A32D2D]">PPWR 2026 Formulation Fix:</strong>
                                <p className="text-[#A32D2D] leading-relaxed mt-1">
                                  1. Reformulate raw polymer feed to blend minimum 30% food-grade rPET flakes.
                                  <br />
                                  2. Replace standard carbon-black pigments with NIR-detectable organic colorants to ensure automatic optical scanning and sorting in recycling plants.
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="text-xs bg-[#EAF3DE] border border-[#d2e7b9]/50 text-[#3B6D11] p-4 rounded-[6px]">
                              <strong className="font-bold flex items-center gap-1">✓ Premium Grade Compliance Approved</strong>
                              <p className="mt-1.5 leading-relaxed font-medium">
                                This packaging configuration is fully compliant with all 2026/2030 PPWR mandates. Recyclability is highly optimized. Sourced from vetted partners. Keep maintaining current formulations.
                              </p>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
