import { generateToolMetadata, buildToolJsonLd } from "@/lib/generateToolMetadata";

// Replace with your actual client import
import JsonFormatterClient from "./JsonFormatterClient";

const OPTIONS = {
  title: "JSON Formatter & Validator",
  slug: "json-formatter",
  description:
    "Format, beautify, and validate JSON instantly online. Minify JSON for production or prettify it for readability. Free JSON formatter tool for developers.",
  keywords: [
    "json formatter online",
    "json beautifier free",
    "json validator online",
    "format json online",
    "minify json online",
    "json prettifier tool",
  ],
  featureList: [
    "JSON formatting and beautifying",
    "JSON validation with error highlighting",
    "JSON minification",
    "Syntax highlighting",
    "Copy formatted JSON to clipboard",
  ],
  applicationCategory: "DeveloperApplication" as const,
};

export const metadata = generateToolMetadata(OPTIONS);

export default function JsonFormatterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildToolJsonLd(OPTIONS) }}
      />
      <JsonFormatterClient />
    </>
  );
}