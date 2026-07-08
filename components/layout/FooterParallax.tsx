'use client'

import { useEffect } from 'react'

/** Parallax for the giant footer logotype text. */
export function FooterParallax() {
  useEffect(() => {
    const el = document.getElementById('footerLogo')
    if (!el) return
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const p = window.scrollY / Math.max(document.body.scrollHeight - window.innerHeight, 1)
        el.style.setProperty('--bgX', `${p * -300}px`)
        ticking = false
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return null
}
