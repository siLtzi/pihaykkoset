import type { HomePage } from '@/types/sanity'

interface MarqueeProps {
  data: HomePage | null
}

export function Marquee({ data }: MarqueeProps) {
  const items = data?.marqueeItems ?? []
  if (items.length === 0) return null
  // Duplicate for seamless loop
  const loop = [...items, ...items]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {loop.map((item, i) => (
          <span className="item" key={i}>
            {item}
            <span className="dot"> · </span>
          </span>
        ))}
      </div>
    </div>
  )
}
