import { generateToolMetadata, buildToolJsonLd } from "@/lib/generateToolMetadata";
import UrlenCodeClient from "./UrlEncodeClient";

const OPTIONS = {
  title: "URL Encoder & Decoder",
  slug: "urlencode",
  description:
    "Encode or decode URLs and query strings instantly online. Supports percent encoding, full URL encoding, and component encoding. Free tool for developers.",
  keywords: [
    "url encoder decoder online",
    "encode url online",
    "percent encoding tool",
    "url decode online",
    "query string encoder",
    "uri encoder free",
  ],
  featureList: [
    "URL encoding and decoding",
    "Percent (%) encoding support",
    "Query string parameter encoding",
    "Full URL and component encoding modes",
    "Copy to clipboard",
  ],
  applicationCategory: "DeveloperApplication" as const,
};

export const metadata = generateToolMetadata(OPTIONS);

export default function UrlEncodePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildToolJsonLd(OPTIONS) }}
      />
      <UrlenCodeClient />
    </>
  );
}