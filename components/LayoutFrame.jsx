"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";
import { ComplianceProvider } from "@/components/ComplianceContext";

export default function LayoutFrame({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ComplianceProvider>
      <div className="flex h-screen overflow-hidden bg-bg-tertiary">
        {/* Mobile Sidebar Backdrop Overlay */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-[#0f172a]/30 backdrop-blur-xs z-30 md:hidden transition-opacity duration-300"
          />
        )}

        {/* Responsive Sliding Sidebar */}
        <div
          className={`fixed md:relative inset-y-0 left-0 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-300 ease-in-out z-40 md:z-auto shrink-0 flex h-full`}
        >
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Main Page Area Container */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Topbar onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col justify-between">
            <div className="flex-1">{children}</div>
            <Footer />
          </main>
        </div>
      </div>
    </ComplianceProvider>
  );
}
