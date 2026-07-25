"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Float, Preload, Sparkles } from "@react-three/drei";
import { motion } from "framer-motion";
import gsap from "gsap";
import ChipModel from "../3d/ChipModel";
import HoloButton from "../ui/HoloButton";
import { usePortfolio } from "@/context/PortfolioContext";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [sparkleCount, setSparkleCount] = useState(1000);
  const [isMobile, setIsMobile] = useState(false);
  const { setIsResumeModalOpen, triggerClick } = usePortfolio();

  useEffect(() => {
    // Check screen size for optimizations
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSparkleCount(mobile ? 300 : 1200);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    if (textRef.current) {
      const chars = textRef.current.querySelectorAll('.char');
      gsap.fromTo(chars, 
        { opacity: 0, y: 30, filter: "blur(8px)" },
        { 
          opacity: 1, 
          y: 0, 
          filter: "blur(0px)",
          stagger: 0.05, 
          duration: 1.2, 
          ease: "power3.out",
          delay: 0.3
        }
      );
    }

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nameParts = "Sai Rahul Bhat".split('');

  return (
    <section id="hero" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#07070a] blueprint-grid">
      
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ antialias: !isMobile }}>
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#10B981" />
          <spotLight position={[-10, 10, 10]} angle={0.3} penumbra={1} intensity={2.5} color="#8B5CF6" />
          
          {!isMobile && (
            <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1.5}>
              <ChipModel />
            </Float>
          )}
          
          <Sparkles count={sparkleCount} scale={15} size={1.2} speed={0.3} color="#10B981" opacity={0.5} />
          
          <Environment preset="city" />
          <Preload all />
        </Canvas>
      </div>

      {/* Foreground Content */}
      <div ref={containerRef} className="relative z-10 container mx-auto px-4 md:px-8 lg:px-12 flex flex-col items-center text-center mt-12 md:mt-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-4 inline-block py-1 px-3 rounded-full border border-cyan/30 bg-cyan/5 text-cyan text-[10px] md:text-xs font-semibold tracking-widest uppercase backdrop-blur-md font-sans"
        >
          Silicon & RTL Architect
        </motion.div>
        
        <h1 ref={textRef} className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tight mb-4 text-white leading-none">
          {nameParts.map((char, index) => (
            <span key={index} className="char inline-block">{char === ' ' ? '\u00A0' : char}</span>
          ))}
        </h1>
        
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="space-y-4 mb-8"
        >
          <h2 className="text-lg md:text-2xl font-bold text-gray-300">
            Future VLSI Engineer <span className="text-cyan">|</span> RTL Design & FPGA Developer
          </h2>
          <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto font-sans leading-relaxed">
            Samsung ISWDP Cohort 8 Fellow building next-generation digital circuits, microprocessor architectures, and semiconductor technology.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <HoloButton glowColor="primary" className="w-full sm:w-auto text-cyan border-cyan/20" href="#projects">
            Explore Silicon Projects
          </HoloButton>
          <HoloButton 
            glowColor="accent" 
            className="w-full sm:w-auto bg-transparent border-white/10" 
            onClick={() => {
              triggerClick();
              setIsResumeModalOpen(true);
            }}
          >
            View Resume
          </HoloButton>
          <HoloButton glowColor="secondary" className="w-full sm:w-auto bg-transparent border-white/10" href="#contact">
            Initialize Connection
          </HoloButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <span className="text-[10px] text-gray-500 uppercase tracking-widest font-sans">Scroll</span>
        <motion.div 
          className="w-0.5 h-12 bg-gradient-to-b from-cyan to-transparent"
          animate={{ scaleY: [0, 1, 0], transformOrigin: ["top", "top", "bottom"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </section>
  );
}

