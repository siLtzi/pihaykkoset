'use client'

import Image from 'next/image'
import { LogosSection, LogoItem as LogoItemType } from '@/types/sanity'
import { urlFor } from '@/sanity/lib/client'
import { cn } from '@/lib/utils'

interface LogosContentProps {
  section: LogosSection
}

export function LogosContent({ section }: LogosContentProps) {
  const bgColors: Record<string, string> = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    primary: 'bg-primary-600',
  }

  return (
    <section className={cn('py-12 md:py-16', bgColors[section.backgroundColor || 'white'])}>
      <div className="container mx-auto px-4">
        {section.heading && (
          <p className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-gray-500">
            {section.heading}
          </p>
        )}

        {section.style === 'marquee' ? (
          // Scrolling marquee style
          <div className="relative overflow-hidden">
            <div className="animate-marquee flex gap-12">
              {/* Duplicate logos for seamless scrolling */}
              {[...section.logos || [], ...section.logos || []].map((logo, index) => (
                <LogoItemComponent
                  key={index}
                  logo={logo}
                  grayscale={section.grayscale}
                />
              ))}
            </div>
          </div>
        ) : section.style === 'grid' ? (
          // Grid style
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
            {section.logos?.map((logo, index) => (
              <LogoItemComponent
                key={index}
                logo={logo}
                grayscale={section.grayscale}
              />
            ))}
          </div>
        ) : (
          // Single row (default)
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {section.logos?.map((logo, index) => (
              <LogoItemComponent
                key={index}
                logo={logo}
                grayscale={section.grayscale}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

interface LogoItemComponentProps {
  logo: LogoItemType
  grayscale?: boolean
}

function LogoItemComponent({ logo, grayscale }: LogoItemComponentProps) {
  const imageUrl = urlFor(logo.image).width(200).height(80).url()

  const LogoImage = (
    <div className={cn(
      'flex h-12 w-32 items-center justify-center transition-all duration-300',
      grayscale && 'grayscale hover:grayscale-0'
    )}>
      <Image
        src={imageUrl}
        alt={logo.name || 'Partner logo'}
        width={128}
        height={48}
        className="h-auto max-h-12 w-auto max-w-[128px] object-contain"
      />
    </div>
  )

  if (logo.url) {
    return (
      <a
        href={logo.url}
        target="_blank"
        rel="noopener noreferrer"
        className="opacity-60 transition-opacity hover:opacity-100"
      >
        {LogoImage}
      </a>
    )
  }

  return <div className="opacity-60 transition-opacity hover:opacity-100">{LogoImage}</div>
}
