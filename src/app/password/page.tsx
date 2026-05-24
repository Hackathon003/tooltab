import { generateToolMetadata, buildToolJsonLd } from "@/lib/generateToolMetadata";
import PasswordClient from "./PasswordClient";

const OPTIONS = {
  title: "Password Generator",
  slug: "password",
  description:
    "Generate strong, secure, random passwords instantly. Customize length, symbols, numbers, and uppercase. Free online password generator — nothing is stored or sent.",
  keywords: [
    "password generator online",
    "strong password generator free",
    "random password generator",
    "secure password creator",
    "custom password generator",
    "generate strong password",
  ],
  featureList: [
    "Customizable password length",
    "Uppercase, lowercase, numbers, symbols",
    "Password strength indicator",
    "Bulk password generation",
    "100% client-side — nothing stored",
  ],
  applicationCategory: "UtilityApplication" as const,
};

export const metadata = generateToolMetadata(OPTIONS);

export default function PasswordPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildToolJsonLd(OPTIONS) }}
      />
      <PasswordClient />
    </>
  );
}