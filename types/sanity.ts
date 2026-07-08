import { PortableTextBlock } from '@portabletext/types'

// Site Settings
export interface SiteSettings {
  siteName: string
  siteDescription?: string
  logo?: {
    asset: SanityImage
    alt?: string
  }
  favicon?: {
    asset: SanityImage
  }
  ogImage?: {
    asset: SanityImage
  }
  socialLinks?: SocialLink[]
  contactInfo?: ContactInfo
  footerText?: string
  cookieNotice?: {
    enabled: boolean
    text?: string
    linkText?: string
  }
}

export interface SanityImage {
  _id: string
  url: string
  metadata?: {
    dimensions: {
      width: number
      height: number
    }
  }
}

export interface SocialLink {
  platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'youtube' | 'tiktok' | 'github'
  url: string
}

export interface ContactInfo {
  email?: string
  phone?: string
  address?: string
  companyName?: string
  vatNumber?: string
  chamberOfCommerce?: string
}

// Navigation
export interface Navigation {
  title: string
  identifier: 'header' | 'footer'
  items?: NavItem[]
}

export interface NavItem {
  label: string
  linkType: 'internal' | 'external'
  internalLink?: {
    slug?: { current: string }
    isHomepage?: boolean
  }
  externalUrl?: string
  openInNewTab?: boolean
}

// SEO
export interface SEO {
  metaTitle?: string
  metaDescription?: string
  ogImage?: {
    asset: SanityImage
  }
  noIndex?: boolean
}

// Page
export interface Page {
  _id: string
  title: string
  slug?: { current: string }
  isHomepage?: boolean
  seo?: SEO
  sections?: Section[]
}

export interface PageSummary {
  _id: string
  _updatedAt: string
  title: string
  slug?: { current: string }
  isHomepage?: boolean
  seo?: {
    noIndex?: boolean
  }
}

// Sections
export type Section =
  | HeroSection
  | TextSection
  | FeaturesSection
  | CTASection
  | ContactSection
  | FAQSection
  | PricingSection
  | LogosSection
  | StatsSection
  | ProcessSection
  | TeamSection
  | TestimonialsSection
  | ComparisonSection
  | GallerySection
  | ServicesSection
  | CaseStudiesSection

export interface HeroSection {
  _type: 'heroSection'
  _key: string
  heading: string
  subheading?: string
  backgroundImage?: {
    asset: SanityImage
    hotspot?: { x: number; y: number }
  }
  backgroundOverlay?: boolean
  primaryCta?: {
    text?: string
    link?: LinkObject
  }
  secondaryCta?: {
    text?: string
    link?: LinkObject
  }
  alignment?: 'left' | 'center' | 'right'
}

export interface TextSection {
  _type: 'textSection'
  _key: string
  heading?: string
  content?: PortableTextBlock[]
  backgroundColor?: 'white' | 'gray' | 'primary'
  maxWidth?: 'narrow' | 'medium' | 'wide'
}

export interface FeaturesSection {
  _type: 'featuresSection'
  _key: string
  heading?: string
  subheading?: string
  features?: Feature[]
  columns?: 2 | 3 | 4
  backgroundColor?: 'white' | 'gray' | 'primary'
}

export interface Feature {
  title: string
  description?: string
  icon?: string
  image?: {
    asset: SanityImage
    hotspot?: { x: number; y: number }
  }
  link?: LinkObject
}

export interface CTASection {
  _type: 'ctaSection'
  _key: string
  heading: string
  text?: string
  primaryButton?: {
    text: string
    link?: LinkObject
  }
  secondaryButton?: {
    text?: string
    link?: LinkObject
  }
  backgroundImage?: {
    asset: SanityImage
    hotspot?: { x: number; y: number }
  }
  backgroundColor?: 'primary' | 'dark' | 'light'
}

export interface ContactSection {
  _type: 'contactSection'
  _key: string
  heading?: string
  text?: string
  showContactInfo?: boolean
  showContactForm?: boolean
  formFields?: FormField[]
  formAction?: string
  submitButtonText?: string
  successMessage?: string
  backgroundColor?: 'white' | 'gray' | 'primary'
}

export interface FormField {
  fieldName: string
  fieldType: 'text' | 'email' | 'tel' | 'textarea'
  required?: boolean
  placeholder?: string
}

export interface FAQSection {
  _type: 'faqSection'
  _key: string
  heading?: string
  subheading?: string
  faqs?: FAQ[]
  backgroundColor?: 'white' | 'gray'
}

