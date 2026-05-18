"use client";

import { motion } from "framer-motion";
import { ExternalLink, Code, CheckCircle2 } from "lucide-react";

const projects = [
  {
    title: "RISC-V Pipelined ALU Design",
    tech: ["Verilog HDL", "Xilinx Vivado", "RISC-V RV32I", "FPGA Prototyping"],
    details: [
      "Designed a 4-stage pipelined ALU architecture (Fetch, Decode, Execute, Writeback).",
      "Implemented 8 arithmetic and logical operations: ADD, SUB, AND, OR, XOR, SHL, SHR, SLT.",
      "Added Data forwarding, RAW hazard handling, and Stall insertion logic.",
      "Maintained strict datapath/control separation.",
      "Used pipeline registers to reduce critical path delay.",
      "Verified using 40+ directed Vivado testbench vectors.",
      "Analyzed setup/hold timing and signal propagation."
    ]
  },
  {
    title: "N-bit Barrel Shifter Design",
    tech: ["Verilog HDL", "Xilinx Vivado", "RTL Design"],
    details: [
      "Designed parameterized N-bit barrel shifter.",
      "Supports Logical Left Shift (LSL), Logical Right Shift (LSR), and Arithmetic Right Shift (ASR).",
      "Implemented cascaded 2-to-1 MUX-tree architecture.",
      "Achieved single-cycle shift operation, eliminating iterative serial shifting.",
      "Verified using zero-shift cases, maximum-shift cases, and sign-extension validation.",
      "Optimized LUT utilization for FPGA mapping."
    ]
  },
  {
    title: "4-bit Arithmetic Logic Unit (ALU)",
    tech: ["Verilog HDL", "Structural RTL Design", "Vivado"],
    details: [
      "Designed 4-bit ALU with 8 operations: ADD, SUB, AND, OR, XOR, XNOR, Comparator, Pass-through.",
      "Used modular hierarchical RTL architecture.",
      "Created separate Arithmetic block, Logic block, and Output multiplexer.",
      "Implemented independent opcode decoder.",
      "Built self-checking testbench, verified functionality across 25+ test cases.",
      "Compared pre- and post-synthesis outputs."
    ]
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Engineering <span className="text-primary">Showcase</span></h2>
          <p className="text-gray-400">Deep dives into RTL architectures and FPGA designs.</p>
        </motion.div>

        <div className="space-y-12">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="glass-panel rounded-2xl overflow-hidden group flex flex-col lg:flex-row relative bg-black/40 border-white/10"
    >
      {/* Visual / Abstract Area */}
      <div className="lg:w-1/3 min-h-[250px] bg-gradient-to-br from-[#0a0a1a] to-[#1a1a3a] relative overflow-hidden flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-white/5 p-8">
        <motion.div 
          className="w-32 h-32 rounded-full bg-primary/20 blur-2xl absolute"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index }}
        />
        <div className="text-primary z-10 font-mono text-xs opacity-60 mb-4">&lt;RTL_Module /&gt;</div>
        <h3 className="text-2xl font-bold text-white text-center relative z-10 group-hover:text-primary transition-colors">{project.title}</h3>
        
        {/* Buttons */}
        <div className="flex gap-4 mt-8 relative z-10">
          <a href="https://github.com/GsrBhat" target="_blank" className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors border border-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]" title="View Source">
            <Code className="w-5 h-5" />
          </a>
          <a href="https://github.com/GsrBhat" target="_blank" className="p-3 bg-primary/10 hover:bg-primary/20 rounded-full text-primary transition-colors border border-primary/20 hover:shadow-[0_0_15px_rgba(0,229,255,0.4)]" title="Live Preview">
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Details Area */}
      <div className="lg:w-2/3 p-8 lg:p-10 flex flex-col">
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((tag: string, i: number) => (
            <span key={i} className="text-xs font-mono px-3 py-1 bg-white/5 text-primary rounded border border-primary/20 shadow-[0_0_10px_rgba(0,210,255,0.05)]">
              {tag}
            </span>
          ))}
        </div>
        
        <ul className="space-y-3 flex-1">
          {project.details.map((point: string, i: number) => (
            <li key={i} className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed">
              <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Animated Glow Border */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/30 rounded-2xl transition-colors duration-500 pointer-events-none" />
    </motion.div>
  );
}
