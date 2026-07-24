"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Download, FileText, CheckCircle, Cpu, Mail, Phone, MapPin, 
  ExternalLink, Calendar, Award, Briefcase, 
  Terminal, Globe, ChevronDown, ChevronUp, Code
} from "lucide-react";
import HoloButton from "../ui/HoloButton";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

type Project = {
  title: string;
  subtitle: string;
  bullets: string[];
};

type EducationItem = {
  institution: string;
  degree: string;
  cgpa: string;
  period: string;
};

type TrainingItem = {
  title: string;
  sub: string;
  bullets: string[];
};

type SkillCategory = {
  category: string;
  items: string[];
};

type ResumeData = {
  title: string;
  summary: string;
  education: EducationItem[];
  training?: TrainingItem[];
  internship?: {
    role: string;
    company: string;
    period: string;
    bullets: string[];
  };
  skills: SkillCategory[];
  projects: Project[];
  achievements: string[];
  certifications: string[];
  pdfLink: string;
  themeColor: string;
  glowColor: "primary" | "secondary" | "accent";
  badgeText: string;
};

const vlsiResume: ResumeData = {
  title: "VLSI & Semiconductor Engineer",
  badgeText: "Hardware & RTL",
  themeColor: "text-cyan border-cyan/20 bg-cyan/5 shadow-cyan/10",
  glowColor: "primary",
  pdfLink: "/resume-vlsi.pdf",
  summary: "B.Tech Electronics and Communication Engineering student specializing in RTL design, digital systems, and analog/mixed-signal VLSI design flows. Samsung ISWDP Fellow with hands-on training in semiconductor fundamentals, CMOS device physics, and TCAD-based modeling. Experienced in designing, simulating, and verifying digital and analog IC architectures using Verilog HDL, Cadence Virtuoso, Xilinx Vivado, and Synopsys Sentaurus TCAD. Seeking a core industry internship in RTL design, functional verification, or analog/physical design starting December/January.",
  education: [
    {
      institution: "Anurag University, Hyderabad, India",
      degree: "Bachelor of Technology in Electronics and Communication Engineering (ECE)",
      period: "Expected Graduation: 2027",
      cgpa: "Cumulative Grade Point Average: 7.95 / 10.0"
    },
    {
      institution: "Jawaharlal Nehru Government Polytechnic (JNGPT), Ramanthapur, India",
      degree: "Diploma in Electronics and Communication Engineering (ECE)",
      period: "2021 – 2024",
      cgpa: "Cumulative Grade Point Average: 9.17 / 10.0 (Graduated with Distinction)"
    }
  ],
  training: [
    {
      title: "Samsung Fellowship — India Semiconductor Workforce Development Program (ISWDP)",
      sub: "Cohort 8 Scholar, Grade II",
      bullets: [
        "Selected from a national pool of 4,000+ engineering applicants based on technical aptitude.",
        "Completed industry-led training in deep-submicron CMOS fundamentals, short-channel effects, and physical layout principles.",
        "Built active device physics models in Synopsys Sentaurus TCAD to study switching characteristics, threshold voltage variation, and transistor-level behavior."
      ]
    }
  ],
  skills: [
    {
      category: "Hardware Description Languages",
      items: ["Verilog HDL (RTL, Behavioral, Dataflow, Structural)", "Verilog-A"]
    },
    {
      category: "EDA Tools",
      items: ["Cadence Virtuoso", "Synopsys Sentaurus TCAD", "Xilinx Vivado", "ModelSim"]
    },
    {
      category: "Simulation Tools",
      items: ["Spectre (AC, Transient, Mixed-Signal)"]
    },
    {
      category: "Analog & Mixed-Signal Design",
      items: ["Switched-Capacitor Circuits", "Operational Amplifier Design", "Comparators", "Sigma-Delta ADC", "Noise Shaping", "Low-Power Analog Design"]
    },
    {
      category: "Digital Design",
      items: ["RTL Design", "Combinational & Sequential Logic", "Finite State Machines (FSM)"]
    },
    {
      category: "FPGA Development",
      items: ["FPGA Prototyping", "Constraint Definition", "Pin Mapping", "Clock Definition"]
    },
    {
      category: "Verification",
      items: ["Testbench Development", "Waveform Debugging", "Simulation-Based Functional Verification"]
    },
    {
      category: "Semiconductor Concepts",
      items: ["CMOS", "FinFET", "Static Timing Analysis (STA)", "Setup/Hold Constraint Validation"]
    },
    {
      category: "Programming & Scripting",
      items: ["C", "Python (Automation & Scripting)", "MATLAB (DSP & Filter Design)"]
    }
  ],
  projects: [
    {
      title: "Design of a Low-Power 2nd-Order Sigma-Delta ADC Using Noise Shaping Techniques",
      subtitle: "Cadence Virtuoso, Spectre | 18nm FinFET",
      bullets: [
        "Designed a second-order Sigma-Delta ADC architecture using switched-capacitor integrators to achieve in-band noise shaping.",
        "Designed a two-stage Miller-compensated operational amplifier as the core analog building block for the integrator stages.",
        "Developed the comparator and 1-bit feedback DAC completing the ADC feedback loop.",
        "Implemented a Sinc³ (CIC) decimation filter in Verilog-A for digital output filtering.",
        "Performed AC, transient, and mixed-signal simulations in Cadence Virtuoso and Spectre on 18nm FinFET technology.",
        "Optimized the analog core for low-power operation, achieving approximately 51.36 µW power consumption."
      ]
    },
    {
      title: "RISC-V 4-Stage Pipelined ALU Design",
      subtitle: "Xilinx Vivado",
      bullets: [
        "Designed a 4-stage pipelined Arithmetic Logic Unit (Fetch, Decode, Execute, Writeback) aligned with RV32I ISA semantics, separating datapath and control logic in Verilog HDL.",
        "Implemented data-forwarding paths and pipeline stall logic to address structural and data hazards across sequential instructions.",
        "Simulated and functionally verified the design in Xilinx Vivado using testbench-driven verification across multiple instruction sequences."
      ]
    },
    {
      title: "FPGA-Based Power Quality Anomaly Detection Core",
      subtitle: "Xilinx Vivado",
      bullets: [
        "Developed a Verilog HDL hardware core to detect voltage fluctuations and frequency-based power quality anomalies.",
        "Synthesized the design in Xilinx Vivado, applying hardware constraints, pin mapping, and clock definitions for target FPGA implementation.",
        "Validated functional behavior and timing through testbench-driven simulation."
      ]
    },
    {
      title: "16-Bit ALU Comparative Study (Pipelined vs. Non-Pipelined)",
      subtitle: "ModelSim & Vivado",
      bullets: [
        "Developed a Verilog HDL test framework to compare pipelined and non-pipelined ALU datapath architectures.",
        "Synthesized both design variants to evaluate VLSI performance metrics, including maximum clock frequency (Fmax), propagation delay, and resource utilization.",
        "Analyzed timing behavior and architectural trade-offs between the two implementations through waveform debugging in ModelSim."
      ]
    },
    {
      title: "Parameterized N-bit Barrel Shifter Architecture",
      subtitle: "Xilinx Vivado",
      bullets: [
        "Designed a parameterized N-bit barrel shifter using a cascaded 2-to-1 multiplexer tree (log2N stages) supporting logical and arithmetic shift operations.",
        "Implemented the RTL in Verilog HDL, structuring combinational logic to ensure clean synthesis with no inferred latches.",
        "Verified functional correctness across multiple test vectors and control-word combinations through simulation."
      ]
    }
  ],
  achievements: [
    "Selected for Samsung Fellowship – ISWDP Cohort 8 (Grade II) among 4000+ applicants.",
    "Selected for India Semiconductor Workforce Development Program (ISWDP) focused on Semiconductor Technology and Synopsys TCAD Training."
  ],
  certifications: [
    "NPTEL: VLSI Physical Design with Timing Analysis — IIT Roorkee",
    "NPTEL: Digital Design with Verilog HDL — IIT Guwahati (Top 75th percentile)",
    "NPTEL: VLSI Design Flow: RTL to GDS — IIIT Delhi",
    "Maven Silicon: VLSI SoC Architecture & Digital Design Overview"
  ]
};

