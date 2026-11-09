import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES } from "@/content/articles";
import { SectionCta } from "@/components/landing/SectionCta";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { FORM_ANCHOR } from "@/lib/site";
import { articleJsonLd } from "@/lib/seo";

// Cache Components needs at least one param at build time. Until the first
// article is written, a placeholder slug is generated and resolves to 404.
const PLACEHOLDER = "sap-ra-mat";

export function generateStaticParams() {
  return ARTICLES.length ? ARTICLES.map((a) => ({ slug: a.slug })) : [{ slug: PLACEHOLDER }];
}

export async function generateMetadata({ params }: PageProps<"/kien-thuc/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: `${article.title} | Ẩn Vi Các`,
    description: article.excerpt,
    alternates: { canonical: `/kien-thuc/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      url: `/kien-thuc/${article.slug}`,
      publishedTime: article.publishedAt,
    },
  };
}

export default async function ArticlePage({ params }: PageProps<"/kien-thuc/[slug]">) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();
  return (
    <>
      <SiteHeader linkBase="/" />
      <main className="pt-[52px] md:pt-20">
        <article className="mx-auto w-full max-w-2xl px-5 py-16 sm:px-8 lg:py-24">
          <p className="type-kicker text-muted">Kiến thức Tử Vi Đẩu Số</p>
          <h1 className="type-h2 mt-4 font-display font-semibold text-parchment">{article.title}</h1>
          <p className="mt-3 text-sm text-muted">{article.publishedAt.split("-").reverse().join("/")}</p>
          <div className="mt-10 space-y-6 text-[17px] leading-8 text-parchment/90">
            {article.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <SectionCta className="mt-14" label="Lập lá số của bạn" href={`/${FORM_ANCHOR}`} />
          <p className="mt-6 text-center text-sm">
            <Link href="/" className="focus-gold rounded text-gold underline-offset-4 hover:underline">
              Về trang chủ
            </Link>
          </p>
        </article>
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(article)).replace(/</g, "\\u003c") }}
      />
      {/* Article pages have no scroll observer, so reveal-marked blocks must start visible. */}
      <script dangerouslySetInnerHTML={{ __html: "document.documentElement.removeAttribute('data-reveal-ready')" }} />
    </>
  );
}
