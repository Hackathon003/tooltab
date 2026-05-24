"use client";
import { useState } from "react";


import AdSlot from "@/components/AdSlot";

export default function Base64Client() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState("");

  function process() {
    setError("");
    try {
      if (mode === "encode") {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input))));
      }
    } catch {
      setError("Invalid input for decoding.");
      setOutput("");
    }
  }

  function swap() {
    setInput(output);
    setOutput("");
    setMode(mode === "encode" ? "decode" : "encode");
  }

  return (
    <>
      
      <main className="max-w-3xl mx-auto px-6 py-12 flex-1">
        <h1 className="font-display font-black text-4xl text-[#0f0f0f] mb-2">Base64 Encoder / Decoder</h1>
        <p className="text-[#9e9e8f] mb-8">Encode or decode Base64 strings instantly.</p>

        <AdSlot label="Top Banner" />

        <div className="flex gap-2 mb-6">
          {(["encode", "decode"] as const).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setOutput(""); setError(""); }}
              className="font-display font-bold px-6 py-2 rounded text-sm uppercase tracking-widest transition-colors"
              style={{ border: "2px solid #0f0f0f", background: mode === m ? "#0f0f0f" : "transparent", color: mode === m ? "#f5f2eb" : "#0f0f0f" }}
            >
              {m}
            </button>
          ))}
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={6}
          placeholder={mode === "encode" ? "Paste text to encode..." : "Paste Base64 to decode..."}
          style={{ border: "2px solid #0f0f0f" }}
          className="w-full p-3 rounded font-mono text-sm bg-[#f5f2eb] resize-none focus:outline-none focus:border-[#e8500a] mb-4"
        />

        <div className="flex gap-3 mb-6">
          <button
            onClick={process}
            className="bg-[#e8500a] text-[#f5f2eb] font-display font-bold px-8 py-3 rounded hover:bg-[#0f0f0f] transition-colors"
          >
            {mode === "encode" ? "Encode" : "Decode"}
          </button>
          {output && (
            <button
              onClick={swap}
              style={{ border: "2px solid #0f0f0f" }}
              className="font-display font-bold px-6 py-3 rounded hover:bg-[#0f0f0f] hover:text-[#f5f2eb] transition-colors"
            >
              Swap
            </button>
          )}
        </div>

        {error && <p className="text-red-600 font-mono text-sm mb-4">{error}</p>}

        {output && (
          <div style={{ border: "2px solid #0f0f0f" }} className="rounded overflow-hidden">
            <div className="bg-[#0f0f0f] text-[#f5f2eb] px-4 py-2 font-display font-bold text-sm uppercase tracking-widest flex justify-between items-center">
              <span>Result</span>
              <button onClick={() => navigator.clipboard.writeText(output)} className="text-xs hover:text-[#e8500a] transition-colors">Copy</button>
            </div>
            <pre className="p-4 font-mono text-sm whitespace-pre-wrap break-all bg-[#f5f2eb]">{output}</pre>
          </div>
        )}

        <AdSlot label="Bottom Banner" />
      </main>
      
    </>
  );
}