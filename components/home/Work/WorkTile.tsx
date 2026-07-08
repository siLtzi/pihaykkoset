'use client'

import Image from 'next/image'
import { useRef } from 'react'

interface WorkTileProps {
  src: string | null
  location?: string
  category?: string
  index: number
  className: string
}

export function WorkTile({ src, location, category, index, className }: WorkTileProps) {
  const innerRef = useRef<HTMLDivElement | null>(null)

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const inner = innerRef.current
    if (!inner) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    inner.style.transform = `translate3d(${x * -10}px, ${y * -10}px, 0) scale(1.04)`
  }
  const onLeave = () => {
    const inner = innerRef.current
    if (!inner) return
    inner.style.transform = ''
  }

  return (
    <div
      className={`tile ${className}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onLeave}
    >
      <div className="idx">{String(index + 1).padStart(2, '0')}</div>
      <div className="tile-inner" ref={innerRef}>
        {src && (
          <Image
            src={src}
            alt={[location, category].filter(Boolean).join(' – ')}
            fill
            loading="lazy"
            sizes="(max-width: 980px) 100vw, 50vw"
          />
        )}
      </div>
      <div className="meta">
        <div className="where">{location}</div>
        <div className="what">{category}</div>
      </div>
    </div>
  )
}
