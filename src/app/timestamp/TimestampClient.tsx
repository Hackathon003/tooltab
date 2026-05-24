"use client";
import { useState } from "react";


import AdSlot from "@/components/AdSlot";

export default function TimestampClient() {
  const [unix, setUnix] = useState("");
  const [human, setHuman] = useState("");
  const [unixResult, setUnixResult] = useState("");
  const [humanResult, setHumanResult] = useState("");

  function convertToHuman() {
    const ts = parseInt(unix);
    if (isNaN(ts)) return;
    const d = new Date(ts * 1000);
    setHumanResult(d.toUTCString());
  }

  function convertToUnix() {
    const d = new Date(human);
    if (isNaN(d.getTime())) return;
    setUnixResult(String(Math.floor(d.getTime() / 1000)));
  }

  function now() {
    setUnix(String(Math.floor(Date.now() / 1000)));
    setHumanResult("");
  }

  return (
    <>
      
      <main className="max-w-3xl mx-auto px-6 py-12 flex-1">
        <h1 className="font-display font-black text-4xl text-[#0f0f0f] mb-2">Timestamp Converter</h1>
        <p className="text-[#9e9e8f] mb-8">Convert Unix timestamps to dates and back.</p>

        <AdSlot label="Top Banner" />

        <div className="space-y-6">
          <div style={{ border: "2px solid #0f0f0f" }} className="rounded overflow-hidden">
            <div className="bg-[#0f0f0f] text-[#f5f2eb] px-4 py-2 font-display font-bold text-sm uppercase tracking-widest">
              Unix Timestamp to Date
            </div>
            <div className="p-6 space-y-4">
              <div className="flex gap-3">
                <input
                  type="number"
                  value={unix}
                  onChange={(e) => setUnix(e.target.value)}
                  placeholder="e.g. 1700000000"
                  style={{ border: "2px solid #0f0f0f" }}
                  className="flex-1 px-3 py-2 rounded font-mono text-sm bg-[#f5f2eb] focus:outline-none focus:border-[#e8500a]"
                />
                <button
                  onClick={now}
                  style={{ border: "2px solid #0f0f0f" }}
                  className="font-display font-bold px-4 py-2 rounded hover:bg-[#0f0f0f] hover:text-[#f5f2eb] transition-colors text-sm"
                >
                  Now
                </button>
                <button
                  onClick={convertToHuman}
                  className="bg-[#e8500a] text-[#f5f2eb] font-display font-bold px-6 py-2 rounded hover:bg-[#0f0f0f] transition-colors text-sm"
                >
                  Convert
                </button>
              </div>
              {humanResult && (
                <div className="font-mono text-sm bg-[#f5f2eb] px-4 py-3 rounded">
                  {humanResult}
                </div>
              )}
            </div>
          </div>

          <div style={{ border: "2px solid #0f0f0f" }} className="rounded overflow-hidden">
            <div className="bg-[#0f0f0f] text-[#f5f2eb] px-4 py-2 font-display font-bold text-sm uppercase tracking-widest">
              Date to Unix Timestamp
            </div>
            <div className="p-6 space-y-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={human}
                  onChange={(e) => setHuman(e.target.value)}
                  placeholder="e.g. 2024-01-15 or Jan 15 2024"
                  style={{ border: "2px solid #0f0f0f" }}
                  className="flex-1 px-3 py-2 rounded font-mono text-sm bg-[#f5f2eb] focus:outline-none focus:border-[#e8500a]"
                />
                <button
                  onClick={convertToUnix}
                  className="bg-[#e8500a] text-[#f5f2eb] font-display font-bold px-6 py-2 rounded hover:bg-[#0f0f0f] transition-colors text-sm"
                >
                  Convert
                </button>
              </div>
              {unixResult && (
                <div className="font-mono text-sm bg-[#f5f2eb] px-4 py-3 rounded">
                  {unixResult}
                </div>
              )}
            </div>
          </div>
        </div>

        <AdSlot label="Bottom Banner" />
      </main>
      
    </>
  );
}