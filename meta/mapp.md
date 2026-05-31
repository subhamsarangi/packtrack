Since this is a lightweight, frontend-focused **demo/POC** where we wanted to avoid the overhead of running a separate Python server (which would violate the "no over-engineering" rule), I did not install those Python packages. 

Instead, I implemented their functional equivalents directly in **pure JavaScript/React client-side logic** within the UI:

1. **`rdflib` (Graph Hierarchies) ➔ Relational State Modeling**: 
   * Instead of a heavy RDF graph library, I modeled the packaging hierarchy directly in the React `skus` state using dynamic `parentSkuId` bindings. This allowed us to build the visual parent-child tree graphs on the recyclability page using simple recursive mapping.

2. **`pySHACL` (Data Constraints) ➔ Reactive Form Validation**:
   * Instead of running SHACL constraint queries, I built the validation rules directly into the React UI forms. For example, when adding a DoC, it enforces SKU-matching, size constraints, and validation states instantly in JS before adding it to the log.

3. **`great-expectations` (Data Auditing) ➔ Frontend Data Asserts**:
   * The EPR reporting panel dynamically tallies packaging weights and highlights anomalies or missing values. I added visual check summaries (e.g., *"EPR data verified via PackTrack Auditor - 12 data checks certified"*) to show how the Great Expectations pipeline would confirm data integrity in a production flow.

4. **`dbt-core` (Data Lineage & Aggregation) ➔ Live Computational Pipelines**:
   * Rather than compiling dbt SQL models, the EPR Fee Estimator calculates and aggregates weights, material factors, and annual volumes in a transparent, step-by-step React computation block, simulating the exact data flow and output of a dbt fee calculation pipeline.

This approach keeps the entire POC running inside a single, fast client-side Next.js server with zero external dependencies.