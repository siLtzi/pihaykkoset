import { defineType, defineField } from 'sanity'

// Character counter component for SEO fields
const CharacterCounter = ({ value, max, optimal }: { value?: string, max: number, optimal: { min: number, max: number } }) => {
  const length = value?.length || 0
  const isOptimal = length >= optimal.min && length <= optimal.max
  const isWarning = length > optimal.max && length <= max
  const isError = length > max
  
  return `${length}/${max} characters ${isOptimal ? '✓ Optimal' : isWarning ? '⚠ Long' : isError ? '✗ Too long' : ''}`
}

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Title for search engines (50-60 characters optimal)',
      validation: (Rule) => [
        Rule.max(70).warning('Meta titles over 70 characters may be truncated'),
        Rule.min(30).warning('Meta titles under 30 characters may be too short'),
      ],
      components: {
        // Character count shown in description
      },
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      description: 'Description for search engines (120-160 characters optimal)',
      rows: 3,
      validation: (Rule) => [
        Rule.max(160).warning('Meta descriptions over 160 characters will be truncated'),
        Rule.min(70).warning('Meta descriptions under 70 characters may be too short'),
      ],
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Target keywords for this page (for internal tracking)',
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Share Image',
      type: 'image',
      description: 'Image for social media sharing (1200x630 recommended)',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'ogTitle',
      title: 'Social Share Title',
      type: 'string',
      description: 'Override title for social media (uses Meta Title if empty)',
    }),
    defineField({
      name: 'ogDescription',
      title: 'Social Share Description',
      type: 'text',
      rows: 2,
      description: 'Override description for social media (uses Meta Description if empty)',
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'Override the canonical URL (for duplicate content)',
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from Search Engines',
      type: 'boolean',
      description: 'Enable to prevent this page from being indexed',
      initialValue: false,
    }),
    defineField({
      name: 'noFollow',
      title: 'No Follow Links',
      type: 'boolean',
      description: 'Prevent search engines from following links on this page',
      initialValue: false,
    }),
  ],
})
