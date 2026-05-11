'use client'

import { useState } from 'react'
import Image from 'next/image'
import { TestimonialsSection, Testimonial } from '@/types/sanity'
import { urlFor } from '@/sanity/lib/client'
import { cn } from '@/lib/utils'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

interface TestimonialsContentProps {
  section: TestimonialsSection
  testimonials?: Testimonial[]
}

export function TestimonialsContent({ section, testimonials = [] }: TestimonialsContentProps) {
  const bgColors = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    primary: 'bg-primary-600',
  }

  const isDark = section.backgroundColor === 'primary'

  // Filter testimonials based on display mode
  const displayTestimonials = section.displayMode === 'selected' && section.selectedTestimonials
    ? section.selectedTestimonials
    : section.displayMode === 'featured'
    ? testimonials.filter(t => t.featured)
    : testimonials

  return (
    <section className={cn('py-16 md:py-24', bgColors[section.backgroundColor || 'gray'])}>
      <div className="container mx-auto px-4">
        {/* Header */}
        {(section.heading || section.subheading) && (
          <div className="mx-auto mb-12 max-w-3xl text-center">
            {section.heading && (
              <h2 className={cn(
                'text-3xl font-bold md:text-4xl',
                isDark ? 'text-white' : 'text-gray-900'
              )}>
                {section.heading}
              </h2>
            )}
            {section.subheading && (
              <p className={cn(
                'mt-4 text-lg',
                isDark ? 'text-white/80' : 'text-gray-600'
              )}>
                {section.subheading}
              </p>
            )}
          </div>
        )}

        {/* Testimonials */}
        {section.layout === 'carousel' ? (
          <CarouselLayout
            testimonials={displayTestimonials}
            showRating={section.showRating}
            showCompanyLogo={section.showCompanyLogo}
            isDark={isDark}
          />
        ) : section.layout === 'single' ? (
          <SingleLayout
            testimonials={displayTestimonials}
            showRating={section.showRating}
            isDark={isDark}
          />
        ) : section.layout === 'masonry' ? (
          <MasonryLayout
            testimonials={displayTestimonials}
            showRating={section.showRating}
            showCompanyLogo={section.showCompanyLogo}
            isDark={isDark}
          />
        ) : (
          <GridLayout
            testimonials={displayTestimonials}
            showRating={section.showRating}
            showCompanyLogo={section.showCompanyLogo}
            isDark={isDark}
          />
        )}
      </div>
    </section>
  )
}

interface LayoutProps {
  testimonials: Testimonial[]
  showRating?: boolean
  showCompanyLogo?: boolean
  isDark: boolean
}

function CarouselLayout({ testimonials, showRating, showCompanyLogo, isDark }: LayoutProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => setCurrentIndex((i) => (i + 1) % testimonials.length)
  const prev = () => setCurrentIndex((i) => (i - 1 + testimonials.length) % testimonials.length)

  const current = testimonials[currentIndex]
  if (!current) return null

  return (
    <div className="mx-auto max-w-3xl">
      <div className="relative">
        <TestimonialCard
          testimonial={current}
          showRating={showRating}
          showCompanyLogo={showCompanyLogo}
          isDark={isDark}
          featured
        />

        {testimonials.length > 1 && (
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className={cn(
                'rounded-full p-2 transition-colors',
                isDark
                  ? 'bg-white/10 hover:bg-white/20 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              )}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    'h-2 w-2 rounded-full transition-colors',
                    index === currentIndex
                      ? isDark ? 'bg-white' : 'bg-primary-600'
                      : isDark ? 'bg-white/30' : 'bg-gray-300'
                  )}
                />
              ))}
            </div>
            <button
              onClick={next}
              className={cn(
                'rounded-full p-2 transition-colors',
                isDark
                  ? 'bg-white/10 hover:bg-white/20 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              )}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function GridLayout({ testimonials, showRating, showCompanyLogo, isDark }: LayoutProps) {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((testimonial, index) => (
        <TestimonialCard
          key={index}
          testimonial={testimonial}
          showRating={showRating}
          showCompanyLogo={showCompanyLogo}
          isDark={isDark}
        />
      ))}
    </div>
  )
}

