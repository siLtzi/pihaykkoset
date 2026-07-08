import Link from 'next/link'
import { HeaderShrink } from './HeaderShrink'
import { MobileMenu } from './MobileMenu'
import type { ContactInfo, HomePage } from '@/types/sanity'

interface HeaderProps {
  home: HomePage | null
  contactInfo?: ContactInfo
}

export function Header({ home, contactInfo }: HeaderProps) {
  const brandPrefix = home?.brandPrefix ?? 'PIHA'
  const brandSuffix = home?.brandSuffix ?? 'YKKÖSET'
  const tagline = home?.brandTagline
  const phone = contactInfo?.phone
  const navItems = home?.navItems ?? []

  return (
    <>
      <HeaderShrink />
      <header className="site-header" id="siteHeader">
        <Link href="/" className="brand" aria-label="Pihaykköset Oy etusivu">
          <div className="mark">
            {brandPrefix}
            <span>{brandSuffix}</span>
          </div>
          {tagline && <div className="est">{tagline}</div>}
        </Link>
        <nav className="primary" aria-label="Päänavigaatio">
          {navItems.map((item) => (
            <a key={item.anchor} href={`#${item.anchor.replace(/^#/, '')}`}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="header-cta">
          {phone && (
            <a href={`tel:${phone.replace(/\s+/g, '')}`} className="phone-link">
              {phone}
            </a>
          )}
        </div>
        <MobileMenu items={navItems} phone={phone} />
      </header>
    </>
  )
}
