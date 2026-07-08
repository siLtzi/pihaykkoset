import { Reveal } from '../Reveal'
import type { HomePage } from '@/types/sanity'

interface ProcessProps {
  data: HomePage | null
}

export function Process({ data }: ProcessProps) {
  if (!data) return null
  const steps = data.processSteps ?? []
  return (
    <section className="process" id="prosessi">
      <div className="process-grid">
        <div className="process-head">
          <h3>
            {data.processHeadingStart}{' '}
            {data.processHeadingMuted && <span className="muted">{data.processHeadingMuted}</span>}
          </h3>
          {data.processLead && <p>{data.processLead}</p>}
        </div>
        <div className="process-steps">
          {steps.map((step, i) => (
            <Reveal as="div" className="step" key={`${step.title}-${i}`}>
              <div className="step-num">/ {String(i + 1).padStart(2, '0')}</div>
              <div>
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
