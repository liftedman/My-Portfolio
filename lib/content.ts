/**
 * The single place the site gets its content from.
 *
 * Reads from Sanity (edited at /studio). Falls back to the files in config/
 * when Sanity is not configured, unreachable, or still empty, so the site
 * always renders something.
 *
 * Server-only: call it from server components, route handlers and metadata.
 */
import { cache } from 'react';
import { createClient } from 'next-sanity';
import { projects as fallbackProjects, type Project } from '@/config/projects';
import { experiences as fallbackExperiences, type Experience } from '@/config/experience';
import { skills as fallbackSkills, skillCategories as fallbackCategories, type Skill } from '@/config/skills';
import { testimonials as fallbackTestimonials, type Testimonial } from '@/config/testimonials';
import { awards as fallbackAwards, type Award } from '@/config/awards';
import { siteConfig } from '@/config/constants';
import { apiVersion, dataset, isSanityConfigured, projectId } from '@/sanity/env';

export interface SocialLink {
  platform: string;
  url: string;
}

export interface SiteSettings {
  email: string;
  profilePhoto: string;
  resumeUrl: string;
  socialLinks: SocialLink[];
}

export interface SiteContent {
  projects: Project[];
  experiences: Experience[];
  skills: Skill[];
  skillCategories: string[];
  testimonials: Testimonial[];
  awards: Award[];
  settings: SiteSettings;
}

/** Seconds a page may serve cached content before re-reading Sanity. */
export const REVALIDATE_SECONDS = 60;
/** Cache tag cleared by the /api/revalidate webhook for instant updates. */
export const CONTENT_TAG = 'sanity';

const fallbackSettings: SiteSettings = {
  email: siteConfig.email,
  profilePhoto: '/images/profile.jpeg',
  resumeUrl: '/documents/flutter_dev.pdf',
  socialLinks: Object.entries(siteConfig.socialLinks).map(([platform, url]) => ({ platform, url })),
};

const fallbackContent: SiteContent = {
  projects: fallbackProjects,
  experiences: fallbackExperiences,
  skills: fallbackSkills,
  skillCategories: fallbackCategories,
  testimonials: fallbackTestimonials,
  awards: fallbackAwards,
  settings: fallbackSettings,
};

const QUERY = /* groq */ `{
  "projects": *[_type == "project" && defined(slug.current) && defined(mainImage.asset)]
    | order(coalesce(order, 999) asc, year desc) {
      "id": slug.current, title, shortDescription, description, category, role, year,
      status, link, github, statusNote, technologies, highlights, caseStudy,
      "image": mainImage.asset->url,
      "gallery": gallery[].asset->url
    },
  "experiences": *[_type == "experience"] | order(coalesce(order, 999) asc) {
    "id": _id, company, position, description, startDate, endDate, current,
    technologies, achievements
  },
  "skills": *[_type == "skill"] | order(coalesce(order, 999) asc, name asc) {
    name, category, level
  },
  "testimonials": *[_type == "testimonial"] | order(coalesce(order, 999) asc) {
    "id": _id, name, role, company, content
  },
  "awards": *[_type == "award"] | order(date desc) {
    "id": _id, title, issuer, date, description, link, "image": image.asset->url
  },
  "settings": *[_id == "siteSettings"][0] {
    email, socialLinks,
    "profilePhoto": profilePhoto.asset->url,
    "resumeUrl": resume.asset->url
  }
}`;

/* Sanity returns null for empty fields; the site's types expect undefined or []. */
type Nullable<T> = { [K in keyof T]?: T[K] | null };

interface RawCaseStudy {
  problem?: string | null;
  constraints?: string | null;
  decisionTitle?: string | null;
  decisionBody?: string | null;
  outcome?: string | null;
}

interface RawContent {
  projects: (Nullable<Omit<Project, 'caseStudy' | 'images'>> & {
    gallery?: (string | null)[] | null;
    caseStudy?: RawCaseStudy | null;
  })[];
  experiences: (Nullable<Experience> & { current?: boolean | null })[];
  skills: Nullable<Skill>[];
  testimonials: Nullable<Testimonial>[];
  awards: Nullable<Award>[];
  settings: (Nullable<Omit<SiteSettings, 'socialLinks'>> & {
    socialLinks?: Nullable<SocialLink>[] | null;
  }) | null;
}

