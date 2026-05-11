'use client'

import Image from 'next/image'
import { ProcessSection } from '@/types/sanity'
import { urlFor } from '@/sanity/lib/client'
import { cn } from '@/lib/utils'
import * as LucideIcons from 'lucide-react'

interface ProcessContentProps {
  section: ProcessSection
}

export function ProcessContent({ section }: ProcessContentProps) {
  const bgColors = {
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

        {/* Steps */}
        {section.layout === 'timeline' ? (
          <TimelineLayout steps={section.steps} showNumbers={section.showNumbers} />
        ) : section.layout === 'horizontal' ? (
          <HorizontalLayout steps={section.steps} showNumbers={section.showNumbers} />
        ) : section.layout === 'alternating' ? (
          <AlternatingLayout steps={section.steps} showNumbers={section.showNumbers} />
        ) : (
          <CardsLayout steps={section.steps} showNumbers={section.showNumbers} />
        )}
      </div>
    </section>
  )
}

interface Step {
  title: string
  description?: string
  icon?: string
  image?: { asset: { _ref: string } }
}

interface LayoutProps {
  steps?: Step[]
  showNumbers?: boolean
}

function TimelineLayout({ steps, showNumbers }: LayoutProps) {
  return (
    <div className="mx-auto max-w-3xl">
      {steps?.map((step, index) => (
        <div key={index} className="relative flex gap-6 pb-12 last:pb-0">
          {/* Timeline line */}
          {index < (steps.length - 1) && (
            <div className="absolute left-6 top-12 h-full w-0.5 bg-primary-200" />
          )}
          
          {/* Number/Icon */}
          <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-600 text-lg font-bold text-white">
            {showNumbers ? index + 1 : <StepIcon icon={step.icon} />}
          </div>
          
          {/* Content */}
          <div className="flex-1 pt-1">
            <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
            {step.description && (
              <p className="mt-2 text-gray-600">{step.description}</p>
            )}
            {step.image?.asset && (
              <div className="mt-4 overflow-hidden rounded-lg">
                <Image
                  src={urlFor(step.image).width(600).height(400).url()}
                  alt={step.title}
                  width={600}
                  height={400}
                  className="h-auto w-full"
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

function HorizontalLayout({ steps, showNumbers }: LayoutProps) {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="relative">
        {/* Connecting line */}
        <div className="absolute left-0 right-0 top-6 hidden h-0.5 bg-primary-200 md:block" />
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps?.map((step, index) => (
            <div key={index} className="relative text-center">
              {/* Number/Icon */}
              <div className="relative z-10 mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-lg font-bold text-white">
                {showNumbers ? index + 1 : <StepIcon icon={step.icon} />}
              </div>
              
              {/* Content */}
              <h3 className="mt-4 text-lg font-semibold text-gray-900">{step.title}</h3>
              {step.description && (
                <p className="mt-2 text-sm text-gray-600">{step.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AlternatingLayout({ steps, showNumbers }: LayoutProps) {
  return (
    <div className="mx-auto max-w-5xl space-y-12">
      {steps?.map((step, index) => (
        <div
          key={index}
          className={cn(
            'flex flex-col gap-8 md:flex-row md:items-center',
            index % 2 === 1 && 'md:flex-row-reverse'
          )}
        >
          {/* Image */}
          <div className="md:w-1/2">
            {step.image?.asset ? (
              <Image
                src={urlFor(step.image).width(600).height(400).url()}
                alt={step.title}
                width={600}
                height={400}
                className="h-auto w-full rounded-lg"
              />
            ) : (
              <div className="flex aspect-video items-center justify-center rounded-lg bg-primary-100">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-600 text-3xl font-bold text-white">
                  {showNumbers ? index + 1 : <StepIcon icon={step.icon} size={32} />}
                </div>
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className="md:w-1/2">
            <div className="mb-2 text-sm font-medium uppercase tracking-wider text-primary-600">
              Step {index + 1}
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
            {step.description && (
              <p className="mt-3 text-gray-600">{step.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

function CardsLayout({ steps, showNumbers }: LayoutProps) {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {steps?.map((step, index) => (
        <div key={index} className="rounded-xl bg-white p-6 shadow-md">
          {/* Number/Icon */}
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-lg font-bold text-primary-600">
            {showNumbers ? index + 1 : <StepIcon icon={step.icon} />}
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
          {step.description && (
            <p className="mt-2 text-sm text-gray-600">{step.description}</p>
          )}
        </div>
      ))}
    </div>
  )
}

function StepIcon({ icon, size = 20 }: { icon?: string; size?: number }) {
  if (!icon) return null
  
  const iconName = icon.charAt(0).toUpperCase() + icon.slice(1).replace(/-([a-z])/g, (g) => g[1].toUpperCase())
  const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number }>>)[iconName]
  
  if (!Icon) return null
  
  return <Icon size={size} />
}
