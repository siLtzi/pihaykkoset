'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

// Declare global types for analytics
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void
  }
}

interface AnalyticsConfig {
  googleAnalyticsId?: string
  plausibleDomain?: string
  metaPixelId?: string
}

interface AnalyticsProviderProps {
  config: AnalyticsConfig
  children: React.ReactNode
}

export function AnalyticsProvider({ config, children }: AnalyticsProviderProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '')

    // Track page view in Google Analytics
    if (config.googleAnalyticsId && window.gtag) {
      window.gtag('config', config.googleAnalyticsId, {
        page_path: url,
      })
    }

    // Track page view in Plausible
    if (config.plausibleDomain && window.plausible) {
      window.plausible('pageview')
    }

    // Track page view in Meta Pixel
    if (config.metaPixelId && window.fbq) {
      window.fbq('track', 'PageView')
    }
  }, [pathname, searchParams, config])

  return <>{children}</>
}

// Google Analytics Script
export function GoogleAnalyticsScript({ gaId }: { gaId: string }) {
  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}

// Plausible Analytics Script
export function PlausibleScript({ domain }: { domain: string }) {
  return (
    <script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
    />
  )
}

// Meta Pixel Script
export function MetaPixelScript({ pixelId }: { pixelId: string }) {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${pixelId}');
          fbq('track', 'PageView');
        `,
      }}
    />
  )
}

// Analytics event tracking utilities
export const analytics = {
  // Track custom event
  trackEvent: (eventName: string, properties?: Record<string, string | number>) => {
    // Google Analytics
    if (window.gtag) {
      window.gtag('event', eventName, properties)
    }
    // Plausible
    if (window.plausible) {
      window.plausible(eventName, { props: properties as Record<string, string> })
    }
    // Meta Pixel
    if (window.fbq) {
      window.fbq('track', eventName, properties)
    }
  },

  // Track form submission
  trackFormSubmit: (formName: string) => {
    analytics.trackEvent('form_submit', { form_name: formName })
  },

  // Track CTA click
  trackCtaClick: (ctaName: string, destination?: string) => {
    analytics.trackEvent('cta_click', { cta_name: ctaName, destination: destination || '' })
  },

  // Track conversion
  trackConversion: (conversionName: string, value?: number) => {
    analytics.trackEvent('conversion', { 
      conversion_name: conversionName, 
      value: value || 0 
    })

    // Meta Pixel specific conversion
    if (window.fbq) {
      window.fbq('track', 'Lead', { content_name: conversionName, value })
    }
  },
}
