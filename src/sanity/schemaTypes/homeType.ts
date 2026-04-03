import { defineField, defineType } from 'sanity'

export const homeType = defineType({
  name: 'home',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      initialValue: 'UPNAAD',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Tagline',
      type: 'string',
      initialValue: 'Sound × Consciousness × Technology',
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      initialValue: 'Meaning in every note. Sound with Substance.',
    }),
    defineField({
      name: 'logo',
      title: 'Site Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'listenButtonText',
      title: 'Listen Button Text',
      type: 'string',
      initialValue: 'Listen',
    }),
    defineField({
      name: 'exploreButtonText',
      title: 'Explore Button Text',
      type: 'string',
      initialValue: 'Explore Meaning',
    }),
    defineField({
      name: 'workWithMeButtonText',
      title: 'Work With Me Button Text',
      type: 'string',
      initialValue: 'Work With Me',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
  },
})

