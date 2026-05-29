"use client";
import { useState } from "react";
import { reports, filings } from "@/lib/data";
import { Card, CardTitle, Badge, Btn, Table, Tr, Td, InfoHelper } from "@/components/ui";
import { IconFileAnalytics, IconSignature, IconArchive, IconBinary, IconDownload, IconBook } from "@tabler/icons-react";

export default function Reporting() {
  const [showGuide, setShowGuide] = useState(true);
  
  const scores = [
    { label: "Recyclability", value: "61%" },
    { label: "Recycled content", value: "34%" },
    { label: "Traceability", value: "84%" },
    { label: "Documentation", value: "91%" },
  ];

  // Map report names to Tabler Icons
  const reportIcons = {
    "Q2 2026 PPWR Report": IconFileAnalytics,
    "EU Declaration of Conformity": IconSignature,
    "Technical documentation": IconArchive,
    "Mass balance audit trail": IconBinary,
  };

  const handleAction = (reportName) => {
    const reportText = `PACKTRACK REGULATORY COMPLIANCE SYSTEM
Report Name: ${reportName}
Timestamp: ${new Date().toLocaleString()}
Overall Compliance Score: 78%

Key Metrics:
- Recyclability: 61%
- Recycled Content: 34%
- Traceability: 84%
- Documentation: 91%

Status: Generated Successfully

This document serves as the regulatory declaration draft under PPWR standards.`;
    
    const blob = new Blob([reportText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${reportName.toLowerCase().replace(/ /g, "_")}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadFiling = (filingName, period) => {
    const fileText = `PACKTRACK HISTORICAL FILING RECORD
Report Name: ${filingName}
Period: ${period}
Authority: ${filingName.includes("Annual") ? "European Commission" : "BfR Germany"}
Status: ARCHIVED AND ACCEPTED

This is a validated historical compliance record copy downloaded from the PackTrack EU vault.`;
    
    const blob = new Blob([fileText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filingName.toLowerCase().replace(/ /g, "_")}_${period.toLowerCase().replace(/ /g, "_")}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrepare = () => {
    alert("Preparing Q2 2026 PPWR Report... Aggregating supplier data and packaging recyclability logs.");
  };

  return (
    <div className="space-y-6">
      {/* QUICK START GUIDE */}
      {showGuide && (
        <div className="bg-[#EAF3DE] border border-[#d2e7b9] rounded-xl p-5 shadow-sm text-text-primary transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <IconBook size={20} className="text-[#3B6D11] shrink-0" />
              <h3 className="text-sm font-bold text-[#3B6D11]">Regulatory Reporting Quick-Start Guide</h3>
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
              <span className="text-xs font-bold text-[#3B6D11] block">1. Check compliance indices</span>
              <p className="text-[11.5px] text-text-secondary leading-relaxed">
                Review scores for recyclability, recycled fraction, custody trace, and documents to target and repair weaknesses.
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#3B6D11] block">2. Compile Official Drafts</span>
              <p className="text-[11.5px] text-text-secondary leading-relaxed">
                Use dynamic compilers to generate Q2 PPWR reports, declarations (DoCs), mass balance trails, or technical folders.
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#3B6D11] block">3. Archive for Five Years</span>
              <p className="text-[11.5px] text-text-secondary leading-relaxed">
                PPWR mandates holding technical files and signed declarations for 5 years. View or download historical filings in the archive below.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardTitle action={<InfoHelper text="Aggregated overall compliance indicator combining recyclability scores, supplier certificates, and traceability indexes." />}>
            Compliance score summary
          </CardTitle>
          <div className="text-center py-6">
            <div className="text-[52px] font-bold text-text-primary leading-none">
              78<span className="text-2xl text-text-secondary font-medium">%</span>
            </div>
            <div className="text-xs font-semibold text-text-secondary mt-2.5">Overall PPWR compliance score</div>
            
            <div className="grid grid-cols-2 gap-3 mt-6 text-left">
              {scores.map((s, idx) => (
                <div key={idx} className="text-xs bg-bg-secondary p-3 rounded-[6px] border border-border-tertiary">
                  <span className="text-text-secondary font-medium">{s.label}</span>
                  <strong className="block text-sm text-text-primary font-bold mt-1">{s.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <CardTitle action={<InfoHelper text="Automated compiler tools to export technical documentation sheets and Declarations of Conformity (DoCs)." />}>
            Report generation
          </CardTitle>
          <div className="space-y-2.5">
            {reports.map((r, i) => {
              const IconComp = reportIcons[r.name] || IconFileAnalytics;
              return (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-bg-secondary rounded-[6px] border border-border-tertiary">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <IconComp size={18} className="text-text-info shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <div className="text-[13px] font-semibold text-text-primary truncate">{r.name}</div>
                      <div className="text-[11px] text-text-tertiary mt-1 font-medium leading-normal">{r.sub}</div>
                    </div>
                  </div>
                  <Btn small primary={r.primary} onClick={() => handleAction(r.name)} className="w-full sm:w-auto">
                    {r.btn}
                  </Btn>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <Card>
        <CardTitle action={<InfoHelper text="Archive ledger showing submitted, pending, and ecodesign filing records with state authorities." />}>
          Historical filings
        </CardTitle>
        <Table headers={["Report", "Period", "Authority", "Filed", "Status", "Actions"]}>
          {filings.map((f, i) => (
            <Tr key={i}>
              <Td className="font-semibold text-text-primary">{f.name}</Td>
              <Td className="text-text-secondary font-medium">{f.period}</Td>
              <Td className="text-text-secondary font-medium">{f.authority}</Td>
              <Td className="text-text-secondary font-medium">{f.filed}</Td>
              <Td>
                <Badge variant={f.status === "Accepted" ? "success" : "warning"}>
                  {f.status}
                </Badge>
              </Td>
              <Td>
                {f.status === "Accepted" ? (
                  <Btn small className="inline-flex items-center gap-1" onClick={() => handleDownloadFiling(f.name, f.period)}>
                    <IconDownload size={12} className="shrink-0" />
                    <span>Download</span>
                  </Btn>
                ) : (
                  <Btn small primary onClick={handlePrepare}>
                    <span>Prepare</span>
                  </Btn>
                )}
              </Td>
            </Tr>
          ))}
        </Table>
      </Card>
    </div>
  );
}
