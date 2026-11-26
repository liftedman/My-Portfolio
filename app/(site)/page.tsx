import { getSiteContent } from '@/lib/content';
import { HomeClient } from './HomeClient';

// Must be a literal for Next.js. Keep in sync with REVALIDATE_SECONDS in lib/content.ts.
// The Sanity webhook at /api/revalidate makes updates instant; this is the backstop.
export const revalidate = 60;

export default async function Home() {
  const content = await getSiteContent();
  return <HomeClient content={content} />;
}
