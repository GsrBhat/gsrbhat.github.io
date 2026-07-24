"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";
import { 
  Code, ExternalLink, Cpu, Settings, Layers, X, CheckCircle, 
  HelpCircle, Play, RotateCcw, AlertTriangle, ArrowRight 
} from "lucide-react";

type Project = {
  title: string;
  category: "VLSI" | "FPGA" | "AI & Stacks" | "FullStack";
  tech: string[];
  desc: string;
  problem: string;
  solution: string;
  results: string;
  features: string[];
  learnings: string[];
  github: string;
  schematicType: "pipeline" | "barrel" | "systolic" | "adc" | "hospital" | "nova";
};

const projectsData: Project[] = [
  {
    title: "Design of a Low-Power 2nd-Order Sigma-Delta ADC",
    category: "VLSI",
    tech: ["Cadence Virtuoso", "Spectre Transient", "18nm FinFET", "Verilog-A"],
    desc: "Designed a second-order Sigma-Delta Analog-to-Digital Converter using switched-capacitor integrators to achieve in-band noise shaping on 18nm FinFET nodes.",
    problem: "Precision analog-to-digital data modulation at deep submicron levels (18nm) encounters severe short-channel leakage and thermal noise constraints, leading to high power draw and signal degradation.",
    solution: "Designed a 2nd-order Sigma-Delta loop using switched-capacitor integrators backed by a custom two-stage Miller-compensated operational amplifier core. Completed the loop with a 1-bit comparator and feedback DAC, filtering outputs via a Sinc³ decimation filter in Verilog-A.",
    results: "Achieved an extremely optimized power budget of approximately 51.36 µW under Spectre mixed-signal transient simulations.",
    features: [
      "Switched-capacitor integrator architecture for noise shaping",
      "Two-stage Miller-compensated operational amplifier core",
      "1-bit feedback DAC completing loop paths",
      "Sinc³ (CIC) decimation filter in Verilog-A"
    ],
    learnings: [
      "Mastered low-power analog design criteria on advanced nodes (FinFET)",
      "Learned operational amplifier loop-gain margin stabilization parameters",
      "Gained skill in analog-digital simulation co-verification"
    ],
    github: "https://github.com/GsrBhat",
    schematicType: "adc"
  },
  {
    title: "RISC-V 4-Stage Pipelined ALU Design",
    category: "VLSI",
    tech: ["Verilog HDL", "Xilinx Vivado", "RISC-V ISA", "Hazard Resolution"],
    desc: "Engineered a 4-stage pipelined Arithmetic Logic Unit (Fetch, Decode, Execute, Writeback) separating datapath and control logic in synthesizable Verilog.",
    problem: "Standard single-cycle ALU processors suffer from long critical paths, limiting the maximum operating clock frequency and reducing resource throughput.",
    solution: "Built a 4-stage pipeline registers configuration (IF, ID, EX, WB) matching RV32I ISA semantics. Implemented structural hazard mitigation through data forwarding paths and pipeline stall controls.",
    results: "Successfully resolved all RAW (Read-After-Write) hazards, maximizing throughput and allowing positive Slack constraints (+0.28ns).",
    features: [
      "Separate datapath and logic execution controller",
      "RTL bypass forwarding path from EX output to inputs",
      "Dynamic stall control block",
      "Fully verified using automated testbenches inside Vivado"
    ],
    learnings: [
      "Deeply analyzed setup/hold constraints and timing violation parameters",
      "Designed clean separating controls for pipelined architectures",
      "Practiced waveform-based hazard debugging"
    ],
    github: "https://github.com/GsrBhat",
    schematicType: "pipeline"
  },
  {
    title: "FPGA-Based Real-Time Power Quality Core",
    category: "FPGA",
    tech: ["Verilog HDL", "Xilinx Vivado", "Artix-7 FPGA", "Edge AI / Python"],
    desc: "Developed a hardware core to detect voltage fluctuations and frequency anomalies, backed by an Edge AI algorithmic software layer.",
    problem: "Detecting grid anomalies in power signals requires high sampling rates and instant notification, which standard slow microcontrollers cannot achieve.",
    solution: "Coded a custom synthesizable Verilog DSP core performing real-time signal classification directly on Artix-7 fabric. Combined it with a Python/Edge AI analytics dashboard for telemetry logging.",
    results: "Minimized anomaly classification delay by 82% over software, mapping efficiently to LUT and DSP primitives with zero timing violations.",
    features: [
      "Synthesizable DSP arithmetic cores",
      "Artix-7 FPGA hardware resource mapping",
      "Edge AI software layer for remote notifications",
      "Automated clock constraint definitions"
    ],
    learnings: [
      "Mapped structural Verilog math directly to hardware DSP slices",
      "Learned FPGA pin mappings, synthesis, and implementation reports",
      "Explored Edge AI hardware co-design structures"
    ],
    github: "https://github.com/GsrBhat",
    schematicType: "systolic"
  },
  {
    title: "Parameterized N-Bit Barrel Shifter",
    category: "VLSI",
    tech: ["Verilog HDL", "Logic Minimization", "Vivado Simulator"],
    desc: "Designed a logarithmic N-bit Barrel Shifter using multiplexer trees to perform arbitrary logic shifts in a single clock cycle.",
    problem: "Iterative register shifters require up to N clock cycles to shift data bits, creating significant execution bottlenecks in processor ALUs.",
    solution: "Synthesized a multiplexer tree topology utilizing log2(N) levels of 2-to-1 MUX cells to compute left logical (LSL), right logical (LSR), and right arithmetic (ASR) shifts in one clock cycle.",
    results: "100% clean synthesis with zero inferred latches, maintaining minimal path delay.",
    features: [
      "Logarithmic cascaded multiplexer structure",
      "Supports LSL, LSR, and sign-retention ASR shifts",
      "Modular parameterized width scaling (N-bit bus width)",
      "Boundary-case test vector validation"
    ],
    learnings: [
      "Reduced logic utilization cells (LUTs) on programmable chips",
      "Avoided combinational latches during synthesis",
      "Engineered clean sign extension paths"
    ],
    github: "https://github.com/GsrBhat",
    schematicType: "barrel"
  },
  {
    title: "Smart Hospital Management System",
    category: "FullStack",
    tech: ["Java 21", "Spring Boot", "React", "PostgreSQL", "Hugging Face API"],
    desc: "Engineered a full stack patient portal featuring secure Spring Security authentication and an AI-driven specialist recommendation engine.",
    problem: "Hospital booking systems suffer from scheduling conflicts, unencrypted patient medical data storage, and poor discovery of medical specialists.",
    solution: "Built a secure database-driven booking engine in Java/Spring Boot. Secured API endpoints with role-based auth (Admin, Doctor, Patient) using Spring Security. Integrated Hugging Face LLM API to suggest doctors based on text complaints.",
    results: "Robust database locking prevents double booking, and TLS token hashing secures records.",
    features: [
      "Role-based authentication & token validation",
      "AI doctor matching via Hugging Face inference API",
      "Database schema tracking appointment status",
      "Modular React dashboard built on Vite"
    ],
    learnings: [
      "Practiced building enterprise-grade REST APIs in Spring Boot",
      "Implemented relational database normalization (PostgreSQL)",
      "Leveraged AI models inside full-stack pipelines"
    ],
    github: "https://github.com/GsrBhat",
    schematicType: "hospital"
  },
  {
    title: "NOVA OS — AI Desktop Assistant",
    category: "AI & Stacks",
    tech: ["Python", "Natural Language Processing", "Automation Scripts"],
    desc: "A modular, voice-activated desktop operating platform built to automate system settings, schedule tasks, and process commands.",
    problem: "Daily computer operations require traversing menus, which slows down developer workflows.",
    solution: "Coded a desktop automation daemon utilizing NLP audio pipelines to process tasks (file organization, workspace startup, code backups) via modular triggers.",
    results: "Created a voice-integrated tool reducing routine development configurations by minutes daily.",
    features: [
      "Speech-to-text semantic parsing engine",
      "Modular shell-automation backend APIs",
      "Dynamic background task scheduler",
      "Custom system telemetry monitors"
    ],
    learnings: [
      "Engineered robust multi-threaded Python systems",
      "Applied signal parsing and text keyword extraction",
      "Gained hands-on scripting automation experience"
    ],
    github: "https://github.com/GsrBhat",
    schematicType: "nova"
  }
];

