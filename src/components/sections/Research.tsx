"use client";

import { motion } from "framer-motion";
import { Cpu, Activity, Zap, Layers, Server, Shield } from "lucide-react";

const interests = [
  {
    title: "Physical Design & Backend VLSI",
    icon: <Layers className="w-6 h-6" />,
    desc: "Translating gate-level netlists into physical layouts, focusing on floorplanning, placement, routing, and GDSII generation.",
  },
  {
    title: "Static Timing Analysis (STA)",
    icon: <Activity className="w-6 h-6" />,
    desc: "Ensuring timing closure across PVT corners, analyzing setup/hold constraints, and optimizing critical paths.",
  },
  {
    title: "RISC-V Processor Design",
    icon: <Cpu className="w-6 h-6" />,
    desc: "Architecting custom, open-source ISA processors, focusing on pipelining, hazard resolution, and instruction decoding.",
  },
  {
    title: "FPGA Hardware Acceleration",
    icon: <Server className="w-6 h-6" />,
    desc: "Offloading intensive compute tasks to programmable logic for massive parallelization and high-throughput processing.",
  },
  {
    title: "DSP Hardware Architectures",
    icon: <Shield className="w-6 h-6" />,
    desc: "Designing dedicated hardware blocks for signal filtering, Fourier transforms, and mathematical synthesis.",
  },
  {
    title: "Low-Power Digital IC Design",
    icon: <Zap className="w-6 h-6" />,
    desc: "Implementing clock gating, power gating, and dynamic voltage scaling to optimize energy efficiency in modern ASICs.",
  }
];

export default function Research() {
  return (
    <section id="research" className="py-24 relative overflow-hidden bg-[#030305]">
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Research <span className="text-primary">Vectors</span></h2>
          <p className="text-gray-400">Core areas of deep technical exploration and focus.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interests.map((item, index) => (
            <ResearchCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ResearchCard({ item, index }: { item: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="glass-panel p-6 rounded-2xl relative overflow-hidden group border border-white/10 bg-black/50"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full transition-colors duration-500 group-hover:bg-primary/20 pointer-events-none" />
      
      <div className="text-primary mb-4 p-3 bg-white/5 rounded-xl inline-block shadow-inner group-hover:shadow-[0_0_15px_rgba(0,210,255,0.3)] transition-all">
        {item.icon}
      </div>
      
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent transition-all duration-300">
        {item.title}
      </h3>
      
      <p className="text-gray-400 text-sm leading-relaxed">
        {item.desc}
      </p>

      {/* Animated corner borders */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary/0 group-hover:border-primary/100 transition-all duration-300 rounded-tl-xl" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary/0 group-hover:border-primary/100 transition-all duration-300 rounded-br-xl" />
    </motion.div>
  );
}
