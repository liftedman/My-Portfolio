import { defineArrayMember, defineField, defineType } from 'sanity';

export const experience = defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'position',
      title: 'Job title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Started',
      description: 'Written as you want it shown, e.g. "Jan 2025".',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'current',
      title: 'I still work here',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'endDate',
      title: 'Ended',
      description: 'e.g. "Dec 2024".',
      type: 'string',
      hidden: ({ parent }) => Boolean(parent?.current),
    }),
    defineField({
      name: 'description',
      title: 'One-line summary',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'achievements',
      title: 'What I did / achieved',
      description: 'One point per line.',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      description: 'Type one and press Enter.',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'order',
      title: 'Position',
      description: '1 shows first. Put your most recent job first.',
      type: 'number',
      initialValue: 99,
    }),
  ],
  orderings: [{ title: 'Position', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'company', subtitle: 'position' },
  },
});
