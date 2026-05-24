import { generateToolMetadata, buildToolJsonLd } from "@/lib/generateToolMetadata";
import RegexClient from "./RegexClient";

const OPTIONS = {
  title: "Regex Tester & Debugger",
  slug: "regex",
  description:
    "Test and debug regular expressions in real time. Highlights matches, groups, and captures. Free online regex tester supporting JavaScript, Python, and PCRE syntax.",
  keywords: [
    "regex tester online",
    "regular expression tester free",
    "regex debugger online",
    "test regex javascript",
    "regex matcher online",
    "online regex validator",
  ],
  featureList: [
    "Real-time regex match highlighting",
    "Capture group display",
    "JavaScript and PCRE regex support",
    "Flags support (global, multiline, case-insensitive)",
    "Match count and position display",
  ],
  applicationCategory: "DeveloperApplication" as const,
};

export const metadata = generateToolMetadata(OPTIONS);

export default function RegexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildToolJsonLd(OPTIONS) }}
      />
      <RegexClient />
    </>
  );
}