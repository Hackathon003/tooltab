import { generateToolMetadata, buildToolJsonLd } from "@/lib/generateToolMetadata";
import HexRgbClient from "./HexRgbClient";

const OPTIONS = {
  title: "HEX to RGB Color Converter",
  slug: "hex-to-rgb",
  description:
    "Convert HEX color codes to RGB, HSL, and RGBA values instantly. Free online color converter for designers and developers. Supports all CSS color formats.",
  keywords: [
    "hex to rgb converter",
    "hex color to rgb online",
    "rgb to hex converter",
    "color code converter online",
    "hex to hsl converter",
    "css color converter",
  ],
  featureList: [
    "HEX to RGB conversion",
    "RGB to HEX conversion",
    "HSL and RGBA output",
    "Live color preview",
    "Copy color values to clipboard",
  ],
  applicationCategory: "DeveloperApplication" as const,
};

export const metadata = generateToolMetadata(OPTIONS);

export default function HexToRgbPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildToolJsonLd(OPTIONS) }}
      />
      <HexRgbClient />
    </>
  );
}