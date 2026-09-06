import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink, FiArrowUpRight } from 'react-icons/fi'
import { projects } from '../data/portfolioData.js'
import SectionHeading from './SectionHeading.jsx'

// Deterministic gradient per project (based on id) so placeholder cards
// look intentional rather than random, and stay stable across renders.
const GRADIENTS = [
  'from-accent/30 via-base-800 to-accent-violet/20',
  'from-accent-violet/30 via-base-800 to-accent-emerald/20',
  'from-accent-emerald/25 via-base-800 to-accent/20',
  'from-accent/25 via-base-800 to-accent-emerald/25',
]

function gradientFor(id) {
  const hash = [...id].reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return GRADIENTS[hash % GRADIENTS.length]
}

function ProjectCard({ project, index, large }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`group glass glass-hover flex flex-col overflow-hidden rounded-3xl ${
        large ? 'lg:col-span-2' : ''
      }`}
    >
      <div
        className={`relative h-52 overflow-hidden bg-gradient-to-br ${gradientFor(project.id)} ${
          large ? 'sm:h-64' : ''
        }`}
      >
        {project.image ? (
          <img
            src={project.image}
            alt={project.name}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center transition-transform duration-700 ease-out group-hover:scale-110">
            <span className="font-display text-5xl font-bold text-white/10 select-none">
              {project.name
                .split(' ')
                .map((w) => w[0])
                .join('')
                .slice(0, 3)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-base-950/90 via-base-950/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <p className="absolute bottom-4 left-5 right-5 translate-y-3 text-sm text-slate-200 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          {project.longDescription}
        </p>
        {project.featured && (
          <span className="absolute top-4 left-4 rounded-full glass px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-xl font-semibold text-white">{project.name}</h3>
          <div className="flex shrink-0 items-center gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.name} GitHub repository`}
                className="cursor-hover flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                <FiGithub size={15} />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.name} live demo`}
                className="cursor-hover flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                <FiExternalLink size={15} />
              </a>
            )}
          </div>
        </div>

        <p className="mt-3 text-sm text-slate-400">{project.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-400"
            >
              {tag}
            </span>
          ))}
        </div>

        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="cursor-hover group/link mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent"
          >
            View live
            <FiArrowUpRight className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </a>
        )}
      </div>
    </motion.article>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="relative px-5 py-28 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Selected Work"
          title="Things I've built"
          subtitle="Full-stack projects built end-to-end — from schema design to the last pixel of the UI."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} large={project.featured} />
          ))}
        </div>
      </div>
    </section>
  )
}
