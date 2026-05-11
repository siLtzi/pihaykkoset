'use client'

import { LogosContent } from './Content'
import { LogosSection } from '@/types/sanity'

interface LogosProps {
  section: LogosSection
}

export default function Logos({ section }: LogosProps) {
  return <LogosContent section={section} />
}
