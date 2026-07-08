import Image from 'next/image'
import { urlFor } from '@/sanity/lib/client'
import type { HomePage } from '@/types/sanity'

interface ServicesProps {
  data: HomePage | null
}

export function Services({ data }: ServicesProps) {
  if (!data) return null
  const items = data.serviceItems ?? []

  return (
    <section className="services" id="palvelut">
      <div className="section-head">
        {data.servicesHeading && <h3 className="display">{data.servicesHeading}</h3>}
        {data.servicesCount && <div className="count">{data.servicesCount}</div>}
      </div>
      <div className="services-list">
        {items.map((item, i) => {
          const bg = item.image?.asset ? urlFor(item.image).width(1200).quality(75).url() : null
          const num = String(i + 1).padStart(2, '0')
          const href = item.anchor ? `#${item.anchor.replace(/^#/, '')}` : '#yhteys'
          return (
            <a key={item.title} href={href} className="service-row">
              <div className="bg-image" aria-hidden="true">
                {bg && (
                  <Image src={bg} alt="" fill loading="lazy" quality={75} sizes="100vw" />
                )}
              </div>
              <div className="service-num">/ {num}</div>
              <div className="service-title">{item.title}</div>
              <div className="service-desc">{item.description}</div>
              <div className="service-tags">
                {item.tags?.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <div className="service-arrow display">→</div>
            </a>
          )
        })}
      </div>
    </section>
  )
}
