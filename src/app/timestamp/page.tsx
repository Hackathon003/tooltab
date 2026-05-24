import { generateToolMetadata, buildToolJsonLd } from "@/lib/generateToolMetadata";
import TimestampClient from "./TimestampClient";

const OPTIONS = {
  title: "Unix Timestamp Converter",
  slug: "timestamp",
  description:
    "Convert Unix timestamps to human-readable dates and back instantly. Supports seconds, milliseconds, and ISO 8601 format. Free, fast, no signup required.",
  keywords: [
    "unix timestamp converter",
    "epoch time converter",
    "timestamp to date",
    "date to unix timestamp",
    "milliseconds converter",
    "epoch converter online",
  ],
  featureList: [
    "Unix timestamp to human-readable date",
    "Date to Unix timestamp conversion",
    "Seconds and milliseconds support",
    "ISO 8601 format output",
    "Current timestamp display",
  ],
  applicationCategory: "DeveloperApplication" as const,
};

export const metadata = generateToolMetadata(OPTIONS);

export default function TimestampPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildToolJsonLd(OPTIONS) }}
      />
      <TimestampClient />
    </>
  );
}