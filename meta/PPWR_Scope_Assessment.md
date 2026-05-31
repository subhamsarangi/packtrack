# PPWR Scope Assessment & Implementation Plan

**Regulation:** EU Packaging & Packaging Waste Regulation (PPWR) 2025/340  
**Document purpose:** Gap assessment and implementation roadmap for full regulatory scope  
**Last updated:** May 30, 2026  
**Status:** Draft — for internal review

---

## 1. Scope Coverage Assessment

### 1.1 Business Actor Scope

The PPWR applies to **all economic operators** placing packaging on the EU market. The table below maps each actor type to current coverage status in the compliance platform.

| Actor Type | PPWR Obligation | Platform Coverage | Gap |
|---|---|---|---|
| Manufacturers | Full obligations — recyclability, DPP, reporting | ✅ Covered | None |
| Importers | Full obligations — same as manufacturer for imported goods | ⚠️ Partial | Importer-specific data fields not captured |
| Distributors | Labelling, DoC pass-through, EPR contribution | ❌ Not covered | No distributor module |
| Retailers | Service packaging obligations, reuse targets (HoReCa) | ⚠️ Partial | Retail/HoReCa reuse tracking absent |
| Micro-enterprises (<10 employees, ≤€2M turnover) | Lighter rules — core obligations only, reduced reporting | ❌ Not covered | No micro-enterprise flag or rule-set |
| Exporters to EU | EPR registration, packaging data submission per member state | ❌ Not covered | No EPR registration module |

**Assessment:** 2 of 6 actor types fully covered. 4 require implementation work.

---

### 1.2 Packaging Type Scope

The PPWR covers all packaging categories. Current SKU data model must capture all four types.

| Packaging Type | Definition | Current Status | Action Required |
|---|---|---|---|
| Primary | Directly contains the product (bottle, blister pack, wrapper) | ✅ Covered | None |
| Secondary | Groups primary packs for retail (cardboard sleeve, shrink wrap) | ⚠️ Partial | Secondary SKUs not consistently linked to primary |
| Tertiary | Transport/logistics packaging (pallets, stretch wrap, boxes) | ❌ Not covered | No tertiary packaging category in data model |
| Service packaging | Provided at point of sale (bags, cups, takeaway containers) | ❌ Not covered | No service packaging workflow; HoReCa sector absent |

**Assessment:** 1 of 4 packaging types fully covered. Data model expansion required.

---

### 1.3 EPR Exporter Obligations

Exporters placing packaging on the EU market via any channel (direct, marketplace, B2B) must:

1. Register with the national producer responsibility organisation (PRO) in each EU member state of sale
2. Report packaging data: type, weight (kg), recyclability grade, recycled content (%)
3. Pay EPR fees based on packaging placed on market
4. Maintain records for minimum 5 years

**Current platform coverage:** None. No EPR module exists.

---

## 2. Gap Analysis

### 2.1 Critical Gaps (must fix before next filing period)

**GAP-01 — No distributor/retailer compliance workflow**  
Distributors and retailers must pass through Declarations of Conformity, comply with labelling obligations, and (for retailers) meet reuse targets for service packaging (e.g. 10% of drinks in reusable containers by 2030 under HoReCa rules). The platform has no actor-type routing — all users are treated as manufacturers.

**GAP-02 — Tertiary and service packaging not in data model**  
The SKU schema captures primary packaging only. Tertiary packaging (pallets, transport wrap) carries significant weight and recyclability obligations. Service packaging (HoReCa) has separate reuse quota requirements. Both are invisible to the current system.

**GAP-03 — No EPR registration and reporting module**  
Exporters to the EU must register in each member state of sale. This is a per-country process with different national PROs (e.g. PRO Europa in Germany, Citeo in France, ECOEMBES in Spain). Without this module, exporters using the platform have no path to compliance.

