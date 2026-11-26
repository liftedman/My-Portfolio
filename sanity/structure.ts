import type { StructureResolver } from 'sanity/structure';

export const SETTINGS_ID = 'siteSettings';

/** Sidebar of the Studio: one entry per section of the site, settings last. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('My Portfolio')
    .items([
      S.documentTypeListItem('project').title('Projects'),
      S.documentTypeListItem('experience').title('Experience'),
      S.documentTypeListItem('award').title('Awards'),
      S.documentTypeListItem('skill').title('Skills'),
      S.documentTypeListItem('testimonial').title('Testimonials'),
      S.divider(),
      S.listItem()
        .title('Site settings')
        .id(SETTINGS_ID)
        .child(S.document().schemaType('siteSettings').documentId(SETTINGS_ID).title('Site settings')),
    ]);
