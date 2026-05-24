import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/AdSlot";

// ─── SEO Metadata ────────────────────────────────────────────────────────────

const BASE_URL = "https://tooltab.xyz";

export const metadata: Metadata = {
  title: "ToolsTab — Free Online Tools for Developers, Designers & Everyone",
  description:
    "Free online tools for developers, designers, and everyday use. JSON formatter, UUID generator, Base64 encoder, regex tester, password generator, and more. No signup, no fluff.",
  keywords: [
    "free online tools for developers",
    "online developer tools",
    "json formatter online",
    "uuid generator",
    "base64 encoder decoder",
    "regex tester online",
    "password generator",
    "free web tools",
    "toolstab",
  ],
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "ToolsTab — Free Online Tools for Developers & Designers",
    description:
      "Fast, free, no signup. JSON formatter, UUID generator, Base64 encoder, regex tester, and 16+ more tools.",
    url: BASE_URL,
    siteName: "ToolsTab",
    type: "website",
    images: [
      {
        url: `${BASE_URL}/og/default.png`,
        width: 1200,
        height: 630,
        alt: "ToolsTab — Free Online Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolsTab — Free Online Tools for Developers & Designers",
    description:
      "Fast, free, no signup. 16+ tools including JSON formatter, UUID generator, regex tester, and more.",
    images: [`${BASE_URL}/og/default.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

// ─── Tools List ───────────────────────────────────────────────────────────────

const tools = [
  { href: "/diff",             title: "Text Diff Checker",       desc: "Compare two texts side by side. See exactly what changed, added, or removed.", tag: "TEXT",     icon: "⇄" },
  { href: "/timezone",         title: "Timezone Meeting Planner", desc: "Pick multiple timezones and find the best overlap for your meeting.",           tag: "TIME",     icon: "🕐" },
  { href: "/wordcount",        title: "Word Counter",             desc: "Count words, characters, sentences, and reading time instantly.",                tag: "TEXT",     icon: "Aa" },
  { href: "/password",         title: "Password Generator",       desc: "Generate strong, random passwords with custom length and character options.",    tag: "SECURITY", icon: "🔒" },
  { href: "/json-formatter",   title: "JSON Formatter",           desc: "Format, validate, and minify JSON instantly. Catch errors fast.",                tag: "DEV",      icon: "{}" },
  { href: "/lorem-ipsum",      title: "Lorem Ipsum Generator",    desc: "Generate placeholder text by paragraphs, sentences, or words.",                 tag: "DESIGN",   icon: "¶"  },
  { href: "/uuid",             title: "UUID Generator",           desc: "Generate unique UUIDs instantly. Copy with one click.",                          tag: "DEV",      icon: "#"  },
  { href: "/timestamp",        title: "Timestamp Converter",      desc: "Convert Unix timestamps to readable dates and back.",                            tag: "DEV",      icon: "⏱" },
  { href: "/base64",           title: "Base64 Encoder / Decoder", desc: "Encode or decode Base64 strings instantly.",                                     tag: "DEV",      icon: "64" },
  { href: "/urlencode",        title: "URL Encoder / Decoder",    desc: "Encode or decode URL components and query strings.",                             tag: "DEV",      icon: "%" },
  { href: "/hex-to-rgb",       title: "HEX to RGB Converter",     desc: "Convert HEX color codes to RGB and HSL values.",                                tag: "DESIGN",   icon: "🎨" },
  { href: "/unit-converter",   title: "Unit Converter",           desc: "Convert length, weight, temperature, speed, and area.",                         tag: "UTIL",     icon: "⚖" },
  { href: "/markdown",         title: "Markdown Previewer",       desc: "Write Markdown and see a live preview instantly.",                               tag: "TEXT",     icon: "MD" },
  { href: "/regex",            title: "Regex Tester",             desc: "Test regular expressions with live match highlighting.",                         tag: "DEV",      icon: ".*" },
  { href: "/qr-code",          title: "QR Code Generator",        desc: "Generate QR codes from any URL or text instantly.",                              tag: "UTIL",     icon: "▦" },
  { href: "/image-compressor", title: "Image Compressor",         desc: "Compress images in your browser. No upload needed.",                            tag: "DESIGN",   icon: "🖼" },
];

// ─── JSON-LD Schema ───────────────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    // WebSite schema — enables Google Sitelinks Search Box
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "ToolsTab",
      description: "Free online tools for developers, designers, and everyday use.",
      inLanguage: "en",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE_URL}/?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    // ItemList schema — helps Google show your tools as rich results
    {
      "@type": "ItemList",
      "@id": `${BASE_URL}/#toollist`,
      name: "Free Online Developer Tools",
      description: "A collection of free online tools for developers, designers, and everyday tasks.",
      numberOfItems: tools.length,
      itemListElement: tools.map((tool, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: tool.title,
        description: tool.desc,
        url: `${BASE_URL}${tool.href}`,
      })),
    },
    // Organization schema — builds brand authority
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "ToolsTab",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
      },
    },
  ],
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-10 sm:py-16 flex-1">
        <div className="mb-10 sm:mb-12">
          <p className="text-[#e8500a] font-display font-bold text-xs sm:text-sm tracking-widest uppercase mb-3">
            Free Online Tools
          </p>
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-[#0f0f0f] leading-none mb-4">
            Simple tools.<br />No fluff.
          </h1>
          <p className="text-[#9e9e8f] text-base sm:text-lg max-w-md mb-6">
            Fast, free, no signup. Just pick a tool and get to work.
          </p>
          <a
            href="#tools"
            className="inline-flex items-center gap-2 text-sm font-display font-bold text-[#0f0f0f] border-b-2 border-[#e8500a] pb-0.5 hover:text-[#e8500a] transition-colors duration-200"
          >
            Browse tools
          </a>
        </div>

        <AdSlot label="Top Banner" />

        <div id="tools" className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-8">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              style={{ border: "2px solid #0f0f0f" }}
              className="group block p-4 sm:p-6 rounded hover:bg-[#0f0f0f] hover:text-[#f5f2eb] transition-colors duration-200"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs font-display font-bold tracking-widest text-[#e8500a]">
                  {tool.tag}
                </span>
                <span className="text-lg font-mono text-[#9e9e8f] group-hover:text-[#f5f2eb] transition-colors">
                  {tool.icon}
                </span>
              </div>
              <h2 className="font-display font-bold text-lg sm:text-xl mb-1 sm:mb-2">{tool.title}</h2>
              <p className="text-sm text-[#9e9e8f] group-hover:text-[#f5f2eb] transition-colors leading-snug">
                {tool.desc}
              </p>
            </Link>
          ))}
        </div>

        <AdSlot label="Bottom Banner" />
      </main>
    </>
  );
}