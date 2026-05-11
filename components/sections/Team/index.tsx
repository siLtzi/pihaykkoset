'use client'

import { TeamContent } from './Content'
import { TeamSection } from '@/types/sanity'

interface TeamProps {
  section: TeamSection
}

export default function Team({ section }: TeamProps) {
  return <TeamContent section={section} />
}
