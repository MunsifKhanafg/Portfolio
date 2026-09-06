import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiPhone, FiArrowDown, FiArrowUpRight } from 'react-icons/fi'
import { profile, socials } from '../data/portfolioData.js'
import { scrollToId } from '../lib/scroll.js'

const ICONS = { github: FiGithub, linkedin: FiLinkedin, mail: FiMail, phone: FiPhone }

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-5 pt-28 pb-20 sm:px-8"
    >
      {/* Floating gradient orbs */}
      <div className="pointer-events-none absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-accent/20 blur-[100px] animate-float" />
      <div
        className="pointer-events-none absolute -right-24 bottom-1/4 h-80 w-80 rounded-full bg-accent-violet/20 blur-[110px] animate-float"
        style={{ animationDelay: '2s' }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto w-full max-w-6xl"
      >
        <motion.div
          variants={item}
          className="mb-8 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-emerald opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-emerald" />
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-slate-300">
            {profile.status}
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="font-display text-[13vw] leading-[0.95] font-bold tracking-tighter text-white sm:text-7xl md:text-8xl"
        >
          {profile.name.split(' ')[0]}
          <br />
          <span className="text-gradient">{profile.name.split(' ').slice(1).join(' ')}</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-8 max-w-2xl text-lg text-slate-400 sm:text-xl"
        >
          {profile.title} — {profile.tagline}
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
          <button
            onClick={() => scrollToId('projects')}
            className="cursor-hover group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-base-950 shadow-glow transition-transform hover:-translate-y-0.5"
          >
            View Projects
            <FiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
          <button
            onClick={() => scrollToId('contact')}
            className="cursor-hover glass glass-hover inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white"
          >
            Get In Touch
          </button>
        </motion.div>

        <motion.div variants={item} className="mt-14 flex items-center gap-4">
          {socials.map((s) => {
            const Icon = ICONS[s.icon] ?? FiArrowUpRight
            return (
              <a
                key={s.label}
                href={s.url}
                target={s.url.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                aria-label={s.label}
                className="cursor-hover glass glass-hover flex h-11 w-11 items-center justify-center rounded-full text-slate-300 hover:text-white"
              >
                <Icon size={18} />
              </a>
            )
          })}
          <span className="hidden sm:block h-6 w-px bg-white/10" />
          <span className="hidden sm:block font-mono text-xs text-slate-500">
            {profile.location}
          </span>
        </motion.div>
      </motion.div>

      <motion.button
        onClick={() => scrollToId('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="cursor-hover absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
        aria-label="Scroll to about section"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <FiArrowDown className="animate-bounce" />
      </motion.button>
    </section>
  )
}
