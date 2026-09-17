import { ImageResponse } from 'next/og';
import { siteConfig } from '@/config/constants';

export const alt = `${siteConfig.name} — Full-Stack Developer`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: '#020617',
          padding: '72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            width: 96,
            height: 10,
            background: 'linear-gradient(90deg, #06b6d4, #a78bfa)',
            borderRadius: 5,
            marginBottom: 40,
          }}
        />
        <div
          style={{
            fontSize: 84,
            fontWeight: 700,
            color: '#f1f5f9',
            lineHeight: 1.1,
          }}
        >
          Gbeminiyi Akinfala
        </div>
        <div style={{ fontSize: 40, color: '#22d3ee', marginTop: 16 }}>
          Flutter &amp; Next.js Developer
        </div>
        <div style={{ fontSize: 30, color: '#94a3b8', marginTop: 28 }}>
          Fintech, health and marketplace products — shipped to production.
        </div>
      </div>
    ),
    size
  );
}
