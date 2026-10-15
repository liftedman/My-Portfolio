'use client';

import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { projects, type Project } from '@/config/projects';
import { siteConfig } from '@/config/constants';
import { Arrow, Eyebrow, Magnetic, SplitReveal, TiltCard } from '@/components/motion/primitives';

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

const pad = (n: number) => String(n).padStart(2, '0');

function StatusChip({ project }: { project: Project }) {
  const live = project.status === 'live';
  return (
    // Fixed dark styling: this sits on screenshots, whose brightness varies.
    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/55 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-white backdrop-blur-md">
      <span className={`h-1.5 w-1.5 rounded-full ${live ? 'pulse-dot bg-accent' : 'bg-faint'}`} />
      {live ? 'Live' : project.status === 'archived' ? 'Archived' : 'Private'}
    </span>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="group w-full shrink-0 lg:w-[min(62vw,960px)]">
      <Link href={`/projects/${project.id}`} data-cursor="View" aria-label={`${project.title} case study`}>
        <TiltCard max={5}>
          <div className="relative aspect-[16/10] overflow-hidden rounded-[1.75rem] border border-line bg-surface">
            <Image
              src={project.image}
              alt={`${project.title} interface`}
              fill
              sizes="(max-width: 1024px) 100vw, 62vw"
              className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/35 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-black/45 to-transparent" />

            <div className="tilt-pop-sm absolute left-5 right-5 top-5 flex items-center justify-between">
              <span className="font-mono text-xs text-white/80">
                {pad(index + 1)} / {pad(projects.length)}
              </span>
              <StatusChip project={project} />
            </div>

            <div className="tilt-pop absolute bottom-6 left-6 right-6 text-white">
              <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">
                {project.category} · {project.year}
              </p>
              <h3 className="font-display-tight text-[clamp(2.4rem,5.5vw,5.5rem)]">{project.title.split(' - ')[0]}</h3>
            </div>
          </div>
        </TiltCard>
      </Link>

      <div className="mt-6 grid gap-5 sm:grid-cols-[1fr_auto] sm:items-start">
        <div>
          <p className="max-w-xl text-muted">{project.shortDescription}.</p>
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
            {project.technologies.slice(0, 5).map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-2">
          <Link href={`/projects/${project.id}`} className="btn-pill py-3!">
            Case study
          </Link>
          {project.status === 'live' && project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-circle"
              aria-label={`Visit ${project.title} (opens in a new tab)`}
            >
              <Arrow direction="up-right" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function Intro() {
  return (
    <div className="flex w-full shrink-0 flex-col justify-between lg:w-[min(34vw,520px)]">
      <div>
        <Eyebrow index="02">Selected works</Eyebrow>
        <SplitReveal
          as="h2"
          text="Things I've shipped"
          className="font-display-tight text-[clamp(3rem,7vw,7rem)]"
        />
        <p className="mt-6 max-w-md text-muted">
          Fintech, healthcare, security and faith — products built end-to-end and used by real
          people. Each one has a short case study behind it.
        </p>
      </div>
      <p className="mt-10 hidden font-mono text-xs uppercase tracking-[0.18em] text-faint lg:block">
        Keep scrolling →
      </p>
    </div>
  );
}

function Outro() {
  return (
    <div className="flex w-full shrink-0 items-center justify-center py-10 lg:w-[min(30vw,440px)]">
      <Magnetic strength={0.25}>
        <a
          href={siteConfig.socialLinks.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex h-56 w-56 flex-col items-center justify-center rounded-full border border-line-strong text-center transition-colors duration-500 hover:border-accent hover:bg-accent hover:text-on-accent sm:h-64 sm:w-64"
        >
          <span className="font-display text-2xl font-bold">More on GitHub</span>
          <span className="mt-2 text-2xl transition-transform duration-500 group-hover:rotate-45">
            <Arrow direction="up-right" />
          </span>
        </a>
      </Magnetic>
    </div>
  );
}

export const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [distance, setDistance] = useState(0);
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)');
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  // How far the track has to travel sideways: its full width minus one screen.
  useIsomorphicLayoutEffect(() => {
    const track = trackRef.current;
    if (!track || !isDesktop) return;
    const measure = () => setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [isDesktop]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    setCurrent(Math.min(projects.length, Math.max(1, Math.round(p * (projects.length - 1)) + 1)));
  });

  if (!isDesktop) {
    return (
      <section id="projects" ref={sectionRef} className="relative py-16 sm:py-24">
        <div className="shell space-y-16 sm:space-y-20">
          <Intro />
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard project={project} index={i} />
            </motion.div>
          ))}
          <Outro />
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative"
      // Vertical room equal to the sideways travel, plus the pinned screen itself.
      style={{ height: `calc(100vh + ${distance}px)` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.div
          ref={trackRef}
          className="flex items-center gap-16 pl-[max(4rem,calc((100vw-1400px)/2+4rem))] pr-16 pt-10"
          style={{ x }}
        >
          <Intro />
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
          <Outro />
        </motion.div>

        {/* Progress */}
        <div className="shell mt-8 flex items-center gap-6 font-mono text-xs text-faint">
          <span className="tabular-nums text-fg">{pad(current)}</span>
          <div className="h-px flex-1 bg-line">
            <motion.div className="h-px origin-left bg-accent" style={{ scaleX: smooth }} />
          </div>
          <span className="tabular-nums">{pad(projects.length)}</span>
        </div>
      </div>
    </section>
  );
};