**GAP-04 — No micro-enterprise mode**  
Micro-enterprises are subject to a reduced obligation set: core recyclability and recycled content rules apply, but detailed DPP generation and some reporting obligations are waived. The platform applies the same rule-set to all users, creating unnecessary compliance burden and potential inaccurate assessments for micro-enterprise users.

### 2.2 Secondary Gaps (address within 6 months)

**GAP-05 — Secondary packaging not linked to primary**  
Secondary packaging SKUs exist in some supplier data but are not systematically linked to the primary packaging they contain. Recyclability and recycled content must be reported at the packaging system level, not just the individual unit.

**GAP-06 — No per-member-state EPR fee calculation**  
EPR fees vary by country and packaging category. Even when EPR data is collected, there is no fee estimation or comparison tool to help exporters budget obligations across EU markets.

**GAP-07 — No actor-type onboarding flow**  
New users are not classified by actor type at onboarding, meaning the platform cannot tailor the compliance checklist, data collection fields, or reporting templates to their role in the supply chain.

---

## 3. Implementation Plan

### Phase 1 — Data model and actor scope (Weeks 1–4)

**3.1 Extend packaging type taxonomy**

Add packaging type field to all SKU records with four values: `primary`, `secondary`, `tertiary`, `service`. Enforce type selection at SKU creation. Backfill existing SKUs via bulk classification tool (Excel template + AI-assisted suggestion based on description).

Deliverables:
- Updated SKU schema with `packaging_type` field
- Bulk reclassification tool for existing 1,284 SKUs
- Secondary-to-primary linkage (parent-child SKU relationship)

**3.2 Add actor-type classification**

At organisation onboarding and in account settings, require selection of actor type(s): manufacturer, importer, distributor, retailer, exporter, or micro-enterprise. A single organisation may hold multiple roles (e.g. manufacturer + exporter).

Deliverables:
- Actor type field in organisation settings
- Role-based compliance checklist generator
- Micro-enterprise flag that suppresses DPP generation requirement and reduces reporting scope

---

### Phase 2 — EPR exporter module (Weeks 5–10)

**3.3 EPR registration tracker**

Build a per-member-state EPR registration workflow. For each EU country where the organisation sells packaging, track:

- PRO name and registration portal URL
- Registration number (once obtained)
- Registration status: not started / in progress / registered / renewal due
- Registration renewal date
- Responsible contact person

Supported countries (priority order based on market size): Germany (Lucid/PRO Europa), France (Citeo), Spain (ECOEMBES), Italy (CONAI), Netherlands (Nedvang), Poland (BDO), Belgium (Fostplus).

**3.4 EPR data reporting per country**

For each registered member state, generate the required data package:

- Total packaging placed on market (kg) by packaging type
- Recyclability grade distribution
- Recycled content percentage weighted average
- Number of units by material category

Output formats: CSV (for manual upload to national PRO portals), PDF summary report, API submission where PRO systems support it.

**3.5 EPR fee estimator**

Provide indicative EPR fee estimates based on:
- Packaging weight and type
- Country of sale
- Current PRO fee schedules (updated annually)

Flag where actual fees require direct PRO confirmation. This is a planning tool, not a legal fee assessment.

---

### Phase 3 — Distributor and retailer workflows (Weeks 11–16)

**3.6 Distributor DoC pass-through**

Distributors do not generate their own Declaration of Conformity — they receive it from the manufacturer or importer and are responsible for retaining and passing it on. Build a DoC inbox and forwarding workflow:

- Receive DoC documents from upstream actors (email ingestion or API)
- Store against relevant SKU with 5-year retention
- Generate downstream forwarding package for retail customers

**3.7 HoReCa reuse tracking (retailers)**

For retailers and food service operators, track:

- Volume of single-use versus reuse-format service packaging by category
- Reuse percentage against PPWR targets (10% reusable drinks containers by 2030; 40% by 2040)
- Consumer reuse option availability flag (required for HoReCa from 2027)

**3.8 Micro-enterprise compliance mode**

When an organisation is flagged as micro-enterprise:

