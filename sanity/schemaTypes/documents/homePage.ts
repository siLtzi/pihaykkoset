import { defineType, defineField, defineArrayMember } from 'sanity'
import { Home } from 'lucide-react'

/**
 * Etusivu — Pihaykköset Oy
 *
 * Kaikki etusivun sisältö yhdessä paikassa, jaoteltuna selkeisiin välilehtiin.
 * Yhteystiedot (puhelin, sähköposti, osoite) tulevat Yritystiedoista (siteSettings).
 */
export const homePage = defineType({
  name: 'homePage',
  title: 'Etusivu',
  type: 'document',
  icon: Home,

  groups: [
    { name: 'header', title: 'Yläpalkki', default: true },
    { name: 'hero', title: 'Hero (etusivun yläosa)' },
    { name: 'marquee', title: 'Liukuva tekstipalkki' },
    { name: 'intro', title: 'Esittely' },
    { name: 'services', title: 'Palvelut' },
    { name: 'work', title: 'Työmme' },
    { name: 'stats', title: 'Luvut' },
    { name: 'process', title: 'Prosessi' },
    { name: 'contact', title: 'Yhteydenotto' },
    { name: 'footer', title: 'Alapalkki' },
    { name: 'seo', title: 'SEO' },
  ],

  fields: [
    // ─── HEADER ─────────────────────────────────────────────────────────────
    defineField({
      name: 'brandPrefix',
      title: 'Brändin alkuosa',
      description: 'Esim. "PIHA"',
      type: 'string',
      group: 'header',
      initialValue: 'PIHA',
    }),
    defineField({
      name: 'brandSuffix',
      title: 'Brändin loppuosa (oranssi)',
      description: 'Esim. "YKKÖSET"',
      type: 'string',
      group: 'header',
      initialValue: 'YKKÖSET',
    }),
    defineField({
      name: 'brandTagline',
      title: 'Brändin alaotsikko',
      description: 'Esim. "Oulu / Per. 2014"',
      type: 'string',
      group: 'header',
    }),
    defineField({
      name: 'navItems',
      title: 'Navigaation linkit',
      type: 'array',
      group: 'header',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'navItem',
          title: 'Linkki',
          fields: [
            defineField({
              name: 'label',
              title: 'Teksti',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'anchor',
              title: 'Kohde (ankkuri)',
              description: 'Esim. "hero", "palvelut", "tyot", "prosessi", "yhteys"',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: 'label', subtitle: 'anchor' } },
        }),
      ],
    }),

    // ─── HERO ───────────────────────────────────────────────────────────────
    defineField({
      name: 'heroHeadlineLines',
      title: 'Pääotsikon rivit',
      description:
        'Yksi rivi per kohde. Merkkaa korostettu (oranssi) rivi tarvittaessa.',
      type: 'array',
      group: 'hero',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'line',
          fields: [
            defineField({
              name: 'text',
              title: 'Teksti',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'accent',
              title: 'Korosta oranssilla',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: 'text', accent: 'accent' },
            prepare: ({ title, accent }) => ({
              title,
              subtitle: accent ? '🟧 Korostettu' : '',
            }),
          },
        }),
      ],
    }),
    defineField({
      name: 'heroLede',
      title: 'Hero-tekstikappale',
      type: 'text',
      rows: 3,
      group: 'hero',
    }),
    defineField({
      name: 'heroPrimaryCtaText',
      title: 'Pääpainikkeen teksti',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroPrimaryCtaAnchor',
      title: 'Pääpainikkeen kohde (ankkuri)',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroSecondaryCtaText',
      title: 'Toissijaisen linkin teksti',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroSecondaryCtaAnchor',
      title: 'Toissijaisen linkin kohde',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroBackgroundImage',
      title: 'Taustakuva',
      type: 'image',
      group: 'hero',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Vaihtoehtoinen teksti', type: 'string' }),
      ],
    }),
    defineField({
      name: 'heroMeta',
      title: 'Hero-metatiedot (alapalkki)',
      type: 'array',
      group: 'hero',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'metaItem',
          fields: [
            defineField({ name: 'label', title: 'Otsikko', type: 'string' }),
            defineField({ name: 'value', title: 'Arvo', type: 'string' }),
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        }),
      ],
      validation: (Rule) => Rule.max(4),
    }),

    // ─── MARQUEE ────────────────────────────────────────────────────────────
    defineField({
      name: 'marqueeItems',
      title: 'Liukuvan palkin sanat',
      description: 'Listataan oranssissa palkissa. Toistetaan automaattisesti.',
      type: 'array',
      group: 'marquee',
      of: [defineArrayMember({ type: 'string' })],
    }),

    // ─── INTRO ──────────────────────────────────────────────────────────────
    defineField({
      name: 'introEyebrow',
      title: 'Pieni yläotsikko',
      description: 'Esim. "§ 01 — Tietoa meistä"',
      type: 'string',
      group: 'intro',
    }),
    defineField({
      name: 'introNumber',
      title: 'Iso numero (animoituu)',
      type: 'number',
      group: 'intro',
    }),
    defineField({
      name: 'introNumberSuffix',
      title: 'Numeron pääte',
      description: 'Esim. "v."',
      type: 'string',
      group: 'intro',
    }),
    defineField({
      name: 'introTag',
      title: 'Numeron alateksti',
      type: 'text',
      rows: 2,
      group: 'intro',
    }),
    defineField({
      name: 'introHeadingStart',
      title: 'Otsikon alku',
      description: 'Esim. "Emme tee"',
      type: 'string',
      group: 'intro',
    }),
    defineField({
      name: 'introHeadingMuted',
      title: 'Otsikon harmaa osa',
      description: 'Esim. "pintaremonttia."',
      type: 'string',
      group: 'intro',
    }),
    defineField({
      name: 'introHeadingEnd',
      title: 'Otsikon loppu',
      description: 'Esim. "Rakennamme pihan joka kestää."',
      type: 'string',
      group: 'intro',
    }),
    defineField({
      name: 'introLead',
      title: 'Esittelyn ingressi (lihavoitu)',
      type: 'text',
      rows: 4,
      group: 'intro',
    }),
    defineField({
      name: 'introParagraphs',
      title: 'Esittelyn kappaleet',
      type: 'array',
      group: 'intro',
      of: [defineArrayMember({ type: 'text' })],
    }),

    // ─── SERVICES ───────────────────────────────────────────────────────────
    defineField({
      name: 'servicesEyebrow',
      title: 'Pieni yläotsikko',
      description: 'Esim. "§ 02"',
      type: 'string',
      group: 'services',
    }),
    defineField({
      name: 'servicesHeading',
      title: 'Otsikko',
      description: 'Esim. "Palvelut"',
      type: 'string',
      group: 'services',
    }),
    defineField({
      name: 'servicesCount',
      title: 'Lukumäärä-merkki',
      description: 'Esim. "07 / Osa-aluetta"',
      type: 'string',
      group: 'services',
    }),
    defineField({
      name: 'serviceItems',
      title: 'Palvelut',
      type: 'array',
      group: 'services',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'serviceItem',
          fields: [
            defineField({
              name: 'title',
              title: 'Palvelun nimi',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Lyhyt kuvaus',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'tags',
              title: 'Tagit',
              type: 'array',
              of: [defineArrayMember({ type: 'string' })],
              validation: (Rule) => Rule.max(5),
            }),
            defineField({
              name: 'image',
              title: 'Taustakuva (näkyy hoverilla)',
              type: 'image',
              options: { hotspot: true },
              fields: [
                defineField({ name: 'alt', title: 'Vaihtoehtoinen teksti', type: 'string' }),
              ],
            }),
            defineField({
              name: 'anchor',
              title: 'Linkin kohde',
              description: 'Esim. "yhteys"',
              type: 'string',
              initialValue: 'yhteys',
            }),
          ],
          preview: {
            select: { title: 'title', media: 'image' },
          },
        }),
      ],
    }),

    // ─── WORK ───────────────────────────────────────────────────────────────
    defineField({
      name: 'workHeadingStart',
      title: 'Otsikon alku',
      description: 'Esim. "Työmme"',
      type: 'string',
      group: 'work',
    }),
    defineField({
      name: 'workHeadingAccent',
      title: 'Otsikon korostettu sana (oranssi)',
      description: 'Esim. "kestää"',
      type: 'string',
      group: 'work',
    }),
    defineField({
      name: 'workHeadingEnd',
      title: 'Otsikon loppu',
      description: 'Esim. "katsoa läheltäkin."',
      type: 'string',
      group: 'work',
    }),
    defineField({
      name: 'workDescription',
      title: 'Kuvausteksti',
      type: 'text',
      rows: 3,
      group: 'work',
    }),
    defineField({
      name: 'workTiles',
      title: 'Kuvaruudukon kohteet',
      description: 'Lisää 6 kohdetta paras lopputulos. Ensimmäinen on suuri.',
      type: 'array',
      group: 'work',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'workTile',
          fields: [
            defineField({
              name: 'image',
              title: 'Kuva',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
              fields: [
                defineField({ name: 'alt', title: 'Vaihtoehtoinen teksti', type: 'string' }),
              ],
            }),
            defineField({
              name: 'location',
              title: 'Sijainti / kohde',
              description: 'Esim. "Karjasilta · Oulu"',
              type: 'string',
            }),
            defineField({
              name: 'category',
              title: 'Kategoria',
              description: 'Esim. "Liikenneympyrä / Maanrakennus"',
              type: 'string',
            }),
          ],
          preview: { select: { title: 'location', subtitle: 'category', media: 'image' } },
        }),
      ],
      validation: (Rule) => Rule.max(6),
    }),

    // ─── STATS ──────────────────────────────────────────────────────────────
    defineField({
      name: 'statItems',
      title: 'Numerot',
      type: 'array',
      group: 'stats',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'statItem',
          fields: [
            defineField({
              name: 'value',
              title: 'Numero tai teksti',
              description: 'Esim. "10" tai "AA"',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'animate',
              title: 'Animoi numerona (laskuri)',
              type: 'boolean',
              initialValue: true,
            }),
            defineField({
              name: 'suffix',
              title: 'Pääte (oranssi)',
              description: 'Esim. "+", "%", "A"',
              type: 'string',
            }),
            defineField({
              name: 'label',
              title: 'Selite',
              type: 'string',
            }),
          ],
          preview: {
            select: { value: 'value', suffix: 'suffix', label: 'label' },
            prepare: ({ value, suffix, label }) => ({
              title: `${value || ''}${suffix || ''}`,
              subtitle: label,
            }),
          },
        }),
      ],
      validation: (Rule) => Rule.max(4),
    }),

    // ─── PROCESS ────────────────────────────────────────────────────────────
    defineField({
      name: 'processEyebrow',
      title: 'Pieni yläotsikko',
      type: 'string',
      group: 'process',
    }),
    defineField({
      name: 'processHeadingStart',
      title: 'Otsikon alku',
      type: 'string',
      group: 'process',
    }),
    defineField({
      name: 'processHeadingMuted',
      title: 'Otsikon harmaa osa',
      type: 'string',
      group: 'process',
    }),
    defineField({
      name: 'processLead',
      title: 'Kuvausteksti',
      type: 'text',
      rows: 3,
      group: 'process',
    }),
    defineField({
      name: 'processSteps',
      title: 'Vaiheet',
      type: 'array',
      group: 'process',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'processStep',
          fields: [
            defineField({
              name: 'title',
              title: 'Vaiheen nimi',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Kuvaus',
              type: 'text',
              rows: 3,
            }),
          ],
          preview: { select: { title: 'title', subtitle: 'description' } },
        }),
      ],
    }),

    // ─── CONTACT ────────────────────────────────────────────────────────────
    defineField({
      name: 'contactBackgroundText',
      title: 'Iso taustateksti',
      description: 'Esim. "OTA YHTEYTTÄ — OTA YHTEYTTÄ —"',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'contactHeadingStart',
      title: 'Otsikon alku',
      description: 'Esim. "Pyydä"',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'contactHeadingAccent',
      title: 'Otsikon korostettu sana',
      description: 'Esim. "tarjous"',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'contactHeadingEnd',
      title: 'Otsikon loppu',
      description: 'Esim. "kohteestasi."',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'contactLead',
      title: 'Kuvausteksti',
      type: 'text',
      rows: 3,
      group: 'contact',
    }),
    defineField({
      name: 'contactCtaText',
      title: 'Painikkeen teksti',
      description: 'Esim. "Lähetä tarjouspyyntö"',
      type: 'string',
      group: 'contact',
    }),

    // ─── FOOTER ─────────────────────────────────────────────────────────────
    defineField({
      name: 'footerTagline',
      title: 'Brändin esittelyteksti',
      type: 'text',
      rows: 3,
      group: 'footer',
    }),
    defineField({
      name: 'footerColumns',
      title: 'Sarakkeet',
      type: 'array',
      group: 'footer',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'footerColumn',
          fields: [
            defineField({
              name: 'heading',
              title: 'Otsikko',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'links',
              title: 'Linkit',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'footerLink',
                  fields: [
                    defineField({
                      name: 'label',
                      title: 'Teksti',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'href',
                      title: 'Linkki (URL tai #ankkuri)',
                      type: 'string',
                    }),
                  ],
                  preview: { select: { title: 'label', subtitle: 'href' } },
                }),
              ],
            }),
          ],
          preview: { select: { title: 'heading' } },
        }),
      ],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'footerLogotype',
      title: 'Iso logoteksti (alareuna)',
      description: 'Esim. "PIHAYKKÖSET — PIHAYKKÖSET — PIHAYKKÖSET —"',
      type: 'string',
      group: 'footer',
    }),
    defineField({
      name: 'footerCopyright',
      title: 'Tekijänoikeusteksti',
      description: '{year} korvataan kuluvalla vuodella.',
      type: 'string',
      group: 'footer',
      initialValue: '© {year} Pihaykköset Oy — Kaikki oikeudet pidätetään',
    }),
    defineField({
      name: 'footerAttribution',
      title: 'Sivuston tekijä -teksti',
      type: 'string',
      group: 'footer',
    }),
    defineField({
      name: 'footerSocials',
      title: 'Sosiaalisen median linkit',
      type: 'array',
      group: 'footer',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'footerSocial',
          fields: [
            defineField({
              name: 'label',
              title: 'Teksti',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.uri({ scheme: ['http', 'https', 'mailto', 'tel'] }),
            }),
          ],
          preview: { select: { title: 'label', subtitle: 'url' } },
        }),
      ],
    }),

    // ─── SEO ────────────────────────────────────────────────────────────────
    defineField({
      name: 'seo',
      title: 'Hakukoneoptimointi',
      type: 'seo',
      group: 'seo',
    }),
  ],

  preview: {
    prepare: () => ({ title: 'Etusivu', subtitle: 'pihaykkoset.fi' }),
  },
})
