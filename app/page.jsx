"use client";
import { useState } from "react";
import { useCompliance } from "@/components/ComplianceContext";
import { MetricCard, Card, CardTitle, Alert, Badge, InfoHelper, Btn } from "@/components/ui";
import {
  IconBook, IconBuildingFactory2, IconGlobe, IconTruck, IconBuildingStore,
  IconUser, IconCircleCheck, IconAlertTriangle, IconClock, IconListCheck,
  IconBuilding, IconFileText, IconChevronDown, IconChevronUp, IconArrowRight,
  IconSettings, IconActivity, IconQrcode, IconFileCheck, IconPackage
} from "@tabler/icons-react";

export default function Dashboard() {
  const [showGuide, setShowGuide] = useState(true);
  const [showScopeSettings, setShowScopeSettings] = useState(true);
  
  const { actorTypes, toggleActorType } = useCompliance();
  
  // Suppressed alerts or dynamic alerts based on micro-enterprise status
  const getDynamicAlerts = () => {
    const list = [
      { type: "danger", title: "PET-005:", text: "Recyclability grade D — below 2026 threshold. Reformulation required." },
    ];

    if (!actorTypes.microEnterprise) {
      list.push(
        { type: "danger", title: "SUP-Kronos GmbH:", text: "Technical doc overdue — 5-year retention breach risk for DPP." },
        { type: "warning", title: "Q3 DoC filing", text: "due in 14 days. 12 SKUs pending declaration." }
      );
    } else {
      list.push(
        { type: "success", title: "Micro exemption:", text: "Digital Product Passport (DPP) & DoC filing requirements waived under PPWR Art 13." }
      );
    }

    list.push({ type: "success", title: "", text: "Mass balance audit for recycled PE complete. All 4 suppliers verified." });
    return list;
  };

  // Dynamic activity based on scope
  const getDynamicActivity = () => {
    const list = [];
    if (actorTypes.manufacturer && !actorTypes.microEnterprise) {
      list.push({ color: "bg-[#639922]", text: "DPP generated for SKU PKG-1041", meta: "2 hours ago · Automated" });
    }
    list.push({ color: "bg-[#378ADD]", text: "Supplier data received — Amcor Italia", meta: "Yesterday · API sync" });
    
    if (actorTypes.exporter) {
      list.push({ color: "bg-[#BA7517]", text: "EPR registration status for Spain changed to In Progress", meta: "2 days ago · Internal update" });
    }
    
    list.push(
      { color: "bg-[#BA7517]", text: "Recyclability re-assessment triggered on 6 SKUs", meta: "3 days ago · AI recommendation" },
      { color: "bg-[#639922]", text: "Q1 PPWR report submitted to BfR", meta: "Apr 30 · Regulatory filing" }
    );
    return list;
  };

  // Dynamic metrics calculated on active scope
  const overallScore = actorTypes.microEnterprise ? "86%" : "78%";
  const skusTracked = actorTypes.retailer ? "1,287 (3 Service SKUs added)" : "1,284";
  const recyclabilityMet = actorTypes.microEnterprise ? "74%" : "61%";

  const dynamicMetrics = [
    { label: "Overall score", value: overallScore, sub: actorTypes.microEnterprise ? "↑ 8pts (DPP requirements waived)" : "↑ 4pts from Q1", color: "text-[#1D9E75]" },
    { label: "SKUs tracked", value: skusTracked, sub: "94 unresolved gaps" },
    { label: "Recyclability A/B", value: recyclabilityMet, sub: "Target: 70% by 2026" },
    { label: "Recycled content", value: "34%", sub: "Min 30% met ✓" },
    { label: "Suppliers onboarded", value: "87%", sub: "18 pending" },
  ];

  // Pipeline nodes definitions for dynamic rendering
  const pipelineNodes = [
    {
      id: "supplier",
      label: "1. Supplier Ingestion",
      icon: IconBuildingFactory2,
      active: actorTypes.manufacturer || actorTypes.importer,
      color: "border-[#3B6D11] text-[#3B6D11] bg-[#EAF3DE]",
      glow: "shadow-[0_0_12px_rgba(59,109,17,0.25)]",
      desc: "Syncs polymer specs & certifications",
      roleNeeded: "Manufacturer / Importer"
    },
    {
      id: "importer",
      label: "2. Customs Audit",
      icon: IconTruck,
      active: actorTypes.importer,
      color: "border-[#185FA5] text-[#185FA5] bg-[#E6F1FB]",
      glow: "shadow-[0_0_12px_rgba(24,95,165,0.25)]",
      desc: "REACH & import border declaration",
      roleNeeded: "Importer"
    },
    {
      id: "distributor",
      label: "3. DoC Ingest Vault",
      icon: IconFileCheck,
      active: actorTypes.distributor && !actorTypes.microEnterprise,
      waived: actorTypes.distributor && actorTypes.microEnterprise,
      color: "border-[#854F0B] text-[#854F0B] bg-[#FAEEDA]",
      glow: "shadow-[0_0_12px_rgba(133,79,11,0.25)]",
      desc: "Upstream DoC 5-year preservation",
      roleNeeded: "Distributor"
    },
    {
      id: "dpp",
      label: "4. DPP QR Engine",
      icon: IconQrcode,
      active: actorTypes.manufacturer && !actorTypes.microEnterprise,
      waived: actorTypes.manufacturer && actorTypes.microEnterprise,
      color: "border-[#378ADD] text-[#378ADD] bg-bg-info",
      glow: "shadow-[0_0_12px_rgba(55,138,221,0.25)]",
      desc: "Digital Product Passport QR generation",
      roleNeeded: "Manufacturer"
    },
    {
      id: "exporter",
      label: "5. PRO EPR Registry",
      icon: IconGlobe,
      active: actorTypes.exporter,
      color: "border-[#A32D2D] text-[#A32D2D] bg-[#FCEBEB]",
      glow: "shadow-[0_0_12px_rgba(163,45,45,0.25)]",
      desc: "Filing in each member state of sale",
      roleNeeded: "Exporter to EU"
    },
    {
      id: "retailer",
      label: "6. HoReCa Reuse Target",
      icon: IconBuildingStore,
      active: actorTypes.retailer,
      color: "border-[#993C1D] text-[#993C1D] bg-[#FAECE7]",
      glow: "shadow-[0_0_12px_rgba(153,60,29,0.25)]",
      desc: "Reusable service packaging ratios",
      roleNeeded: "Retailer / HoReCa"
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* SCOPE & PROFILE SELECTOR CARD - POC HIGHLIGHT */}
      <Card className="border-[#378ADD]/30 bg-gradient-to-br from-bg-primary via-bg-primary to-bg-info/10">
        <div className="flex items-center justify-between border-b border-border-tertiary pb-3 mb-4">
          <div className="flex items-center gap-2">
            <IconBuilding className="text-[#378ADD] shrink-0" size={20} />
            <div>
              <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">Organization Profile & PPWR Scope Selector</h3>
              <p className="text-[11px] text-text-tertiary font-medium">Select your actor roles to dynamically configure compliance pipelines in real-time.</p>
            </div>
          </div>
          <button 
            onClick={() => setShowScopeSettings(!showScopeSettings)}
            className="text-text-secondary hover:text-text-primary p-1 rounded-md hover:bg-bg-secondary cursor-pointer transition-colors"
          >
            {showScopeSettings ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
          </button>
        </div>

        {showScopeSettings && (
          <div className="space-y-5">
            {/* Interactive Selector Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
              {[
                { key: "manufacturer", label: "Manufacturer", desc: "Full obligations: recyclability, DPP, reporting", icon: IconBuildingFactory2, activeColor: "border-[#3B6D11] text-[#3B6D11] bg-[#EAF3DE]" },
                { key: "importer", label: "Importer", desc: "Liable for imported goods packaging standards", icon: IconTruck, activeColor: "border-[#185FA5] text-[#185FA5] bg-[#E6F1FB]" },
                { key: "distributor", label: "Distributor", desc: "Declaration of Conformity pass-through inbox", icon: IconUser, activeColor: "border-[#854F0B] text-[#854F0B] bg-[#FAEEDA]" },
                { key: "retailer", label: "Retailer / HoReCa", desc: "Service packaging reuse & quotas", icon: IconBuildingStore, activeColor: "border-[#993C1D] text-[#993C1D] bg-[#FAECE7]" },
                { key: "exporter", label: "Exporter to EU", desc: "EPR registers & per-member-state submissions", icon: IconGlobe, activeColor: "border-[#A32D2D] text-[#A32D2D] bg-[#FCEBEB]" },
              ].map((role) => {
                const isActive = actorTypes[role.key];
                const Icon = role.icon;
                return (
                  <button
                    key={role.key}
                    onClick={() => toggleActorType(role.key)}
                    className={`text-left p-3 rounded-xl border-2 transition-all duration-300 cursor-pointer shadow-xs active:scale-[0.98] ${
                      isActive 
                        ? `${role.activeColor} shadow-md translate-y-[-1px]` 
                        : "border-border-tertiary bg-bg-secondary hover:bg-bg-primary text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <Icon size={16} className={`shrink-0 ${isActive ? "animate-pulse" : ""}`} />
                      <span className="text-xs font-bold">{role.label}</span>
                    </div>
                    <p className="text-[10px] leading-snug opacity-90 font-medium">{role.desc}</p>
                  </button>
                );
              })}
            </div>

            {/* Micro-Enterprise Special Waiver Toggle */}
            <div className="p-4 rounded-xl border border-[#bae6fd] bg-[#e0f2fe]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <Badge variant="info">Special Regulation Mode</Badge>
                  <strong className="text-xs font-bold text-[#0284c7]">Micro-enterprise Waiver (PPWR Article 13 Exception)</strong>
                </div>
                <p className="text-[11px] text-text-secondary leading-relaxed">
                  Toggle if your organization has <strong>&lt;10 employees</strong> and <strong>&le;&euro;2M turnover</strong>. This waives Digital Product Passport (DPP) requirements, suppresses document validation warnings, and simplifies your compliance checklist.
                </p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={actorTypes.microEnterprise}
                  onChange={() => toggleActorType("microEnterprise")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0284c7]" />
              </label>
            </div>
          </div>
        )}
      </Card>

      {/* NEW: DYNAMIC VISUAL COMPLIANCE PIPELINE */}
      <Card className="border-border-tertiary bg-bg-primary shadow-sm overflow-hidden select-none">
        <CardTitle action={
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-border-secondary inline-block" /> Inactive</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#1D9E75] inline-block animate-pulse" /> Active</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full border border-dashed border-[#0284c7] inline-block bg-[#e0f2fe]/40" /> Waived</span>
          </div>
        }>
          <div className="flex items-center gap-1.5">
            <IconActivity className="text-[#1D9E75] shrink-0" size={18} />
            <span>Live Compliance Pipeline Workflow Visualization</span>
          </div>
        </CardTitle>

        <div className="py-4 px-1">
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4 items-center relative">
            
            {pipelineNodes.map((node, index) => {
              const Icon = node.icon;
              const isFirst = index === 0;
              
              let borderClass = "border-2 border-border-tertiary bg-bg-secondary text-text-secondary opacity-40";
              let animationClass = "";
              let badgeText = "Inactive";
              let badgeStyle = "default";
              
              if (node.active) {
                borderClass = `border-2 ${node.color} ${node.glow}`;
                animationClass = "scale-[1.02] transition-transform duration-300";
                badgeText = "Active Flow";
                badgeStyle = "success";
              } else if (node.waived) {
                borderClass = "border-2 border-dashed border-[#0284c7] text-[#0284c7] bg-[#e0f2fe]/20";
                badgeText = "Waived (Exempt)";
                badgeStyle = "info";
              }

              return (
                <div key={node.id} className="flex flex-col items-center flex-1 h-full">
                  <div className={`w-full h-full p-4 rounded-xl border flex flex-col justify-between space-y-2 relative transition-all duration-300 ${borderClass} ${animationClass}`}>
                    
                    {/* Node Header */}
                    <div className="flex items-center justify-between border-b border-border-tertiary/20 pb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider">{node.label}</span>
                      <Badge variant={badgeStyle}>{badgeText}</Badge>
                    </div>

                    {/* Node Core Content */}
                    <div className="flex items-center gap-2.5 py-1">
                      <div className={`p-2 rounded-lg ${node.active ? "bg-white/50" : "bg-border-tertiary/30"}`}>
                        <Icon size={20} className={node.active ? "animate-pulse" : ""} />
                      </div>
                      <div className="text-[11.5px] font-bold leading-tight truncate">
                        {node.id === "dpp" && node.waived ? "DPP Bypassed" : node.desc.split(" ")[0] + " " + (node.desc.split(" ")[1] || "")}
                      </div>
                    </div>

                    {/* Node Footer description */}
                    <p className="text-[9.5px] text-text-secondary font-medium leading-relaxed mt-1">
                      {node.desc}
                    </p>
                    <div className="text-[8.5px] text-text-tertiary font-bold font-mono">
                      Scope: {node.roleNeeded}
                    </div>
                  </div>

                  {/* Connecting Arrow for larger displays */}
                  {index < 5 && (
                    <div className="hidden xl:flex absolute top-1/2 transform -translate-y-1/2" style={{ left: `${(index + 1) * 16.66 - 1.5}%` }}>
                      <IconArrowRight size={16} className={pipelineNodes[index + 1].active ? "text-[#1D9E75] animate-bounce-x" : "text-text-tertiary opacity-45"} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* PPWR 101 ONBOARDING WIZARD GUIDE */}
      {showGuide && (
        <div className="bg-[#EAF3DE] border border-[#d2e7b9] rounded-xl p-5 shadow-sm text-text-primary transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <IconBook size={20} className="text-[#3B6D11] shrink-0" />
              <h3 className="text-sm font-bold text-[#3B6D11]">Welcome to PackTrack EU! PPWR Compliance Quick-Start Guide</h3>
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
                <span className="text-xs font-bold text-[#3B6D11]">Configure Scope Roles</span>
              </div>
              <p className="text-[11.5px] text-text-secondary leading-relaxed pl-7">
                Use the **Scope Selector** above to choose your roles. Your checklist, metrics, and operation tabs will automatically update.
              </p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#3B6D11] text-white text-[10px] font-bold flex items-center justify-center shrink-0">2</span>
                <span className="text-xs font-bold text-[#3B6D11]">Onboard Suppliers</span>
              </div>
              <p className="text-[11.5px] text-text-secondary leading-relaxed pl-7">
                Sync material specs and recycled content from suppliers in the **Suppliers** tab. Over 87% are connected. Resolve the remaining 18 data gaps.
              </p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#3B6D11] text-white text-[10px] font-bold flex items-center justify-center shrink-0">3</span>
                <span className="text-xs font-bold text-[#3B6D11]">Track Quotas & Registrations</span>
              </div>
              <p className="text-[11.5px] text-text-secondary leading-relaxed pl-7">
                {actorTypes.microEnterprise 
                  ? "For micro-enterprises, standard passport requirements are suppressed. Simply maintain material specs and recyclability."
                  : "Audit recyclability grades A-C, manage dynamic Digital Passports, and track EPR registration statuses across target EU states."
                }
              </p>
            </div>
          </div>
        </div>
      )}

      {/* METRICS DASHBOARD GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {dynamicMetrics.map((m) => {
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* COMPLIANCE CHECKLIST - ROLE-BASED & DYNAMIC */}
        <Card className="lg:col-span-2">
          <CardTitle action={<Badge variant="info">Live Checklist</Badge>}>
            <div className="flex items-center gap-1.5">
              <IconListCheck className="text-text-info shrink-0" size={18} />
              <span>Tailored PPWR Compliance Checklist</span>
            </div>
          </CardTitle>

          {actorTypes.microEnterprise && (
            <div className="mb-4 p-3 rounded-lg border border-[#bae6fd] bg-[#e0f2fe] text-xs text-[#0284c7] font-medium flex items-center gap-2">
              <IconCircleCheck size={16} className="shrink-0" />
              <span>Article 13 Waiver Active: Standard DPP and complex DoC reporting audits are suppressed.</span>
            </div>
          )}

          <div className="space-y-4">
            {/* Manufacturer Checklist */}
            {actorTypes.manufacturer && (
              <div className="border-l-2 border-[#3B6D11] pl-3.5 py-1 space-y-2.5">
                <h4 className="text-xs font-bold text-[#3B6D11] uppercase tracking-wider flex items-center gap-1">
                  <span>🏭 Manufacturer Obligations</span>
                  <span className="text-[10px] text-text-tertiary font-normal">({actorTypes.microEnterprise ? "Lighter mode" : "Full mode"})</span>
                </h4>
                <ul className="text-xs space-y-2 text-text-primary">
                  <li className="flex items-start gap-2">
                    <span className="text-[#3B6D11] shrink-0 font-bold">✓</span>
                    <span>Assess recyclability grades for all 6 Primary SKUs (Ensure grades achieve A-C. Switch flexible pouches PKG-1023 to PE mono-materials).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#3B6D11] shrink-0 font-bold">✓</span>
                    <span>Verify post-consumer recycled (PCR) minimums (Beverage cans meet 70%, shampoo bottle achieves 42%).</span>
                  </li>
                  {!actorTypes.microEnterprise ? (
                    <li className="flex items-start gap-2">
                      <span className="text-[#854F0B] shrink-0 font-bold">☐</span>
                      <span className="text-text-secondary">Compile chemical safety profiles and carbon footprint audits to publish <strong>Digital Product Passports (DPP)</strong>.</span>
                    </li>
                  ) : (
                    <li className="flex items-start gap-2 text-text-tertiary line-through">
                      <span className="shrink-0">✓</span>
                      <span>Compile chemical safety profiles & publish DPP (Exempt - Waived).</span>
                    </li>
                  )}
                </ul>
              </div>
            )}

            {/* Importer Checklist */}
            {actorTypes.importer && (
              <div className="border-l-2 border-[#185FA5] pl-3.5 py-1 space-y-2.5">
                <h4 className="text-xs font-bold text-[#185FA5] uppercase tracking-wider">🚢 Importer Obligations</h4>
                <ul className="text-xs space-y-2 text-text-primary">
                  <li className="flex items-start gap-2">
                    <span className="text-[#185FA5] shrink-0 font-bold">✓</span>
                    <span>Ensure imported goods match EU recyclability standard minimums (REACH & PPWR aligned).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-text-secondary shrink-0 font-bold">☐</span>
                    <span className="text-text-secondary">Log Importer of Record identification numbers and customs border entry certificates against SKU portfolios.</span>
                  </li>
                </ul>
              </div>
            )}

            {/* Distributor Checklist */}
            {actorTypes.distributor && (
              <div className="border-l-2 border-[#854F0B] pl-3.5 py-1 space-y-2.5">
                <h4 className="text-xs font-bold text-[#854F0B] uppercase tracking-wider">📦 Distributor Obligations</h4>
                <ul className="text-xs space-y-2 text-text-primary">
                  {!actorTypes.microEnterprise ? (
                    <>
                      <li className="flex items-start gap-2">
                        <span className="text-[#854F0B] shrink-0 font-bold">☐</span>
                        <span className="text-text-secondary">Verify upstream Declarations of Conformity (DoCs) inside the **Distributor Hub** inbox.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#854F0B] shrink-0 font-bold">☐</span>
                        <span className="text-text-secondary">Maintain dynamic pass-through forwarding link packets for downstream retail customers (5-year retention).</span>
                      </li>
                    </>
                  ) : (
                    <li className="flex items-start gap-2 text-text-tertiary line-through">
                      <span className="shrink-0">✓</span>
                      <span>Manage DoC retention and pass-through forwarding packets (Exempt - Waived).</span>
                    </li>
                  )}
                </ul>
              </div>
            )}

            {/* Retailer Checklist */}
            {actorTypes.retailer && (
              <div className="border-l-2 border-[#993C1D] pl-3.5 py-1 space-y-2.5">
                <h4 className="text-xs font-bold text-[#993C1D] uppercase tracking-wider">🏪 Retailer & Service Packaging (HoReCa) Obligations</h4>
                <ul className="text-xs space-y-2 text-text-primary">
                  <li className="flex items-start gap-2">
                    <span className="text-[#993C1D] shrink-0 font-bold">☐</span>
                    <span className="text-text-secondary">Log single-use versus reusable service packaging volumes to track targets inside the **Retailer Hub**.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#993C1D] shrink-0 font-bold">☐</span>
                    <span className="text-text-secondary">Track actual reuse rate against PPWR 2030 target (10% reusable drinks containers). Current progress: 8.7%.</span>
                  </li>
                </ul>
              </div>
            )}

            {/* Exporter Checklist */}
            {actorTypes.exporter && (
              <div className="border-l-2 border-[#A32D2D] pl-3.5 py-1 space-y-2.5">
                <h4 className="text-xs font-bold text-[#A32D2D] uppercase tracking-wider">🌐 Exporter to EU Obligations</h4>
                <ul className="text-xs space-y-2 text-text-primary">
                  <li className="flex items-start gap-2">
                    <span className="text-[#A32D2D] shrink-0 font-bold">✓</span>
                    <span>Register with Producer Responsibility Organizations (PROs) in member states of sale (Germany: registered, Spain: in progress).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-text-secondary shrink-0 font-bold">☐</span>
                    <span className="text-text-secondary">Compile cross-border packaging data report (CSV formats) in the **EPR Exporter Hub** to pay country-specific fees.</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </Card>

        {/* ALERTS & RECENT ACTIVITY - COMPACT SIDEBAR */}
        <div className="space-y-6 lg:col-span-1">
          <Card>
            <CardTitle action={
              <Badge variant={getDynamicAlerts().filter(a => a.type === "danger").length > 0 ? "danger" : "success"}>
                {getDynamicAlerts().filter(a => a.type === "danger").length} critical
              </Badge>
            }>
              Active alerts
            </CardTitle>
            <div className="space-y-1">
              {getDynamicAlerts().map((a, i) => (
                <Alert key={i} {...a} />
              ))}
            </div>
          </Card>

          <Card>
            <CardTitle>Recent activity</CardTitle>
            <div className="flex flex-col gap-0">
              {getDynamicActivity().map((a, i) => (
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
    </div>
  );
}
