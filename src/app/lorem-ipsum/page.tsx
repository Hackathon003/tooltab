import { generateToolMetadata, buildToolJsonLd } from "@/lib/generateToolMetadata";
import LoremIpsumClient from "./LoremIpsumClient";

const OPTIONS = {
  title: "Lorem Ipsum Generator",
  slug: "lorem-ipsum",
  description:
    "Generate Lorem Ipsum placeholder text instantly. Choose words, sentences, or paragraphs. Free lorem ipsum generator for designers and developers.",
  keywords: [
    "lorem ipsum generator online",
    "placeholder text generator",
    "dummy text generator free",
    "lorem ipsum paragraphs",
    "random text generator",
    "lipsum generator",
  ],
  featureList: [
    "Generate words, sentences, or paragraphs",
    "Custom length control",
    "Classic and random Lorem Ipsum modes",
    "Copy to clipboard",
    "HTML output option",
  ],
  applicationCategory: "DeveloperApplication" as const,
};

export const metadata = generateToolMetadata(OPTIONS);

export default function LoremIpsumPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildToolJsonLd(OPTIONS) }}
      />
      <LoremIpsumClient />
    </>
  );
}