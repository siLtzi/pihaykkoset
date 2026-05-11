'use client'

import { ComparisonContent } from './Content'
import { ComparisonSection } from '@/types/sanity'

interface ComparisonProps {
  section: ComparisonSection
}

export default function Comparison({ section }: ComparisonProps) {
  return <ComparisonContent section={section} />
}
