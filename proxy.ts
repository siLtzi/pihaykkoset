import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './lib/i18n/config'

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed', // Only show prefix for non-default locale
})

export const config = {
  // Match all pathnames except for
  // - API routes
  // - Static files
  // - Studio routes
  matcher: [
    '/((?!api|_next|_vercel|studio|.*\\..*).*)',
  ],
}
