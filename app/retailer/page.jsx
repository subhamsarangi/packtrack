"use client";
import { useState } from "react";
import { useCompliance } from "@/components/ComplianceContext";
import { Card, CardTitle, Table, Tr, Td, Badge, Btn, InfoHelper } from "@/components/ui";
import {
  IconBuildingStore, IconInbox, IconFileText, IconCirclePlus,
  IconArrowRight, IconShare, IconPercentage, IconScale, IconCheck,
  IconAlertTriangle, IconRotateClockwise
} from "@tabler/icons-react";

export default function RetailerDistributor() {
  const { 
    distributorDocs, addDistributorDoc, 
    horecaData, updateHoreca, skus 
  } = useCompliance();
  
  // Local state for uploading new DoC
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSkuId, setNewSkuId] = useState("PKG-1001");
  const [newSupplier, setNewSupplier] = useState("Vetri Italia SpA");
  const [newFilename, setNewFilename] = useState("DoC_GlassGlass_Vetri.pdf");

  const handleAddDoc = (e) => {
    e.preventDefault();
    if (!newSupplier || !newFilename) return;

    const newDoc = {
      id: `DOC-2026-0${distributorDocs.length + 1}`,
      skuId: newSkuId,
      filename: newFilename,
      uploadedBy: newSupplier,
      date: "Today · Manual upload",
      retention: "5 years (Active)",
      size: "245 KB",
      status: "Verified"
    };

    addDistributorDoc(newDoc);
    setShowAddForm(false);
    setNewFilename("");
    alert(`Success: Downstream DoC registered for SKU ${newSkuId}.`);
  };

  const handleForwardDoc = (id) => {
    navigator.clipboard.writeText(`doc-pass.packtrack.eu/${id}`);
    alert(`DoC pass-through link copied to clipboard! (doc-pass.packtrack.eu/${id})`);
  };

  // HoReCa percentage calculations
  const totalCups = horecaData.singleUseCups + horecaData.reusableCups;
  const totalBoxes = horecaData.singleUseBoxes + horecaData.reusableBoxes;
  
  const cupReusePct = totalCups > 0 ? Math.round((horecaData.reusableCups / totalCups) * 100) : 0;
  const boxReusePct = totalBoxes > 0 ? Math.round((horecaData.reusableBoxes / totalBoxes) * 100) : 0;
  
  // Total reuse aggregate
  const totalUnits = totalCups + totalBoxes;
  const totalReusables = horecaData.reusableCups + horecaData.reusableBoxes;
  const overallReusePct = totalUnits > 0 ? Math.round((totalReusables / totalUnits) * 100) : 0;

  const handleVolumeChange = (field, delta) => {
    updateHoreca({
      [field]: Math.max(0, horecaData[field] + delta)
    });
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-[#993C1D] to-[#BA7517] text-white rounded-xl p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <IconBuildingStore size={28} className="shrink-0" />
          <div>
            <h3 className="text-base font-bold">Distributor & Retailer Regulatory Workflows</h3>
            <p className="text-[12px] opacity-90 leading-relaxed max-w-4xl mt-1">
              PPWR imposes strict direct rules on distributors (mandatory custody transfer & 5-year secure preservation of Declarations of Conformity) and retailers (HoReCa packaging reuse targets: 10% reusable drink cups and takeaway containers by 2030).
            </p>
          </div>
        </div>
      </div>

      {/* COMPONENT GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* DISTRIBUTOR DOC PASS-THROUGH INBOX */}
        <div className="space-y-6">
          <Card>
            <div className="flex items-center justify-between border-b border-border-tertiary pb-3 mb-4">
              <CardTitle action={<Badge variant="info">Distributor Inbox</Badge>}>
                <div className="flex items-center gap-1.5">
                  <IconInbox className="text-[#854F0B] shrink-0" size={18} />
                  <span>Upstream DoC Ingestion & Retention Logs</span>
                </div>
              </CardTitle>
              <Btn small primary onClick={() => setShowAddForm(!showAddForm)}>
                <IconCirclePlus size={12} className="shrink-0" />
                <span>Upload Upstream DoC</span>
              </Btn>
            </div>

            {/* MOCK UPLOAD FORM */}
            {showAddForm && (
              <form onSubmit={handleAddDoc} className="mb-5 p-4 rounded-xl border border-[#bae6fd] bg-[#e0f2fe]/30 space-y-3.5 text-xs">
                <div className="font-bold text-text-primary">Register Incoming Manufacturer DoC</div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-text-secondary block">Select SKU portfolio:</label>
                    <select
                      value={newSkuId}
                      onChange={(e) => setNewSkuId(e.target.value)}
                      className="font-sans text-xs bg-bg-primary border border-border-secondary rounded px-2.5 py-1 text-text-primary outline-none focus:border-text-info w-full cursor-pointer"
                    >
                      {skus.map(s => (
                        <option key={s.id} value={s.id}>{s.name} [{s.id}]</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-text-secondary block">Supplier manufacturer:</label>
                    <input
                      type="text"
                      value={newSupplier}
                      onChange={(e) => setNewSupplier(e.target.value)}
                      className="font-sans text-xs bg-bg-primary border border-border-secondary rounded px-2.5 py-1 text-text-primary outline-none focus:border-text-info w-full"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-text-secondary block">File name:</label>
                    <input
                      type="text"
                      value={newFilename}
                      onChange={(e) => setNewFilename(e.target.value)}
                      className="font-sans text-xs bg-bg-primary border border-border-secondary rounded px-2.5 py-1 text-text-primary outline-none focus:border-text-info w-full"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Btn primary small type="submit">Confirm & Register</Btn>
                  <Btn small onClick={() => setShowAddForm(false)}>Cancel</Btn>
                </div>
              </form>
            )}

            <p className="text-xs text-text-secondary leading-relaxed mb-4">
              Distributors must verify and maintain DoC sheets for a minimum of 5 years from date of placement on market. Copy the pass-through token links below to forward certified bundles to retail customers.
            </p>

            <Table headers={["DoC Ref", "Target SKU", "Supplier Manufacturer", "Ingestion Details", "Preservation", "Actions"]}>
              {distributorDocs.map((doc) => (
                <Tr key={doc.id}>
                  <Td className="font-mono text-xs font-bold text-text-primary">{doc.id}</Td>
                  <Td>
                    <div className="space-y-0.5">
                      <div className="font-semibold text-text-primary text-[12.5px]">{skus.find(s => s.id === doc.skuId)?.name || "Unknown packaging"}</div>
                      <span className="font-mono text-[10px] text-text-tertiary font-bold">{doc.skuId}</span>
                    </div>
                  </Td>
                  <Td className="text-text-secondary font-medium">{doc.uploadedBy}</Td>
                  <Td>
                    <div className="space-y-0.5 text-[11px] text-text-secondary">
                      <div>{doc.date}</div>
                      <span className="text-[9.5px] text-text-tertiary font-medium font-mono">{doc.size}</span>
                    </div>
                  </Td>
                  <Td>
                    <span className="text-[11px] font-semibold text-[#15803d] flex items-center gap-1">
                      <IconRotateClockwise size={12} className="shrink-0" />
                      <span>{doc.retention}</span>
                    </span>
                  </Td>
                  <Td>
                    <Btn small onClick={() => handleForwardDoc(doc.id)} className="flex items-center gap-1">
                      <IconShare size={12} className="shrink-0" />
                      <span>Forward</span>
                    </Btn>
                  </Td>
                </Tr>
              ))}
            </Table>
          </Card>
        </div>

        {/* HORECA SERVICE PACKAGING REUSE TRACKING */}
        <div className="space-y-6">
          <Card className="border-[#993C1D]/30">
            <CardTitle action={<Badge variant="danger">PPWR 2030 Mandate</Badge>}>
              <div className="flex items-center gap-1.5">
                <IconPercentage className="text-[#993C1D] shrink-0" size={18} />
                <span>HoReCa Service Packaging Reuse Calculator</span>
              </div>
            </CardTitle>

            <div className="space-y-5 text-xs">
              <p className="text-text-secondary leading-relaxed">
                Food-service retailers placing service packaging (cups, bowls, takeaway boxes) at point-of-sale must track and report single-use vs. reusable volume ratios. Adjust monthly quantities below.
              </p>

              {/* CONTROLLERS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Cold/Hot Beverage Cups */}
                <div className="bg-bg-secondary p-4 rounded-xl border border-border-tertiary/60 space-y-3">
                  <div className="font-bold text-text-primary text-[13px] border-b border-border-tertiary/40 pb-1.5 flex items-center justify-between">
                    <span>Beverage Cups & Lid Formats</span>
                    <Badge variant="info">{cupReusePct}% Reuse Rate</Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary font-medium">Single-use cups (k units):</span>
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleVolumeChange("singleUseCups", -5)} className="w-6 h-6 rounded bg-bg-primary border border-border-secondary hover:bg-border-tertiary flex items-center justify-center font-bold cursor-pointer">-</button>
                        <span className="font-mono font-bold w-9 text-center text-text-primary">{horecaData.singleUseCups}k</span>
                        <button onClick={() => handleVolumeChange("singleUseCups", 5)} className="w-6 h-6 rounded bg-bg-primary border border-border-secondary hover:bg-border-tertiary flex items-center justify-center font-bold cursor-pointer">+</button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary font-medium">Reusable cups (k units):</span>
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleVolumeChange("reusableCups", -1)} className="w-6 h-6 rounded bg-bg-primary border border-border-secondary hover:bg-border-tertiary flex items-center justify-center font-bold cursor-pointer">-</button>
                        <span className="font-mono font-bold w-9 text-center text-[#15803d]">{horecaData.reusableCups}k</span>
                        <button onClick={() => handleVolumeChange("reusableCups", 1)} className="w-6 h-6 rounded bg-bg-primary border border-border-secondary hover:bg-border-tertiary flex items-center justify-center font-bold cursor-pointer">+</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Takeaway Food Boxes */}
                <div className="bg-bg-secondary p-4 rounded-xl border border-border-tertiary/60 space-y-3">
                  <div className="font-bold text-text-primary text-[13px] border-b border-border-tertiary/40 pb-1.5 flex items-center justify-between">
                    <span>Takeaway Food Boxes / Trays</span>
                    <Badge variant="info">{boxReusePct}% Reuse Rate</Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary font-medium">Single-use boxes (k units):</span>
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleVolumeChange("singleUseBoxes", -10)} className="w-6 h-6 rounded bg-bg-primary border border-border-secondary hover:bg-border-tertiary flex items-center justify-center font-bold cursor-pointer">-</button>
                        <span className="font-mono font-bold w-9 text-center text-text-primary">{horecaData.singleUseBoxes}k</span>
                        <button onClick={() => handleVolumeChange("singleUseBoxes", 10)} className="w-6 h-6 rounded bg-bg-primary border border-border-secondary hover:bg-border-tertiary flex items-center justify-center font-bold cursor-pointer">+</button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary font-medium">Reusable boxes (k units):</span>
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleVolumeChange("reusableBoxes", -1)} className="w-6 h-6 rounded bg-bg-primary border border-border-secondary hover:bg-border-tertiary flex items-center justify-center font-bold cursor-pointer">-</button>
                        <span className="font-mono font-bold w-9 text-center text-[#15803d]">{horecaData.reusableBoxes}k</span>
                        <button onClick={() => handleVolumeChange("reusableBoxes", 1)} className="w-6 h-6 rounded bg-bg-primary border border-border-secondary hover:bg-border-tertiary flex items-center justify-center font-bold cursor-pointer">+</button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* OVERALL REUSE PROGRESS BAR GAUGE */}
              <div className="bg-bg-secondary rounded-xl p-4 border border-border-tertiary/60 space-y-4">
                <div className="flex justify-between items-center border-b border-border-tertiary/40 pb-2">
                  <div>
                    <h4 className="font-bold text-text-primary text-[13px]">Overall Packaging Reuse Progression</h4>
                    <span className="text-[10px] text-text-tertiary font-medium">Aggregated reuse rate across all service SKUs</span>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-bold text-[#993C1D]">{overallReusePct}%</span>
                    <span className="text-[10px] text-text-tertiary font-medium block">of total units</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-bold text-text-tertiary">
                    <span>CURRENT REUSE: {overallReusePct}%</span>
                    <span className="text-[#993C1D]">PPWR 2030 GOAL: 10%</span>
                  </div>
                  <div className="w-full h-3 bg-bg-tertiary rounded-full overflow-hidden relative">
                    {/* Goal indicator line */}
                    <div className="absolute top-0 bottom-0 left-[10%] w-[2px] bg-red-500 z-10" title="PPWR 2030 Target (10%)" />
                    
                    {/* Active percentage progress bar */}
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${
                        overallReusePct >= 10 ? "bg-[#639922]" : "bg-[#BA7517]"
                      }`} 
                      style={{ width: `${Math.min(100, overallReusePct * 10)}%` }} 
                    />
                  </div>
                </div>

                <div className={`p-3 rounded-lg border text-xs font-semibold flex items-center gap-2.5 ${
                  overallReusePct >= 10 
                    ? "bg-[#EAF3DE] border-[#d2e7b9] text-[#3B6D11]" 
                    : "bg-[#FAECE7] border-[#fbcfe8] text-[#993C1D]"
                }`}>
                  {overallReusePct >= 10 ? <IconCheck size={16} /> : <IconAlertTriangle size={16} />}
                  <span>
                    {overallReusePct >= 10 
                      ? "✓ PPWR 2030 Mandate Satisfied! Current reuse rate is compliant." 
                      : "⚠️ Under Target: The organization is below the PPWR 2030 10% mandate. Switch more service items to reusable formats."
                    }
                  </span>
                </div>
              </div>

              {/* 2027 CONSUMER OPTION ENABLER SWITCH */}
              <div className="p-4 rounded-xl border border-border-tertiary flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="font-bold text-text-primary text-[13px] flex items-center gap-1.5">
                    <span>Consumer Reuse format option enabled</span>
                    <Badge variant={horecaData.consumerOptionEnabled ? "success" : "danger"}>
                      {horecaData.consumerOptionEnabled ? "Conforming" : "Overdue"}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-text-secondary leading-relaxed">
                    Under the 2027 HoReCa rules, food and drink outlets must allow consumers the option to bring their own reusable container at no extra charge.
                  </p>
                </div>
                
                <label className="relative inline-flex items-center cursor-pointer select-none shrink-0">
                  <input
                    type="checkbox"
                    checked={horecaData.consumerOptionEnabled}
                    onChange={() => updateHoreca({ consumerOptionEnabled: !horecaData.consumerOptionEnabled })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#993C1D]" />
                </label>
              </div>

            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
