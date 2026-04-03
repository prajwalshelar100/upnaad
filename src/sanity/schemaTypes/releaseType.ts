import { defineField, defineType, defineArrayMember } from 'sanity'

export const releaseType = defineType({
  name: 'release',
  title: 'Release',
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
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'thesis',
      title: 'Thesis',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content Block (Portable Text or Markdown String)',
      type: 'text', // Keeping as text to support existing markdown format. Later we could migrate to PortableText
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'coverImageUrlFallback',
      title: 'Cover Image URL Fallback',
      type: 'url',
    }),
    defineField({
      name: 'spotifyUrl',
      title: 'Spotify Embed URL',
      type: 'url',
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube Embed URL',
      type: 'url',
    }),
    defineField({
      name: 'podcastUrl',
      title: 'Podcast Embed URL',
      type: 'url',
    }),
    defineField({
      name: 'pdfLink',
      title: 'PDF Link',
      type: 'url',
    }),
    defineField({
      name: 'isMusicComingSoon',
      title: 'Is Music Coming Soon?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isPodcastComingSoon',
      title: 'Is Podcast Coming Soon?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'lyrics',
      title: 'Lyrics',
      type: 'text',
    }),
    defineField({
      name: 'sanskritText',
      title: 'Sanskrit Text (Orig)',
      type: 'text',
    }),
    defineField({
      name: 'transliteration',
      title: 'Transliteration',
      type: 'text',
    }),
    defineField({
      name: 'simpleMeaning',
      title: 'Simple Meaning',
      type: 'text',
    }),
    defineField({
      name: 'deepInterpretation',
      title: 'Deep Interpretation',
      type: 'text',
    }),
    defineField({
      name: 'philosophicalExplanation',
      title: 'Scientific / Philosophical Explanation',
      type: 'text',
    }),
    defineField({
      name: 'whyItMatters',
      title: 'Why It Matters Today',
      type: 'text',
    }),
    defineField({
      name: 'relatedReleases',
      title: 'Related Releases / Songs',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'release' }] }],
    }),

    defineField({
      name: 'topics',
      title: 'Topics',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'references',
      title: 'References',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'string' }),
            defineField({ name: 'authors', type: 'string' }),
            defineField({ name: 'journal', type: 'string' }),
            defineField({ name: 'year', type: 'number' }),
            defineField({ name: 'link', type: 'url' }),
          ],
        }),
      ],
    }),
  ],
})
