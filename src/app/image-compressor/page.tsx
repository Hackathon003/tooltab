import { generateToolMetadata, buildToolJsonLd } from "@/lib/generateToolMetadata";
import ImageCompressorClient from "./ImageCompressorClient";

const OPTIONS = {
  title: "Image Compressor",
  slug: "image-compressor",
  description:
    "Compress and optimize images online for free. Reduce image file size without losing quality. Supports JPG, PNG, and WebP. No upload limits, no signup required.",
  keywords: [
    "image compressor online free",
    "compress image without losing quality",
    "reduce image file size",
    "jpg compressor online",
    "png compressor free",
    "optimize image for web",
  ],
  featureList: [
    "JPG, PNG, and WebP compression",
    "Lossless and lossy compression modes",
    "Batch image compression",
    "Before and after size comparison",
    "Download compressed images instantly",
  ],
  applicationCategory: "UtilityApplication" as const,
};

export const metadata = generateToolMetadata(OPTIONS);

export default function ImageCompressorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildToolJsonLd(OPTIONS) }}
      />
      <ImageCompressorClient />
    </>
  );
}