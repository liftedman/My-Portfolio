import { ImageResponse } from 'next/og';
import { projects } from '@/config/projects';
import { siteConfig } from '@/config/constants';

export const alt = 'Project case study';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#020617',
          padding: '72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 28, color: '#22d3ee', marginBottom: 24 }}>
            Case Study
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              color: '#f1f5f9',
              lineHeight: 1.1,
            }}
          >
            {project?.title ?? 'Project'}
          </div>
          <div style={{ fontSize: 32, color: '#94a3b8', marginTop: 24 }}>
            {project?.shortDescription ?? ''}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 8,
              background: 'linear-gradient(90deg, #06b6d4, #a78bfa)',
              borderRadius: 4,
            }}
          />
          <div style={{ fontSize: 30, color: '#e2e8f0', fontWeight: 600 }}>
            {siteConfig.name}
          </div>
          <div style={{ fontSize: 30, color: '#64748b' }}>
            {project?.role ?? ''}
          </div>
        </div>
      </div>
    ),
    size
  );
}
