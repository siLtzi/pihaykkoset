'use client'

import { useEffect, useRef, type ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  as?: keyof React.JSX.IntrinsicElements
  className?: string
  delay?: number
  id?: string
}

/** Wraps children with a reveal-on-scroll IntersectionObserver. */
export function Reveal({ children, as = 'div', className = '', delay = 0, id }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let timer: ReturnType<typeof setTimeout> | undefined
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            timer = setTimeout(() => el.classList.add('in'), delay)
            io.unobserve(el)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px' },
    )
    io.observe(el)
    return () => {
      if (timer) clearTimeout(timer)
      io.disconnect()
    }
  }, [delay])

  const Tag = as as 'div'
  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      id={id}
      className={`reveal ${className}`.trim()}
    >
      {children}
    </Tag>
  )
}
