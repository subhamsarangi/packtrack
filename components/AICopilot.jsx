"use client";
import { useState, useRef, useEffect } from "react";
import { IconMessageChatbot, IconX, IconSend } from "@tabler/icons-react";

const PRESET_ANSWERS = {
  "What is PPWR 2026?": "PPWR (Packaging and Packaging Waste Regulation) is a mandatory EU regulation coming into full force on August 12, 2026. It requires all packaging placed on the EU market to be recyclable (Grades A-C), contain minimum post-consumer recycled plastic (PCR), and carry a Digital Product Passport (DPP) QR code for consumers.",
  "How do recyclability grades work?": "Recyclability is assessed from Grade A (Excellent - >95% recyclability) down to E (Non-recyclable - <70% recyclability). By 2026, any packaging grading D or E will be banned or heavily penalized. Grades are calculated based on material types, barrier layers, inks, and closures.",
  "What is a Digital Product Passport (DPP)?": "A DPP is a digital record accessible by scanning a QR code on the packaging. It must display material composition, recyclability grade, recycled content fill, manufacturer details, and an official EU Declaration of Conformity (DoC). This is mandatory for almost all packaging categories from 2026 onwards.",
  "Why is my package 'At Risk'?": "Packaging is flagged 'At Risk' (Grade D) or 'Non-compliant' (Grade E) when it contains multi-layer material blends (like plastic films laminated with aluminium foil) that standard recycling facilities cannot separate, or if they have non-compliant chemical additives or lack complete regulatory docs.",
  "What are the recycled content mandates?": "Starting in 2026/2030, PPWR mandates that plastic packaging must contain a minimum percentage of post-consumer recycled plastic (PCR). For example, contact-sensitive packaging (like food trays) must meet a minimum of 30% recycled content to be compliant."
};

const KEYWORD_RESPONSES = [
  { keywords: ["dpp", "passport", "qr"], response: "A Digital Product Passport (DPP) represents a mandate under PPWR where each packaging unit carries a unique QR code. Scanning it displays full custody, carbon footprint, recyclability grades, and conformity declarations to regulators and consumers." },
  { keywords: ["grade", "recyclability", "a", "b", "c", "d", "e"], response: "Recyclability ranges from Grade A (>95% recyclable) to E (<70% recyclable). Grades D and E are prohibited under 2026 PPWR rules. To upgrade grades, replace multi-layer films with mono-materials (e.g. MDO-PE) and non-recyclable black colorants with NIR-detectable options." },
  { keywords: ["supplier", "onboard", "sync"], response: "Onboarding suppliers is step #1 in packaging compliance. Suppliers sync materials specs, certifications, and recycled content data into PackTrack, allowing you to generate reports and declarations of conformity." },
  { keywords: ["recycled", "pcr", "mandate"], response: "By 2026/2030, EU regulations mandate post-consumer recycled plastic (PCR) minimums. For example, plastic beverage bottles require 30% recycled PET. You can track your suppliers' PCR fractions in our Suppliers and Reporting tabs." },
  { keywords: ["report", "filing", "bfr", "commission"], response: "PackTrack generates regulatory reporting files (like Q2 PPWR logs) and historical filing templates. You can download these reports in the Reporting tab to submit to national authorities like BfR in Germany." },
  { keywords: ["doc", "conformity", "declaration"], response: "The Declaration of Conformity (DoC) is a legally binding statement signed by the manufacturer, verifying PPWR compliance. You can draft and download DoCs for individual SKUs in the DPP and Reporting tabs." }
];

