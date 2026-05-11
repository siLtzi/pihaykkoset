'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ServicesSection, Service } from '@/types/sanity'
import { urlFor } from '@/sanity/lib/client'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
import * as LucideIcons from 'lucide-react'

interface ServicesContentProps {
  section: ServicesSection
  services?: Service[]
}

export function ServicesContent({ section, services = [] }: ServicesContentProps) {
  const bgColors = {
    white: 'bg-white',
    gray: 'bg-gray-50',
  }

  // Filter services based on display mode
  const displayServices = section.displayMode === 'selected' && section.selectedServices
    ? section.selectedServices
    : section.displayMode === 'featured'
    ? services.filter(s => s.featured)
    : services

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

        {/* Services */}
        {section.layout === 'list' ? (
          <ListLayout
            services={displayServices}
            showDescription={section.showDescription}
            showLearnMore={section.showLearnMore}
          />
        ) : section.layout === 'cards' ? (
          <CardsLayout
            services={displayServices}
            columns={section.columns}
            showDescription={section.showDescription}
            showLearnMore={section.showLearnMore}
          />
        ) : (
          <GridLayout
            services={displayServices}
            columns={section.columns}
            showDescription={section.showDescription}
            showLearnMore={section.showLearnMore}
          />
        )}
      </div>
    </section>
  )
}

interface LayoutProps {
  services: Service[]
  columns?: number
  showDescription?: boolean
  showLearnMore?: boolean
}

function GridLayout({ services, columns = 3, showDescription, showLearnMore }: LayoutProps) {
  return (
    <div className={cn(
      'mx-auto grid max-w-6xl gap-8',
      columns === 2 && 'grid-cols-1 sm:grid-cols-2',
      columns === 3 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      columns === 4 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    )}>
      {services.map((service, index) => (
        <div key={index} className="group text-center">
          {/* Icon or Image */}
          <div className="mb-4">
            {service.image?.asset ? (
              <div className="mx-auto h-24 w-24 overflow-hidden rounded-lg">
                <Image
                  src={urlFor(service.image).width(200).height(200).url()}
                  alt={service.image.alt || service.title}
                  width={96}
                  height={96}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
                <ServiceIcon icon={service.icon} size={32} />
              </div>
            )}
          </div>

          <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
          
          {showDescription && service.shortDescription && (
            <p className="mt-2 text-gray-600">{service.shortDescription}</p>
          )}

          {showLearnMore && service.slug?.current && (
            <Link
              href={`/services/${service.slug.current}`}
              className="mt-4 inline-flex items-center gap-1 text-primary-600 transition-colors hover:text-primary-700"
            >
              Learn more
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      ))}
    </div>
  )
}

function CardsLayout({ services, columns = 3, showDescription, showLearnMore }: LayoutProps) {
  return (
    <div className={cn(
      'mx-auto grid max-w-6xl gap-6',
      columns === 2 && 'grid-cols-1 sm:grid-cols-2',
      columns === 3 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      columns === 4 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    )}>
      {services.map((service, index) => (
        <div
          key={index}
          className="group rounded-xl bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
        >
          {/* Icon */}
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
            <ServiceIcon icon={service.icon} size={24} />
          </div>

          <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
          
          {showDescription && service.shortDescription && (
            <p className="mt-2 text-sm text-gray-600">{service.shortDescription}</p>
          )}

          {showLearnMore && service.slug?.current && (
            <Link
              href={`/services/${service.slug.current}`}
              className="mt-4 inline-flex items-center gap-1 text-sm text-primary-600 transition-colors hover:text-primary-700"
            >
              Learn more
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      ))}
    </div>
  )
}

function ListLayout({ services, showDescription, showLearnMore }: LayoutProps) {
  return (
    <div className="mx-auto max-w-4xl divide-y divide-gray-200">
      {services.map((service, index) => (
        <div key={index} className="flex gap-6 py-6">
          {/* Icon */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
            <ServiceIcon icon={service.icon} size={24} />
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
            
            {showDescription && service.shortDescription && (
              <p className="mt-1 text-gray-600">{service.shortDescription}</p>
            )}
          </div>

          {showLearnMore && service.slug?.current && (
            <Link
              href={`/services/${service.slug.current}`}
              className="flex items-center gap-1 self-center text-primary-600 transition-colors hover:text-primary-700"
            >
              Learn more
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      ))}
    </div>
  )
}

function ServiceIcon({ icon, size = 24 }: { icon?: string; size?: number }) {
  if (!icon) return <LucideIcons.Wrench size={size} />
  
  const iconName = icon.charAt(0).toUpperCase() + icon.slice(1).replace(/-([a-z])/g, (g) => g[1].toUpperCase())
  const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number }>>)[iconName]
  
  if (!Icon) return <LucideIcons.Wrench size={size} />
  
  return <Icon size={size} />
}
