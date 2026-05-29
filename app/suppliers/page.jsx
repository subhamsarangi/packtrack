"use client";
import { useState } from "react";
import { suppliers, supplierMetrics } from "@/lib/data";
import { Card, CardTitle, MetricCard, StatusDot, ProgressBar, Table, Tr, Td, Btn, InfoHelper } from "@/components/ui";
import { IconBook } from "@tabler/icons-react";

export default function Suppliers() {
  const [showGuide, setShowGuide] = useState(true);

  return (
    <div className="space-y-6">
      {/* QUICK START GUIDE */}
      {showGuide && (
        <div className="bg-[#EAF3DE] border border-[#d2e7b9] rounded-xl p-5 shadow-sm text-text-primary transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <IconBook size={20} className="text-[#3B6D11] shrink-0" />
              <h3 className="text-sm font-bold text-[#3B6D11]">Supplier Management Quick-Start Guide</h3>
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
              <span className="text-xs font-bold text-[#3B6D11] block">1. Onboard Vetted Partners</span>
              <p className="text-[11.5px] text-text-secondary leading-relaxed">
                Connect raw materials suppliers and converters. Check current data sync status and Category labels (Glass, Rigid, etc.).
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#3B6D11] block">2. Monitor Quality fraction</span>
              <p className="text-[11.5px] text-text-secondary leading-relaxed">
                Data quality bars measure the completeness of safety sheets and PCR declarations. Target 85%+ quality.
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#3B6D11] block">3. Escalate Gaps Immediately</span>
              <p className="text-[11.5px] text-text-secondary leading-relaxed">
                Use &quot;Request&quot; or &quot;Escalate&quot; action triggers on underperforming, non-compliant partners to obtain overdue files.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* METRICS DASHBOARD GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {supplierMetrics.map((m) => {
          let tooltip = "";
          if (m.label === "Total suppliers") tooltip = "Total quantity of material converters, resin suppliers, and logistics partners catalogued in the system.";
          if (m.label === "Fully onboarded") tooltip = "Suppliers who have fully synchronized all mandatory material and safety declarations.";
          if (m.label === "Data gaps") tooltip = "Number of synchronized suppliers with pending or missing technical specifications and documents.";
          if (m.label === "Non-compliant") tooltip = "Partners who fail strict material recyclability threshold validations or chemical declarations.";
          
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

      <Card>
        <CardTitle action={<InfoHelper text="Comprehensive listing of connected converters, category classes, and documentation completeness scores." />}>
          Supplier compliance status
        </CardTitle>
        <Table headers={["Supplier", "Country", "Category", "Compliance", "Data quality", "Last sync", "Actions"]}>
          {suppliers.map((s) => {
            // Determine button label and styling based on status
            let btnLabel = "View";
            let btnClass = "";
            if (s.status === "Non-compliant") {
              if (s.name === "Verpack NL") {
                btnLabel = "Escalate";
                btnClass = "bg-bg-danger text-text-danger border-transparent hover:bg-[#fecaca]";
              } else {
                btnLabel = "Request";
                btnClass = "bg-bg-warning text-text-warning border-transparent hover:bg-[#fde68a]";
              }
            } else if (s.status === "Partial") {
              btnLabel = "Request";
              btnClass = ""; // default secondary style
            }

            return (
              <Tr key={s.name}>
                <Td className="font-semibold text-text-primary">{s.name}</Td>
                <Td className="text-text-secondary font-medium">{s.country}</Td>
                <Td className="text-text-secondary font-medium">{s.category}</Td>
                <Td className="font-semibold text-[13px] text-text-primary inline-flex items-center mt-1">
                  <StatusDot status={s.status} />
                  <span>{s.status}</span>
                </Td>
                <Td>
                  <ProgressBar value={s.quality} />
                </Td>
                <Td className="text-xs text-text-tertiary font-medium">{s.sync}</Td>
                <Td>
                  <Btn small className={btnClass}>
                    {btnLabel}
                  </Btn>
                </Td>
              </Tr>
            );
          })}
        </Table>
      </Card>
    </div>
  );
}
