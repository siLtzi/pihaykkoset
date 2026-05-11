import 'server-only'

import { createClient, type QueryOptions, type QueryParams } from 'next-sanity'
import { draftMode } from 'next/headers'
import { projectId, dataset, apiVersion } from './client'
import { token } from '../env'

// Client for published content
const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  stega: {
    enabled: false,
  },
})

// Client for draft content with stega encoding for Visual Editing
const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
  perspective: 'previewDrafts',
  stega: {
    enabled: true,
    studioUrl: '/studio',
  },
})

export async function sanityFetch<T>({
  query,
  params = {},
  tags,
}: {
  query: string
  params?: QueryParams
  tags?: string[]
}): Promise<{ data: T }> {
  const { isEnabled: isDraftMode } = await draftMode()

  const options: QueryOptions = {
    next: {
      revalidate: isDraftMode ? 0 : 60,
      tags,
    },
  }

  const activeClient = isDraftMode ? previewClient : client
  const data = await activeClient.fetch<T>(query, params, options)

  return { data }
}
