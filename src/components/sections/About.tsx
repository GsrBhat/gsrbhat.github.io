"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Cpu, Zap, Microchip, Binary, GraduationCap, Award } from "lucide-react";

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  const cards = [
    {
      title: "B.Tech in ECE",
      subtitle: "Anurag University",
      desc: "CGPA: 8.01. Focused on VLSI Design, Digital Electronics, and FPGA Prototyping.",
      icon: <GraduationCap className="w-8 h-8 text-primary" />
    },
    {
      title: "Diploma in ECE",
      subtitle: "JNGPT Ramanthapur",
      desc: "CGPA: 9.17. Built a strong foundation in embedded systems and core electronics.",
      icon: <Award className="w-8 h-8 text-secondary" />
    },
    {
      title: "SSC",
      subtitle: "High School",
      desc: "CGPA: 10.0. Early dedication to academic excellence and mathematics.",
      icon: <Award className="w-8 h-8 text-accent" />
    },
    {
      title: "Semiconductor Ambitions",
      subtitle: "Elite Roles",
      desc: "My ultimate goal is to architect next-generation chips at NVIDIA, Qualcomm, Intel, or AMD.",
      icon: <Microchip className="w-8 h-8 text-primary" />
    }
  ];

  return (
    <section id="about" ref={containerRef} className="py-32 relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Text */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
                Architecting the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Microscopic</span>
              </h2>
              <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                I am an Electronics and Communication Engineering student at Anurag University, Hyderabad, with a strong passion for VLSI Design, RTL Development, FPGA Prototyping, Physical Design, Static Timing Analysis (STA), and RISC-V Processor Architecture.
              </p>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                I bridge the gap between complex algorithms and physical silicon, bringing intelligent hardware to life. My journey traverses through embedded systems, signal processing algorithms, and deep into the realm of ASIC RTL-to-GDS flow.
              </p>

              {/* Stats/Badges */}
              <div className="flex flex-wrap gap-4">
                {["Strong Academic Consistency", "RTL Design Skills", "FPGA Prototyping", "Signal Processing", "Backend VLSI Interest"].map((badge, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="px-4 py-2 rounded-md bg-white/5 border border-white/10 text-primary text-xs md:text-sm font-medium backdrop-blur-md"
                  >
                    {badge}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Cards */}
          <div className="w-full lg:w-1/2 relative h-[600px] flex justify-center items-center">
            {/* Background glowing orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 w-full">
              <motion.div style={{ y: y1 }} className="flex flex-col gap-6">
                {cards.slice(0, 2).map((card, i) => (
                  <Card key={i} card={card} />
                ))}
              </motion.div>
              <motion.div style={{ y: y2 }} className="flex flex-col gap-6 md:mt-16">
                {cards.slice(2, 4).map((card, i) => (
                  <Card key={i} card={card} />
                ))}
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function Card({ card }: { card: any }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="glass-panel p-6 rounded-xl relative overflow-hidden group border border-white/5 bg-black/40"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="mb-4 p-3 bg-white/5 rounded-lg inline-block shadow-[0_0_15px_rgba(0,210,255,0.1)] group-hover:shadow-[0_0_20px_rgba(0,210,255,0.3)] transition-shadow">
        {card.icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-1">{card.title}</h3>
      <h4 className="text-sm font-medium text-primary mb-3">{card.subtitle}</h4>
      <p className="text-gray-400 text-sm leading-relaxed">{card.desc}</p>
      
      {/* Animated bottom border */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-full group-hover:translate-y-0" />
    </motion.div>
  );
}
