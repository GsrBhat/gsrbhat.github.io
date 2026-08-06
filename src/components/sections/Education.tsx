"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, Award, BookOpen } from "lucide-react";

const educationHistory = [
  {
    institution: "Anurag University, Hyderabad",
    degree: "B.Tech in Electronics and Communication Engineering",
    duration: "2024 – Till Date",
    cgpa: "7.95",
    coursework: ["Digital Electronics", "Analog Electronics", "Signals & Systems", "Semiconductor Devices", "VLSI Design"],
    color: "from-purple/15 to-purple/5 border-purple/25"
  },
  {
    institution: "JNGPT, Ramanthapur",
    degree: "Diploma in Electronics and Communication Engineering",
    duration: "2021 – 2024",
    cgpa: "9.17",
    coursework: ["Core Electronics Fundamentals", "Microprocessors", "Circuit Theory", "Embedded Systems Basics"],
    color: "from-cyan/15 to-cyan/5 border-cyan/25"
  }
];

export default function Education() {
  return (
    <section id="education" className="py-20 relative bg-[#07070a] blueprint-grid">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black mb-4 text-white">
            Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-primary">Foundation</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto font-sans text-sm md:text-base">
            Structured educational pathways that shaped my analytical and design capabilities in hardware engineering.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto flex flex-col items-center">
          {/* Vertical central timeline line */}
          <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 md:-translate-x-1/2 rounded-full" />

          <div className="w-full space-y-12">
            {educationHistory.map((edu, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className={`relative flex flex-col md:flex-row items-start md:items-center ${isEven ? "md:flex-row-reverse" : ""}`}>
                  
                  {/* Timeline indicator node */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, damping: 10, delay: idx * 0.1 }}
                    className="absolute left-[24px] md:left-1/2 w-8 h-8 rounded-full bg-[#050816] border-2 border-cyan flex items-center justify-center -translate-x-1/2 z-20 shadow-[0_0_15px_rgba(6,182,212,0.6)]"
                  >
                    <GraduationCap className="w-4 h-4 text-cyan" />
                  </motion.div>

                  {/* Spacer or padding to push content away from center */}
                  <div className="hidden md:block w-1/2" />

                  {/* Card content wrapper */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                      whileHover={{ y: -4 }}
                      className={`glass-panel p-6 md:p-8 rounded-2xl bg-gradient-to-br ${edu.color} border relative overflow-hidden`}
                    >
                      <span className="flex items-center gap-2 text-cyan font-sans text-xs md:text-sm font-semibold mb-2">
                        <Calendar className="w-4 h-4" /> {edu.duration}
                      </span>
                      <h3 className="text-xl font-bold text-white mb-2 font-display leading-tight">{edu.degree}</h3>
                      <h4 className="text-sm font-semibold text-gray-300 font-sans mb-4">{edu.institution}</h4>
                      
                      <div className="flex items-center gap-2 text-xs md:text-sm bg-white/5 border border-white/5 rounded-lg px-3 py-2 w-fit mb-6 text-[#e8eaf0] font-sans">
                        <Award className="w-4 h-4 text-emerald" />
                        <span>CGPA: <strong className="text-emerald text-sm font-display">{edu.cgpa}</strong></span>
                      </div>

                      <div className="border-t border-white/5 pt-4">
                        <span className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-3 font-sans">
                          <BookOpen className="w-3.5 h-3.5 text-cyan" /> Relevant Coursework:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {edu.coursework.map((course, i) => (
                            <span key={i} className="text-[10px] md:text-xs font-sans px-2.5 py-1 bg-white/5 border border-white/5 text-gray-300 rounded-md">
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
