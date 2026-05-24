"use client";
import { useState } from "react";


import AdSlot from "@/components/AdSlot";

function generatePassword(length: number, opts: {
  upper: boolean; lower: boolean; numbers: boolean; symbols: boolean;
}) {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  let pool = "";
  if (opts.upper) pool += upper;
  if (opts.lower) pool += lower;
  if (opts.numbers) pool += numbers;
  if (opts.symbols) pool += symbols;
  if (!pool) return "";

  return Array.from({ length }, () => pool[Math.floor(Math.random() * pool.length)]).join("");
}

function getStrength(password: string) {
  if (!password) return { label: "—", color: "#9e9e8f", width: "0%" };
  const score = [
    password.length >= 12,
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length;

  if (score <= 2) return { label: "Weak", color: "#e8500a", width: "33%" };
  if (score <= 3) return { label: "Fair", color: "#f0a500", width: "66%" };
  return { label: "Strong", color: "#22c55e", width: "100%" };
}

export default function PasswordPage() {
  const [length, setLength] = useState(16);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    setPassword(generatePassword(length, { upper, lower, numbers, symbols }));
    setCopied(false);
  };

  const copy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const strength = getStrength(password);

  const Toggle = ({ label, value, onChange }: { label: string; value: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      style={{ border: "2px solid #0f0f0f" }}
      className={`px-4 py-2 rounded text-sm font-display font-bold transition-colors ${
        value ? "bg-[#0f0f0f] text-[#f5f2eb]" : "bg-[#f5f2eb] text-[#0f0f0f] hover:bg-[#e8500a] hover:text-[#f5f2eb]"
      }`}
    >
      {label}
    </button>
  );

  return (
    <>
      
      <main className="max-w-2xl mx-auto px-6 py-12 flex-1">
        <h1 className="font-display font-black text-4xl text-[#0f0f0f] mb-2">
          Password Generator
        </h1>
        <p className="text-[#9e9e8f] mb-8">
          Generate a strong, random password instantly.
        </p>

        <AdSlot label="Top Banner" />

        {/* Output */}
        <div style={{ border: "2px solid #0f0f0f" }} className="rounded overflow-hidden mb-6">
          <div className="bg-[#0f0f0f] text-[#f5f2eb] px-4 py-2 font-display font-bold text-sm uppercase tracking-widest">
            Your Password
          </div>
          <div className="flex items-center gap-3 px-4 py-4">
            <span className="font-mono text-lg flex-1 break-all text-[#0f0f0f]">
              {password || <span className="text-[#9e9e8f]">Click Generate →</span>}
            </span>
            <button
              onClick={copy}
              style={{ border: "2px solid #0f0f0f" }}
              className="px-3 py-1 rounded text-sm font-display font-bold hover:bg-[#0f0f0f] hover:text-[#f5f2eb] transition-colors whitespace-nowrap"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          {/* Strength bar */}
          <div className="px-4 pb-4">
            <div className="flex justify-between text-xs font-display font-bold uppercase tracking-widest mb-1">
              <span className="text-[#9e9e8f]">Strength</span>
              <span style={{ color: strength.color }}>{strength.label}</span>
            </div>
            <div style={{ border: "1px solid #0f0f0f22" }} className="w-full h-2 rounded-full overflow-hidden bg-[#f5f2eb]">
              <div
                style={{ width: strength.width, backgroundColor: strength.color, transition: "width 0.3s" }}
                className="h-full rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Length */}
        <div className="mb-6">
          <label className="font-display font-bold text-sm uppercase tracking-widest mb-2 block">
            Length: <span className="text-[#e8500a]">{length}</span>
          </label>
          <input
            type="range"
            min={6}
            max={64}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-[#e8500a]"
          />
          <div className="flex justify-between text-xs text-[#9e9e8f] mt-1">
            <span>6</span><span>64</span>
          </div>
        </div>

        {/* Options */}
        <div className="mb-8">
          <p className="font-display font-bold text-sm uppercase tracking-widest mb-3">Include</p>
          <div className="flex flex-wrap gap-2">
            <Toggle label="Uppercase (A-Z)" value={upper} onChange={() => setUpper(!upper)} />
            <Toggle label="Lowercase (a-z)" value={lower} onChange={() => setLower(!lower)} />
            <Toggle label="Numbers (0-9)" value={numbers} onChange={() => setNumbers(!numbers)} />
            <Toggle label="Symbols (!@#)" value={symbols} onChange={() => setSymbols(!symbols)} />
          </div>
        </div>

        <button
          onClick={generate}
          className="w-full bg-[#e8500a] text-[#f5f2eb] font-display font-bold py-4 rounded hover:bg-[#0f0f0f] transition-colors text-lg tracking-wide"
        >
          Generate Password →
        </button>

        <AdSlot label="Bottom Banner" />
      </main>
      
    </>
  );
}