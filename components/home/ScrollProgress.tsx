'use client'

import { useEffect } from 'react'

export function ScrollProgress() {
  useEffect(() => {
    const el = document.getElementById('scrollProgress')
    if (!el) return
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const max = document.body.scrollHeight - window.innerHeight
        const pct = max > 0 ? (window.scrollY / max) * 100 : 0
        el.style.setProperty('--progress', `${pct}%`)
        ticking = false
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <div className="scroll-progress" id="scrollProgress" aria-hidden="true" />
}
