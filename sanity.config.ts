import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool, defineLocations } from 'sanity/presentation'
import { visionTool } from '@sanity/vision'
import { schema } from './sanity/schemaTypes'
import { structure, defaultDocumentNode } from './sanity/structure'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

if (!projectId) {
  console.warn('Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable')
}

// Resolve the URL for the preview iframe
const SANITY_STUDIO_PREVIEW_URL = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'

export default defineConfig({
  name: 'default',
  title: 'Pihaykköset CMS',
  
  projectId,
  dataset,
  
  basePath: '/studio',
  
  plugins: [
    structureTool({ 
      structure,
      defaultDocumentNode,
    }),
    presentationTool({
      previewUrl: {
        origin: SANITY_STUDIO_PREVIEW_URL,
        draftMode: {
          enable: '/api/draft-mode/enable',
        },
      },
      resolve: {
        // Resolve document URLs for the Presentation tool
        locations: {
          page: defineLocations({
            select: { slug: 'slug.current', isHomepage: 'isHomepage', title: 'title' },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.isHomepage
                    ? 'Etusivu'
                    : (doc?.title as string | undefined) || (doc?.slug as string | undefined) || 'Sivu',
                  href: doc?.isHomepage ? '/' : `/${(doc?.slug as string | undefined) || ''}`,
                },
              ],
            }),
          }),
          homePage: defineLocations({
            select: { _id: '_id' },
            resolve: () => ({
              locations: [{ title: 'Etusivu', href: '/' }],
            }),
          }),
        },
      },
    }),
    visionTool({ defaultApiVersion: '2024-01-01' }),
  ],
  
  schema,
  
  // Configure the document actions
  document: {
    // Hide 'delete' action for singleton documents
    actions: (prev, context) => {
      if (context.schemaType === 'siteSettings' || context.schemaType === 'homePage') {
        return prev.filter(action => action.action !== 'delete' && action.action !== 'duplicate')
      }
      return prev
    },
  },
})
