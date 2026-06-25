"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Terminal, Shield, Wrench, Languages, Layers } from "lucide-react";

type Skill = {
  name: string;
  level: number;
};

type SkillGroup = {
  category: string;
  icon: React.ReactNode;
  color: string;
  skills: Skill[];
};

const skillGroups: SkillGroup[] = [
  {
    category: "VLSI & Semiconductor",
    icon: <Cpu className="w-5 h-5" />,
    color: "text-blue-400 border-blue-500/30 shadow-blue-500/10",
    skills: [
      { name: "RTL Design", level: 95 },
      { name: "CMOS Fundamentals", level: 90 },
      { name: "ASIC Design Flow", level: 85 },
      { name: "Static Timing Analysis (STA)", level: 80 },
      { name: "Physical Design Fundamentals", level: 80 },
      { name: "VLSI Design", level: 90 }
    ]
  },
  {
    category: "HDL & Programming",
    icon: <Terminal className="w-5 h-5" />,
    color: "text-cyan-400 border-cyan-500/30 shadow-cyan-500/10",
    skills: [
      { name: "Verilog HDL", level: 95 },
      { name: "Python", level: 85 },
      { name: "C (Basics)", level: 75 }
    ]
  },
  {
    category: "Electronics Core",
    icon: <Layers className="w-5 h-5" />,
    color: "text-indigo-400 border-indigo-500/30 shadow-indigo-500/10",
    skills: [
      { name: "Digital Electronics", level: 95 },
      { name: "Analog Electronics", level: 80 },
      { name: "Signals & Systems", level: 85 },
      { name: "Semiconductor Devices", level: 90 }
    ]
  },
  {
    category: "Hardware Tools",
    icon: <Wrench className="w-5 h-5" />,
    color: "text-purple-400 border-purple-500/30 shadow-purple-500/10",
    skills: [
      { name: "Xilinx Vivado", level: 95 },
      { name: "Cadence Virtuoso", level: 80 },
      { name: "Synopsys Sentaurus TCAD", level: 75 },
      { name: "MATLAB", level: 85 },
      { name: "Cisco Packet Tracer", level: 80 }
    ]
  },
  {
    category: "Networking & Security",
    icon: <Shield className="w-5 h-5" />,
    color: "text-emerald-400 border-emerald-500/30 shadow-emerald-500/10",
    skills: [
      { name: "TCP/IP & Routing", level: 80 },
      { name: "VLAN Fundamentals", level: 80 },
      { name: "Switching", level: 75 },
      { name: "Network Security Basics", level: 75 }
    ]
  },
  {
    category: "Languages Spoken",
    icon: <Languages className="w-5 h-5" />,
    color: "text-yellow-400 border-yellow-500/30 shadow-yellow-500/10",
    skills: [
      { name: "English", level: 95 },
      { name: "Telugu", level: 90 },
      { name: "Hindi", level: 85 }
    ]
  }
];

export default function Skills() {
  const [activeGroup, setActiveGroup] = useState<number>(0);

  return (
    <section id="skills" className="py-20 relative bg-[#050816] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan/30 to-transparent" />
      
      <div className="container mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black mb-4 text-white">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan via-primary to-indigo">Arsenal</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto font-sans text-sm md:text-base">
            Hardware descriptions, tools, and protocols cataloged as hardware modules.
          </p>
        </motion.div>

        {/* Tab Headers */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {skillGroups.map((group, idx) => (
            <button
              key={idx}
              onClick={() => setActiveGroup(idx)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-xs md:text-sm font-semibold transition-all duration-300 font-display ${
                activeGroup === idx
                  ? "bg-cyan/10 border-cyan text-cyan shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                  : "bg-[#0b1120] border-white/5 text-gray-400 hover:text-white hover:border-white/10"
              }`}
            >
              {group.icon}
              {group.category}
            </button>
          ))}
        </div>

        {/* Active Group Skills Grid */}
        <motion.div
          key={activeGroup}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {skillGroups[activeGroup].skills.map((skill, index) => (
            <SkillNode key={skill.name} skill={skill} index={index} colorClass={skillGroups[activeGroup].color} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}

function SkillNode({ skill, index, colorClass }: { skill: Skill; index: number; colorClass: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`glass-panel p-6 rounded-xl bg-[#0B1120] border relative overflow-hidden flex flex-col justify-between ${colorClass}`}
    >
      <div className="flex items-center justify-between mb-4 relative z-10">
        <span className="text-white font-bold text-base md:text-lg font-display tracking-tight">{skill.name}</span>
        <span className="text-xs font-mono font-bold opacity-80">{skill.level}%</span>
      </div>

      <div className="relative h-2 w-full bg-white/5 rounded-full overflow-hidden z-10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 1.2, ease: "easeOut", delay: index * 0.05 }}
          className="h-full bg-gradient-to-r from-cyan to-primary rounded-full relative"
        >
          {hovered && (
            <motion.div
              layoutId="glowingbar"
              className="absolute top-0 bottom-0 right-0 w-8 bg-white/40 blur-[3px]"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1 }}
            />
          )}
        </motion.div>
      </div>

      {/* Floating electrons background trace */}
      {hovered && (
        <div className="absolute inset-0 bg-gradient-to-r from-cyan/5 to-transparent pointer-events-none transition-all duration-300" />
      )}
    </motion.div>
  );
}
