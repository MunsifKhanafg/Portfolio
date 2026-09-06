import { motion } from 'framer-motion'
import { FiBookOpen, FiBriefcase, FiFlag } from 'react-icons/fi'
import { timeline } from '../data/portfolioData.js'
import SectionHeading from './SectionHeading.jsx'

const ICONS = {
  education: FiBookOpen,
  experience: FiBriefcase,
  milestone: FiFlag,
}

const COLORS = {
  education: 'text-accent border-accent/30 bg-accent/10',
  experience: 'text-accent-violet border-accent-violet/30 bg-accent-violet/10',
  milestone: 'text-accent-emerald border-accent-emerald/30 bg-accent-emerald/10',
}

export default function Timeline() {
  return (
    <section id="experience" className="relative px-5 py-28 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Journey"
          title="Experience & Education"
          subtitle="Where I've studied, trained, and worked."
        />

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[27px] top-2 bottom-2 w-px bg-gradient-to-b from-accent/40 via-white/10 to-transparent sm:left-[31px]" />

          <ol className="space-y-8">
            {timeline.map((entry, i) => {
              const Icon = ICONS[entry.type] ?? FiFlag
              return (
                <motion.li
                  key={entry.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex gap-5 sm:gap-6"
                >
                  <div
                    className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border glass ${COLORS[entry.type]}`}
                  >
                    <Icon size={20} />
                  </div>

                  <div className="glass glass-hover flex-1 rounded-2xl p-5 sm:p-6">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-display text-lg font-semibold text-white">
                        {entry.title}
                      </h3>
                      {entry.period && (
                        <span className="font-mono text-xs uppercase tracking-wider text-slate-500">
                          {entry.period}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm font-medium text-accent">{entry.org}</p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">
                      {entry.description}
                    </p>
                  </div>
                </motion.li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
