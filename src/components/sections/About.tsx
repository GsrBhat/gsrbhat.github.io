"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Cpu, Zap, Microchip, GraduationCap, Award } from "lucide-react";

export default function About() {
  const containerRef = useRef<HTMLElement>(null);

  const cards = [
    {
      title: "B.Tech in ECE",
      subtitle: "Anurag University, Hyderabad",
      desc: "2024 – Till Date. CGPA: 8.01. Immersed in VLSI design, semiconductor devices, and digital electronics.",
      icon: <GraduationCap className="w-6 h-6 text-primary" />
    },
    {
      title: "Diploma in ECE",
      subtitle: "JNGPT, Ramanthapur",
      desc: "2021 – 2024. CGPA: 9.17. Developed fundamental understanding of embedded systems, signals, and electrical circuits.",
      icon: <Award className="w-6 h-6 text-cyan" />
    },
    {
      title: "Samsung Fellowship",
      subtitle: "ISWDP Cohort 8 Fellow",
      desc: "Selected as Grade II Fellow among 4000+ applicants. Actively building expertise in semiconductor device simulations.",
      icon: <Microchip className="w-6 h-6 text-emerald" />
    },
    {
      title: "VLSI & RTL Ambitions",
      subtitle: "Hardware Design Engineering",
      desc: "Passionate about RTL coding, FPGA synthesis, physical design flows, and transistor-level CMOS architectures.",
      icon: <Cpu className="w-6 h-6 text-purple" />
    }
  ];

  return (
    <section id="about" ref={containerRef} className="py-20 relative bg-[#050816] overflow-hidden">
      
      <div className="container mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          
          {/* Left Text */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-black mb-6 text-white tracking-tight">
                Architecting the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan via-primary to-indigo">Microscopic</span>
              </h2>
              <p className="text-gray-400 text-sm md:text-base mb-6 leading-relaxed font-sans">
                I am a dedicated Electronics and Communication Engineering student with a deep fascination for the physical laws and design logic that govern modern microprocessors. My focus is centered on VLSI design, semiconductor devices, RTL coding, and hardware design.
              </p>
              <p className="text-gray-400 text-sm md:text-base mb-8 leading-relaxed font-sans">
                Through my selection in the Samsung ISWDP Fellowship, I am actively honing my skills in semiconductor technology, TCAD device simulations, and ASIC architectures. I strive to build hardware that is faster, more power-efficient, and structurally sound.
              </p>

              {/* Stats/Badges */}
              <div className="flex flex-wrap gap-3">
                {["RTL Design", "Semiconductor Physics", "FPGA Prototyping", "Samsung Fellow", "Static Timing Analysis"].map((badge, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-3.5 py-1.5 rounded bg-[#0b1120] border border-cyan/15 text-cyan text-xs font-semibold backdrop-blur-md font-sans"
                  >
                    {badge}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Cards */}
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan/10 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 relative z-10 w-full">
              {cards.map((card, i) => (
                <Card key={i} card={card} index={i} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function Card({ card, index }: { card: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="glass-panel p-6 rounded-xl relative overflow-hidden group bg-[#0B1120] border-white/5"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="mb-4 p-3 bg-white/5 rounded-lg inline-block shadow-[0_0_15px_rgba(6,182,212,0.1)] group-hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-shadow">
        {card.icon}
      </div>
      <h3 className="text-lg font-bold text-white mb-1 font-display leading-tight">{card.title}</h3>
      <h4 className="text-xs font-medium text-cyan mb-3 font-sans">{card.subtitle}</h4>
      <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-sans">{card.desc}</p>
      
      {/* Animated bottom border */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
    </motion.div>
  );
}

