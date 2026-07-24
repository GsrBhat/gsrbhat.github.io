import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroller from "@/components/layout/SmoothScroller";
import MainLayoutWrapper from "@/components/layout/MainLayoutWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sai Rahul Bhat | VLSI & Full-Stack Engineer",
  description: "Premium cyber-futuristic personal portfolio of Sai Rahul Bhat - Electronics & Communication Engineering student, VLSI Designer, AI Developer, and Full Stack Developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} dark scroll-smooth`}
      style={{ colorScheme: "dark" }}
    >
      <body className={`${inter.className} min-h-screen bg-[#050816] text-[#e8eaf0] overflow-x-hidden selection:bg-[#06B6D4] selection:text-black`}>
        <SmoothScroller>
          <MainLayoutWrapper>
            {children}
          </MainLayoutWrapper>
        </SmoothScroller>
      </body>
    </html>
  );
}
