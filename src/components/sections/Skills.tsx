"use client";

import { motion } from "framer-motion";

const skills = [
  { name: "Verilog HDL", level: 95 },
  { name: "RTL Design", level: 90 },
  { name: "FPGA Design", level: 85 },
  { name: "Xilinx Vivado", level: 90 },
  { name: "Cadence Virtuoso", level: 75 },
  { name: "MATLAB", level: 90 },
  { name: "Signal Processing", level: 85 },
  { name: "Physical Design", level: 70 },
  { name: "Static Timing Analysis", level: 75 },
  { name: "RISC-V Architecture", level: 80 },
  { name: "Digital Electronics", level: 95 },
  { name: "Embedded Systems", level: 80 },
  { name: "Python", level: 85 },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Technical Arsenal</h2>
          <p className="text-gray-400">The tools and concepts I use to build the future of intelligent hardware.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({ skill, index }: { skill: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 4) * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      className="glass-panel p-5 rounded-xl group relative overflow-hidden border border-white/5 bg-black/30"
    >
      <div className="absolute -right-10 -top-10 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/30 transition-colors duration-500" />
      
      <h3 className="text-lg font-semibold text-white mb-3 relative z-10">{skill.name}</h3>
      
      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden relative z-10">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.2 + (index % 4) * 0.1, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-primary to-accent relative"
        >
          <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/50 blur-[2px] animate-pulse" />
        </motion.div>
      </div>
    </motion.div>
  );
}
