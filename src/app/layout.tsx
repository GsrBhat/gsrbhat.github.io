import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroller from "@/components/layout/SmoothScroller";
import CustomCursor from "@/components/ui/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sai Rahul Bhat | VLSI Design & RTL Engineer",
  description: "Premium personal portfolio of Sai Rahul Bhat - Electronics & Communication Engineering student passionate about VLSI Design, Semiconductor Technology, RTL Design, and Digital Systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} dark`}
      style={{ colorScheme: "dark" }}
    >
      <body className={`${inter.className} min-h-screen bg-[#050816] text-[#e8eaf0] overflow-x-hidden selection:bg-primary selection:text-black`}>
        <SmoothScroller>
          <CustomCursor />
          {children}
        </SmoothScroller>
      </body>
    </html>
  );
}

