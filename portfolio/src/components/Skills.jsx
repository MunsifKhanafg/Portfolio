import { motion } from 'framer-motion'
import {
  SiJavascript,
  SiHtml5,
  SiCss,
  SiMysql,
  SiReact,
  SiRedux,
  SiNodedotjs,
  SiExpress,
  SiTailwindcss,
  SiMongodb,
  SiGit,
  SiGithub,
  SiSocketdotio,
  SiDocker,
  SiJenkins,
  SiKubernetes,
  SiVercel,
} from 'react-icons/si'
import { FiCode, FiLayers, FiDatabase, FiTool } from 'react-icons/fi'
import { skills } from '../data/portfolioData.js'
import SectionHeading from './SectionHeading.jsx'

const ICON_MAP = {
  JavaScript: SiJavascript,
  HTML5: SiHtml5,
  CSS3: SiCss,
  SQL: SiMysql,
  React: SiReact,
  'Redux Toolkit': SiRedux,
  'Node.js': SiNodedotjs,
  Express: SiExpress,
  'Tailwind CSS': SiTailwindcss,
  MongoDB: SiMongodb,
  Git: SiGit,
  GitHub: SiGithub,
  'Socket.io': SiSocketdotio,
  Docker: SiDocker,
  Jenkins: SiJenkins,
  Kubernetes: SiKubernetes,
  'CI/CD': FiTool,
  Vercel: SiVercel,
}

const CATEGORY_ICONS = {
  Languages: FiCode,
  'Frameworks & Libraries': FiLayers,
  Databases: FiDatabase,
  'Tools & Platforms': FiTool,
}

const CATEGORY_ACCENTS = {
  Languages: 'text-accent',
  'Frameworks & Libraries': 'text-accent-violet',
  Databases: 'text-accent-emerald',
  'Tools & Platforms': 'text-accent',
}

export default function Skills() {
  const categories = Object.entries(skills)

  return (
    <section id="skills" className="relative px-5 py-28 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Toolbox"
          title="Skills & tech stack"
          subtitle="Languages, frameworks, and tools I reach for day to day."
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {categories.map(([category, items], i) => {
            const CategoryIcon = CATEGORY_ICONS[category] ?? FiCode
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="glass glass-hover rounded-3xl p-6 sm:p-7"
              >
                <div className={`flex items-center gap-2 ${CATEGORY_ACCENTS[category]}`}>
                  <CategoryIcon size={18} />
                  <h3 className="font-display text-base font-semibold text-white">
                    {category}
                  </h3>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {items.map((skill) => {
                    const Icon = ICON_MAP[skill] ?? FiCode
                    return (
                      <div
                        key={skill}
                        className="cursor-hover flex items-center gap-2 rounded-xl bg-white/[0.03] px-3 py-2.5 text-sm text-slate-300 transition-colors hover:bg-white/[0.06] hover:text-white"
                      >
                        <Icon size={15} className="shrink-0 opacity-70" />
                        <span className="truncate">{skill}</span>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
