"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Phone, CheckCircle, Code, User, Download } from "lucide-react";
import HoloButton from "../ui/HoloButton";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#0A0F1C]">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-secondary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Initialize <span className="text-primary">Connection</span></h2>
          <p className="text-gray-400">Ready to build something extraordinary? Secure communication channels are open.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          
          {/* Left Panel: Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-5/12 glass-panel p-8 md:p-10 rounded-2xl border border-primary/20 bg-[#111827]/60 backdrop-blur-xl relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-primary to-secondary opacity-80" />
            
            <h3 className="text-2xl font-bold text-white mb-8">System Architecture Logs</h3>
            
            <div className="space-y-6">
              <a href="mailto:gsrbhat20@gmail.com" className="flex items-center gap-4 text-gray-300 hover:text-primary transition-all group/link" data-hover="true">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover/link:border-primary group-hover/link:bg-primary/10 transition-all group-hover/link:shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 font-mono">Email</div>
                  <div className="font-medium">gsrbhat20@gmail.com</div>
                </div>
              </a>

              <a href="tel:+917989035770" className="flex items-center gap-4 text-gray-300 hover:text-primary transition-all group/link" data-hover="true">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover/link:border-primary group-hover/link:bg-primary/10 transition-all group-hover/link:shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 font-mono">Phone</div>
                  <div className="font-medium">+91 7989035770</div>
                </div>
              </a>

              <a href="https://www.linkedin.com/in/sairahulbhatg/" target="_blank" className="flex items-center gap-4 text-gray-300 hover:text-primary transition-all group/link" data-hover="true">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover/link:border-primary group-hover/link:bg-primary/10 transition-all group-hover/link:shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 font-mono">LinkedIn</div>
                  <div className="font-medium">/in/sairahulbhatg</div>
                </div>
              </a>

              <a href="https://github.com/GsrBhat" target="_blank" className="flex items-center gap-4 text-gray-300 hover:text-primary transition-all group/link" data-hover="true">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover/link:border-primary group-hover/link:bg-primary/10 transition-all group-hover/link:shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                  <Code className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 font-mono">GitHub</div>
                  <div className="font-medium">@GsrBhat</div>
                </div>
              </a>

              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 font-mono">Location</div>
                  <div className="font-medium">Hyderabad, Telangana, India</div>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-white/10">
              <HoloButton glowColor="primary" className="w-full flex justify-center py-4 text-base" href="/resume.pdf" download target="_blank">
                <Download className="w-4 h-4 mr-2" /> Download Resume
              </HoloButton>
            </div>
          </motion.div>

          {/* Right Panel: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-7/12 glass-panel p-8 md:p-10 rounded-2xl border border-white/10 bg-black/40 relative"
          >
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form 
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col gap-6 h-full justify-between"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-primary uppercase tracking-wider">Name</label>
                      <input 
                        required
                        type="text" 
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:bg-white/10 transition-all"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-primary uppercase tracking-wider">Email</label>
                      <input 
                        required
                        type="email" 
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:bg-white/10 transition-all"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-primary uppercase tracking-wider">Subject</label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:bg-white/10 transition-all"
                      placeholder="Transmission subject"
                    />
                  </div>

                  <div className="space-y-2 flex-1 flex flex-col">
                    <label className="text-xs font-mono text-primary uppercase tracking-wider">Message</label>
                    <textarea 
                      required
                      className="w-full flex-1 min-h-[150px] bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:bg-white/10 transition-all resize-none"
                      placeholder="Type your message here..."
                    ></textarea>
                  </div>

                  <button 
                    disabled={isSubmitting}
                    className="w-full mt-2 relative overflow-hidden px-8 py-4 rounded-lg font-bold text-white transition-all duration-300 bg-gradient-to-r from-secondary to-accent hover:shadow-[0_0_20px_rgba(0,191,255,0.6)] group disabled:opacity-70 disabled:cursor-not-allowed"
                    data-hover="true"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <motion.div 
                            animate={{ rotate: 360 }} 
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          />
                          Transmitting...
                        </span>
                      ) : (
                        "Send Message"
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full text-center py-20"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-6 border border-primary relative"
                  >
                    <CheckCircle className="w-12 h-12 text-primary z-10" />
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-white mb-2">Message Transmitted</h3>
                  <p className="text-primary font-mono tracking-widest text-sm uppercase">Secure Channel Closed Successfully</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 text-center">
          <h4 className="text-2xl md:text-3xl font-bold text-white mb-2">Interested in working together?</h4>
          <p className="text-gray-400 mb-8">Let’s build something extraordinary.</p>
          <HoloButton glowColor="primary" className="text-lg py-4 px-10">
            Let's Collaborate
          </HoloButton>
        </div>
      </div>
    </section>
  );
}
