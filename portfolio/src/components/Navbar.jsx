import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiMenu, FiX, FiArrowUpRight } from 'react-icons/fi'
import { profile } from '../data/portfolioData.js'
import { scrollToId } from '../lib/scroll.js'

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

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

  // Lock body scroll while the mobile menu is open — prevents the page
  // scrolling behind the overlay and any touch/scroll interference on
  // real mobile browsers.
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [open])

  const handleNav = (id) => {
    setOpen(false)
    // Let the menu-close state flush before scrolling, so the layout is
    // back to normal (body scroll unlocked) when we calculate positions.
    requestAnimationFrame(() => scrollToId(id))
  }

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
          {LINKS.map((link) => (
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
          className="cursor-hover relative z-[120] flex h-10 w-10 items-center justify-center text-2xl text-white md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {/* Full-screen mobile overlay — more reliable on real devices than a
          small anchored dropdown, and impossible for other fixed elements
          to render on top of. */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-base-950/98 backdrop-blur-xl md:hidden"
          >
            <div className="flex h-full flex-col items-center justify-center gap-2 px-6">
              {LINKS.map((link, i) => (
                <motion.button
                  key={link.id}
                  type="button"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.35 }}
                  onClick={() => handleNav(link.id)}
                  className={`cursor-hover w-full max-w-xs rounded-2xl px-6 py-4 text-center text-xl font-display font-semibold transition-colors ${
                    active === link.id ? 'bg-white/10 text-white' : 'text-slate-300'
                  }`}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                type="button"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + LINKS.length * 0.06, duration: 0.35 }}
                onClick={() => handleNav('contact')}
                className="cursor-hover mt-4 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-base-950"
              >
                Let's talk
                <FiArrowUpRight />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