- Suppress DPP generation requirement (not mandatory for micro-enterprises until delegated act specifies otherwise)
- Reduce reporting to: packaging type, weight, recyclability grade, recycled content
- Display simplified compliance checklist
- Flag if organisation approaches threshold (turnover or headcount) that would move them to full obligations

---

## 4. Summary Action Table

| ID | Action | Owner | Priority | Target date |
|---|---|---|---|---|
| GAP-01 | Add actor-type field and role-based workflows | Product / Engineering | Critical | Week 4 |
| GAP-02 | Extend SKU schema: tertiary + service packaging | Engineering | Critical | Week 3 |
| GAP-03 | Build EPR registration and reporting module | Engineering | Critical | Week 10 |
| GAP-04 | Implement micro-enterprise compliance mode | Product | Critical | Week 6 |
| GAP-05 | Link secondary packaging to primary SKUs | Engineering | High | Week 4 |
| GAP-06 | Add per-country EPR fee estimator | Product | Medium | Week 12 |
| GAP-07 | Actor-type onboarding flow | Product / UX | High | Week 5 |

---

## 5. Acceptance Criteria

The platform is considered scope-complete when:

1. All six actor types can be registered and receive a tailored compliance workflow
2. All four packaging types are capturable and reportable
3. EPR registration status is tracked for all EU member states where packaging is sold
4. EPR data packages can be generated in formats accepted by the seven priority national PROs
5. Micro-enterprise mode correctly suppresses non-mandatory obligations
6. Distributor DoC pass-through can be completed without leaving the platform
7. HoReCa reuse targets are tracked with a progress indicator against 2027 and 2030 milestones

---

---

## 6. Open-Source Python Stack

The following tools require no account, no API key, and no cloud. All install locally via `pip`.

### 6.1 Tool Overview

| Tool | Role in PPWR Compliance | Install |
|---|---|---|
| **rdflib** | Models packaging hierarchy as linked data (product → primary → secondary → tertiary) | `pip install rdflib` |
| **pySHACL** | Validates compliance data is complete and correctly structured before regulatory submission | `pip install pyshacl` |
| **great-expectations** | Certifies EPR data package numbers (kg, recycled content %, recyclability grades) are trustworthy before filing | `pip install great_expectations` |
| **dbt-core** | Tracks full lineage from raw SKU data through to final EPR report figures; enables audit defence | `pip install dbt-core` |

### 6.2 Mapping to Implementation Plan

| Phase | Gap | Tool | Purpose |
|---|---|---|---|
| Phase 1 — Week 3 | GAP-02 (tertiary + service packaging) | **rdflib** | Model parent-child SKU relationships (primary → secondary → tertiary) as RDF graph instead of flat schema |
| Phase 1 — Week 4 | GAP-05 (secondary not linked to primary) | **rdflib** | Link secondary packaging SKUs to primary via RDF triples; queryable across all 1,284 SKUs |
| Phase 1 — Week 4 | GAP-02 (packaging type validation) | **pySHACL** | Enforce at SKU creation: `packaging_type` must be present, recycled content % must be numeric and 0–100 |
| Phase 2 — Week 10 | GAP-03 (EPR data packages) | **great-expectations** | Validate per-country data packages before CSV submission to national PROs (Citeo, CONAI, PRO Europa, etc.) |
| Phase 2 — Week 12 | GAP-06 (EPR fee estimator) | **dbt-core** | Full lineage from raw SKU weight data → aggregation → country filter → fee calculation; auditable at every step |

### 6.3 Why This Matters for PPWR Specifically

PPWR compliance is not just data collection — it is **provable data collection**. Regulators and national PROs can challenge figures. The stack above addresses the three failure modes:

- **Wrong structure** — pySHACL catches missing fields before they reach a regulator
- **Wrong numbers** — great-expectations certifies pipeline output is statistically valid
- **Can't explain the number** — dbt lineage traces any reported figure back to its source

---

*Document owner: Compliance & Product team*  
*Review cycle: Quarterly or upon PPWR amendment detection*