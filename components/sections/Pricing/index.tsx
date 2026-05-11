'use client'

import { PricingContent } from './Content'
import { PricingSection } from '@/types/sanity'

interface PricingProps {
  section: PricingSection
}

export default function Pricing({ section }: PricingProps) {
  return <PricingContent section={section} />
}
