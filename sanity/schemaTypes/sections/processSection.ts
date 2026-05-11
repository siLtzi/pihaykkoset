import { defineType, defineField } from 'sanity'
import { GitBranch } from 'lucide-react'

export const processSection = defineType({
  name: 'processSection',
  title: 'Process Section',
  type: 'object',
  icon: GitBranch,
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
      name: 'steps',
      title: 'Process Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Step Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Lucide icon name',
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              media: 'image',
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(8),
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Timeline (Vertical)', value: 'timeline' },
          { title: 'Horizontal Steps', value: 'horizontal' },
          { title: 'Alternating', value: 'alternating' },
          { title: 'Cards', value: 'cards' },
        ],
      },
      initialValue: 'timeline',
    }),
    defineField({
      name: 'showNumbers',
      title: 'Show Step Numbers',
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
      steps: 'steps',
    },
    prepare({ title, steps }) {
      return {
        title: title || 'Process Section',
        subtitle: `${steps?.length || 0} steps`,
      }
    },
  },
})
