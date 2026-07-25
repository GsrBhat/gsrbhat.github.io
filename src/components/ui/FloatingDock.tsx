"use client";

import { motion } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";
import { 
  Volume2, VolumeX, Activity, Terminal, ArrowUp, 
  Home, User, BookOpen, Cpu, Briefcase, Award, Mail 
} from "lucide-react";
import { cn } from "@/lib/utils";

const dockItems = [
  { icon: <Home className="w-4 h-4" />, label: "Home", href: "#hero" },
  { icon: <User className="w-4 h-4" />, label: "About", href: "#about" },
  { icon: <Cpu className="w-4 h-4" />, label: "Skills", href: "#skills" },
  { icon: <Briefcase className="w-4 h-4" />, label: "Projects", href: "#projects" },
  { icon: <BookOpen className="w-4 h-4" />, label: "Research", href: "#research" },
  { icon: <Award className="w-4 h-4" />, label: "Resume", href: "#resume" },
  { icon: <Mail className="w-4 h-4" />, label: "Contact", href: "#contact" },
];

export default function FloatingDock({ onOpenTerminal }: { onOpenTerminal: () => void }) {
  const { soundEnabled, setSoundEnabled, humEnabled, setHumEnabled, triggerClick } = usePortfolio();

  const handleScrollToTop = () => {
    triggerClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden md:block select-none">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 18, delay: 0.5 }}
        className="glass-panel px-4 py-3 rounded-2xl flex items-center gap-2 bg-[#0f0f15]/80 border-white/5 shadow-2xl relative overflow-hidden backdrop-blur-xl"
      >
        {/* Glow backdrop line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan/30 to-transparent" />

        {/* Section Links */}
        <div className="flex items-center gap-1.5 pr-3 border-r border-white/5">
          {dockItems.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              onClick={triggerClick}
              className={cn(
                "p-2.5 rounded-xl hover:bg-cyan/10 text-gray-400 hover:text-cyan border border-transparent hover:border-cyan/20 transition-all duration-300 relative group"
              )}
              title={item.label}
              data-hover="true"
            >
              {item.icon}
              {/* Tooltip */}
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#07070a] border border-white/10 text-[9px] font-mono text-cyan rounded-md opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all pointer-events-none whitespace-nowrap">
                {item.label}
              </span>
            </a>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1.5 pl-1.5">
          {/* Terminal button */}
          <button
            onClick={onOpenTerminal}
            className="p-2.5 rounded-xl hover:bg-cyan/10 text-gray-400 hover:text-cyan border border-transparent hover:border-cyan/20 transition-all duration-300 relative group"
            title="Open Console (Ctrl+K)"
            data-hover="true"
          >
            <Terminal className="w-4 h-4" />
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#07070a] border border-white/10 text-[9px] font-mono text-cyan rounded-md opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all pointer-events-none whitespace-nowrap">
              Console Shell
            </span>
          </button>

          {/* Back to top rocket */}
          <button
            onClick={handleScrollToTop}
            className="p-2.5 rounded-xl hover:bg-cyan/10 text-gray-400 hover:text-cyan border border-transparent hover:border-cyan/20 transition-all duration-300 relative group"
            title="Return to Core"
            data-hover="true"
          >
            <ArrowUp className="w-4 h-4" />
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#07070a] border border-white/10 text-[9px] font-mono text-cyan rounded-md opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all pointer-events-none whitespace-nowrap">
              Core Return
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