export interface FAQ {
  question: string
  answer?: PortableTextBlock[]
}

export interface LinkObject {
  label?: string
  linkType?: 'internal' | 'external'
  internalLink?: {
    slug?: { current: string }
    isHomepage?: boolean
  }
  externalUrl?: string
  openInNewTab?: boolean
}

// New Section Types

export interface PricingSection {
  _type: 'pricingSection'
  _key: string
  heading?: string
  subheading?: string
  tiers?: PricingTier[]
  showToggle?: boolean
  backgroundColor?: 'white' | 'gray'
}

export interface PricingTier {
  name: string
  description?: string
  monthlyPrice?: number
  yearlyPrice?: number
  currency?: string
  features?: PricingFeature[]
  highlighted?: boolean
  ctaText?: string
  ctaLink?: LinkObject
}

export interface PricingFeature {
  text: string
  included?: boolean
}

export interface LogosSection {
  _type: 'logosSection'
  _key: string
  heading?: string
  logos?: LogoItem[]
  grayscale?: boolean
  style?: 'row' | 'grid' | 'marquee'
  backgroundColor?: 'white' | 'gray' | 'primary'
}

export interface LogoItem {
  image: {
    asset: { _ref: string }
    alt?: string
  }
  name?: string
  url?: string
}

export interface StatsSection {
  _type: 'statsSection'
  _key: string
  heading?: string
  subheading?: string
  stats?: StatItem[]
  layout?: 'row' | 'grid' | 'cards'
  animate?: boolean
  backgroundColor?: 'white' | 'gray' | 'primary' | 'dark'
}

export interface StatItem {
  value: string
  label: string
  prefix?: string
  suffix?: string
}

export interface ProcessSection {
  _type: 'processSection'
  _key: string
  heading?: string
  subheading?: string
  steps?: ProcessStep[]
  layout?: 'horizontal' | 'vertical' | 'alternating' | 'timeline' | 'cards'
  showNumbers?: boolean
  backgroundColor?: 'white' | 'gray'
}

export interface ProcessStep {
  title: string
  description?: string
  icon?: string
  image?: { asset: { _ref: string } }
}

export interface TeamSection {
  _type: 'teamSection'
  _key: string
  heading?: string
  subheading?: string
  displayMode?: 'all' | 'featured' | 'selected'
  selectedMembers?: TeamMember[]
  columns?: 2 | 3 | 4
  showBio?: boolean
  showSocials?: boolean
  backgroundColor?: 'white' | 'gray'
}

export interface TeamMember {
  _id: string
  name: string
  role: string
  shortBio?: string
  image?: {
    asset: { _ref: string }
    alt?: string
  }
  socialLinks?: SocialLink[]
  featured?: boolean
  order?: number
}

export interface TestimonialsSection {
  _type: 'testimonialsSection'
  _key: string
  heading?: string
  subheading?: string
  displayMode?: 'all' | 'featured' | 'selected'
  selectedTestimonials?: Testimonial[]
  layout?: 'grid' | 'carousel' | 'masonry' | 'single'
  showRating?: boolean
  showCompanyLogo?: boolean
  backgroundColor?: 'white' | 'gray' | 'primary'
}

export interface Testimonial {
  _id: string
  quote: string
  author: string
  role?: string
  company?: string
  image?: {
    asset: { _ref: string }
    alt?: string
  }
  companyLogo?: {
    asset: { _ref: string }
  }
  rating?: number
  featured?: boolean
}

export interface ComparisonSection {
  _type: 'comparisonSection'
  _key: string
  heading?: string
  subheading?: string
  columns?: ComparisonColumn[]
  rows?: ComparisonRow[]
  footnote?: string
  backgroundColor?: 'white' | 'gray'
}

export interface ComparisonColumn {
  title: string
  subtitle?: string
  highlighted?: boolean
}

export interface ComparisonRow {
  feature: string
  values?: ComparisonValue[]
}

export interface ComparisonValue {
  type: 'check' | 'cross' | 'partial' | 'text'
  text?: string
}

export interface GallerySection {
  _type: 'gallerySection'
  _key: string
  heading?: string
  subheading?: string
  images?: GalleryImage[]
  layout?: 'grid' | 'masonry' | 'carousel'
  columns?: 2 | 3 | 4
  enableLightbox?: boolean
  enableFiltering?: boolean
  backgroundColor?: 'white' | 'gray' | 'dark'
}

