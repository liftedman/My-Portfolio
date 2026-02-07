export const generateSitemap = () => {
  const baseUrl = 'https://lifted.dev';
  const pages = [
    '',
    '#about',
    '#projects',
    '#skills',
    '#experience',
    '#testimonials',
    '#contact',
  ];

  const urlEntries = pages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page === '' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>
`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
};

export const generateRobots = () => {
  return `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/

Sitemap: https://lifted.dev/sitemap.xml`;
};
