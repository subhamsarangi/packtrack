"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const ComplianceContext = createContext();

const INITIAL_SKUS = [
  { id: "PKG-1001", name: "Shampoo bottle 250ml", packaging_type: "primary", material: "HDPE", grade: "A", recycled: 42, foodSafe: "Yes", status: "Compliant", parentSkuId: "PKG-SEC-501" },
  { id: "PKG-1012", name: "Yogurt tub 500g", packaging_type: "primary", material: "PP", grade: "B", recycled: 31, foodSafe: "Yes", status: "Compliant", parentSkuId: "PKG-SEC-502" },
  { id: "PKG-1023", name: "Flexible snack pouch", packaging_type: "primary", material: "Multi-layer", grade: "D", recycled: 8, foodSafe: "Review", status: "At risk", parentSkuId: "PKG-SEC-503" },
  { id: "PKG-1041", name: "Olive oil bottle 1L", packaging_type: "primary", material: "Glass", grade: "A", recycled: 55, foodSafe: "Yes", status: "Compliant", parentSkuId: "PKG-SEC-504" },
  { id: "PKG-1055", name: "Beverage can 330ml", packaging_type: "primary", material: "Aluminium", grade: "A", recycled: 70, foodSafe: "Yes", status: "Compliant", parentSkuId: "" },
  { id: "PKG-1005", name: "Clear PET tray", packaging_type: "primary", material: "PET-A", grade: "E", recycled: 0, foodSafe: "Fail", status: "Non-compliant", parentSkuId: "" },
  
  // Secondary Packaging
  { id: "PKG-SEC-501", name: "Cardboard Carton Sleeve (Shampoo)", packaging_type: "secondary", material: "Folding Boxboard", grade: "A", recycled: 85, foodSafe: "Yes", status: "Compliant", parentSkuId: "PKG-TER-901" },
  { id: "PKG-SEC-502", name: "Plastic Shrink Wrap 6-pack (Yogurt)", packaging_type: "secondary", material: "LDPE Film", grade: "C", recycled: 30, foodSafe: "Yes", status: "Compliant", parentSkuId: "PKG-TER-902" },
  { id: "PKG-SEC-503", name: "Corrugated Box 24-pack (Snacks)", packaging_type: "secondary", material: "Corrugated Board", grade: "A", recycled: 90, foodSafe: "Yes", status: "Compliant", parentSkuId: "PKG-TER-901" },
  { id: "PKG-SEC-504", name: "Wooden Presentation Tray (Olive Oil)", packaging_type: "secondary", material: "Softwood", grade: "B", recycled: 0, foodSafe: "Yes", status: "Compliant", parentSkuId: "" },
  
  // Tertiary Packaging
  { id: "PKG-TER-901", name: "Standard Wooden Euro Pallet", packaging_type: "tertiary", material: "Timber", grade: "A", recycled: 0, foodSafe: "Yes", status: "Compliant", parentSkuId: "" },
  { id: "PKG-TER-902", name: "Stretch Logistics Wrap (Heavy-duty)", packaging_type: "tertiary", material: "LLDPE Film", grade: "C", recycled: 35, foodSafe: "Yes", status: "Compliant", parentSkuId: "" },
  { id: "PKG-TER-903", name: "Heavy Polypropylene Strapping", packaging_type: "tertiary", material: "PP Straps", grade: "D", recycled: 15, foodSafe: "Review", status: "At risk", parentSkuId: "" },

  // Service Packaging
  { id: "PKG-SRV-201", name: "PLA-Coated Paper Coffee Cup", packaging_type: "service", material: "Coated Paper", grade: "B", recycled: 20, foodSafe: "Yes", status: "Compliant", parentSkuId: "" },
  { id: "PKG-SRV-202", name: "Polystyrene Takeaway Box", packaging_type: "service", material: "Polystyrene", grade: "D", recycled: 0, foodSafe: "Review", status: "At risk", parentSkuId: "" },
  { id: "PKG-SRV-203", name: "Recycled Kraft Carry Bag", packaging_type: "service", material: "Kraft Paper", grade: "A", recycled: 100, foodSafe: "Yes", status: "Compliant", parentSkuId: "" },
];

