/**
 * The admin screen: yoursite.com/studio. Only people invited to the Sanity
 * project can sign in and edit; everyone else just sees a login screen.
 */
import { NextStudio } from 'next-sanity/studio';
import config from '@/sanity.config';
import { isSanityConfigured } from '@/sanity/env';

export const dynamic = 'force-static';

export { metadata, viewport } from 'next-sanity/studio';

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main style={{ maxWidth: 560, margin: '15vh auto', padding: 24, fontFamily: 'system-ui, sans-serif' }}>
        <h1 style={{ fontSize: 24, marginBottom: 12 }}>Studio not connected yet</h1>
        <p style={{ lineHeight: 1.6 }}>
          Set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> in <code>.env.local</code> (and in Vercel), then restart.
          See <code>CMS.md</code> for the full steps.
        </p>
      </main>
    );
  }

  return <NextStudio config={config} />;
}
