import { ContactParallax } from './ContactParallax'
import type { ContactInfo, HomePage } from '@/types/sanity'

interface ContactProps {
  data: HomePage | null
  contactInfo?: ContactInfo
}

export function Contact({ data, contactInfo }: ContactProps) {
  if (!data) return null
  const phone = contactInfo?.phone
  const email = contactInfo?.email
  const address = contactInfo?.address

  return (
    <section className="contact" id="yhteys">
      <ContactParallax />
      {data.contactBackgroundText && (
        <div className="contact-bg-text" id="contactBgText" aria-hidden="true">
          {data.contactBackgroundText}
        </div>
      )}
      <div className="contact-inner">
        <div className="contact-grid">
          <div>
            <h3>
              {data.contactHeadingStart}{' '}
              {data.contactHeadingAccent && (
                <span className="orange">{data.contactHeadingAccent}</span>
              )}{' '}
              {data.contactHeadingEnd}
            </h3>
            {data.contactLead && <p className="lead">{data.contactLead}</p>}
          </div>
          <div className="contact-card">
            {phone && (
              <div className="row">
                <div className="lbl">Puhelin</div>
                <a href={`tel:${phone.replace(/\s+/g, '')}`}>{phone}</a>
              </div>
            )}
            {email && (
              <div className="row">
                <div className="lbl">Sähköposti</div>
                <a href={`mailto:${email}`}>{email}</a>
              </div>
            )}
            {address && (
              <div className="row">
                <div className="lbl">Toimisto</div>
                <div className="val">{address}</div>
              </div>
            )}
            {data.contactCtaText && (
              <a href="#yhteys" className="big-cta">
                <span>{data.contactCtaText} →</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