const softwareResume: ResumeData = {
  title: "Software & Full-Stack Developer",
  badgeText: "Spring Boot & AI",
  themeColor: "text-emerald border-emerald/20 bg-emerald/5 shadow-emerald/10",
  glowColor: "accent",
  pdfLink: "/resume-software.pdf",
  summary: "Software developer with a B.Tech in Electronics and Communication Engineering, focused on full stack development using Java, Spring Boot, React, and Python. Experienced in building AI-integrated applications, REST APIs, and database-driven systems, with a solid foundation in data structures, algorithms, and OOP. Comfortable debugging complex systems, picking up new tools quickly, and collaborating effectively within team environments. Skilled in Git/GitHub version control and technical documentation, with a consistent focus on writing clean, functional, well-tested code.",
  education: [
    {
      institution: "Anurag University, Hyderabad, India",
      degree: "Bachelor of Technology, Electronics and Communication Engineering",
      period: "Expected Graduation: 2027",
      cgpa: "CGPA: 7.95/10.0"
    },
    {
      institution: "Jawaharlal Nehru Government Polytechnic (JNGPT), Ramanthapur, India",
      degree: "Diploma in Electronics and Communication Engineering (ECE)",
      period: "2021 – 2024",
      cgpa: "CGPA: 9.17/10.0 (Graduated with Distinction)"
    }
  ],
  internship: {
    role: "Python Programming Intern",
    company: "VaultofCodes",
    period: "1 Month",
    bullets: [
      "Applied Python programming and logic-building techniques to complete hands-on assignments involving automation and debugging, strengthening core problem-solving skills."
    ]
  },
  skills: [
    {
      category: "Programming Languages",
      items: ["Java", "Python", "C", "Verilog HDL"]
    },
    {
      category: "Frontend",
      items: ["React", "HTML", "CSS", "JavaScript (Basic)", "Bootstrap"]
    },
    {
      category: "Backend & Database",
      items: ["Spring Boot", "Spring Security", "REST APIs", "PostgreSQL", "SQL"]
    },
    {
      category: "Developer Tools",
      items: ["Git", "GitHub", "VS Code", "Maven", "Vite", "MATLAB", "Vivado", "Cadence Virtuoso", "Cisco Packet Tracer"]
    },
    {
      category: "Core Computer Science",
      items: ["Data Structures", "Algorithms", "OOP", "DBMS", "Operating Systems", "Computer Networks"]
    },
    {
      category: "Other Concepts",
      items: ["AI", "Machine Learning Basics", "Linux Basics", "Debugging", "Testing", "Version Control", "Technical Documentation"]
    }
  ],
  projects: [
    {
      title: "Smart Hospital Management System",
      subtitle: "Java 21, Spring Boot 3, Spring Security, React 18, Vite, PostgreSQL, Bootstrap, Axios, Hugging Face API, Maven",
      bullets: [
        "Engineered a full stack hospital management platform using Java, Spring Boot, React, and PostgreSQL, implementing appointment booking, patient record management, and queue tracking.",
        "Designed and implemented role-based authentication and authorization for Admin, Doctor, and Patient users with Spring Security, ensuring secure, controlled access across the application.",
        "Integrated an AI-powered doctor recommendation feature using the Hugging Face Inference API to match patients with relevant specialists based on their needs.",
        "Built and tested REST APIs for appointment booking, real-time queue monitoring, and token generation, following clean backend architecture and documenting endpoints for maintainability."
      ]
    },
    {
      title: "RTL Projects",
      subtitle: "Pipelined ALU, Barrel Shifter, 4-bit ALU | Verilog HDL",
      bullets: [
        "Designed, simulated, and functionally verified a pipelined ALU, barrel shifter, and 4-bit ALU in Verilog HDL, debugging timing and logic issues through waveform analysis."
      ]
    },
    {
      title: "NOVA OS — AI-Powered Desktop Assistant",
      subtitle: "Python",
      bullets: [
        "Engineered NOVA OS, a modular Python-based AI desktop assistant, structuring automation features into independent, maintainable components with a scalable software design.",
        "Debugged and refined assistant behavior across automation workflows to improve reliability and overall user experience."
      ]
    },
    {
      title: "AetherOS — Universal AI Learning Operating System",
      subtitle: "Python, AI/Edge AI",
      bullets: [
        "Designed AetherOS, an AI-driven learning platform featuring a productivity dashboard and modular workspace architecture, incorporating structured database planning and core software engineering practices."
      ]
    },
    {
      title: "FPGA-Based Real-Time Power Quality Anomaly Detection",
      subtitle: "Python, AI/Edge AI",
      bullets: [
        "Developed the software layer for a real-time power quality anomaly detection system, handling data processing, algorithm development, testing, and technical documentation using Python and AI concepts."
      ]
    }
  ],
  achievements: [
    "Selected for the Samsung ISWDP Cohort 8 Fellowship.",
    "Participated in the India Semiconductor Workforce Development Program (ISWDP)."
  ],
  certifications: [
    "Oracle: Cloud Infrastructure 2025 Certified AI Foundations Associate",
    "Cisco: CCNA – Introduction to Networks",
    "Google: Introduction to Generative AI",
    "NPTEL: Digital Design with Verilog • VLSI Physical Design with Timing Analysis • VLSI Design Flow: RTL to GDS",
    "Maven Silicon: VLSI SoC Design Overview",
    "Foundation for QC Innovation (IISc Bengaluru): Quantum Computing Workshop"
  ]
};

