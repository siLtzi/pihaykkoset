'use client'

import { useEffect, useRef, RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Animation presets
export const animations = {
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  fadeUp: {
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0 },
  },
  fadeDown: {
    from: { opacity: 0, y: -50 },
    to: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    from: { opacity: 0, x: 50 },
    to: { opacity: 1, x: 0 },
  },
  fadeRight: {
    from: { opacity: 0, x: -50 },
    to: { opacity: 1, x: 0 },
  },
  scaleIn: {
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1 },
  },
  rotateIn: {
    from: { opacity: 0, rotation: -10 },
    to: { opacity: 1, rotation: 0 },
  },
} as const

export type AnimationPreset = keyof typeof animations

interface UseScrollAnimationOptions {
  animation?: AnimationPreset
  duration?: number
  delay?: number
  ease?: string
  start?: string
  end?: string
  scrub?: boolean | number
  markers?: boolean
  once?: boolean
}

/**
 * Hook for scroll-triggered animations
 */
export function useScrollAnimation<T extends HTMLElement>(
  options: UseScrollAnimationOptions = {}
): RefObject<T> {
  const ref = useRef<T>(null)

  const {
    animation = 'fadeUp',
    duration = 0.8,
    delay = 0,
    ease = 'power2.out',
    start = 'top 80%',
    end = 'bottom 20%',
    scrub = false,
    markers = false,
    once = true,
  } = options

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const preset = animations[animation]

    gsap.set(element, preset.from)

    const trigger = ScrollTrigger.create({
      trigger: element,
      start,
      end,
      scrub,
      markers,
      once,
      onEnter: () => {
        gsap.to(element, {
          ...preset.to,
          duration,
          delay,
          ease,
        })
      },
      onLeaveBack: once ? undefined : () => {
        gsap.to(element, {
          ...preset.from,
          duration: duration * 0.5,
        })
      },
    })

    return () => {
      trigger.kill()
    }
  }, [animation, duration, delay, ease, start, end, scrub, markers, once])

  return ref as RefObject<T>
}

interface UseStaggerAnimationOptions extends UseScrollAnimationOptions {
  stagger?: number
  childSelector?: string
}

/**
 * Hook for staggered scroll animations on child elements
 */
export function useStaggerAnimation<T extends HTMLElement>(
  options: UseStaggerAnimationOptions = {}
): RefObject<T> {
  const ref = useRef<T>(null)

  const {
    animation = 'fadeUp',
    duration = 0.6,
    delay = 0,
    ease = 'power2.out',
    start = 'top 80%',
    stagger = 0.1,
    childSelector = ':scope > *',
    once = true,
  } = options

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const children = element.querySelectorAll(childSelector)
    if (children.length === 0) return

    const preset = animations[animation]

    gsap.set(children, preset.from)

    const trigger = ScrollTrigger.create({
      trigger: element,
      start,
      once,
      onEnter: () => {
        gsap.to(children, {
          ...preset.to,
          duration,
          delay,
          ease,
          stagger,
        })
      },
    })

    return () => {
      trigger.kill()
    }
  }, [animation, duration, delay, ease, start, stagger, childSelector, once])

  return ref as RefObject<T>
}

/**
 * Hook for parallax scrolling effect
 */
export function useParallax<T extends HTMLElement>(
  speed: number = 0.5
): RefObject<T> {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const yPos = self.progress * 100 * speed
        gsap.set(element, { y: yPos })
      },
    })

    return () => {
      trigger.kill()
    }
  }, [speed])

  return ref as RefObject<T>
}

/**
 * Hook for text reveal animation (split text)
 */
export function useTextReveal<T extends HTMLElement>(
  options: {
    by?: 'chars' | 'words' | 'lines'
    duration?: number
    stagger?: number
    start?: string
  } = {}
): RefObject<T> {
  const ref = useRef<T>(null)

  const {
    by = 'words',
    duration = 0.8,
    stagger = 0.05,
    start = 'top 80%',
  } = options

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const text = element.textContent || ''
    let items: string[] = []

    if (by === 'chars') {
      items = text.split('')
    } else if (by === 'words') {
      items = text.split(' ')
    } else {
      items = [text] // For lines, we'd need more complex logic
    }

    // Create wrapped elements
    element.innerHTML = items
      .map((item, i) => {
        const content = by === 'words' && i < items.length - 1 ? item + ' ' : item
        return `<span class="inline-block overflow-hidden"><span class="inline-block">${content}</span></span>`
      })
      .join('')

    const spans = element.querySelectorAll(':scope > span > span')

    gsap.set(spans, { y: '100%', opacity: 0 })

    const trigger = ScrollTrigger.create({
      trigger: element,
      start,
      once: true,
      onEnter: () => {
        gsap.to(spans, {
          y: '0%',
          opacity: 1,
          duration,
          ease: 'power3.out',
          stagger,
        })
      },
    })

    return () => {
      trigger.kill()
      element.textContent = text // Restore original text
    }
  }, [by, duration, stagger, start])

  return ref as RefObject<T>
}

/**
 * Hook for counter/number animation
 */
export function useCountUp<T extends HTMLElement>(
  endValue: number,
  options: {
    duration?: number
    start?: string
    prefix?: string
    suffix?: string
    decimals?: number
  } = {}
): RefObject<T> {
  const ref = useRef<T>(null)

  const {
    duration = 2,
    start = 'top 80%',
    prefix = '',
    suffix = '',
    decimals = 0,
  } = options

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const counter = { value: 0 }

    const trigger = ScrollTrigger.create({
      trigger: element,
      start,
      once: true,
      onEnter: () => {
        gsap.to(counter, {
          value: endValue,
          duration,
          ease: 'power1.out',
          onUpdate: () => {
            element.textContent = `${prefix}${counter.value.toFixed(decimals)}${suffix}`
          },
        })
      },
    })

    return () => {
      trigger.kill()
    }
  }, [endValue, duration, start, prefix, suffix, decimals])

  return ref as RefObject<T>
}

/**
 * Utility to create a timeline with ScrollTrigger
 */
export function createScrollTimeline(
  trigger: HTMLElement | string,
  options: ScrollTrigger.Vars = {}
): gsap.core.Timeline {
  return gsap.timeline({
    scrollTrigger: {
      trigger,
      start: 'top 80%',
      end: 'bottom 20%',
      ...options,
    },
  })
}

/**
 * Refresh all ScrollTriggers (useful after dynamic content loads)
 */
export function refreshScrollTriggers(): void {
  ScrollTrigger.refresh()
}

/**
 * Kill all ScrollTriggers
 */
export function killAllScrollTriggers(): void {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
}
