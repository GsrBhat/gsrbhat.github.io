"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const experiences = [
  {
    year: "Recent",
    title: "Python Internship",
    role: "Vault of Codes",
    desc: "Gained hands-on experience in Python development, strengthening software fundamentals critical for hardware-software co-design and scripting in VLSI workflows.",
  },
  {
    year: "Ongoing",
    title: "Self-Directed HDL Development",
    role: "Independent Researcher",
    desc: "Continuously designing and verifying complex RTL architectures using Verilog and SystemVerilog, focusing on pipelined processor designs and arithmetic logic units.",
  },
  {
    year: "Ongoing",
    title: "FPGA & RTL Learning Journey",
    role: "Hardware Prototyping",
    desc: "Mastering Xilinx Vivado for synthesis, implementation, and bitstream generation. Bridging the gap between simulation and real-world silicon behavior.",
  }
];

export default function Experience() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" ref={containerRef} className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Trajectory</h2>
          <p className="text-gray-400">My professional and academic path in the semiconductor space.</p>
        </motion.div>

        <div className="relative">
          {/* Background Line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-1 bg-white/5 md:-translate-x-1/2 rounded-full" />
          
          {/* Animated Line */}
          <motion.div 
            className="absolute left-[20px] md:left-1/2 top-0 w-1 bg-gradient-to-b from-primary via-accent to-secondary md:-translate-x-1/2 rounded-full z-10 shadow-[0_0_10px_rgba(0,210,255,0.5)]"
            style={{ height: lineHeight }}
          />

          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <TimelineItem key={index} experience={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ experience, index }: { experience: any, index: number }) {
  const isEven = index % 2 === 0;

  return (
    <div className={`relative flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}>
      
      {/* Node indicator */}
      <motion.div 
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        className="absolute left-[20px] md:left-1/2 w-4 h-4 rounded-full bg-black border-2 border-primary -translate-x-[7px] md:-translate-x-1/2 z-20 shadow-[0_0_10px_rgba(0,210,255,0.8)] mt-2 md:mt-0"
      />

      {/* Content */}
      <div className={`ml-12 md:ml-0 md:w-1/2 ${isEven ? 'md:pl-12' : 'md:pr-12'}`}>
        <motion.div
          initial={{ opacity: 0, x: isEven ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
          className="glass-panel p-6 rounded-xl relative group"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <span className="text-primary font-mono text-sm mb-2 block">{experience.year}</span>
          <h3 className="text-2xl font-bold text-white mb-1">{experience.title}</h3>
          <h4 className="text-gray-300 font-medium mb-4">{experience.role}</h4>
          <p className="text-gray-400 leading-relaxed text-sm">
            {experience.desc}
          </p>
        </motion.div>
      </div>

    </div>
  );
}
