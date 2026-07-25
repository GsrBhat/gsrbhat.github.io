"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";
import { X, Cpu, Terminal, FileText, ArrowRight } from "lucide-react";

export default function ResumeModal() {
  const { isResumeModalOpen, setIsResumeModalOpen, triggerClick, triggerBeep } = usePortfolio();

  // Close on Escape keypress
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isResumeModalOpen) {
        setIsResumeModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isResumeModalOpen, setIsResumeModalOpen]);

  const selectResume = (track: "it" | "core") => {
    triggerBeep(1000, 0.08, "sine");
    setIsResumeModalOpen(false);
    
    const fileLink = track === "it" ? "/resume-software.pdf" : "/resume-vlsi.pdf";
    window.open(fileLink, "_blank");
  };

  return (
    <AnimatePresence>
      {isResumeModalOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md scanlines"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Main Dialog container */}
          <motion.div
            initial={{ scale: 0.95, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="w-full max-w-xl bg-[#0f0f15] border border-cyan/20 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.12)] flex flex-col relative"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-[#12121a] border-b border-white/5 flex items-center justify-between select-none">
              <div className="flex items-center gap-2 text-cyan font-mono text-xs font-bold uppercase tracking-wider">
                <FileText className="w-4 h-4" />
                <span>Select Resume Pipeline</span>
              </div>
              <button
                onClick={() => {
                  triggerClick();
                  setIsResumeModalOpen(false);
                }}
                className="p-1.5 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Description */}
            <div className="p-6 pb-2 select-none text-center sm:text-left">
              <h3 className="text-lg font-black text-white font-display mb-1.5">
                Which professional track would you like to review?
              </h3>
              <p className="text-gray-400 font-sans text-xs leading-relaxed">
                Choose the profile that matches your hiring focus. Both copies contain full verifiable student credentials.
              </p>
            </div>

            {/* Option Cards */}
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* IT / Software Card */}
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                onClick={() => selectResume("it")}
                className="glass-panel p-5 rounded-xl bg-[#12121a]/60 border border-white/5 cursor-pointer relative group flex flex-col justify-between h-44 hover:border-primary/45 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all duration-300"
                data-hover="true"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Terminal className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="text-white font-bold text-sm md:text-base font-display group-hover:text-primary transition-colors">
                    IT & Software
                  </h4>
                  <p className="text-gray-500 font-sans text-[10px] md:text-xs leading-relaxed mt-1">
                    Java, Spring Boot, AI Assistant API integration, Next.js, and Full-Stack systems.
                  </p>
                </div>
                <div className="flex items-center justify-between text-[9px] font-mono text-primary font-bold pt-2">
                  <span>LOAD COMPILED STACK</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>

              {/* Core / VLSI Card */}
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                onClick={() => selectResume("core")}
                className="glass-panel p-5 rounded-xl bg-[#12121a]/60 border border-white/5 cursor-pointer relative group flex flex-col justify-between h-44 hover:border-cyan/45 hover:shadow-[0_0_20px_rgba(245,158,11,0.1)] transition-all duration-300"
                data-hover="true"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-cyan/10 border border-cyan/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Cpu className="w-5 h-5 text-cyan" />
                  </div>
                  <h4 className="text-white font-bold text-sm md:text-base font-display group-hover:text-cyan transition-colors">
                    Core & VLSI
                  </h4>
                  <p className="text-gray-500 font-sans text-[10px] md:text-xs leading-relaxed mt-1">
                    18nm FinFET design, Verilog RTL modeling, custom pipelined ALU cores, and FPGA prototyping.
                  </p>
                </div>
                <div className="flex items-center justify-between text-[9px] font-mono text-cyan font-bold pt-2">
                  <span>LOAD HARDWARE SCHEMATIC</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>

            </div>

            {/* Footer */}
            <div className="px-5 py-3.5 bg-black/40 border-t border-white/5 text-center text-[9px] font-mono text-gray-500 select-none">
              SECURE SOURCE PIPELINE INTERFACE — PRESS ESC TO DISMISS
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
