'use client'

import { ProcessContent } from './Content'
import { ProcessSection } from '@/types/sanity'

interface ProcessProps {
  section: ProcessSection
}

export default function Process({ section }: ProcessProps) {
  return <ProcessContent section={section} />
}
