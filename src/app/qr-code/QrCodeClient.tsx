"use client";
import { useState } from "react";


import AdSlot from "@/components/AdSlot";

export default function QrCodeClient() {
  const [input, setInput] = useState("https://tooltab.xyz");
  const [value, setValue] = useState("https://tooltab.xyz");
  const [size, setSize] = useState(256);

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(value)}`;

  function generate() {
    setValue(input);
  }

  function download() {
    const a = document.createElement("a");
    a.href = qrUrl + "&format=png";
    a.download = "qrcode.png";
    a.click();
  }

  return (
    <>
      
      <main className="max-w-3xl mx-auto px-6 py-12 flex-1">
        <h1 className="font-display font-black text-4xl text-[#0f0f0f] mb-2">QR Code Generator</h1>
        <p className="text-[#9e9e8f] mb-8">Generate a QR code from any URL or text.</p>

        <AdSlot label="Top Banner" />

        <div className="space-y-4 mb-6">
          <div>
            <label className="block font-display font-bold text-sm mb-2 uppercase tracking-widest">URL or Text</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={3}
              placeholder="https://example.com"
              style={{ border: "2px solid #0f0f0f" }}
              className="w-full p-3 rounded font-mono text-sm bg-[#f5f2eb] resize-none focus:outline-none focus:border-[#e8500a]"
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="font-display font-bold text-sm uppercase tracking-widest">Size</label>
            <div className="flex gap-2">
              {[128, 256, 512].map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className="font-display font-bold px-4 py-2 rounded text-sm transition-colors"
                  style={{ border: "2px solid #0f0f0f", background: size === s ? "#0f0f0f" : "transparent", color: size === s ? "#f5f2eb" : "#0f0f0f" }}
                >
                  {s}px
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={generate}
            className="bg-[#e8500a] text-[#f5f2eb] font-display font-bold px-8 py-3 rounded hover:bg-[#0f0f0f] transition-colors"
          >
            Generate
          </button>
        </div>

        {value && (
          <div style={{ border: "2px solid #0f0f0f" }} className="rounded overflow-hidden">
            <div className="bg-[#0f0f0f] text-[#f5f2eb] px-4 py-2 font-display font-bold text-sm uppercase tracking-widest flex justify-between items-center">
              <span>QR Code</span>
              <button onClick={download} className="text-xs hover:text-[#e8500a] transition-colors">Download PNG</button>
            </div>
            <div className="p-8 flex justify-center bg-white">
              <img src={qrUrl} alt="QR Code" width={size} height={size} />
            </div>
          </div>
        )}

        <AdSlot label="Bottom Banner" />
      </main>
      
    </>
  );
}