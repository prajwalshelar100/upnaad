import { defineField, defineType } from 'sanity'

export const musicType = defineType({
  name: 'music',
  title: 'Music Track',
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
      name: 'artwork',
      title: 'Artwork URL (or Upload Image)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'artworkUrlFallback',
      title: 'Artwork URL Fallback',
      type: 'url',
      description: 'Used for existing raw urls. You should ideally upload images moving forward.',
    }),
    defineField({
      name: 'spotifyUrl',
      title: 'Spotify URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'audioUrl',
      title: 'Audio File URL',
      type: 'url',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'genre',
      title: 'Genre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'relatedResearchSlug',
      title: 'Related Research Slug',
      type: 'string',
    }),
  ],
})
