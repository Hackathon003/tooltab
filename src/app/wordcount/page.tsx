import { generateToolMetadata, buildToolJsonLd } from "@/lib/generateToolMetadata";
import WordCountClient from "./WordCountClient";

const OPTIONS = {
  title: "Word Count Checker",
  slug: "wordcount",
  description:
    "Count words, characters, sentences, and paragraphs instantly. Free online word counter for writers, students, and developers. Real-time results with reading time estimate.",
  keywords: [
    "word count checker online",
    "character counter",
    "word counter tool",
    "online word counter",
    "sentence counter",
    "reading time estimator",
  ],
  featureList: [
    "Real-time word count",
    "Character count with and without spaces",
    "Sentence and paragraph counter",
    "Reading time estimate",
    "Keyword density analysis",
  ],
  applicationCategory: "UtilityApplication" as const,
};

export const metadata = generateToolMetadata(OPTIONS);

export default function WordCountPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildToolJsonLd(OPTIONS) }}
      />
      <WordCountClient />
    </>
  );
}