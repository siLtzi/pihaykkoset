'use client'

import { useEffect } from 'react'

export function ContactParallax() {
  useEffect(() => {
    const el = document.getElementById('contactBgText')
    if (!el) return
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        const inView = rect.bottom > 0 && rect.top < window.innerHeight
        if (inView) {
          const p = (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
          el.style.setProperty('--bgX', `${p * -240}px`)
        }
        ticking = false
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return null
}
