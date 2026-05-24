"use client";
import { useState } from "react";


import AdSlot from "@/components/AdSlot";

export default function JsonFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError("");
    } catch (e: any) {
      setError(e.message);
      setOutput("");
    }
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch (e: any) {
      setError(e.message);
      setOutput("");
    }
  };

  const copy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      
      <main className="max-w-5xl mx-auto px-6 py-12 flex-1">
        <h1 className="font-display font-black text-4xl text-[#0f0f0f] mb-2">
          JSON Formatter
        </h1>
        <p className="text-[#9e9e8f] mb-8">
          Paste your JSON below to format, validate, or minify it instantly.
        </p>

        <AdSlot label="Top Banner" />

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block font-display font-bold text-sm uppercase tracking-widest mb-2">
              Input
            </label>
            <textarea
              value={input}
              onChange={(e) => { setInput(e.target.value); setError(""); setOutput(""); }}
              rows={16}
              placeholder='Paste JSON here... e.g. {"name":"John","age":30}'
              style={{ border: "2px solid #0f0f0f" }}
              className="w-full p-3 rounded font-mono text-sm bg-[#f5f2eb] resize-none focus:outline-none focus:border-[#e8500a]"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block font-display font-bold text-sm uppercase tracking-widest">
                Output
              </label>
              <button
                onClick={copy}
                style={{ border: "2px solid #0f0f0f" }}
                className="px-3 py-1 rounded text-xs font-display font-bold hover:bg-[#0f0f0f] hover:text-[#f5f2eb] transition-colors"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <textarea
              value={output}
              readOnly
              rows={16}
              placeholder="Formatted output will appear here..."
              style={{ border: "2px solid #0f0f0f" }}
              className="w-full p-3 rounded font-mono text-sm bg-[#f5f2eb] resize-none focus:outline-none text-[#0f0f0f]"
            />
          </div>
        </div>

        {error && (
          <div style={{ border: "2px solid #e8500a" }} className="rounded px-4 py-3 mb-6 text-[#e8500a] font-mono text-sm">
            ❌ {error}
          </div>
        )}

        <div className="flex gap-3 mb-8">
          <button
            onClick={format}
            className="bg-[#e8500a] text-[#f5f2eb] font-display font-bold px-8 py-3 rounded hover:bg-[#0f0f0f] transition-colors"
          >
            Format →
          </button>
          <button
            onClick={minify}
            style={{ border: "2px solid #0f0f0f" }}
            className="font-display font-bold px-8 py-3 rounded hover:bg-[#0f0f0f] hover:text-[#f5f2eb] transition-colors"
          >
            Minify
          </button>
        </div>

        <AdSlot label="Bottom Banner" />
      </main>
      
    </>
  );
}