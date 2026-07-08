'use client'

import { useEffect, useState } from 'react'
import type { HomeNavItem } from '@/types/sanity'

interface MobileMenuProps {
  items: HomeNavItem[]
  phone?: string
}

export function MobileMenu({ items, phone }: MobileMenuProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = original
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        className="mobile-toggle"
        aria-label={open ? 'Sulje valikko' : 'Avaa valikko'}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span aria-hidden="true" />
      </button>
      <div
        id="mobile-menu"
        className={`mobile-menu${open ? ' open' : ''}`}
        aria-hidden={!open}
      >
        {items.map((item, i) => (
          <a
            key={item.anchor}
            href={`#${item.anchor.replace(/^#/, '')}`}
            onClick={() => setOpen(false)}
          >
            <span className="num">{String(i + 1).padStart(2, '0')}</span>
            <span>{item.label}</span>
          </a>
        ))}
        {phone && (
          <a
            href={`tel:${phone.replace(/\s+/g, '')}`}
            onClick={() => setOpen(false)}
          >
            <span className="num">→</span>
            <span>{phone}</span>
          </a>
        )}
      </div>
    </>
  )
}
