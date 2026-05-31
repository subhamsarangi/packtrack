"use client";
import { useState, useEffect } from "react";
import { useCompliance } from "@/components/ComplianceContext";
import { Card, CardTitle, ProgressBar, InfoHelper, Badge, Btn, Table, Tr, Td } from "@/components/ui";
import {
  IconBuildingFactory2, IconBox, IconTruck, IconBuildingStore,
  IconShoppingCart, IconRecycle, IconBook, IconPlus, IconArrowRight,
  IconMapPin, IconCertificate, IconBinary, IconHierarchy, IconRefresh,
  IconCpu, IconX, IconAlertTriangle
} from "@tabler/icons-react";

export default function Traceability() {
  const { skus } = useCompliance();
  const [showGuide, setShowGuide] = useState(true);
  
  // Selection states
  const [selectedSkuId, setSelectedSkuId] = useState("PKG-1041");
  const [selectedNodeIndex, setSelectedNodeIndex] = useState(null);
  const [selectedTierAuditDetails, setSelectedTierAuditDetails] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedTierAuditDetails(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  
  // Dynamic audits simulation
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditProgress, setAuditProgress] = useState("");
  const [tierCoverages, setTierCoverages] = useState({
    tier1: 100,
    tier2: 84,
    tier3: 51,
    eol: 38
  });

  // Dynamic Event logger state
  const [showEventForm, setShowEventForm] = useState(false);
  const [newEventText, setNewEventText] = useState("");
  const [newEventType, setNewEventType] = useState("IoT sensor");
  const [loggedEvents, setLoggedEvents] = useState([
    // ==========================================
    // 1. PKG-1041 (Olive oil bottle 1L) - COMPLETE CHAIN
    // ==========================================
    { skuId: "PKG-1041", color: "bg-[#639922]", text: "Glass melted & formed — Vetri Italia, Padova", meta: "Jan 12, 2026 · IoT sensor" },
    { skuId: "PKG-1041", color: "bg-[#378ADD]", text: "QC passed, RFID pallet tag 4412 sealed", meta: "Jan 14 · RFID scan" },
    { skuId: "PKG-1041", color: "bg-[#378ADD]", text: "Shipped to Brand Co. NL warehouse", meta: "Jan 16 · GPS track" },
    { skuId: "PKG-1041", color: "bg-[#BA7517]", text: "Filled, corked & labelled at Brand Co. NL", meta: "Jan 22 · ERP sync" },
    { skuId: "PKG-1041", color: "bg-[#639922]", text: "Retail distribution — 4 EU supermarket markets", meta: "Jan 25 · EDI" },
    { skuId: "PKG-1041", color: "bg-[#639922]", text: "Recycled cullet collected & sorted — Glass recycler AT", meta: "Feb 02 · Recycler log" },
    
    // ==========================================
    // 2. PKG-1012 (Yogurt tub 500g) - COMPLETE CHAIN
    // ==========================================
    { skuId: "PKG-1012", color: "bg-[#639922]", text: "Polymer granules converter thermoformed — Kronos GmbH, Frankfurt", meta: "Feb 10, 2026 · IoT sensor" },
    { skuId: "PKG-1012", color: "bg-[#639922]", text: "Chemical migration & food contact testing approved", meta: "Feb 12 · Cert verify" },
    { skuId: "PKG-1012", color: "bg-[#378ADD]", text: "Pallets dispatched to logistics center", meta: "Feb 14 · GPS track" },
    { skuId: "PKG-1012", color: "bg-[#378ADD]", text: "Arrived & stored in cold storage warehouse — Berlin", meta: "Feb 18 · RFID scan" },
    { skuId: "PKG-1012", color: "bg-[#BA7517]", text: "Filled & sealed with secondary sleeve shrink wrap", meta: "Feb 20 · ERP sync" },
    { skuId: "PKG-1012", color: "bg-[#639922]", text: "Delivered to Edeka Retail Co.", meta: "Feb 22 · EDI" },
    { skuId: "PKG-1012", color: "bg-[#639922]", text: "Post-consumer sorted, washed & shredded — sorting facility BE", meta: "Mar 01 · Recycler log" },

    // ==========================================
    // 3. PKG-1001 (Shampoo bottle 250ml) - INCOMPLETE CHAIN
    // ==========================================
    { skuId: "PKG-1001", color: "bg-[#639922]", text: "Resin extruded & HDPE bottles blown — Amcor Italia, Milano", meta: "Feb 02, 2026 · IoT sensor" },
    { skuId: "PKG-1001", color: "bg-[#378ADD]", text: "RFID pallet tag PKG-HD-001 sealed & registered", meta: "Feb 04 · RFID scan" },
    { skuId: "PKG-1001", color: "bg-[#378ADD]", text: "Arrived at Brand Co. Hamburg warehouse", meta: "Feb 08 · GPS track" },
    { skuId: "PKG-1001", color: "bg-[#BA7517]", text: "Shampoo formula filling & sleeve packaging linked", meta: "Feb 10 · ERP sync" },
    // Missing: Retail distribution and recycling loops (Incomplete!)

    // ==========================================
    // 4. PKG-SEC-502 (Plastic Shrink Wrap 6-pack) - INCOMPLETE CHAIN
    // ==========================================
    { skuId: "PKG-SEC-502", color: "bg-[#639922]", text: "LDPE film blown & rolled — Kronos GmbH, Frankfurt", meta: "Mar 10, 2026 · IoT sensor" },
    { skuId: "PKG-SEC-502", color: "bg-[#378ADD]", text: "Dispatched to Brand Co. Hamburg packaging line", meta: "Mar 12 · RFID scan" },
    // Missing: Storing, filling, shipping, recycling (Incomplete!)

    // ==========================================
    // 5. PKG-SRV-201 (PLA-Coated Paper Coffee Cup) - COMPLETE CHAIN
    // ==========================================
    { skuId: "PKG-SRV-201", color: "bg-[#639922]", text: "PLA extracted from renewable corn-starch mill — NatureWorks, US", meta: "Mar 01, 2026 · IoT sensor" },
    { skuId: "PKG-SRV-201", color: "bg-[#378ADD]", text: "FSC certified Kraft paperboard coated & formed — Sweden", meta: "Mar 05 · RFID scan" },
    { skuId: "PKG-SRV-201", color: "bg-[#BA7517]", text: "Distributed to point-of-sale Cafe branches, Amsterdam", meta: "Mar 12 · EDI" },
    { skuId: "PKG-SRV-201", color: "bg-[#639922]", text: "Consumer disposed of in organic compost bin", meta: "Mar 25 · User action" },
    { skuId: "PKG-SRV-201", color: "bg-[#639922]", text: "Composting cycle completed — EN 13432 compliant", meta: "Apr 10 · Recycler log" },

    // ==========================================
    // 6. PKG-1023 (Flexible snack pouch) - INCOMPLETE CHAIN
    // ==========================================
    { skuId: "PKG-1023", color: "bg-[#639922]", text: "Multi-layer foil laminated (PET/Alu/PE) — Kronos GmbH", meta: "Apr 02, 2026 · IoT sensor" },
    { skuId: "PKG-1023", color: "bg-[#378ADD]", text: "Migration limits certified under EFSA specs", meta: "Apr 05 · Cert verify" },
    { skuId: "PKG-1023", color: "bg-[#BA7517]", text: "Snack pouch sealed & packaged", meta: "Apr 10 · ERP sync" },
    // Missing: Recycling loops (multi-layer laminate blocked in sorting - Fails recyclability!)

    // ==========================================
    // 7. PKG-SEC-501 (Cardboard Carton Sleeve) - COMPLETE CHAIN
    // ==========================================
    { skuId: "PKG-SEC-501", color: "bg-[#639922]", text: "Pulp processed & bleached board rolled — Nordic Pulp AB, SE", meta: "Jan 10, 2026 · IoT sensor" },
    { skuId: "PKG-SEC-501", color: "bg-[#378ADD]", text: "Die-cut sleeves pressed & packed", meta: "Jan 12 · RFID scan" },
    { skuId: "PKG-SEC-501", color: "bg-[#378ADD]", text: "Arrived at Brand Co. Hamburg packaging line", meta: "Jan 15 · GPS track" },
    { skuId: "PKG-SEC-501", color: "bg-[#BA7517]", text: "Linked to primary shampoo bottles", meta: "Jan 22 · ERP sync" },
    { skuId: "PKG-SEC-501", color: "bg-[#639922]", text: "Delivered to retail shelves", meta: "Jan 28 · EDI" },
    { skuId: "PKG-SEC-501", color: "bg-[#639922]", text: "Repulped & converted into recycled paperboard — Hamburg", meta: "Feb 15 · Recycler log" },

    // ==========================================
    // 8. PKG-TER-901 (Standard Wooden Euro Pallet) - COMPLETE CHAIN
    // ==========================================
    { skuId: "PKG-TER-901", color: "bg-[#639922]", text: "Sourced softwood logs milled & heat treated — Sweden", meta: "Jan 05, 2026 · IoT sensor" },
    { skuId: "PKG-TER-901", color: "bg-[#378ADD]", text: "Euro Pallet assembled, EPAL tag branded", meta: "Jan 07 · RFID scan" },
    { skuId: "PKG-TER-901", color: "bg-[#378ADD]", text: "Logistics shipping loop activated", meta: "Jan 10 · GPS track" },
    { skuId: "PKG-TER-901", color: "bg-[#BA7517]", text: "Assigned to warehouse storage racks", meta: "Jan 15 · ERP sync" },
    { skuId: "PKG-TER-901", color: "bg-[#639922]", text: "Shipped to retail nodes for cargo offload", meta: "Jan 25 · EDI" },
    { skuId: "PKG-TER-901", color: "bg-[#639922]", text: "Pallet refurbished & re-entered into logistics pool", meta: "Feb 20 · Recycler log" },

    // NOTE: PKG-1055, PKG-1005, PKG-SRV-202, PKG-TER-902, PKG-TER-903 remain EMPTY (No events registered)
  ]);

  // Selected SKU details
  const selectedSku = skus.find(s => s.id === selectedSkuId) || skus[0];

  // Dynamic chain pathways definition by material category
  const getChainPathway = (sku) => {
    if (sku.material === "Glass") {
      return [
        { label: "Raw glass mfg", bg: "bg-[#EAF3DE] text-[#3B6D11]", icon: IconBuildingFactory2, location: "Italy", cert: "ISO 14001", hash: "0x8fa3...d41b" },
        { label: "Vetri Italia SpA", bg: "bg-[#E6F1FB] text-[#185FA5]", icon: IconBox, location: "Padova, IT", cert: "EFSA Food Safe", hash: "0x39ef...98c1" },
        { label: "DHL Logistics DE", bg: "bg-[#E6F1FB] text-[#185FA5]", icon: IconTruck, location: "Hamburg, DE", cert: "Logistics ISO", hash: "0x89fc...721d" },
        { label: "Brand Co. NL", bg: "bg-[#FAEEDA] text-[#854F0B]", icon: IconBuildingStore, location: "Rotterdam, NL", cert: "PPWR Compliant", hash: "0x30eb...39da" },
        { label: "Retail EU", bg: "bg-[#FAEEDA] text-[#854F0B]", icon: IconShoppingCart, location: "4 EU Markets", cert: "Filing Approved", hash: "0x82da...e19f" },
        { label: "Glass recycler AT", bg: "bg-[#EAF3DE] text-[#3B6D11]", icon: IconRecycle, location: "Austria", cert: "Cradle to Cradle A", hash: "0xe29d...49c2" },
      ];
    } else if (sku.packaging_type === "service") {
      return [
        { label: "PLA Corn Mill", bg: "bg-[#EAF3DE] text-[#3B6D11]", icon: IconBuildingFactory2, location: "Nebraska, US", cert: "USDA Biobased", hash: "0xa81c...281b" },
        { label: "Kraft Paper Co.", bg: "bg-[#E6F1FB] text-[#185FA5]", icon: IconBox, location: "Sweden", cert: "FSC Mix Paper", hash: "0xe293...a928" },
        { label: "POS Cafe Hubs", bg: "bg-[#FAEEDA] text-[#854F0B]", icon: IconBuildingStore, location: "Paris, FR", cert: "PPWR Service Lic.", hash: "0x38e2...bf29" },
        { label: "Retail Consumer", bg: "bg-[#FAEEDA] text-[#854F0B]", icon: IconShoppingCart, location: "Point of Sale", cert: "User Option", hash: "0x98cd...12c8" },
        { label: "Compost Bin", bg: "bg-[#EAF3DE] text-[#3B6D11]", icon: IconRecycle, location: "EU Composting", cert: "EN 13432 Certified", hash: "0xf83d...ea92" },
      ];
    } else {
      // General plastic or material flow
      return [
        { label: "Raw resin converter", bg: "bg-[#EAF3DE] text-[#3B6D11]", icon: IconBuildingFactory2, location: "Germany", cert: "REACH Compliant", hash: "0xfa83...21cb" },
        { label: "Amcor Packaging", bg: "bg-[#E6F1FB] text-[#185FA5]", icon: IconBox, location: "Milan, IT", cert: "BRCGS Food Safety", hash: "0x89d2...aa39" },
        { label: "Logistics Freight", bg: "bg-[#E6F1FB] text-[#185FA5]", icon: IconTruck, location: "Rotterdam, NL", cert: "ISO 9001", hash: "0x09da...cc34" },
        { label: "Brand Warehouse", bg: "bg-[#FAEEDA] text-[#854F0B]", icon: IconBuildingStore, location: "Amsterdam, NL", cert: "PPWR Registry", hash: "0x82ea...89db" },
        { label: "EU Supermarkets", bg: "bg-[#FAEEDA] text-[#854F0B]", icon: IconShoppingCart, location: "West Europe", cert: "Public DPP Active", hash: "0xfa11...32cd" },
        { label: "Polymer Sorting", bg: "bg-[#EAF3DE] text-[#3B6D11]", icon: IconRecycle, location: "Belgium", cert: "ISCC Plus Certified", hash: "0xbd1e...88fa" },
      ];
    }
  };

  const pathway = getChainPathway(selectedSku);

  // Dynamic details about the clicked node
  const getSelectedNodeDetails = () => {
    if (selectedNodeIndex === null || selectedNodeIndex >= pathway.length) return null;
    return pathway[selectedNodeIndex];
  };

  const nodeDetails = getSelectedNodeDetails();

  const handleAddEventSubmit = (e) => {
    e.preventDefault();
    if (!newEventText) return;

    const newEv = {
      skuId: selectedSkuId,
      color: newEventType === "IoT sensor" ? "bg-[#639922]" : newEventType === "RFID scan" ? "bg-[#378ADD]" : "bg-[#BA7517]",
      text: `${newEventText} — Ledger logged`,
      meta: `Just now · ${newEventType}`
    };

    setLoggedEvents([newEv, ...loggedEvents]);
    setNewEventText("");
    setShowEventForm(false);
    alert(`Audit log verified: Custom traceability event successfully appended to the blockchain ledger for ${selectedSkuId}.`);
  };

  // Supply chain deep audit simulator
  const handleDeepAudit = () => {
    setIsAuditing(true);
    setAuditProgress("Connecting to Tier 2 chemical database...");
    
    setTimeout(() => {
      setAuditProgress("Validating resin origin declarations (Tier 3)...");
      setTimeout(() => {
        setAuditProgress("Certifying mass-balance audit loops (End-of-life)...");
        setTimeout(() => {
          setIsAuditing(false);
          setAuditProgress("");
          setTierCoverages({
            tier1: 100,
            tier2: 96, // went up from 84
            tier3: 78, // went up from 51
            eol: 65    // went up from 38
          });
          alert("Supply chain audit completed! Vetted documentation verified: Tier 2 expanded to 96%, Tier 3 resin tracking to 78%, recycling loops to 65%.");
        }, 800);
      }, 700);
    }, 600);
  };

  return (
    <div className="space-y-6">
      
      {/* QUICK START GUIDE */}
      {showGuide && (
        <div className="bg-[#EAF3DE] border border-[#d2e7b9] rounded-xl p-5 shadow-sm text-text-primary transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <IconBook size={20} className="text-[#3B6D11] shrink-0" />
              <h3 className="text-sm font-bold text-[#3B6D11]">Custody Traceability Quick-Start Guide</h3>
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
              <span className="text-xs font-bold text-[#3B6D11] block">1. Select Target SKU</span>
              <p className="text-[11.5px] text-text-secondary leading-relaxed">
                Use the dropdown selector to load specific packaging custody flows, event timelines, and supplier audits dynamically.
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#3B6D11] block">2. Tap Chain Nodes for Ledger Details</span>
              <p className="text-[11.5px] text-text-secondary leading-relaxed">
                Click any block in the horizontal flow graph to display raw facility locations, compliance certifications, and tamper-proof hashes.
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#3B6D11] block">3. Append IoT Audit Logs</span>
              <p className="text-[11.5px] text-text-secondary leading-relaxed">
                Use the sensor logger to simulate real-time GPS coordinates, RFID tags, or melt sensors logging events directly to the ledger.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SKU CONTROLS SECTION */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-bg-primary p-4 rounded-xl border border-border-tertiary">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-1 w-full">
          <label className="text-xs font-bold text-text-secondary uppercase shrink-0">Select packaging item:</label>
          <select 
            value={selectedSkuId}
            onChange={(e) => {
              setSelectedSkuId(e.target.value);
              setSelectedNodeIndex(null); // Reset node selection
            }}
            className="font-sans text-[13px] px-3 py-1.5 rounded-[6px] border border-border-secondary bg-bg-primary text-text-primary outline-none transition-colors duration-200 focus:border-text-info cursor-pointer font-bold w-full sm:w-auto min-w-[200px]"
            aria-label="Select packaging SKU for traceability"
          >
            {skus.map(s => (
              <option key={s.id} value={s.id}>
                {s.name} [{s.id}] ({s.packaging_type})
              </option>
            ))}
          </select>
        </div>

        <Btn primary onClick={handleDeepAudit} disabled={isAuditing} className="w-full sm:w-auto">
          {isAuditing ? <IconRefresh size={14} className="animate-spin shrink-0" /> : <IconCpu size={14} className="shrink-0" />}
          <span>{isAuditing ? "Auditing Supply Chain..." : "Trigger Deep Supply Chain Audit"}</span>
        </Btn>
      </div>

      {/* Deep Audit Status notification */}
      {auditProgress && (
        <div className="p-3.5 rounded-lg border border-bg-info/20 bg-bg-info text-xs font-semibold text-text-info flex items-center gap-2.5 animate-pulse">
          <IconRefresh size={14} className="animate-spin shrink-0" />
          <span>{auditProgress}</span>
        </div>
      )}

      {/* CUSTODY CHAIN FLOW COMPONENT */}
      <Card>
        <CardTitle action={<Badge variant="success"> tamper-proof ledger active </Badge>}>
          <div className="flex items-center gap-1.5">
            <IconHierarchy size={18} className="text-[#3B6D11]" />
            <span>Tamper-Proof Custody Chain Flow — {selectedSku.name}</span>
          </div>
        </CardTitle>

        <p className="text-xs text-text-secondary leading-relaxed mb-4">
          Click any step node in the custody pipeline below to pull its verified processing facility parameters, ISO certs, and transaction hashes directly from the custody spine.
        </p>

        <div className="flex flex-row items-center gap-2.5 py-4 overflow-x-auto select-none pb-5">
          {pathway.map((n, i) => {
            const isNodeSelected = selectedNodeIndex === i;
            return (
              <div key={i} className="flex items-center gap-2 shrink-0">
                <button 
                  onClick={() => setSelectedNodeIndex(isNodeSelected ? null : i)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all duration-200 cursor-pointer active:scale-95 border-2 shrink-0 ${
                    isNodeSelected 
                      ? "border-[#3B6D11] scale-[1.04] ring-2 ring-[#EAF3DE]" 
                      : "border-transparent hover:scale-[1.02]"
                  } ${n.bg}`}
                >
                  <n.icon size={15} className={`shrink-0 ${isNodeSelected ? "animate-pulse" : ""}`} />
                  <span>{n.label}</span>
                </button>
                {i < pathway.length - 1 && (
                  <IconArrowRight size={14} className="text-text-tertiary shrink-0" />
                )}
              </div>
            );
          })}
        </div>

        {/* NODE DETAIL ACCORDION DRAWER */}
        {nodeDetails && (
          <div className="mt-4 p-5 rounded-xl border border-[#d2e7b9] bg-[#EAF3DE]/30 text-xs space-y-4 animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between border-b border-[#d2e7b9]/60 pb-2">
              <div className="flex items-center gap-1.5 text-[#3B6D11] font-bold">
                <IconMapPin size={16} />
                <span>Node Facility Audit Ledger: {nodeDetails.label}</span>
              </div>
              <Badge variant="success">Vetted Node</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <span className="text-[10px] text-text-tertiary font-bold uppercase block">Processing Location</span>
                <strong className="text-text-primary text-[12.5px] font-bold">{nodeDetails.location}</strong>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-text-tertiary font-bold uppercase block">Active Certification</span>
                <strong className="text-[#3b6d11] text-[12.5px] font-bold flex items-center gap-1">
                  <IconCertificate size={14} className="shrink-0" />
                  <span>{nodeDetails.cert}</span>
                </strong>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-text-tertiary font-bold uppercase block">Ledger Txn Hash</span>
                <strong className="text-text-secondary text-[12px] font-mono">{nodeDetails.hash}</strong>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-text-tertiary font-bold uppercase block">Blockchain Audited</span>
                <strong className="text-[#15803d] text-[12.5px] font-bold">TAMPER-PROOF ✓</strong>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* DYNAMIC COCEVENTS & COVERAGE STATUS GRIDS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* CHAIN OF CUSTODY EVENTS LOG & LOGGER */}
        <Card>
          <div className="flex items-center justify-between border-b border-border-tertiary pb-3 mb-4">
            <CardTitle action={<Badge variant="info">{loggedEvents.filter(e => e.skuId === selectedSkuId).length} total logs</Badge>}>
              <span>Chain-of-Custody Event Ledger</span>
            </CardTitle>
            <Btn small onClick={() => setShowEventForm(!showEventForm)}>
              <IconPlus size={12} className="shrink-0" />
              <span>Log Sensor Event</span>
            </Btn>
          </div>

          {/* LOG SENSOR EVENT FORM */}
          {showEventForm && (
            <form onSubmit={handleAddEventSubmit} className="mb-4 p-4 rounded-xl border border-[#bae6fd] bg-[#e0f2fe]/30 space-y-3 text-xs">
              <div className="font-bold text-text-primary">Append Traceability Sensor Event</div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-text-secondary block">Sensor log type:</label>
                  <select
                    value={newEventType}
                    onChange={(e) => setNewEventType(e.target.value)}
                    className="font-sans text-xs bg-bg-primary border border-border-secondary rounded px-2.5 py-1 w-full cursor-pointer"
                  >
                    <option value="IoT sensor">IoT sensor</option>
                    <option value="RFID scan">RFID scan</option>
                    <option value="GPS track">GPS track</option>
                    <option value="ERP sync">ERP sync</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-text-secondary block">Event log statement:</label>
                  <input
                    type="text"
                    value={newEventText}
                    onChange={(e) => setNewEventText(e.target.value)}
                    placeholder="e.g. Temperature stable at 24C, pallet sealed"
                    className="font-sans text-xs bg-bg-primary border border-border-secondary rounded px-2.5 py-1 w-full outline-none focus:border-text-info"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Btn primary small type="submit" className="w-full sm:w-auto">Append to Blockchain</Btn>
                <Btn small onClick={() => setShowEventForm(false)} className="w-full sm:w-auto">Cancel</Btn>
              </div>
            </form>
          )}

          <div className="flex flex-col gap-0 max-h-[300px] overflow-y-auto pr-1">
            {loggedEvents.filter(e => e.skuId === selectedSkuId).length === 0 ? (
              <div className="text-center py-6 text-text-tertiary font-medium text-xs">
                No telemetry logs registered for this SKU. Use "Log Sensor Event" above to append one.
              </div>
            ) : (
              loggedEvents
                .filter(e => e.skuId === selectedSkuId)
                .map((e, i) => (
                  <div key={i} className="flex gap-3.5 py-3 border-b border-border-tertiary/40 last:border-0 last:pb-0 first:pt-0 animate-in slide-in-from-top-2 duration-150">
                    <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${e.color}`} />
                    <div>
                      <div className="text-[13px] text-text-primary font-medium">{e.text}</div>
                      <div className="text-[11px] text-text-tertiary mt-1 font-medium">{e.meta}</div>
                    </div>
                  </div>
                ))
            )}
          </div>
        </Card>

        {/* TRACEABILITY SUPPLY CHAIN COVERAGE PROGRESS */}
        <Card>
          <CardTitle action={<InfoHelper text="Measures compliance documentation coverage across supplier tiers and end-of-life loops." />}>
            Supply Chain Audit Coverage Status
          </CardTitle>
          
          <div className="space-y-4 mt-2">
            {[
              { id: "tier1", label: "Tier 1 primary suppliers (Vetted converters)", value: tierCoverages.tier1 },
              { id: "tier2", label: "Tier 2 intermediary suppliers (Paper mills / extruders)", value: tierCoverages.tier2 },
              { id: "tier3", label: "Tier 3 raw raw polymer & sand suppliers (Chemical extraction)", value: tierCoverages.tier3 },
              { id: "eol", label: "End-of-life recycled stream tracing (Sorting centers)", value: tierCoverages.eol },
            ].map((c, i) => (
              <div key={i} className="space-y-2 p-3 rounded-xl border border-border-tertiary bg-bg-secondary/40 hover:bg-bg-secondary hover:border-border-secondary transition-all duration-200">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-[13px]">
                  <span className="text-text-secondary font-bold leading-tight">{c.label}</span>
                  <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-auto">
                    <span className="text-text-primary font-bold">{c.value}%</span>
                    <button
                      type="button"
                      onClick={() => setSelectedTierAuditDetails(c)}
                      className="text-[10px] font-bold text-[#185FA5] hover:text-[#378ADD] bg-bg-info/60 hover:bg-bg-info border border-transparent hover:border-[#bae6fd] px-2 py-1 rounded-[4px] cursor-pointer transition-all active:scale-95"
                    >
                      Audit Report ↗
                    </button>
                  </div>
                </div>
                <ProgressBar value={c.value} />
              </div>
            ))}
          </div>

          <div className="mt-5 p-3 rounded-lg border border-[#d2e7b9]/40 bg-[#EAF3DE]/30 text-xs text-[#3B6D11] leading-relaxed font-semibold">
            {tierCoverages.tier2 >= 90 && tierCoverages.tier3 >= 75 ? (
              <span>✓ Compliance Target Met: Supply chain documentation has achieved &gt;75% coverage across all three supplier tiers. Audit threat minimized.</span>
            ) : (
              <span>⚠️ Action Required: Tier 3 raw materials coverage is below the recommended 75% target. Trigger a "Deep Supply Chain Audit" above to check pending declarations.</span>
            )}
          </div>
        </Card>

      </div>

      {/* TIER AUDIT DETAILS MODAL */}
      {selectedTierAuditDetails && (
        <div className="fixed inset-0 bg-[#0f172a]/45 backdrop-blur-xs z-50 flex items-center justify-center p-4 transition-all duration-300">
          <div className="bg-bg-primary rounded-xl border border-border-tertiary p-6 max-w-2xl w-full shadow-2xl relative transition-all duration-200 animate-in fade-in zoom-in-95">
            {/* Close button */}
            <button 
              onClick={() => setSelectedTierAuditDetails(null)}
              className="absolute top-4 right-4 text-text-tertiary hover:text-text-primary hover:bg-bg-secondary p-1.5 rounded-lg cursor-pointer transition-colors"
              aria-label="Close report modal"
            >
              <IconX size={18} />
            </button>

            {/* Header */}
            <div className="flex items-center gap-2 border-b border-border-tertiary pb-3.5 mb-4">
              <IconCertificate size={22} className="text-[#3b6d11] shrink-0" />
              <h3 className="text-base font-bold text-text-primary">Audit Coverage Ledger — {selectedTierAuditDetails.id.toUpperCase()}</h3>
              <Badge variant={selectedTierAuditDetails.value >= 75 ? "success" : "warning"}>
                {selectedTierAuditDetails.value}% Coverage
              </Badge>
            </div>

            {/* Content */}
            <div className="space-y-4 text-xs">
              <div className="bg-bg-secondary p-4 rounded-xl border border-border-tertiary/60 space-y-1.5">
                <div className="font-bold text-text-primary">Vetted Supplier Scope & Category:</div>
                <div className="text-text-secondary leading-relaxed font-medium">{selectedTierAuditDetails.label}</div>
              </div>

              {/* Dynamic details inside the modal */}
              {selectedTierAuditDetails.id === "tier1" && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="bg-bg-secondary p-3 rounded-lg border border-border-tertiary/40">
                      <div className="text-[10px] font-bold text-text-tertiary uppercase">Audited Facilities</div>
                      <div className="text-[13px] font-bold text-text-primary mt-1">18 Vetted Converters</div>
                    </div>
                    <div className="bg-bg-secondary p-3 rounded-lg border border-border-tertiary/40">
                      <div className="text-[10px] font-bold text-text-tertiary uppercase">Audit Confidence Score</div>
                      <div className="text-[13px] font-bold text-[#15803d] mt-1">100% (High Confidence)</div>
                    </div>
                  </div>

                  <Table headers={["Vetted Facility", "Region", "Signed Certs", "Status"]}>
                    <Tr>
                      <Td className="font-semibold">Amcor Italia SpA</Td>
                      <Td>Milano, IT</Td>
                      <Td className="font-mono">EFSA, BRCGS, ISO</Td>
                      <Td><Badge variant="success">Compliant</Badge></Td>
                    </Tr>
                    <Tr>
                      <Td className="font-semibold">Vetri SpA</Td>
                      <Td>Padova, IT</Td>
                      <Td className="font-mono">EFSA Food-Safe, ISO</Td>
                      <Td><Badge variant="success">Compliant</Badge></Td>
                    </Tr>
                    <Tr>
                      <Td className="font-semibold">Nordic Pulp AB</Td>
                      <Td>Sweden</Td>
                      <Td className="font-mono">FSC pulp wood, ISO</Td>
                      <Td><Badge variant="success">Compliant</Badge></Td>
                    </Tr>
                  </Table>

                  <div className="p-3 rounded-lg bg-[#EAF3DE] text-[#3B6D11] border border-[#d2e7b9] font-medium leading-relaxed">
                    ✓ Vetting cycle fully completed: 100% of Primary and Secondary suppliers have uploaded active declarations of conformity (DoCs) and registered raw polymer specifications. No gaps detected.
                  </div>
                </div>
              )}

              {selectedTierAuditDetails.id === "tier2" && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="bg-bg-secondary p-3 rounded-lg border border-border-tertiary/40">
                      <div className="text-[10px] font-bold text-text-tertiary uppercase">Audited Facilities</div>
                      <div className="text-[13px] font-bold text-text-primary mt-1">42 Intermediate Mills</div>
                    </div>
                    <div className="bg-bg-secondary p-3 rounded-lg border border-border-tertiary/40">
                      <div className="text-[10px] font-bold text-text-tertiary uppercase">Audit Confidence Score</div>
                      <div className="text-[13px] font-bold text-[#185FA5] mt-1">92% (High Confidence)</div>
                    </div>
                  </div>

                  <Table headers={["Audited Supplier", "Packaging Layer", "Vetted Sheets", "Status"]}>
                    <Tr>
                      <Td className="font-semibold">Kronos Laminates GmbH</Td>
                      <Td>LDPE Extrusions</Td>
                      <Td className="font-mono">ISO 9001, BRCGS</Td>
                      <Td><Badge variant="success">Vetted</Badge></Td>
                    </Tr>
                    <Tr>
                      <Td className="font-semibold">Alucán Aluminum SA</Td>
                      <Td>Metal slugs</Td>
                      <Td className="font-mono">REACH declarations</Td>
                      <Td><Badge variant="success">Vetted</Badge></Td>
                    </Tr>
                    <Tr>
                      <Td className="font-semibold">Verpack NL</Td>
                      <Td>Multi-layer barrier</Td>
                      <Td className="font-mono text-text-tertiary italic">Pending renewal</Td>
                      <Td><Badge variant="warning">In Progress</Badge></Td>
                    </Tr>
                  </Table>

                  <div className="p-3 rounded-lg bg-bg-info text-[#185FA5] border border-bg-info/30 font-medium leading-relaxed flex items-start gap-1.5">
                    <IconAlertTriangle size={16} className="shrink-0 mt-0.5" />
                    <span>Compliance Action Plan: Document updates are pending from packaging film mills. Vetting alert is active for 2 pending material declarations from Verpack NL.</span>
                  </div>
                </div>
              )}

              {selectedTierAuditDetails.id === "tier3" && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="bg-bg-secondary p-3 rounded-lg border border-border-tertiary/40">
                      <div className="text-[10px] font-bold text-text-tertiary uppercase">Audited Facilities</div>
                      <div className="text-[13px] font-bold text-text-primary mt-1">11 Raw Quarry / Refiners</div>
                    </div>
                    <div className="bg-bg-secondary p-3 rounded-lg border border-[#f59e0b]/20 text-[#854F0B]">
                      <div className="text-[10px] font-bold text-[#854F0B] uppercase">Audit Confidence Score</div>
                      <div className="text-[13px] font-bold mt-1">68% (Moderate Risk)</div>
                    </div>
                  </div>

                  <Table headers={["Raw Refinery Node", "Material Source", "Vetted Specifications", "Status"]}>
                    <Tr>
                      <Td className="font-semibold">SABIC polymers</Td>
                      <Td>PP / HDPE monomers</Td>
                      <Td className="font-mono">REACH registry numbers</Td>
                      <Td><Badge variant="success">Vetted</Badge></Td>
                    </Tr>
                    <Tr>
                      <Td className="font-semibold">Quarzwerke silica</Td>
                      <Td>Padova sand quarry</Td>
                      <Td className="font-mono">Mineral quarry certificates</Td>
                      <Td><Badge variant="success">Vetted</Badge></Td>
                    </Tr>
                    <Tr>
                      <Td className="font-semibold">Plastika SL</Td>
                      <Td>Styrene monomers</Td>
                      <Td className="font-mono text-text-tertiary italic">Pending declarations</Td>
                      <Td><Badge variant="danger">Gap Detected</Badge></Td>
                    </Tr>
                  </Table>

                  <div className="p-3 rounded-lg bg-[#FAECE7] text-[#993C1D] border border-[#fbcfe8] font-medium leading-relaxed flex items-start gap-1.5">
                    <IconAlertTriangle size={16} className="shrink-0 mt-0.5" />
                    <span>⚠️ Audit Threat: Raw styrene monomer extraction loops in eastern Europe lack REACH chemical composition records. Supplier communication triggered.</span>
                  </div>
                </div>
              )}

              {selectedTierAuditDetails.id === "eol" && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="bg-bg-secondary p-3 rounded-lg border border-border-tertiary/40">
                      <div className="text-[10px] font-bold text-text-tertiary uppercase">Audited Facilities</div>
                      <div className="text-[13px] font-bold text-text-primary mt-1">15 Municipal Sorting Hubs</div>
                    </div>
                    <div className="bg-bg-secondary p-3 rounded-lg border border-border-tertiary/40">
                      <div className="text-[10px] font-bold text-[#A32D2D] uppercase">Audit Confidence Score</div>
                      <div className="text-[13px] font-bold mt-1">45% (Critical Action)</div>
                    </div>
                  </div>

                  <Table headers={["Post-consumer Hub", "Material Target", "Verification Loops", "Status"]}>
                    <Tr>
                      <Td className="font-semibold">Citeo France plants</Td>
                      <Td>HDPE bottles / Glass</Td>
                      <Td className="font-mono">ISCC PLUS, Citeo logs</Td>
                      <Td><Badge variant="success">Vetted</Badge></Td>
                    </Tr>
                    <Tr>
                      <Td className="font-semibold">Nedvang NL sorting</Td>
                      <Td>PET sorting / paper</Td>
                      <Td className="font-mono text-text-tertiary italic">Pending mass balance</Td>
                      <Td><Badge variant="warning">Partial</Badge></Td>
                    </Tr>
                    <Tr>
                      <Td className="font-semibold">BDO Warsaw scrap</Td>
                      <Td>Polystyrene incinerators</Td>
                      <Td className="font-mono text-text-tertiary italic">No registry records</Td>
                      <Td><Badge variant="danger">Unvetted</Badge></Td>
                    </Tr>
                  </Table>

                  <div className="p-3 rounded-lg bg-[#FCEBEB] text-[#A32D2D] border border-[#fca5a5]/30 font-medium leading-relaxed flex items-start gap-1.5">
                    <IconAlertTriangle size={16} className="shrink-0 mt-0.5" />
                    <span>⚠️ Critical Action: Sorting centers in Poland (BDO) lack certified mass-balance trails. Eco-contributions calculations may be contested by BfR regulators.</span>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-2.5 border-t border-border-tertiary pt-4 mt-5">
              <Btn onClick={() => setSelectedTierAuditDetails(null)}>
                <span>Dismiss Report</span>
              </Btn>
              {selectedTierAuditDetails.value < 90 && (
                <Btn primary onClick={() => {
                  setSelectedTierAuditDetails(null);
                  handleDeepAudit();
                }}>
                  <span>Run Direct Recertification</span>
                </Btn>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
