"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const links = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Certifications", href: "#certifications" },
  { name: "Experience", href: "#experience" },
  { name: "Research", href: "#research" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b",
        scrolled 
          ? "bg-[#0A0F1C]/80 backdrop-blur-md border-primary/30 shadow-[0_0_15px_rgba(0,229,255,0.15)] py-4" 
          : "bg-transparent border-transparent py-6"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo */}
        <a href="#hero" className="relative group z-50 block w-16" data-hover="true">
          <span className="text-2xl font-black tracking-tighter text-white relative z-10">SAI</span>
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-8">
          {links.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-300 hover:text-primary transition-colors relative group"
              data-hover="true"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary blur-[2px] transition-all duration-300 group-hover:w-full" />
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
            className="px-5 py-2 text-sm font-semibold rounded border border-primary/50 text-primary hover:bg-primary/10 hover:text-white hover:border-primary shadow-[0_0_10px_rgba(0,229,255,0.2)] hover:shadow-[0_0_20px_rgba(0,229,255,0.6)] transition-all duration-300 relative overflow-hidden group inline-block"
          >
            <span className="relative z-10 transition-colors duration-300">Download Resume</span>
            <div className="absolute inset-0 bg-primary/20 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden z-50 relative text-white" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-hover="true"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={cn("w-full h-0.5 bg-current transition-all", mobileMenuOpen ? "rotate-45 translate-y-2.5" : "")} />
            <span className={cn("w-full h-0.5 bg-current transition-all", mobileMenuOpen ? "opacity-0" : "")} />
            <span className={cn("w-full h-0.5 bg-current transition-all", mobileMenuOpen ? "-rotate-45 -translate-y-2" : "")} />
          </div>
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 bg-[#0A0F1C]/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8"
            >
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-2xl font-medium text-white hover:text-primary transition-colors"
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
                className="mt-4 px-8 py-3 text-lg font-semibold rounded border border-primary/50 text-primary hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(0,229,255,0.6)] transition-all"
              >
                Download Resume
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
