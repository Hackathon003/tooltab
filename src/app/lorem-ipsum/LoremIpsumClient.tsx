"use client";
import { useState } from "react";


import AdSlot from "@/components/AdSlot";

const WORDS = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum".split(" ");

function randomWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

function generateSentence() {
  const len = Math.floor(Math.random() * 10) + 8;
  const words = Array.from({ length: len }, randomWord);
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
}

function generateParagraph() {
  const len = Math.floor(Math.random() * 4) + 4;
  return Array.from({ length: len }, generateSentence).join(" ");
}

export default function LoremIpsumPage() {
  const [type, setType] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    let result = "";
    if (type === "paragraphs") {
      result = Array.from({ length: count }, generateParagraph).join("\n\n");
    } else if (type === "sentences") {
      result = Array.from({ length: count }, generateSentence).join(" ");
    } else {
      result = Array.from({ length: count }, randomWord).join(" ");
      result = result.charAt(0).toUpperCase() + result.slice(1) + ".";
    }
    setOutput(result);
    setCopied(false);
  };

  const copy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const TypeBtn = ({ label, value }: { label: string; value: typeof type }) => (
    <button
      onClick={() => setType(value)}
      style={{ border: "2px solid #0f0f0f" }}
      className={`px-4 py-2 rounded text-sm font-display font-bold transition-colors ${
        type === value
          ? "bg-[#0f0f0f] text-[#f5f2eb]"
          : "bg-[#f5f2eb] text-[#0f0f0f] hover:bg-[#e8500a] hover:text-[#f5f2eb]"
      }`}
    >
      {label}
    </button>
  );

  return (
    <>
      
      <main className="max-w-3xl mx-auto px-6 py-12 flex-1">
        <h1 className="font-display font-black text-4xl text-[#0f0f0f] mb-2">
          Lorem Ipsum Generator
        </h1>
        <p className="text-[#9e9e8f] mb-8">
          Generate placeholder text for your designs and mockups instantly.
        </p>

        <AdSlot label="Top Banner" />

        {/* Type selector */}
        <div className="mb-6">
          <p className="font-display font-bold text-sm uppercase tracking-widest mb-3">Generate</p>
          <div className="flex flex-wrap gap-2">
            <TypeBtn label="Paragraphs" value="paragraphs" />
            <TypeBtn label="Sentences" value="sentences" />
            <TypeBtn label="Words" value="words" />
          </div>
        </div>

        {/* Count */}
        <div className="mb-8">
          <label className="font-display font-bold text-sm uppercase tracking-widest mb-2 block">
            Amount: <span className="text-[#e8500a]">{count}</span>
          </label>
          <input
            type="range"
            min={1}
            max={type === "words" ? 200 : type === "sentences" ? 20 : 10}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-full accent-[#e8500a]"
          />
          <div className="flex justify-between text-xs text-[#9e9e8f] mt-1">
            <span>1</span>
            <span>{type === "words" ? 200 : type === "sentences" ? 20 : 10}</span>
          </div>
        </div>

        <button
          onClick={generate}
          className="w-full bg-[#e8500a] text-[#f5f2eb] font-display font-bold py-4 rounded hover:bg-[#0f0f0f] transition-colors text-lg tracking-wide mb-6"
        >
          Generate →
        </button>

        {output && (
          <div style={{ border: "2px solid #0f0f0f" }} className="rounded overflow-hidden mb-8">
            <div className="bg-[#0f0f0f] text-[#f5f2eb] px-4 py-2 font-display font-bold text-sm uppercase tracking-widest flex justify-between items-center">
              <span>Output</span>
              <button
                onClick={copy}
                style={{ border: "1px solid #f5f2eb44" }}
                className="px-3 py-1 rounded text-xs hover:bg-[#f5f2eb] hover:text-[#0f0f0f] transition-colors"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <div className="p-4 font-body text-sm text-[#0f0f0f] leading-relaxed whitespace-pre-wrap">
              {output}
            </div>
          </div>
        )}

        <AdSlot label="Bottom Banner" />
      </main>
      
    </>
  );
}