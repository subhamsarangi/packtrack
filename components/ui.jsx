import { IconAlertTriangle, IconClock, IconCheck, IconInfoCircle } from "@tabler/icons-react";

// Badge
export function Badge({ children, variant = "default" }) {
  const colors = {
    success: "bg-bg-success text-text-success",
    warning: "bg-bg-warning text-text-warning",
    danger: "bg-bg-danger text-text-danger",
    info: "bg-bg-info text-text-info",
    default: "bg-bg-secondary text-text-secondary",
  };
  return (
    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-[6px] inline-flex items-center gap-1 shrink-0 ${colors[variant]}`}>
      {children}
    </span>
  );
}

// Card
export function Card({ children, className = "" }) {
  return (
    <div className={`bg-bg-primary border-[0.5px] border-border-tertiary rounded-xl p-4 sm:p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.02),0_1px_2px_-1px_rgba(0,0,0,0.02)] transition-all duration-200 hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.04),0_4px_6px_-4px_rgba(0,0,0,0.04)] ${className}`}>
      {children}
    </div>
  );
}

// CardTitle
export function CardTitle({ children, action }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 text-sm font-semibold text-text-primary">
      <span>{children}</span>
      {action && <span className="self-start sm:self-auto">{action}</span>}
    </div>
  );
}

// MetricCard
export function MetricCard({ label, value, sub, color = "text-text-primary" }) {
  return (
    <div className="bg-bg-primary border-[0.5px] border-border-tertiary rounded-xl p-4 sm:p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.02),0_1px_2px_-1px_rgba(0,0,0,0.02)] transition-all duration-200 hover:translate-y-[-2px] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05),0_4px_6px_-4px_rgba(0,0,0,0.05)]">
      <div className="text-xs font-medium text-text-secondary mb-1.5">{label}</div>
      <div className={`text-[26px] font-semibold tracking-tight ${color}`}>{value}</div>
      {sub && <div className="text-[11px] text-text-tertiary mt-1 font-medium">{sub}</div>}
    </div>
  );
}

// Alert
export function Alert({ type, text, title }) {
  const styles = {
    danger: "bg-bg-danger text-text-danger",
    warning: "bg-bg-warning text-text-warning",
    success: "bg-bg-success text-text-success",
  };
  
  const Icon = 
    type === "danger" ? IconAlertTriangle :
    type === "warning" ? IconClock : IconCheck;
    
  return (
    <div className={`rounded-[6px] p-3 text-xs md:text-sm mb-2.5 flex items-start gap-2.5 leading-relaxed ${styles[type]}`}>
      <Icon size={16} className="shrink-0 mt-0.5" />
      <div>
        {title && <strong className="font-semibold mr-1">{title}</strong>}
        <span>{text}</span>
      </div>
    </div>
  );
}

// Grade badge
export function Grade({ grade }) {
  const colors = {
    A: "bg-[#EAF3DE] text-[#3B6D11]",
    B: "bg-[#E6F1FB] text-[#185FA5]",
    C: "bg-[#FAEEDA] text-[#854F0B]",
    D: "bg-[#FAECE7] text-[#993C1D]",
    E: "bg-[#FCEBEB] text-[#A32D2D]",
  };
  return (
    <span className={`inline-flex items-center justify-center w-[26px] h-[26px] rounded-[6px] text-xs font-semibold ${colors[grade] || colors.A}`}>
      {grade}
    </span>
  );
}

// Progress bar
export function ProgressBar({ value }) {
  const color =
    value >= 80 ? "bg-[#639922]" :
    value >= 60 ? "bg-[#378ADD]" :
    value >= 40 ? "bg-[#BA7517]" : "bg-[#E24B4A]";
  return (
    <div className="inline-flex items-center gap-2">
      <div className="w-20 h-[7px] bg-bg-tertiary rounded overflow-hidden">
        <div className={`h-full rounded ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-[13px] text-text-primary font-medium">{value}%</span>
    </div>
  );
}

// StatusDot
export function StatusDot({ status }) {
  const color =
    status === "Compliant" ? "bg-[#639922]" :
    status === "Partial" ? "bg-[#BA7517]" : "bg-[#E24B4A]";
  return <span className={`inline-block w-2.5 h-2.5 rounded-full mr-2 shrink-0 ${color}`} />;
}

// Simple table
export function Table({ headers, children }) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-left border-collapse text-[13px]">
        <thead>
          <tr className="border-b border-border-tertiary">
            {headers.map((h, idx) => (
              <th key={idx} className="px-3 py-2.5 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border-tertiary/40">
          {children}
        </tbody>
      </table>
    </div>
  );
}

export function Tr({ children }) {
  return <tr className="hover:bg-bg-secondary transition-colors duration-150">{children}</tr>;
}

export function Td({ children, className = "" }) {
  return <td className={`px-3 py-3 text-text-primary align-middle ${className}`}>{children}</td>;
}

// Button
export function Btn({ children, primary, onClick, small, className = "" }) {
  const base = `font-sans font-medium rounded-[6px] inline-flex items-center justify-center gap-1.5 transition-all duration-200 shrink-0 cursor-pointer`;
  const size = small ? "text-xs px-2.5 py-1" : "text-sm px-3.5 py-1.5";
  const variant = primary
    ? "bg-bg-info text-text-info border border-transparent hover:bg-[#bae6fd] font-semibold"
    : "bg-bg-primary text-text-primary border border-border-secondary hover:bg-bg-secondary";
  
  return (
    <button className={`${base} ${size} ${variant} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

// Info Helper Tooltip
export function InfoHelper({ text }) {
  return (
    <span className="relative group inline-block ml-1 cursor-help align-middle text-text-tertiary hover:text-text-info shrink-0 select-none">
      <IconInfoCircle size={14} className="shrink-0" />
      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block w-52 bg-[#0f172a] text-white text-[11px] font-medium p-2.5 rounded-[6px] shadow-xl z-50 leading-relaxed text-center pointer-events-none transition-all duration-200">
        {text}
        <span className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-[#0f172a]" />
      </span>
    </span>
  );
}
