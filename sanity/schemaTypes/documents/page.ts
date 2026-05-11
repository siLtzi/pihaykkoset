import { defineType, defineField, defineArrayMember } from 'sanity'
import { FileText } from 'lucide-react'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: FileText,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
    { name: 'settings', title: 'Settings' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The title of the page',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'The URL path for this page (leave empty for homepage)',
      options: {
        source: 'title',
        maxLength: 96,
      },
      group: 'settings',
    }),
    defineField({
      name: 'isHomepage',
      title: 'Is Homepage',
      type: 'boolean',
      description: 'Set this page as the homepage',
      initialValue: false,
      group: 'settings',
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'English', value: 'en' },
          { title: 'Finnish', value: 'fi' },
        ],
      },
      initialValue: 'en',
      group: 'settings',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      description: 'Add and arrange content sections for this page',
      group: 'content',
      of: [
        // Core sections
        defineArrayMember({ type: 'heroSection' }),
        defineArrayMember({ type: 'textSection' }),
        defineArrayMember({ type: 'featuresSection' }),
        defineArrayMember({ type: 'ctaSection' }),
        defineArrayMember({ type: 'contactSection' }),
        defineArrayMember({ type: 'faqSection' }),
      ],
      validation: (Rule) => [
        Rule.max(20).warning('Consider breaking this into multiple pages'),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      isHomepage: 'isHomepage',
      language: 'language',
    },
    prepare({ title, slug, isHomepage, language }) {
      const langFlag = language === 'fi' ? '🇫🇮' : '🇬🇧'
      return {
        title: `${langFlag} ${title}`,
        subtitle: isHomepage ? '/ (Homepage)' : `/${slug || ''}`,
      }
    },
  },
})
