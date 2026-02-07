# 🚀 Portfolio Deployment Guide

## Pre-Deployment Checklist

### ✅ Testing
- [ ] Test all navigation links (Hero, About, Projects, Skills, Experience, Testimonials, Contact)
- [ ] Test mobile navigation (hamburger menu)
- [ ] Test project filters (All, Mobile, Web, Design, Backend)
- [ ] Test project modal (open, close, image carousel)
- [ ] Test contact form submission
- [ ] Test email functionality
- [ ] Test theme toggle (light/dark mode)
- [ ] Test keyboard shortcuts:
  - `Alt + H` → Hero
  - `Alt + A` → About
  - `Alt + P` → Projects
  - `Alt + S` → Skills
  - `Alt + E` → Experience
  - `Alt + T` → Testimonials
  - `Alt + C` → Contact
  - `Shift + ?` → Shortcuts guide
- [ ] Test all external links (GitHub, LinkedIn, Instagram, WhatsApp)
- [ ] Test responsive design on:
  - [ ] Mobile (320px - 767px)
  - [ ] Tablet (768px - 1023px)
  - [ ] Desktop (1024px+)

### ⚡ Performance Optimization
- [ ] Run Lighthouse audit
- [ ] Optimize images (already using Next.js Image component)
- [ ] Check bundle size
- [ ] Verify lazy loading
- [ ] Test loading performance on slow 3G

### 🔒 Security & Configuration
- [ ] Verify .env.local is in .gitignore
- [ ] Add environment variables to Vercel:
  - `RESEND_API_KEY`
- [ ] Update meta tags and SEO
- [ ] Verify sitemap.xml is accessible
- [ ] Verify robots.txt is accessible

---

## Deployment Steps (Vercel)

### 1. Prepare Repository
```bash
# Commit all changes
git add .
git commit -m "Production ready portfolio"
git push origin main
```

### 2. Deploy to Vercel

#### Option A: Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

#### Option B: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`
5. Add Environment Variables:
   - `RESEND_API_KEY` = your_resend_api_key
6. Click "Deploy"

### 3. Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records:
   - **Type**: A
   - **Name**: @
   - **Value**: 76.76.21.21
   
   **Or CNAME:**
   - **Type**: CNAME
   - **Name**: www
   - **Value**: cname.vercel-dns.com

### 4. Post-Deployment
- [ ] Visit deployed URL
- [ ] Test all features in production
- [ ] Test contact form email delivery
- [ ] Run Lighthouse on production URL
- [ ] Share your portfolio! 🎉

---

## Continuous Deployment

Vercel automatically deploys:
- **Production**: When you push to `main` branch
- **Preview**: For all pull requests and feature branches

---

## Monitoring & Analytics

### Vercel Analytics (Optional)
```bash
npm install @vercel/analytics
```

Add to `app/layout.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Vercel Speed Insights (Optional)
```bash
npm install @vercel/speed-insights
```

Add to `app/layout.tsx`:
```tsx
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

---

## Troubleshooting

### Build Fails
- Check terminal output for specific errors
- Verify all dependencies are installed
- Ensure TypeScript has no errors: `npm run build`

### Images Not Loading
- Verify images exist in `/public/images/`
- Check Next.js Image configuration in `next.config.ts`

### Environment Variables Not Working
- Ensure variables are added in Vercel dashboard
- Redeploy after adding environment variables
- Variables must start with `NEXT_PUBLIC_` to be exposed to browser

### Contact Form Not Sending Emails
- Verify `RESEND_API_KEY` is set in Vercel
- Check Resend dashboard for API usage
- Verify email address in `/config/constants.ts`

---

## Performance Targets

- **Performance**: > 90
- **Accessibility**: > 95
- **Best Practices**: > 95
- **SEO**: > 95
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Resend Documentation](https://resend.com/docs)
- [Lighthouse Documentation](https://developer.chrome.com/docs/lighthouse)
