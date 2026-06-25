"use client";

import { motion } from "framer-motion";
import { Download, FileText, CheckCircle, Cpu, Mail, Phone, MapPin } from "lucide-react";
import HoloButton from "../ui/HoloButton";

export default function Resume() {
  return (
    <section id="resume" className="py-20 relative bg-[#050816] overflow-hidden">
      <div className="absolute inset-0 bg-[#050816] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black mb-4 text-white">
            Resume <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-primary">Console</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto font-sans text-sm md:text-base">
            Access and download my full professional specifications sheet directly in PDF format.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto glass-panel p-6 md:p-10 rounded-2xl bg-[#0B1120] border-cyan/20 relative overflow-hidden flex flex-col md:flex-row gap-8 items-center">
          
          {/* Decorative PCB Grid Background */}
          <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-cyan to-primary" />

          {/* Left panel: Stylized Resume Sheet Preview Mockup */}
          <div className="w-full md:w-1/2 relative bg-[#070c18] border border-white/5 rounded-xl p-6 shadow-inner flex flex-col justify-between min-h-[420px]">
            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                <div>
                  <h3 className="text-sm font-bold text-white font-display">SAI RAHUL BHAT G. R.</h3>
                  <p className="text-[10px] font-mono text-cyan uppercase tracking-wider">VLSI & RTL Engineer</p>
                </div>
                <FileText className="w-6 h-6 text-cyan opacity-80" />
              </div>

              {/* Mock Resume Content Blocks */}
              <div className="space-y-4 font-sans">
                <div>
                  <div className="text-[10px] font-semibold text-cyan font-mono uppercase tracking-wider mb-1">Career Objective</div>
                  <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-3">
                    ECE student passionate about VLSI Design, Semiconductor Technology, RTL Design, and Digital Systems. Selected for Samsung ISWDP Cohort 8 Fellowship.
                  </p>
                </div>

                <div>
                  <div className="text-[10px] font-semibold text-cyan font-mono uppercase tracking-wider mb-1">Education</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-white">
                      <span>B.Tech in ECE (Anurag University)</span>
                      <span className="text-gray-500">CGPA: 8.01</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-white">
                      <span>Diploma in ECE (JNGPT)</span>
                      <span className="text-gray-500">CGPA: 9.17</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-semibold text-cyan font-mono uppercase tracking-wider mb-1">Certifications</div>
                  <div className="grid grid-cols-2 gap-1.5 text-[10px] text-gray-400">
                    <div className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-cyan shrink-0" /> IIT Roorkee</div>
                    <div className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-cyan shrink-0" /> IIT Guwahati</div>
                    <div className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-cyan shrink-0" /> IIIT Delhi</div>
                    <div className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-cyan shrink-0" /> Maven Silicon</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/5 pt-4 mt-6 flex flex-wrap gap-2 text-[10px] text-gray-500 font-mono">
              <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> gsrbhat20@gmail.com</span>
              <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> +91-7989035770</span>
            </div>
          </div>

          {/* Right panel: Download Call to Action */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="mb-6 p-4 bg-cyan/5 border border-cyan/20 rounded-2xl inline-block shadow-[0_0_15px_rgba(6,182,212,0.1)]">
              <Cpu className="w-10 h-10 text-cyan animate-pulse" />
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-3 font-display">Hardware Specifications</h3>
            <p className="text-gray-400 font-sans text-xs md:text-sm leading-relaxed mb-8">
              Download the comprehensive PDF containing complete project logs, academic scores, tool qualifications, and fellowship achievements ready for hiring managers and recruiters.
            </p>

            <HoloButton
              glowColor="primary"
              className="w-full flex items-center justify-center py-4 text-base text-cyan border-cyan/30"
              href="/resume.pdf"
              target="_blank"
            >
              <Download className="w-5 h-5 mr-2" /> View Resume PDF
            </HoloButton>
          </div>

        </div>

      </div>
    </section>
  );
}
