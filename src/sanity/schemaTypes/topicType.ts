import { defineField, defineType } from 'sanity'
import { Flame, Brain, Music } from 'lucide-react'

export const topicType = defineType({
  name: 'topic',
  title: 'Topic',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Social', value: 'Social' },
          { title: 'Mental Health', value: 'Mental Health' },
          { title: 'Technology', value: 'Technology' },
          { title: 'Society', value: 'Society' },
          { title: 'Philosophy', value: 'Philosophy' },
          { title: 'Other', value: 'Other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Trending', value: 'Trending' },
          { title: 'Under Research', value: 'Under Research' },
          { title: 'Song Released', value: 'Song Released' },
        ],
      },
      initialValue: 'Trending',
    }),
    defineField({
      name: 'upvotes',
      title: 'Upvotes',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'downvotes',
      title: 'Downvotes',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'songLink',
      title: 'Song Link',
      type: 'string',
      description: 'Optional link to a released song related to this topic',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
    },
  },
})
