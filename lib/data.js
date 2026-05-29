export const metrics = [
  { label: "Overall score", value: "78%", sub: "↑ 4pts from Q1", color: "text-[#1D9E75]" },
  { label: "SKUs tracked", value: "1,284", sub: "94 unresolved gaps" },
  { label: "Recyclability A/B", value: "61%", sub: "Target: 70% by 2026" },
  { label: "Recycled content", value: "34%", sub: "Min 30% met ✓" },
  { label: "Suppliers onboarded", value: "87%", sub: "18 pending" },
];

export const alerts = [
  { type: "danger", title: "PET-005:", text: "Recyclability grade D — below 2026 threshold. Reformulation required." },
  { type: "danger", title: "SUP-Kronos GmbH:", text: "Technical doc overdue — 5-year retention breach risk." },
  { type: "warning", title: "Q3 DoC filing", text: "due in 14 days. 12 SKUs pending declaration." },
  { type: "success", title: "", text: "Mass balance audit for recycled PE complete. All 4 suppliers verified." },
];

export const activity = [
  { color: "bg-[#639922]", text: "DPP generated for SKU PKG-1041", meta: "2 hours ago · Automated" },
  { color: "bg-[#378ADD]", text: "Supplier data received — Amcor Italia", meta: "Yesterday · API sync" },
  { color: "bg-[#BA7517]", text: "Recyclability re-assessment triggered on 6 SKUs", meta: "2 days ago · AI recommendation" },
  { color: "bg-[#639922]", text: "Q1 PPWR report submitted to BfR", meta: "Apr 30 · Regulatory filing" },
  { color: "bg-[#378ADD]", text: "PPWR Amendment 2026/12 detected & parsed", meta: "May 15 · Regulation monitor" },
];

export const skus = [
  { id: "PKG-1001", name: "Shampoo bottle 250ml", material: "HDPE", grade: "A", recycled: 42, foodSafe: "Yes", status: "Compliant" },
  { id: "PKG-1012", name: "Yogurt tub 500g", material: "PP", grade: "B", recycled: 31, foodSafe: "Yes", status: "Compliant" },
  { id: "PKG-1023", name: "Flexible snack pouch", material: "Multi-layer", grade: "D", recycled: 8, foodSafe: "Review", status: "At risk" },
  { id: "PKG-1041", name: "Olive oil bottle 1L", material: "Glass", grade: "A", recycled: 55, foodSafe: "Yes", status: "Compliant" },
  { id: "PKG-1055", name: "Beverage can 330ml", material: "Aluminium", grade: "A", recycled: 70, foodSafe: "Yes", status: "Compliant" },
  { id: "PKG-1005", name: "Clear PET tray", material: "PET-A", grade: "E", recycled: 0, foodSafe: "Fail", status: "Non-compliant" },
  { id: "PKG-1067", name: "Cardboard shipper box", material: "Corrugated board", grade: "A", recycled: 80, foodSafe: "Yes", status: "Compliant" },
];

export const suppliers = [
  { name: "Amcor Italia", country: "🇮🇹 IT", category: "Rigid plastic", status: "Compliant", quality: 96, sync: "1h ago" },
  { name: "Vetri Italia SpA", country: "🇮🇹 IT", category: "Glass", status: "Compliant", quality: 100, sync: "3h ago" },
  { name: "Kronos GmbH", country: "🇩🇪 DE", category: "Flexible film", status: "Non-compliant", quality: 58, sync: "8 days ago" },
  { name: "Nordic Pulp AB", country: "🇸🇪 SE", category: "Paper/Board", status: "Compliant", quality: 89, sync: "Yesterday" },
  { name: "Alucán SA", country: "🇪🇸 ES", category: "Aluminium", status: "Partial", quality: 72, sync: "3 days ago" },
  { name: "Verpack NL", country: "🇳🇱 NL", category: "Multi-layer", status: "Non-compliant", quality: 34, sync: "12 days ago" },
];

export const supplierMetrics = [
  { label: "Total suppliers", value: "143" },
  { label: "Fully onboarded", value: "125", color: "text-[#1D9E75]" },
  { label: "Data gaps", value: "18", color: "text-[#BA7517]" },
  { label: "Non-compliant", value: "4", color: "text-[#E24B4A]" },
];

export const reports = [
  { name: "Q2 2026 PPWR Report", sub: "Regulatory submission · Due Jun 30", btn: "Generate", primary: true },
  { name: "EU Declaration of Conformity", sub: "12 SKUs pending signature", btn: "Draft DoC" },
  { name: "Technical documentation", sub: "5-year retention · 1,284 SKUs", btn: "Export archive" },
  { name: "Mass balance audit trail", sub: "Recycled content verification", btn: "View audit" },
];

export const filings = [
  { name: "PPWR Annual Report", period: "FY 2025", authority: "European Commission", filed: "Jan 31, 2026", status: "Accepted" },
  { name: "Q1 PPWR Report", period: "Q1 2026", authority: "BfR Germany", filed: "Apr 30, 2026", status: "Accepted" },
  { name: "Q2 PPWR Report", period: "Q2 2026", authority: "—", filed: "—", status: "Pending" },
];

export const regulations = [
  {
    badge: "Active", badgeVariant: "success",
    title: "PPWR — EU Packaging & Packaging Waste Regulation 2025/340",
    desc: "Primary regulation. Recyclability grades, recycled content minimums, DPP requirement, reuse targets by sector.",
    date: "In force: Jan 1, 2025 · Full application: Dec 31, 2026",
  },
  {
    badge: "Update", badgeVariant: "warning",
    title: "PPWR Amendment 2026/12 — Annex IV recycled content tables revised",
    desc: "Minimum recycled content thresholds for contact-sensitive plastics increased to 30% effective Q3 2026. Impact: 47 SKUs require review.",
    date: "Detected: May 15, 2026 · Action required by: Sep 1, 2026",
  },
  {
    badge: "Monitor", badgeVariant: "info",
    title: "EUDR — EU Deforestation Regulation",
    desc: "Paper, cardboard, and wood-based packaging supply chains must demonstrate deforestation-free sourcing. Overlap with PPWR supplier data requirements.",
    date: "Applies: Dec 30, 2025 · Cross-regulation spine active",
  },
  {
    badge: "Upcoming", badgeVariant: "info",
    title: "DPP Delegated Act — Digital interface technical standards",
    desc: "European Commission technical specification for QR code data schema and interoperability requirements for Digital Product Passports.",
    date: "Draft expected: Q4 2026 · AI parsing: scheduled",
  },
  {
    badge: "Watch", badgeVariant: "info",
    title: "ESPR — Ecodesign for Sustainable Products Regulation",
    desc: "Packaging categories may be subject to ESPR product group regulations from 2027. DPP requirements may overlap with PPWR DPP.",
    date: "Watch list · Next review: Q3 2026",
  },
];
