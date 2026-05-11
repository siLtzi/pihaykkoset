import { defineType, defineField } from 'sanity'
import { Briefcase } from 'lucide-react'

export const caseStudiesSection = defineType({
  name: 'caseStudiesSection',
  title: 'Case Studies Section',
  type: 'object',
  icon: Briefcase,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'displayMode',
      title: 'Display Mode',
      type: 'string',
      options: {
        list: [
          { title: 'All Case Studies', value: 'all' },
          { title: 'Featured Only', value: 'featured' },
          { title: 'Select Specific', value: 'selected' },
        ],
      },
      initialValue: 'featured',
    }),
    defineField({
      name: 'selectedCaseStudies',
      title: 'Selected Case Studies',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'caseStudy' }] }],
      hidden: ({ parent }) => parent?.displayMode !== 'selected',
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Grid', value: 'grid' },
          { title: 'Carousel', value: 'carousel' },
          { title: 'Featured + List', value: 'featured-list' },
        ],
      },
      initialValue: 'grid',
    }),
    defineField({
      name: 'showMetrics',
      title: 'Show Key Metrics',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showIndustry',
      title: 'Show Industry Tags',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'ctaText',
      title: 'View All CTA Text',
      type: 'string',
      initialValue: 'View All Case Studies',
    }),
    defineField({
      name: 'ctaLink',
      title: 'View All Link',
      type: 'link',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Gray', value: 'gray' },
        ],
      },
      initialValue: 'gray',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      displayMode: 'displayMode',
    },
    prepare({ title, displayMode }) {
      return {
        title: title || 'Case Studies Section',
        subtitle: `Display: ${displayMode || 'featured'}`,
      }
    },
  },
})
