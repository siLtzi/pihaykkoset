import { defineType, defineField } from 'sanity'
import { Table } from 'lucide-react'

export const comparisonSection = defineType({
  name: 'comparisonSection',
  title: 'Comparison Table Section',
  type: 'object',
  icon: Table,
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
      name: 'columns',
      title: 'Comparison Columns',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Column Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'subtitle',
              title: 'Subtitle',
              type: 'string',
            }),
            defineField({
              name: 'highlighted',
              title: 'Highlighted',
              type: 'boolean',
              description: 'Highlight this column (e.g., "Our Solution")',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: 'title',
              highlighted: 'highlighted',
            },
            prepare({ title, highlighted }) {
              return {
                title: highlighted ? `⭐ ${title}` : title,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: 'rows',
      title: 'Comparison Rows',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'feature',
              title: 'Feature',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'values',
              title: 'Values',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'type',
                      title: 'Value Type',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Check (Yes)', value: 'check' },
                          { title: 'Cross (No)', value: 'cross' },
                          { title: 'Text', value: 'text' },
                          { title: 'Partial', value: 'partial' },
                        ],
                      },
                      initialValue: 'check',
                    }),
                    defineField({
                      name: 'text',
                      title: 'Text Value',
                      type: 'string',
                      hidden: ({ parent }) => parent?.type !== 'text',
                    }),
                  ],
                  preview: {
                    select: {
                      type: 'type',
                      text: 'text',
                    },
                    prepare({ type, text }) {
                      const icons: Record<string, string> = {
                        check: '✓',
                        cross: '✗',
                        partial: '◐',
                        text: text || 'Text',
                      }
                      return {
                        title: icons[type] || type,
                      }
                    },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: {
              title: 'feature',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'footnote',
      title: 'Footnote',
      type: 'text',
      rows: 2,
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
      columns: 'columns',
      rows: 'rows',
    },
    prepare({ title, columns, rows }) {
      return {
        title: title || 'Comparison Section',
        subtitle: `${columns?.length || 0} columns, ${rows?.length || 0} rows`,
      }
    },
  },
})
