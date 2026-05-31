"use client";
import { useState, useEffect } from "react";
import { useCompliance } from "@/components/ComplianceContext";
import { Card, CardTitle, Grade, Badge, Btn, InfoHelper, Table, Tr, Td } from "@/components/ui";
import {
  IconQrcode, IconFileDownload, IconShare, IconRecycle, IconBook,
  IconAlertCircle, IconX, IconCertificate, IconAlertTriangle, IconCircleCheck,
  IconLeaf, IconSettings, IconCpu
} from "@tabler/icons-react";

const dpp = {
  id: "PKG-1041-EU-2026",
  material: "Soda-lime glass, clear",
  grade: "A",
  recycled: "55%",
  manufacturer: "Vetri Italia SpA",
  origin: "Italy (IT)",
  carbon: "0.48 kg CO₂e / unit",
  doc: "DoC-2026-1041-IT",
  updated: "May 28, 2026",
};

const completeness = [
  { id: "material", label: "Material data", status: "Complete", desc: "Chemical composition & raw polymer feed specifications" },
  { id: "recyclability", label: "Recyclability score", status: "Complete", desc: "Recyclability grade calculations under PPWR Annex II guidelines" },
  { id: "carbon", label: "Carbon footprint", status: "Complete", desc: "ISO 14067 life cycle greenhouse gas emission analysis" },
  { id: "eol", label: "End-of-life data", status: "Partial", desc: "Municipal sorting center logs & post-consumer recycling rates" },
  { id: "chemical", label: "Chemical safety cert", status: "Complete", desc: "Heavy metals limits, EFSA compliance, & REACH declarations" },
];

