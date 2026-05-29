import "./globals.css";
import { Inter } from "next/font/google";
import LayoutFrame from "@/components/LayoutFrame";
import AICopilot from "@/components/AICopilot";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "PackTrack EU - PPWR Compliance Management Platform",
  description: "PackTrack EU is a premium Packaging and Packaging Waste Regulation (PPWR) compliance management suite. Track recyclability, recycled content, custody chain traceability, and Digital Product Passports (DPP)."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <head />
      <body className="bg-bg-tertiary text-text-primary antialiased font-sans">
        <LayoutFrame>
          {children}
        </LayoutFrame>
        <AICopilot />
      </body>
    </html>
  );
}
