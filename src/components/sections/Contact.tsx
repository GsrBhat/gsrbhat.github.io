"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, User, Code, CheckCircle, Send, Cpu } from "lucide-react";
import HoloButton from "../ui/HoloButton";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate high-tech compilation/transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset success state after 6 seconds
      setTimeout(() => setIsSuccess(false), 6000);
    }, 2000);
  };

  return (
    <section id="contact" className="py-20 relative bg-[#050816] overflow-hidden">
      
      {/* Background Grids and Blobs */}
      <div className="absolute inset-0 blueprint-grid opacity-15 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
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
                <a href="mailto:gsrbhat20@gmail.com" className="flex items-center gap-4 text-gray-300 hover:text-cyan transition-all group font-sans" data-hover="true">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:border-cyan group-hover:bg-cyan/5 transition-all group-hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">Email Address</div>
                    <div className="text-xs md:text-sm font-semibold">gsrbhat20@gmail.com</div>
                  </div>
                </a>

                <a href="tel:+917989035770" className="flex items-center gap-4 text-gray-300 hover:text-cyan transition-all group font-sans" data-hover="true">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:border-cyan group-hover:bg-cyan/5 transition-all group-hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">Contact Number</div>
                    <div className="text-xs md:text-sm font-semibold">+91 7989035770</div>
                  </div>
                </a>

                <a href="https://www.linkedin.com/in/sairahulbhatg/" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-gray-300 hover:text-cyan transition-all group font-sans" data-hover="true">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:border-cyan group-hover:bg-cyan/5 transition-all group-hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">LinkedIn</div>
                    <div className="text-xs md:text-sm font-semibold">/in/sairahulbhatg</div>
                  </div>
                </a>

                <a href="https://github.com/GsrBhat" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-gray-300 hover:text-cyan transition-all group font-sans" data-hover="true">
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

          {/* Right Panel: Blueprint Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-7/12 glass-panel p-6 md:p-8 rounded-2xl border-white/5 bg-[#0B1120] relative"
          >
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form 
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-cyan uppercase tracking-wider">Transmitter Name</label>
                      <input 
                        required
                        type="text" 
                        className="w-full bg-[#050816] border border-white/5 rounded-lg px-4 py-3 text-white text-xs md:text-sm focus:outline-none focus:border-cyan focus:bg-cyan/5 transition-all font-sans"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-cyan uppercase tracking-wider">Return Mail</label>
                      <input 
                        required
                        type="email" 
                        className="w-full bg-[#050816] border border-white/5 rounded-lg px-4 py-3 text-white text-xs md:text-sm focus:outline-none focus:border-cyan focus:bg-cyan/5 transition-all font-sans"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-cyan uppercase tracking-wider">Transmission Subject</label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-[#050816] border border-white/5 rounded-lg px-4 py-3 text-white text-xs md:text-sm focus:outline-none focus:border-cyan focus:bg-cyan/5 transition-all font-sans"
                      placeholder="Enter subject"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-cyan uppercase tracking-wider">Message Payload</label>
                    <textarea 
                      required
                      className="w-full min-h-[140px] bg-[#050816] border border-white/5 rounded-lg px-4 py-3 text-white text-xs md:text-sm focus:outline-none focus:border-cyan focus:bg-cyan/5 transition-all resize-none font-sans"
                      placeholder="Type your message details..."
                    ></textarea>
                  </div>

                  <button 
                    disabled={isSubmitting}
                    className="w-full relative overflow-hidden px-8 py-4 rounded-lg font-bold text-white transition-all duration-300 bg-gradient-to-r from-primary to-cyan hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] group disabled:opacity-75 disabled:cursor-not-allowed text-xs md:text-sm font-display tracking-wider uppercase flex items-center justify-center gap-2"
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
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-16"
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
              )}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
