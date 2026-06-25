"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X, Download } from "lucide-react";

const links = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Education", href: "#education" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Certifications", href: "#certifications" },
  { name: "Achievements", href: "#achievements" },
  { name: "Resume", href: "#resume" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b backdrop-blur-md",
        scrolled 
          ? "bg-[#050816]/90 border-[#3B82F6]/20 py-3 shadow-[0_4px_30px_rgba(59,130,246,0.05)]" 
          : "bg-transparent border-transparent py-5"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-between">
        
        {/* Logo */}
        <a href="#hero" className="relative group z-50 block" data-hover="true">
          <span className="text-xl md:text-2xl font-black tracking-tighter text-white font-display">
            SAI<span className="text-cyan">.</span>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-cyan to-indigo blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-6">
          {links.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              className="text-xs lg:text-sm font-medium text-gray-400 hover:text-cyan transition-colors relative group font-sans tracking-wide"
              data-hover="true"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 * i }}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan to-primary transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:block z-50">
          <a 
            href="/resume.pdf" 
            download 
            target="_blank"
            data-hover="true"
            className="px-4 py-2 text-xs font-semibold rounded border border-cyan/40 text-cyan hover:bg-cyan/10 hover:text-white hover:border-cyan shadow-[0_0_10px_rgba(6,182,212,0.15)] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 relative overflow-hidden group inline-block font-sans"
          >
            <span className="relative z-10 transition-colors duration-300">Download Resume</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="xl:hidden z-50 relative text-white p-2 hover:text-cyan transition-colors" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-hover="true"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-[#050816]/95 border-l border-white/5 backdrop-blur-2xl z-40 flex flex-col p-8 pt-24 gap-6"
            >
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-gray-300 hover:text-cyan transition-colors font-display"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="/resume.pdf" 
                download 
                target="_blank"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 px-6 py-3 text-sm font-semibold rounded border border-cyan/40 text-cyan text-center hover:bg-cyan/10 transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" /> Download Resume
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

