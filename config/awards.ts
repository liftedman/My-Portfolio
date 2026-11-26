export interface Award {
  id: string;
  title: string;
  /** Who gave it, e.g. "Google Developer Groups". */
  issuer: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  description?: string;
  link?: string;
  image?: string;
}

/**
 * Fallback only. Awards are managed in the Sanity Studio at /studio; this list
 * is used when Sanity is not configured. The Awards section hides itself
 * while the list is empty.
 */
export const awards: Award[] = [];
