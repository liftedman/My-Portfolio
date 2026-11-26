/**
 * Sanity connection settings. Both values are public: the dataset is read-only
 * without a token, and the Studio requires a Sanity login to edit anything.
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

/** Pinned so a Sanity API change can't silently alter query results. */
export const apiVersion = '2025-01-01';

/** False until the project ID is set — the site then falls back to config/*.ts. */
export const isSanityConfigured = projectId.length > 0;
