import { defineField, defineType } from 'sanity';

export const award = defineType({
  name: 'award',
  title: 'Award',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Award / certificate name',
      description: 'e.g. "Best Mobile App — DevFest Lagos"',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'issuer',
      title: 'Given by',
      description: 'The organisation that gave it.',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      options: { dateFormat: 'MMM YYYY' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short description (optional)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'link',
      title: 'Link (optional)',
      description: 'Announcement, certificate page or news article.',
      type: 'url',
    }),
    defineField({
      name: 'image',
      title: 'Photo or certificate (optional)',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  orderings: [{ title: 'Newest first', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] }],
  preview: {
    select: { title: 'title', issuer: 'issuer', date: 'date', media: 'image' },
    prepare: ({ title, issuer, date, media }) => ({
      title,
      subtitle: [issuer, date?.slice(0, 4)].filter(Boolean).join(' · '),
      media,
    }),
  },
});
