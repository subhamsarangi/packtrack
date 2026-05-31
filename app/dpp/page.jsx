"use client";
import { useState } from "react";
import { useCompliance } from "@/components/ComplianceContext";
import { Card, CardTitle, Grade, Badge, Btn, InfoHelper } from "@/components/ui";
import { IconQrcode, IconFileDownload, IconShare, IconRecycle, IconBook, IconAlertCircle } from "@tabler/icons-react";

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
  { label: "Material data", status: "Complete" },
  { label: "Recyclability score", status: "Complete" },
  { label: "Carbon footprint", status: "Complete" },
  { label: "End-of-life data", status: "Partial" },
  { label: "Chemical safety cert", status: "Complete" },
];

export default function DPP() {
  const [showGuide, setShowGuide] = useState(true);
  const { actorTypes } = useCompliance();

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
                Ensure chemical safety and carbon footprint files are fully uploaded. Gaps here will block passport activations.
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

          <Card className={actorTypes.microEnterprise ? "opacity-75" : ""}>
            <CardTitle action={<InfoHelper text="Verifies if all required chemical, carbon, material, and safety files are uploaded and certified." />}>
              Data completeness
            </CardTitle>
            <div className="space-y-3 mt-2">
              {completeness.map((c, i) => (
                <div key={i} className="flex justify-between items-center text-[13px] border-b border-border-tertiary/40 pb-2.5 last:border-0 last:pb-0">
                  <span className="text-text-secondary font-medium">{c.label}</span>
                  <Badge variant={actorTypes.microEnterprise ? "success" : c.status === "Complete" ? "success" : "warning"}>
                    {actorTypes.microEnterprise ? "Exempt / N/A" : c.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
