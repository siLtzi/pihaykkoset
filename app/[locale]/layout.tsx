import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { Inter } from 'next/font/google'
import { draftMode } from 'next/headers'
import '../globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CookieNotice } from '@/components/ui/CookieNotice'
import { getSiteSettings } from '@/sanity/lib/fetchers'
import { VisualEditing } from '@/components/sanity/VisualEditing'
import { DraftModeToast } from '@/components/sanity/DraftModeToast'
import { locales, type Locale } from '@/lib/i18n/config'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'
  
  return {
    title: {
      default: settings?.siteName || 'Your Website',
      template: `%s | ${settings?.siteName || 'Your Website'}`,
    },
    description: settings?.siteDescription || '',
    metadataBase: new URL(siteUrl),
    openGraph: {
      type: 'website',
      siteName: settings?.siteName || 'Your Website',
    },
    twitter: {
      card: 'summary_large_image',
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params
  const { isEnabled: isDraftMode } = await draftMode()
  
  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound()
  }
  
  // Enable static rendering
  setRequestLocale(locale)
  
  const [settings, messages] = await Promise.all([
    getSiteSettings(),
    getMessages(),
  ])
  
  return (
    <html lang={locale} className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-white font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
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
