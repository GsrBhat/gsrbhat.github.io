"use client";

import { motion } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";
import { 
  BookOpen, Layers, Cpu, Compass, FileText, ChevronRight, Zap 
} from "lucide-react";

type Paper = {
  title: string;
  status: string;
  journal: string;
  date: string;
  abstract: string;
  link: string;
  topics: string[];
};

const papers: Paper[] = [
  {
    title: "FPGA-Based Real-Time Power Quality Anomaly Detection Core",
    status: "Published / Research Paper",
    journal: "IEEE Systems Journal / ECE Core Submission",
    date: "2025",
    abstract: "Proposes a synthesizable hardware core mapped to Xilinx Artix-7 FPGA fabric to identify power quality abnormalities in real-time. By implementing a hardware-level pipeline for power frequency monitoring and harmonic analysis, the architecture reduces signal classification latency by 82% compared to software-based microcontrollers.",
    link: "/FPGA-Based Real-Time Power Quality Anomaly Detection.pdf",
    topics: ["Verilog HDL", "FPGA Prototyping", "Power Quality Analysis", "Edge AI"]
  },
  {
    title: "A Low-Power 2nd-Order Sigma-Delta ADC Architecture Using Switched-Capacitor Integrators",
    status: "R&D Lab Technical Report",
    journal: "Samsung Semiconductor Lab / Anurag University",
    date: "2026",
    abstract: "Describes the silicon-level design of a Sigma-Delta Analog-to-Digital Converter in 18nm FinFET technology. Features a two-stage Miller-compensated operational amplifier as the core integrator block, achieving a simulated power budget of 51.36 µW under Spectre transient analysis.",
    link: "/sigma_delta_adc.pptx",
    topics: ["Analog IC Design", "18nm FinFET", "Sigma-Delta ADC", "Cadence Virtuoso"]
  }
];

const interests = [
  {
    name: "Semiconductor Physics",
    desc: "CMOS gate scaling, sub-micron short-channel effects, and TCAD-based device physics modeling (Synopsys Sentaurus).",
    icon: <Cpu className="w-5 h-5 text-cyan" />
  },
  {
    name: "Mixed-Signal & Analog IC",
    desc: "Switched-capacitor design, operational amplifiers, comparators, and noise-shaping Sigma-Delta ADC converters.",
    icon: <Layers className="w-5 h-5 text-indigo" />
  },
  {
    name: "Digital IC & RTL Design",
    desc: "Synthesis-aware Verilog/SystemVerilog RTL modeling, separation of datapath-control logic, and FSM architectures.",
    icon: <Zap className="w-5 h-5 text-purple" />
  },
  {
    name: "AI Hardware & Edge AI",
    desc: "Systolic arrays, custom MAC matrix multipliers, and hardware acceleration of neural network logic on FPGA cores.",
    icon: <Compass className="w-5 h-5 text-emerald" />
  }
];

export default function Research() {
  const { triggerClick } = usePortfolio();

  return (
    <section id="research" className="py-20 bg-[#050816] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
      <div className="absolute top-[30%] right-[-10%] w-[35%] h-[35%] rounded-full bg-purple/5 blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-8 lg:px-12 relative z-10 max-w-6xl">
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black mb-4 text-white font-display tracking-tight">
            Research & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan via-primary to-purple">R&D Lab</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto font-sans text-sm md:text-base leading-relaxed">
            Exploring digital architectures, semiconductor device physics, and analog/mixed-signal microelectronics.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Research Interests Grid */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-lg font-mono font-semibold text-cyan uppercase tracking-widest flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" /> Focus Vectors
            </h3>
            
            <div className="grid grid-cols-1 gap-4">
              {interests.map((interest, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ x: 6 }}
                  className="glass-panel p-5 rounded-xl bg-[#0B1120] border-white/5 relative flex gap-4 items-start"
                >
                  <div className="p-2 bg-white/5 border border-white/5 rounded-lg shrink-0">
                    {interest.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm md:text-base font-display mb-1">{interest.name}</h4>
                    <p className="text-gray-400 font-sans text-xs md:text-sm leading-relaxed">{interest.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Lab waveform visualizer */}
            <div className="glass-panel p-4 rounded-xl bg-black/40 border-white/5">
              <div className="text-[10px] font-mono text-gray-500 uppercase mb-2 flex justify-between">
                <span>Signal Transient Waveform</span>
                <span className="text-cyan animate-pulse">Live</span>
              </div>
              <svg className="w-full h-16 text-cyan/70" viewBox="0 0 300 60">
                <motion.path
                  d="M0 30 Q 30 10, 60 30 T 120 30 T 180 30 T 240 30 T 300 30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  animate={{
                    d: [
                      "M0 30 Q 30 10, 60 30 T 120 30 T 180 30 T 240 30 T 300 30",
                      "M0 30 Q 30 45, 60 30 T 120 30 T 180 20 T 240 40 T 300 30",
                      "M0 30 Q 30 10, 60 30 T 120 30 T 180 30 T 240 30 T 300 30",
                    ]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut"
                  }}
                />
                <line x1="0" y1="30" x2="300" y2="30" stroke="rgba(255,255,255,0.05)" strokeDasharray="3,3" />
              </svg>
            </div>
          </div>

          {/* Right Column: Interactive Paper Catalog */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-lg font-mono font-semibold text-purple uppercase tracking-widest flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-purple animate-pulse" /> Literature & Lab Reports
            </h3>

            <div className="space-y-6">
              {papers.map((paper, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="glass-panel p-6 md:p-8 rounded-2xl bg-[#0B1120] border-white/5 relative group"
                >
                  {/* Category badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4 border-b border-white/5 pb-4">
                    <span className="text-[10px] font-mono font-bold tracking-wider text-cyan uppercase px-2 py-0.5 rounded bg-cyan/5 border border-cyan/20">
                      {paper.status}
                    </span>
                    <span className="text-[10px] font-mono text-gray-500">
                      Published: {paper.date}
                    </span>
                  </div>

                  <h4 className="text-white font-extrabold text-lg md:text-xl font-display leading-tight mb-2 group-hover:text-cyan transition-colors">
                    {paper.title}
                  </h4>
                  <p className="text-[#a855f7]/80 font-mono text-xs mb-4">
                    {paper.journal}
                  </p>

                  <p className="text-gray-400 font-sans text-xs md:text-sm leading-relaxed mb-6">
                    {paper.abstract}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    {/* Topics tags */}
                    <div className="flex flex-wrap gap-2">
                      {paper.topics.map((t, i) => (
                        <span key={i} className="text-[9px] font-mono px-2 py-0.5 bg-white/5 border border-white/5 text-gray-400 rounded">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Action link */}
                    <a
                      href={paper.link}
                      target="_blank"
                      rel="noreferrer"
                      onClick={triggerClick}
                      className="inline-flex items-center gap-1 text-xs font-bold text-cyan hover:underline group-hover:gap-2 transition-all font-sans"
                      data-hover="true"
                    >
                      <FileText className="w-3.5 h-3.5" /> Read Literature <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
