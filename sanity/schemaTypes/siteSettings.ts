import { defineArrayMember, defineField, defineType } from 'sanity';

/** Single document (id "siteSettings") for details used across the whole site. */
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Contact email',
      type: 'string',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'profilePhoto',
      title: 'Profile photo',
      description: 'Used in the hero and About sections. Portrait works best.',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'resume',
      title: 'Résumé / CV (PDF)',
      description: 'Opened by the "Résumé" button. Upload a new file to replace it.',
      type: 'file',
      options: { accept: 'application/pdf' },
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social links',
      description: 'Shown in the menu, contact section and footer. Drag to reorder.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'socialLink',
          fields: [
            defineField({
              name: 'platform',
              title: 'Name',
              description: 'e.g. "GitHub", "LinkedIn"',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'Link',
              type: 'url',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: 'platform', subtitle: 'url' } },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site settings' }),
  },
});
