import { Counter } from '../Counter'
import { Reveal } from '../Reveal'
import type { HomePage } from '@/types/sanity'

interface IntroProps {
  data: HomePage | null
}

export function Intro({ data }: IntroProps) {
  if (!data) return null
  const num = data.introNumber
  const numericValue = typeof num === 'number' ? num : Number(num)
  const isNumeric = Number.isFinite(numericValue)

  return (
    <section className="intro" id="tietoa">
      <div className="intro-grid">
        <div className="intro-label">
          <div className="num">
            {isNumeric ? <Counter to={numericValue} className="counter" /> : num}
            {data.introNumberSuffix}
          </div>
          {data.introTag && <div className="tag">{data.introTag}</div>}
        </div>
        <div className="intro-body">
          <Reveal as="h2">
            {data.introHeadingStart}{' '}
            {data.introHeadingMuted && <span className="muted">{data.introHeadingMuted}</span>}{' '}
            {data.introHeadingEnd}
          </Reveal>
          {data.introLead && (
            <Reveal as="p" className="lead">
              {data.introLead}
            </Reveal>
          )}
          {data.introParagraphs?.map((p, i) => (
            <Reveal as="p" key={i} delay={120 + i * 80}>
              {p}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
