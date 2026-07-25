"use client";

import { motion } from "framer-motion";
import { Code, User, Mail, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#07070a] border-t border-white/5 py-10 relative overflow-hidden">
      
      {/* Dynamic line glow */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan/30 to-transparent" />
      
      <div className="container mx-auto px-4 md:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        
        {/* Left: Animated Initials Chip */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <a href="#hero" className="relative group block" data-hover="true">
            <div className="border border-cyan/40 px-3 py-1 bg-cyan/5 rounded font-black font-display text-white text-lg tracking-wider flex items-center gap-1.5 shadow-[0_0_10px_rgba(16,185,129,0.1)] group-hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all">
              <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
              SRB<span className="text-cyan">.</span>IO
            </div>
          </a>
          
          <div className="flex gap-4">
            <a href="https://github.com/GsrBhat" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cyan transition-colors hover:scale-110 transform" data-hover="true">
              <Code className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/sairahulbhatg/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cyan transition-colors hover:scale-110 transform" data-hover="true">
              <User className="w-5 h-5" />
            </a>
            <a href="mailto:gsrbhat20@gmail.com" className="text-gray-400 hover:text-cyan transition-colors hover:scale-110 transform" data-hover="true">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Center: Copyright */}
        <div className="text-gray-500 text-xs md:text-sm text-center font-sans">
          © 2026 Sai Rahul Bhat Gaadhi Raju. All rights reserved.
        </div>

        {/* Right: Back to top & Tech info */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <div className="text-gray-500 text-[10px] md:text-xs font-mono">
            Specs: <span className="text-cyan">Next.js 16</span> | <span className="text-cyan">Framer Motion</span> | <span className="text-cyan">Three.js</span>
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="p-2.5 rounded-lg bg-white/5 hover:bg-cyan/10 border border-white/5 hover:border-cyan/30 text-gray-400 hover:text-cyan transition-colors flex items-center gap-1.5 text-xs font-semibold font-sans shadow-md"
            title="Rocket Back to Top"
            data-hover="true"
          >
            Back to Top <ArrowUp className="w-3.5 h-3.5" />
          </motion.button>
        </div>

      </div>
    </footer>
  );
}
