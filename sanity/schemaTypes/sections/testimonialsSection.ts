import { defineType, defineField } from 'sanity'
import { Quote } from 'lucide-react'

export const testimonialsSection = defineType({
  name: 'testimonialsSection',
  title: 'Testimonials Section',
  type: 'object',
  icon: Quote,
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
          { title: 'All Testimonials', value: 'all' },
          { title: 'Featured Only', value: 'featured' },
          { title: 'Select Specific', value: 'selected' },
        ],
      },
      initialValue: 'featured',
    }),
    defineField({
      name: 'selectedTestimonials',
      title: 'Selected Testimonials',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
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
          { title: 'Single Featured', value: 'single' },
          { title: 'Masonry', value: 'masonry' },
        ],
      },
      initialValue: 'carousel',
    }),
    defineField({
      name: 'showRating',
      title: 'Show Star Rating',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showCompanyLogo',
      title: 'Show Company Logo',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Gray', value: 'gray' },
          { title: 'Primary', value: 'primary' },
        ],
      },
      initialValue: 'gray',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      layout: 'layout',
    },
    prepare({ title, layout }) {
      return {
        title: title || 'Testimonials Section',
        subtitle: `Layout: ${layout || 'carousel'}`,
      }
    },
  },
})
