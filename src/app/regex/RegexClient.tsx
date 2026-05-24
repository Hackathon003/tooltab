"use client";
import { useState, useMemo } from "react";


import AdSlot from "@/components/AdSlot";

export default function RegexClient() {
  const [pattern, setPattern] = useState("\\b\\w+@\\w+\\.\\w+\\b");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("Contact us at hello@Tooltab.com or support@example.org for help.");
  const [error, setError] = useState("");

  const { matches, highlighted } = useMemo(() => {
    setError("");
    if (!pattern) return { matches: [], highlighted: text };
    try {
      const re = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
      const found: string[] = [];
      let m;
      const re2 = new RegExp(pattern, "g" + flags.replace("g", ""));
      while ((m = re2.exec(text)) !== null) {
        found.push(m[0]);
        if (!flags.includes("g")) break;
      }
      const highlighted = text.replace(re, (match) =>
        `<mark style="background:#e8500a22;color:#e8500a;border-radius:2px;padding:0 2px;">${match}</mark>`
      );
      return { matches: found, highlighted };
    } catch (e: unknown) {
      if (e instanceof Error) setError(e.message);
      return { matches: [], highlighted: text };
    }
  }, [pattern, flags, text]);

  const allFlags = ["g", "i", "m", "s"];

  function toggleFlag(f: string) {
    setFlags((prev) => prev.includes(f) ? prev.replace(f, "") : prev + f);
  }

  return (
    <>
      
      <main className="max-w-3xl mx-auto px-6 py-12 flex-1">
        <h1 className="font-display font-black text-4xl text-[#0f0f0f] mb-2">Regex Tester</h1>
        <p className="text-[#9e9e8f] mb-8">Test regular expressions against your text in real time.</p>

        <AdSlot label="Top Banner" />

        <div className="space-y-4 mb-6">
          <div>
            <label className="block font-display font-bold text-sm mb-2 uppercase tracking-widest">Pattern</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="Enter regex pattern..."
                style={{ border: "2px solid #0f0f0f" }}
                className="flex-1 px-3 py-2 rounded font-mono text-sm bg-[#f5f2eb] focus:outline-none focus:border-[#e8500a]"
              />
              <div className="flex gap-1">
                {allFlags.map((f) => (
                  <button
                    key={f}
                    onClick={() => toggleFlag(f)}
                    className="w-9 h-9 rounded font-mono text-sm font-bold transition-colors"
                    style={{ border: "2px solid #0f0f0f", background: flags.includes(f) ? "#0f0f0f" : "transparent", color: flags.includes(f) ? "#f5f2eb" : "#0f0f0f" }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            {error && <p className="text-red-600 font-mono text-xs mt-1">{error}</p>}
          </div>

          <div>
            <label className="block font-display font-bold text-sm mb-2 uppercase tracking-widest">Test String</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={6}
              style={{ border: "2px solid #0f0f0f" }}
              className="w-full p-3 rounded font-mono text-sm bg-[#f5f2eb] resize-none focus:outline-none focus:border-[#e8500a]"
            />
          </div>
        </div>

        <div style={{ border: "2px solid #0f0f0f" }} className="rounded overflow-hidden mb-4">
          <div className="bg-[#0f0f0f] text-[#f5f2eb] px-4 py-2 font-display font-bold text-sm uppercase tracking-widest flex justify-between">
            <span>Highlighted</span>
            <span className="text-[#e8500a]">{matches.length} match{matches.length !== 1 ? "es" : ""}</span>
          </div>
          <div
            className="p-4 font-mono text-sm leading-relaxed bg-[#f5f2eb]"
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        </div>

        {matches.length > 0 && (
          <div style={{ border: "2px solid #0f0f0f" }} className="rounded overflow-hidden">
            <div className="bg-[#0f0f0f] text-[#f5f2eb] px-4 py-2 font-display font-bold text-sm uppercase tracking-widest">Matches</div>
            <div className="divide-y divide-[#0f0f0f]/10">
              {matches.map((m, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-2 font-mono text-sm">
                  <span><span className="text-[#9e9e8f] mr-3">{i + 1}</span>{m}</span>
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