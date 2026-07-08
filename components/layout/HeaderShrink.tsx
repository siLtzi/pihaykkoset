'use client'

import { useEffect } from 'react'

export function HeaderShrink() {
  useEffect(() => {
    const header = document.getElementById('siteHeader')
    if (!header) return
    const onScroll = () => {
      if (window.scrollY > 60) header.classList.add('shrunk')
      else header.classList.remove('shrunk')
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return null
}
