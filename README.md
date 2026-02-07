# 🌟 Lifted - Modern Developer Portfolio

> A world-class, cinematic portfolio website showcasing full-stack mobile and web development expertise

[![Next.js](https://img.shields.io/badge/Next.js-15.5.12-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.11.17-ff69b4?logo=framer)](https://www.framer.com/motion/)

---

## ✨ Features

### 🎨 Design & Animations
- **Modern Cinematic Design** - Dark theme with electric blue, violet, neon green accents
- **Smooth Animations** - Framer Motion with scroll-triggered effects
- **3D Depth Effects** - Layered backgrounds, floating elements, glass morphism
- **Interactive Cursor** - Custom cursor that follows mouse movements
- **Theme Toggle** - Light/dark mode with localStorage persistence
- **Responsive Design** - Mobile-first approach with tablet and desktop optimization

### 🧭 Navigation
- **Fixed Glass-Morphism Navbar** - Transparent with backdrop blur
- **Mobile Hamburger Menu** - Smooth slide-in animation
- **Smooth Scroll** - Animated scroll to sections
- **Keyboard Shortcuts** - Alt + H/A/P/S/E/T/C for quick navigation
- **Shortcuts Guide** - Press Shift + ? to view all shortcuts

### 📱 Portfolio Sections

1. **Hero Section**
   - Animated profile picture with glowing border
   - Dynamic gradient text
   - Floating particles
   - CTA buttons with hover effects
   - Live stats counter

2. **About Section**
   - Personal story and journey
   - Animated tech badges
   - Skills highlights

3. **Projects Section**
   - 5 Featured Projects (Astravest, Safegeeg, Alivee, VMS, God First)
   - Category filters (All, Mobile, Web, Design, Backend)
   - Interactive project cards with real images
   - Project modal with image carousel
   - Technology tags and highlights

4. **Skills Section**
   - Categorized skills (Languages, Frameworks, Tools, Soft Skills)
   - Proficiency levels with visual indicators
   - Animated skill cards
   - Floating tech icons

5. **Experience Section**
   - Timeline view with vertical line
   - Animated timeline nodes
   - Company logos and descriptions
   - Key achievements

6. **Testimonials Section**
   - Client reviews carousel
   - 5-star ratings
   - Avatar placeholders

7. **Contact Section**
   - Working contact form with email integration (Resend API)
   - Enhanced background with animated orbs
   - Social media links
   - Email card with icon and hover effects

### 🔧 Technical Features
- **SEO Optimized** - Meta tags, sitemap.xml, robots.txt
- **Email Integration** - Resend API for contact form
- **Type Safety** - Full TypeScript implementation
- **Performance** - Next.js Image optimization, code splitting
- **Accessibility** - ARIA labels, keyboard navigation
- **Progressive Web App Ready** - Service worker configured

---

## 📖 Documentation Files

Read these in order based on your needs:

### 🎉 [READY_TO_GO.md - Current Status](🎉_READY_TO_GO.md) **START HERE!**
- Current setup status  
- How to access your portfolio
- Next steps checklist
- Quick troubleshooting

⏱️ **Read time:** 5 minutes

### ⚡ [QUICK_START.md - Fast Track](QUICK_START.md)
- Immediate next steps
- Common questions answered
- Quick customization reference
- Useful commands

⏱️ **Read time:** 10 minutes

### 📚 [README_PORTFOLIO.md - Complete Guide](README_PORTFOLIO.md)
- Full feature description
- Technology stack details
- Installation & customization guide
- Deployment options
- Troubleshooting

⏱️ **Read time:** 20 minutes

### ✅ [CUSTOMIZATION_CHECKLIST.md - Your Task List](CUSTOMIZATION_CHECKLIST.md)
- Phase-by-phase customization guide
- Step-by-step checklist
- Priority order
- Quick edit reference
- Progress tracking

⏱️ **Read time:** 20 minutes (use as reference)

### 🔧 [COMPONENT_REFERENCE.md - Technical Details](COMPONENT_REFERENCE.md)
- Component APIs & usage examples
- Props documentation
- Customization patterns
- Code samples

⏱️ **Read time:** 30 minutes

### 📁 [FILE_STRUCTURE.md - Project Organization](FILE_STRUCTURE.md)
- Complete file tree
- File purposes
- Navigation guide
- Important files list

⏱️ **Read time:** 15 minutes

---

## 🎯 Quick Navigation by Task

**"How do I get started?"**
→ Read: [READY_TO_GO.md](🎉_READY_TO_GO.md)

**"How do I add my projects?"**
→ Check: [CUSTOMIZATION_CHECKLIST.md](CUSTOMIZATION_CHECKLIST.md)
→ Edit: `config/projects.ts`

**"How do I deploy?"**
→ Read: [README_PORTFOLIO.md](README_PORTFOLIO.md) → "Build & Deploy"

**"How do I customize colors?"**
→ Read: [QUICK_START.md](QUICK_START.md) → "Colors You Can Use"

**"I want to modify a component"**
→ Read: [COMPONENT_REFERENCE.md](COMPONENT_REFERENCE.md)

---

## 🚀 Most Important Files to Edit

```
config/projects.ts              ← Add your projects (PRIORITY 1)
config/skills.ts                ← Add your skills (PRIORITY 2)
config/experience.ts            ← Add your experience (PRIORITY 3)
config/testimonials.ts          ← Add testimonials (PRIORITY 4)
components/sections/Contact.tsx ← Update contact info (PRIORITY 5)
components/common/Footer.tsx    ← Update social links (PRIORITY 5)
app/layout.tsx                  ← Update site title (PRIORITY 6)
```

---

## 📂 Key Folders

```
my-portfolio/
├── components/
│   ├── sections/    ← Main page sections (7 components)
│   ├── common/      ← Navigation components (2)
│   ├── ui/          ← Reusable UI components (4)
│   └── animations/  ← Animation components (1)
├── config/          ← YOUR CONTENT (Edit these!)
│   ├── projects.ts
│   ├── skills.ts
│   ├── experience.ts
│   └── testimonials.ts
├── hooks/           ← Custom React hooks (2)
├── lib/             ← Utilities & helpers (3)
├── public/images/   ← Your images (Add here!)
└── Documentation/   ← These helpful guides
```

---

## ⚡ Quick Commands

```bash
# Start development server (CURRENTLY RUNNING)
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Check code quality
npm run lint
```

---

## 🎨 What's Built (38 Files Created)

✅ **7 Section Components** - Hero, About, Projects, Skills, Experience, Testimonials, Contact
✅ **4 UI Components** - Button, Card, Modal, Badge
✅ **2 Navigation Components** - Navbar, Footer
✅ **1 Animation Component** - AnimatedText
✅ **2 Custom Hooks** - useScrollAnimation, useMousePosition
✅ **3 Utility Modules** - animations, constants, utils
✅ **4 Data Configuration Files** - projects, skills, experience, testimonials
✅ **1 TypeScript Types** - Complete type definitions
✅ **7 Documentation Files** - Complete guides
✅ **All Configuration Files** - package.json, tsconfig, tailwind, etc.

---

## 🎯 Your Action Plan

### Phase 1: Explore (Now!)
1. ✅ Open http://localhost:3000
2. ✅ Explore all sections
3. ✅ Read READY_TO_GO.md

### Phase 2: Customize (Next 30 mins)
1. Edit `config/projects.ts` with your projects
2. Edit `config/skills.ts` with your skills
3. Edit `config/experience.ts` with your experience
4. Edit `config/testimonials.ts` with testimonials
5. Update contact info and social links

### Phase 3: Polish (Next hour)
1. Add project images
2. Update site title
3. Test on mobile
4. Check animations

### Phase 4: Deploy (When ready)
1. Build: `npm run build`
2. Deploy to Vercel or Netlify
3. Share your portfolio!

---

## 🌟 Features

✨ **Animated Hero** - Eye-catching entrance with cursor effects
🎬 **Projects Showcase** - Filterable projects with modal details
💡 **Skills Section** - Beautiful skill grid with stats
🏆 **Experience Timeline** - Visual career progression
💬 **Testimonials Carousel** - Client feedback slider
📞 **Contact Form** - Ready to integrate with email service
🧭 **Navigation** - Smooth scrolling with responsive menu
📱 **Fully Responsive** - Looks great on all devices
🚀 **Performance Optimized** - Fast loading, smooth animations
🔍 **SEO Ready** - Meta tags and open graph configured

---

## 💻 Technology Stack

- **Next.js 16.1.6** - React framework
- **React 19.2.3** - UI library
- **Framer Motion 10.x** - Animations
- **Tailwind CSS 4** - Styling
- **TypeScript 5** - Type safety
- **Inter Font** - Typography

---

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/)
- [React Documentation](https://react.dev/)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

---

## 🚀 Next Steps

1. **Read Documentation**: Start with [READY_TO_GO.md](🎉_READY_TO_GO.md)
2. **View Portfolio**: Open http://localhost:3000
3. **Customize**: Follow [CUSTOMIZATION_CHECKLIST.md](CUSTOMIZATION_CHECKLIST.md)
4. **Deploy**: Use Vercel or Netlify
5. **Share**: Show the world your new portfolio!

---

**Your amazing portfolio is ready. Let's make it yours!** 🎉This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
