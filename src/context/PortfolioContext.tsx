"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import * as audio from "@/lib/audio";

type PortfolioContextType = {
  soundEnabled: boolean;
  humEnabled: boolean;
  isBooted: boolean;
  isResumeModalOpen: boolean;
  setSoundEnabled: (v: boolean) => void;
  setHumEnabled: (v: boolean) => void;
  setIsBooted: (v: boolean) => void;
  setIsResumeModalOpen: (v: boolean) => void;
  triggerClick: () => void;
  triggerBeep: (freq?: number, duration?: number, type?: OscillatorType) => void;
  triggerTyping: () => void;
  triggerSuccess: () => void;
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [humEnabled, setHumEnabled] = useState(false);
  const [isBooted, setIsBooted] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  // Load initial sound preferences from localStorage if client side
  useEffect(() => {
    const savedSound = localStorage.getItem("portfolio_sound");
    const savedHum = localStorage.getItem("portfolio_hum");
    if (savedSound !== null) {
      setSoundEnabled(savedSound === "true");
    }
    if (savedHum !== null) {
      setHumEnabled(savedHum === "true");
    }
  }, []);

  // Update ambient hum when sound/hum preferences change
  useEffect(() => {
    if (soundEnabled && humEnabled && isBooted) {
      audio.startAmbientHum(true);
    } else {
      audio.stopAmbientHum();
    }
    localStorage.setItem("portfolio_sound", String(soundEnabled));
    localStorage.setItem("portfolio_hum", String(humEnabled));
  }, [soundEnabled, humEnabled, isBooted]);

  const triggerClick = () => audio.playClick(soundEnabled);
  const triggerBeep = (freq = 600, duration = 0.1, type: OscillatorType = "sine") => 
    audio.playBeep(soundEnabled, freq, duration, type);
  const triggerTyping = () => audio.playTyping(soundEnabled);
  const triggerSuccess = () => audio.playSuccess(soundEnabled);

  return (
    <PortfolioContext.Provider
      value={{
        soundEnabled,
        humEnabled,
        isBooted,
        isResumeModalOpen,
        setSoundEnabled,
        setHumEnabled,
        setIsBooted,
        setIsResumeModalOpen,
        triggerClick,
        triggerBeep,
        triggerTyping,
        triggerSuccess,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
