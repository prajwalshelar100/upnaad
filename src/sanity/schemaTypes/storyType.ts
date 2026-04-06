import { defineField, defineType } from 'sanity'
import { BookOpen } from 'lucide-react'

export const storyType = defineType({
  name: 'story',
  title: 'Story',
  type: 'document',
  icon: BookOpen,
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
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author / Submitter',
      type: 'string',
      description: 'Name of the person who wrote or submitted the story',
      initialValue: 'Anonymous',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'A short summary of the story for the gallery view',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
      description: 'The full story content (Markdown supported)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Emotion', value: 'Emotion' },
          { title: 'Awareness', value: 'Awareness' },
          { title: 'Insight', value: 'Insight' },
          { title: 'Philosophy', value: 'Philosophy' },
          { title: 'Personal Narrative', value: 'Personal Narrative' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      initialValue: () => new Date().toISOString().split('T')[0],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Story',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
      media: 'coverImage',
    },
    prepare(selection) {
      const { title, author, media } = selection
      return {
        title: title,
        subtitle: `by ${author}`,
        media: media,
      }
    },
  },
})
