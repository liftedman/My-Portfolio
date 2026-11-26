/**
 * One-time import: copies the content in config/*.ts (and its images, profile
 * photo and CV) into Sanity, so the Studio starts filled in.
 *
 *   npm run sanity:import
 *
 * Needs NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local.
 * Safe to re-run: it only creates documents that don't exist yet and never
 * overwrites anything already edited in the Studio.
 */
import { createReadStream, existsSync } from 'node:fs';
import { basename, join } from 'node:path';
import { createClient, type SanityClient } from '@sanity/client';

try {
  process.loadEnvFile('.env.local');
} catch {
  // Fine when the variables are already set in the shell.
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    '\n  Missing settings in .env.local:\n' +
      (projectId ? '' : '    NEXT_PUBLIC_SANITY_PROJECT_ID\n') +
      (token ? '' : '    SANITY_API_WRITE_TOKEN\n') +
      '\n  See CMS.md, step 3.\n'
  );
  process.exit(1);
}

const client: SanityClient = createClient({ projectId, dataset, token, apiVersion: '2025-01-01', useCdn: false });
const PUBLIC_DIR = join(process.cwd(), 'public');

/** Sanity document ids allow letters, digits, dot, dash and underscore. */
const safeId = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
let keyCounter = 0;
const key = () => `k${(keyCounter++).toString(36)}${Date.now().toString(36).slice(-4)}`;

const uploaded = new Map<string, string>();

/** Uploads a file from /public once and returns its asset id. */
async function upload(kind: 'image' | 'file', publicPath: string): Promise<string | null> {
  if (uploaded.has(publicPath)) return uploaded.get(publicPath)!;
  const filePath = join(PUBLIC_DIR, publicPath);
  if (!existsSync(filePath)) {
    console.warn(`  ! ${publicPath} not found — skipped`);
    return null;
  }
  const asset = await client.assets.upload(kind, createReadStream(filePath), { filename: basename(filePath) });
  uploaded.set(publicPath, asset._id);
  console.log(`  ↑ ${publicPath}`);
  return asset._id;
}

const DISPLAY_NAMES: Record<string, string> = {
  github: 'GitHub',
  linkedin: 'LinkedIn',
  twitter: 'X (Twitter)',
  whatsapp: 'WhatsApp',
  instagram: 'Instagram',
};

const imageRef = (assetId: string) => ({ _type: 'image', asset: { _type: 'reference', _ref: assetId } });

async function main() {
  // Imported here so .env.local is loaded before config/constants.ts reads process.env.
  const { projects } = await import('../config/projects');
  const { experiences } = await import('../config/experience');
  const { skills } = await import('../config/skills');
  const { testimonials } = await import('../config/testimonials');
  const { awards } = await import('../config/awards');
  const { siteConfig } = await import('../config/constants');

  console.log(`\nImporting into Sanity project ${projectId} / ${dataset}\n`);
  const docs: Record<string, unknown>[] = [];

  console.log('Projects');
  for (const [i, p] of projects.entries()) {
    const main = await upload('image', p.image);
    const gallery: Record<string, unknown>[] = [];
    for (const src of p.images.filter((src) => src !== p.image)) {
      const id = await upload('image', src);
      if (id) gallery.push({ _key: key(), ...imageRef(id) });
    }
    docs.push({
      _id: `project-${safeId(p.id)}`,
      _type: 'project',
      title: p.title,
      slug: { _type: 'slug', current: p.id },
      shortDescription: p.shortDescription,
      description: p.description,
      category: p.category,
      technologies: p.technologies,
      role: p.role,
      link: p.link,
      github: p.github,
      status: p.status,
      statusNote: p.statusNote,
      highlights: p.highlights,
      year: p.year,
      order: i + 1,
      mainImage: main ? imageRef(main) : undefined,
      gallery,
      caseStudy: p.caseStudy
        ? {
            problem: p.caseStudy.problem,
            constraints: p.caseStudy.constraints,
            decisionTitle: p.caseStudy.decision?.title,
            decisionBody: p.caseStudy.decision?.body,
            outcome: p.caseStudy.outcome,
          }
        : undefined,
    });
  }

  for (const [i, e] of experiences.entries()) {
    docs.push({
      _id: `experience-${safeId(e.id)}`,
      _type: 'experience',
      company: e.company,
      position: e.position,
      description: e.description,
      startDate: e.startDate,
      current: e.endDate === 'Present',
      endDate: e.endDate === 'Present' ? undefined : e.endDate,
      technologies: e.technologies,
      achievements: e.achievements,
      order: i + 1,
    });
  }

  for (const [i, s] of skills.entries()) {
    docs.push({
      _id: `skill-${safeId(s.name)}`,
      _type: 'skill',
      name: s.name,
      category: s.category,
      level: s.level,
      order: i + 1,
    });
  }

  for (const [i, t] of testimonials.entries()) {
    docs.push({
      _id: `testimonial-${safeId(t.id)}`,
      _type: 'testimonial',
      name: t.name,
      role: t.role,
      company: t.company,
      content: t.content,
      order: i + 1,
    });
  }

  for (const a of awards) {
    docs.push({
      _id: `award-${safeId(a.id)}`,
      _type: 'award',
      title: a.title,
      issuer: a.issuer,
      date: a.date,
      description: a.description,
      link: a.link,
    });
  }

  console.log('Site settings');
  const photo = await upload('image', '/images/profile.jpeg');
  const resume = await upload('file', '/documents/flutter_dev.pdf');
  docs.push({
    _id: 'siteSettings',
    _type: 'siteSettings',
    email: siteConfig.email,
    profilePhoto: photo ? imageRef(photo) : undefined,
    resume: resume ? { _type: 'file', asset: { _type: 'reference', _ref: resume } } : undefined,
    socialLinks: Object.entries(siteConfig.socialLinks).map(([platform, url]) => ({
      _key: key(),
      _type: 'socialLink',
      platform: DISPLAY_NAMES[platform] ?? platform.charAt(0).toUpperCase() + platform.slice(1),
      url,
    })),
  });

  const existing = new Set(
    await client.fetch<string[]>('*[_id in $ids]._id', { ids: docs.map((d) => d._id as string) })
  );

  const tx = client.transaction();
  for (const doc of docs) tx.createIfNotExists(doc as { _id: string; _type: string });
  await tx.commit();

  const created = docs.length - existing.size;
  console.log(`\nDone. ${created} created, ${existing.size} already existed and were left untouched.`);
  console.log('Open /studio to see and edit everything.\n');
}

main().catch((error) => {
  console.error('\nImport failed:', error.message ?? error);
  process.exit(1);
});
