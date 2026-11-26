'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { Award } from '@/config/awards';
import { useContent, useSectionNumbers } from '@/contexts/ContentContext';
import { Arrow, Eyebrow, SplitReveal } from '@/components/motion/primitives';

const EASE = [0.22, 1, 0.36, 1] as const;

/** "2025-03-14" → "Mar 2025". Parsed by hand so the server and browser agree. */
function formatDate(iso: string) {
  const [year, month] = iso.split('-').map(Number);
  if (!year) return '';
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return month ? `${months[month - 1]} ${year}` : String(year);
}

function AwardRow({ award }: { award: Award }) {
  const body = (
    <>
      <span className="font-mono text-xs uppercase tracking-[0.15em] text-faint">{formatDate(award.date)}</span>

      <span className="flex items-start gap-5">
        {award.image && (
          <span className="relative hidden h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-line bg-surface sm:block">
            <Image src={award.image} alt="" fill sizes="64px" className="object-cover" />
          </span>
        )}
        <span>
          <span className="block font-display text-2xl font-bold tracking-tight transition-transform duration-500 group-hover:translate-x-2 sm:text-4xl">
            {award.title}
          </span>
          <span className="mt-1 block text-muted">{award.issuer}</span>
          {award.description && <span className="mt-3 block max-w-2xl text-sm text-muted">{award.description}</span>}
        </span>
      </span>

      {award.link ? (
        <span
          className="hidden h-12 w-12 items-center justify-center rounded-full border border-line-strong text-xl transition-all duration-500 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent sm:flex"
          aria-hidden="true"
        >
          <Arrow direction="up-right" />
        </span>
      ) : (
        <span className="hidden sm:block" />
      )}
    </>
  );

  const className = 'group grid w-full gap-2 py-7 text-left sm:grid-cols-[180px_1fr_auto] sm:items-center sm:gap-8';

  return award.link ? (
    <a
      href={award.link}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={`${award.title}, ${award.issuer} (opens in a new tab)`}
    >
      {body}
    </a>
  ) : (
    <div className={className}>{body}</div>
  );
}

/** Recognition and certificates. Hidden until at least one award is added in the Studio. */
export const Awards: React.FC = () => {
  const { awards } = useContent();
  const numbers = useSectionNumbers();

  if (awards.length === 0) return null;

  return (
    <section id="awards" className="relative py-20 sm:py-28 lg:py-36">
      <div className="shell">
        <div className="mb-16 grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <Eyebrow index={numbers.awards}>Recognition</Eyebrow>
            <SplitReveal as="h2" text="Awards & honours" className="font-display-tight text-[clamp(3rem,8vw,8rem)]" />
          </div>
          <p className="max-w-md text-muted lg:justify-self-end">
            Competitions, certifications and moments where the work was recognised by people outside
            the team.
          </p>
        </div>

        <ol className="border-b border-line">
          {awards.map((award, i) => (
            <motion.li
              key={award.id}
              className="border-t border-line"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
            >
              <AwardRow award={award} />
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
};
