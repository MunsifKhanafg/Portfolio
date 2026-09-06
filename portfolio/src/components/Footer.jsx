import { FiArrowUp } from 'react-icons/fi'
import { profile } from '../data/portfolioData.js'
import { scrollToId } from '../lib/scroll.js'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative border-t border-white/5 px-5 py-8 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="font-mono text-xs text-slate-500">
          © {year} {profile.name}. All rights reserved.
        </p>
        <button
          onClick={() => scrollToId('home')}
          className="cursor-hover flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Back to top"
        >
          <FiArrowUp size={16} />
        </button>
      </div>
    </footer>
  )
}