const INITIAL_EPR = [
  { country: "Germany", code: "DE", proName: "LUCID / PRO Europa", url: "https://www.verpackungsregister.org/", regNo: "DE84920482910", status: "Registered", renewal: "2026-12-31", contact: "Hans Müller" },
  { country: "France", code: "FR", proName: "Citeo", url: "https://www.citeo.com/", regNo: "FR-983021_01EPR", status: "Registered", renewal: "2026-10-15", contact: "Chantal Dubois" },
  { country: "Spain", code: "ES", proName: "ECOEMBES", url: "https://www.ecoembes.com/", regNo: "ES-REGR-2849", status: "In progress", renewal: "2026-09-30", contact: "Carlos Gomez" },
  { country: "Italy", code: "IT", proName: "CONAI", url: "https://www.conai.org/", regNo: "", status: "Not started", renewal: "—", contact: "Giovanni Rossi" },
  { country: "Netherlands", code: "NL", proName: "Nedvang / Afvalfonds", url: "https://afvalfondsverpakkingen.nl/", regNo: "", status: "Not started", renewal: "—", contact: "Sven de Jong" },
  { country: "Poland", code: "PL", proName: "BDO Register", url: "https://bdo.mos.gov.pl/", regNo: "", status: "Not started", renewal: "—", contact: "Anna Kowalski" },
  { country: "Belgium", code: "BE", proName: "Fost Plus", url: "https://www.fostplus.be/", regNo: "", status: "Not started", renewal: "—", contact: "Jean Dupont" },
];

const INITIAL_DOCS = [
  { id: "DOC-2026-001", skuId: "PKG-1001", filename: "DoC_HDPE_Shampoo_Amcor.pdf", uploadedBy: "Amcor Italia", date: "May 10, 2026", retention: "5 years (Active)", size: "412 KB", status: "Verified" },
  { id: "DOC-2026-002", skuId: "PKG-1012", filename: "DoC_PP_YogurtTub_Kronos.pdf", uploadedBy: "Kronos GmbH", date: "May 18, 2026", retention: "5 years (Active)", size: "389 KB", status: "Verified" },
  { id: "DOC-2026-003", skuId: "PKG-SEC-501", filename: "DoC_CardboardSleeve_Nordic.pdf", uploadedBy: "Nordic Pulp AB", date: "May 25, 2026", retention: "5 years (Active)", size: "522 KB", status: "Verified" },
];

export function ComplianceProvider({ children }) {
  const [actorTypes, setActorTypes] = useState({
    manufacturer: true,
    importer: false,
    distributor: false,
    retailer: false,
    exporter: true,
    microEnterprise: false,
  });

  const [skus, setSkus] = useState(INITIAL_SKUS);
  const [eprRegistrations, setEprRegistrations] = useState(INITIAL_EPR);
  const [distributorDocs, setDistributorDocs] = useState(INITIAL_DOCS);
  
  // HoReCa service packaging volumes (thousands of units / month)
  const [horecaData, setHorecaData] = useState({
    singleUseCups: 85,
    reusableCups: 12,
    singleUseBoxes: 110,
    reusableBoxes: 8,
    consumerOptionEnabled: false,
  });

  const toggleActorType = (type) => {
    setActorTypes((prev) => {
      const next = { ...prev, [type]: !prev[type] };
      // Micro-enterprise has specific toggling behavior
      if (type === "microEnterprise") {
        // If enabling micro-enterprise, we keep other rules simplified
      }
      return next;
    });
  };

  const setActorScope = (roles) => {
    setActorTypes((prev) => ({ ...prev, ...roles }));
  };

  const updateSkuLink = (skuId, parentSkuId) => {
    setSkus((prev) =>
      prev.map((sku) => (sku.id === skuId ? { ...sku, parentSkuId } : sku))
    );
  };

  const addSku = (newSku) => {
    setSkus((prev) => [...prev, newSku]);
  };

  const updateEprStatus = (countryCode, fields) => {
    setEprRegistrations((prev) =>
      prev.map((reg) => (reg.code === countryCode ? { ...reg, ...fields } : reg))
    );
  };

  const addDistributorDoc = (doc) => {
    setDistributorDocs((prev) => [doc, ...prev]);
  };

  const updateHoreca = (fields) => {
    setHorecaData((prev) => ({ ...prev, ...fields }));
  };

  return (
    <ComplianceContext.Provider
      value={{
        actorTypes,
        setActorTypes,
        toggleActorType,
        setActorScope,
        skus,
        setSkus,
        updateSkuLink,
        addSku,
        eprRegistrations,
        updateEprStatus,
        distributorDocs,
        addDistributorDoc,
        horecaData,
        updateHoreca,
      }}
    >
      {children}
    </ComplianceContext.Provider>
  );
}

export function useCompliance() {
  const context = useContext(ComplianceContext);
  if (!context) {
    throw new Error("useCompliance must be used within a ComplianceProvider");
  }
  return context;
}
