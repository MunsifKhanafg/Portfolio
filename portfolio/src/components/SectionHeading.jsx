import { motion } from 'framer-motion'

// Shared heading block used at the top of every section — keeps the
// eyebrow / title / subtitle rhythm consistent site-wide.
export default function SectionHeading({ eyebrow, title, subtitle, align = 'left' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`mb-14 max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}
    >
      <p className="section-eyebrow mb-3">{eyebrow}</p>
      <h2 className="section-heading">{title}</h2>
      {subtitle && <p className="mt-4 text-slate-400">{subtitle}</p>}
    </motion.div>
  )
}
