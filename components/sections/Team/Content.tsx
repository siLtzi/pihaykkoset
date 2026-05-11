'use client'

import Image from 'next/image'
import { TeamSection, TeamMember } from '@/types/sanity'
import { urlFor } from '@/sanity/lib/client'
import { cn } from '@/lib/utils'
import { SocialIcon } from '@/components/ui/SocialIcon'

interface TeamContentProps {
  section: TeamSection
  members?: TeamMember[]
}

export function TeamContent({ section, members = [] }: TeamContentProps) {
  const bgColors = {
    white: 'bg-white',
    gray: 'bg-gray-50',
  }

  // Filter members based on display mode
  const displayMembers = section.displayMode === 'selected' && section.selectedMembers
    ? section.selectedMembers
    : section.displayMode === 'featured'
    ? members.filter(m => m.featured)
    : members

  return (
    <section className={cn('py-16 md:py-24', bgColors[section.backgroundColor || 'white'])}>
      <div className="container mx-auto px-4">
        {/* Header */}
        {(section.heading || section.subheading) && (
          <div className="mx-auto mb-12 max-w-3xl text-center">
            {section.heading && (
              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                {section.heading}
              </h2>
            )}
            {section.subheading && (
              <p className="mt-4 text-lg text-gray-600">{section.subheading}</p>
            )}
          </div>
        )}

        {/* Team Grid */}
        <div className={cn(
          'mx-auto grid max-w-6xl gap-8',
          section.columns === 2 && 'grid-cols-1 sm:grid-cols-2',
          section.columns === 3 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
          section.columns === 4 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
        )}>
          {displayMembers?.map((member: TeamMember, index: number) => (
            <TeamCard
              key={index}
              member={member}
              showBio={section.showBio}
              showSocials={section.showSocials}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

interface TeamCardProps {
  member: TeamMember
  showBio?: boolean
  showSocials?: boolean
}

function TeamCard({ member, showBio, showSocials }: TeamCardProps) {
  return (
    <div className="group text-center">
      {/* Image */}
      <div className="relative mx-auto mb-4 h-48 w-48 overflow-hidden rounded-full">
        {member.image?.asset ? (
          <Image
            src={urlFor(member.image).width(400).height(400).url()}
            alt={member.image.alt || member.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-200 text-4xl font-bold text-gray-400">
            {member.name.charAt(0)}
          </div>
        )}
      </div>

      {/* Name & Role */}
      <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
      <p className="text-primary-600">{member.role}</p>

      {/* Short Bio */}
      {showBio && member.shortBio && (
        <p className="mt-3 text-sm text-gray-600">{member.shortBio}</p>
      )}

      {/* Social Links */}
      {showSocials && member.socialLinks && member.socialLinks.length > 0 && (
        <div className="mt-4 flex justify-center gap-3">
          {member.socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors hover:text-primary-600"
            >
              <SocialIcon platform={social.platform} className="h-5 w-5" />
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
