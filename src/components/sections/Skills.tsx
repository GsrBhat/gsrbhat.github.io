"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";
import { Cpu, Layers, Terminal, Database, Shield, Zap } from "lucide-react";

type SkillNode = {
  name: string;
  category: "VLSI" | "Programming" | "AI" | "FullStack";
  level: number; // percentage
  desc: string;
  x3d: number;
  y3d: number;
  z3d: number;
};

const skillList: SkillNode[] = [
  // VLSI & ECE
  { name: "Verilog HDL", category: "VLSI", level: 95, desc: "RTL design of Arithmetic pipelines, hazard control logic, and barrel shifters.", x3d: 0, y3d: 0, z3d: 0 },
  { name: "SystemVerilog", category: "VLSI", level: 85, desc: "OOP verification, assertions, and testbench structures.", x3d: 0, y3d: 0, z3d: 0 },
  { name: "Xilinx Vivado", category: "VLSI", level: 95, desc: "Synthesis, timing constraints mapping, and Artix-7 / Kria board prototyping.", x3d: 0, y3d: 0, z3d: 0 },
  { name: "Cadence Virtuoso", category: "VLSI", level: 80, desc: "Analog schematic entry, layout editing, and Spectre transient analyses.", x3d: 0, y3d: 0, z3d: 0 },
  { name: "Sentaurus TCAD", category: "VLSI", level: 75, desc: "Process simulation, devices modeling (FinFET structure physics).", x3d: 0, y3d: 0, z3d: 0 },
  { name: "Digital Design", category: "VLSI", level: 95, desc: "Combinational/sequential circuits, state machines (FSM), logical optimization.", x3d: 0, y3d: 0, z3d: 0 },
  
  // Software & Stacks
  { name: "Java", category: "Programming", level: 90, desc: "Enterprise programming, OOP structures, and data structures.", x3d: 0, y3d: 0, z3d: 0 },
  { name: "Python", category: "Programming", level: 90, desc: "Scripting, test benches automation, and AI/ML model integration.", x3d: 0, y3d: 0, z3d: 0 },
  { name: "C / C++", category: "Programming", level: 80, desc: "System level programming, memory manipulation, and logic boards.", x3d: 0, y3d: 0, z3d: 0 },
  { name: "MATLAB", category: "Programming", level: 85, desc: "Filter design, signal processing, and matrix evaluations.", x3d: 0, y3d: 0, z3d: 0 },
  
  // AI
  { name: "Machine Learning", category: "AI", level: 88, desc: "Regression, clustering algorithms, and model hyperparameter tuning.", x3d: 0, y3d: 0, z3d: 0 },
  { name: "Deep Learning", category: "AI", level: 85, desc: "Neural networks training, convolutional filters, and weight mapping.", x3d: 0, y3d: 0, z3d: 0 },
  { name: "Computer Vision", category: "AI", level: 82, desc: "Edge detection, image filtering, and convolutional feature mapping.", x3d: 0, y3d: 0, z3d: 0 },
  
  // Full Stack
  { name: "Spring Boot", category: "FullStack", level: 90, desc: "Building secure, role-based REST APIs with Spring Security.", x3d: 0, y3d: 0, z3d: 0 },
  { name: "React", category: "FullStack", level: 92, desc: "Interactive frontend state, modular component design, and dashboard hooks.", x3d: 0, y3d: 0, z3d: 0 },
  { name: "Next.js", category: "FullStack", level: 88, desc: "Server-side rendering, App routing, and metadata SEO optimization.", x3d: 0, y3d: 0, z3d: 0 },
  { name: "PostgreSQL", category: "FullStack", level: 85, desc: "Relational database tables, index query optimization, and SQL mappings.", x3d: 0, y3d: 0, z3d: 0 },
  { name: "Docker", category: "FullStack", level: 80, desc: "Containerizing backend and database modules for seamless deployment.", x3d: 0, y3d: 0, z3d: 0 },
  { name: "Linux", category: "FullStack", level: 85, desc: "Bash/Tcl scripting, environment variables configuration, and OS commands.", x3d: 0, y3d: 0, z3d: 0 },
  { name: "Git / GitHub", category: "FullStack", level: 90, desc: "Branching workflows, version control logs, and pull requests.", x3d: 0, y3d: 0, z3d: 0 }
];

