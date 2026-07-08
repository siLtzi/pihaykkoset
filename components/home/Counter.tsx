'use client'

import { useEffect, useRef, useState } from 'react'

interface CounterProps {
  to: number
  duration?: number
  className?: string
}

/** Animated counter from 0 → `to` once it scrolls into view. */
export function Counter({ to, duration = 1800, className = 'counter' }: CounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const [value, setValue] = useState(0)
  const startedRef = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting || startedRef.current) return
          startedRef.current = true
          const start = performance.now()
          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - t, 3)
            setValue(Math.round(eased * to))
            if (t < 1) raf = requestAnimationFrame(tick)
          }
          raf = requestAnimationFrame(tick)
          io.unobserve(el)
        })
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [to, duration])

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  )
}
