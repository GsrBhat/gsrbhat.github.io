"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, ExternalLink, Cpu, Layout, Settings, Layers, X, CheckCircle } from "lucide-react";

type Project = {
  title: string;
  type: string;
  tech: string[];
  desc: string;
  features: string[];
  learnings: string[];
  github: string;
  schematicType: "pipeline" | "barrel" | "alu4" | "voyage";
};

const projectsData: Project[] = [
  {
    title: "Pipelined ALU Design",
    type: "RTL Design & Verification",
    tech: ["Verilog HDL", "Xilinx Vivado", "RISC-V Architecture", "Timing Constraints"],
    desc: "Designed and implemented a multi-stage pipelined Arithmetic Logic Unit (ALU) based on the RISC-V RV32I instruction set architecture to maximize throughput and clock frequency.",
    features: [
      "Multi-stage pipeline registers to partition execution paths",
      "Staging logic and hazard management under timing constraints",
      "RTL simulation and testbench verification using Vivado simulator",
      "Throughput optimization using pipeline registers and control path signals"
    ],
    learnings: [
      "Mastered data hazard detection, forwarding, and stall insertion techniques",
      "Learned to analyze propagation delay, critical paths, and register setup/hold constraints",
      "Gained deep understanding of RISC-V datapath-control separation"
    ],
    github: "https://github.com/GsrBhat/gsrbhat.github.io",
    schematicType: "pipeline"
  },
  {
    title: "Barrel Shifter Design",
    type: "Digital Circuit Optimization",
    tech: ["Verilog HDL", "Logic Optimization", "Vivado Simulator"],
    desc: "Created a parameterized N-bit Barrel Shifter using combinational logic multiplexer trees to perform arbitrary bit shifts in a single clock cycle, optimizing speed over iterative shifters.",
    features: [
      "Cascaded multiplexer tree architecture for single-cycle operations",
      "Support for Logical Left, Logical Right, and Arithmetic Right shifts",
      "Modular parameterized design allowing quick scaling of bus width (N-bit)",
      "Strict RTL verification across boundary values and sign extension cases"
    ],
    learnings: [
      "Optimized LUT utilization and propagation delay on programmable logic",
      "Formulated mathematical tree structures for logarithmic hardware complexity reduction",
      "Identified and resolved critical timing bottlenecks in shifting networks"
    ],
    github: "https://github.com/GsrBhat/gsrbhat.github.io",
    schematicType: "barrel"
  },
  {
    title: "4-bit ALU Design",
    type: "Modular RTL Engineering",
    tech: ["Verilog HDL", "Xilinx Vivado", "Structural RTL"],
    desc: "Designed and verified a modular 4-bit Arithmetic Logic Unit supporting standard arithmetic and boolean logical calculations, utilizing hierarchical structures for maximum readability and testability.",
    features: [
      "Modular hierarchical design separating logical and arithmetic blocks",
      "Support for 8 operations including addition, subtraction, AND, OR, XOR",
      "Dedicated testbench with 25+ automated test vectors",
      "Pre-synthesis functional verification inside Vivado simulator"
    ],
    learnings: [
      "Solidified understanding of gate-level and dataflow modeling in HDL",
      "Acquired systematic approach to hierarchical modular design validation",
      "Grasped synthesis mapping flows and logic reduction techniques"
    ],
    github: "https://github.com/GsrBhat/gsrbhat.github.io",
    schematicType: "alu4"
  },
  {
    title: "VLSI Voyage: 16-bit ALU Comparison",
    type: "Architecture Performance Analysis",
    tech: ["Verilog HDL", "Pipelining vs Non-Pipelining", "Hardware Complexity Analysis"],
    desc: "Conducted a detailed comparative analysis between pipelined and non-pipelined 16-bit ALU architectures, analyzing trade-offs in throughput, latency, clock frequencies, and layout area.",
    features: [
      "Implementation of both 16-bit pipelined and non-pipelined hardware designs",
      "Thorough benchmarks on maximum clock rates and layout cell counts",
      "Comprehensive evaluation of latency penalty vs throughput gains",
      "Detailed study of register overhead and clock skew vulnerabilities"
    ],
    learnings: [
      "Acquired quantitive skills to evaluate hardware performance metrics (IPS/Hz)",
      "Analyzed register-induced area increase vs frequency optimization trade-offs",
      "Explored frequency scaling limits and power budget impacts in digital architectures"
    ],
    github: "https://github.com/GsrBhat/gsrbhat.github.io",
    schematicType: "voyage"
  }
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20 relative bg-[#050816] overflow-hidden">
      <div className="absolute inset-0 bg-[#050816] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black mb-4 text-white">
            Silicon <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-primary">Blueprints</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto font-sans text-sm md:text-base">
            RTL architectures, ALU processors, and simulation tests designed in Verilog. Click any card to view detailed specifications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {projectsData.map((project, idx) => (
            <ProjectCard key={idx} project={project} index={idx} onClick={() => setSelectedProject(project)} />
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -6, scale: 1.01 }}
      onClick={onClick}
      className="glass-panel rounded-2xl overflow-hidden bg-[#0B1120] border-white/5 cursor-pointer relative group flex flex-col justify-between min-h-[380px]"
    >
      {/* Schematic Layout (Abstract Silicon Pattern) */}
      <div className="h-40 bg-[#070c18] relative overflow-hidden flex items-center justify-center border-b border-white/5">
        <div className="absolute inset-0 blueprint-grid opacity-20" />
        <SchematicBackground type={project.schematicType} />
        
        <div className="absolute top-4 left-4 px-2 py-0.5 rounded bg-cyan/15 border border-cyan/30 text-[10px] font-mono text-cyan tracking-wider uppercase font-semibold">
          {project.type}
        </div>
      </div>

      {/* Details */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-white mb-2 font-display group-hover:text-cyan transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-400 font-sans text-xs md:text-sm leading-relaxed line-clamp-3 mb-4">
            {project.desc}
          </p>
        </div>

        <div>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.slice(0, 3).map((tag, idx) => (
              <span key={idx} className="text-[10px] font-mono px-2 py-0.5 bg-white/5 border border-white/5 text-cyan rounded">
                {tag}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="text-[10px] font-mono px-2 py-0.5 bg-white/5 border border-white/5 text-gray-500 rounded">
                +{project.tech.length - 3}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-white/5 pt-4">
            <span className="text-xs font-semibold text-cyan group-hover:underline flex items-center gap-1 font-sans">
              View Specs & Learnings →
            </span>
            <div className="flex gap-2">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 bg-white/5 hover:bg-cyan/15 rounded-lg border border-white/5 text-white hover:text-cyan transition-colors"
                title="View Code"
              >
                <Code className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Border glow trail on hover */}
      <div className="absolute inset-0 border border-transparent rounded-2xl group-hover:border-cyan/30 pointer-events-none transition-all duration-300" />
    </motion.div>
  );
}

function SchematicBackground({ type }: { type: string }) {
  if (type === "pipeline") {
    return (
      <svg className="w-full h-full opacity-35" viewBox="0 0 200 100">
        <rect x="15" y="35" width="30" height="30" rx="3" fill="none" stroke="#3B82F6" strokeWidth="1.5" />
        <text x="30" y="53" fill="#3B82F6" fontSize="8" textAnchor="middle" fontFamily="monospace">IF</text>
        <line x1="45" y1="50" x2="65" y2="50" stroke="#06B6D4" strokeWidth="1.5" className="circuit-line" />
        
        <rect x="65" y="35" width="30" height="30" rx="3" fill="none" stroke="#3B82F6" strokeWidth="1.5" />
        <text x="80" y="53" fill="#3B82F6" fontSize="8" textAnchor="middle" fontFamily="monospace">ID</text>
        <line x1="95" y1="50" x2="115" y2="50" stroke="#06B6D4" strokeWidth="1.5" className="circuit-line" />

        <rect x="115" y="35" width="30" height="30" rx="3" fill="none" stroke="#3B82F6" strokeWidth="1.5" />
        <text x="130" y="53" fill="#3B82F6" fontSize="8" textAnchor="middle" fontFamily="monospace">EX</text>
        <line x1="145" y1="50" x2="165" y2="50" stroke="#06B6D4" strokeWidth="1.5" className="circuit-line" />

        <rect x="165" y="35" width="20" height="30" rx="3" fill="none" stroke="#3B82F6" strokeWidth="1.5" />
        <text x="175" y="53" fill="#3B82F6" fontSize="8" textAnchor="middle" fontFamily="monospace">WB</text>
      </svg>
    );
  }
  if (type === "barrel") {
    return (
      <svg className="w-full h-full opacity-35" viewBox="0 0 200 100">
        <line x1="20" y1="20" x2="60" y2="50" stroke="#06B6D4" strokeWidth="1.5" />
        <line x1="20" y1="50" x2="60" y2="50" stroke="#3B82F6" strokeWidth="1.5" />
        <line x1="20" y1="80" x2="60" y2="50" stroke="#a855f7" strokeWidth="1.5" />
        <polygon points="60,35 60,65 80,50" fill="none" stroke="#3B82F6" strokeWidth="1.5" />
        <text x="66" y="53" fill="#3B82F6" fontSize="8" fontFamily="monospace">MUX</text>

        <line x1="80" y1="50" x2="120" y2="50" stroke="#06B6D4" strokeWidth="1.5" />
        <polygon points="120,35 120,65 140,50" fill="none" stroke="#3B82F6" strokeWidth="1.5" />
        <text x="126" y="53" fill="#3B82F6" fontSize="8" fontFamily="monospace">MUX</text>
        <line x1="140" y1="50" x2="180" y2="50" stroke="#06B6D4" strokeWidth="1.5" />
      </svg>
    );
  }
  if (type === "alu4") {
    return (
      <svg className="w-full h-full opacity-35" viewBox="0 0 200 100">
        <polygon points="40,25 70,25 80,45 90,25 120,25 100,75 60,75" fill="none" stroke="#3B82F6" strokeWidth="1.5" />
        <text x="80" y="40" fill="#3B82F6" fontSize="9" textAnchor="middle" fontFamily="monospace">ALU</text>
        <line x1="30" y1="40" x2="55" y2="40" stroke="#06B6D4" strokeWidth="1.5" />
        <line x1="130" y1="40" x2="105" y2="40" stroke="#06B6D4" strokeWidth="1.5" />
        <line x1="80" y1="75" x2="80" y2="90" stroke="#a855f7" strokeWidth="1.5" />
      </svg>
    );
  }
  return (
    <svg className="w-full h-full opacity-35" viewBox="0 0 200 100">
      <circle cx="50" cy="50" r="25" fill="none" stroke="#3B82F6" strokeWidth="1.5" />
      <text x="50" y="53" fill="#3B82F6" fontSize="8" textAnchor="middle" fontFamily="monospace">NON-PIPE</text>
      
      <circle cx="150" cy="50" r="25" fill="none" stroke="#06B6D4" strokeWidth="1.5" />
      <text x="150" y="53" fill="#06B6D4" fontSize="8" textAnchor="middle" fontFamily="monospace">PIPE</text>

      <line x1="75" y1="50" x2="125" y2="50" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3,3" />
      <text x="100" y="44" fill="#a855f7" fontSize="7" textAnchor="middle" fontFamily="monospace">VS</text>
    </svg>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="glass-panel w-full max-w-2xl bg-[#0B1120] border-cyan/20 rounded-2xl overflow-hidden max-h-[90vh] flex flex-col relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Visual */}
        <div className="h-32 bg-[#070c18] relative overflow-hidden flex items-center justify-center border-b border-white/5 shrink-0">
          <div className="absolute inset-0 blueprint-grid opacity-25" />
          <SchematicBackground type={project.schematicType} />
        </div>

        {/* Modal content */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6">
          <div>
            <span className="text-cyan text-xs font-mono font-semibold uppercase tracking-wider block mb-1">
              {project.type}
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-white font-display leading-tight">
              {project.title}
            </h3>
          </div>

          <p className="text-gray-300 font-sans text-sm md:text-base leading-relaxed">
            {project.desc}
          </p>

          <div className="border-t border-white/5 pt-4">
            <h4 className="text-sm font-semibold text-cyan mb-3 font-sans uppercase tracking-wider flex items-center gap-2">
              <Settings className="w-4 h-4" /> Architectural Features
            </h4>
            <ul className="space-y-2.5">
              {project.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-gray-400 font-sans text-xs md:text-sm">
                  <CheckCircle className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-white/5 pt-4">
            <h4 className="text-sm font-semibold text-emerald mb-3 font-sans uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4" /> Key Learnings
            </h4>
            <ul className="space-y-2.5">
              {project.learnings.map((learning, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-gray-400 font-sans text-xs md:text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
                  <span>{learning}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4 border-t border-white/5 pt-6">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-3 px-4 bg-white/5 hover:bg-cyan/15 border border-white/5 hover:border-cyan text-white hover:text-cyan font-semibold rounded-xl text-center transition-all flex items-center justify-center gap-2 text-sm"
            >
              <Code className="w-4 h-4" /> View Source Code
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-3 px-4 bg-cyan/10 hover:bg-cyan/20 border border-cyan/20 text-cyan font-semibold rounded-xl text-center transition-all flex items-center justify-center gap-2 text-sm"
            >
              <ExternalLink className="w-4 h-4" /> Technical Documentation
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
