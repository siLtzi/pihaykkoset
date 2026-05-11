import dynamic from 'next/dynamic'
import { Section, ContactInfo } from '@/types/sanity'

// ============================================================================
// DYNAMIC IMPORTS
// Using dynamic imports for better code splitting and performance
// ============================================================================
const Hero = dynamic(() => import('./Hero'))
const Text = dynamic(() => import('./Text'))
const Features = dynamic(() => import('./Features'))
const CTA = dynamic(() => import('./CTA'))
const Contact = dynamic(() => import('./Contact'))
const FAQ = dynamic(() => import('./FAQ'))

// Business tier sections
const Pricing = dynamic(() => import('./Pricing'))
const Logos = dynamic(() => import('./Logos'))
const Stats = dynamic(() => import('./Stats'))
const Process = dynamic(() => import('./Process'))
const Team = dynamic(() => import('./Team'))
const Testimonials = dynamic(() => import('./Testimonials'))
const Comparison = dynamic(() => import('./Comparison'))
const Gallery = dynamic(() => import('./Gallery'))
const Services = dynamic(() => import('./Services'))
const CaseStudies = dynamic(() => import('./CaseStudies'))

// ============================================================================
// TYPES
// ============================================================================
interface SectionRendererProps {
  sections?: Section[]
  contactInfo?: ContactInfo
}

// ============================================================================
// COMPONENT
// ============================================================================
export function SectionRenderer({ sections, contactInfo }: SectionRendererProps) {
  if (!sections || sections.length === 0) {
    return null
  }

  return (
    <>
      {sections.map((section) => {
        switch (section._type) {
          case 'heroSection':
            return <Hero key={section._key} section={section} />
          case 'textSection':
            return <Text key={section._key} section={section} />
          case 'featuresSection':
            return <Features key={section._key} section={section} />
          case 'ctaSection':
            return <CTA key={section._key} section={section} />
          case 'contactSection':
            return <Contact key={section._key} section={section} contactInfo={contactInfo} />
          case 'faqSection':
            return <FAQ key={section._key} section={section} />
          // Business tier sections
          case 'pricingSection':
            return <Pricing key={section._key} section={section} />
          case 'logosSection':
            return <Logos key={section._key} section={section} />
          case 'statsSection':
            return <Stats key={section._key} section={section} />
          case 'processSection':
            return <Process key={section._key} section={section} />
          case 'teamSection':
            return <Team key={section._key} section={section} />
          case 'testimonialsSection':
            return <Testimonials key={section._key} section={section} />
          case 'comparisonSection':
            return <Comparison key={section._key} section={section} />
          case 'gallerySection':
            return <Gallery key={section._key} section={section} />
          case 'servicesSection':
            return <Services key={section._key} section={section} />
          case 'caseStudiesSection':
            return <CaseStudies key={section._key} section={section} />
          default:
            console.warn(`Unknown section type: ${(section as Section)._type}`)
            return null
        }
      })}
    </>
  )
}
