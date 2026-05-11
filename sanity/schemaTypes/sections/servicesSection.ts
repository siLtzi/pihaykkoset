import { defineType, defineField } from 'sanity'
import { Wrench } from 'lucide-react'

export const servicesSection = defineType({
  name: 'servicesSection',
  title: 'Services Section',
  type: 'object',
  icon: Wrench,
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
          { title: 'All Services', value: 'all' },
          { title: 'Featured Only', value: 'featured' },
          { title: 'Select Specific', value: 'selected' },
        ],
      },
      initialValue: 'featured',
    }),
    defineField({
      name: 'selectedServices',
      title: 'Selected Services',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
      hidden: ({ parent }) => parent?.displayMode !== 'selected',
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Grid', value: 'grid' },
          { title: 'List', value: 'list' },
          { title: 'Cards', value: 'cards' },
        ],
      },
      initialValue: 'grid',
    }),
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'number',
      options: {
        list: [2, 3, 4],
      },
      initialValue: 3,
      hidden: ({ parent }) => parent?.layout === 'list',
    }),
    defineField({
      name: 'showDescription',
      title: 'Show Description',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showLearnMore',
      title: 'Show Learn More Link',
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
        ],
      },
      initialValue: 'white',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      displayMode: 'displayMode',
    },
    prepare({ title, displayMode }) {
      return {
        title: title || 'Services Section',
        subtitle: `Display: ${displayMode || 'featured'}`,
      }
    },
  },
})
