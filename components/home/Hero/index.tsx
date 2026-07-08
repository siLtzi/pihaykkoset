import Image from 'next/image'
import { HeroHeadline } from './HeroHeadline'
import { urlFor } from '@/sanity/lib/client'
import type { HomePage } from '@/types/sanity'

interface HeroProps {
  data: HomePage | null
}

export function Hero({ data }: HeroProps) {
  if (!data) return null
  const headline = data.heroHeadlineLines ?? []
  const bg = data.heroBackgroundImage?.asset
    ? urlFor(data.heroBackgroundImage).width(2400).quality(80).url()
    : null
  const meta = data.heroMeta ?? []

  return (
    <section className="hero" id="hero">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-bg-img">
          {bg && (
            <Image
              src={bg}
              alt=""
              fill
              priority
              fetchPriority="high"
              quality={80}
              sizes="100vw"
            />
          )}
        </div>
        <div className="hero-bg-overlay" />
      </div>
      <div className="hero-content">
        <HeroHeadline lines={headline} />
        <div className="hero-bottom">
          {data.heroLede && <p className="hero-lede">{data.heroLede}</p>}
          <div className="hero-actions">
            {data.heroPrimaryCtaText && (
              <a
                href={`#${(data.heroPrimaryCtaAnchor ?? 'yhteys').replace(/^#/, '')}`}
                className="btn-primary"
              >
                <span>{data.heroPrimaryCtaText}</span>
                <span className="arrow" aria-hidden="true">→</span>
              </a>
            )}
            {data.heroSecondaryCtaText && (
              <a
                href={`#${(data.heroSecondaryCtaAnchor ?? 'tyot').replace(/^#/, '')}`}
                className="btn-ghost"
              >
                {data.heroSecondaryCtaText}
              </a>
            )}
          </div>
        </div>
        {meta.length > 0 && (
          <div className="hero-meta">
            {meta.map((m, i) => (
              <div className="item" key={`${m.label}-${i}`}>
                <div className="label mono">{m.label}</div>
                <div className="value">{m.value}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
