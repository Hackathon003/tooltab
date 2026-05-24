"use client";
import { useState } from "react";
import AdSlot from "@/components/AdSlot";

const TIMEZONES = [
  { label: "New York (ET)", tz: "America/New_York" },
  { label: "London (GMT)", tz: "Europe/London" },
  { label: "Paris (CET)", tz: "Europe/Paris" },
  { label: "Dubai (GST)", tz: "Asia/Dubai" },
  { label: "Manila (PHT)", tz: "Asia/Manila" },
  { label: "Tokyo (JST)", tz: "Asia/Tokyo" },
  { label: "Sydney (AEDT)", tz: "Australia/Sydney" },
  { label: "Los Angeles (PT)", tz: "America/Los_Angeles" },
  { label: "Chicago (CT)", tz: "America/Chicago" },
  { label: "São Paulo (BRT)", tz: "America/Sao_Paulo" },
];

function getTimeInZone(tz: string, hour: number) {
  const now = new Date();
  now.setHours(hour, 0, 0, 0);
  return now.toLocaleTimeString("en-US", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function getHourInZone(tz: string, hour: number) {
  const now = new Date();
  now.setHours(hour, 0, 0, 0);
  const h = parseInt(
    now.toLocaleTimeString("en-US", { timeZone: tz, hour: "numeric", hour12: false })
  );
  return h;
}

function isWorkHour(h: number) {
  return h >= 9 && h < 18;
}

export default function TimezonePage() {
  const [selected, setSelected] = useState<string[]>(["America/New_York", "Asia/Manila"]);

  const toggle = (tz: string) => {
    setSelected((prev) =>
      prev.includes(tz) ? prev.filter((t) => t !== tz) : [...prev, tz]
    );
  };

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const bestHours = hours.filter((h) =>
    selected.length > 1 && selected.every((tz) => isWorkHour(getHourInZone(tz, h)))
  );

  const selectedZones = TIMEZONES.filter((z) => selected.includes(z.tz));

  return (
    <>
      <main className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-10 sm:py-12 flex-1">
        <h1 className="font-display font-black text-3xl sm:text-4xl text-[#0f0f0f] mb-2">
          Timezone Meeting Planner
        </h1>
        <p className="text-[#9e9e8f] mb-8 text-sm sm:text-base">
          Select timezones and find the best overlap for your meeting (9am–6pm work hours).
        </p>

        <AdSlot label="Top Banner" />

        {/* Zone Picker */}
        <div className="mb-8">
          <p className="font-display font-bold text-sm uppercase tracking-widest mb-3">
            Select Timezones
          </p>
          <div className="flex flex-wrap gap-2">
            {TIMEZONES.map((z) => (
              <button
                key={z.tz}
                onClick={() => toggle(z.tz)}
                style={{ border: "2px solid #0f0f0f" }}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  selected.includes(z.tz)
                    ? "bg-[#0f0f0f] text-[#f5f2eb]"
                    : "bg-[#f5f2eb] text-[#0f0f0f] hover:bg-[#e8500a] hover:text-[#f5f2eb]"
                }`}
              >
                {z.label}
              </button>
            ))}
          </div>
        </div>

        {/* Best Hours */}
        <div style={{ border: "2px solid #0f0f0f" }} className="rounded overflow-hidden mb-8">
          <div className="bg-[#0f0f0f] text-[#f5f2eb] px-4 py-2 font-display font-bold text-sm uppercase tracking-widest">
            Best Meeting Hours (your local time)
          </div>
          <div className="p-4">
            {selected.length < 2 ? (
              <p className="text-[#9e9e8f] text-sm">Select at least 2 timezones to find overlap.</p>
            ) : bestHours.length === 0 ? (
              <p className="text-[#e8500a] font-medium text-sm">No overlap found — try fewer timezones.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {bestHours.map((h) => (
                  <span
                    key={h}
                    style={{ border: "2px solid #e8500a" }}
                    className="px-3 py-1 rounded text-sm font-mono text-[#e8500a] font-bold"
                  >
                    {h === 0 ? "12 AM" : h < 12 ? `${h} AM` : h === 12 ? "12 PM" : `${h - 12} PM`}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 24-Hour Grid */}
        <div style={{ border: "2px solid #0f0f0f" }} className="rounded overflow-hidden mb-8">
          <div className="bg-[#0f0f0f] text-[#f5f2eb] px-4 py-2 font-display font-bold text-sm uppercase tracking-widest">
            24-Hour Grid
          </div>
          {/* Mobile scroll hint */}
          <p className="sm:hidden text-xs text-[#9e9e8f] px-4 pt-2">← Scroll sideways to see all hours</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-mono" style={{ minWidth: "900px" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #0f0f0f" }}>
                  <th className="px-4 py-2 text-left font-display font-bold text-xs uppercase tracking-widest sticky left-0 bg-[#f5f2eb]">
                    Zone
                  </th>
                  {hours.map((h) => (
                    <th
                      key={h}
                      className={`px-1 py-2 text-center text-xs ${
                        bestHours.includes(h) ? "text-[#e8500a] font-bold" : "text-[#9e9e8f]"
                      }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {selectedZones.map((z) => (
                  <tr key={z.tz} style={{ borderBottom: "1px solid #0f0f0f22" }}>
                    <td className="px-4 py-2 font-display font-bold text-xs whitespace-nowrap sticky left-0 bg-[#f5f2eb]">
                      {z.label}
                    </td>
                    {hours.map((h) => {
                      const localH = getHourInZone(z.tz, h);
                      const work = isWorkHour(localH);
                      return (
                        <td
                          key={h}
                          className={`px-1 py-2 text-center text-xs ${
                            work ? "bg-green-50 text-green-700" : "text-[#9e9e8f]"
                          } ${bestHours.includes(h) ? "bg-green-100" : ""}`}
                        >
                          {getTimeInZone(z.tz, h)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <AdSlot label="Bottom Banner" />
      </main>
    </>
  );
}