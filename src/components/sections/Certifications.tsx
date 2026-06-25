"use client";

import { motion } from "framer-motion";
import { Award, CheckCircle, ExternalLink } from "lucide-react";

const certifications = [
  {
    title: "VLSI Physical Design with Timing Analysis",
    issuer: "NPTEL – IIT Roorkee",
    focus: ["Physical Design flow", "Static Timing Analysis (STA)", "Setup/Hold margin optimization", "Clock tree synthesis"],
    color: "from-blue-500/10 to-indigo-900/20 border-blue-500/20"
  },
  {
    title: "Digital Design with Verilog",
    issuer: "NPTEL – IIT Guwahati",
    focus: ["Verilog HDL syntax", "Behavioral & structural modeling", "Testbench generation", "FSM design"],
    color: "from-cyan-500/10 to-blue-900/20 border-cyan-500/20"
  },
  {
    title: "VLSI Design Flow: RTL to GDS",
    issuer: "NPTEL – IIIT Delhi",
    focus: ["RTL synthesis pathways", "Floorplanning & Placement", "Routing optimization", "DRC & LVS verification"],
    color: "from-purple-500/10 to-indigo-900/20 border-purple-500/20"
  },
  {
    title: "VLSI SoC Design Overview",
    issuer: "Maven Silicon",
    focus: ["SoC architecture structures", "IP core integration", "ASIC flows & workflows", "System verification"],
    color: "from-emerald-500/10 to-teal-900/20 border-emerald-500/20"
  }
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 relative bg-[#050816] overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black mb-4 text-white">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-primary">Certifications</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto font-sans text-sm md:text-base">
            Verified academic credentials and coursework certified by premier Indian technology institutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {certifications.map((cert, idx) => (
            <CertCard key={idx} cert={cert} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CertCard({ cert, index }: { cert: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className={`glass-panel p-6 md:p-8 rounded-2xl relative overflow-hidden bg-gradient-to-br ${cert.color} border group flex flex-col justify-between min-h-[260px]`}
    >
      {/* Decorative Ribbon Accent */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-cyan/15 to-transparent rounded-bl-full pointer-events-none group-hover:from-cyan/35 transition-colors duration-300" />
      
      <div>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="p-3 bg-black/40 rounded-xl border border-white/5 inline-block shrink-0 shadow-inner group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all">
            <Award className="w-6 h-6 text-cyan" />
          </div>
          <span className="text-[10px] font-mono font-bold tracking-widest text-cyan uppercase bg-[#050816] px-2.5 py-1 rounded border border-cyan/20 flex items-center gap-1.5 backdrop-blur-md">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" /> Verified
          </span>
        </div>

        <h3 className="text-xl font-bold text-white mb-1 font-display leading-tight">{cert.title}</h3>
        <p className="text-xs font-semibold text-cyan mb-4 font-sans">{cert.issuer}</p>
      </div>

      <div className="space-y-2 border-t border-white/5 pt-4">
        {cert.focus.map((item: string, i: number) => (
          <div key={i} className="flex items-center gap-2 text-xs md:text-sm text-gray-300 font-sans">
            <CheckCircle className="w-3.5 h-3.5 text-cyan shrink-0" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
