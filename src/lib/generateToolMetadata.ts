import type { Metadata } from "next";

const BASE_URL = "https://tooltab.xyz";
const SITE_NAME = "ToolsTab";
const TWITTER_HANDLE = "@toolstab"; // update if different

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface ToolMetadataOptions {
  /** Short tool name, e.g. "Unix Timestamp Converter" */
  title: string;
  /** URL slug without leading slash, e.g. "timestamp" */
  slug: string;
  /** 140–160 char description. Be specific — this shows in Google results. */
  description: string;
  /** 4–8 targeted keywords */
  keywords: string[];
  /** Bullet-style feature list for JSON-LD schema */
  featureList: string[];
  /**
   * Schema category — use "DeveloperApplication" for dev tools,
   * "UtilityApplication" for general utilities.
   * Defaults to "DeveloperApplication".
   */
  applicationCategory?: "DeveloperApplication" | "UtilityApplication";
  /** Optional OG image path relative to /public, e.g. "/og/timestamp.png" */
  ogImage?: string;
}

// ─────────────────────────────────────────────
// JSON-LD builder
// ─────────────────────────────────────────────

export function buildToolJsonLd(options: ToolMetadataOptions): string {
  const {
    title,
    slug,
    description,
    featureList,
    applicationCategory = "DeveloperApplication",
  } = options;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: title,
    url: `${BASE_URL}/${slug}`,
    description,
    applicationCategory,
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript",
    inLanguage: "en",
    featureList,
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    creator: {
      "@type": "Organization",
      name: SITE_NAME,
      url: BASE_URL,
    },
    // BreadcrumbList helps Google show breadcrumbs in search results
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: BASE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: title,
          item: `${BASE_URL}/${slug}`,
        },
      ],
    },
  };

  return JSON.stringify(jsonLd);
}

// ─────────────────────────────────────────────
// Main metadata generator
// ─────────────────────────────────────────────

export function generateToolMetadata(options: ToolMetadataOptions): Metadata {
  const {
    title,
    slug,
    description,
    keywords,
    ogImage = "/og/default.png",
  } = options;

  const pageUrl = `${BASE_URL}/${slug}`;
  const fullTitle = `${title} — Free Online Tool | ${SITE_NAME}`;
  const ogImageUrl = `${BASE_URL}${ogImage}`;

  return {
    // ── Core ──────────────────────────────────
    title: fullTitle,
    description,
    keywords,

    // ── Canonical ─────────────────────────────
    alternates: {
      canonical: pageUrl,
    },

    // ── Open Graph ────────────────────────────
    openGraph: {
      title: `${title} — Free Online Tool`,
      description,
      url: pageUrl,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${title} — ${SITE_NAME}`,
        },
      ],
    },

    // ── Twitter / X ───────────────────────────
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      site: TWITTER_HANDLE,
      images: [ogImageUrl],
    },

    // ── Robots ────────────────────────────────
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
}