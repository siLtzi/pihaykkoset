import { defineType, defineField } from 'sanity'
import { Users } from 'lucide-react'

export const teamSection = defineType({
  name: 'teamSection',
  title: 'Team Section',
  type: 'object',
  icon: Users,
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
          { title: 'Show All Team Members', value: 'all' },
          { title: 'Featured Only', value: 'featured' },
          { title: 'Select Specific Members', value: 'selected' },
        ],
      },
      initialValue: 'all',
    }),
    defineField({
      name: 'selectedMembers',
      title: 'Selected Team Members',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'teamMember' }] }],
      hidden: ({ parent }) => parent?.displayMode !== 'selected',
    }),
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'number',
      options: {
        list: [2, 3, 4],
      },
      initialValue: 3,
    }),
    defineField({
      name: 'showBio',
      title: 'Show Biography',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'showSocials',
      title: 'Show Social Links',
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
        title: title || 'Team Section',
        subtitle: `Display: ${displayMode || 'all'}`,
      }
    },
  },
})
