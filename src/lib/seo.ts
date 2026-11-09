import { FAQS } from "@/content/faq";
import { BUSINESS } from "@/content/business";
import { CONTACT_EMAIL } from "./site";

/** On Vercel without a set domain, use the deployment's own host so share images and canonicals resolve to it. */
const vercelHost =
  process.env.VERCEL_ENV === "production" ? process.env.VERCEL_PROJECT_PRODUCTION_URL : process.env.VERCEL_URL;

/** Public URL of this landing page (set NEXT_PUBLIC_SITE_URL to the real domain at launch). */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? (vercelHost ? `https://${vercelHost}` : "https://an-vi-cac-landing-draft.vercel.app")
).replace(/\/$/, "");

/**
 * Search engines stay out until launch, like the draft (noindex). Set
 * NEXT_PUBLIC_ALLOW_INDEXING=true on the production domain to open it up.
 */
export const ALLOW_INDEXING = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

export const SITE_NAME = "Ẩn Vi Các";
export const SITE_TITLE = "Xem lá số Tử Vi miễn phí theo ngày giờ sinh | Ẩn Vi Các";

/** Update when the page content changes meaningfully (used by the sitemap). */
export const LAST_UPDATED = "2026-11-09";
export const SITE_DESCRIPTION =
  "Năm nay của bạn ra sao? Xem lá số Tử Vi miễn phí: Tính cách, 1 cảnh báo cho năm nay và điểm đặc biệt trong lá số. Bản trọn gói có Dịch sư thật xem lại.";

/** Organization + WebSite + FAQPage structured data for the home page. */
export function homeJsonLd() {
  const fullPriceNumber = BUSINESS.fullPrice?.replace(/\D/g, "") || null;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#org`,
        name: BUSINESS.company?.name ?? SITE_NAME,
        alternateName: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/images/logo-seal.png`,
        email: CONTACT_EMAIL,
        ...(BUSINESS.company?.address ? { address: BUSINESS.company.address } : {}),
        ...(BUSINESS.socials.length ? { sameAs: BUSINESS.socials.map((s) => s.href) } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: "vi-VN",
        publisher: { "@id": `${SITE_URL}/#org` },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: SITE_TITLE,
        description: SITE_DESCRIPTION,
        inLanguage: "vi-VN",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#service` },
        primaryImageOfPage: `${SITE_URL}/opengraph-image.png`,
      },
      {
        "@type": "Service",
        "@id": `${SITE_URL}/#service`,
        name: "Luận giải lá số Tử Vi Đẩu Số",
        serviceType: "Xem Tử Vi, luận giải lá số Tử Vi",
        description: SITE_DESCRIPTION,
        provider: { "@id": `${SITE_URL}/#org` },
        areaServed: { "@type": "Country", name: "Việt Nam" },
        availableLanguage: "vi",
        offers: [
          { "@type": "Offer", name: "Bản miễn phí", price: "0", priceCurrency: "VND", url: SITE_URL },
          ...(fullPriceNumber
            ? [{ "@type": "Offer", name: "Bản trọn gói", price: fullPriceNumber, priceCurrency: "VND", url: SITE_URL }]
            : []),
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

/** Article structured data for /kien-thuc/[slug]. */
export function articleJsonLd(a: { slug: string; title: string; excerpt: string; publishedAt: string }) {
  const url = `${SITE_URL}/kien-thuc/${a.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.excerpt,
    datePublished: a.publishedAt,
    inLanguage: "vi-VN",
    mainEntityOfPage: url,
    url,
    image: `${SITE_URL}/opengraph-image.png`,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo-seal.png` },
    },
  };
}
