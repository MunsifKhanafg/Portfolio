import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import CustomCursor from './components/CustomCursor.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Timeline from './components/Timeline.jsx'
import Skills from './components/Skills.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  })

  // Loading gate — a brief, tasteful entrance rather than a blank flash.
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 150)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="relative min-h-screen bg-base-950 selection:bg-accent/25">
      {/* Fixed decorative backdrop */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-grid-pattern bg-[size:44px_44px] opacity-[0.4]" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-radial-fade" />

      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-accent via-accent-violet to-accent-emerald"
      />

      <CustomCursor />
      <Navbar />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Hero />
        <About />
        <Projects />
        <Timeline />
        <Skills />
        <Contact />
      </motion.main>

      <Footer />
    </div>
  )
}
