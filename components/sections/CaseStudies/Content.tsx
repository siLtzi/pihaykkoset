'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CaseStudiesSection, CaseStudy } from '@/types/sanity'
import { urlFor } from '@/sanity/lib/client'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface CaseStudiesContentProps {
  section: CaseStudiesSection
  caseStudies?: CaseStudy[]
}

export function CaseStudiesContent({ section, caseStudies = [] }: CaseStudiesContentProps) {
  const bgColors = {
    white: 'bg-white',
    gray: 'bg-gray-50',
  }

  // Filter case studies based on display mode
  const displayCaseStudies = section.displayMode === 'selected' && section.selectedCaseStudies
    ? section.selectedCaseStudies
    : section.displayMode === 'featured'
    ? caseStudies.filter(cs => cs.featured)
    : caseStudies

  return (
    <section className={cn('py-16 md:py-24', bgColors[section.backgroundColor || 'gray'])}>
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

        {/* Case Studies */}
        {section.layout === 'carousel' ? (
          <CarouselLayout
            caseStudies={displayCaseStudies}
            showMetrics={section.showMetrics}
            showIndustry={section.showIndustry}
          />
        ) : section.layout === 'featured-list' ? (
          <FeaturedListLayout
            caseStudies={displayCaseStudies}
            showMetrics={section.showMetrics}
            showIndustry={section.showIndustry}
          />
        ) : (
          <GridLayout
            caseStudies={displayCaseStudies}
            showMetrics={section.showMetrics}
            showIndustry={section.showIndustry}
          />
        )}

        {/* View All CTA */}
        {section.ctaText && section.ctaLink && (
          <div className="mt-12 text-center">
            <Button variant="outline">
              {section.ctaText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

interface LayoutProps {
  caseStudies: CaseStudy[]
  showMetrics?: boolean
  showIndustry?: boolean
}

function GridLayout({ caseStudies, showMetrics, showIndustry }: LayoutProps) {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {caseStudies.map((caseStudy, index) => (
        <CaseStudyCard
          key={index}
          caseStudy={caseStudy}
          showMetrics={showMetrics}
          showIndustry={showIndustry}
        />
      ))}
    </div>
  )
}

function CarouselLayout({ caseStudies, showMetrics, showIndustry }: LayoutProps) {
  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-6">
        {caseStudies.map((caseStudy, index) => (
          <div key={index} className="w-96 shrink-0">
            <CaseStudyCard
              caseStudy={caseStudy}
              showMetrics={showMetrics}
              showIndustry={showIndustry}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

function FeaturedListLayout({ caseStudies, showMetrics, showIndustry }: LayoutProps) {
  if (caseStudies.length === 0) return null

  const [featured, ...rest] = caseStudies

  return (
    <div className="mx-auto max-w-6xl">
      {/* Featured Case Study */}
      <div className="mb-8 grid gap-8 lg:grid-cols-2">
        <div className="relative aspect-video overflow-hidden rounded-xl">
          {featured.featuredImage?.asset && (
            <Image
              src={urlFor(featured.featuredImage).width(800).height(500).url()}
              alt={featured.featuredImage.alt || featured.title}
              fill
              className="object-cover"
            />
          )}
        </div>
        <div className="flex flex-col justify-center">
          {showIndustry && featured.industry && (
            <span className="mb-2 text-sm font-medium uppercase tracking-wider text-primary-600">
              {featured.industry}
            </span>
          )}
          <h3 className="text-2xl font-bold text-gray-900">{featured.title}</h3>
          <p className="mt-2 text-gray-600">{featured.client}</p>
          {featured.excerpt && (
            <p className="mt-4 text-gray-700">{featured.excerpt}</p>
          )}
          {showMetrics && featured.metrics && featured.metrics.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-6">
              {featured.metrics.slice(0, 3).map((metric, index) => (
                <div key={index}>
                  <div className="text-2xl font-bold text-primary-600">{metric.value}</div>
                  <div className="text-sm text-gray-500">{metric.label}</div>
                </div>
              ))}
            </div>
          )}
          {featured.slug?.current && (
            <Link
              href={`/case-studies/${featured.slug.current}`}
              className="mt-6 inline-flex items-center gap-2 text-primary-600 hover:text-primary-700"
            >
              View Case Study
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>

      {/* Rest of Case Studies */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((caseStudy, index) => (
            <CaseStudyCard
              key={index}
              caseStudy={caseStudy}
              showMetrics={showMetrics}
              showIndustry={showIndustry}
              compact
            />
          ))}
        </div>
      )}
    </div>
  )
}

interface CaseStudyCardProps {
  caseStudy: CaseStudy
  showMetrics?: boolean
  showIndustry?: boolean
  compact?: boolean
}

function CaseStudyCard({ caseStudy, showMetrics, showIndustry, compact }: CaseStudyCardProps) {
  return (
    <div className="group overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        {caseStudy.featuredImage?.asset && (
          <Image
            src={urlFor(caseStudy.featuredImage).width(600).height(400).url()}
            alt={caseStudy.featuredImage.alt || caseStudy.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
        {showIndustry && caseStudy.industry && (
          <div className="absolute left-4 top-4">
            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-700">
              {caseStudy.industry}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900">{caseStudy.title}</h3>
        <p className="mt-1 text-sm text-gray-500">{caseStudy.client}</p>

        {!compact && caseStudy.excerpt && (
          <p className="mt-3 text-sm text-gray-600 line-clamp-2">{caseStudy.excerpt}</p>
        )}

        {/* Metrics */}
        {showMetrics && !compact && caseStudy.metrics && caseStudy.metrics.length > 0 && (
          <div className="mt-4 flex gap-4">
            {caseStudy.metrics.slice(0, 2).map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-lg font-bold text-primary-600">{metric.value}</div>
                <div className="text-xs text-gray-500">{metric.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Link */}
        {caseStudy.slug?.current && (
          <Link
            href={`/case-studies/${caseStudy.slug.current}`}
            className="mt-4 inline-flex items-center gap-1 text-sm text-primary-600 transition-colors hover:text-primary-700"
          >
            View Case Study
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  )
}
