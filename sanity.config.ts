'use client';

/**
 * The admin screen ("Studio") served at /studio. Edit content there instead of
 * in config/*.ts — the site reads from Sanity and only falls back to those
 * files when Sanity is not configured.
 */
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { apiVersion, dataset, projectId } from './sanity/env';
import { schemaTypes } from './sanity/schemaTypes';
import { structure } from './sanity/structure';

export default defineConfig({
  name: 'portfolio',
  title: 'My Portfolio',
  basePath: '/studio',
  projectId,
  dataset,
  apiVersion,
  schema: {
    types: schemaTypes,
    // Site settings is a single document reached from the sidebar, never "new".
    templates: (templates) => templates.filter((t) => t.schemaType !== 'siteSettings'),
  },
  document: {
    actions: (actions, { schemaType }) =>
      schemaType === 'siteSettings'
        ? actions.filter(({ action }) => action !== 'delete' && action !== 'duplicate' && action !== 'unpublish')
        : actions,
    newDocumentOptions: (options) => options.filter((o) => o.templateId !== 'siteSettings'),
  },
  plugins: [structureTool({ structure, title: 'Content' })],
});

