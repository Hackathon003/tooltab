"use client";
import { useState } from "react";


import AdSlot from "@/components/AdSlot";

const categories = {
  Length: {
    units: ["Meter", "Kilometer", "Mile", "Yard", "Foot", "Inch", "Centimeter", "Millimeter"],
    toBase: { Meter: 1, Kilometer: 1000, Mile: 1609.344, Yard: 0.9144, Foot: 0.3048, Inch: 0.0254, Centimeter: 0.01, Millimeter: 0.001 },
  },
  Weight: {
    units: ["Kilogram", "Gram", "Pound", "Ounce", "Ton"],
    toBase: { Kilogram: 1, Gram: 0.001, Pound: 0.453592, Ounce: 0.0283495, Ton: 1000 },
  },
  Temperature: {
    units: ["Celsius", "Fahrenheit", "Kelvin"],
    toBase: {} as Record<string, number>,
  },
  Speed: {
    units: ["m/s", "km/h", "mph", "knot"],
    toBase: { "m/s": 1, "km/h": 0.277778, "mph": 0.44704, "knot": 0.514444 },
  },
  Area: {
    units: ["m²", "km²", "ft²", "acre", "hectare"],
    toBase: { "m²": 1, "km²": 1e6, "ft²": 0.092903, "acre": 4046.86, "hectare": 10000 },
  },
} as const;

type Category = keyof typeof categories;

function convert(value: number, from: string, to: string, category: Category): number {
  if (category === "Temperature") {
    let celsius = value;
    if (from === "Fahrenheit") celsius = (value - 32) * 5 / 9;
    if (from === "Kelvin") celsius = value - 273.15;
    if (to === "Celsius") return celsius;
    if (to === "Fahrenheit") return celsius * 9 / 5 + 32;
    return celsius + 273.15;
  }
  const toBase = categories[category].toBase as Record<string, number>;
  return (value * toBase[from]) / toBase[to];
}

export default function UnitConverterClient() {
  const [category, setCategory] = useState<Category>("Length");
  const [value, setValue] = useState("1");
  const [from, setFrom] = useState<string>(categories["Length"].units[0]);
  const [to, setTo] = useState<string>(categories["Length"].units[1]);

  const units = categories[category].units as readonly string[];
  const result = !isNaN(Number(value)) ? convert(Number(value), from, to, category) : null;

  function handleCategory(cat: Category) {
    setCategory(cat);
    setFrom(categories[cat].units[0]);
    setTo(categories[cat].units[1]);
  }

  return (
    <>
      
      <main className="max-w-3xl mx-auto px-6 py-12 flex-1">
        <h1 className="font-display font-black text-4xl text-[#0f0f0f] mb-2">Unit Converter</h1>
        <p className="text-[#9e9e8f] mb-8">Convert between common units of measurement.</p>

        <AdSlot label="Top Banner" />

        <div className="flex flex-wrap gap-2 mb-6">
          {(Object.keys(categories) as Category[]).map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategory(cat)}
              className="font-display font-bold px-4 py-2 rounded text-sm uppercase tracking-widest transition-colors"
              style={{ border: "2px solid #0f0f0f", background: category === cat ? "#0f0f0f" : "transparent", color: category === cat ? "#f5f2eb" : "#0f0f0f" }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={{ border: "2px solid #0f0f0f" }} className="rounded overflow-hidden mb-6">
          <div className="bg-[#0f0f0f] text-[#f5f2eb] px-4 py-2 font-display font-bold text-sm uppercase tracking-widest">
            Convert
          </div>
          <div className="p-6 space-y-4">
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              style={{ border: "2px solid #0f0f0f" }}
              className="w-full px-3 py-3 rounded font-mono text-lg bg-[#f5f2eb] focus:outline-none focus:border-[#e8500a]"
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-display font-bold text-xs uppercase tracking-widest mb-2">From</label>
                <select
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  style={{ border: "2px solid #0f0f0f" }}
                  className="w-full px-3 py-2 rounded font-mono text-sm bg-[#f5f2eb] focus:outline-none"
                >
                  {units.map((u) => <option key={u}>{u}</option>)}
                </select>
              </div>
              <div>
                <label className="block font-display font-bold text-xs uppercase tracking-widest mb-2">To</label>
                <select
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  style={{ border: "2px solid #0f0f0f" }}
                  className="w-full px-3 py-2 rounded font-mono text-sm bg-[#f5f2eb] focus:outline-none"
                >
                  {units.map((u) => <option key={u}>{u}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>

        {result !== null && (
          <div style={{ border: "2px solid #0f0f0f" }} className="rounded overflow-hidden">
            <div className="bg-[#0f0f0f] text-[#f5f2eb] px-4 py-2 font-display font-bold text-sm uppercase tracking-widest">Result</div>
            <div className="p-6 font-mono text-2xl">
              {value} {from} = <span className="text-[#e8500a] font-bold">{parseFloat(result.toPrecision(8))} {to}</span>
            </div>
          </div>
        )}

        <AdSlot label="Bottom Banner" />
      </main>
      
    </>
  );
}