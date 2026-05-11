'use client'

import { CaseStudiesContent } from './Content'
import { CaseStudiesSection } from '@/types/sanity'

interface CaseStudiesProps {
  section: CaseStudiesSection
}

export default function CaseStudies({ section }: CaseStudiesProps) {
  return <CaseStudiesContent section={section} />
}
