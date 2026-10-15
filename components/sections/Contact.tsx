'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { siteConfig } from '@/config/constants';
import { Arrow, Eyebrow, FadeIn, Magnetic, Marquee } from '@/components/motion/primitives';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const fieldClass =
  'peer w-full border-0 border-b border-line-strong bg-transparent px-0 pb-3 pt-6 text-lg text-fg placeholder-transparent outline-none transition-colors focus:border-accent focus:ring-0';
const labelClass =
  'pointer-events-none absolute left-0 top-6 font-mono text-xs uppercase tracking-[0.15em] text-faint transition-all duration-300 peer-focus:top-0 peer-focus:text-[10px] peer-focus:text-accent-ink peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[10px]';

export const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [copied, setCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error(`Request failed with ${response.status}`);

      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${siteConfig.email}`;
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden pt-12 sm:pt-28 lg:pt-36">
      {/* Giant ticker */}
      <Marquee duration={28} className="border-y border-line py-6" pauseOnHover={false}>
        {['Let’s build', 'Get in touch'].map((phrase) => (
          <span key={phrase} className="flex items-center font-display-tight text-[clamp(4rem,12vw,11rem)]">
            <span className="mx-8">{phrase}</span>
            <span className="text-accent" aria-hidden="true">
              ✦
            </span>
          </span>
        ))}
      </Marquee>

      <div className="shell grid gap-14 py-16 sm:py-24 lg:grid-cols-2 lg:gap-24">
        {/* Direct lines */}
        <div>
          <Eyebrow index="06">Contact</Eyebrow>
          <FadeIn>
            <h2 className="font-display text-[clamp(2.2rem,4.5vw,4rem)] font-bold leading-[1.05] tracking-tight">
              Have a project in mind? <span className="text-muted">I&apos;d love to hear about it.</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.1} className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${siteConfig.email}`}
              className="group relative font-display text-xl font-semibold sm:text-2xl"
            >
              {siteConfig.email}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-accent transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
            </a>
            <button type="button" onClick={copyEmail} className="btn-pill px-4! py-2! text-[10px]!">
              {copied ? 'Copied ✓' : 'Copy'}
            </button>
          </FadeIn>

          <FadeIn delay={0.2} className="mt-14">
            <ul className="border-b border-line">
              {Object.entries(siteConfig.socialLinks).map(([platform, url]) => (
                <li key={platform} className="border-t border-line">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-4"
                  >
                    <span className="font-display text-xl font-semibold capitalize transition-transform duration-500 group-hover:translate-x-2">
                      {platform}
                    </span>
                    <span className="text-xl text-muted transition-all duration-500 group-hover:rotate-45 group-hover:text-accent-ink">
                      <Arrow direction="up-right" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>

        {/* Form */}
        <FadeIn delay={0.15}>
          <form onSubmit={handleSubmit} className="liquid-glass space-y-8 rounded-[2rem] p-7 sm:p-10">
            <p className="font-display text-2xl font-bold">Send a message</p>

            <div className="relative">
              <input
                id="contact-name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                autoComplete="name"
                placeholder="Your name"
                className={fieldClass}
              />
              <label htmlFor="contact-name" className={labelClass}>
                Your name
              </label>
            </div>

            <div className="relative">
              <input
                id="contact-email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
                placeholder="Email address"
                className={fieldClass}
              />
              <label htmlFor="contact-email" className={labelClass}>
                Email address
              </label>
            </div>

            <div className="relative">
              <textarea
                id="contact-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Tell me about your project"
                className={`${fieldClass} resize-none`}
              />
              <label htmlFor="contact-message" className={labelClass}>
                Tell me about your project
              </label>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <Magnetic>
                <button
                  type="submit"
                  disabled={status === 'sending' || status === 'sent'}
                  className="btn-pill solid disabled:opacity-70"
                >
                  {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Message sent ✓' : 'Send message'}
                  {status === 'idle' && <span aria-hidden="true">→</span>}
                </button>
              </Magnetic>

              <AnimatePresence mode="wait">
                {status === 'sent' && (
                  <motion.p
                    key="sent"
                    role="status"
                    className="text-sm text-accent-ink"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    Thanks — I&apos;ll get back to you soon.
                  </motion.p>
                )}
                {status === 'error' && (
                  <motion.p
                    key="error"
                    role="alert"
                    className="text-sm text-red-500"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    Couldn&apos;t send that. Please email me directly.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </FadeIn>
      </div>
    </section>
  );
};
