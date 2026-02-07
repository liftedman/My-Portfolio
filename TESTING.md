# ✅ Testing Checklist

Complete this checklist before deploying to production.

## 🧪 Functional Testing

### Navigation
- [ ] Click logo - should scroll to Hero section
- [ ] Click "About" in navbar - scrolls to About section
- [ ] Click "Projects" in navbar - scrolls to Projects section
- [ ] Click "Skills" in navbar - scrolls to Skills section  
- [ ] Click "Experience" in navbar - scrolls to Experience section
- [ ] Click "Testimonials" in navbar - scrolls to Testimonials section
- [ ] Click "Contact" in navbar - scrolls to Contact section
- [ ] Click "Let's Talk" CTA - scrolls to Contact section
- [ ] Progress bar at top shows scroll position

### Mobile Navigation
- [ ] Hamburger menu icon visible on mobile (<768px)
- [ ] Click hamburger - menu slides in from right
- [ ] Click menu item - scrolls to section AND closes menu
- [ ] Click outside menu - menu closes
- [ ] Menu has glass morphism effect

### Hero Section
- [ ] Profile image displays correctly
- [ ] Profile image has glowing animated border
- [ ] Profile image has floating particles
- [ ] Name and title animate on page load
- [ ] "View My Work" button scrolls to Projects
- [ ] "Let's Connect" button scrolls to Contact
- [ ] Stats counter animates numbers
- [ ] Background gradient orbs animate smoothly

### Projects Section
- [ ] All 5 projects display with images:
  - Astravest (Asset.png)
  - Safegeeg (code.webp)
  - Alivee (alivee.jpeg)
  - VMS (vms.png)
  - God First (reading.webp)
- [ ] Filter buttons work:
  - "All Projects" - shows all 5
  - "Mobile" - shows 3 (Astravest, Alivee, God First)
  - "Web" - shows 2 (Safegeeg, VMS)
  - "Design" - shows empty state message
  - "Backend" - shows empty state message
- [ ] Clicking project card opens modal
- [ ] Modal displays project details
- [ ] Modal has close button (X) in top-right
- [ ] Click outside modal - modal closes
- [ ] Image carousel works (if project has multiple images):
  - Left arrow - previous image
  - Right arrow - next image
  - Dots at bottom - jump to image
  - Arrows only appear on hover
- [ ] "Visit Project" button opens link in new tab
- [ ] "View Code" button opens GitHub in new tab
- [ ] Hover on project card - image zooms slightly

### Contact Section
- [ ] Form fields accept input (Name, Email, Message)
- [ ] Form validation works (required fields)
- [ ] Submit button shows "Sending..." during submission
- [ ] Success message appears after submission
- [ ] Form resets after successful submission
- [ ] Email card displays correct email (hellodevlifted@gmail.com)
- [ ] Email card has hover effects
- [ ] Email icon rotates on hover
- [ ] Social links display (GitHub, Instagram, LinkedIn, WhatsApp)
- [ ] Social links open in new tab
- [ ] Background orbs animate smoothly
- [ ] Grid pattern visible in background

### Theme Toggle
- [ ] Toggle button visible in navbar
- [ ] Click toggle - switches between light/dark mode
- [ ] Theme persists on page reload
- [ ] All sections adapt to theme properly

### Keyboard Shortcuts
- [ ] Press `Alt + H` - scrolls to Hero
- [ ] Press `Alt + A` - scrolls to About
- [ ] Press `Alt + P` - scrolls to Projects
- [ ] Press `Alt + S` - scrolls to Skills
- [ ] Press `Alt + E` - scrolls to Experience
- [ ] Press `Alt + T` - scrolls to Testimonials
- [ ] Press `Alt + C` - scrolls to Contact
- [ ] Press `Shift + ?` - opens shortcuts guide modal
- [ ] Shortcuts guide displays all shortcuts
- [ ] Close shortcuts guide with X button or click outside

---

## 📱 Responsive Testing

Test on these screen sizes:

### Mobile (320px - 767px)
- [ ] 320px width (iPhone SE)
- [ ] 375px width (iPhone X/11/12)
- [ ] 414px width (iPhone Plus)
- [ ] 768px width (Tablet)

**Check:**
- [ ] Text is readable
- [ ] Images scale properly
- [ ] Buttons are tappable (min 44x44px)
- [ ] Navigation menu works
- [ ] No horizontal scroll
- [ ] Project cards stack vertically
- [ ] Skills grid adjusts columns
- [ ] Contact form is usable

### Tablet (768px - 1023px)
- [ ] 768px width (iPad)
- [ ] 1024px width (iPad Pro)

**Check:**
- [ ] Layout adapts (2-column grids)
- [ ] Navigation switches from mobile to desktop
- [ ] Images look good
- [ ] Spacing is comfortable