// Distribute points evenly on a 3D sphere for spherical coordinates mapping
skillList.forEach((skill, idx) => {
  const total = skillList.length;
  const phi = Math.acos(-1 + (2 * idx) / total);
  const theta = Math.sqrt(total * Math.PI) * phi;
  const radius = 160; // sphere radius
  
  skill.x3d = radius * Math.sin(phi) * Math.cos(theta);
  skill.y3d = radius * Math.sin(phi) * Math.sin(theta);
  skill.z3d = radius * Math.cos(phi);
});

export default function Skills() {
  const { triggerClick, triggerBeep } = usePortfolio();
  const [selectedSkill, setSelectedSkill] = useState<SkillNode>(skillList[0]);
  const [hoveredSkillName, setHoveredSkillName] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"galaxy" | "hex">("galaxy");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Keep track of rotation angles
  const angleX = useRef(0.005);
  const angleY = useRef(0.005);
  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || activeTab !== "galaxy") return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = width);
    const centerX = width / 2;
    const centerY = height / 2;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || 500;
      height = canvas.height = width;
    };
    window.addEventListener("resize", handleResize);

    // Deep copy skill nodes coordinates to simulate transformation frames
    const projectedNodes = skillList.map(node => ({ ...node }));

    let animationFrameId: number;

    const rotateX = (node: any, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const y1 = node.y3d * cos - node.z3d * sin;
      const z1 = node.z3d * cos + node.y3d * sin;
      node.y3d = y1;
      node.z3d = z1;
    };

    const rotateY = (node: any, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const x1 = node.x3d * cos - node.z3d * sin;
      const z1 = node.z3d * cos + node.x3d * sin;
      node.x3d = x1;
      node.z3d = z1;
    };

    const drawLoop = () => {
      ctx.clearRect(0, 0, width, height);

      // Rotate nodes based on current speeds
      projectedNodes.forEach(node => {
        rotateX(node, angleX.current);
        rotateY(node, angleY.current);
      });

      // Slowly decelerate values back to low idle if not dragging
      if (!isDragging.current) {
        angleX.current *= 0.98;
        angleY.current *= 0.98;
        
        // Keep a very tiny idle rotation speed
        if (Math.abs(angleX.current) < 0.001) angleX.current = 0.0015;
        if (Math.abs(angleY.current) < 0.001) angleY.current = 0.0015;
      }

      // Draw Orbit Center Silicon Chip Representation
      ctx.beginPath();
      ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(11, 17, 32, 0.9)";
      ctx.strokeStyle = "rgba(6, 182, 212, 0.4)";
      ctx.lineWidth = 2;
      ctx.fill();
      ctx.stroke();
      
      // Draw details on center chip
      ctx.font = "bold 9px monospace";
      ctx.fillStyle = "#06B6D4";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("CORE", centerX, centerY - 5);
      ctx.fillText("DIE", centerX, centerY + 5);

      // Draw connections/orbits lines from center chip to nodes
      projectedNodes.forEach(node => {
        // filter by category if needed
        if (categoryFilter !== "ALL" && node.category !== categoryFilter) return;

        // Depth calculation
        const depth = 200; // perspective depth
        const scale = depth / (depth + node.z3d);
        const x2d = centerX + node.x3d * scale;
        const y2d = centerY + node.y3d * scale;

        // Draw light trace line to center
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x2d, y2d);
        ctx.strokeStyle = node.name === selectedSkill.name
          ? "rgba(6, 182, 212, 0.25)"
          : "rgba(255, 255, 255, 0.02)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Node circle
        ctx.beginPath();
        ctx.arc(x2d, y2d, 5 * scale + (node.name === selectedSkill.name ? 3 : 0), 0, Math.PI * 2);
        
        let color = "#3B82F6"; // VLSI
        if (node.category === "Programming") color = "#06B6D4";
        if (node.category === "AI") color = "#a855f7";
        if (node.category === "FullStack") color = "#10B981";

        ctx.fillStyle = color;
        ctx.shadowBlur = node.name === selectedSkill.name ? 15 : 0;
        ctx.shadowColor = color;
        ctx.fill();
        ctx.shadowBlur = 0; // reset

        // Node labels
        const isHovered = hoveredSkillName === node.name;
        if (scale > 0.85 || node.name === selectedSkill.name || isHovered) {
          ctx.font = `${node.name === selectedSkill.name || isHovered ? "bold" : "normal"} ${9 * scale}px monospace`;
          ctx.fillStyle = node.name === selectedSkill.name ? "#06B6D4" : "rgba(232, 234, 240, 0.8)";
          ctx.textAlign = "left";
          ctx.fillText(`  ${node.name}`, x2d, y2d);
        }
      });

      animationFrameId = requestAnimationFrame(drawLoop);
    };

    drawLoop();

    // Mouse interactive dragging to rotate sphere
    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Handle node hovering check
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      let hoveredNode: string | null = null;

      projectedNodes.forEach(node => {
        const depth = 200;
        const scale = depth / (depth + node.z3d);
        const x2d = centerX + node.x3d * scale;
        const y2d = centerY + node.y3d * scale;

        const distance = Math.hypot(mouseX - x2d, mouseY - y2d);
        if (distance < 12) {
          hoveredNode = node.name;
        }
      });

      setHoveredSkillName(hoveredNode);

      if (!isDragging.current) return;
      const deltaX = e.clientX - lastMousePos.current.x;
      const deltaY = e.clientY - lastMousePos.current.y;
      
      angleY.current = deltaX * 0.005;
      angleX.current = -deltaY * 0.005;

      lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    // Click a node to select it
    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      projectedNodes.forEach((node) => {
        const depth = 200;
        const scale = depth / (depth + node.z3d);
        const x2d = centerX + node.x3d * scale;
        const y2d = centerY + node.y3d * scale;

        const distance = Math.hypot(mouseX - x2d, mouseY - y2d);
        if (distance < 15) {
          // Play click sound
          const realNode = skillList.find(n => n.name === node.name);
          if (realNode) {
            triggerBeep(700, 0.05, "sine");
            setSelectedSkill(realNode);
          }
        }
      });
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("click", handleCanvasClick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (canvas) {
        canvas.removeEventListener("mousedown", handleMouseDown);
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("click", handleCanvasClick);
      }
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [activeTab, selectedSkill, hoveredSkillName, categoryFilter]);

  const filteredSkills = categoryFilter === "ALL" 
    ? skillList 
    : skillList.filter(s => s.category === categoryFilter);

  return (
    <section id="skills" className="py-20 relative bg-[#050816] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan/30 to-transparent" />

      <div className="container mx-auto px-4 md:px-8 lg:px-12 relative z-10 max-w-6xl">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-black mb-4 text-white">
            Skill <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan via-primary to-purple">Galaxy System</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto font-sans text-sm md:text-base leading-relaxed">
            Drag to rotate the 3D Silicon logic sphere. Click any hardware module or library to load stack parameters.
          </p>
        </motion.div>

        {/* Mode Selector */}
        <div className="flex justify-center gap-4 mb-10 select-none">
          {["galaxy", "hex"].map((mode) => (
            <button
              key={mode}
              onClick={() => {
                triggerClick();
                setActiveTab(mode as any);
              }}
              className={`px-4 py-2 rounded-lg border text-xs md:text-sm font-semibold transition-all duration-300 font-display ${
                activeTab === mode
                  ? "bg-cyan/15 border-cyan text-cyan shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                  : "bg-[#0b1120] border-white/5 text-gray-400 hover:text-white"
              }`}
              data-hover="true"
            >
              {mode === "galaxy" ? "3D Skill Galaxy" : "Hexagonal Card Matrix"}
            </button>
          ))}
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 select-none">
          {["ALL", "VLSI", "Programming", "AI", "FullStack"].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                triggerClick();
                setCategoryFilter(cat);
              }}
              className={`px-3 py-1 rounded text-[10px] md:text-xs font-mono transition-all border ${
                categoryFilter === cat
                  ? "bg-primary/20 border-primary text-white"
                  : "bg-black/30 border-white/5 text-gray-400 hover:text-white"
              }`}
              data-hover="true"
            >
              {cat === "ALL" ? "ALL SCHEMATICS" : cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Galaxy Sphere Display */}
        {activeTab === "galaxy" ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
            
            {/* 3D Canvas Orbit */}
            <div className="lg:col-span-7 flex justify-center items-center relative min-h-[350px]">
              <div className="absolute inset-0 bg-radial-glow from-cyan/5 via-transparent to-transparent pointer-events-none" />
              <canvas
                ref={canvasRef}
                className="cursor-grab active:cursor-grabbing max-w-full"
                style={{ width: "100%", height: "auto" }}
              />
              <div className="absolute bottom-2 text-center text-[10px] font-mono text-gray-500 uppercase pointer-events-none select-none">
                ↔ Drag to orbit logic stack ↔
              </div>
            </div>

            {/* Selected Node Details Card */}
            <div className="lg:col-span-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedSkill.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="glass-panel p-6 md:p-8 rounded-2xl bg-[#0B1120] border-cyan/20 relative overflow-hidden"
                >
                  {/* Status Indicator */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-mono font-bold tracking-wider text-cyan uppercase bg-cyan/5 border border-cyan/20 px-2 py-0.5 rounded flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan animate-ping" />
                      {selectedSkill.category} MODULE
                    </span>
                    <span className="text-xl font-black text-cyan font-display">{selectedSkill.level}%</span>
                  </div>

                  <h3 className="text-2xl font-black text-white font-display leading-none mb-3">
                    {selectedSkill.name}
                  </h3>

                  <p className="text-gray-400 font-sans text-xs md:text-sm leading-relaxed mb-6 h-16">
                    {selectedSkill.desc}
                  </p>

                  {/* Simulated Hardware Parameters */}
                  <div className="space-y-3.5 border-t border-white/5 pt-5 font-mono text-[10px] md:text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500">SYNTHESIS TIMING:</span>
                      <span className="text-white">MET (T_slack = +0.31ns)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">COMPILER STATUS:</span>
                      <span className="text-emerald">VERIFIED (100%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">GATE COUNT INDEX:</span>
                      <span className="text-[#a855f7]">0.08% CORE STACK</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Radar Strengths list */}
              <div className="mt-6 glass-panel p-4 rounded-xl bg-black/40 border-white/5 font-mono text-[10px]">
                <div className="text-gray-500 uppercase mb-3 font-bold">RADAR COVERAGE STATS</div>
                <div className="space-y-2">
                  {[
                    { title: "RTL Core Design", val: "95%" },
                    { title: "Functional Verification", val: "90%" },
                    { title: "Analog IC Analysis", val: "80%" },
                    { title: "Spring Boot Rest APIs", val: "90%" },
                    { title: "AI Model Deployment", val: "85%" }
                  ].map((stat, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-gray-400">{stat.title}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1 bg-white/5 rounded overflow-hidden">
                          <div className="h-full bg-cyan" style={{ width: stat.val }} />
                        </div>
                        <span className="text-cyan font-bold">{stat.val}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        ) : (
          /* Hexagonal Cards Grid Matrix */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto"
          >
            {filteredSkills.map((skill, index) => {
              let icon = <Cpu className="w-4 h-4 text-cyan" />;
              if (skill.category === "Programming") icon = <Terminal className="w-4 h-4 text-indigo" />;
              if (skill.category === "AI") icon = <Zap className="w-4 h-4 text-purple" />;
              if (skill.category === "FullStack") icon = <Database className="w-4 h-4 text-emerald" />;

              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.03 }}
                  whileHover={{ y: -4 }}
                  onClick={() => {
                    triggerBeep(700, 0.05, "sine");
                    setSelectedSkill(skill);
                  }}
                  className={`glass-panel p-5 rounded-xl bg-[#0B1120] border cursor-pointer relative group flex flex-col justify-between min-h-[140px] ${
                    selectedSkill.name === skill.name ? "border-cyan/50 shadow-[0_0_15px_rgba(6,182,212,0.15)]" : "border-white/5"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 bg-white/5 rounded-lg">
                      {icon}
                    </div>
                    <span className="text-xs font-mono font-bold text-gray-500">{skill.level}%</span>
                  </div>

                  <div>
                    <h4 className="text-white font-bold text-sm md:text-base font-display leading-tight mb-2 group-hover:text-cyan transition-colors">
                      {skill.name}
                    </h4>
                    
                    {/* Tiny micro progress bar */}
                    <div className="w-full h-1 bg-white/5 rounded overflow-hidden">
                      <div className="h-full bg-cyan transition-all duration-500" style={{ width: `${skill.level}%` }} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

      </div>
    </section>
  );
}
