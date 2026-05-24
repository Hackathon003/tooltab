"use client";
import { useState } from "react";


import AdSlot from "@/components/AdSlot";



export default function WordCountPage() {
  const [text, setText] = useState("");

  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  const sentences = text.trim() === "" ? 0 : text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
  const paragraphs = text.trim() === "" ? 0 : text.split(/\n+/).filter((p) => p.trim().length > 0).length;
  const readingTime = Math.ceil(words / 200);

  const stats = [
    { label: "Words", value: words },
    { label: "Characters", value: chars },
    { label: "Chars (no spaces)", value: charsNoSpaces },
    { label: "Sentences", value: sentences },
    { label: "Paragraphs", value: paragraphs },
    { label: "Reading Time", value: `${readingTime} min` },
  ];

  return (
    <>
      
      <main className="max-w-4xl mx-auto px-6 py-12 flex-1">
        <h1 className="font-display font-black text-4xl text-[#0f0f0f] mb-2">
          Word Counter
        </h1>
        <p className="text-[#9e9e8f] mb-8">
          Paste or type your text below to instantly count words, characters, sentences, and more.
        </p>

        <AdSlot label="Top Banner" />

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={12}
          placeholder="Start typing or paste your text here..."
          style={{ border: "2px solid #0f0f0f" }}
          className="w-full p-4 rounded font-body text-sm bg-[#f5f2eb] resize-none focus:outline-none focus:border-[#e8500a] mb-6"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              style={{ border: "2px solid #0f0f0f" }}
              className="rounded p-4"
            >
              <div className="font-display font-black text-3xl text-[#e8500a]">
                {stat.value}
              </div>
              <div className="text-xs font-display font-bold uppercase tracking-widest text-[#9e9e8f] mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setText("")}
          style={{ border: "2px solid #0f0f0f" }}
          className="font-display font-bold px-6 py-2 rounded hover:bg-[#0f0f0f] hover:text-[#f5f2eb] transition-colors text-sm"
        >
          Clear
        </button>

        <AdSlot label="Bottom Banner" />
      </main>
      
    </>
  );
}