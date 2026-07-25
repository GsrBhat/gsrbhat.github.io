"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";
import { X, Terminal as TerminalIcon } from "lucide-react";

type Line = {
  text: string;
  type?: "input" | "error" | "success" | "info" | "system";
};

export default function CommandPalette({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { soundEnabled, triggerClick, triggerBeep, triggerTyping } = usePortfolio();
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<Line[]>([
    { text: "SAIOS SHELL V1.0.0 INITIALIZED.", type: "system" },
    { text: "Type 'help' to query available registers.", type: "info" },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Focus input on mount/open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
      triggerBeep(880, 0.08, "triangle");
    }
  }, [isOpen]);

  // Scroll console to bottom on update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  // Handle keyboard shortcuts (Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.key === "k") || (e.ctrlKey && e.key === "K")) {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // trigger toggle in parent
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const executeCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    if (!cleanCmd) return;

    const newLines: Line[] = [
      { text: `visitor@saios_core:~$ ${cmd}`, type: "input" }
    ];

    switch (cleanCmd) {
      case "help":
        newLines.push(
          { text: "Available instructions (commands):" },
          { text: "  about         - Print digital brand information & engineering focus." },
          { text: "  skills        - List hardware capabilities, RTL, AI, and Full Stack stacks." },
          { text: "  projects      - List main engineering blueprints (Pipelined ALU, ADC, NOVA OS)." },
          { text: "  neofetch      - Render system hardware specification overlay." },
          { text: "  status        - Check real-time virtual board sensors (core temp, voltage)." },
          { text: "  clear         - Clear terminal history buffer." },
          { text: "  exit          - Shutdown terminal console." }
        );
        break;
      case "about":
        newLines.push(
          { text: "System Owner  : Sai Rahul Bhat Gaadhi Raju", type: "success" },
          { text: "Discipline    : Electronics & Communication Engineering (VLSI & AI Focus)" },
          { text: "Summary       : Samsung ISWDP Fellow with expertise in digital systems, RTL design, verilog/ASIC synthesis, and full-stack spring-boot structures." }
        );
        break;
      case "skills":
        newLines.push(
          { text: "--- Digital Core & EDA ---", type: "info" },
          { text: "  Verilog HDL, Xilinx Vivado, Cadence Virtuoso, Sentaurus TCAD, ModelSim, Static Timing Analysis (STA)" },
          { text: "--- Programming Stacks ---", type: "info" },
          { text: "  Java (Spring Boot, Security), Python (AI, Automation), C/C++, MATLAB, PostgreSQL, SQL" },
          { text: "--- Frontend Frameworks ---", type: "info" },
          { text: "  React, Next.js, TypeScript, Tailwind CSS, Vite, HTML/CSS" }
        );
        break;
      case "projects":
        newLines.push(
          { text: "BLUEPRINTS INSTALLED:", type: "info" },
          { text: "1. Low-Power 2nd-Order Sigma-Delta ADC (18nm FinFET design)" },
          { text: "2. RISC-V 4-Stage Pipelined ALU Core (Hazard resolution & forwarding)" },
          { text: "3. FPGA-Based Real-Time Power Quality Anomaly Core (Verilog & AI)" },
          { text: "4. NOVA OS (Modular AI assistant engine)" },
          { text: "5. Smart Hospital Management System (Full Stack spring boot application)" }
        );
        break;
      case "neofetch":
        newLines.push(
          { text: "      _.._           visitor@saios_core", type: "success" },
          { text: "    .' .-' `.        ------------------", type: "success" },
          { text: "   /  /  .-. \\       OS: SaiOS System Platform v1.2", type: "success" },
          { text: "   |  |  | | |       Kernel: Silicon-Logic-Engine v5.24", type: "success" },
          { text: "   \\  \\  `-' /       Uptime: 24/7 Placement Ready", type: "success" },
          { text: "    `. `-.-\' `       Coverage: 100% RTL Functional Verification Complete", type: "success" },
          { text: "      `'1`           Primary Target: VLSI Design & Verification Core Intern", type: "success" }
        );
        break;
      case "status":
        newLines.push(
          { text: "Reading hardware cores telemetry...", type: "system" },
          { text: "  Core Voltage Rail (1.2V Typ)  : 1.198 V [STABLE]", type: "success" },
          { text: "  Silicon Die Temperature       : 38.6 °C [COOL]", type: "success" },
          { text: "  Core Clock Frequency          : 3.20 GHz [ACTIVE]", type: "success" },
          { text: "  FPGA Cell Congestion Index    : 0.12% [CLEAR]", type: "success" }
        );
        break;
      case "clear":
        setHistory([]);
        setInputVal("");
        return;
      case "exit":
        onClose();
        return;
      default:
        newLines.push({ text: `Error: Unknown opcode "${cmd}". Type 'help' for support list.`, type: "error" });
        triggerBeep(400, 0.15, "sawtooth");
        break;
    }

    setHistory((prev) => [...prev, ...newLines]);
    setInputVal("");
    triggerBeep(1200, 0.05, "sine");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
    triggerTyping();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputVal);
    }
  };

  const handleAutofill = (cmd: string) => {
    triggerClick();
    executeCommand(cmd);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md scanlines"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.95, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="w-full max-w-2xl bg-[#0f0f15] border border-cyan/20 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.15)] flex flex-col h-[55vh]"
          >
            {/* Terminal Header */}
            <div className="px-4 py-3 bg-[#12121a] border-b border-white/5 flex items-center justify-between shrink-0 select-none">
              <div className="flex items-center gap-2 text-cyan font-mono text-xs font-bold">
                <TerminalIcon className="w-4 h-4" />
                <span>visitor@saios_core:~$ shell console</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-gray-500 hidden sm:inline">Esc to close</span>
                <button
                  onClick={() => {
                    triggerClick();
                    onClose();
                  }}
                  className="p-1.5 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Command Autofills */}
            <div className="px-4 py-2 bg-black/40 border-b border-white/5 flex flex-wrap gap-2 shrink-0 select-none">
              {["help", "about", "skills", "projects", "neofetch", "status", "clear"].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => handleAutofill(cmd)}
                  className="px-2 py-0.5 rounded bg-[#0f0f15] border border-white/5 text-[10px] font-mono text-cyan hover:bg-cyan/15 hover:border-cyan/35 transition-all"
                  data-hover="true"
                >
                  {cmd}
                </button>
              ))}
            </div>

            {/* Terminal screen log history */}
            <div 
              ref={scrollRef} 
              className="flex-1 p-6 font-mono text-xs md:text-sm text-gray-300 space-y-2 overflow-y-auto"
            >
              {history.map((line, idx) => (
                <div 
                  key={idx} 
                  className={`leading-relaxed whitespace-pre-wrap ${
                    line.type === "input" 
                      ? "text-cyan" 
                      : line.type === "error"
                      ? "text-red-400"
                      : line.type === "success"
                      ? "text-emerald"
                      : line.type === "system"
                      ? "text-purple"
                      : line.type === "info"
                      ? "text-[#a855f7]/70"
                      : "text-gray-300"
                  }`}
                >
                  {line.text}
                </div>
              ))}
            </div>

            {/* Command Input Bar */}
            <div className="px-6 py-4 bg-[#12121a] border-t border-white/5 flex items-center gap-2 shrink-0">
              <span className="text-cyan font-mono text-xs md:text-sm font-bold shrink-0">$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none font-mono text-xs md:text-sm text-white caret-cyan"
                placeholder="Enter command opcode..."
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
