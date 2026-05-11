'use client'

import { useState } from 'react'
import Image from 'next/image'
import { GallerySection } from '@/types/sanity'
import { urlFor } from '@/sanity/lib/client'
import { cn } from '@/lib/utils'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface GalleryContentProps {
  section: GallerySection
}

export function GalleryContent({ section }: GalleryContentProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [activeFilter, setActiveFilter] = useState<string>('all')

  const bgColors = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    dark: 'bg-gray-900',
  }

  const isDark = section.backgroundColor === 'dark'

  // Get unique categories for filtering
  const categories = ['all', ...new Set(
    section.images
      ?.map(img => img.category)
      .filter((cat): cat is string => !!cat)
  )]

  // Filter images by category
  const filteredImages = activeFilter === 'all'
    ? section.images
    : section.images?.filter(img => img.category === activeFilter)

  const openLightbox = (index: number) => {
    if (section.enableLightbox) {
      setLightboxIndex(index)
    }
  }

  const closeLightbox = () => setLightboxIndex(null)

  const nextImage = () => {
    if (lightboxIndex !== null && filteredImages) {
      setLightboxIndex((lightboxIndex + 1) % filteredImages.length)
    }
  }

  const prevImage = () => {
    if (lightboxIndex !== null && filteredImages) {
      setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length)
    }
  }

  return (
    <section className={cn('py-16 md:py-24', bgColors[section.backgroundColor || 'white'])}>
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
                isDark ? 'text-gray-400' : 'text-gray-600'
              )}>
                {section.subheading}
              </p>
            )}
          </div>
        )}

        {/* Filter Buttons */}
        {section.enableFiltering && categories.length > 1 && (
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  activeFilter === category
                    ? 'bg-primary-600 text-white'
                    : isDark
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                )}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        )}

        {/* Gallery Grid */}
        <div className={cn(
          'mx-auto max-w-6xl',
          section.layout === 'masonry'
            ? 'columns-1 gap-4 sm:columns-2 lg:columns-3'
            : section.layout === 'carousel'
            ? 'overflow-x-auto'
            : cn(
                'grid gap-4',
                section.columns === 2 && 'grid-cols-1 sm:grid-cols-2',
                section.columns === 3 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
                section.columns === 4 && 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
              )
        )}>
          {section.layout === 'carousel' ? (
            <div className="flex gap-4 pb-4">
              {filteredImages?.map((image, index) => (
                <GalleryImage
                  key={index}
                  image={image}
                  onClick={() => openLightbox(index)}
                  className="w-80 shrink-0"
                />
              ))}
            </div>
          ) : section.layout === 'masonry' ? (
            filteredImages?.map((image, index) => (
              <div key={index} className="mb-4 break-inside-avoid">
                <GalleryImage
                  image={image}
                  onClick={() => openLightbox(index)}
                />
              </div>
            ))
          ) : (
            filteredImages?.map((image, index) => (
              <GalleryImage
                key={index}
                image={image}
                onClick={() => openLightbox(index)}
              />
            ))
          )}
        </div>
      </div>

      {/* Lightbox */}
      {section.enableLightbox && lightboxIndex !== null && filteredImages && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          <div className="max-h-[90vh] max-w-[90vw]">
            <Image
              src={urlFor(filteredImages[lightboxIndex].image).width(1920).height(1080).url()}
              alt={filteredImages[lightboxIndex].alt || ''}
              width={1920}
              height={1080}
              className="h-auto max-h-[90vh] w-auto max-w-[90vw] object-contain"
            />
            {filteredImages[lightboxIndex].caption && (
              <p className="mt-4 text-center text-white">
                {filteredImages[lightboxIndex].caption}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

interface GalleryImageProps {
  image: {
    image: { asset: { _ref: string } }
    alt?: string
    caption?: string
  }
  onClick?: () => void
  className?: string
}

function GalleryImage({ image, onClick, className }: GalleryImageProps) {
  return (
    <div
      className={cn(
        'group relative cursor-pointer overflow-hidden rounded-lg',
        className
      )}
      onClick={onClick}
    >
      <Image
        src={urlFor(image.image).width(600).height(400).url()}
        alt={image.alt || ''}
        width={600}
        height={400}
        className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      {image.caption && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
          <p className="text-sm text-white">{image.caption}</p>
        </div>
      )}
    </div>
  )
}
