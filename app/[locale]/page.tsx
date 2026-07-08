import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getHomePage, getSiteSettings } from '@/sanity/lib/fetchers'
import { urlFor } from '@/sanity/lib/client'
import { Hero } from '@/components/home/Hero'
import { Marquee } from '@/components/home/Marquee'
import { Intro } from '@/components/home/Intro'
import { Services } from '@/components/home/Services'
import { Work } from '@/components/home/Work'
import { Stats } from '@/components/home/Stats'
import { Process } from '@/components/home/Process'
import { Contact } from '@/components/home/Contact'

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(): Promise<Metadata> {
  const [home, settings] = await Promise.all([getHomePage(), getSiteSettings()])
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pihaykkoset.fi'
  const title = home?.seo?.metaTitle || settings?.siteName || 'Pihaykköset Oy'
  const description = home?.seo?.metaDescription || settings?.siteDescription
  const og = home?.seo?.ogImage?.asset
    ? urlFor(home.seo.ogImage.asset).width(1200).height(630).url()
    : settings?.ogImage?.asset
    ? urlFor(settings.ogImage.asset).width(1200).height(630).url()
    : null

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: siteUrl,
      images: og ? [{ url: og }] : [],
    },
    twitter: { title, description, images: og ? [og] : [] },
    alternates: { canonical: siteUrl },
    robots: home?.seo?.noIndex ? { index: false, follow: false } : undefined,
  }
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const [home, settings] = await Promise.all([getHomePage(), getSiteSettings()])

  return (
    <>
      <Hero data={home} />
      <Marquee data={home} />
      <Intro data={home} />
      <Services data={home} />
      <Work data={home} />
      <Stats data={home} />
      <Process data={home} />
      <Contact data={home} contactInfo={settings?.contactInfo} />
    </>
  )
}
