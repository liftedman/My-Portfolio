import { defineField, defineType } from 'sanity';

export const SKILL_CATEGORIES = ['Languages', 'Frameworks', 'Databases', 'Cloud & Tools'];

export const skill = defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Skill',
      description: 'e.g. "Flutter"',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Group',
      type: 'string',
      options: { list: SKILL_CATEGORIES, layout: 'radio' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'level',
      title: 'How strong',
      type: 'string',
      options: {
        list: [
          { title: 'Expert (3 bars)', value: 'expert' },
          { title: 'Comfortable (2 bars)', value: 'intermediate' },
          { title: 'Learning (1 bar)', value: 'beginner' },
        ],
        layout: 'radio',
      },
      initialValue: 'intermediate',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Position in its group',
      type: 'number',
      initialValue: 99,
    }),
  ],
  orderings: [{ title: 'Group', name: 'category', by: [{ field: 'category', direction: 'asc' }, { field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'name', category: 'category', level: 'level' },
    prepare: ({ title, category, level }) => ({ title, subtitle: `${category} · ${level}` }),
  },
});
