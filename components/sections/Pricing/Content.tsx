'use client'

import { useState } from 'react'
import { Check, X } from 'lucide-react'
import { PricingSection, PricingTier } from '@/types/sanity'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

interface PricingContentProps {
  section: PricingSection
}

export function PricingContent({ section }: PricingContentProps) {
  const [isYearly, setIsYearly] = useState(false)

  const bgColors: Record<string, string> = {
    white: 'bg-white',
    gray: 'bg-gray-50',
  }

  return (
    <section className={cn('py-16 md:py-24', bgColors[section.backgroundColor || 'white'])}>
      <div className="container mx-auto px-4">
        {/* Header */}
        {(section.heading || section.subheading) && (
          <div className="mx-auto mb-12 max-w-3xl text-center">
            {section.heading && (
              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                {section.heading}
              </h2>
            )}
            {section.subheading && (
              <p className="mt-4 text-lg text-gray-600">{section.subheading}</p>
            )}
          </div>
        )}

        {/* Billing Toggle */}
        {section.showToggle && (
          <div className="mb-8 flex items-center justify-center gap-4">
            <span className={cn('text-sm font-medium', !isYearly && 'text-gray-900', isYearly && 'text-gray-500')}>
              Monthly
            </span>
            <button
              type="button"
              onClick={() => setIsYearly(!isYearly)}
              className={cn(
                'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                isYearly ? 'bg-primary-600' : 'bg-gray-200'
              )}
            >
              <span
                className={cn(
                  'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                  isYearly ? 'translate-x-6' : 'translate-x-1'
                )}
              />
            </button>
            <span className={cn('text-sm font-medium', isYearly && 'text-gray-900', !isYearly && 'text-gray-500')}>
              Yearly
              <span className="ml-1 text-green-600">Save 20%</span>
            </span>
          </div>
        )}

        {/* Pricing Cards */}
        <div className={cn(
          'mx-auto grid max-w-6xl gap-8',
          section.tiers?.length === 1 && 'max-w-md',
          section.tiers?.length === 2 && 'md:grid-cols-2',
          section.tiers?.length === 3 && 'md:grid-cols-3',
          section.tiers?.length === 4 && 'md:grid-cols-2 lg:grid-cols-4',
        )}>
          {section.tiers?.map((tier, index) => (
            <PricingCard 
              key={index} 
              tier={tier} 
              showYearly={isYearly}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function PricingCard({ tier, showYearly }: { tier: PricingTier; showYearly: boolean }) {
  const price = showYearly ? tier.yearlyPrice : tier.monthlyPrice
  const period = showYearly ? '/year' : '/month'

  return (
    <div
      className={cn(
        'relative flex flex-col rounded-2xl border p-6 md:p-8',
        tier.highlighted
          ? 'border-primary-500 bg-white shadow-xl ring-2 ring-primary-500'
          : 'border-gray-200 bg-white'
      )}
    >
      {/* Popular badge */}
      {tier.highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="rounded-full bg-primary-600 px-4 py-1 text-sm font-medium text-white">
            Most Popular
          </span>
        </div>
      )}

      {/* Plan Name & Description */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900">{tier.name}</h3>
        {tier.description && (
          <p className="mt-2 text-sm text-gray-600">{tier.description}</p>
        )}
      </div>

      {/* Price */}
      <div className="mb-6">
        <span className="text-4xl font-bold text-gray-900">
          {tier.currency || '$'}{price || 0}
        </span>
        <span className="text-gray-600">{period}</span>
      </div>

      {/* Features */}
      {tier.features && tier.features.length > 0 && (
        <ul className="mb-8 flex-1 space-y-3">
          {tier.features.map((feature, featureIndex) => (
            <li key={featureIndex} className="flex items-start gap-3">
              {feature.included !== false ? (
                <Check className="h-5 w-5 shrink-0 text-green-500" />
              ) : (
                <X className="h-5 w-5 shrink-0 text-gray-300" />
              )}
              <span className={cn(
                'text-sm',
                feature.included !== false ? 'text-gray-700' : 'text-gray-400'
              )}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* CTA Button */}
      <Button
        variant={tier.highlighted ? 'primary' : 'outline'}
        className="w-full"
      >
        {tier.ctaText || 'Get Started'}
      </Button>
    </div>
  )
}
