import { WorkTile } from './WorkTile'
import { urlFor } from '@/sanity/lib/client'
import type { HomePage } from '@/types/sanity'

interface WorkProps {
  data: HomePage | null
}

export function Work({ data }: WorkProps) {
  if (!data) return null
  const tiles = (data.workTiles ?? []).slice(0, 6)

  return (
    <section className="work" id="tyot">
      <div className="work-head">
        <h3 className="display">
          {data.workHeadingStart}{' '}
          {data.workHeadingAccent && <span className="orange">{data.workHeadingAccent}</span>}{' '}
          {data.workHeadingEnd}
        </h3>
        {data.workDescription && <p className="desc">{data.workDescription}</p>}
      </div>
      <div className="work-mosaic">
        {tiles.map((tile, i) => {
          const src = tile.image?.asset ? urlFor(tile.image).width(1400).quality(75).url() : null
          return (
            <WorkTile
              key={`${tile.location}-${i}`}
              src={src}
              location={tile.location}
              category={tile.category}
              index={i}
              className={`tile-${i + 1}`}
            />
          )
        })}
      </div>
    </section>
  )
}
