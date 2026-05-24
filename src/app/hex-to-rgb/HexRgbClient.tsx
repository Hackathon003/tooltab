"use client";
import { useState } from "react";


import AdSlot from "@/components/AdSlot";

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const full = clean.length === 3
    ? clean.split("").map((c) => c + c).join("")
    : clean;
  const num = parseInt(full, 16);
  if (isNaN(num)) return null;
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

function rgbToHsl(r: number, g: number, b: number) {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn: h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6; break;
      case gn: h = ((bn - rn) / d + 2) / 6; break;
      case bn: h = ((rn - gn) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export default function HexRgbClient() {
  const [hex, setHex] = useState("#e8500a");
  const rgb = hexToRgb(hex);
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;

  function copy(text: string) {
    navigator.clipboard.writeText(text);
  }

  return (
    <>
      
      <main className="max-w-3xl mx-auto px-6 py-12 flex-1">
        <h1 className="font-display font-black text-4xl text-[#0f0f0f] mb-2">HEX to RGB Converter</h1>
        <p className="text-[#9e9e8f] mb-8">Convert HEX color codes to RGB and HSL values.</p>

        <AdSlot label="Top Banner" />

        <div className="flex gap-4 items-center mb-8">
          <input
            type="color"
            value={rgb ? hex : "#000000"}
            onChange={(e) => setHex(e.target.value)}
            className="w-16 h-16 rounded cursor-pointer"
            style={{ border: "2px solid #0f0f0f" }}
          />
          <input
            type="text"
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            placeholder="#e8500a"
            style={{ border: "2px solid #0f0f0f" }}
            className="flex-1 px-3 py-3 rounded font-mono text-lg bg-[#f5f2eb] focus:outline-none focus:border-[#e8500a] uppercase"
          />
        </div>

        {rgb && hsl ? (
          <div className="space-y-3">
            {[
              { label: "HEX", value: hex.toUpperCase() },
              { label: "RGB", value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
              { label: "HSL", value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
              { label: "RGB Raw", value: `${rgb.r}, ${rgb.g}, ${rgb.b}` },
            ].map(({ label, value }) => (
              <div key={label} style={{ border: "2px solid #0f0f0f" }} className="rounded overflow-hidden flex items-center">
                <div className="bg-[#0f0f0f] text-[#f5f2eb] px-4 py-3 font-display font-bold text-sm uppercase tracking-widest w-24 shrink-0">
                  {label}
                </div>
                <div className="flex-1 px-4 font-mono text-sm">{value}</div>
                <button
                  onClick={() => copy(value)}
                  className="px-4 py-3 text-[#9e9e8f] hover:text-[#e8500a] font-display font-bold text-xs uppercase tracking-widest transition-colors"
                >
                  Copy
                </button>
              </div>
            ))}

            <div
              className="mt-6 rounded h-24"
              style={{ background: hex, border: "2px solid #0f0f0f" }}
            />
          </div>
        ) : (
          <p className="text-red-600 font-mono text-sm">Invalid HEX color.</p>
        )}

        <AdSlot label="Bottom Banner" />
      </main>
      
    </>
  );
}