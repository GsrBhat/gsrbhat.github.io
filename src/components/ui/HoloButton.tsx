"use client";

import { useRef, useState } from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { cn } from "@/lib/utils";

type BaseProps = {
  children: React.ReactNode;
  className?: string;
  glowColor?: "primary" | "secondary" | "accent";
};

type ButtonProps = BaseProps & HTMLMotionProps<"button"> & { href?: undefined; download?: undefined; target?: undefined };
type AnchorProps = BaseProps & HTMLMotionProps<"a"> & { href: string; download?: string | boolean; target?: string };

type HoloButtonProps = ButtonProps | AnchorProps;

export default function HoloButton({
  children,
  className,
  glowColor = "primary",
  ...props
}: HoloButtonProps) {
  const buttonRef = useRef<HTMLElement>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setHoverPosition({ x, y });
  };

  const glowColorMap = {
    primary: "rgba(16, 185, 129, 0.6)",
    secondary: "rgba(139, 92, 246, 0.6)",
    accent: "rgba(245, 158, 11, 0.6)",
  };

  const commonProps = {
    "data-hover": "true",
    onMouseMove: handleMouseMove,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    className: cn(
      "relative inline-block overflow-hidden px-8 py-3 rounded-md font-medium text-sm transition-all duration-300",
      "bg-black/50 border border-white/10 backdrop-blur-md",
      "text-white shadow-[0_0_15px_rgba(0,0,0,0.5)] cursor-pointer group",
      className
    ),
  };

  const content = (
    <>
      <div className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </div>

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 z-0 opacity-0 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${hoverPosition.x}px ${hoverPosition.y}px, ${glowColorMap[glowColor]}, transparent 70%)`,
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      />
      
      {/* Animated border */}
      <div className={`absolute inset-0 z-0 border border-transparent rounded-md group-hover:border-${glowColor}/50 transition-colors duration-300 pointer-events-none`} />
    </>
  );

  if (props.href) {
    return (
      <motion.a 
        ref={buttonRef as any}
        {...commonProps} 
        {...(props as AnchorProps)}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button 
      ref={buttonRef as any}
      {...commonProps} 
      {...(props as ButtonProps)}
    >
      {content}
    </motion.button>
  );
}
