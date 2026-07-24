"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";
import * as audio from "@/lib/audio";

const bootLogs = [
  { time: "0.00s", text: "SYSTEM DIAGNOSTIC: OS BOOT SEQUENCE ENGAGED..." },
  { time: "0.12s", text: "CLOCK RATE DETECTED: 3.20 GHz (REF CLK ACTIVE)" },
  { time: "0.34s", text: "ASIC STACK DETECTED: TSMC 16nm FINFET GRID MAPPED" },
  { time: "0.55s", text: "EDA PIPELINES: VIVADO COMPILE ENGINE ONLINE" },
  { time: "0.72s", text: "CADENCE VIRTUOSO: TRANSIENT SPECTRUM LOADED" },
  { time: "0.98s", text: "INSTRUCTION CACHE MAP: RV32I PIPELINE CORES OK" },
  { time: "1.24s", text: "FPGA POWER QUALITY CORES: SYSTOLIC INTERFACE UP" },
  { time: "1.50s", text: "SYNAPSYS TCAD: DEVICE PHYSICS MODELS LOADED" },
  { time: "1.80s", text: "ATS PARSER ENGINES INITIALIZED" },
  { time: "2.10s", text: "ESTABLISHING CORE EMISSION PATHS: STACK ONLINE." }
];

export default function Preloader() {
  const { isBooted, setIsBooted, soundEnabled } = usePortfolio();
  const [progress, setProgress] = useState(0);
  const [activeLogIdx, setActiveLogIdx] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [showWafer, setShowWafer] = useState(true);

  useEffect(() => {
    if (isBooted) return;
    
    // Play initial sound hum/beep on first interaction or sequence
    const bootTimer = setTimeout(() => {
      audio.playSystemBoot(soundEnabled);
    }, 200);

    // Simulate progress counting up to 100% over 3 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = Math.floor(Math.random() * 6) + 3;
        return Math.min(prev + step, 100);
      });
    }, 100);

    return () => {
      clearTimeout(bootTimer);
      clearInterval(interval);
    };
  }, [isBooted, soundEnabled]);

  // Feed logs progressively based on progress percentage
  useEffect(() => {
    const targetLogIdx = Math.min(
      Math.floor((progress / 100) * bootLogs.length),
      bootLogs.length - 1
    );
    
    if (targetLogIdx > activeLogIdx) {
      setActiveLogIdx(targetLogIdx);
      const newLog = `[${bootLogs[targetLogIdx].time}] ${bootLogs[targetLogIdx].text}`;
      setLogs((prev) => [...prev, newLog]);
      audio.playBeep(soundEnabled, 800, 0.03, "sine");
    }
  }, [progress, activeLogIdx, soundEnabled]);

  // Handle final boot action
  useEffect(() => {
    if (progress === 100) {
      const exitTimer = setTimeout(() => {
        audio.playSuccess(soundEnabled);
        setIsBooted(true);
      }, 600);
      return () => clearTimeout(exitTimer);
    }
  }, [progress, setIsBooted, soundEnabled]);

  return (
    <AnimatePresence>
      {!isBooted && (
        <motion.div
          className="fixed inset-0 bg-[#050816] z-50 flex flex-col items-center justify-center p-4 scanlines"
          exit={{ 
            opacity: 0, 
            scale: 1.05,
            filter: "blur(20px)",
            transition: { duration: 0.8, ease: "easeInOut" }
          }}
        >
          {/* Silicon Wafer Vector Outline Grid */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
            <svg className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px]" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.3" />
              <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.2" />
              {[...Array(12)].map((_, i) => (
                <line key={`v-${i}`} x1={10 + i * 7.2} y1="2" x2={10 + i * 7.2} y2="98" stroke="currentColor" strokeWidth="0.1" />
              ))}
              {[...Array(12)].map((_, i) => (
                <line key={`h-${i}`} x1="2" y1={10 + i * 7.2} x2="98" y2={10 + i * 7.2} stroke="currentColor" strokeWidth="0.1" />
              ))}
            </svg>
          </div>

          <div className="w-full max-w-xl flex flex-col items-center space-y-8 z-10 relative">
            {/* Hologram Chip Assembling Graphic */}
            <div className="relative w-36 h-36 flex items-center justify-center">
              <motion.div
                className="absolute inset-0 rounded-2xl border border-cyan/20 bg-cyan/5 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.1)]"
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute w-28 h-28 rounded-xl border border-primary/20 bg-primary/5"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
              {/* Inner Chip Die */}
              <motion.div
                className="w-16 h-16 bg-[#0B1120] border-2 border-cyan/50 flex items-center justify-center rounded-lg shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                initial={{ scale: 0.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, type: "spring", stiffness: 100 }}
              >
                <span className="text-[10px] font-black text-cyan font-display tracking-widest uppercase">
                  SaiOS
                </span>
              </motion.div>
              
              {/* Circuit pulse dots */}
              {[...Array(4)].map((_, idx) => (
                <motion.div
                  key={idx}
                  className="absolute w-2 h-2 rounded-full bg-cyan"
                  animate={{
                    opacity: [0.2, 1, 0.2],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    delay: idx * 0.5,
                  }}
                  style={{
                    top: idx === 0 ? "5%" : idx === 1 ? "48%" : idx === 2 ? "90%" : "48%",
                    left: idx === 0 ? "48%" : idx === 1 ? "95%" : idx === 2 ? "48%" : "5%",
                  }}
                />
              ))}
            </div>

            {/* Diagnostic Boot Logs Console */}
            <div className="w-full bg-black/80 border border-white/5 rounded-xl p-4 font-mono text-[10px] md:text-xs text-gray-400 space-y-1 h-36 overflow-y-auto shadow-inner">
              <div className="text-cyan mb-2 border-b border-white/5 pb-1 flex justify-between uppercase tracking-wider text-[9px] font-bold">
                <span>Core Logic Terminal</span>
                <span className="animate-pulse">Loading core modules</span>
              </div>
              {logs.map((log, index) => (
                <div key={index} className="leading-relaxed">
                  <span className="text-cyan">{log.split(" ")[0]}</span>{" "}
                  {log.split(" ").slice(1).join(" ")}
                </div>
              ))}
              <div className="w-2 h-4 bg-cyan inline-block animate-pulse" />
            </div>

            {/* Loading Bar */}
            <div className="w-full space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-cyan uppercase tracking-widest font-bold">Booting Core logic</span>
                <span className="text-white font-black">{progress}%</span>
              </div>
              
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-[1px]">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan via-primary to-purple rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Subtitle footer */}
            <div className="text-[10px] text-gray-600 font-mono tracking-widest uppercase">
              ELECTRONICS & ECE SYSTEM CONSOLE v1.0
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
