"use client";

import { Code, User, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#050810] border-t border-white/10 py-10 relative overflow-hidden">
      {/* Top subtle glow line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Logo & Socials */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <a href="#hero" className="text-2xl font-black tracking-tighter text-white relative group" data-hover="true">
            SAI
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary blur-lg opacity-30 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
          <div className="flex gap-4">
            <a href="https://github.com/GsrBhat" target="_blank" className="text-gray-400 hover:text-primary transition-colors hover:scale-110 transform" data-hover="true">
              <Code className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/sairahulbhatg/" target="_blank" className="text-gray-400 hover:text-primary transition-colors hover:scale-110 transform" data-hover="true">
              <User className="w-5 h-5" />
            </a>
            <a href="mailto:gsrbhat20@gmail.com" className="text-gray-400 hover:text-primary transition-colors hover:scale-110 transform" data-hover="true">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Center: Copyright */}
        <div className="text-gray-500 text-sm text-center">
          © 2026 G. Sai Rahul Bhat. All rights reserved.
        </div>

        {/* Right: Tech Stack */}
        <div className="text-gray-500 text-sm font-mono text-center md:text-right">
          Built with <span className="text-primary/80">Next.js</span>, <span className="text-primary/80">Framer Motion</span> & <span className="text-primary/80">Three.js</span>
        </div>
      </div>
    </footer>
  );
}
