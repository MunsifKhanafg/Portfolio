import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiCopy, FiCheck, FiGithub, FiLinkedin, FiMail, FiPhone, FiArrowUpRight } from 'react-icons/fi'
import { profile, socials } from '../data/portfolioData.js'
import SectionHeading from './SectionHeading.jsx'

const ICONS = { github: FiGithub, linkedin: FiLinkedin, mail: FiMail, phone: FiPhone }

export default function Contact() {
  const [copiedField, setCopiedField] = useState(null) // 'email' | 'phone' | null

  const handleCopy = async (field, value) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedField(field)
      setTimeout(() => setCopiedField((f) => (f === field ? null : f)), 2000)
    } catch {
      // Clipboard API unavailable — the value is still visible and selectable.
    }
  }

  return (
    <section id="contact" className="relative px-5 py-28 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something together"
          subtitle="Have a project, a role, or just want to talk shop? My inbox is open."
          align="center"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="glass glass-hover relative overflow-hidden rounded-3xl p-8 text-center sm:p-14"
        >
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-accent/20 blur-[100px]" />

          <p className="relative font-mono text-xs uppercase tracking-[0.25em] text-accent">
            Available for opportunities
          </p>
          <h3 className="relative mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
            {profile.name}
          </h3>
          <p className="relative mt-2 text-slate-400">{profile.title}</p>

          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => handleCopy('email', profile.email)}
              className="cursor-hover inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3 text-sm font-semibold text-base-950 transition-transform hover:-translate-y-0.5"
            >
              {copiedField === 'email' ? <FiCheck /> : <FiCopy />}
              {copiedField === 'email' ? 'Copied!' : profile.email}
            </button>
            <a
              href={`mailto:${profile.email}`}
              className="cursor-hover glass glass-hover inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white"
            >
              Send an email
              <FiArrowUpRight />
            </a>
          </div>

          {profile.phone && (
            <div className="relative mt-4 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => handleCopy('phone', profile.phone)}
                className="cursor-hover glass glass-hover inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                {copiedField === 'phone' ? <FiCheck /> : <FiPhone />}
                {copiedField === 'phone' ? 'Copied!' : profile.phone}
              </button>
              <a
                href={`tel:${profile.phone.replace(/[^\d+]/g, '')}`}
                className="cursor-hover inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-slate-400 hover:text-white"
              >
                Call
                <FiArrowUpRight />
              </a>
            </div>
          )}

          <div className="relative mt-10 flex items-center justify-center gap-4">
            {socials.map((s) => {
              const Icon = ICONS[s.icon] ?? FiArrowUpRight
              return (
                <a
                  key={s.label}
                  href={s.url}
                  target={s.url.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  aria-label={s.label}
                  className="cursor-hover flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <Icon size={18} />
                </a>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