function MasonryLayout({ testimonials, showRating, showCompanyLogo, isDark }: LayoutProps) {
  return (
    <div className="mx-auto max-w-6xl columns-1 gap-6 md:columns-2 lg:columns-3">
      {testimonials.map((testimonial, index) => (
        <div key={index} className="mb-6 break-inside-avoid">
          <TestimonialCard
            testimonial={testimonial}
            showRating={showRating}
            showCompanyLogo={showCompanyLogo}
            isDark={isDark}
          />
        </div>
      ))}
    </div>
  )
}

function SingleLayout({ testimonials, showRating, isDark }: LayoutProps) {
  const featured = testimonials[0]
  if (!featured) return null

  return (
    <div className="mx-auto max-w-3xl text-center">
      <Quote className={cn(
        'mx-auto mb-6 h-12 w-12',
        isDark ? 'text-white/30' : 'text-primary-200'
      )} />
      <blockquote className={cn(
        'text-2xl font-medium leading-relaxed md:text-3xl',
        isDark ? 'text-white' : 'text-gray-900'
      )}>
        "{featured.quote}"
      </blockquote>
      {showRating && featured.rating && (
        <div className="mt-6 flex justify-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                'h-5 w-5',
                i < featured.rating!
                  ? 'fill-yellow-400 text-yellow-400'
                  : isDark ? 'text-white/20' : 'text-gray-300'
              )}
            />
          ))}
        </div>
      )}
      <div className="mt-6 flex items-center justify-center gap-4">
        {featured.image?.asset && (
          <Image
            src={urlFor(featured.image).width(100).height(100).url()}
            alt={featured.author}
            width={50}
            height={50}
            className="rounded-full"
          />
        )}
        <div className="text-left">
          <div className={cn(
            'font-semibold',
            isDark ? 'text-white' : 'text-gray-900'
          )}>
            {featured.author}
          </div>
          <div className={cn(
            'text-sm',
            isDark ? 'text-white/70' : 'text-gray-600'
          )}>
            {featured.role && `${featured.role}, `}{featured.company}
          </div>
        </div>
      </div>
    </div>
  )
}

interface TestimonialCardProps {
  testimonial: Testimonial
  showRating?: boolean
  showCompanyLogo?: boolean
  isDark: boolean
  featured?: boolean
}

function TestimonialCard({
  testimonial,
  showRating,
  showCompanyLogo,
  isDark,
  featured,
}: TestimonialCardProps) {
  return (
    <div className={cn(
      'rounded-xl p-6',
      isDark ? 'bg-white/10' : 'bg-white shadow-md',
      featured && 'text-center'
    )}>
      {/* Rating */}
      {showRating && testimonial.rating && (
        <div className={cn('mb-4 flex gap-1', featured && 'justify-center')}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                'h-4 w-4',
                i < testimonial.rating!
                  ? 'fill-yellow-400 text-yellow-400'
                  : isDark ? 'text-white/20' : 'text-gray-300'
              )}
            />
          ))}
        </div>
      )}

      {/* Quote */}
      <blockquote className={cn(
        'text-lg',
        isDark ? 'text-white' : 'text-gray-700',
        featured && 'text-xl'
      )}>
        "{testimonial.quote}"
      </blockquote>

      {/* Author */}
      <div className={cn(
        'mt-4 flex items-center gap-3',
        featured && 'justify-center'
      )}>
        {testimonial.image?.asset && (
          <Image
            src={urlFor(testimonial.image).width(80).height(80).url()}
            alt={testimonial.author}
            width={40}
            height={40}
            className="rounded-full"
          />
        )}
        <div className={featured ? 'text-center' : ''}>
          <div className={cn(
            'font-semibold',
            isDark ? 'text-white' : 'text-gray-900'
          )}>
            {testimonial.author}
          </div>
          <div className={cn(
            'text-sm',
            isDark ? 'text-white/70' : 'text-gray-600'
          )}>
            {testimonial.role && `${testimonial.role}, `}{testimonial.company}
          </div>
        </div>
      </div>

      {/* Company Logo */}
      {showCompanyLogo && testimonial.companyLogo?.asset && (
        <div className={cn('mt-4', featured && 'flex justify-center')}>
          <Image
            src={urlFor(testimonial.companyLogo).width(120).height(40).url()}
            alt={testimonial.company || 'Company'}
            width={80}
            height={27}
            className="h-auto w-auto opacity-50"
          />
        </div>
      )}
    </div>
  )
}
