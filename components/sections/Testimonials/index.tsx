'use client'

import { TestimonialsContent } from './Content'
import { TestimonialsSection } from '@/types/sanity'

interface TestimonialsProps {
  section: TestimonialsSection
}

export default function Testimonials({ section }: TestimonialsProps) {
  return <TestimonialsContent section={section} />
}
