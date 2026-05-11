'use client'

import { useEffect, useRef, useState } from 'react'
import { StatsSection } from '@/types/sanity'
import { cn } from '@/lib/utils'

interface StatsContentProps {
  section: StatsSection
}

export function StatsContent({ section }: StatsContentProps) {
  const bgColors = {
    white: 'bg-white text-gray-900',
    gray: 'bg-gray-50 text-gray-900',
    primary: 'bg-primary-600 text-white',
    dark: 'bg-gray-900 text-white',
  }

  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={cn('py-16 md:py-24', bgColors[section.backgroundColor || 'primary'])}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        {(section.heading || section.subheading) && (
          <div className="mx-auto mb-12 max-w-3xl text-center">
            {section.heading && (
              <h2 className="text-3xl font-bold md:text-4xl">{section.heading}</h2>
            )}
            {section.subheading && (
              <p className={cn(
                'mt-4 text-lg',
                section.backgroundColor === 'primary' || section.backgroundColor === 'dark'
                  ? 'text-white/80'
                  : 'text-gray-600'
              )}>
                {section.subheading}
              </p>
            )}
          </div>
        )}

        {/* Stats */}
        <div className={cn(
          'mx-auto max-w-6xl',
          section.layout === 'row' && 'flex flex-wrap items-center justify-center gap-8 md:gap-16',
          section.layout === 'grid' && 'grid grid-cols-2 gap-8 md:grid-cols-4',
          section.layout === 'cards' && 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4',
        )}>
          {section.stats?.map((stat, index) => (
            <StatItem
              key={index}
              stat={stat}
              layout={section.layout}
              animate={section.animate && isVisible}
              backgroundColor={section.backgroundColor}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

interface StatItemProps {
  stat: {
    value: string
    label: string
    description?: string
  }
  layout?: string
  animate?: boolean
  backgroundColor?: string
  delay: number
}

function StatItem({ stat, layout, animate, backgroundColor, delay }: StatItemProps) {
  const [displayValue, setDisplayValue] = useState(animate ? '0' : stat.value)

  useEffect(() => {
    if (!animate) return

    const numericMatch = stat.value.match(/^([\d,.]+)/)
    if (!numericMatch) {
      setDisplayValue(stat.value)
      return
    }

    const targetNum = parseFloat(numericMatch[1].replace(/,/g, ''))
    const suffix = stat.value.slice(numericMatch[0].length)
    const duration = 2000
    const startTime = Date.now() + delay

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      if (elapsed < 0) return

      const progress = Math.min(elapsed / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(targetNum * easeOut)

      setDisplayValue(current.toLocaleString() + suffix)

      if (progress >= 1) {
        clearInterval(interval)
        setDisplayValue(stat.value)
      }
    }, 16)

    return () => clearInterval(interval)
  }, [animate, stat.value, delay])

  if (layout === 'cards') {
    return (
      <div className={cn(
        'rounded-xl p-6 text-center',
        backgroundColor === 'primary' || backgroundColor === 'dark'
          ? 'bg-white/10'
          : 'bg-white shadow-md'
      )}>
        <div className="text-4xl font-bold md:text-5xl">{displayValue}</div>
        <div className={cn(
          'mt-2 font-medium',
          backgroundColor === 'primary' || backgroundColor === 'dark'
            ? 'text-white/90'
            : 'text-gray-900'
        )}>
          {stat.label}
        </div>
        {stat.description && (
          <p className={cn(
            'mt-1 text-sm',
            backgroundColor === 'primary' || backgroundColor === 'dark'
              ? 'text-white/70'
              : 'text-gray-500'
          )}>
            {stat.description}
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="text-center">
      <div className="text-4xl font-bold md:text-5xl lg:text-6xl">{displayValue}</div>
      <div className={cn(
        'mt-2 font-medium',
        backgroundColor === 'primary' || backgroundColor === 'dark'
          ? 'text-white/90'
          : 'text-gray-600'
      )}>
        {stat.label}
      </div>
      {stat.description && (
        <p className={cn(
          'mt-1 text-sm',
          backgroundColor === 'primary' || backgroundColor === 'dark'
            ? 'text-white/70'
            : 'text-gray-500'
        )}>
          {stat.description}
        </p>
      )}
    </div>
  )
}
