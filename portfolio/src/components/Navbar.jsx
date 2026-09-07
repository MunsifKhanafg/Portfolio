import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiMenu, FiX, FiArrowUpRight, FiGithub, FiLinkedin, FiMail, FiPhone } from 'react-icons/fi'
import { profile, socials } from '../data/portfolioData.js'
import { scrollToId } from '../lib/scroll.js'

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

const SOCIAL_ICONS = { github: FiGithub, linkedin: FiLinkedin, mail: FiMail, phone: FiPhone }

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [open])

  // Close automatically if the viewport is resized past the mobile breakpoint
  // (e.g. rotating a tablet to landscape).
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const onChange = (e) => {
      if (e.matches) setOpen(false)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const handleNav = (id) => {
    setOpen(false)
    requestAnimationFrame(() => scrollToId(id))
  }

  const desktopLinks = LINKS.filter((l) => l.id !== 'home')

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled || open ? 'glass shadow-glass py-3' : 'bg-transparent py-5'
      }`}
    >
      <nav className="relative z-[110] mx-auto flex max-w-6xl items-center justify-between px-5 sm:px-8">
        <button
          type="button"
          onClick={() => handleNav('home')}
          className="cursor-hover font-display text-lg font-bold tracking-tight text-white"
        >
          <span className="text-gradient">{profile.initials}</span>
          <span className="hidden sm:inline text-slate-400 font-medium"> · {profile.name}</span>
        </button>

        <ul className="hidden md:flex items-center gap-1">
          {desktopLinks.map((link) => (
            <li key={link.id}>
              <button
                type="button"
                onClick={() => handleNav(link.id)}
                className={`cursor-hover relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  active === link.id ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {active === link.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full glass"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <button
            type="button"
            onClick={() => handleNav('contact')}
            className="cursor-hover group inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-base-950 transition-transform hover:-translate-y-0.5"
          >
            Let's talk
            <FiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="cursor-hover relative z-[120] flex h-11 w-11 items-center justify-center rounded-full text-2xl text-white transition-colors md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? 'close' : 'menu'}
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: 0.2 }}
              className="flex"
            >
              {open ? <FiX /> : <FiMenu />}
            </motion.span>
          </AnimatePresence>
        </button>
      </nav>

      {/* Full-screen mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] overflow-y-auto bg-base-950/[0.98] backdrop-blur-2xl md:hidden"
          >
            {/* Decorative glow, matching the hero */}
            <div className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-accent/15 blur-[110px]" />
            <div className="pointer-events-none absolute bottom-0 -left-16 h-72 w-72 rounded-full bg-accent-violet/15 blur-[110px]" />
            <div className="pointer-events-none absolute inset-0 bg-grid-pattern bg-[size:36px_36px] opacity-[0.25]" />

            <div className="relative flex min-h-full flex-col px-7 pt-24 pb-10">
              <nav className="flex flex-1 flex-col justify-center gap-1">
                {LINKS.map((link, i) => (
                  <motion.button
                    key={link.id}
                    type="button"
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ delay: 0.06 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => handleNav(link.id)}
                    className="cursor-hover group flex w-full items-center gap-4 border-b border-white/5 py-4 text-left last:border-none"
                  >
                    <span
                      className={`font-mono text-xs tabular-nums transition-colors ${
                        active === link.id ? 'text-accent' : 'text-slate-600'
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <span
                      className={`font-display text-3xl font-semibold tracking-tight transition-colors ${
                        active === link.id ? 'text-white' : 'text-slate-400 group-active:text-white'
                      }`}
                    >
                      {link.label}
                    </span>
                    <FiArrowUpRight
                      className={`ml-auto text-xl transition-all ${
                        active === link.id
                          ? 'translate-x-0 opacity-100 text-accent'
                          : '-translate-x-1 opacity-0 group-active:translate-x-0 group-active:opacity-100'
                      }`}
                    />
                  </motion.button>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ delay: 0.06 + LINKS.length * 0.06, duration: 0.4 }}
                className="flex items-center justify-between gap-4 border-t border-white/5 pt-6"
              >
                <div className="flex items-center gap-3">
                  {socials.map((s) => {
                    const Icon = SOCIAL_ICONS[s.icon] ?? FiArrowUpRight
                    return (
                      <a
                        key={s.label}
                        href={s.url}
                        target={s.url.startsWith('http') ? '_blank' : undefined}
                        rel="noreferrer"
                        aria-label={s.label}
                        className="cursor-hover flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-slate-300"
                      >
                        <Icon size={17} />
                      </a>
                    )
                  })}
                </div>
                <button
                  type="button"
                  onClick={() => handleNav('contact')}
                  className="cursor-hover inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-base-950"
                >
                  Let's talk
                  <FiArrowUpRight />
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
