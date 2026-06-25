"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Trophy, Medal, Cpu, Award } from "lucide-react";

type Milestone = {
  title: string;
  metric: string;
  metricLabel: string;
  maxVal: number;
  desc: string;
  icon: React.ReactNode;
  color: string;
};

const milestones: Milestone[] = [
  {
    title: "Samsung ISWDP Fellowship",
    metric: "4000+",
    metricLabel: "Applicants",
    maxVal: 4000,
    desc: "Selected for Samsung Fellowship - ISWDP Cohort 8 (Grade II) among 4000+ applicants. Developing device simulation & RTL expertise.",
    icon: <Trophy className="w-8 h-8 text-yellow-400" />,
    color: "from-yellow-500/10 to-amber-900/20 border-yellow-500/20"
  },
  {
    title: "India Semiconductor Workforce Program",
    metric: "ISWDP",
    metricLabel: "Synopsys TCAD",
    maxVal: 1,
    desc: "Selected for India Semiconductor Workforce Development Program (ISWDP), focused on semiconductor technology, physical design rules, and Synopsys TCAD training.",
    icon: <Cpu className="w-8 h-8 text-cyan-400" />,
    color: "from-cyan-500/10 to-indigo-900/20 border-cyan-500/20"
  }
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-20 relative bg-[#050816] blueprint-grid">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black mb-4 text-white">
            Honorable <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-primary">Milestones</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto font-sans text-sm md:text-base">
            Elite recognitions and national fellowships in semiconductor technology and workforce programs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {milestones.map((item, idx) => (
            <MilestoneCard key={idx} item={item} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}

function MilestoneCard({ item, index }: { item: Milestone; index: number }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || item.maxVal <= 1) return;
    
    let start = 0;
    const duration = 2000; // ms
    const increment = Math.ceil(item.maxVal / 50);
    const timer = setInterval(() => {
      start += increment;
      if (start >= item.maxVal) {
        setCount(item.maxVal);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, duration / 50);

    return () => clearInterval(timer);
  }, [isInView, item.maxVal]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -6 }}
      className={`glass-panel p-6 md:p-8 rounded-2xl bg-gradient-to-br ${item.color} border flex flex-col justify-between min-h-[300px] relative overflow-hidden group`}
    >
      <div className="absolute top-4 right-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
        {item.icon}
      </div>

      <div className="flex items-start gap-4 mb-6">
        <div className="p-3 bg-black/40 rounded-xl border border-white/5 inline-block shrink-0 shadow-inner group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all">
          {item.icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-1 font-display leading-tight">{item.title}</h3>
          <p className="text-xs font-semibold text-cyan font-sans uppercase tracking-wider">System Milestone Approved</p>
        </div>
      </div>

      <div className="mb-6 flex items-baseline gap-2">
        <span className="text-4xl md:text-5xl font-black text-white tracking-tighter font-display">
          {item.maxVal > 1 ? `${count}+` : item.metric}
        </span>
        <span className="text-xs font-semibold text-gray-400 font-sans tracking-wide">
          {item.metricLabel}
        </span>
      </div>

      <p className="text-gray-400 font-sans text-xs md:text-sm leading-relaxed border-t border-white/5 pt-4">
        {item.desc}
      </p>
    </motion.div>
  );
}
