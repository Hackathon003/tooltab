import { generateToolMetadata, buildToolJsonLd } from "@/lib/generateToolMetadata";
import Base64Client from "./Base64Client";

const OPTIONS = {
  title: "Base64 Encoder & Decoder",
  slug: "base64",
  description:
    "Encode and decode Base64 strings instantly online. Supports text and file encoding. Free Base64 converter tool for developers — no signup, no limits.",
  keywords: [
    "base64 encoder decoder online",
    "encode base64 online",
    "decode base64 string",
    "base64 converter free",
    "text to base64",
    "base64 to text",
  ],
  featureList: [
    "Text to Base64 encoding",
    "Base64 to text decoding",
    "File to Base64 conversion",
    "Copy to clipboard",
    "Real-time encoding",
  ],
  applicationCategory: "DeveloperApplication" as const,
};

export const metadata = generateToolMetadata(OPTIONS);

export default function Base64Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildToolJsonLd(OPTIONS) }}
      />
      <Base64Client />
    </>
  );
}