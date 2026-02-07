'use client';

import { Navbar } from '@/components/common/Navbar';
import { CustomCursor } from '@/components/common/CustomCursor';
import { Footer } from '@/components/common/Footer';
import { KeyboardShortcutsGuide } from '@/components/common/KeyboardShortcutsGuide';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Projects } from '@/components/sections/Projects';
import { Skills } from '@/components/sections/Skills';
import { Experience } from '@/components/sections/Experience';
import { Testimonials } from '@/components/sections/Testimonials';
import { Contact } from '@/components/sections/Contact';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

export default function Home() {
  useKeyboardShortcuts();

  return (
    <main className="min-h-screen bg-slate-950 dark:bg-slate-950 light:bg-white">
      <CustomCursor />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Testimonials />
      <Contact />
      <Footer />
      <KeyboardShortcutsGuide />
    </main>
  );
}
