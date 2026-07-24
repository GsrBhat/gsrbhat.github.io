"use client";

import React, { useState } from "react";
import { PortfolioProvider, usePortfolio } from "@/context/PortfolioContext";
import Preloader from "@/components/layout/Preloader";
import FloatingDock from "@/components/ui/FloatingDock";
import CommandPalette from "@/components/ui/CommandPalette";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "./Navbar";

function PageContainer({ children }: { children: React.ReactNode }) {
  const { isBooted } = usePortfolio();
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
    <>
      <CustomCursor />
      <Preloader />
      
      {/* Navbar will render as fixed overlay, but hidden if not booted */}
      {isBooted && <Navbar />}

      {/* Main content body */}
      <div className={!isBooted ? "h-screen overflow-hidden opacity-0" : "opacity-100 transition-opacity duration-1000"}>
        {children}
      </div>

      {/* Sci-Fi overlays only when booted */}
      {isBooted && (
        <>
          <FloatingDock onOpenTerminal={() => setIsTerminalOpen(true)} />
          <CommandPalette isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
        </>
      )}
    </>
  );
}

export default function MainLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <PortfolioProvider>
      <PageContainer>{children}</PageContainer>
    </PortfolioProvider>
  );
}
