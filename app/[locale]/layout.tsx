import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { Bebas_Neue, Barlow, IBM_Plex_Mono } from 'next/font/google'
import { draftMode } from 'next/headers'
import '../globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ScrollProgress } from '@/components/home/ScrollProgress'
import { CookieNotice } from '@/components/ui/CookieNotice'
import { getSiteSettings, getHomePage } from '@/sanity/lib/fetchers'
import { VisualEditing } from '@/components/sanity/VisualEditing'
import { DraftModeToast } from '@/components/sanity/DraftModeToast'
import { locales, type Locale } from '@/lib/i18n/config'

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bebas',
})
const barlow = Barlow({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-barlow',
  weight: ['300', '400', '500'],
})
const plexMono = IBM_Plex_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plex-mono',
})

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pihaykkoset.fi'

  return {
    title: {
      default: settings?.siteName || 'Pihaykköset Oy',
      template: `%s | ${settings?.siteName || 'Pihaykköset Oy'}`,
    },
    description: settings?.siteDescription || '',
    metadataBase: new URL(siteUrl),
    openGraph: { type: 'website', siteName: settings?.siteName || 'Pihaykköset Oy' },
    twitter: { card: 'summary_large_image' },
    robots: { index: true, follow: true },
  }
}

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params
  const { isEnabled: isDraftMode } = await draftMode()

  if (!locales.includes(locale as Locale)) {
    notFound()
  }
  setRequestLocale(locale)

  const [settings, messages, home] = await Promise.all([
    getSiteSettings(),
    getMessages(),
    getHomePage(),
  ])

  const fontClasses = `${bebas.variable} ${barlow.variable} ${plexMono.variable}`

  return (
    <html lang={locale} className={fontClasses}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ScrollProgress />
          <Header home={home} contactInfo={settings?.contactInfo} />
          <main>{children}</main>
          <Footer home={home} contactInfo={settings?.contactInfo} />
          <CookieNotice
            enabled={settings?.cookieNotice?.enabled}
            text={settings?.cookieNotice?.text}
            linkText={settings?.cookieNotice?.linkText}
          />
          {isDraftMode && (
            <>
              <DraftModeToast />
              <VisualEditing />
            </>
          )}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
