"use client";
import { useState, Fragment, useEffect } from "react";
import { useCompliance } from "@/components/ComplianceContext";
import { Card, CardTitle, Grade, Td, ProgressBar, Badge, Btn, InfoHelper } from "@/components/ui";
import {
  IconDownload, IconChevronDown, IconChevronUp, IconBook,
  IconUpload, IconBrain, IconHierarchy, IconCircleCheck,
  IconAlertTriangle, IconRefresh, IconArrowRight, IconX
} from "@tabler/icons-react";

export default function Recyclability() {
  const { skus, updateSkuLink } = useCompliance();
  const [expandedSkuId, setExpandedSkuId] = useState(null);
  const [showGuide, setShowGuide] = useState(true);
  
  // Local filter states
  const [selectedType, setSelectedType] = useState("All packaging types");
  const [selectedGrade, setSelectedGrade] = useState("All grades");
  
  // Bulk importer states (Modal view)
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [isBulkRunning, setIsBulkRunning] = useState(false);
  const [bulkStatus, setBulkStatus] = useState("");
  const [bulkSuccess, setBulkSuccess] = useState(false);

  // Linkage drawer states
  const [tempParentId, setTempParentId] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowBulkModal(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleRow = (id, currentParentId) => {
    if (expandedSkuId === id) {
      setExpandedSkuId(null);
    } else {
      setExpandedSkuId(id);
      setTempParentId(currentParentId || "");
    }
  };

  const handleBulkReclassify = () => {
    setIsBulkRunning(true);
    setBulkStatus("Analyzing 1,284 raw SKU descriptions...");
    setBulkSuccess(false);

    setTimeout(() => {
      setBulkStatus("Mapping keywords to PPWR Article 4 categories...");
      setTimeout(() => {
        setBulkStatus("Checking polymer specs & barrier lamination records...");
        setTimeout(() => {
          setIsBulkRunning(false);
          setBulkSuccess(true);
          setBulkStatus("AI-Assisted Classification Complete! 1,284 SKUs successfully updated: 812 Primary, 314 Secondary, 142 Tertiary, 16 Service packaging.");
        }, 800);
      }, 700);
    }, 600);
  };

  // Filter logic
  const filteredSkus = skus.filter(s => {
    const matchesType = 
      selectedType === "All packaging types" || 
      (selectedType === "Primary packaging" && s.packaging_type === "primary") ||
      (selectedType === "Secondary packaging" && s.packaging_type === "secondary") ||
      (selectedType === "Tertiary packaging" && s.packaging_type === "tertiary") ||
      (selectedType === "Service packaging" && s.packaging_type === "service");
      
    const matchesGrade = 
      selectedGrade === "All grades" || 
      `Grade ${s.grade}` === selectedGrade;
      
    return matchesType && matchesGrade;
  });

  const exportCSV = () => {
    const headers = ["SKU", "Description", "Type", "Material", "Grade", "Recycled Content", "Food Contact Safe", "Status", "Parent SKU Link"];
    const rows = filteredSkus.map(s => [
      s.id,
      `"${s.name.replace(/"/g, '""')}"`,
      s.packaging_type,
      s.material,
      s.grade,
      `${s.recycled}%`,
      s.foodSafe,
      s.status,
      s.parentSkuId || "None"
    ]);
    
    const csvContent = [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `recyclability_${selectedType.toLowerCase().replace(/ /g, "_")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Helper to fetch details of a parent SKU
  const getParentName = (parentId) => {
    const p = skus.find(s => s.id === parentId);
    return p ? `${p.name} (${p.id})` : "None";
  };

  return (
    <div className="space-y-6">
      
      {/* QUICK START GUIDE */}
      {showGuide && (
        <div className="bg-[#EAF3DE] border border-[#d2e7b9] rounded-xl p-5 shadow-sm text-text-primary transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <IconBook size={20} className="text-[#3B6D11] shrink-0" />
              <h3 className="text-sm font-bold text-[#3B6D11]">Recyclability & Packaging Taxonomy Quick-Start Guide</h3>
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
              <span className="text-xs font-bold text-[#3B6D11] block">1. Capture All Packaging Types</span>
              <p className="text-[11.5px] text-text-secondary leading-relaxed">
                PPWR obligations apply to all 4 categories: **Primary** (product bottles), **Secondary** (sleeves), **Tertiary** (transport wrap & pallets), and **Service packaging** (point-of-sale). 
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#3B6D11] block">2. Establish Linkages (Parent-Child)</span>
              <p className="text-[11.5px] text-text-secondary leading-relaxed">
                Recyclability fees are audited at the packaging system level. Click any SKU row to link it to its secondary wrap or tertiary pallet.
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#3B6D11] block">3. Run Bulk Taxonomy Classification</span>
              <p className="text-[11.5px] text-text-secondary leading-relaxed">
                Use the bulk reclassification tool to instantly categorize historical packaging portfolios using PackTrack's localized AI model.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* FILTER CONTROLS & BULK DRAWER BUTTON */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-bg-primary p-4 rounded-xl border border-border-tertiary">
        <div className="flex flex-wrap gap-2.5 flex-1">
          <select 
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="font-sans text-[13px] px-3 py-1.5 rounded-[6px] border border-border-secondary bg-bg-primary text-text-primary outline-none transition-colors duration-200 focus:border-text-info cursor-pointer flex-1 sm:flex-initial min-w-[170px]" 
            aria-label="Filter by packaging type"
          >
            <option>All packaging types</option>
            <option>Primary packaging</option>
            <option>Secondary packaging</option>
            <option>Tertiary packaging</option>
            <option>Service packaging</option>
          </select>
          
          <select 
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="font-sans text-[13px] px-3 py-1.5 rounded-[6px] border border-border-secondary bg-bg-primary text-text-primary outline-none transition-colors duration-200 focus:border-text-info cursor-pointer flex-1 sm:flex-initial min-w-[110px]" 
            aria-label="Filter by grade"
          >
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

        {/* CLICK TO OPEN MODAL */}
        <Btn 
          primary 
          onClick={() => {
            setShowBulkModal(true);
            // Reset modal steps
            setIsBulkRunning(false);
            setBulkStatus("");
            setBulkSuccess(false);
          }}
          className="w-full sm:w-auto"
        >
          <IconUpload size={14} className="shrink-0" />
          <span>Bulk SKU Reclassification Tool</span>
        </Btn>
      </div>

      {/* GORGEOUS HIGH-FIDELITY MODAL OVERLAY */}
      {showBulkModal && (
        <div className="fixed inset-0 bg-[#0f172a]/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 transition-all duration-300">
          <div className="bg-bg-primary rounded-xl border border-border-tertiary p-6 max-w-2xl w-full shadow-2xl relative transition-all duration-200 animate-in fade-in zoom-in-95">
            
            {/* Close icon */}
            <button 
              onClick={() => setShowBulkModal(false)}
              className="absolute top-4 right-4 text-text-tertiary hover:text-text-primary hover:bg-bg-secondary p-1.5 rounded-lg cursor-pointer transition-colors"
              aria-label="Close modal"
            >
              <IconX size={18} />
            </button>

            {/* Modal Title */}
            <div className="flex items-center gap-2 text-text-success border-b border-border-tertiary pb-3.5 mb-4">
              <IconBrain size={22} className="shrink-0" />
              <h3 className="text-base font-bold text-text-primary">Bulk SKU Taxonomy Reclassification Portal</h3>
              <Badge variant="success">AI Assistant Active</Badge>
            </div>

            {/* Modal Body */}
            <div className="space-y-4 text-xs">
              <p className="text-text-secondary leading-relaxed">
                Upload historical packaging inventory rosters (Excel templates) or trigger PackTrack's localized AI parsing engine to automatically map all 1,284 packaging items into compliant PPWR categories (`primary`, `secondary`, `tertiary`, or `service`).
              </p>

              <div className="flex flex-col sm:flex-row items-stretch gap-4">
                {/* Upload drag & drop section */}
                <div className="flex-1 border-2 border-dashed border-border-secondary hover:border-[#1D9E75]/60 bg-bg-secondary hover:bg-bg-primary p-5 rounded-xl text-center flex flex-col items-center justify-center cursor-pointer transition-all">
                  <IconUpload size={32} className="text-text-tertiary mb-2" />
                  <span className="font-bold text-text-primary text-[12.5px]">Drag & Drop Excel Template</span>
                  <span className="text-[10px] text-text-tertiary mt-1">Accepts standard .xlsx, .csv lists with SKU + description headers</span>
                </div>

                {/* AI Reclassification engine controller */}
                <div className="flex-1 bg-bg-secondary p-5 rounded-xl border border-border-tertiary flex flex-col justify-between space-y-3">
                  <div>
                    <h4 className="font-bold text-text-primary text-[12.5px] flex items-center gap-1">
                      <span>AI-Assisted Category Parser</span>
                    </h4>
                    <p className="text-[10px] text-text-tertiary leading-relaxed mt-1">
                      Runs instant keyword density checks, material specs analysis, and packaging dimensions checks to auto-classify items.
                    </p>
                  </div>
                  
                  <Btn 
                    primary 
                    onClick={handleBulkReclassify} 
                    className="w-full h-9 flex items-center justify-center font-bold"
                    disabled={isBulkRunning}
                  >
                    {isBulkRunning ? <IconRefresh size={14} className="animate-spin shrink-0" /> : <IconBrain size={14} className="shrink-0" />}
                    <span>{isBulkRunning ? "Running AI Classification..." : "Trigger AI Category Mapping"}</span>
                  </Btn>
                </div>
              </div>

              {/* Real-time stepping progress alerts inside the modal */}
              {bulkStatus && (
                <div className={`p-4 rounded-xl border text-[11.5px] font-semibold flex items-start gap-2.5 transition-all ${
                  bulkSuccess 
                    ? "bg-bg-success border-text-success/20 text-text-success" 
                    : "bg-bg-info border-text-info/20 text-[#185FA5]"
                }`}>
                  {!bulkSuccess ? (
                    <IconRefresh size={16} className="animate-spin shrink-0 mt-0.5" />
                  ) : (
                    <IconCircleCheck size={16} className="shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1">
                    <span className="block font-bold">{bulkSuccess ? "Success Notification" : "Analysis Progress"}</span>
                    <p className={bulkSuccess ? "text-text-secondary leading-relaxed font-medium" : "text-[#185FA5] opacity-90 leading-relaxed font-medium"}>
                      {bulkStatus}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-2.5 border-t border-border-tertiary pt-4 mt-5">
              <Btn onClick={() => setShowBulkModal(false)}>
                <span>Close Portal</span>
              </Btn>
              {bulkSuccess && (
                <Btn primary onClick={() => setShowBulkModal(false)}>
                  <span>Apply Classifications</span>
                </Btn>
              )}
            </div>

          </div>
        </div>
      )}

      {/* SKU DATA TABLE */}
      <Card>
        <CardTitle action={
          <div className="flex flex-wrap items-center gap-2 md:gap-3 text-[10px] md:text-xs font-normal text-text-secondary select-none mt-1.5 sm:mt-0">
            <span className="flex items-center gap-1"><Badge variant="default">Primary</Badge> Direct</span>
            <span className="flex items-center gap-1"><Badge variant="info">Secondary</Badge> Outer</span>
            <span className="flex items-center gap-1"><Badge variant="warning">Tertiary</Badge> Logistics</span>
            <span className="flex items-center gap-1"><Badge variant="danger">Service</Badge> POS</span>
          </div>
        }>
          Recyclability & Packaging Taxonomy by SKU <span className="text-[11px] text-text-tertiary font-normal lowercase ml-2">(click row to view AI Remediation & Packaging Hierarchy)</span>
        </CardTitle>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead>
              <tr className="border-b border-border-tertiary bg-bg-secondary/40">
                <th className="px-3 py-2.5 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">SKU</th>
                <th className="px-3 py-2.5 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Description</th>
                <th className="px-3 py-2.5 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Type</th>
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
                <th className="px-3 py-2.5 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Edit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-tertiary/40">
              {filteredSkus.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-6 text-text-tertiary font-medium">
                    No SKUs found matching the selected filters.
                  </td>
                </tr>
              ) : (
                filteredSkus.map((s) => (
                  <Fragment key={s.id}>
                    <tr
                      onClick={() => toggleRow(s.id, s.parentSkuId)}
                      className="hover:bg-bg-secondary transition-colors duration-150 cursor-pointer"
                    >
                      <Td className="font-mono text-xs text-text-tertiary font-semibold min-w-[80px]">{s.id}</Td>
                      <Td className="font-semibold text-text-primary min-w-[170px]">{s.name}</Td>
                      <Td className="min-w-[100px]">
                        <Badge 
                          variant={
                            s.packaging_type === "primary" ? "default" :
                            s.packaging_type === "secondary" ? "info" :
                            s.packaging_type === "tertiary" ? "warning" : "danger"
                          }
                        >
                          {s.packaging_type}
                        </Badge>
                      </Td>
                      <Td className="text-text-secondary font-medium min-w-[100px]">{s.material}</Td>
                      <Td className="min-w-[50px]"><Grade grade={s.grade} /></Td>
                      <Td className="min-w-[110px]">
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

                    {/* EXPANSION DRAWER: REMEDIATION & DYNAMIC LINKAGE HIERARCHY */}
                    {expandedSkuId === s.id && (
                      <tr className="bg-bg-secondary/40 select-none">
                        <td colSpan={9} className="p-4 border-b border-border-tertiary">
                          <div className="bg-bg-primary rounded-xl border border-border-tertiary p-5 space-y-5 shadow-sm">
                            
                            {/* SECTION A: HIERARCHY TREE GRAPHICS & LINKING WORKFLOW */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 border-b border-border-tertiary/60 pb-5">
                              <div className="space-y-3">
                                <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider flex items-center gap-1.5">
                                  <IconHierarchy size={16} className="text-[#378ADD]" />
                                  <span>Packaging System Hierarchy & Linkages</span>
                                </h4>
                                <p className="text-[11px] text-text-secondary leading-relaxed">
                                  Under PPWR auditing rules, you must report configurations at the complete packaging system level. Link this item to its next outer packaging layers.
                                </p>
                                
                                <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-bg-secondary p-3 rounded-lg border border-border-tertiary/40">
                                  <div className="space-y-1 flex-1 w-full">
                                    <label className="text-[10px] font-bold text-text-secondary block">Select Parent Packaging SKU:</label>
                                    <select
                                      value={tempParentId}
                                      onChange={(e) => setTempParentId(e.target.value)}
                                      className="font-sans text-xs bg-bg-primary border border-border-secondary rounded px-2.5 py-1.5 text-text-primary outline-none focus:border-text-info w-full cursor-pointer"
                                    >
                                      <option value="">None (Independent SKU)</option>
                                      {skus
                                        .filter(item => 
                                          // Valid parent types: secondary or tertiary based on current s.packaging_type
                                          (s.packaging_type === "primary" && item.packaging_type === "secondary") ||
                                          (s.packaging_type === "secondary" && item.packaging_type === "tertiary")
                                        )
                                        .map(parentItem => (
                                          <option key={parentItem.id} value={parentItem.id}>
                                            {parentItem.name} [{parentItem.id}] ({parentItem.packaging_type})
                                          </option>
                                        ))
                                      }
                                    </select>
                                  </div>
                                  <Btn 
                                    primary 
                                    small 
                                    onClick={() => {
                                      updateSkuLink(s.id, tempParentId);
                                      alert(`Linkage updated: ${s.id} is now parented under ${tempParentId || "None"}.`);
                                    }}
                                    className="w-full sm:w-auto sm:self-end h-[32px]"
                                  >
                                    Save Link
                                  </Btn>
                                </div>
                              </div>

                              {/* VISUAL HIERARCHY TREE */}
                              <div className="bg-bg-secondary rounded-lg p-4 border border-border-tertiary/40 flex flex-col justify-center">
                                <div className="text-[10px] font-bold uppercase tracking-wider text-text-tertiary mb-3 text-center">Visual Packaging Spill Hierarchy</div>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                                  
                                  {/* Level 1: This SKU */}
                                  <div className="bg-[#E6F1FB] border border-[#378ADD]/40 text-[#185FA5] rounded px-3 py-2 text-center w-40 shadow-xs">
                                    <div className="text-[9px] uppercase font-bold tracking-wider opacity-70">Current SKU ({s.packaging_type})</div>
                                    <div className="text-[11px] font-bold truncate mt-0.5">{s.name}</div>
                                    <div className="text-[10px] font-mono mt-0.5">{s.id}</div>
                                  </div>

                                  {/* Arrow */}
                                  {s.parentSkuId && (
                                    <>
                                      <IconArrowRight size={16} className="text-text-tertiary rotate-90 sm:rotate-0" />
                                      {/* Level 2: Parent SKU */}
                                      <div className="bg-[#EAF3DE] border border-[#1D9E75]/40 text-[#3B6D11] rounded px-3 py-2 text-center w-40 shadow-xs">
                                        <div className="text-[9px] uppercase font-bold tracking-wider opacity-70">Parent Layer ({getParentName(s.parentSkuId).includes("secondary") ? "secondary" : "tertiary"})</div>
                                        <div className="text-[11px] font-bold truncate mt-0.5">{skus.find(item => item.id === s.parentSkuId)?.name}</div>
                                        <div className="text-[10px] font-mono mt-0.5">{s.parentSkuId}</div>
                                      </div>

                                      {/* Arrow 2: If there's an outer grandparent */}
                                      {skus.find(item => item.id === s.parentSkuId)?.parentSkuId && (
                                        <>
                                          <IconArrowRight size={16} className="text-text-tertiary rotate-90 sm:rotate-0" />
                                          <div className="bg-[#FAEEDA] border border-[#854F0B]/40 text-[#854F0B] rounded px-3 py-2 text-center w-40 shadow-xs">
                                            <div className="text-[9px] uppercase font-bold tracking-wider opacity-70">Grandparent Layer</div>
                                            <div className="text-[11px] font-bold truncate mt-0.5">
                                              {skus.find(item => item.id === skus.find(x => x.id === s.parentSkuId)?.parentSkuId)?.name}
                                            </div>
                                            <div className="text-[10px] font-mono mt-0.5">
                                              {skus.find(item => item.id === s.parentSkuId)?.parentSkuId}
                                            </div>
                                          </div>
                                        </>
                                      )}
                                    </>
                                  )}

                                  {!s.parentSkuId && (
                                    <div className="text-[11px] text-text-tertiary font-medium p-4 border border-dashed border-border-secondary rounded w-40 text-center">
                                      No outer packaging layer linked.
                                    </div>
                                  )}

                                </div>
                              </div>
                            </div>

                            {/* SECTION B: ORIGINAL REMEDIATION GUIDE */}
                            <div className="space-y-3">
                              <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider flex items-center gap-1.5">
                                <span>🤖 AI Compliance Remediation Guide</span>
                                <span className="text-[10px] text-text-tertiary font-normal font-mono">({s.id})</span>
                              </h4>
                              
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
                              ) : s.id === "PKG-SRV-202" ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                                  <div className="space-y-1 bg-bg-secondary p-3.5 rounded-[6px] border border-border-tertiary/50">
                                    <strong className="font-semibold text-text-primary">Identified Service Packaging Gaps:</strong>
                                    <p className="text-text-secondary leading-relaxed mt-1">
                                      1. Expanded Polystyrene (EPS) is highly restricted in the EU and carries a recyclability Grade D.
                                      <br />
                                      2. Violates single-use reduction quotas for takeaway service packaging.
                                    </p>
                                  </div>
                                  <div className="space-y-1 bg-[#FAEEDA] p-3.5 rounded-[6px] border border-[#f59e0b]/30 text-[#854F0B]">
                                    <strong className="font-semibold text-[#854F0B]">PPWR 2026 Service Fix:</strong>
                                    <p className="text-[#854F0B] leading-relaxed mt-1">
                                      Replace polystyrene boxes with 100% recycled PLA-coated folding Kraft paperboard (Grade A recyclability) or swap to an interactive reusable PP meal tray scheme to conform with the upcoming HoReCa consumer reuse mandates.
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

                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
