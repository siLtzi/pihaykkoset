import { defineType, defineField } from 'sanity'
import { DollarSign } from 'lucide-react'

export const pricingSection = defineType({
  name: 'pricingSection',
  title: 'Pricing Section',
  type: 'object',
  icon: DollarSign,
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
      name: 'plans',
      title: 'Pricing Plans',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Plan Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'price',
              title: 'Price',
              type: 'string',
              description: 'e.g., "€99", "Free", "Custom"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'priceUnit',
              title: 'Price Unit',
              type: 'string',
              options: {
                list: [
                  { title: 'Per Month', value: '/mo' },
                  { title: 'Per Year', value: '/yr' },
                  { title: 'One-time', value: '' },
                  { title: 'Per Project', value: '/project' },
                ],
              },
              initialValue: '/mo',
            }),
            defineField({
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'text',
                      title: 'Feature Text',
                      type: 'string',
                    }),
                    defineField({
                      name: 'included',
                      title: 'Included',
                      type: 'boolean',
                      initialValue: true,
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'text',
                      included: 'included',
                    },
                    prepare({ title, included }) {
                      return {
                        title,
                        subtitle: included ? '✓ Included' : '✗ Not included',
                      }
                    },
                  },
                },
              ],
            }),
            defineField({
              name: 'highlighted',
              title: 'Highlighted',
              type: 'boolean',
              description: 'Make this plan stand out (recommended plan)',
              initialValue: false,
            }),
            defineField({
              name: 'badge',
              title: 'Badge Text',
              type: 'string',
              description: 'e.g., "Most Popular", "Best Value"',
            }),
            defineField({
              name: 'ctaText',
              title: 'CTA Button Text',
              type: 'string',
              initialValue: 'Get Started',
            }),
            defineField({
              name: 'ctaLink',
              title: 'CTA Link',
              type: 'link',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'price',
              highlighted: 'highlighted',
            },
            prepare({ title, subtitle, highlighted }) {
              return {
                title: highlighted ? `⭐ ${title}` : title,
                subtitle,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: 'footnote',
      title: 'Footnote',
      type: 'text',
      rows: 2,
      description: 'Additional info below pricing cards',
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
    },
    prepare({ title }) {
      return {
        title: title || 'Pricing Section',
        subtitle: 'Pricing Plans',
      }
    },
  },
})
