import { IconArrowUpRight, IconCalendarEvent, IconCertificate } from "@tabler/icons-react";

export default function Footer() {
  return (
    <footer className="mt-12 pt-8 border-t border-border-tertiary bg-bg-primary -mx-4 sm:-mx-8 -mb-4 sm:-mb-8 px-4 sm:px-8 pb-6 select-none shrink-0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Column 1: Official Sources */}
        <div className="space-y-3">
          <h4 className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider">Official & Regulatory Sources</h4>
          <ul className="space-y-1">
            <li>
              <a
                href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32025R0040"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-text-secondary hover:text-[#1D9E75] font-medium transition-colors duration-150 flex items-center gap-1 py-1"
              >
                <span>EUR-Lex: Full Legal Text (2025/40)</span>
                <IconArrowUpRight size={12} className="shrink-0 opacity-60" />
              </a>
            </li>
            <li>
              <a
                href="https://environment.ec.europa.eu/topics/waste-and-recycling/packaging-waste/packaging-packaging-waste-regulation_en"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-text-secondary hover:text-[#1D9E75] font-medium transition-colors duration-150 flex items-center gap-1 py-1"
              >
                <span>Commission: PPWR Overview</span>
                <IconArrowUpRight size={12} className="shrink-0 opacity-60" />
              </a>
            </li>
            <li>
              <a
                href="https://environment.ec.europa.eu/topics/waste-and-recycling/packaging-waste/packaging-packaging-waste-regulation_en"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-text-secondary hover:text-[#1D9E75] font-medium transition-colors duration-150 flex items-center gap-1 py-1"
              >
                <span>Commission: Implementation Guide</span>
                <IconArrowUpRight size={12} className="shrink-0 opacity-60" />
              </a>
            </li>
            <li>
              <a
                href="https://environment.ec.europa.eu/topics/waste-and-recycling/packaging-waste/packaging-packaging-waste-regulation_en"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-text-secondary hover:text-[#1D9E75] font-medium transition-colors duration-150 flex items-center gap-1 py-1"
              >
                <span>Official European Commission FAQ</span>
                <IconArrowUpRight size={12} className="shrink-0 opacity-60" />
              </a>
            </li>
          </ul>
        </div>

        {/* Column 2: Practical Business Guides */}
        <div className="space-y-3">
          <h4 className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider">Practical Business Guides</h4>
          <ul className="space-y-1">
            <li>
              <a
                href="https://www.business.gov.uk/campaign/europe/european-union-eu-regulations/eu-packaging-and-packaging-waste-regulation-eu-ppwr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-text-secondary hover:text-[#1D9E75] font-medium transition-colors duration-150 flex items-center gap-1 py-1"
              >
                <span>UK Gov: EU PPWR Checklist</span>
                <IconArrowUpRight size={12} className="shrink-0 opacity-60" />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/posts/think-b2b-marketing_packaging-legislation-changes-in-2026-activity-7416796175108014080-XBqr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-text-secondary hover:text-[#1D9E75] font-medium transition-colors duration-150 flex items-center gap-1 py-1"
              >
                <span>2026 Compliance Guide (Think B2B)</span>
                <IconArrowUpRight size={12} className="shrink-0 opacity-60" />
              </a>
            </li>
            <li>
              <a
                href="https://tracextech.com/eu-packaging-and-packaging-waste-regulation-ppwr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-text-secondary hover:text-[#1D9E75] font-medium transition-colors duration-150 flex items-center gap-1 py-1"
              >
                <span>Tracex Tech: PPWR Guide</span>
                <IconArrowUpRight size={12} className="shrink-0 opacity-60" />
              </a>
            </li>
            <li>
              <a
                href="https://osapiens.com/blog/ppwr-explained-everything-you-need-to-know/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-text-secondary hover:text-[#1D9E75] font-medium transition-colors duration-150 flex items-center gap-1 py-1"
              >
                <span>osapiens: PPWR Explained</span>
                <IconArrowUpRight size={12} className="shrink-0 opacity-60" />
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Technical & Engineering Focus */}
        <div className="space-y-3">
          <h4 className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider">Technical & Engineering Focus</h4>
          <ul className="space-y-1">
            <li>
              <a
                href="https://www.leoprint.eu/blog-posts/sustainable-packaging-innovation-2026"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-text-secondary hover:text-[#1D9E75] font-medium transition-colors duration-150 flex items-center gap-1 py-1"
              >
                <span>2030 Engineering Roadmap (leoprint)</span>
                <IconArrowUpRight size={12} className="shrink-0" />
              </a>
            </li>
          </ul>
          
          <div className="bg-bg-secondary p-3 rounded-[6px] border border-border-tertiary/60">
            <div className="text-[10px] font-semibold text-text-secondary flex items-center gap-1 mb-1">
              <IconCertificate size={12} className="text-[#1D9E75]" />
              <span>EPR Requirement</span>
            </div>
            <p className="text-[10.5px] text-text-tertiary leading-relaxed">
              EPR registration is required in each separate EU country where products are sold.
            </p>
          </div>
        </div>

        {/* Column 4: Key Deadlines Timeline */}
        <div className="space-y-3">
          <h4 className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider flex items-center gap-1">
            <IconCalendarEvent size={12} className="text-[#1D9E75]" />
            <span>Key Deadlines & Mandates</span>
          </h4>
          <div className="space-y-2 text-[11px] leading-normal font-medium">
            <div className="flex gap-2 items-start bg-bg-danger/25 p-2 rounded-[6px]">
              <span className="text-text-danger font-bold shrink-0">AUG 2026</span>
              <span className="text-text-secondary">Full application begins (Aug 12, 2026).</span>
            </div>
            <div className="flex gap-2 items-start bg-[#FAEEDA] p-2 rounded-[6px]">
              <span className="text-[#854F0B] font-bold shrink-0">BY 2030</span>
              <span className="text-text-secondary">All packaging recyclable (Grades A-E).</span>
            </div>
            <div className="flex gap-2 items-start bg-[#FAEEDA] p-2 rounded-[6px]">
              <span className="text-[#854F0B] font-bold shrink-0">PFAS BAN</span>
              <span className="text-text-secondary">Food-contact PFAS ban active soon.</span>
            </div>
          </div>
        </div>

      </div>

      <div className="border-t border-border-tertiary mt-6 pt-4 flex flex-col sm:flex-row justify-between items-center text-[11px] text-text-tertiary font-medium">
        <span>© {new Date().getFullYear()} PackTrack EU. Premium Compliance Suite.</span>
        <span className="flex items-center gap-1.5 mt-2 sm:mt-0">
          <span>Active Regulation: Regulation (EU) 2025/40</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#1D9E75] shrink-0" />
        </span>
      </div>
    </footer>
  );
}