### Desktop (1024px+)
- [ ] 1280px width (laptop)
- [ ] 1440px width (desktop)
- [ ] 1920px width (full HD)
- [ ] 2560px+ width (4K)

**Check:**
- [ ] Max-width container centers content
- [ ] No stretched images
- [ ] Proper spacing and padding
- [ ] Animations smooth

---

## 🎨 Visual Testing

### Animations
- [ ] Hero elements fade in on load
- [ ] Scroll-triggered animations work for all sections
- [ ] Project cards have hover effects
- [ ] Buttons have hover/tap animations
- [ ] Modal has smooth enter/exit animations
- [ ] Background orbs animate continuously
- [ ] Profile image particles orbit smoothly
- [ ] No janky or stuttering animations

### Colors & Styling
- [ ] Gradient text displays properly
- [ ] Glass morphism effects look correct
- [ ] Border colors match design (cyan/violet/green)
- [ ] Background colors consistent
- [ ] Hover states clearly visible
- [ ] Focus states accessible

### Typography
- [ ] All text is readable
- [ ] Proper font sizes and hierarchy
- [ ] Line heights comfortable
- [ ] No text overflow issues

---

## ⚡ Performance Testing

### Speed
- [ ] Initial page load < 3 seconds
- [ ] Images load progressively
- [ ] No layout shift during load
- [ ] Smooth scrolling (60fps)
- [ ] Animations don't cause lag

### Images
- [ ] All images load correctly
- [ ] Images are optimized (Next.js Image)
- [ ] Proper alt text for accessibility
- [ ] Images responsive at all sizes

---

## 🔒 Security & Privacy

- [ ] .env.local NOT committed to Git
- [ ] API keys are secret
- [ ] No sensitive data exposed in frontend
- [ ] External links have rel="noopener noreferrer"

---

## 🌐 SEO Testing

- [ ] Page title correct
- [ ] Meta description present
- [ ] Open Graph tags set
- [ ] Twitter Card tags set
- [ ] Favicon displays
- [ ] sitemap.xml accessible at /sitemap.xml
- [ ] robots.txt accessible at /robots.txt

---

## 🔗 Links Testing

### Internal Links
- [ ] All navbar links work
- [ ] CTA buttons scroll to correct sections
- [ ] Footer links work

### External Links
- [ ] GitHub - opens profile
- [ ] LinkedIn - opens profile  
- [ ] Instagram - opens profile
- [ ] WhatsApp - opens chat
- [ ] Project demo links work
- [ ] Project GitHub links work

---

## 📧 Email Testing

- [ ] Form submission sends email
- [ ] Email received at hellodevlifted@gmail.com
- [ ] Email contains:
  - [ ] Sender's name
  - [ ] Sender's email (in reply-to)
  - [ ] Message content
  - [ ] Formatted properly
- [ ] Error handling works if email fails
- [ ] Success message displays after send

---

## ♿ Accessibility Testing

- [ ] Keyboard navigation works
- [ ] Tab order is logical
- [ ] Focus indicators visible
- [ ] Skip to content link (optional)
- [ ] Images have alt text
- [ ] Buttons have aria-labels where needed
- [ ] Color contrast meets WCAG standards
- [ ] Screen reader friendly (test with NVDA/JAWS)

---

## 🌍 Browser Testing

Test in these browsers:

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

---

## 🐛 Bug Check

Common issues to verify:

- [ ] No console errors
- [ ] No 404 errors for resources
- [ ] No CORS errors
- [ ] Forms don't double-submit
- [ ] Modals don't trap user
- [ ] Z-index layering correct
- [ ] No infinite loops in animations
- [ ] Memory doesn't leak (check DevTools)

---

## ✨ Final Polish

- [ ] Spell check all content
- [ ] Grammar check all text
- [ ] Placeholder text replaced
- [ ] Test data replaced with real data
- [ ] All images optimized
- [ ] Unused code removed
- [ ] Console.logs removed
- [ ] Comments cleaned up

---

## 📊 Lighthouse Audit

Run in Chrome DevTools:

```
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Select:
   - Mode: Navigation
   - Device: Desktop & Mobile
   - Categories: All
4. Click "Analyze page load"
```

**Target Scores:**
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 95
- SEO: > 95

**Fix common issues:**
- Image sizes
- Unused JavaScript
- Render-blocking resources
- Missing meta tags
- Contrast ratios

---

## 🎉 Ready to Deploy!

Once all items are checked:

1. Commit all changes: `git add . && git commit -m "Production ready"`
2. Push to GitHub: `git push origin main`
3. Follow deployment guide in `DEPLOYMENT.md`
4. Test production URL
5. Share your portfolio! 🚀
