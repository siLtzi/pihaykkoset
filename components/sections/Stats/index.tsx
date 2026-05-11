'use client'

import { StatsContent } from './Content'
import { StatsSection } from '@/types/sanity'

interface StatsProps {
  section: StatsSection
}

export default function Stats({ section }: StatsProps) {
  return <StatsContent section={section} />
}
