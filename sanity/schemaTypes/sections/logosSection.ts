import { defineType, defineField } from 'sanity'
import { Building2 } from 'lucide-react'

export const logosSection = defineType({
  name: 'logosSection',
  title: 'Logos Section',
  type: 'object',
  icon: Building2,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'e.g., "Trusted by", "Our Partners"',
    }),
    defineField({
      name: 'logos',
      title: 'Logos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Company Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'logo',
              title: 'Logo',
              type: 'image',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'Website URL',
              type: 'url',
              description: 'Optional link to company website',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              media: 'logo',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'style',
      title: 'Display Style',
      type: 'string',
      options: {
        list: [
          { title: 'Grid', value: 'grid' },
          { title: 'Scrolling', value: 'marquee' },
          { title: 'Single Row', value: 'row' },
        ],
      },
      initialValue: 'row',
    }),
    defineField({
      name: 'grayscale',
      title: 'Grayscale Logos',
      type: 'boolean',
      description: 'Display logos in grayscale (hover to show color)',
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
      logos: 'logos',
    },
    prepare({ title, logos }) {
      return {
        title: title || 'Logos Section',
        subtitle: `${logos?.length || 0} logos`,
      }
    },
  },
})
