// Small shared helper so every component scrolls to sections the same way,
// accounting for the fixed navbar height.
export const NAV_OFFSET = 76

export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
  window.scrollTo({ top, behavior: 'smooth' })
}
