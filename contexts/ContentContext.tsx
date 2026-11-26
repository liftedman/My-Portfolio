'use client';

import { createContext, useContext, useMemo } from 'react';
import { siteConfig } from '@/config/constants';
import type { SiteContent } from '@/lib/content';

const ContentContext = createContext<SiteContent | null>(null);

/** Hands content fetched on the server (lib/content.ts) to the client sections. */
export function ContentProvider({ content, children }: { content: SiteContent; children: React.ReactNode }) {
  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

export function useContent(): SiteContent {
  const content = useContext(ContentContext);
  if (!content) throw new Error('useContent must be used inside <ContentProvider>');
  return content;
}

/** In-page nav links, minus Awards while there are none to show. */
export function useNavLinks() {
  const { awards } = useContent();
  const hasAwards = awards.length > 0;
  return useMemo(
    () =>
      siteConfig.navigation.filter(
        (item) => item.href.startsWith('#') && (hasAwards || item.href !== '#awards')
      ),
    [hasAwards]
  );
}

/**
 * Two-digit section numbers for the eyebrows. Awards is optional, so the
 * sections after it shift down when it is hidden.
 */
export function useSectionNumbers() {
  const { awards } = useContent();
  const hasAwards = awards.length > 0;
  return {
    awards: '05',
    testimonials: hasAwards ? '06' : '05',
    contact: hasAwards ? '07' : '06',
  };
}
