"use client";
import { useState, Fragment } from "react";
import { useCompliance } from "@/components/ComplianceContext";
import { Card, CardTitle, Grade, Td, ProgressBar, Badge, Btn, InfoHelper } from "@/components/ui";
import {
  IconDownload, IconChevronDown, IconChevronUp, IconBook,
  IconUpload, IconBrain, IconHierarchy, IconCircleCheck,
  IconAlertTriangle, IconRefresh, IconArrowRight, IconX, IconFileSpreadsheet
} from "@tabler/icons-react";

export default function Recyclability() {
  const { skus, setSkus, updateSkuLink } = useCompliance();
  const [expandedSkuId, setExpandedSkuId] = useState(null);
  const [showGuide, setShowGuide] = useState(true);
  
  // Local filter states
  const [selectedType, setSelectedType] = useState("All packaging types");
  const [selectedGrade, setSelectedGrade] = useState("All grades");
  
  // Bulk Modal states
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkStep, setBulkStep] = useState(1); // 1: Upload, 2: Parsing/AI, 3: Review, 4: Success
  const [bulkStatus, setBulkStatus] = useState("");
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  
  // Pending review SKUs in modal
  const [pendingSkus, setPendingSkus] = useState([
    { id: "PKG-1023", name: "Flexible snack pouch", suggested_type: "primary", material: "Multi-layer", confidence: 99 },
    { id: "PKG-SEC-502", name: "Plastic Shrink Wrap 6-pack (Yogurt)", suggested_type: "secondary", material: "LDPE Film", confidence: 96 },
    { id: "PKG-TER-902", name: "Stretch Logistics Wrap (Heavy-duty)", suggested_type: "tertiary", material: "LLDPE Film", confidence: 94 },
    { id: "PKG-SRV-202", name: "Polystyrene Takeaway Box", suggested_type: "service", material: "Polystyrene", confidence: 98 }
  ]);

  // Linkage drawer states
  const [tempParentId, setTempParentId] = useState("");

  const toggleRow = (id, currentParentId) => {
    if (expandedSkuId === id) {
      setExpandedSkuId(null);
    } else {
      setExpandedSkuId(id);
      setTempParentId(currentParentId || "");
    }
  };

  const openReclassifyModal = () => {
    setBulkStep(1);
    setIsAiProcessing(false);
    setBulkStatus("");
    setShowBulkModal(true);
  };

  const handleSimulatedUpload = () => {
    setBulkStep(2);
    setIsAiProcessing(true);
    setBulkStatus("Analyzing lamination specs and density logs...");

    setTimeout(() => {
      setBulkStatus("Parsing SKU text descriptions for packaging formats...");
      setTimeout(() => {
        setBulkStatus("Checking chemical certifications & polymer records...");
        setTimeout(() => {
          setIsAiProcessing(false);
          setBulkStep(3); // Go to review step
        }, 800);
      }, 700);
    }, 600);
  };

  const handlePendingTypeChange = (skuId, type) => {
    setPendingSkus(prev => 
      prev.map(item => item.id === skuId ? { ...item, suggested_type: type } : item)
    );
  };

  const applyBulkReclassification = () => {
    // Modify global context state
    setSkus(prev => 
      prev.map(sku => {
        const matched = pendingSkus.find(item => item.id === sku.id);
        if (matched) {
          return {
            ...sku,
            packaging_type: matched.suggested_type,
            status: "Compliant" // Make them active / reviewed
          };
        }
        return sku;
      })
    );
    
    setBulkStep(4); // Success step
    setTimeout(() => {
      setShowBulkModal(false);
    }, 2000);
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

        {/* BULK RECLASSIFICATION PORTAL ACTIVATOR */}
        <Btn 
          primary 
          onClick={openReclassifyModal}
          className="w-full sm:w-auto shadow-sm"
        >
          <IconUpload size={14} className="shrink-0 animate-bounce" />
          <span>Bulk SKU Reclassification Tool</span>
        </Btn>
      </div>

      {/* FULLY WORKING BULK SKUS RECLASSIFICATION MODAL OVERLAY */}
      {showBulkModal && (
        <div className="fixed inset-0 bg-[#0f172a]/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 transition-opacity duration-300">
          <div className="bg-bg-primary rounded-xl border border-border-tertiary shadow-2xl max-w-2xl w-full flex flex-col overflow-hidden max-h-[85vh]">
            
            {/* Modal Header */}
            <div className="bg-[#1D9E75] text-white p-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <IconBrain size={20} className="animate-pulse" />
                <div>
                  <h3 className="text-sm font-bold">AI SKU Taxonomy Reclassification Portal</h3>
                  <p className="text-[10px] text-white/80 font-medium">Reclassifies packaging records into primary, secondary, tertiary, or service packaging types.</p>
                </div>
              </div>
              <button 
                onClick={() => setShowBulkModal(false)} 
                className="text-white/80 hover:text-white cursor-pointer p-1 rounded hover:bg-white/10"
              >
                <IconX size={18} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5 select-none">
              
              {/* Step Process Indicators */}
              <div className="flex items-center justify-between border-b border-border-tertiary/60 pb-3 text-[10px] font-bold uppercase tracking-wider text-text-tertiary">
                <span className={bulkStep === 1 ? "text-[#1D9E75]" : ""}>1. Upload Portfolio</span>
                <IconArrowRight size={12} />
                <span className={bulkStep === 2 ? "text-[#1d9e75]" : ""}>2. AI Processing</span>
                <IconArrowRight size={12} />
                <span className={bulkStep === 3 ? "text-[#1D9E75]" : ""}>3. Review Suggestions</span>
                <IconArrowRight size={12} />
                <span className={bulkStep === 4 ? "text-[#1D9E75]" : ""}>4. Success</span>
              </div>

              {/* STEP 1: UPLOAD PORTFOLIO */}
              {bulkStep === 1 && (
                <div className="space-y-4 text-xs">
                  <p className="text-text-secondary leading-relaxed">
                    Upload your SKU portfolio spreadsheet to audit classifications. The PackTrack AI model evaluates polymer lamination descriptions, dimensional profiles, and thickness metrics to map items to their compliant categories.
                  </p>
                  
                  <div 
                    onClick={handleSimulatedUpload}
                    className="border-2 border-dashed border-border-secondary hover:border-[#1D9E75]/60 bg-bg-secondary p-8 rounded-xl text-center flex flex-col items-center justify-center cursor-pointer hover:bg-bg-primary transition-all duration-300 group"
                  >
                    <IconFileSpreadsheet size={36} className="text-text-tertiary group-hover:text-[#1D9E75] mb-2 transition-colors duration-200" />
                    <span className="font-bold text-text-primary text-sm group-hover:text-[#1D9E75]">Upload Simulated SKU Excel Template</span>
                    <span className="text-[10px] text-text-tertiary mt-1">Contains 4 misclassified raw SKUs needing regulatory evaluation</span>
                  </div>
                </div>
              )}

              {/* STEP 2: AI PROCESSING */}
              {bulkStep === 2 && (
                <div className="py-8 flex flex-col items-center justify-center text-center space-y-4">
                  <IconRefresh size={36} className="text-[#1D9E75] animate-spin" />
                  <div className="space-y-1">
                    <strong className="text-sm font-bold text-text-primary">PackTrack AI Parser Running</strong>
                    <p className="text-xs text-text-secondary">Evaluating raw materials data against PPWR Article 4 directives...</p>
                  </div>
                  <div className="w-64 p-3.5 rounded-lg border bg-bg-secondary border-border-tertiary text-xs font-semibold text-[#15803d]">
                    {bulkStatus}
                  </div>
                </div>
              )}

              {/* STEP 3: REVIEW AI SUGGESTIONS */}
              {bulkStep === 3 && (
                <div className="space-y-4 text-xs">
                  <p className="text-text-secondary leading-relaxed">
                    Verify suggestions below. You can override suggestions using the dropdown selectors before saving.
                  </p>

                  <div className="border border-border-tertiary rounded-xl overflow-hidden max-h-60 overflow-y-auto">
                    <Table headers={["SKU", "Description", "Raw Material", "Suggested Taxonomy", "Confidence"]}>
                      {pendingSkus.map(p => (
                        <Tr key={p.id}>
                          <Td className="font-mono font-bold text-text-tertiary">{p.id}</Td>
                          <Td className="font-semibold text-text-primary">{p.name}</Td>
                          <Td className="font-medium text-text-secondary">{p.material}</Td>
                          <Td>
                            <select
                              value={p.suggested_type}
                              onChange={(e) => handlePendingTypeChange(p.id, e.target.value)}
                              className="font-sans text-[11px] font-semibold bg-bg-secondary border border-border-secondary rounded px-2.5 py-1 text-text-primary cursor-pointer outline-none focus:border-[#1D9E75]"
                            >
                              <option value="primary">primary</option>
                              <option value="secondary">secondary</option>
                              <option value="tertiary">tertiary</option>
                              <option value="service">service</option>
                            </select>
                          </Td>
                          <Td>
                            <span className="bg-[#EAF3DE] text-[#3B6D11] text-[10px] font-bold px-2 py-0.5 rounded-[4px]">
                              {p.confidence}% AI
                            </span>
                          </Td>
                        </Tr>
                      ))}
                    </Table>
                  </div>

                  <div className="flex gap-2 justify-end pt-2 shrink-0">
                    <Btn onClick={() => setBulkStep(1)}>Back</Btn>
                    <Btn primary onClick={applyBulkReclassification}>
                      Approve & Apply Taxonomy changes
                    </Btn>
                  </div>
                </div>
              )}

              {/* STEP 4: SUCCESS */}
              {bulkStep === 4 && (
                <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
                  <div className="w-12 h-12 bg-bg-success rounded-full flex items-center justify-center text-[#15803d]">
                    <IconCircleCheck size={32} />
                  </div>
                  <strong className="text-sm font-bold text-[#15803d]">Taxonomy Applied Successfully!</strong>
                  <p className="text-xs text-text-secondary max-w-sm">
                    The 4 pending packaging configurations have been saved to your global SKU database. The Recyclability pages are dynamically updated!
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* SKU DATA TABLE */}
      <Card>
        <CardTitle action={
          <div className="hidden md:flex items-center gap-3 text-xs font-normal text-text-secondary select-none">
            <span className="flex items-center gap-1.5"><Badge variant="default">Primary</Badge> Direct product contact</span>
            <span className="flex items-center gap-1.5"><Badge variant="info">Secondary</Badge> Multipacks/sleeves</span>
            <span className="flex items-center gap-1.5"><Badge variant="warning">Tertiary</Badge> Transport wrap/straps</span>
            <span className="flex items-center gap-1.5"><Badge variant="danger">Service</Badge> POS cups/bags</span>
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
                      <Td className="font-mono text-xs text-text-tertiary font-semibold">{s.id}</Td>
                      <Td className="font-semibold text-text-primary">{s.name}</Td>
                      <Td>
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
                                
                                <div className="flex items-center gap-3 bg-bg-secondary p-3 rounded-lg border border-border-tertiary/40">
                                  <div className="space-y-1 flex-1">
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
                                    className="self-end h-[32px]"
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
