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
    scope: "All Packaging Materials (Glass, Plastics, Paper/Board, Metal, Multi-layers)",
    details: "The overarching EU Packaging and Packaging Waste Regulation establishing harmonized design requirements, mandatory recyclability performance grades (A-E), post-consumer recycled (PCR) content quotas, digital product passports (DPPs), and waste reduction targets across all member states.",
    milestones: [
      { date: "Jan 1, 2025", task: "Regulation entered into force across the EU" },
      { date: "Jan 1, 2026", task: "Exemptions register established for micro-enterprises" },
      { date: "Dec 31, 2026", task: "Full application & enforcement of Grade A-C recyclability requirements" }
    ],
    actionText: "Download Full PPWR Text",
    actionMsg: "Downloading official EU PPWR 2025/340 legislative PDF dossier..."
  },
  {
    badge: "Update", badgeVariant: "warning",
    title: "PPWR Amendment 2026/12 — Annex IV recycled content tables revised",
    desc: "Minimum recycled content thresholds for contact-sensitive plastics increased to 30% effective Q3 2026. Impact: 47 SKUs require review.",
    date: "Detected: May 15, 2026 · Action required by: Sep 1, 2026",
    scope: "Contact-Sensitive Plastics (PET, PP, HDPE Food Safety Grades)",
    details: "A critical amendment revising the ramp-up schedules for post-consumer recycled plastic packaging. Minimum PCR blend fractions in food-contact sensitive polymers are increased to 30% a full year ahead of schedule, requiring immediate material audits of raw stock blends.",
    milestones: [
      { date: "May 15, 2026", task: "Amendment published in the Official Journal of the EU" },
      { date: "Jul 1, 2026", task: "Grace period for transitioning running extruder orders ends" },
      { date: "Sep 1, 2026", task: "Strict enforcement of 30% PCR minimum threshold begins" }
    ],
    actionText: "Analyze PCR Gaps",
    actionMsg: "Scanning active packaging catalog for plastic food-contact SKUs with less than 30% PCR..."
  },
  {
    badge: "Monitor", badgeVariant: "info",
    title: "EUDR — EU Deforestation Regulation",
    desc: "Paper, cardboard, and wood-based packaging supply chains must demonstrate deforestation-free sourcing. Overlap with PPWR supplier data requirements.",
    date: "Applies: Dec 30, 2025 · Cross-regulation spine active",
    scope: "Paper, Corrugated Board, Softwood/Timber, Cork closures",
    details: "Imposes strict due diligence obligations on companies placing timber, paper, and pulp products on the European market. Operators must trace all raw wood fibers back to the specific plot of land where they were harvested to certify deforestation-free sourcing.",
    milestones: [
      { date: "Jun 30, 2025", task: "Traceability reporting schemas published by EU Commission" },
      { date: "Dec 30, 2025", task: "Full EUDR compliance obligations go active for large operators" },
      { date: "Jun 30, 2026", task: "SME and micro-enterprise compliance transition window closes" }
    ],
    actionText: "Verify Wood Pulp Traceability",
    actionMsg: "Auditing paper, boxboard, and timber suppliers for due diligence certificates..."
  },
  {
    badge: "Active", badgeVariant: "success",
    title: "VerpackG — German Packaging Act LUCID Registry Audit",
    desc: "Germany. Expansion of mandatory deposit (Pfand) schemes to beverage cartons/PET and registration audits via central LUCID register.",
    date: "LUCID Register active · Audit due Q4 2026",
    scope: "Liquid Beverage Cartons, PET beverage bottles, Glass jars",
    details: "The latest German VerpackG revision extends deposit-return schemes (Pfandpflicht) to cover all dairy, milk, and sensitive protein packaging. It also mandates rigorous independent audits of EPR volume declarations uploaded to the centralized LUCID registry.",
    milestones: [
      { date: "Jan 1, 2026", task: "Dairy deposit schemes go live across German retail points" },
      { date: "Jun 30, 2026", task: "LUCID mid-year volume declarations due" },
      { date: "Nov 30, 2026", task: "Independent auditor certificates must be submitted to LUCID portal" }
    ],
    actionText: "Verify LUCID Registrations",
    actionMsg: "Cross-referencing active German catalog volume logs with LUCID EPR portal..."
  },
  {
    badge: "Warning", badgeVariant: "danger",
    title: "UK Plastic Packaging Tax (PPT) 2026 Revision",
    desc: "United Kingdom. Tax penalty increased for any plastic packaging component containing less than 30% recycled PCR content.",
    date: "In force · Higher rate applies since Apr 1, 2026",
    scope: "All Plastic Packaging (Rigid, Flexible, Laminated layers)",
    details: "The UK Government has increased the Plastic Packaging Tax rate to penalize plastic packaging components produced in or imported into the UK that contain less than 30% recycled plastic. Audits require robust evidence of mass-balance records from chemical or mechanical recyclers.",
    milestones: [
      { date: "Apr 1, 2026", task: "New tax rate of £217.85 per metric tonne becomes active" },
      { date: "Jul 31, 2026", task: "Q2 UK PPT quarterly declaration and tax payment due" },
      { date: "Oct 31, 2026", task: "Q3 UK PPT quarterly declarations close" }
    ],
    actionText: "Audit UK Shipments",
    actionMsg: "Running tax liability assessment on UK-destined rigid & flexible packaging..."
  },
  {
    badge: "Upcoming", badgeVariant: "info",
    title: "PPWR Article 22 — HoReCa Single-Use Plastic Restrictions",
    desc: "EU-wide. Ban on single-use plastic packaging in hotels, restaurants, and cafés for dine-in consumption.",
    date: "Enforcement: Jan 1, 2027 · HoReCa tracking active",
    scope: "PLA-coated paper cups, Polystyrene meal trays, Single-use condiment sachets",
    details: "Under PPWR Article 22, single-use plastic packaging at hospitality dine-in points will be prohibited. Establishments must offer reusable alternatives or compostable solutions, and consumers must have clear options to opt-in for reusable takeaway systems.",
    milestones: [
      { date: "Dec 31, 2025", task: "HoReCa volume mapping dashboard completed in PackTrack" },
      { date: "Jun 30, 2026", task: "Reusable takeaway standard formats finalized by Member States" },
      { date: "Jan 1, 2027", task: "Dine-in single-use plastic ban becomes legally enforceable" }
    ],
    actionText: "Assess HoReCa Volumes",
    actionMsg: "Analyzing HoReCa takeaway vs. dine-in container volumes and compostable rates..."
  },
  {
    badge: "Upcoming", badgeVariant: "info",
    title: "DPP Delegated Act — Digital interface technical standards",
    desc: "European Commission technical specification for QR code data schema and interoperability requirements for Digital Product Passports.",
    date: "Draft expected: Q4 2026 · AI parsing: scheduled",
    scope: "All Consumer-Facing Packaging (Primary & Service levels)",
    details: "Defines the exact digital payload, schema structure, data fields, and decentralized registry lookup protocols for the mandatory consumer-facing Digital Product Passports (DPPs). Interoperability with standard GS1 QR codes is key.",
    milestones: [
      { date: "Sep 2026", task: "Joint Research Centre draft data schema released for public feedback" },
      { date: "Dec 2026", task: "Official Delegated Act published by European Commission" },
      { date: "Jun 2027", task: "Mandatory system integration window opens for consumer brands" }
    ],
    actionText: "Preview DPP Schema",
    actionMsg: "Loading PackTrack standard DPP template with experimental Delegated Act JSON schema..."
  },
  {
    badge: "Watch", badgeVariant: "info",
    title: "ESPR — Ecodesign for Sustainable Products Regulation",
    desc: "Packaging categories may be subject to ESPR product group regulations from 2027. DPP requirements may overlap with PPWR DPP.",
    date: "Watch list · Next review: Q3 2026",
    scope: "Secondary & Tertiary packaging, Industrial film packaging",
    details: "An EU framework setting ecodesign requirements across almost all physical goods. Secondary and tertiary transport packaging are heavily targeted to enforce circularity standards, high durability, and easy recyclability prior to logistics loops.",
    milestones: [
      { date: "Jul 2026", task: "ESPR first working plan prioritized product categories list finalized" },
      { date: "Oct 2026", task: "Ecodesign requirements workshop for packaging materials" },
      { date: "Jan 2027", task: "Coordination checks between ESPR and PPWR digital systems" }
    ],
    actionText: "Check Ecodesign Overlaps",
    actionMsg: "Cross-referencing secondary & tertiary packaging specs with ESPR durable guidelines..."
  }
];
