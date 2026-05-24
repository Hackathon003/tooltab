import { generateToolMetadata, buildToolJsonLd } from "@/lib/generateToolMetadata";
import QrCodeClient from "./QrCodeClient";

const OPTIONS = {
  title: "QR Code Generator",
  slug: "qr-code",
  description:
    "Generate QR codes for URLs, text, emails, and more instantly. Free online QR code generator. Download as PNG or SVG — no signup, no watermark.",
  keywords: [
    "qr code generator online free",
    "generate qr code for url",
    "qr code maker no watermark",
    "free qr code creator",
    "custom qr code generator",
    "download qr code png",
  ],
  featureList: [
    "QR code generation for URLs and text",
    "Download as PNG or SVG",
    "Custom size and color options",
    "No watermark",
    "100% free, no signup",
  ],
  applicationCategory: "UtilityApplication" as const,
};

export const metadata = generateToolMetadata(OPTIONS);

export default function QrCodePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildToolJsonLd(OPTIONS) }}
      />
      <QrCodeClient />
    </>
  );
}