import { generateToolMetadata, buildToolJsonLd } from "@/lib/generateToolMetadata";
import DiffClient from "./DiffClient";

const OPTIONS = {
  title: "Text Diff Checker",
  slug: "diff",
  description:
    "Compare two texts and highlight the differences instantly. Free online diff tool for developers and writers. See additions, deletions, and changes side by side.",
  keywords: [
    "text diff checker online",
    "compare two texts online",
    "diff tool free",
    "text comparison tool",
    "find difference between texts",
    "online diff viewer",
  ],
  featureList: [
    "Side-by-side text comparison",
    "Line-by-line diff highlighting",
    "Added and removed line detection",
    "Copy diff output",
    "Real-time comparison",
  ],
  applicationCategory: "DeveloperApplication" as const,
};

export const metadata = generateToolMetadata(OPTIONS);

export default function DiffPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildToolJsonLd(OPTIONS) }}
      />
      <DiffClient />
    </>
  );
}