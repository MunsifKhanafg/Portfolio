import { useEffect, useRef, useState } from 'react'

// Desktop-only custom cursor: a small dot with instant tracking and a
// trailing ring that eases behind it, both of which grow when hovering
// interactive elements. Hidden entirely on touch/coarse-pointer devices
// (see the media query in index.css).
export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const isFine = window.matchMedia('(pointer: fine)').matches
    setEnabled(isFine)
    if (!isFine) return

    let dotX = 0,
      dotY = 0,
      ringX = 0,
      ringY = 0
    let raf

    const onMove = (e) => {
      dotX = e.clientX
      dotY = e.clientY
    }

    const loop = () => {
      ringX += (dotX - ringX) * 0.18
      ringY += (dotY - ringY) * 0.18
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(loop)
    }

    const interactiveSelector = 'a, button, [role="button"], input, textarea, .cursor-hover'
    const onOver = (e) => {
      if (e.target.closest?.(interactiveSelector)) {
        ringRef.current?.classList.add('hovering')
      }
    }
    const onOut = (e) => {
      if (e.target.closest?.(interactiveSelector)) {
        ringRef.current?.classList.remove('hovering')
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
