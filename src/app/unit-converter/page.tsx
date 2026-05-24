import { generateToolMetadata, buildToolJsonLd } from "@/lib/generateToolMetadata";
import UnitConverterClient from "./UnitConverterClient";

const OPTIONS = {
  title: "Unit Converter",
  slug: "unit-converter",
  description:
    "Convert between length, weight, temperature, area, speed, and more units instantly. Free online unit converter with 100+ unit types. No ads, no signup.",
  keywords: [
    "online unit converter",
    "length converter",
    "weight converter",
    "temperature converter",
    "metric to imperial converter",
    "measurement converter online",
  ],
  featureList: [
    "Length, weight, and temperature conversions",
    "Area and volume conversions",
    "Speed and pressure conversions",
    "Metric and imperial systems",
    "Real-time instant conversion",
  ],
  applicationCategory: "UtilityApplication" as const,
};

export const metadata = generateToolMetadata(OPTIONS);

export default function UnitConverterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildToolJsonLd(OPTIONS) }}
      />
      <UnitConverterClient />
    </>
  );
}