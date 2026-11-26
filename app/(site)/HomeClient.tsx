'use client';

import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { KeyboardShortcutsGuide } from '@/components/common/KeyboardShortcutsGuide';
import { Preloader } from '@/components/motion/Preloader';
import { Hero } from '@/components/sections/Hero';
import { TechBand } from '@/components/sections/TechBand';
import { About } from '@/components/sections/About';
import { Projects } from '@/components/sections/Projects';
import { Skills } from '@/components/sections/Skills';
import { Experience } from '@/components/sections/Experience';
import { Awards } from '@/components/sections/Awards';
import { Testimonials } from '@/components/sections/Testimonials';
import { Contact } from '@/components/sections/Contact';
import { IntroProvider } from '@/contexts/IntroContext';
import { ContentProvider } from '@/contexts/ContentContext';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import type { SiteContent } from '@/lib/content';

export function HomeClient({ content }: { content: SiteContent }) {
  useKeyboardShortcuts();

  return (
    <ContentProvider content={content}>
      <IntroProvider>
        <Preloader />
        <Navbar />
        <main className="relative">
          <Hero />
          <TechBand />
          <About />
          <Projects />
          <Skills />
          <Experience />
          <Awards />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
        <KeyboardShortcutsGuide />
      </IntroProvider>
    </ContentProvider>
  );
}
