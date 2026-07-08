import { cache } from 'react'
import { sanityFetch } from './live'
import { client } from './client'
import {
  siteSettingsQuery,
  navigationQuery,
  allPagesQuery,
  pageBySlugQuery,
  homepageQuery,
  allPageSlugsQuery,
  homePageQuery,
} from './queries'
import type {
  SiteSettings,
  Navigation,
  Page,
  PageSummary,
  HomePage,
} from '@/types/sanity'

export const getSiteSettings = cache(async (): Promise<SiteSettings | null> => {
  const { data } = await sanityFetch<SiteSettings | null>({
    query: siteSettingsQuery,
  })
  return data
})

export async function getNavigation(identifier: 'header' | 'footer'): Promise<Navigation | null> {
  const { data } = await sanityFetch<Navigation | null>({
    query: navigationQuery,
    params: { identifier },
  })
  return data
}

export async function getAllPages(): Promise<PageSummary[]> {
  const { data } = await sanityFetch<PageSummary[] | null>({
    query: allPagesQuery,
  })
  return data || []
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const { data } = await sanityFetch<Page | null>({
    query: pageBySlugQuery,
    params: { slug },
  })
  return data
}

export async function getHomepage(): Promise<Page | null> {
  const { data } = await sanityFetch<Page | null>({
    query: homepageQuery,
  })
  return data
}

export async function getAllPageSlugs(): Promise<{ slug: string }[]> {
  // Use the published client directly so this can be called from generateStaticParams
  // (where draftMode() is not available).
  const data = await client.fetch<{ slug: string }[] | null>(allPageSlugsQuery)
  return data || []
}

export const getHomePage = cache(async (): Promise<HomePage | null> => {
  const { data } = await sanityFetch<HomePage | null>({
    query: homePageQuery,
    tags: ['homePage'],
  })
  return data
})
