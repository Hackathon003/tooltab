"use client";
import { useState } from "react";


import AdSlot from "@/components/AdSlot";

function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function UuidClient() {
  const [uuids, setUuids] = useState<string[]>([generateUUID()]);
  const [count, setCount] = useState(1);
  const [copied, setCopied] = useState(false);

  function generate() {
    const result = Array.from({ length: count }, () => generateUUID());
    setUuids(result);
    setCopied(false);
  }

  function copyAll() {
    navigator.clipboard.writeText(uuids.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      
      <main className="max-w-3xl mx-auto px-6 py-12 flex-1">
        <h1 className="font-display font-black text-4xl text-[#0f0f0f] mb-2">UUID Generator</h1>
        <p className="text-[#9e9e8f] mb-8">Generate random version 4 UUIDs instantly.</p>

        <AdSlot label="Top Banner" />

        <div className="flex items-center gap-4 mb-6">
          <label className="font-display font-bold text-sm uppercase tracking-widest">How many?</label>
          <input
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Math.min(100, Math.max(1, Number(e.target.value))))}
            style={{ border: "2px solid #0f0f0f" }}
            className="w-24 px-3 py-2 rounded font-mono text-sm bg-[#f5f2eb] focus:outline-none focus:border-[#e8500a]"
          />
          <button
            onClick={generate}
            className="bg-[#e8500a] text-[#f5f2eb] font-display font-bold px-8 py-3 rounded hover:bg-[#0f0f0f] transition-colors"
          >
            Generate
          </button>
          <button
            onClick={copyAll}
            className="font-display font-bold px-6 py-3 rounded transition-colors"
            style={{ border: "2px solid #0f0f0f" }}
          >
            {copied ? "Copied!" : "Copy All"}
          </button>
        </div>

        <div style={{ border: "2px solid #0f0f0f" }} className="rounded overflow-hidden">
          <div className="bg-[#0f0f0f] text-[#f5f2eb] px-4 py-2 font-display font-bold text-sm uppercase tracking-widest">
            Result
          </div>
          <div className="divide-y divide-[#0f0f0f]/10">
            {uuids.map((uuid, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-3 font-mono text-sm">
                <span>{uuid}</span>
                <button
                  onClick={() => navigator.clipboard.writeText(uuid)}
                  className="text-[#9e9e8f] hover:text-[#e8500a] text-xs font-display font-bold uppercase tracking-widest transition-colors ml-4"
                >
                  Copy
                </button>
              </div>
            ))}
          </div>
        </div>

        <AdSlot label="Bottom Banner" />
      </main>
      
    </>
  );
}