export default function Projects() {
  const { triggerClick } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");

  const filteredProjects = categoryFilter === "ALL"
    ? projectsData
    : projectsData.filter(p => p.category === categoryFilter);

  return (
    <section id="projects" className="py-20 relative bg-[#050816] overflow-hidden">
      <div className="absolute inset-0 bg-[#050816] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[35%] h-[35%] rounded-full bg-cyan/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 lg:px-12 relative z-10 max-w-6xl">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-black mb-4 text-white">
            Silicon & Software <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-primary">Blueprints</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto font-sans text-sm md:text-base leading-relaxed">
            A visual directory of my RTL digital cores, microarchitectures, and full-stack software applications. Click any card to launch specifications.
          </p>
        </motion.div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 select-none">
          {["ALL", "VLSI", "FPGA", "AI & Stacks", "FullStack"].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                triggerClick();
                setCategoryFilter(cat);
              }}
              className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all duration-300 ${
                categoryFilter === cat
                  ? "bg-cyan/15 border-cyan text-cyan"
                  : "bg-black/30 border-white/5 text-gray-400 hover:text-white"
              }`}
              data-hover="true"
            >
              {cat === "ALL" ? "ALL BLUEPRINTS" : cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={idx}
              project={project}
              index={idx}
              onClick={() => {
                triggerClick();
                setSelectedProject(project);
              }}
            />
          ))}
        </div>
      </div>

      {/* Cinematic Apple-Style Overlay Details Page */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailOverlay project={selectedProject} onClose={() => { triggerClick(); setSelectedProject(null); }} />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  let categoryColor = "border-cyan/30 text-cyan bg-cyan/5";
  if (project.category === "FPGA") categoryColor = "border-blue-500/30 text-blue-400 bg-blue-500/5";
  if (project.category === "AI & Stacks") categoryColor = "border-purple/30 text-purple bg-purple/5";
  if (project.category === "FullStack") categoryColor = "border-emerald/30 text-emerald bg-emerald/5";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      onClick={onClick}
      className="glass-panel rounded-2xl overflow-hidden bg-[#0B1120] border-white/5 cursor-pointer relative group flex flex-col justify-between min-h-[350px]"
    >
      {/* Visual Header Grid representation */}
      <div className="h-36 bg-[#070c18] relative overflow-hidden flex items-center justify-center border-b border-white/5">
        <div className="absolute inset-0 blueprint-grid opacity-25" />
        <AbstractBlueprintVisualizer type={project.schematicType} />
        
        <div className={`absolute top-4 left-4 px-2 py-0.5 rounded text-[9px] font-mono tracking-wider uppercase font-semibold border ${categoryColor}`}>
          {project.category}
        </div>
      </div>

      {/* Info details */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg md:text-xl font-bold text-white mb-2 font-display group-hover:text-cyan transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-400 font-sans text-xs md:text-sm leading-relaxed line-clamp-3 mb-4">
            {project.desc}
          </p>
        </div>

        <div>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.slice(0, 3).map((tag, idx) => (
              <span key={idx} className="text-[9px] font-mono px-2 py-0.5 bg-white/5 border border-white/5 text-cyan rounded">
                {tag}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="text-[9px] font-mono px-2 py-0.5 bg-white/5 border border-white/5 text-gray-500 rounded">
                +{project.tech.length - 3}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-white/5 pt-4 text-xs font-semibold text-cyan group-hover:underline">
            <span>Explore Specifications →</span>
            <div className="text-[10px] font-mono text-gray-500">REV: 1.0</div>
          </div>
        </div>
      </div>

      {/* Hover glow */}
      <div className="absolute inset-0 border border-transparent rounded-2xl group-hover:border-cyan/30 pointer-events-none transition-all duration-300" />
    </motion.div>
  );
}

// Mini schematic representation
function AbstractBlueprintVisualizer({ type }: { type: string }) {
  if (type === "pipeline") {
    return (
      <svg className="w-4/5 h-16 text-cyan/30" viewBox="0 0 100 30">
        <rect x="5" y="5" width="15" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="1" />
        <rect x="30" y="5" width="15" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="1" />
        <rect x="55" y="5" width="15" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="1" />
        <rect x="80" y="5" width="15" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M20 15 H30 M45 15 H55 M70 15 H80" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" />
      </svg>
    );
  }
  if (type === "barrel") {
    return (
      <svg className="w-4/5 h-16 text-indigo/30" viewBox="0 0 100 30">
        <polygon points="10,5 30,10 30,20 10,25" fill="none" stroke="currentColor" strokeWidth="1" />
        <polygon points="50,5 70,10 70,20 50,25" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M30 15 H50 M70 15 H90" stroke="currentColor" strokeWidth="1" />
      </svg>
    );
  }
  if (type === "adc") {
    return (
      <svg className="w-4/5 h-16 text-purple/30" viewBox="0 0 100 30">
        <circle cx="20" cy="15" r="10" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M20 5 V25 M10 15 H30" stroke="currentColor" strokeWidth="1" />
        <rect x="50" y="5" width="30" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M30 15 H50" stroke="currentColor" strokeWidth="1" />
      </svg>
    );
  }
  return (
    <svg className="w-4/5 h-16 text-cyan/20" viewBox="0 0 100 30">
      <circle cx="50" cy="15" r="12" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M10 15 H98" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  );
}

// Cinematic Details Modal Overlay
function ProjectDetailOverlay({ project, onClose }: { project: Project; onClose: () => void }) {
  const { soundEnabled, triggerBeep, triggerClick, triggerTyping } = usePortfolio();
  
  // States for interactive simulators inside overlay!
  const [aluCycle, setAluCycle] = useState(0);
  const [pipelineState, setPipelineState] = useState<string[]>(["NOP", "NOP", "NOP", "NOP"]);
  const [aluLog, setAluLog] = useState("[System initial. Step clock to start simulation.]");
  
  const [shifterInput, setShifterInput] = useState("10100101");
  const [shiftAmount, setShiftAmount] = useState(2);
  const [shiftType, setShiftType] = useState<"LSL" | "LSR" | "ASR">("LSL");
  
  const [systolicCycle, setSystolicCycle] = useState(0);
  const [systolicActivePEs, setSystolicActivePEs] = useState<number[]>([]);

  // Step pipelined ALU simulator logic
  const handleStepALU = () => {
    triggerBeep(1000, 0.05, "sine");
    const instructions = [
      { inst: "ADD R1, R2, R3", log: "Cycle 1: IF Stage loads ADD. Operands mapping to R2 & R3." },
      { inst: "SUB R4, R1, R5", log: "Cycle 2: RAW hazard detected! R1 is register-targeted. Stall controls evaluated." },
      { inst: "NOP", log: "Cycle 3: Bypass forwarding line engaged from EX stage output to input ALU mux." },
      { inst: "AND R6, R4, R1", log: "Cycle 4: Final execution complete. Writeback registers updated. Timing slack positive." }
    ];

    setAluCycle((prev) => {
      const nextCycle = prev + 1;
      const currentInst = instructions[prev % instructions.length];
      
      const newPipeline = [...pipelineState];
      newPipeline.unshift(currentInst.inst);
      newPipeline.pop();
      setPipelineState(newPipeline);
      setAluLog(currentInst.log);
      
      return nextCycle;
    });
  };

  const handleResetALU = () => {
    triggerClick();
    setAluCycle(0);
    setPipelineState(["NOP", "NOP", "NOP", "NOP"]);
    setAluLog("[System reset. Clock line idle.]");
  };

  // Compute Barrel Shifter outputs
  const getShifterOutput = () => {
    let bits = shifterInput.replace(/[^01]/g, "").substring(0, 8).padEnd(8, "0");
    const amt = shiftAmount;
    let result = "";

    if (shiftType === "LSL") {
      result = bits.substring(amt) + "0".repeat(amt);
    } else if (shiftType === "LSR") {
      result = "0".repeat(amt) + bits.substring(0, 8 - amt);
    } else if (shiftType === "ASR") {
      const sign = bits[0];
      result = sign.repeat(amt) + bits.substring(0, 8 - amt);
    }
    return result;
  };

  // Step Systolic Multiplier Array
  const handleStepSystolic = () => {
    triggerBeep(900, 0.04, "sine");
    setSystolicCycle((prev) => {
      const next = prev + 1;
      if (next > 7) {
        setSystolicActivePEs([]);
        return 0; // reset loop
      }
      
      // Calculate active PEs on diagonal wavefront (row + col + 1 = cycle)
      const active: number[] = [];
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
          if (r + c + 1 === next) {
            active.push(r * 4 + c);
          }
        }
      }
      setSystolicActivePEs(active);
      return next;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.95, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 30 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="w-full max-w-4xl bg-[#070c18] border border-cyan/20 rounded-3xl overflow-hidden max-h-[92vh] flex flex-col relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Blueprint background header */}
        <div className="h-44 bg-[#0B1120] relative overflow-hidden flex items-center justify-center border-b border-white/5 shrink-0 select-none">
          <div className="absolute inset-0 blueprint-grid opacity-20" />
          <div className="text-center z-10">
            <span className="text-[10px] font-mono tracking-widest text-cyan uppercase font-bold px-2 py-0.5 rounded bg-cyan/5 border border-cyan/20">
              {project.category} Core Specifications
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white font-display mt-2">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Content body scroll area */}
        <div className="p-6 md:p-10 overflow-y-auto space-y-8 flex-1">
          {/* Main columns */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Left Col: Case Study Narrative (Problem -> Solution -> Results) */}
            <div className="md:col-span-7 space-y-6">
              <div>
                <h4 className="text-xs font-mono font-bold text-red-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" /> Problem statement
                </h4>
                <p className="text-gray-300 font-sans text-xs md:text-sm leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono font-bold text-cyan uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                  <Settings className="w-3.5 h-3.5" /> Proposed Architecture
                </h4>
                <p className="text-gray-300 font-sans text-xs md:text-sm leading-relaxed">
                  {project.solution}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-cyan/5 border border-cyan/20">
                <h4 className="text-xs font-mono font-bold text-cyan uppercase tracking-widest mb-1.5">
                  ✓ Measured Performance Results
                </h4>
                <p className="text-white font-sans text-xs md:text-sm font-semibold">
                  {project.results}
                </p>
              </div>
            </div>

            {/* Right Col: Specifications Lists */}
            <div className="md:col-span-5 space-y-6">
              <div>
                <h4 className="text-xs font-mono font-bold text-purple uppercase tracking-widest mb-3">
                  System Features
                </h4>
                <ul className="space-y-2">
                  {project.features.map((feat, idx) => (
                    <li key={idx} className="flex gap-2 items-start text-xs font-sans text-gray-400">
                      <CheckCircle className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-mono font-bold text-emerald uppercase tracking-widest mb-3">
                  R&D Key Learnings
                </h4>
                <ul className="space-y-2">
                  {project.learnings.map((lrn, idx) => (
                    <li key={idx} className="flex gap-2 items-start text-xs font-sans text-gray-400">
                      <CheckCircle className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
                      <span>{lrn}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* Interactive Live Hardware Simulator Integration! */}
          <div className="border-t border-white/5 pt-8">
            <h3 className="text-lg font-bold text-white font-display mb-4 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan" /> Interactive Hardware Simulator Workspace
            </h3>

            {project.schematicType === "pipeline" && (
              <div className="glass-panel p-6 rounded-2xl bg-black/40 border-white/5 space-y-6 font-mono text-xs">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <span className="text-[10px] text-cyan font-bold uppercase tracking-wider">
                    RISC-V Pipelined ALU registers
                  </span>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={handleStepALU}
                      className="px-3 py-1.5 rounded bg-cyan/15 hover:bg-cyan/25 border border-cyan/30 text-cyan text-[10px] font-bold flex items-center gap-1.5 transition-all"
                      data-hover="true"
                    >
                      <Play className="w-3 h-3" /> Step Clock Cycle
                    </button>
                    <button
                      onClick={handleResetALU}
                      className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/5 text-[10px] font-bold flex items-center gap-1.5 transition-all"
                      data-hover="true"
                    >
                      <RotateCcw className="w-3 h-3" /> Reset
                    </button>
                  </div>
                </div>

                {/* Pipeline visual stages */}
                <div className="grid grid-cols-4 gap-2 text-center">
                  {[
                    { stage: "Fetch (IF)", val: pipelineState[0] },
                    { stage: "Decode (ID)", val: pipelineState[1] },
                    { stage: "Execute (EX)", val: pipelineState[2] },
                    { stage: "Writeback (WB)", val: pipelineState[3] },
                  ].map((s, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg border transition-all duration-300 ${
                        s.val !== "NOP"
                          ? "bg-cyan/5 border-cyan/40 text-cyan shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                          : "bg-black/50 border-white/5 text-gray-600"
                      }`}
                    >
                      <div className="text-[9px] text-gray-500 uppercase font-bold mb-1">{s.stage}</div>
                      <div className="text-[11px] font-extrabold truncate">{s.val}</div>
                    </div>
                  ))}
                </div>

                {/* Simulator console logs */}
                <div className="p-4 bg-black/80 border border-white/5 rounded-lg text-gray-400 space-y-1 h-24 overflow-y-auto">
                  <div className="text-[9px] text-gray-500 border-b border-white/5 pb-1 flex justify-between uppercase">
                    <span>Telemetric Console Log</span>
                    <span>Uptime: Cycle {aluCycle}</span>
                  </div>
                  <div className="text-cyan leading-relaxed pt-1.5">{aluLog}</div>
                </div>
              </div>
            )}

            {project.schematicType === "barrel" && (
              <div className="glass-panel p-6 rounded-2xl bg-black/40 border-white/5 space-y-6 font-mono text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  
                  {/* Inputs */}
                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] text-cyan font-bold uppercase tracking-wider block mb-2">
                        8-Bit Input Data (binary):
                      </span>
                      <input
                        type="text"
                        value={shifterInput}
                        onChange={(e) => {
                          triggerTyping();
                          setShifterInput(e.target.value.replace(/[^01]/g, "").substring(0, 8));
                        }}
                        maxLength={8}
                        className="w-full bg-black border border-white/10 rounded px-3 py-2 text-white font-bold tracking-widest text-center focus:outline-none focus:border-cyan"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-[10px] text-cyan font-bold uppercase tracking-wider block mb-2">
                          Shift Mode:
                        </span>
                        <select
                          value={shiftType}
                          onChange={(e) => {
                            triggerClick();
                            setShiftType(e.target.value as any);
                          }}
                          className="w-full bg-black border border-white/10 rounded px-2 py-2 text-white font-bold"
                        >
                          <option value="LSL">LSL (Logical Left)</option>
                          <option value="LSR">LSR (Logical Right)</option>
                          <option value="ASR">ASR (Arithmetic Right)</option>
                        </select>
                      </div>

                      <div>
                        <span className="text-[10px] text-cyan font-bold uppercase tracking-wider block mb-2">
                          Shift Amount ({shiftAmount}):
                        </span>
                        <input
                          type="range"
                          min={0}
                          max={7}
                          value={shiftAmount}
                          onChange={(e) => {
                            triggerClick();
                            setShiftAmount(parseInt(e.target.value));
                          }}
                          className="w-full accent-cyan"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Shifter Bit Cells Display */}
                  <div className="space-y-4 border-l border-white/5 pl-0 md:pl-6">
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase block mb-2">Input bit cells:</span>
                      <div className="flex gap-1 justify-center">
                        {shifterInput.padEnd(8, "0").split("").map((b, i) => (
                          <div
                            key={i}
                            className={`w-8 h-8 rounded border flex items-center justify-center font-bold text-xs ${
                              b === "1" ? "bg-cyan/15 border-cyan text-cyan" : "bg-black/40 border-white/5 text-gray-600"
                            }`}
                          >
                            {b}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] text-cyan uppercase block mb-2">Shifted outputs:</span>
                      <div className="flex gap-1 justify-center">
                        {getShifterOutput().split("").map((b, i) => (
                          <div
                            key={i}
                            className={`w-8 h-8 rounded border flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                              b === "1" ? "bg-cyan/20 border-cyan text-cyan animate-pulse" : "bg-black/40 border-white/5 text-gray-600"
                            }`}
                          >
                            {b}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>

                <div className="p-4 bg-black/80 border border-white/5 rounded-lg text-gray-400">
                  <div className="text-[9px] text-gray-500 uppercase mb-1">Gate MUX Tree Logic Telemetry</div>
                  <div>
                    Select lines statuses: S2 = <span className="text-cyan font-bold">{(shiftAmount & 4) ? "1" : "0"}</span>, S1 = <span className="text-cyan font-bold">{(shiftAmount & 2) ? "1" : "0"}</span>, S0 = <span className="text-cyan font-bold">{(shiftAmount & 1) ? "1" : "0"}</span>. Total hardware propagation delay estimated at ~0.45ns. No latch variables inferred.
                  </div>
                </div>
              </div>
            )}

            {project.schematicType === "systolic" && (
              <div className="glass-panel p-6 rounded-2xl bg-black/40 border-white/5 space-y-6 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-cyan font-bold uppercase tracking-wider">
                    Systolic Spatial array multiplier (4x4 matrix processing elements)
                  </span>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={handleStepSystolic}
                      className="px-3 py-1.5 rounded bg-cyan/15 hover:bg-cyan/25 border border-cyan/30 text-cyan text-[10px] font-bold flex items-center gap-1.5 transition-all"
                      data-hover="true"
                    >
                      <Play className="w-3 h-3" /> Step Wavefront Pulse
                    </button>
                    <button
                      onClick={() => { triggerClick(); setSystolicCycle(0); setSystolicActivePEs([]); }}
                      className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/5 text-[10px] font-bold flex items-center gap-1.5 transition-all"
                      data-hover="true"
                    >
                      <RotateCcw className="w-3 h-3" /> Reset Array
                    </button>
                  </div>
                </div>

                {/* 4x4 Grid processing elements */}
                <div className="grid grid-cols-4 gap-3 max-w-[280px] mx-auto text-center">
                  {[...Array(16)].map((_, i) => {
                    const row = Math.floor(i / 4);
                    const col = i % 4;
                    const isActive = systolicActivePEs.includes(i);
                    return (
                      <div
                        key={i}
                        className={`p-3 rounded-lg border flex flex-col justify-between items-center transition-all duration-300 ${
                          isActive
                            ? "bg-cyan/15 border-cyan text-cyan shadow-[0_0_15px_rgba(6,182,212,0.15)] scale-105"
                            : "bg-black/40 border-white/5 text-gray-600"
                        }`}
                      >
                        <span className="text-[8px] text-gray-500">PE_{row}_{col}</span>
                        <div className="text-[10px] font-black">{isActive ? "MAC" : "Idle"}</div>
                      </div>
                    );
                  })}
                </div>

                <div className="p-4 bg-black/80 border border-white/5 rounded-lg text-gray-400">
                  <div className="text-[9px] text-gray-500 uppercase mb-1">Systolic Telemetry Log</div>
                  <div>
                    {systolicCycle > 0 ? (
                      <span>
                        [Cycle {systolicCycle}] Diagonal wave pulse active. Computing inputs mapping diagonal coefficients. 
                        FPGA usage details: DSP Blocks = 16/120. Slices used = 64/5200.
                      </span>
                    ) : (
                      <span>Clock Idle. Load matrix registers and click step to view diagonal MAC activations.</span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* General default mock workspace for non-simulator projects */}
            {!["pipeline", "barrel", "systolic"].includes(project.schematicType) && (
              <div className="glass-panel p-6 rounded-2xl bg-black/40 border-white/5 text-center py-10 font-mono text-xs">
                <Cpu className="w-12 h-12 text-cyan/30 mx-auto mb-4 animate-pulse" />
                <div className="text-cyan font-bold mb-2">WAVEFORM SIMULATION REPORTS LOADING...</div>
                <div className="text-gray-500 max-w-sm mx-auto">
                  RTL simulation waveform logs mapped to memory registers. Open Source Code repository connected below for functional inspection.
                </div>
              </div>
            )}
          </div>

          {/* Action links */}
          <div className="flex gap-4 border-t border-white/5 pt-6 select-none">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              onClick={triggerClick}
              className="flex-1 py-3 px-4 bg-white/5 hover:bg-cyan/15 border border-white/5 hover:border-cyan text-white hover:text-cyan font-semibold rounded-xl text-center transition-all flex items-center justify-center gap-2 text-sm"
              data-hover="true"
            >
              <Code className="w-4 h-4" /> View Git Code Repository
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              onClick={triggerClick}
              className="flex-1 py-3 px-4 bg-cyan/10 hover:bg-cyan/20 border border-cyan/20 text-cyan font-semibold rounded-xl text-center transition-all flex items-center justify-center gap-2 text-sm"
              data-hover="true"
            >
              <ExternalLink className="w-4 h-4" /> Read Spec Sheet
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