export interface GalleryImage {
  image: { asset: { _ref: string } }
  alt?: string
  caption?: string
  category?: string
}

export interface ServicesSection {
  _type: 'servicesSection'
  _key: string
  heading?: string
  subheading?: string
  displayMode?: 'all' | 'featured' | 'selected'
  selectedServices?: Service[]
  layout?: 'grid' | 'cards' | 'list'
  columns?: 2 | 3 | 4
  showDescription?: boolean
  showLearnMore?: boolean
  backgroundColor?: 'white' | 'gray'
}

export interface Service {
  _id: string
  title: string
  slug?: { current: string }
  shortDescription?: string
  icon?: string
  image?: {
    asset: { _ref: string }
    alt?: string
  }
  featured?: boolean
}

export interface CaseStudiesSection {
  _type: 'caseStudiesSection'
  _key: string
  heading?: string
  subheading?: string
  displayMode?: 'all' | 'featured' | 'selected'
  selectedCaseStudies?: CaseStudy[]
  layout?: 'grid' | 'carousel' | 'featured-list'
  showMetrics?: boolean
  showIndustry?: boolean
  ctaText?: string
  ctaLink?: LinkObject
  backgroundColor?: 'white' | 'gray'
}

export interface CaseStudy {
  _id: string
  title: string
  slug?: { current: string }
  client: string
  industry?: string
  excerpt?: string
  featuredImage?: {
    asset: { _ref: string }
    alt?: string
  }
  metrics?: CaseStudyMetric[]
  featured?: boolean
}

export interface CaseStudyMetric {
  label: string
  value: string
}

export interface Article {
  _id: string
  title: string
  slug?: { current: string }
  excerpt?: string
  featuredImage?: {
    asset: { _ref: string }
    alt?: string
  }
  author?: TeamMember
  category?: string
  publishedAt?: string
  featured?: boolean
}

// ─── Pihaykköset Etusivu ──────────────────────────────────────────────
export interface HomeImage {
  asset?: { _ref?: string; url?: string }
  hotspot?: { x: number; y: number }
  alt?: string
}

export interface HomeNavItem { label: string; anchor: string }
export interface HomeHeadlineLine { text: string; accent?: boolean }
export interface HomeMeta { label?: string; value?: string }
export interface HomeServiceItem {
  title: string
  description?: string
  tags?: string[]
  anchor?: string
  image?: HomeImage
}
export interface HomeWorkTile {
  location?: string
  category?: string
  image?: HomeImage
}
export interface HomeStatItem {
  value: string
  animate?: boolean
  suffix?: string
  label?: string
}
export interface HomeProcessStep { title: string; description?: string }
export interface HomeFooterLink { label: string; href?: string }
export interface HomeFooterColumn { heading: string; links?: HomeFooterLink[] }
export interface HomeFooterSocial { label: string; url?: string }

export interface HomePage {
  brandPrefix?: string
  brandSuffix?: string
  brandTagline?: string
  navItems?: HomeNavItem[]

  heroHeadlineLines?: HomeHeadlineLine[]
  heroLede?: string
  heroPrimaryCtaText?: string
  heroPrimaryCtaAnchor?: string
  heroSecondaryCtaText?: string
  heroSecondaryCtaAnchor?: string
  heroBackgroundImage?: HomeImage
  heroMeta?: HomeMeta[]

  marqueeItems?: string[]

  introEyebrow?: string
  introNumber?: number
  introNumberSuffix?: string
  introTag?: string
  introHeadingStart?: string
  introHeadingMuted?: string
  introHeadingEnd?: string
  introLead?: string
  introParagraphs?: string[]

  servicesEyebrow?: string
  servicesHeading?: string
  servicesCount?: string
  serviceItems?: HomeServiceItem[]

  workHeadingStart?: string
  workHeadingAccent?: string
  workHeadingEnd?: string
  workDescription?: string
  workTiles?: HomeWorkTile[]

  statItems?: HomeStatItem[]

  processEyebrow?: string
  processHeadingStart?: string
  processHeadingMuted?: string
  processLead?: string
  processSteps?: HomeProcessStep[]

  contactBackgroundText?: string
  contactHeadingStart?: string
  contactHeadingAccent?: string
  contactHeadingEnd?: string
  contactLead?: string
  contactCtaText?: string

  footerTagline?: string
  footerColumns?: HomeFooterColumn[]
  footerLogotype?: string
  footerCopyright?: string
  footerAttribution?: string
  footerSocials?: HomeFooterSocial[]

  seo?: SEO
}

