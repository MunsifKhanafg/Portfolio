import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiMapPin, FiCode, FiBookOpen, FiCoffee, FiCalendar } from 'react-icons/fi'
import { profile, bento } from '../data/portfolioData.js'
import SectionHeading from './SectionHeading.jsx'

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const ROTATE_INTERVAL = 3500 // ms between photo crossfades

function Cell({ className = '', children, delay = 0 }) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay }}
      className={`glass glass-hover rounded-3xl p-6 sm:p-7 ${className}`}
    >
      {children}
    </motion.div>
  )
}

// Rotating photo — crossfades through profile.photos on a timer. Any photo
// that fails to load (e.g. the placeholder paths before you've added real
// files) is silently dropped from the rotation; if none load, it falls
// back to the initials avatar.
function RotatingPhoto() {
  const sources = profile.photos ?? []
  const [failed, setFailed] = useState(() => new Set())
  const [index, setIndex] = useState(0)

  const validSources = sources.filter((_, i) => !failed.has(i))

  useEffect(() => {
    if (validSources.length < 2) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % validSources.length)
    }, ROTATE_INTERVAL)
    return () => clearInterval(id)
  }, [validSources.length])

  const markFailed = (i) => {
    setFailed((prev) => new Set(prev).add(i))
  }

  if (validSources.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/20 via-accent-violet/20 to-accent-emerald/20 font-display text-2xl font-bold text-white">
        {profile.initials}
        {/* Hidden probes so a photo that starts working gets picked up
            without needing a page refresh. */}
        {sources.map((src, i) => (
          <img key={src} src={src} alt="" className="hidden" onError={() => markFailed(i)} />
        ))}
      </div>
    )
  }

  const safeIndex = index % validSources.length

  return (
    <div className="relative h-full w-full">
      <AnimatePresence mode="wait">
        <motion.img
          key={validSources[safeIndex]}
          src={validSources[safeIndex]}
          alt={profile.name}
          onError={() => markFailed(sources.indexOf(validSources[safeIndex]))}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="relative px-5 py-28 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="About"
          title="The person behind the code"
          subtitle="A quick tour of what I do, what I'm learning, and how I got here."
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[170px]">
          {/* Bio — large cell */}
          <Cell className="lg:col-span-2 lg:row-span-2 flex flex-col justify-center">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent/80">
              Bio
            </span>
            <div className="mt-4 space-y-4 text-slate-300 leading-relaxed">
              {profile.bio.map((p, i) => (
                <p key={i} className={i === 0 ? 'text-lg text-white' : 'text-sm sm:text-base'}>
                  {p}
                </p>
              ))}
            </div>
          </Cell>

          {/* Identity / location */}
          <Cell
            className="lg:col-span-1 lg:row-span-2 flex flex-col items-center justify-center text-center"
            delay={0.05}
          >
            <div className="h-20 w-20 overflow-hidden rounded-2xl shadow-glow">
              <RotatingPhoto />
            </div>
            <h3 className="mt-5 font-display text-lg font-semibold text-white">
              {profile.name}
            </h3>
            <p className="text-sm text-slate-400">{profile.title}</p>
            <div className="mt-4 flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-xs text-slate-400">
              <FiMapPin className="text-accent" />
              {profile.location}
            </div>
          </Cell>

          {/* Tech stack */}
          <Cell className="lg:col-span-1 lg:row-span-2" delay={0.1}>
            <div className="flex items-center gap-2 text-accent">
              <FiCode />
              <span className="font-mono text-xs uppercase tracking-[0.2em]">Stack</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {bento.stack.map((t) => (
                <span
                  key={t}
                  className="rounded-lg bg-white/5 px-2.5 py-1.5 text-xs font-medium text-slate-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </Cell>

          {/* Currently learning */}
          <Cell className="lg:col-span-2" delay={0.15}>
            <div className="flex items-center gap-2 text-accent-violet">
              <FiBookOpen />
              <span className="font-mono text-xs uppercase tracking-[0.2em]">
                Currently learning
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {bento.currentlyLearning.map((t) => (
                <span
                  key={t}
                  className="rounded-lg border border-accent-violet/30 bg-accent-violet/10 px-2.5 py-1.5 text-xs font-medium text-slate-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </Cell>

          {/* Stats */}
          <Cell delay={0.2}>
            <div className="flex items-center gap-2 text-accent-emerald">
              <FiCalendar />
              <span className="font-mono text-xs uppercase tracking-[0.2em]">Stats</span>
            </div>
            <ul className="mt-4 space-y-2">
              {bento.stats.map((s) => (
                <li key={s.label} className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">{s.label}</span>
                  <span className="font-medium text-white">{s.value}</span>
                </li>
              ))}
            </ul>
          </Cell>

          {/* Hobbies */}
          <Cell delay={0.25}>
            <div className="flex items-center gap-2 text-accent">
              <FiCoffee />
              <span className="font-mono text-xs uppercase tracking-[0.2em]">Beyond code</span>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              {bento.hobbies.map((h) => (
                <li key={h} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {h}
                </li>
              ))}
            </ul>
          </Cell>
        </div>
      </div>
    </section>
  )
}
