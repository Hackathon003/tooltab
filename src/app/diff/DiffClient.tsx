"use client";
import { useState } from "react";


import AdSlot from "@/components/AdSlot";



function computeDiff(a: string, b: string) {
  const aLines = a.split("\n");
  const bLines = b.split("\n");
  const maxLen = Math.max(aLines.length, bLines.length);
  const result = [];
  for (let i = 0; i < maxLen; i++) {
    const aLine = aLines[i] ?? null;
    const bLine = bLines[i] ?? null;
    if (aLine === bLine) {
      result.push({ type: "same", aLine, bLine });
    } else {
      result.push({ type: "changed", aLine, bLine });
    }
  }
  return result;
}

export default function DiffPage() {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");
  const [compared, setCompared] = useState(false);

  const diff = computeDiff(left, right);

  return (
    <>
      
      <main className="max-w-5xl mx-auto px-6 py-12 flex-1">
        <h1 className="font-display font-black text-4xl text-[#0f0f0f] mb-2">Text Diff Checker</h1>
        <p className="text-[#9e9e8f] mb-8">Paste two texts and compare them line by line.</p>

        <AdSlot label="Top Banner" />

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block font-display font-bold text-sm mb-2 uppercase tracking-widest">Original</label>
            <textarea
              value={left}
              onChange={(e) => { setLeft(e.target.value); setCompared(false); }}
              rows={10}
              placeholder="Paste original text..."
              style={{ border: "2px solid #0f0f0f" }}
              className="w-full p-3 rounded font-mono text-sm bg-[#f5f2eb] resize-none focus:outline-none focus:border-[#e8500a]"
            />
          </div>
          <div>
            <label className="block font-display font-bold text-sm mb-2 uppercase tracking-widest">Modified</label>
            <textarea
              value={right}
              onChange={(e) => { setRight(e.target.value); setCompared(false); }}
              rows={10}
              placeholder="Paste modified text..."
              style={{ border: "2px solid #0f0f0f" }}
              className="w-full p-3 rounded font-mono text-sm bg-[#f5f2eb] resize-none focus:outline-none focus:border-[#e8500a]"
            />
          </div>
        </div>

        <button
          onClick={() => setCompared(true)}
          className="bg-[#e8500a] text-[#f5f2eb] font-display font-bold px-8 py-3 rounded hover:bg-[#0f0f0f] transition-colors mb-8"
        >
          Compare →
        </button>

        {compared && (
          <div style={{ border: "2px solid #0f0f0f" }} className="rounded overflow-hidden">
            <div className="bg-[#0f0f0f] text-[#f5f2eb] px-4 py-2 font-display font-bold text-sm uppercase tracking-widest">
              Result
            </div>
            <div className="font-mono text-sm divide-y divide-[#0f0f0f]/10">
              {diff.map((row, i) => (
                <div key={i} className={`grid grid-cols-2 ${row.type === "changed" ? "" : ""}`}>
                  <div className={`px-4 py-2 ${row.type === "changed" ? "bg-red-50 text-red-700" : "text-[#0f0f0f]"}`}>
                    {row.aLine ?? <span className="text-[#9e9e8f] italic">—</span>}
                  </div>
                  <div className={`px-4 py-2 border-l border-[#0f0f0f]/10 ${row.type === "changed" ? "bg-green-50 text-green-700" : "text-[#0f0f0f]"}`}>
                    {row.bLine ?? <span className="text-[#9e9e8f] italic">—</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <AdSlot label="Bottom Banner" />
      </main>
      
    </>
  );
}