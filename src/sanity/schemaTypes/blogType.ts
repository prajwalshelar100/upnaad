import { defineField, defineType } from 'sanity'

export const blogType = defineType({
  name: 'blog',
  title: 'Blog / Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Published Date',
      type: 'date',
      options: {
        dateFormat: 'MMMM D, YYYY',
      },
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Sound & Brain', value: 'Sound & Brain' },
          { title: 'Sanskrit Knowledge', value: 'Sanskrit Knowledge' },
          { title: 'Focus & Productivity', value: 'Focus & Productivity' },
          { title: 'Consciousness & Technology', value: 'Consciousness & Technology' },
        ],
      },
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'Used for SEO description and previews.',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'markdown',
      description: 'Markdown content for the article.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'date',
      media: 'coverImage',
    },
  },
})
