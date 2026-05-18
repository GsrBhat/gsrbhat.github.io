"use client";

import { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Float, Preload, Sparkles } from "@react-three/drei";
import { motion } from "framer-motion";
import gsap from "gsap";
import ChipModel from "../3d/ChipModel";
import HoloButton from "../ui/HoloButton";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!textRef.current) return;
    
    // Simple text scramble / reveal effect using GSAP
    const chars = textRef.current.querySelectorAll('.char');
    gsap.fromTo(chars, 
      { opacity: 0, y: 50, filter: "blur(10px)" },
      { 
        opacity: 1, 
        y: 0, 
        filter: "blur(0px)",
        stagger: 0.1, 
        duration: 1.5, 
        ease: "power3.out",
        delay: 0.5
      }
    );
  }, []);

  const title = "G. Sai Rahul Bhat".split('');

  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#00d2ff" />
          <spotLight position={[-10, 10, 10]} angle={0.3} penumbra={1} intensity={2} color="#3a0ca3" />
          
          <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
            <ChipModel />
          </Float>
          
          <Sparkles count={2000} scale={20} size={1.5} speed={0.4} color="#00d2ff" opacity={0.6} />
          
          <Environment preset="city" />
          <Preload all />
        </Canvas>
      </div>

      {/* Foreground Content */}
      <div ref={containerRef} className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6 inline-block py-1 px-3 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase backdrop-blur-md"
        >
          System Initialized
        </motion.div>
        
        <h1 ref={textRef} className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-4 text-white">
          {title.map((char, index) => (
            <span key={index} className="char inline-block">{char === ' ' ? '\u00A0' : char}</span>
          ))}
        </h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="space-y-2 mb-10"
        >
          <h2 className="text-xl md:text-3xl font-bold text-gray-300">Future VLSI Architect <span className="text-primary mx-2">|</span> RTL & FPGA Engineer</h2>
          <p className="text-sm md:text-base text-gray-400 max-w-lg mx-auto mt-4">Building Intelligent Semiconductor Systems</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <HoloButton glowColor="primary" className="w-full sm:w-auto" href="#projects">
            View Projects
          </HoloButton>
          <HoloButton glowColor="accent" className="w-full sm:w-auto bg-transparent border-white/20" href="/resume.pdf" download target="_blank">
            Download Resume
          </HoloButton>
          <HoloButton glowColor="secondary" className="w-full sm:w-auto bg-transparent border-white/20" href="#contact">
            Contact Me
          </HoloButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-xs text-gray-500 uppercase tracking-widest">Scroll</span>
        <motion.div 
          className="w-0.5 h-16 bg-gradient-to-b from-primary to-transparent"
          animate={{ scaleY: [0, 1, 0], transformOrigin: ["top", "top", "bottom"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </section>
  );
}
