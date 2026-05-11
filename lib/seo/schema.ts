import { SiteSettings, FAQ, Article } from '@/types/sanity'

interface OrganizationSchemaProps {
  settings: SiteSettings
  siteUrl: string
}

export function generateOrganizationSchema({ settings, siteUrl }: OrganizationSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: settings.siteName,
    description: settings.siteDescription,
    url: siteUrl,
    logo: settings.logo?.asset?.url,
    contactPoint: settings.contactInfo?.email
      ? {
          '@type': 'ContactPoint',
          email: settings.contactInfo.email,
          telephone: settings.contactInfo.phone,
          contactType: 'customer service',
        }
      : undefined,
    address: settings.contactInfo?.address
      ? {
          '@type': 'PostalAddress',
          streetAddress: settings.contactInfo.address,
        }
      : undefined,
    sameAs: settings.socialLinks?.map((link) => link.url).filter(Boolean),
  }
}

interface LocalBusinessSchemaProps {
  settings: SiteSettings
  siteUrl: string
}

export function generateLocalBusinessSchema({ settings, siteUrl }: LocalBusinessSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: settings.siteName,
    description: settings.siteDescription,
    url: siteUrl,
    logo: settings.logo?.asset?.url,
    telephone: settings.contactInfo?.phone,
    email: settings.contactInfo?.email,
    address: settings.contactInfo?.address
      ? {
          '@type': 'PostalAddress',
          streetAddress: settings.contactInfo.address,
        }
      : undefined,
  }
}

interface WebSiteSchemaProps {
  settings: SiteSettings
  siteUrl: string
}

export function generateWebSiteSchema({ settings, siteUrl }: WebSiteSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: settings.siteName,
    description: settings.siteDescription,
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

interface FAQSchemaProps {
  faqs: FAQ[]
}

export function generateFAQSchema({ faqs }: FAQSchemaProps) {
  if (!faqs || faqs.length === 0) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        // Convert portable text to plain text for schema
        text: faq.answer
          ?.map((block) => {
            // Type assertion for portable text block
            const typedBlock = block as { children?: Array<{ text?: string }> }
            return typedBlock.children?.map((child) => child.text || '').join('') || ''
          })
          .join('\n'),
      },
    })),
  }
}

interface ArticleSchemaProps {
  article: {
    title: string
    excerpt?: string
    publishedAt?: string
    author?: {
      name: string
      image?: { asset: { url: string } }
    }
    featuredImage?: { asset: { url: string }; alt?: string }
  }
  siteUrl: string
  settings: SiteSettings
  slug: string
}

export function generateArticleSchema({
  article,
  siteUrl,
  settings,
  slug,
}: ArticleSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    url: `${siteUrl}/blog/${slug}`,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: article.author
      ? {
          '@type': 'Person',
          name: article.author.name,
          image: article.author.image?.asset?.url,
        }
      : {
          '@type': 'Organization',
          name: settings.siteName,
        },
    publisher: {
      '@type': 'Organization',
      name: settings.siteName,
      logo: settings.logo?.asset?.url
        ? {
            '@type': 'ImageObject',
            url: settings.logo.asset.url,
          }
        : undefined,
    },
    image: article.featuredImage?.asset?.url,
  }
}

interface BreadcrumbSchemaProps {
  items: Array<{ name: string; url: string }>
  siteUrl: string
}

export function generateBreadcrumbSchema({ items, siteUrl }: BreadcrumbSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`,
    })),
  }
}

interface ServiceSchemaProps {
  service: {
    title: string
    shortDescription?: string
    pricing?: {
      startingPrice?: string
    }
  }
  siteUrl: string
  settings: SiteSettings
  slug: string
}

export function generateServiceSchema({
  service,
  siteUrl,
  settings,
  slug,
}: ServiceSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.shortDescription,
    url: `${siteUrl}/services/${slug}`,
    provider: {
      '@type': 'Organization',
      name: settings.siteName,
      url: siteUrl,
    },
    offers: service.pricing?.startingPrice
      ? {
          '@type': 'Offer',
          price: service.pricing.startingPrice,
          priceCurrency: 'EUR',
        }
      : undefined,
  }
}
