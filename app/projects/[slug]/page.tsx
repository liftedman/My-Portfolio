import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects } from '@/config/projects';
import { siteConfig, siteUrl } from '@/config/constants';

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
    <section className="mb-12">
      <h2 className="mb-4 text-2xl font-bold text-slate-100">{title}</h2>
      {children}
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

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-16 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/#projects"
          className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-cyan-400 transition-colors hover:text-cyan-300"
        >
          <span aria-hidden="true">←</span> Back to all projects
        </Link>

        {/* Header */}
        <header className="mb-10">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-slate-400">{project.year}</span>
            <span className="text-slate-600" aria-hidden="true">
              ·
            </span>
            <span className="text-sm font-medium text-slate-400">{project.role}</span>
            {project.status !== 'live' && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-400/30 bg-slate-900/80 px-3 py-1 text-xs font-medium text-slate-300">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                {project.status === 'archived' ? 'Archived' : 'Private'}
              </span>
            )}
          </div>

          <h1 className="mb-4 text-4xl font-bold text-slate-100 sm:text-5xl">
            {project.title}
          </h1>
          <p className="text-lg text-slate-400">{project.shortDescription}</p>
        </header>

        {/* Hero image */}
        <div className="relative mb-12 h-64 w-full overflow-hidden rounded-xl bg-slate-900 sm:h-96">
          <Image
            src={project.image}
            alt={`${project.title} interface`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>

        {/* Availability */}
        {project.status === 'live' && project.link ? (
          <div className="mb-12">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
            >
              Visit {project.title}
              <span aria-hidden="true">→</span>
            </a>
          </div>
        ) : (
          project.statusNote && (
            <div className="mb-12 rounded-lg border border-slate-700/60 bg-slate-800/40 p-4">
              <p className="text-sm leading-relaxed text-slate-400">{project.statusNote}</p>
            </div>
          )
        )}

        {study?.problem && (
          <Section title="The problem">
            <p className="leading-relaxed text-slate-400">{study.problem}</p>
          </Section>
        )}

        {study?.constraints && (
          <Section title="Constraints">
            <p className="leading-relaxed text-slate-400">{study.constraints}</p>
          </Section>
        )}

        <Section title="What I built">
          <p className="leading-relaxed text-slate-400">{project.description}</p>
        </Section>

        {study?.decision && (
          <Section title={study.decision.title}>
            <p className="leading-relaxed text-slate-400">{study.decision.body}</p>
          </Section>
        )}

        <Section title="Key highlights">
          <ul className="space-y-3">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-3 text-slate-400">
                <span className="mt-1 text-cyan-400" aria-hidden="true">
                  ✓
                </span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </Section>

        {study?.outcome && (
          <Section title="Outcome">
            <p className="leading-relaxed text-slate-400">{study.outcome}</p>
          </Section>
        )}

        <Section title="Technologies">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-cyan-500/30 bg-cyan-500/20 px-3 py-1.5 text-sm font-semibold text-cyan-300"
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
                  className="relative h-48 w-full overflow-hidden rounded-lg bg-slate-900"
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

        {/* Footer CTA */}
        <div className="mt-16 border-t border-slate-800 pt-8">
          <p className="mb-4 text-slate-400">
            Interested in work like this?
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 font-semibold text-cyan-400 transition-colors hover:text-cyan-300"
          >
            Get in touch <span aria-hidden="true">→</span>
          </Link>
        </div>
      </article>
    </main>
  );
}
