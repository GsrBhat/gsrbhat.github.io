"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, Terminal } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="py-20 bg-[#07070a] relative overflow-hidden blueprint-grid">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-4xl relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black mb-4 text-white">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-primary">Journey</span>
          </h2>
          <p className="text-gray-400 font-sans text-sm md:text-base">
            My industry internship work and practical application logs.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline node */}
          <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 md:-translate-x-1/2" />
          
          <div className="relative flex flex-col md:flex-row items-start md:items-center">
            
            {/* Timeline icon indicator */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="absolute left-[24px] md:left-1/2 w-8 h-8 rounded-full bg-[#07070a] border-2 border-cyan flex items-center justify-center -translate-x-1/2 z-20 shadow-[0_0_15px_rgba(16,185,129,0.6)]"
            >
              <Briefcase className="w-4 h-4 text-cyan" />
            </motion.div>

            {/* Spacer */}
            <div className="hidden md:block w-1/2" />

            {/* Content card */}
            <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                whileHover={{ y: -4 }}
                className="glass-panel p-6 md:p-8 rounded-2xl bg-[#0f0f15] border border-cyan/20 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-cyan to-primary" />
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                  <span className="flex items-center gap-2 text-cyan font-sans text-xs font-semibold">
                    <Calendar className="w-3.5 h-3.5" /> 1 Month
                  </span>
                  <span className="flex items-center gap-1 text-gray-500 font-sans text-xs">
                    <MapPin className="w-3.5 h-3.5" /> Remote
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-1 font-display">Python Intern</h3>
                <h4 className="text-sm font-semibold text-gray-300 mb-6 font-sans">Vault of Codes</h4>
                
                <div className="space-y-4 border-t border-white/5 pt-4">
                  <div className="flex items-start gap-3">
                    <Terminal className="w-4 h-4 text-cyan shrink-0 mt-1" />
                    <p className="text-gray-300 font-sans text-sm leading-relaxed">
                      Worked extensively on Python programming fundamentals and logic-based problem solving structures.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Terminal className="w-4 h-4 text-cyan shrink-0 mt-1" />
                    <p className="text-gray-300 font-sans text-sm leading-relaxed">
                      Developed basic automation scripts and expanded programming proficiency through practical coding assignments.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {["Python", "Logic Building", "Scripting Automation", "Algorithms"].map((tag, idx) => (
                    <span key={idx} className="text-[10px] md:text-xs font-sans px-2 py-0.5 bg-white/5 border border-white/5 text-cyan rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );
}
