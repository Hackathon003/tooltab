import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Tooltab — Free Online Tools",
  description: "Fast, free online tools. Text diff checker, timezone planner, and more.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-paper text-ink font-body">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}