const str = (value: string | null | undefined) => value ?? '';
const opt = (value: string | null | undefined) => value || undefined;
const list = <T>(value: (T | null)[] | null | undefined): T[] =>
  (value ?? []).filter((item): item is T => item != null);

function normalize(raw: RawContent): SiteContent {
  const projects: Project[] = raw.projects.map((p) => {
    const image = str(p.image);
    const cs = p.caseStudy;
    return {
      id: str(p.id),
      title: str(p.title),
      shortDescription: str(p.shortDescription),
      description: str(p.description),
      category: p.category ?? 'web',
      role: str(p.role),
      year: p.year ?? new Date().getFullYear(),
      status: p.status ?? 'live',
      link: opt(p.link),
      github: opt(p.github),
      statusNote: opt(p.statusNote),
      technologies: list(p.technologies),
      highlights: list(p.highlights),
      image,
      images: [image, ...list(p.gallery)],
      caseStudy: cs
        ? {
            problem: opt(cs.problem),
            constraints: opt(cs.constraints),
            outcome: opt(cs.outcome),
            decision:
              cs.decisionTitle && cs.decisionBody
                ? { title: cs.decisionTitle, body: cs.decisionBody }
                : undefined,
          }
        : undefined,
    };
  });

  const experiences: Experience[] = raw.experiences.map((e) => ({
    id: str(e.id),
    company: str(e.company),
    position: str(e.position),
    description: str(e.description),
    startDate: str(e.startDate),
    endDate: e.current ? 'Present' : str(e.endDate),
    technologies: list(e.technologies),
    achievements: list(e.achievements),
  }));

  const skills: Skill[] = raw.skills.map((s) => ({
    name: str(s.name),
    category: str(s.category),
    level: s.level ?? 'intermediate',
  }));

  // Known groups keep their usual order; any new group typed in the Studio goes last.
  const skillCategories = [
    ...fallbackCategories.filter((c) => skills.some((s) => s.category === c)),
    ...new Set(skills.map((s) => s.category).filter((c) => !fallbackCategories.includes(c))),
  ];

  const testimonials: Testimonial[] = raw.testimonials.map((t) => ({
    id: str(t.id),
    name: str(t.name),
    role: str(t.role),
    company: str(t.company),
    content: str(t.content),
    rating: 5,
  }));

  const awards: Award[] = raw.awards.map((a) => ({
    id: str(a.id),
    title: str(a.title),
    issuer: str(a.issuer),
    date: str(a.date),
    description: opt(a.description),
    link: opt(a.link),
    image: opt(a.image),
  }));

  const s = raw.settings;
  const socialLinks = list(s?.socialLinks)
    .filter((l) => l.platform && l.url)
    .map((l) => ({ platform: str(l.platform), url: str(l.url) }));

  return {
    projects,
    experiences,
    skills,
    skillCategories,
    testimonials,
    awards,
    settings: {
      email: s?.email || fallbackSettings.email,
      profilePhoto: s?.profilePhoto || fallbackSettings.profilePhoto,
      resumeUrl: s?.resumeUrl || fallbackSettings.resumeUrl,
      socialLinks: socialLinks.length > 0 ? socialLinks : fallbackSettings.socialLinks,
    },
  };
}

const client = isSanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: false, perspective: 'published' })
  : null;

/** All site content. Cached per request, and across requests for REVALIDATE_SECONDS. */
export const getSiteContent = cache(async (): Promise<SiteContent> => {
  if (!client) return fallbackContent;

  try {
    const raw = await client.fetch<RawContent>(
      QUERY,
      {},
      { next: { revalidate: REVALIDATE_SECONDS, tags: [CONTENT_TAG] } }
    );

    // A brand-new, not-yet-imported dataset: keep showing the built-in content.
    if (raw.projects.length === 0 && !raw.settings) return fallbackContent;

    return normalize(raw);
  } catch (error) {
    console.error('[content] Sanity fetch failed, using built-in content:', error);
    return fallbackContent;
  }
});
