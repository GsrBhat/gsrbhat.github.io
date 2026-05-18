"use client";

import { motion } from "framer-motion";
import { BadgeCheck, ExternalLink } from "lucide-react";

const certifications = [
  {
    title: "Digital Design with Verilog HDL",
    issuer: "NPTEL – IIT Guwahati",
    focus: ["RTL modelling", "Behavioral simulation", "Digital verification", "Verilog HDL"],
    color: "from-blue-500/20 to-blue-900/20"
  },
  {
    title: "VLSI RTL to GDS Flow",
    issuer: "NPTEL – IIIT Delhi",
    focus: ["RTL synthesis", "Floorplanning", "Place and Route", "Clock Tree Synthesis", "GDSII flow"],
    color: "from-purple-500/20 to-purple-900/20"
  },
  {
    title: "VLSI SoC Overview & Digital Design",
    issuer: "Maven Silicon",
    focus: ["Industry-oriented VLSI program", "SoC architecture exposure", "Semiconductor workflows"],
    color: "from-cyan-500/20 to-cyan-900/20"
  },
  {
    title: "VLSI Physical Design with Timing Analysis",
    issuer: "NPTEL – IIT Roorkee (Jan–Apr 2026)",
    focus: ["Physical Design", "Timing Analysis", "STA", "Backend VLSI concepts"],
    color: "from-emerald-500/20 to-emerald-900/20"
  }
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Verified <span className="text-primary">Excellence</span></h2>
          <p className="text-gray-400">Professional certifications backing my semiconductor knowledge.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {certifications.map((cert, index) => (
            <CertCard key={index} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CertCard({ cert, index }: { cert: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className={`glass-panel p-8 rounded-2xl relative overflow-hidden group bg-gradient-to-br ${cert.color} border-white/5`}
    >
      <div className="absolute top-4 right-4 text-primary opacity-50 group-hover:opacity-100 transition-opacity">
        <ExternalLink className="w-5 h-5" />
      </div>
      
      <div className="flex items-start gap-4 mb-6">
        <div className="p-3 bg-black/40 rounded-xl border border-white/10 shrink-0 relative">
          <BadgeCheck className="w-8 h-8 text-primary relative z-10" />
          <div className="absolute inset-0 bg-primary/20 blur-md rounded-xl" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-1 leading-tight">{cert.title}</h3>
          <p className="text-sm font-medium text-primary/80">{cert.issuer}</p>
        </div>
      </div>

      <div className="space-y-2 mt-4">
        {cert.focus.map((item: string, i: number) => (
          <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
            {item}
          </div>
        ))}
      </div>

      {/* Verified Badge Hover State */}
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-xs font-bold tracking-widest text-primary uppercase bg-black/50 px-3 py-1.5 rounded-full border border-primary/30 backdrop-blur-md">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        Verified
      </div>
    </motion.div>
  );
}
