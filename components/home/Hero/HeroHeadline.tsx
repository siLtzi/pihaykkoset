import type { HomeHeadlineLine } from '@/types/sanity'

interface HeroHeadlineProps {
  lines: HomeHeadlineLine[]
}

interface CharSpec {
  ch: string
  isSpace: boolean
  accent: boolean
  delay: number
}

/** Char-by-char rise animation for the hero headline (CSS-driven, server-rendered). */
export function HeroHeadline({ lines }: HeroHeadlineProps) {
  let i = 0
  const computed = lines.map((line) => {
    const text = line.text ?? ''
    const chars: CharSpec[] = []
    for (const ch of Array.from(text)) {
      const isSpace = ch === ' '
      const delay = i * 14
      chars.push({ ch, isSpace, accent: !!line.accent, delay })
      i += 1
    }
    return chars
  })

  return (
    <h1 className="hero-headline display">
      {computed.map((chars, lineIdx) => (
        <span className="line" key={lineIdx}>
          {chars.map((c, idx) => (
            <span
              key={`${lineIdx}-${idx}`}
              className={`char${c.isSpace ? ' space' : ''}${c.accent ? ' accent-word' : ''}`}
              style={{ animationDelay: `${c.delay}ms` }}
              aria-hidden={c.isSpace ? true : undefined}
            >
              {c.isSpace ? '\u00A0' : c.ch}
            </span>
          ))}
        </span>
      ))}
    </h1>
  )
}
