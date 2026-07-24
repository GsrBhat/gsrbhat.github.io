"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, User, Code, CheckCircle, Send, Cpu, Terminal as TermIcon } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import HoloButton from "../ui/HoloButton";

export default function Contact() {
  const { soundEnabled, triggerClick, triggerBeep, triggerTyping, triggerSuccess } = usePortfolio();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Mode toggler
  const [mode, setMode] = useState<"form" | "terminal">("form");

  // Form states
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formSubject, setFormSubject] = useState("");
  const [formMessage, setFormMessage] = useState("");

  // Terminal states
  const [termInput, setTermInput] = useState("");
  const [termLogs, setTermLogs] = useState<string[]>([
    "CONNECTING TO EMISSION PROTOCOL DAEMON...",
    "SECURE LOG CHANNEL INITIALIZED.",
    "Type instructions to populate inputs packet:",
    "  name <yourname>  - Set sender name",
    "  email <address>  - Set sender email",
    "  msg <message>    - Set message body",
    "  payload          - Query current parameters packet",
    "  send             - Transmit variables package",
    "  clear            - Reset terminal buffers"
  ]);
  const termScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (termScrollRef.current) {
      termScrollRef.current.scrollTop = termScrollRef.current.scrollHeight;
    }
  }, [termLogs]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);
    triggerBeep(1000, 0.08, "triangle");
    
    // Simulate high-tech compilation/transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      triggerSuccess();
      
      // Reset form variables
      setFormName("");
      setFormEmail("");
      setFormSubject("");
      setFormMessage("");
      
      // Reset success state after 6 seconds
      setTimeout(() => setIsSuccess(false), 6000);
    }, 2000);
  };

  const handleTerminalCommand = () => {
    const raw = termInput.trim();
    if (!raw) return;

    triggerBeep(1200, 0.04, "sine");
    const cmdParts = raw.split(" ");
    const opcode = cmdParts[0].toLowerCase();
    const args = cmdParts.slice(1).join(" ");

    const outputLogs = [`visitor@saios_contact:~$ ${raw}`];

    switch (opcode) {
      case "help":
        outputLogs.push(
          "Available opcodes:",
          "  name <yourname>  - Define sender label",
          "  email <email>    - Set return email path",
          "  msg <text>       - Load message payload",
          "  payload          - Display variables status",
          "  send             - Execute transmitter package",
          "  clear            - Wipe screen buffers"
        );
        break;
      case "name":
        if (!args) {
          outputLogs.push("Error: Please provide a name. E.g. name John Doe");
        } else {
          setFormName(args);
          outputLogs.push(`✓ Sender name updated to: "${args}"`);
        }
        break;
      case "email":
        if (!args) {
          outputLogs.push("Error: Provide email. E.g. email mail@host.com");
        } else {
          setFormEmail(args);
          outputLogs.push(`✓ Email address mapped to: "${args}"`);
        }
        break;
      case "msg":
        if (!args) {
          outputLogs.push("Error: Provide message. E.g. msg Hello world");
        } else {
          setFormMessage(args);
          outputLogs.push(`✓ Message payload loaded.`);
        }
        break;
      case "payload":
        outputLogs.push(
          "CURRENT PACKET PARAMETERS:",
          `  Name   : ${formName || "[EMPTY]"}`,
          `  Email  : ${formEmail || "[EMPTY]"}`,
          `  Message: ${formMessage || "[EMPTY]"}`
        );
        break;
      case "send":
        if (!formName || !formEmail || !formMessage) {
          outputLogs.push("⚠️ ERROR: Cannot transmit. Missing fields! Run 'payload' to check.");
        } else {
          outputLogs.push("🚀 Modulation initialized. Transmitting packet...");
          setTermLogs((prev) => [...prev, ...outputLogs]);
          setTermInput("");
          handleSubmit();
          return;
        }
        break;
      case "clear":
        setTermLogs([]);
        setTermInput("");
        return;
      default:
        outputLogs.push(`Error: Opcode "${opcode}" unrecognized. Type 'help' for mappings.`);
        break;
    }

    setTermLogs((prev) => [...prev, ...outputLogs]);
    setTermInput("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermInput(e.target.value);
    triggerTyping();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleTerminalCommand();
    }
  };

  return (
    <section id="contact" className="py-20 relative bg-[#050816] overflow-hidden">
      
      {/* Background Grids and Blobs */}
      <div className="absolute inset-0 blueprint-grid opacity-15 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-black mb-4 text-white">
            Initialize <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-primary">Connection</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto font-sans text-sm md:text-base">
            Establish a secure channel for inquiries, placements, or hardware collaboration opportunities.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-5xl mx-auto">
          
          {/* Left Panel: High Tech Contact Nodes */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-5/12 glass-panel p-6 md:p-8 rounded-2xl border-white/5 bg-[#0B1120] relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-cyan to-primary" />
            
            <div>
              <h3 className="text-xl font-bold text-white mb-6 font-display">System Connection Info</h3>
              
              <div className="space-y-5">
                <a href="mailto:gsrbhat20@gmail.com" className="flex items-center gap-4 text-gray-300 hover:text-cyan transition-all group font-sans" data-hover="true" onClick={triggerClick}>
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:border-cyan group-hover:bg-cyan/5 transition-all group-hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">Email Address</div>
                    <div className="text-xs md:text-sm font-semibold">gsrbhat20@gmail.com</div>
                  </div>
                </a>

                <a href="tel:+917989035770" className="flex items-center gap-4 text-gray-300 hover:text-cyan transition-all group font-sans" data-hover="true" onClick={triggerClick}>
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:border-cyan group-hover:bg-cyan/5 transition-all group-hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">Contact Number</div>
                    <div className="text-xs md:text-sm font-semibold">+91 7989035770</div>
                  </div>
                </a>

                <a href="https://www.linkedin.com/in/sairahulbhatg/" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-gray-300 hover:text-cyan transition-all group font-sans" data-hover="true" onClick={triggerClick}>
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:border-cyan group-hover:bg-cyan/5 transition-all group-hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">LinkedIn</div>
                    <div className="text-xs md:text-sm font-semibold">/in/sairahulbhatg</div>
                  </div>
                </a>

                <a href="https://github.com/GsrBhat" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-gray-300 hover:text-cyan transition-all group font-sans" data-hover="true" onClick={triggerClick}>
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:border-cyan group-hover:bg-cyan/5 transition-all group-hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] shrink-0">
                    <Code className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">GitHub</div>
                    <div className="text-xs md:text-sm font-semibold">@GsrBhat</div>
                  </div>
                </a>

                <div className="flex items-center gap-4 text-gray-300 font-sans">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">Location</div>
                    <div className="text-xs md:text-sm font-semibold">Hyderabad, Telangana, India</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
              <HoloButton glowColor="primary" className="w-full flex justify-center py-3.5 text-xs md:text-sm text-cyan border-cyan/20" href="/resume.pdf" target="_blank">
                View Resume PDF
              </HoloButton>
            </div>
          </motion.div>

          {/* Right Panel: Form / Terminal Interface */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-7/12 glass-panel p-6 md:p-8 rounded-2xl border-white/5 bg-[#0B1120] relative flex flex-col justify-between"
          >
            {/* Mode Switcher */}
            <div className="flex justify-end gap-2 mb-4 shrink-0 select-none">
              <button
                onClick={() => { triggerClick(); setMode("form"); }}
                className={`px-3 py-1 rounded text-[10px] font-mono transition-all ${
                  mode === "form" ? "bg-cyan/15 text-cyan border border-cyan/30" : "bg-black/30 border border-white/5 text-gray-400"
                }`}
                data-hover="true"
              >
                Standard Form
              </button>
              <button
                onClick={() => { triggerClick(); setMode("terminal"); }}
                className={`px-3 py-1 rounded text-[10px] font-mono transition-all ${
                  mode === "terminal" ? "bg-cyan/15 text-cyan border border-cyan/30" : "bg-black/30 border border-white/5 text-gray-400"
                }`}
                data-hover="true"
              >
                CLI Terminal Shell
              </button>
            </div>

            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center py-16 flex-1"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 12 }}
                    className="w-20 h-20 bg-cyan/10 rounded-full flex items-center justify-center mb-6 border border-cyan relative"
                  >
                    <CheckCircle className="w-10 h-10 text-cyan z-10" />
                    <div className="absolute inset-0 bg-cyan/20 blur-xl rounded-full" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2 font-display">Signal Transmitted</h3>
                  <p className="text-cyan font-mono tracking-widest text-[10px] md:text-xs uppercase">
                    Secure channel connection established successfully.
                  </p>
                </motion.div>
              ) : mode === "form" ? (
                <motion.form 
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4 flex-1"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-cyan uppercase tracking-wider">Transmitter Name</label>
                      <input 
                        required
                        type="text" 
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full bg-[#050816] border border-white/5 rounded-lg px-4 py-2.5 text-white text-xs md:text-sm focus:outline-none focus:border-cyan focus:bg-cyan/5 transition-all font-sans"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-cyan uppercase tracking-wider">Return Mail</label>
                      <input 
                        required
                        type="email" 
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        className="w-full bg-[#050816] border border-white/5 rounded-lg px-4 py-2.5 text-white text-xs md:text-sm focus:outline-none focus:border-cyan focus:bg-cyan/5 transition-all font-sans"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-cyan uppercase tracking-wider">Transmission Subject</label>
                    <input 
                      required
                      type="text" 
                      value={formSubject}
                      onChange={(e) => setFormSubject(e.target.value)}
                      className="w-full bg-[#050816] border border-white/5 rounded-lg px-4 py-2.5 text-white text-xs md:text-sm focus:outline-none focus:border-cyan focus:bg-cyan/5 transition-all font-sans"
                      placeholder="Enter subject"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-cyan uppercase tracking-wider">Message Payload</label>
                    <textarea 
                      required
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      className="w-full min-h-[120px] bg-[#050816] border border-white/5 rounded-lg px-4 py-2.5 text-white text-xs md:text-sm focus:outline-none focus:border-cyan focus:bg-cyan/5 transition-all resize-none font-sans"
                      placeholder="Type your message details..."
                    ></textarea>
                  </div>

                  <button 
                    disabled={isSubmitting}
                    className="w-full relative overflow-hidden px-8 py-3.5 rounded-lg font-bold text-white transition-all duration-300 bg-gradient-to-r from-primary to-cyan hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] group disabled:opacity-75 disabled:cursor-not-allowed text-xs md:text-sm font-display tracking-wider uppercase flex items-center justify-center gap-2"
                    data-hover="true"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div 
                          animate={{ rotate: 360 }} 
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full shrink-0"
                        />
                        <span>Modulating Signal...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="terminal"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col h-[320px]"
                >
                  {/* Console History */}
                  <div 
                    ref={termScrollRef}
                    className="flex-1 bg-black/85 border border-white/5 rounded-t-xl p-4 font-mono text-[10px] md:text-xs text-gray-400 space-y-1.5 overflow-y-auto"
                  >
                    {termLogs.map((log, index) => (
                      <div key={index} className="leading-relaxed">
                        {log.startsWith("visitor@") ? (
                          <span className="text-cyan">{log}</span>
                        ) : log.startsWith("✓") || log.startsWith("🚀") ? (
                          <span className="text-emerald">{log}</span>
                        ) : log.startsWith("⚠️") || log.startsWith("Error:") ? (
                          <span className="text-red-400">{log}</span>
                        ) : (
                          <span>{log}</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Input bar */}
                  <div className="bg-[#050816] border-x border-b border-white/5 rounded-b-xl px-4 py-3 flex items-center gap-2">
                    <span className="text-cyan font-mono text-xs md:text-sm font-bold">$</span>
                    <input
                      type="text"
                      value={termInput}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      className="flex-1 bg-transparent border-none outline-none font-mono text-xs md:text-sm text-white caret-cyan"
                      placeholder="Type command (e.g. 'help', 'name Sai', 'send')..."
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
