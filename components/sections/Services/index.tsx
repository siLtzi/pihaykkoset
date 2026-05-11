'use client'

import { ServicesContent } from './Content'
import { ServicesSection } from '@/types/sanity'

interface ServicesProps {
  section: ServicesSection
}

export default function Services({ section }: ServicesProps) {
  return <ServicesContent section={section} />
}
