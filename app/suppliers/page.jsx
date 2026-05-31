"use client";
import { useState, useEffect } from "react";
import { suppliers, supplierMetrics } from "@/lib/data";
import { Card, CardTitle, MetricCard, StatusDot, ProgressBar, Table, Tr, Td, Btn, InfoHelper, Grade, Badge } from "@/components/ui";
import { IconBook, IconX, IconCircleCheck, IconAlertCircle, IconMail, IconGlobe, IconFileText, IconSend, IconClock } from "@tabler/icons-react";

// Mapping of packaging SKUs to suppliers to display inside the details modal
const supplierSKUsMap = {
  "Amcor Italia": [
    { id: "PKG-1001", name: "Shampoo bottle 250ml", material: "HDPE", grade: "A", status: "Compliant" }
  ],
  "Vetri Italia SpA": [
    { id: "PKG-1041", name: "Olive oil bottle 1L", material: "Glass", grade: "A", status: "Compliant" }
  ],
  "Kronos GmbH": [
    { id: "PKG-1012", name: "Yogurt tub 500g", material: "PP", grade: "B", status: "Compliant" }
  ],
  "Nordic Pulp AB": [
    { id: "PKG-SEC-501", name: "Cardboard Carton Sleeve (Shampoo)", material: "Folding Boxboard", grade: "A", status: "Compliant" }
  ],
  "Alucán SA": [
    { id: "PKG-1055", name: "Beverage can 330ml", material: "Aluminium", grade: "A", status: "Compliant" }
  ],
  "Verpack NL": [
    { id: "PKG-1023", name: "Flexible snack pouch", material: "Multi-layer", grade: "D", status: "At risk" }
  ]
};