export default function DPP() {
  const [showGuide, setShowGuide] = useState(true);
  const { actorTypes } = useCompliance();
  const [selectedCompletenessDetails, setSelectedCompletenessDetails] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedCompletenessDetails(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const downloadDoC = () => {
    const docText = `EUROPEAN UNION DECLARATION OF CONFORMITY (DoC)

DoC Reference: ${dpp.doc}
Package ID: ${dpp.id}
Material: ${dpp.material}
Recyclability Grade: ${dpp.grade}
Recycled Content: ${dpp.recycled}
Manufacturer: ${dpp.manufacturer}
Country of Origin: ${dpp.origin}
Carbon Footprint: ${dpp.carbon}
Last Updated: ${dpp.updated}

This declaration is issued under the sole responsibility of the manufacturer, confirming compliance with EU Packaging and Packaging Waste Regulation 2025/340.`;
    
    const blob = new Blob([docText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `DoC_${dpp.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const shareDPP = () => {
    navigator.clipboard.writeText(`dpp.packtrack.eu/${dpp.id}`);
    alert("DPP share link copied to clipboard!");
  };

  return (
    <div className="space-y-6">
      
      {/* QUICK START GUIDE */}
      {showGuide && (
        <div className="bg-[#EAF3DE] border border-[#d2e7b9] rounded-xl p-5 shadow-sm text-text-primary transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <IconBook size={20} className="text-[#3B6D11] shrink-0" />
              <h3 className="text-sm font-bold text-[#3B6D11]">Digital Product Passport Quick-Start Guide</h3>
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
              <span className="text-xs font-bold text-[#3B6D11] block">1. Scan & Verify Passports</span>
              <p className="text-[11.5px] text-text-secondary leading-relaxed">
                Scan the dynamic QR code block or click &quot;Share DPP link&quot; to view the digital passport that consumers will scan in 2026.
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#3B6D11] block">2. Manage Declarations</span>
              <p className="text-[11.5px] text-text-secondary leading-relaxed">
                Every compliant packaging SKU requires a certified Declaration of Conformity (DoC). Click &quot;Download DoC&quot; to check standard specs.
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#3B6D11] block">3. Track Completeness Gaps</span>
              <p className="text-[11.5px] text-text-secondary leading-relaxed">
                Ensure chemical safety and carbon footprint files are fully uploaded. Click items in the completeness card to audit raw specs.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MICRO-ENTERPRISE WAIVER NOTIFICATION BANNER */}
      {actorTypes.microEnterprise && (
        <div className="bg-[#e0f2fe] border border-[#bae6fd] rounded-xl p-5 shadow-sm text-text-primary flex items-start gap-4 transition-all duration-300">
          <IconAlertCircle size={28} className="text-[#0284c7] shrink-0 mt-0.5" />
          <div className="space-y-1.5">
            <h3 className="text-sm font-bold text-[#0284c7]">Digital Product Passport (DPP) Exemption Active</h3>
            <p className="text-[11.5px] text-text-secondary leading-relaxed">
              Under <strong>PPWR Article 13 Regulation</strong>, micro-enterprise operators placing packaging on the EU market are exempt from generating consumer-facing Digital Product Passports and declarations of conformity (DoCs). 
              Your material specifications are logged for base supply chain compliance, but all active public passport generation processes are currently waived.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* PASSPORT DETAILS */}
        <Card className={`relative overflow-hidden ${actorTypes.microEnterprise ? "opacity-75" : ""}`}>
          
          {/* EXEMPT OVERLAY FOR MICRO-ENTERPRISES */}
          {actorTypes.microEnterprise && (
            <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px] flex items-center justify-center pointer-events-none select-none z-10">
              <div className="transform rotate-[-12deg] border-4 border-dashed border-[#0284c7]/40 rounded-xl px-6 py-3 font-mono text-[#0284c7] font-bold text-lg bg-bg-primary/95 shadow-lg uppercase tracking-widest">
                Exempt — Art. 13 Waiver
              </div>
            </div>
          )}

          <CardTitle action={<InfoHelper text="Official EU digital record showing material details, recyclability grade, and manufacturing location." />}>
            Digital Product Passport — PKG-1041
          </CardTitle>
          
          <div className="text-center py-4">
            <div className="w-[100px] h-[100px] bg-[#E6F1FB] border border-dashed border-[#185FA5] rounded-lg mx-auto flex flex-col items-center justify-center text-[11px] text-[#185FA5] font-semibold leading-normal">
              <IconQrcode size={24} className="mb-1 shrink-0" />
              <span>QR CODE</span>
              <span>PKG-1041</span>
            </div>
            <div className="text-[11px] text-text-tertiary mt-2 font-medium">Scan → dpp.packtrack.eu/PKG-1041</div>
          </div>

          <table className="w-full text-left text-[13px] mt-4 border-collapse">
            <tbody>
              {[
                ["Package ID", <span key="pkg-id" className="font-semibold text-text-primary">{dpp.id}</span>],
                ["Material", <span key="mat" className="font-medium">{dpp.material}</span>],
                ["Recyclability", <Grade key="grade" grade={dpp.grade} />],
                ["Recycled content", <span key="recycled" className="font-medium">{dpp.recycled}</span>],
                ["Manufacturer", <span key="mfg" className="font-medium">{dpp.manufacturer}</span>],
                ["Country of origin", <span key="origin" className="font-medium">{dpp.origin}</span>],
                ["Carbon footprint", <span key="carbon" className="font-medium">{dpp.carbon}</span>],
                ["DoC reference", <span key="doc-ref" className="text-[#378ADD] font-semibold cursor-pointer">{dpp.doc}</span>],
                ["Last updated", <span key="updated" className="font-medium">{dpp.updated}</span>],
              ].map(([k, v], idx) => (
                <tr key={idx} className="border-b border-border-tertiary/40 last:border-0">
                  <td className="py-2.5 text-xs text-text-secondary font-medium w-40">{k}</td>
                  <td className="py-2.5 text-[13px] font-semibold text-text-primary">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Btn 
              primary 
              className="flex-1 w-full sm:w-auto" 
              onClick={downloadDoC}
              disabled={actorTypes.microEnterprise}
            >
              <IconFileDownload size={14} className="shrink-0" />
              <span>Download DoC</span>
            </Btn>
            <Btn 
              className="flex-1 w-full sm:w-auto" 
              onClick={shareDPP}
              disabled={actorTypes.microEnterprise}
            >
              <IconShare size={14} className="shrink-0" />
              <span>Share DPP link</span>
            </Btn>
          </div>
        </Card>

        {/* RECYCLING LABEL & COMPLETENESS */}
        <div className="space-y-6">
          <Card>
            <CardTitle action={<InfoHelper text="Standardized recycling label designed to guide end consumers on proper disposal streams." />}>
              Consumer recycling label
            </CardTitle>
            <div className="bg-bg-secondary border border-border-tertiary rounded-lg p-5 text-center flex flex-col items-center justify-center">
              <IconRecycle size={42} className="text-[#1D9E75] mb-2 shrink-0" />
              <div className="font-semibold text-base text-text-primary">Rinse and recycle</div>
              <div className="text-xs text-text-secondary mt-1 font-medium">Glass collection bin · Widely recycled</div>
              <div className="text-[11px] text-text-tertiary mt-2.5 font-medium">Remove cap before disposal</div>
            </div>
          </Card>

          {/* DYNAMIC DATA COMPLETENESS CARD */}
          <Card className={actorTypes.microEnterprise ? "opacity-75" : ""}>
            <CardTitle action={<InfoHelper text="Verifies if all required chemical, carbon, material, and safety files are uploaded and certified." />}>
              Data completeness
            </CardTitle>
            <div className="space-y-3 mt-2">
              {completeness.map((c, i) => (
                <div 
                  key={i} 
                  className="flex justify-between items-center text-[13px] border-b border-border-tertiary/40 pb-2.5 last:border-0 last:pb-0 p-1.5 rounded-lg hover:bg-bg-secondary transition-all"
                >
                  <div className="space-y-0.5">
                    <span className="text-text-secondary font-semibold block">{c.label}</span>
                    <span className="text-[10px] text-text-tertiary font-medium">{c.desc}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={actorTypes.microEnterprise ? "success" : c.status === "Complete" ? "success" : "warning"}>
                      {actorTypes.microEnterprise ? "Exempt" : c.status}
                    </Badge>
                    <button
                      type="button"
                      onClick={() => setSelectedCompletenessDetails(c)}
                      className="text-[10.5px] font-bold text-[#185FA5] hover:text-[#378ADD] bg-bg-info/60 hover:bg-bg-info border border-transparent hover:border-[#bae6fd] px-2 py-1 rounded cursor-pointer transition-all active:scale-95 shrink-0"
                    >
                      Audit Report ↗
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

      </div>

      {/* COMPLETENESS AUDIT DETAILS MODAL */}
      {selectedCompletenessDetails && (
        <div className="fixed inset-0 bg-[#0f172a]/45 backdrop-blur-xs z-50 flex items-center justify-center p-4 transition-all duration-300">
          <div className="bg-bg-primary rounded-xl border border-border-tertiary p-6 max-w-2xl w-full shadow-2xl relative transition-all duration-200 animate-in fade-in zoom-in-95">
            {/* Close button */}
            <button 
              onClick={() => setSelectedCompletenessDetails(null)}
              className="absolute top-4 right-4 text-text-tertiary hover:text-text-primary hover:bg-bg-secondary p-1.5 rounded-lg cursor-pointer transition-colors"
              aria-label="Close completeness modal"
            >
              <IconX size={18} />
            </button>

            {/* Header */}
            <div className="flex items-center gap-2 border-b border-border-tertiary pb-3.5 mb-4">
              <IconCertificate size={22} className="text-[#3b6d11] shrink-0" />
              <h3 className="text-base font-bold text-text-primary">Completeness Audit Ledger — {selectedCompletenessDetails.label}</h3>
              <Badge variant={actorTypes.microEnterprise ? "info" : selectedCompletenessDetails.status === "Complete" ? "success" : "warning"}>
                {actorTypes.microEnterprise ? "Exempt / N/A" : selectedCompletenessDetails.status}
              </Badge>
            </div>

            {/* Content */}
            <div className="space-y-4 text-xs">
              
              <div className="bg-bg-secondary p-4 rounded-xl border border-border-tertiary/60 space-y-1.5">
                <div className="font-bold text-text-primary">Passport Completeness Parameter:</div>
                <div className="text-text-secondary leading-relaxed font-medium">{selectedCompletenessDetails.desc}</div>
              </div>

              {/* Dynamic details inside the modal */}
              {selectedCompletenessDetails.id === "material" && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="bg-bg-secondary p-3 rounded-lg border border-border-tertiary/40">
                      <div className="text-[10px] font-bold text-text-tertiary uppercase">Material composition</div>
                      <div className="text-[13px] font-bold text-text-primary mt-1">Clear Soda-Lime Glass</div>
                    </div>
                    <div className="bg-bg-secondary p-3 rounded-lg border border-border-tertiary/40">
                      <div className="text-[10px] font-bold text-text-tertiary uppercase">Mass balance trace</div>
                      <div className="text-[13px] font-bold text-[#15803d] mt-1">100% Verified ✓</div>
                    </div>
                  </div>

                  <Table headers={["Chemical Element", "Weight ratio (%)", "Sourcing Facility", "REACH status"]}>
                    <Tr>
                      <Td className="font-semibold">Silica (SiO₂)</Td>
                      <Td className="font-mono">72.1%</Td>
                      <Td>Vetri SpA, IT</Td>
                      <Td><Badge variant="success">Vetted</Badge></Td>
                    </Tr>
                    <Tr>
                      <Td className="font-semibold">Soda Ash (Na₂O)</Td>
                      <Td className="font-mono">13.2%</Td>
                      <Td>SABIC monomers, DE</Td>
                      <Td><Badge variant="success">Vetted</Badge></Td>
                    </Tr>
                    <Tr>
                      <Td className="font-semibold">Lime (CaO)</Td>
                      <Td className="font-mono">9.3%</Td>
                      <Td>Local mineral mines</Td>
                      <Td><Badge variant="success">Vetted</Badge></Td>
                    </Tr>
                    <Tr>
                      <Td className="font-semibold">Alumina / Magnesia</Td>
                      <Td className="font-mono">5.4%</Td>
                      <Td>Nordic materials</Td>
                      <Td><Badge variant="success">Vetted</Badge></Td>
                    </Tr>
                  </Table>

                  <div className="p-3 rounded-lg bg-[#EAF3DE] text-[#3B6D11] border border-[#d2e7b9] font-medium leading-relaxed">
                    ✓ Material data fully recorded: 100% of polymer/glass compositions have been successfully validated through Amcor & Vetri laboratory spec audits.
                  </div>
                </div>
              )}

              {selectedCompletenessDetails.id === "recyclability" && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="bg-bg-secondary p-3 rounded-lg border border-border-tertiary/40">
                      <div className="text-[10px] font-bold text-text-tertiary uppercase">Recyclability Grade</div>
                      <div className="text-[13px] font-bold text-text-primary mt-1">Grade A (Excellent)</div>
                    </div>
                    <div className="bg-bg-secondary p-3 rounded-lg border border-border-tertiary/40">
                      <div className="text-[10px] font-bold text-text-tertiary uppercase">NIR sort detection</div>
                      <div className="text-[13px] font-bold text-[#15803d] mt-1">Organic Inks (Compliant)</div>
                    </div>
                  </div>

                  <Table headers={["Audited Attribute", "Specification Details", "Compliance Level"]}>
                    <Tr>
                      <Td className="font-semibold">Main material</Td>
                      <Td>Soda-lime glass (Widely recycled)</Td>
                      <Td><Badge variant="success">Grade A</Badge></Td>
                    </Tr>
                    <Tr>
                      <Td className="font-semibold">Inks & adhesives</Td>
                      <Td>Water-soluble organic adhesives (NIR compliant)</Td>
                      <Td><Badge variant="success">Grade A</Badge></Td>
                    </Tr>
                    <Tr>
                      <Td className="font-semibold">Closure / Cap</Td>
                      <Td>Softwood Presentation cork (Removed before sorting)</Td>
                      <Td><Badge variant="success">Grade B</Badge></Td>
                    </Tr>
                  </Table>

                  <div className="p-3 rounded-lg bg-[#EAF3DE] text-[#3B6D11] border border-[#d2e7b9] font-medium leading-relaxed">
                    ✓ Recyclability validated: Calculations checked under PPWR Annex II recyclability criteria. Clear glass reaches Grade A (&gt;95% recyclability threshold).
                  </div>
                </div>
              )}

              {selectedCompletenessDetails.id === "carbon" && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="bg-bg-secondary p-3 rounded-lg border border-border-tertiary/40">
                      <div className="text-[10px] font-bold text-text-tertiary uppercase">Total Greenhouse Gases</div>
                      <div className="text-[13px] font-bold text-[#185FA5] mt-1">0.48 kg CO₂e / packaging unit</div>
                    </div>
                    <div className="bg-bg-secondary p-3 rounded-lg border border-border-tertiary/40">
                      <div className="text-[10px] font-bold text-text-tertiary uppercase">Audit Standard</div>
                      <div className="text-[13px] font-bold text-text-primary mt-1">ISO 14067 Certified</div>
                    </div>
                  </div>

                  <Table headers={["Lifecycle Stage", "Carbon Contribution (kg CO₂e)", "Sourcing Node", "Audited"]}>
                    <Tr>
                      <Td className="font-semibold">Raw silica sand mining</Td>
                      <Td className="font-mono">0.08 kg CO₂e</Td>
                      <Td>Quarzwerke, Padova</Td>
                      <Td><Badge variant="success">Vetted</Badge></Td>
                    </Tr>
                    <Tr>
                      <Td className="font-semibold">Glass melting & forming</Td>
                      <Td className="font-mono">0.28 kg CO₂e</Td>
                      <Td>Vetri Italia SpA</Td>
                      <Td><Badge variant="success">Vetted</Badge></Td>
                    </Tr>
                    <Tr>
                      <Td className="font-semibold">Pallet transport logistics</Td>
                      <Td className="font-mono">0.12 kg CO₂e</Td>
                      <Td>DHL Freight DE</Td>
                      <Td><Badge variant="success">Vetted</Badge></Td>
                    </Tr>
                  </Table>

                  <div className="p-3 rounded-lg bg-bg-info text-[#185FA5] border border-bg-info/30 font-medium leading-relaxed">
                    ✓ Carbon footprint vetted: Life cycle greenhouse gas analysis successfully completed and registered on May 25, 2026.
                  </div>
                </div>
              )}

              {selectedCompletenessDetails.id === "eol" && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="bg-bg-secondary p-3 rounded-lg border border-border-tertiary/40">
                      <div className="text-[10px] font-bold text-text-tertiary uppercase">Target Recycled Rate</div>
                      <div className="text-[13px] font-bold text-text-primary mt-1">82% (EU average)</div>
                    </div>
                    <div className="bg-bg-secondary p-3 rounded-lg border border-[#f59e0b]/20 text-[#854F0B]">
                      <div className="text-[10px] font-bold text-[#854F0B] uppercase">Audit Gap</div>
                      <div className="text-[13px] font-bold mt-1">Partial Tracing Loop</div>
                    </div>
                  </div>

                  <Table headers={["Member State Target", "PRO Sorting Agency", "Mass balance trail", "Status"]}>
                    <Tr>
                      <Td className="font-semibold">Germany (DE)</Td>
                      <Td>LUCID / PRO Europa</Td>
                      <Td className="font-mono">ISO 14001, PRO registers</Td>
                      <Td><Badge variant="success">Vetted</Badge></Td>
                    </Tr>
                    <Tr>
                      <Td className="font-semibold">France (FR)</Td>
                      <Td>Citeo sorting centers</Td>
                      <Td className="font-mono">Citeo mass balance logs</Td>
                      <Td><Badge variant="success">Vetted</Badge></Td>
                    </Tr>
                    <Tr>
                      <Td className="font-semibold">Poland (PL)</Td>
                      <Td>BDO Sorting Warsaw</Td>
                      <Td className="font-mono text-text-tertiary italic">Registry logs missing</Td>
                      <Td><Badge variant="danger">Gap Detected</Badge></Td>
                    </Tr>
                  </Table>

                  <div className="p-3 rounded-lg bg-[#FAECE7] text-[#993C1D] border border-[#fbcfe8] font-medium leading-relaxed flex items-start gap-1.5">
                    <IconAlertTriangle size={16} className="shrink-0 mt-0.5" />
                    <span>⚠️ Data loop incomplete: Structural gap detected. Polish municipal sorting centers lack mass-balance trails for recycling verification. Exporter alert active.</span>
                  </div>
                </div>
              )}

              {selectedCompletenessDetails.id === "chemical" && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="bg-bg-secondary p-3 rounded-lg border border-border-tertiary/40">
                      <div className="text-[10px] font-bold text-text-tertiary uppercase">Additives SVHC check</div>
                      <div className="text-[13px] font-bold text-[#15803d] mt-1">0% Content (Compliant ✓)</div>
                    </div>
                    <div className="bg-bg-secondary p-3 rounded-lg border border-border-tertiary/40">
                      <div className="text-[10px] font-bold text-text-tertiary uppercase">EFSA Food suitability</div>
                      <div className="text-[13px] font-bold text-text-primary mt-1">Approved #EFSA-2025-IT903</div>
                    </div>
                  </div>

                  <Table headers={["Safety Criteria", "Tolerance limit", "Vetted level", "Status"]}>
                    <Tr>
                      <Td className="font-semibold">REACH SVHC additives</Td>
                      <Td>&lt; 0.1% w/w</Td>
                      <Td className="font-mono">0.00% (SVHC-free)</Td>
                      <Td><Badge variant="success">Compliant</Badge></Td>
                    </Tr>
                    <Tr>
                      <Td className="font-semibold">Heavy metals (Pb/Cd/Cr)</Td>
                      <Td>&lt; 100 ppm</Td>
                      <Td className="font-mono">&lt; 15 ppm</Td>
                      <Td><Badge variant="success">Compliant</Badge></Td>
                    </Tr>
                    <Tr>
                      <Td className="font-semibold">Migration test limits</Td>
                      <Td>&lt; 10 mg/dm²</Td>
                      <Td className="font-mono">&lt; 1.2 mg/dm²</Td>
                      <Td><Badge variant="success">Compliant</Badge></Td>
                    </Tr>
                  </Table>

                  <div className="p-3 rounded-lg bg-[#EAF3DE] text-[#3B6D11] border border-[#d2e7b9] font-medium leading-relaxed">
                    ✓ Safety Certified: Conforms to European Food Safety Authority (EFSA) and REACH guidelines for contact-sensitive materials. No hazardous pigments detected.
                  </div>
                </div>
              )}

            </div>

            {/* Footer */}
            <div className="flex justify-end gap-2.5 border-t border-border-tertiary pt-4 mt-5">
              <Btn onClick={() => setSelectedCompletenessDetails(null)}>
                <span>Dismiss Audit</span>
              </Btn>
              {selectedCompletenessDetails.id === "eol" && (
                <Btn primary onClick={() => {
                  setSelectedCompletenessDetails(null);
                  alert("Rerouting to Exporter PRO Module to register Warsaw sorting centers...");
                }}>
                  <span>Fix Recycler Gaps</span>
                </Btn>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