export default function AICopilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "copilot",
      text: "Hello! I am your PPWR Compliance Copilot. If you are new to the 2026 Packaging Regulations or general packaging compliance, I am here to help! Select a topic below or type a question to get started."
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    if (!textToSend.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { sender: "user", text: textToSend }]);
    setInputText("");
    setIsTyping(true);

    // Simulate thinking delay
    setTimeout(() => {
      let reply = "I'm here to help, but that specific question is outside my pre-loaded compliance database. Try asking about 'DPP', 'recyclability grades', 'suppliers onboarding', or 'recycled plastic mandates'!";
      
      // Match preset answers first
      if (PRESET_ANSWERS[textToSend]) {
        reply = PRESET_ANSWERS[textToSend];
      } else {
        // Keyword search in user text
        const lowerText = textToSend.toLowerCase();
        for (const item of KEYWORD_RESPONSES) {
          if (item.keywords.some(k => lowerText.includes(k))) {
            reply = item.response;
            break;
          }
        }
      }

      setIsTyping(false);
      setMessages(prev => [...prev, { sender: "copilot", text: reply }]);
    }, 700);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend(inputText);
    }
  };

  return (
    <>
      {/* FLOATING ACTION TOGGLE BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-[#1D9E75] hover:bg-[#15803d] text-white p-3.5 rounded-full shadow-[0_4px_20px_rgba(29,158,117,0.35)] cursor-pointer transition-all duration-300 hover:scale-105 flex items-center justify-center"
        aria-label="Toggle Compliance Copilot"
      >
        {isOpen ? <IconX size={24} /> : <IconMessageChatbot size={24} className="animate-pulse" />}
      </button>

      {/* CHAT DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-80 sm:w-[380px] bg-bg-primary border-l border-border-tertiary z-40 shadow-2xl flex flex-col transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Chat Header */}
        <div className="bg-[#1D9E75] text-white p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <IconMessageChatbot size={20} />
            <div>
              <div className="text-sm font-semibold">Compliance Copilot</div>
              <div className="text-[10px] text-white/80 font-medium">PPWR 2026 Assistant</div>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white cursor-pointer">
            <IconX size={18} />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-bg-secondary select-none">
          {messages.map((m, i) => (
            <div key={i} className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}>
              <div
                className={`max-w-[85%] rounded-xl p-3 text-[12.5px] leading-relaxed shadow-sm ${
                  m.sender === "user"
                    ? "bg-[#1D9E75] text-white rounded-tr-none"
                    : "bg-bg-primary text-text-primary rounded-tl-none border border-border-tertiary/60"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-1.5 p-3 max-w-[80px] bg-bg-primary border border-border-tertiary/60 rounded-xl rounded-tl-none">
              <span className="w-1.5 h-1.5 bg-text-tertiary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 bg-text-tertiary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-1.5 h-1.5 bg-text-tertiary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          )}
          
          <div ref={chatEndRef} />
        </div>

        {/* Preset Questions Panel */}
        <div className="p-3 bg-bg-primary border-t border-border-tertiary shrink-0 space-y-1.5 select-none">
          <div className="text-[10px] uppercase font-bold tracking-wider text-text-tertiary">Quick topics</div>
          <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto py-1">
            {Object.keys(PRESET_ANSWERS).map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                className="text-[10.5px] font-medium text-text-secondary bg-bg-secondary hover:bg-bg-info hover:text-text-info border border-border-tertiary/50 hover:border-transparent rounded-full px-2.5 py-1 text-left cursor-pointer transition-colors duration-150 max-w-full truncate"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Input */}
        <div className="p-3 bg-bg-primary border-t border-border-tertiary flex gap-2 shrink-0 items-center">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask a compliance question..."
            className="flex-1 font-sans text-xs bg-bg-secondary border border-border-secondary rounded-[6px] px-3 py-2 text-text-primary placeholder-text-tertiary outline-none focus:border-text-info transition-colors duration-150"
          />
          <button
            onClick={() => handleSend(inputText)}
            className="bg-[#1D9E75] hover:bg-[#15803d] text-white p-2 rounded-[6px] cursor-pointer transition-colors duration-150 flex items-center justify-center shrink-0"
          >
            <IconSend size={14} />
          </button>
        </div>
      </div>
    </>
  );
}
