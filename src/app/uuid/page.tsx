import { generateToolMetadata, buildToolJsonLd } from "@/lib/generateToolMetadata";
import UuidClient from "./UuidClient";

const OPTIONS = {
  title: "UUID Generator",
  slug: "uuid",
  description:
    "Generate random UUIDs (v1, v4) instantly online. Bulk generate multiple UUIDs at once. Free UUID generator tool for developers — no signup, no limits.",
  keywords: [
    "uuid generator online",
    "generate uuid v4",
    "random uuid generator",
    "bulk uuid generator",
    "unique id generator",
    "guid generator online",
  ],
  featureList: [
    "UUID v1 and v4 generation",
    "Bulk UUID generation",
    "Copy to clipboard",
    "Uppercase and lowercase output options",
    "No limit on generation",
  ],
  applicationCategory: "DeveloperApplication" as const,
};

export const metadata = generateToolMetadata(OPTIONS);

export default function UuidPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildToolJsonLd(OPTIONS) }}
      />
      <UuidClient />
    </>
  );
}