export default function Resume() {
  const [activeTab, setActiveTab] = useState<"vlsi" | "software">("vlsi");
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const data = activeTab === "vlsi" ? vlsiResume : softwareResume;

  const toggleProject = (index: number) => {
    setExpandedProject(expandedProject === index ? null : index);
  };

  return (
    <section id="resume" className="py-20 relative bg-[#050816] overflow-hidden">
      {/* Background Silicon Blueprint Pattern */}
      <div className="absolute inset-0 blueprint-grid opacity-15 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan/20 to-transparent" />
      
      {/* Background Light Ray Blobs */}
      <div className="absolute -top-[10%] -left-[10%] w-[35%] h-[35%] rounded-full bg-cyan/5 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-[10%] -right-[10%] w-[35%] h-[35%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 lg:px-12 relative z-10 max-w-6xl">
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-black mb-4 text-white font-display tracking-tight">
            Interactive <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan via-primary to-indigo">Resume Console</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto font-sans text-sm md:text-base leading-relaxed">
             recruiters: switch between my core hardware VLSI track and software full-stack track to examine relevant profiles.
          </p>
        </motion.div>

        {/* Dual Console Mode Switcher */}
        <div className="flex justify-center mb-10">
          <div className="p-1 rounded-xl bg-[#0B1120] border border-white/5 flex relative max-w-md w-full shadow-lg">
            <button
              onClick={() => {
                setActiveTab("vlsi");
                setExpandedProject(null);
              }}
              className={`flex-1 py-3 rounded-lg text-xs md:text-sm font-bold font-display z-10 transition-colors flex items-center justify-center gap-2 ${
                activeTab === "vlsi" ? "text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              <Cpu className="w-4 h-4 shrink-0" />
              VLSI & Semiconductors
            </button>
            <button
              onClick={() => {
                setActiveTab("software");
                setExpandedProject(null);
              }}
              className={`flex-1 py-3 rounded-lg text-xs md:text-sm font-bold font-display z-10 transition-colors flex items-center justify-center gap-2 ${
                activeTab === "software" ? "text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              <Terminal className="w-4 h-4 shrink-0" />
              Software & Full-Stack
            </button>

            {/* Slider pill */}
            <motion.div
              layoutId="console-pill"
              className={`absolute top-1 bottom-1 rounded-lg ${
                activeTab === "vlsi" ? "bg-cyan/15 border border-cyan/40" : "bg-emerald/15 border border-emerald/40"
              }`}
              style={{
                width: "calc(50% - 4px)",
                left: activeTab === "vlsi" ? "4px" : "calc(50%)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
          </div>
        </div>

        {/* Console Workspace Board */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: activeTab === "vlsi" ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-panel p-6 md:p-10 rounded-2xl bg-[#0B1120] border border-white/5 flex flex-col lg:flex-row gap-8 relative overflow-hidden"
        >
          {/* Active Accent Border Strip */}
          <div className={`absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r ${
            activeTab === "vlsi" ? "from-cyan to-primary" : "from-emerald to-indigo"
          }`} />

          {/* Left Panel: Narrative, Contact & Actions */}
          <div className="w-full lg:w-4/12 flex flex-col justify-between gap-6 border-b lg:border-b-0 lg:border-r border-white/5 pb-8 lg:pb-0 lg:pr-8">
            <div className="space-y-6">
              {/* Header profile info */}
              <div>
                <span className={`text-[10px] font-mono font-bold tracking-widest uppercase px-2.5 py-1 rounded-md border ${
                  activeTab === "vlsi" ? "bg-cyan/5 border-cyan/30 text-cyan" : "bg-emerald/5 border-emerald/30 text-emerald"
                }`}>
                  {data.badgeText}
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-white font-display mt-4 leading-none">
                  SAI RAHUL BHAT
                </h3>
                <p className="text-gray-400 font-sans text-xs md:text-sm font-semibold mt-1">
                  Gaadhi Raju
                </p>
                <p className={`text-xs font-mono font-bold uppercase tracking-wider mt-3 ${
                  activeTab === "vlsi" ? "text-cyan" : "text-emerald"
                }`}>
                  {data.title}
                </p>
              </div>

              {/* Bio summary */}
              <div className="bg-[#070c18] border border-white/5 rounded-xl p-4 shadow-inner">
                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" /> Transmitter Bio
                </div>
                <p className="text-gray-300 font-sans text-xs md:text-sm leading-relaxed">
                  {data.summary}
                </p>
              </div>


              {/* ATS Compliance Analyzer Visualization */}
              <div className="bg-[#070c18] border border-white/5 rounded-xl p-4 shadow-inner">
                <div className="text-[10px] font-mono text-cyan uppercase tracking-wider mb-3 flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5" /> ATS Parser Telemetry</span>
                  <span className="text-emerald font-bold">98/100</span>
                </div>
                
                <div className="flex items-center gap-4">
                  {/* Radial progress ring */}
                  <div className="relative w-14 h-14 shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-white/5"
                        strokeWidth="3"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <motion.path
                        className="text-cyan"
                        strokeWidth="3"
                        strokeDasharray="98, 100"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 0.98 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white font-mono">
                      98%
                    </div>
                  </div>

                  <div className="space-y-1 flex-1 font-mono text-[9px] text-gray-400">
                    <div className="flex justify-between">
                      <span>KEYWORD MATCH:</span>
                      <span className="text-white">95%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>READABILITY:</span>
                      <span className="text-white">PASS</span>
                    </div>
                    <div className="flex justify-between">
                      <span>STRUCTURE:</span>
                      <span className="text-white">OPTIMIZED</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Nodes */}
              <div className="space-y-3 font-sans text-xs md:text-sm">
                <a href="mailto:gsrbhat20@gmail.com" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors" data-hover="true">
                  <Mail className="w-4 h-4 text-cyan" /> gsrbhat20@gmail.com
                </a>
                <a href="tel:+917989035770" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors" data-hover="true">
                  <Phone className="w-4 h-4 text-cyan" /> +91 7989035770
                </a>
                <div className="flex items-center gap-3 text-gray-400">
                  <MapPin className="w-4 h-4 text-cyan" /> Hyderabad, India
                </div>
                <div className="flex gap-3 pt-2">
                  <a href="https://www.linkedin.com/in/sairahulbhatg/" target="_blank" rel="noreferrer" className="p-2 rounded bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:border-cyan/30 transition-all shadow" data-hover="true">
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                  <a href="https://github.com/GsrBhat" target="_blank" rel="noreferrer" className="p-2 rounded bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:border-cyan/30 transition-all shadow" data-hover="true">
                    <GithubIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Actions panel */}
            <div className="space-y-3 mt-6 lg:mt-0">
              <HoloButton
                glowColor={data.glowColor}
                className="w-full flex items-center justify-center py-3.5 text-xs md:text-sm font-bold tracking-wide border-cyan/20"
                href={data.pdfLink}
                target="_blank"
              >
                <FileText className="w-4 h-4 mr-2" /> View Resume PDF
              </HoloButton>
              <HoloButton
                glowColor={data.glowColor}
                className="w-full flex items-center justify-center py-3.5 text-xs md:text-sm font-bold tracking-wide bg-transparent border-white/10"
                href={data.pdfLink}
                download
              >
                <Download className="w-4 h-4 mr-2" /> Download Resume PDF
              </HoloButton>
            </div>
          </div>

          {/* Right Panel: Scrollable details content */}
          <div className="w-full lg:w-8/12 space-y-8 lg:max-h-[700px] lg:overflow-y-auto pr-0 lg:pr-4 custom-scrollbar">
            
            {/* Education Block */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 flex items-center gap-2">
                <Award className="w-4 h-4 text-cyan" /> Education
              </h4>
              <div className="space-y-4">
                {data.education.map((edu, idx) => (
                  <div key={idx} className="bg-[#070c18]/50 border border-white/5 rounded-xl p-4 relative overflow-hidden">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1 mb-2">
                      <span className="text-white font-bold text-sm md:text-base font-display">{edu.institution}</span>
                      <span className="text-cyan font-sans text-xs shrink-0 font-semibold">{edu.period}</span>
                    </div>
                    <p className="text-gray-300 text-xs md:text-sm font-sans mb-2">{edu.degree}</p>
                    <div className="text-[10px] md:text-xs font-mono bg-white/5 border border-white/5 rounded px-2.5 py-1 w-fit text-emerald font-bold">
                      {edu.cgpa}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* VLSI Training (Only in VLSI track) */}
            {data.training && (
              <div className="space-y-4">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-cyan" /> Training & Industry Exposure
                </h4>
                {data.training.map((train, idx) => (
                  <div key={idx} className="bg-[#070c18]/50 border border-white/5 rounded-xl p-5 space-y-3">
                    <div>
                      <h5 className="text-white font-bold text-sm md:text-base font-display">{train.title}</h5>
                      <p className="text-cyan font-sans text-xs mt-0.5 font-semibold">{train.sub}</p>
                    </div>
                    <ul className="space-y-2 font-sans text-xs md:text-sm text-gray-400">
                      {train.bullets.map((b, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-cyan mt-1 shrink-0">•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Internship (Only in Software track) */}
            {data.internship && (
              <div className="space-y-4">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-emerald" /> Internship
                </h4>
                <div className="bg-[#070c18]/50 border border-white/5 rounded-xl p-5 space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="text-white font-bold text-sm md:text-base font-display">{data.internship.role}</h5>
                      <p className="text-emerald font-sans text-xs mt-0.5 font-semibold">{data.internship.company}</p>
                    </div>
                    <span className="text-gray-500 font-mono text-xs">{data.internship.period}</span>
                  </div>
                  <ul className="space-y-2 font-sans text-xs md:text-sm text-gray-400">
                    {data.internship.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-emerald mt-1 shrink-0">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Skills Accordion */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 flex items-center gap-2">
                <Code className="w-4 h-4 text-cyan" /> Tech Skills Matrix
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.skills.map((category, idx) => (
                  <div key={idx} className="bg-[#070c18]/50 border border-white/5 rounded-xl p-4 space-y-3">
                    <span className="text-white font-bold text-xs md:text-sm font-display block border-b border-white/5 pb-2">
                      {category.category}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {category.items.map((skill, i) => (
                        <span key={i} className={`text-[10px] md:text-xs font-sans px-2.5 py-0.5 rounded border ${
                          activeTab === "vlsi" 
                            ? "bg-cyan/5 border-cyan/15 text-cyan" 
                            : "bg-emerald/5 border-emerald/15 text-emerald"
                        }`}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects Console list */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan" /> Hardware & Software Projects
              </h4>
              <div className="space-y-4">
                {data.projects.map((proj, idx) => {
                  const isExpanded = expandedProject === idx;
                  return (
                    <div 
                      key={idx} 
                      className={`bg-[#070c18]/50 border rounded-xl overflow-hidden transition-all duration-300 ${
                        isExpanded 
                          ? (activeTab === "vlsi" ? "border-cyan/30 bg-[#0B1120]/80 shadow-md" : "border-emerald/30 bg-[#0B1120]/80 shadow-md")
                          : "border-white/5 hover:border-white/10"
                      }`}
                    >
                      <button 
                        onClick={() => toggleProject(idx)}
                        className="w-full p-4 flex items-center justify-between text-left gap-4"
                        data-hover="true"
                      >
                        <div>
                          <h5 className="text-white font-bold text-sm md:text-base font-display">{proj.title}</h5>
                          <span className="text-[10px] md:text-xs font-mono text-gray-400 mt-1 block uppercase tracking-wider">
                            {proj.subtitle}
                          </span>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-cyan shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-cyan shrink-0" />
                        )}
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="px-5 pb-5 pt-2 border-t border-white/5 font-sans text-xs md:text-sm text-gray-400 space-y-2 leading-relaxed">
                              {proj.bullets.map((b, i) => (
                                <div key={i} className="flex gap-2">
                                  <span className={`mt-1 shrink-0 font-bold ${activeTab === "vlsi" ? "text-cyan" : "text-emerald"}`}>•</span>
                                  <span>{b}</span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Certifications Accordion */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 flex items-center gap-2">
                <Award className="w-4 h-4 text-cyan" /> Certifications & Overview
              </h4>
              <div className="bg-[#070c18]/50 border border-white/5 rounded-xl p-5 space-y-3 font-sans text-xs md:text-sm">
                {data.certifications.map((cert, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-gray-300">
                    <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${
                      activeTab === "vlsi" ? "text-cyan" : "text-emerald"
                    }`} />
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements Console */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan" /> Achievements & Milestones
              </h4>
              <div className="bg-[#070c18]/50 border border-white/5 rounded-xl p-5 space-y-3 font-sans text-xs md:text-sm">
                {data.achievements.map((ach, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-gray-300">
                    <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${
                      activeTab === "vlsi" ? "text-cyan" : "text-emerald"
                    }`} />
                    <span>{ach}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
