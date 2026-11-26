import { ClientProviders } from './ClientProviders';

/** Public site: smooth scroll, ambient background, custom cursor. The Studio sits outside this group. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <ClientProviders>{children}</ClientProviders>;
}
