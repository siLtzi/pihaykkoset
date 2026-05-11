import { sanityFetch } from './live'
import {
  siteSettingsQuery,
  navigationQuery,
  allPagesQuery,
  pageBySlugQuery,
  homepageQuery,
  allPageSlugsQuery,
} from './queries'
import type {
  SiteSettings,
  Navigation,
  Page,
  PageSummary,
} from '@/types/sanity'

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const { data } = await sanityFetch({
    query: siteSettingsQuery,
  })
  return data
}

export async function getNavigation(identifier: 'header' | 'footer'): Promise<Navigation | null> {
  const { data } = await sanityFetch({
    query: navigationQuery,
    params: { identifier },
  })
  return data
}

export async function getAllPages(): Promise<PageSummary[]> {
  const { data } = await sanityFetch({
    query: allPagesQuery,
  })
  return data || []
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const { data } = await sanityFetch({
    query: pageBySlugQuery,
    params: { slug },
  })
  return data
}

export async function getHomepage(): Promise<Page | null> {
  const { data } = await sanityFetch({
    query: homepageQuery,
  })
  return data
}

export async function getAllPageSlugs(): Promise<{ slug: string }[]> {
  const { data } = await sanityFetch({
    query: allPageSlugsQuery,
  })
  return data || []
}
