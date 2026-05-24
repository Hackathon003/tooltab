import { generateToolMetadata, buildToolJsonLd } from "@/lib/generateToolMetadata";
import MarkdownClient from "./MarkdownClient";

const OPTIONS = {
  title: "Markdown Editor & Previewer",
  slug: "markdown",
  description:
    "Write and preview Markdown in real time. Free online Markdown editor with live preview, syntax highlighting, and HTML export. No signup required.",
  keywords: [
    "markdown editor online",
    "markdown previewer free",
    "live markdown editor",
    "markdown to html converter",
    "online markdown viewer",
    "markdown renderer tool",
  ],
  featureList: [
    "Real-time Markdown preview",
    "Syntax highlighting",
    "Markdown to HTML export",
    "GitHub Flavored Markdown support",
    "Copy HTML output",
  ],
  applicationCategory: "DeveloperApplication" as const,
};

export const metadata = generateToolMetadata(OPTIONS);

export default function MarkdownPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildToolJsonLd(OPTIONS) }}
      />
      <MarkdownClient />
    </>
  );
}