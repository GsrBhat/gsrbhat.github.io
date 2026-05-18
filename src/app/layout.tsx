import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroller from "@/components/layout/SmoothScroller";
import CustomCursor from "@/components/ui/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SAI | Future VLSI Engineer & Semiconductor Innovator",
  description: "Next-generation personal portfolio of SAI - FPGA Developer, Signal Processing Enthusiast, and Semiconductor Innovator.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} dark`}
      style={{ colorScheme: "dark" }}
    >
      <body className={`${inter.className} min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-black`}>
        <SmoothScroller>
          <CustomCursor />
          {children}
        </SmoothScroller>
      </body>
    </html>
  );
}