export default function Suppliers() {
  const [showGuide, setShowGuide] = useState(true);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedSupplier(null);
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
              <h3 className="text-sm font-bold text-[#3B6D11]">Supplier Management Quick-Start Guide</h3>
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
              <span className="text-xs font-bold text-[#3B6D11] block">1. Onboard Vetted Partners</span>
              <p className="text-[11.5px] text-text-secondary leading-relaxed">
                Connect raw materials suppliers and converters. Check current data sync status and Category labels (Glass, Rigid, etc.).
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#3B6D11] block">2. Monitor Quality fraction</span>
              <p className="text-[11.5px] text-text-secondary leading-relaxed">
                Data quality bars measure the completeness of safety sheets and PCR declarations. Target 85%+ quality.
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#3B6D11] block">3. Escalate Gaps Immediately</span>
              <p className="text-[11.5px] text-text-secondary leading-relaxed">
                Use &quot;Request&quot; or &quot;Escalate&quot; action triggers on underperforming, non-compliant partners to obtain overdue files.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* METRICS DASHBOARD GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {supplierMetrics.map((m) => {
          let tooltip = "";
          if (m.label === "Total suppliers") tooltip = "Total quantity of material converters, resin suppliers, and logistics partners catalogued in the system.";
          if (m.label === "Fully onboarded") tooltip = "Suppliers who have fully synchronized all mandatory material and safety declarations.";
          if (m.label === "Data gaps") tooltip = "Number of synchronized suppliers with pending or missing technical specifications and documents.";
          if (m.label === "Non-compliant") tooltip = "Partners who fail strict material recyclability threshold validations or chemical declarations.";
          
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

      <Card>
        <CardTitle action={<InfoHelper text="Comprehensive listing of connected converters, category classes, and documentation completeness scores." />}>
          Supplier compliance status
        </CardTitle>
        <Table headers={["Supplier", "Country", "Category", "Compliance", "Data quality", "Last sync", "Actions"]}>
          {suppliers.map((s) => {
            // Determine button label and styling based on status
            let btnLabel = "View";
            let btnClass = "";
            if (s.status === "Non-compliant") {
              if (s.name === "Verpack NL") {
                btnLabel = "Escalate";
                btnClass = "bg-bg-danger text-text-danger border-transparent hover:bg-[#fecaca]";
              } else {
                btnLabel = "Request";
                btnClass = "bg-bg-warning text-text-warning border-transparent hover:bg-[#fde68a]";
              }
            } else if (s.status === "Partial") {
              btnLabel = "Request";
              btnClass = ""; // default secondary style
            }

            return (
              <Tr key={s.name}>
                <Td className="font-semibold text-text-primary">{s.name}</Td>
                <Td className="text-text-secondary font-medium">{s.country}</Td>
                <Td className="text-text-secondary font-medium">{s.category}</Td>
                <Td className="font-semibold text-[13px] text-text-primary inline-flex items-center mt-1">
                  <StatusDot status={s.status} />
                  <span>{s.status}</span>
                </Td>
                <Td>
                  <ProgressBar value={s.quality} />
                </Td>
                <Td className="text-xs text-text-tertiary font-medium">{s.sync}</Td>
                <Td>
                  <Btn small className={btnClass} onClick={() => setSelectedSupplier(s)}>
                    {btnLabel}
                  </Btn>
                </Td>
              </Tr>
            );
          })}
        </Table>
      </Card>

      {/* HIGH-FIDELITY SUPPLIER DETAILS MODAL OVERLAY */}
      {selectedSupplier && (
        <div className="fixed inset-0 bg-[#0f172a]/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 transition-all duration-300">
          <div className="bg-bg-primary rounded-xl border border-border-tertiary p-6 max-w-3xl w-full shadow-2xl relative transition-all duration-200 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            
            {/* Close button */}
            <button 
              onClick={() => setSelectedSupplier(null)}
              className="absolute top-4 right-4 text-text-tertiary hover:text-text-primary hover:bg-bg-secondary p-1.5 rounded-lg cursor-pointer transition-colors"
              aria-label="Close modal"
            >
              <IconX size={18} />
            </button>

            {/* Header */}
            <div className="flex flex-wrap items-center gap-3 border-b border-border-tertiary pb-3.5 mb-4">
              <IconGlobe size={22} className="text-text-info shrink-0" />
              <div>
                <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                  <span>{selectedSupplier.name}</span>
                  <span className="text-xs font-normal text-text-tertiary">{selectedSupplier.country}</span>
                </h3>
                <span className="text-[11px] font-semibold text-text-secondary mt-0.5 block">{selectedSupplier.category} class converter</span>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <StatusDot status={selectedSupplier.status} />
                <span className="text-xs font-bold text-text-primary mr-2">{selectedSupplier.status}</span>
              </div>
            </div>

            {/* Body */}
            <div className="space-y-5 text-xs">
              
              {/* Dynamic Compliance Banner */}
              {selectedSupplier.status === "Compliant" ? (
                <div className="bg-[#EAF3DE] border border-[#d2e7b9] p-4 rounded-xl text-[#3B6D11] flex items-start gap-3">
                  <IconCircleCheck size={20} className="shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-bold text-[13px] block">Fully Synced & Verified Compliant</span>
                    <p className="text-text-secondary leading-relaxed font-medium">
                      All required declarations have been successfully updated and verified by our auditing protocol. No action is required.
                    </p>
                  </div>
                </div>
              ) : selectedSupplier.status === "Partial" ? (
                <div className="bg-bg-warning/30 border border-bg-warning/50 p-4 rounded-xl text-[#854F0B] flex items-start gap-3">
                  <IconClock size={20} className="shrink-0 mt-0.5 animate-pulse" />
                  <div className="space-y-1">
                    <span className="font-bold text-[13px] block">Document Upload Pending</span>
                    <p className="text-text-secondary leading-relaxed font-medium">
                      Data quality is currently at {selectedSupplier.quality}%. Upload the PCR Recycled Content Declaration sheet to restore full compliance and raise quality to the 85%+ target.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-[#FCEBEB] border border-[#fca5a5]/50 p-4 rounded-xl text-[#A32D2D] flex items-start gap-3">
                  <IconAlertCircle size={20} className="shrink-0 mt-0.5 animate-bounce" />
                  <div className="space-y-1">
                    <span className="font-bold text-[13px] block">Critical Gaps Detected</span>
                    <p className="text-text-secondary leading-relaxed font-medium">
                      Severe regulatory compliance risk. Synchronized data is overdue by {selectedSupplier.sync}. Heavy Metals tests and REACH certifications are missing or expired. Action is highly recommended.
                    </p>
                  </div>
                </div>
              )}

              {/* Grid Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Left Side: Supplier Profile */}
                <div className="space-y-3.5 bg-bg-secondary/40 p-4 rounded-xl border border-border-tertiary/40">
                  <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider">Performance Profile</h4>
                  
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-center py-1 border-b border-border-tertiary/20">
                      <span className="text-text-secondary font-medium">Origin</span>
                      <span className="font-bold text-text-primary">{selectedSupplier.country}</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-border-tertiary/20">
                      <span className="text-text-secondary font-medium">Category</span>
                      <span className="font-bold text-text-primary">{selectedSupplier.category}</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-border-tertiary/20">
                      <span className="text-text-secondary font-medium">Last Synchronized</span>
                      <span className="font-bold text-text-primary">{selectedSupplier.sync}</span>
                    </div>
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between items-center text-[11px] font-bold text-text-secondary">
                        <span>Data Completeness Score</span>
                        <span>{selectedSupplier.quality}%</span>
                      </div>
                      <ProgressBar value={selectedSupplier.quality} />
                    </div>
                  </div>
                </div>

                {/* Right Side: Document Audit Checklist */}
                <div className="space-y-3.5 bg-bg-secondary/40 p-4 rounded-xl border border-border-tertiary/40">
                  <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider">Documentation Checklist</h4>
                  
                  <div className="space-y-3">
                    {[
                      { 
                        name: "PPWR Article 4 Declaration", 
                        desc: "Essential recyclability requirement", 
                        status: selectedSupplier.status === "Non-compliant" ? "Missing" : "Verified" 
                      },
                      { 
                        name: "REACH SVHC Certificate", 
                        desc: "Substances of Very High Concern safety check", 
                        status: selectedSupplier.status === "Non-compliant" ? "Missing" : "Verified" 
                      },
                      { 
                        name: "PCR Content Declaration", 
                        desc: "EN 15343 recycled content audit", 
                        status: selectedSupplier.status === "Compliant" ? "Verified" : "Missing" 
                      },
                      { 
                        name: "Heavy Metals Lab Test", 
                        desc: "Compliance with 100ppm concentration limit", 
                        status: selectedSupplier.status === "Non-compliant" ? "Missing" : "Verified" 
                      }
                    ].map((doc, idx) => (
                      <div key={idx} className="flex justify-between items-start gap-2 border-b border-border-tertiary/20 pb-2 last:border-0 last:pb-0">
                        <div className="space-y-0.5">
                          <span className="font-bold text-text-primary block">{doc.name}</span>
                          <span className="text-[10px] text-text-tertiary leading-none block">{doc.desc}</span>
                        </div>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-[4px] shrink-0 ${
                          doc.status === "Verified" ? "bg-bg-success text-text-success" : "bg-bg-danger text-text-danger"
                        }`}>
                          {doc.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Supplied SKUs */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider">Supplied SKUs (PackTrack Catalog)</h4>
                <div className="border border-border-tertiary/60 rounded-xl overflow-hidden">
                  <Table headers={["SKU ID", "Description", "Material Type", "Recyclability Grade", "Status"]}>
                    {(supplierSKUsMap[selectedSupplier.name] || []).map((sku) => (
                      <Tr key={sku.id}>
                        <Td className="font-mono text-xs font-semibold text-text-tertiary">{sku.id}</Td>
                        <Td className="font-semibold text-text-primary">{sku.name}</Td>
                        <Td className="text-text-secondary font-medium">{sku.material}</Td>
                        <Td><Grade grade={sku.grade} /></Td>
                        <Td>
                          <Badge variant={sku.status === "Compliant" ? "success" : "warning"}>
                            {sku.status}
                          </Badge>
                        </Td>
                      </Tr>
                    ))}
                  </Table>
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="flex flex-wrap justify-end gap-2.5 border-t border-border-tertiary pt-4 mt-5">
              <Btn onClick={() => setSelectedSupplier(null)}>
                <span>Dismiss Details</span>
              </Btn>
              
              {selectedSupplier.status === "Compliant" ? (
                <Btn primary onClick={() => {
                  alert(`Downloading compliance dossier for ${selectedSupplier.name}...`);
                  setSelectedSupplier(null);
                }}>
                  <IconFileText size={14} className="shrink-0" />
                  <span>Download Audit PDF</span>
                </Btn>
              ) : selectedSupplier.status === "Partial" ? (
                <Btn primary onClick={() => {
                  alert(`Sending PCR Declaration upload reminder to ${selectedSupplier.name} representatives...`);
                  setSelectedSupplier(null);
                }}>
                  <IconMail size={14} className="shrink-0" />
                  <span>Send Upload Link</span>
                </Btn>
              ) : (
                <Btn primary className="bg-[#E24B4A] hover:bg-[#c93b3a] text-white border-transparent" onClick={() => {
                  alert(`Triggering escalation email and standard PPWR penalty warnings to ${selectedSupplier.name} executives...`);
                  setSelectedSupplier(null);
                }}>
                  <IconSend size={14} className="shrink-0" />
                  <span>Trigger Escalation Protocol</span>
                </Btn>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
