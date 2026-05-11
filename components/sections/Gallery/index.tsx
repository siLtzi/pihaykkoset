'use client'

import { GalleryContent } from './Content'
import { GallerySection } from '@/types/sanity'

interface GalleryProps {
  section: GallerySection
}

export default function Gallery({ section }: GalleryProps) {
  return <GalleryContent section={section} />
}
