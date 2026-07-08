import { Counter } from '../Counter'
import type { HomePage } from '@/types/sanity'

interface StatsProps {
  data: HomePage | null
}

export function Stats({ data }: StatsProps) {
  const items = data?.statItems ?? []
  if (items.length === 0) return null
  return (
    <section className="stats">
      <div className="stats-grid">
        {items.map((s, i) => {
          const numeric = Number(s.value)
          const animate = !!s.animate && Number.isFinite(numeric)
          return (
            <div className="stat" key={i}>
              <div className="num display">
                {animate ? <Counter to={numeric} /> : <span>{s.value}</span>}
                {s.suffix && <span className="orange">{s.suffix}</span>}
              </div>
              <div className="label">{s.label}</div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
