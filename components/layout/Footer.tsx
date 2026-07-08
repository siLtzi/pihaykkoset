import { FooterParallax } from './FooterParallax'
import type { ContactInfo, HomePage } from '@/types/sanity'

interface FooterProps {
  home: HomePage | null
  contactInfo?: ContactInfo
}

export function Footer({ home, contactInfo }: FooterProps) {
  const brandPrefix = home?.brandPrefix ?? 'PIHA'
  const brandSuffix = home?.brandSuffix ?? 'YKKÖSET'
  const tagline = home?.footerTagline
  const columns = home?.footerColumns ?? []
  const logotype = home?.footerLogotype ?? 'PIHAYKKÖSET — PIHAYKKÖSET — PIHAYKKÖSET —'
  const copyright = (home?.footerCopyright ?? '© {year} Pihaykköset Oy').replace(
    '{year}',
    String(new Date().getFullYear())
  )
  const attribution = home?.footerAttribution
  const socials = home?.footerSocials ?? []

  return (
    <footer className="site-footer">
      <FooterParallax />
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="mark">
            {brandPrefix}
            <span>{brandSuffix}</span>
          </div>
          {tagline && <p>{tagline}</p>}
        </div>
        {columns.map((col) => (
          <div key={col.heading} className="footer-col">
            <h5>{col.heading}</h5>
            {col.links?.map((link) => (
              <a key={`${link.label}-${link.href}`} href={link.href || '#'}>
                {link.label}
              </a>
            ))}
            {col.heading.toLowerCase().includes('yhteys') && contactInfo?.address && (
              <div className="addr">{contactInfo.address}</div>
            )}
          </div>
        ))}
      </div>
      <div className="footer-logotype">
        <div className="text" id="footerLogo">
          {logotype}
        </div>
      </div>
      <div className="footer-bottom">
        <div>{copyright}</div>
        {socials.length > 0 && (
          <div className="socials">
            {socials.map((s) => (
              <a key={s.label} href={s.url || '#'} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            ))}
          </div>
        )}
        {attribution && <div>{attribution}</div>}
      </div>
    </footer>
  )
}
