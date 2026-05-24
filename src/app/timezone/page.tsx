import { generateToolMetadata, buildToolJsonLd } from "@/lib/generateToolMetadata";
import TimezoneClient from "./TimezoneClient";

const OPTIONS = {
  title: "Timezone Converter",
  slug: "timezone",
  description:
    "Convert time between any world timezones instantly. Compare multiple cities side by side. Free online timezone converter for developers and remote teams.",
  keywords: [
    "timezone converter online",
    "convert timezone free",
    "world clock converter",
    "time zone calculator",
    "UTC converter",
    "timezone difference calculator",
  ],
  featureList: [
    "Convert time between any two timezones",
    "Support for all IANA timezones",
    "UTC and GMT offset display",
    "Daylight saving time awareness",
    "Real-time clock display",
  ],
  applicationCategory: "UtilityApplication" as const,
};

export const metadata = generateToolMetadata(OPTIONS);

export default function TimezonePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildToolJsonLd(OPTIONS) }}
      />
      <TimezoneClient />
    </>
  );
}