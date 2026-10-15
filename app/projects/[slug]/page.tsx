import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects } from '@/config/projects';
import { siteConfig, siteUrl } from '@/config/constants';
import { Arrow } from '@/components/motion/primitives';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);

  if (!project) {
    return { title: 'Project not found' };
  }

  const title = `${project.title} — Case Study | ${siteConfig.name}`;

  return {
    title,
    description: project.shortDescription,
    alternates: {
      canonical: `${siteUrl}/projects/${project.id}`,
    },
    openGraph: {
      title,
      description: project.shortDescription,
      type: 'article',
      url: `${siteUrl}/projects/${project.id}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: project.shortDescription,
    },
  };
}

/** Renders a titled block only when there is something to say. */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-4 border-t border-line py-10 md:grid-cols-[220px_1fr] md:gap-10">
      <h2 className="eyebrow pt-1">{title}</h2>
      <div>{children}</div>
    </section>
  );
}

export default async function ProjectCaseStudy({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);

  if (!project) {
    notFound();
  }

  const study = project.caseStudy;
  const index = projects.findIndex((p) => p.id === project.id);
  const next = projects[(index + 1) % projects.length];

  return (
    <main className="min-h-screen pb-0 pt-10">
      <article className="shell">
        <Link
          href="/#projects"
          className="btn-pill mb-16 py-3!"
        >
          <span aria-hidden="true">←</span> All projects
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="mb-6 flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.15em] text-muted">
            <span>{project.year}</span>
            <span className="text-faint" aria-hidden="true">
              /
            </span>
            <span>{project.role}</span>
            {project.status !== 'live' && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-3 py-1 text-[10px]">
                <span className="h-1.5 w-1.5 rounded-full bg-faint" />
                {project.status === 'archived' ? 'Archived' : 'Private'}
              </span>
            )}
          </div>

          <h1 className="font-display-tight text-[clamp(3.5rem,11vw,10rem)]">
            {project.title}
            <span className="text-accent">.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-muted">{project.shortDescription}</p>
        </header>

        {/* Hero image */}
        <div className="relative mb-12 aspect-[16/9] w-full overflow-hidden rounded-[2rem] border border-line bg-surface">
          <Image
            src={project.image}
            alt={`${project.title} interface`}
            fill
            className="object-cover"
            sizes="(max-width: 1400px) 100vw, 1400px"
            priority
          />
        </div>

        <div className="mx-auto max-w-5xl">
          {/* Availability */}
          {project.status === 'live' && project.link ? (
            <div className="mb-12">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill solid"
              >
                Visit {project.title}
                <Arrow direction="up-right" />
              </a>
            </div>
          ) : (
            project.statusNote && (
              <div className="mb-12 rounded-2xl border border-line bg-surface p-5">
                <p className="text-sm leading-relaxed text-muted">{project.statusNote}</p>
              </div>
            )
          )}

          {study?.problem && (
            <Section title="The problem">
              <p className="text-lg leading-relaxed text-muted">{study.problem}</p>
            </Section>
          )}

          {study?.constraints && (
            <Section title="Constraints">
              <p className="text-lg leading-relaxed text-muted">{study.constraints}</p>
            </Section>
          )}

          <Section title="What I built">
            <p className="text-lg leading-relaxed text-muted">{project.description}</p>
          </Section>

          {study?.decision && (
            <Section title={study.decision.title}>
              <p className="text-lg leading-relaxed text-muted">{study.decision.body}</p>
            </Section>
          )}

          <Section title="Key highlights">
            <ul className="space-y-3">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3 text-lg text-muted">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </Section>

          {study?.outcome && (
            <Section title="Outcome">
              <p className="text-lg leading-relaxed text-muted">{study.outcome}</p>
            </Section>
          )}

          <Section title="Technologies">
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-line-strong px-3 py-1.5 font-mono text-xs uppercase tracking-wider"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Section>

          {/* Additional screenshots */}
          {project.images.length > 1 && (
            <Section title="Screens">
              <div className="grid gap-4 sm:grid-cols-2">
                {project.images.slice(1).map((src, idx) => (
                  <div
                    key={src}
                    className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-line bg-surface"
                  >
                    <Image
                      src={src}
                      alt={`${project.title} screen ${idx + 2}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            </Section>
          )}
        </div>
      </article>

      {/* Next project */}
      <Link
        href={`/projects/${next.id}`}
        className="group mt-20 block border-t border-line py-16 transition-colors duration-500 hover:bg-accent hover:text-on-accent"
      >
        <div className="shell flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-3 group-hover:text-on-accent">Next project</p>
            <p className="font-display-tight text-[clamp(3rem,9vw,8rem)]">{next.title.split(' - ')[0]}</p>
          </div>
          <span className="text-5xl transition-transform duration-500 group-hover:translate-x-3" aria-hidden="true">
            →
          </span>
        </div>
      </Link>

      <div className="shell flex flex-wrap items-center justify-between gap-4 py-8 text-muted">
        <p>Interested in work like this?</p>
        <Link href="/#contact" className="btn-pill py-3!">
          Get in touch <span aria-hidden="true">→</span>
        </Link>
      </div>
    </main>
  );
}
