import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'
import { revalidateSecret } from '@/sanity/env'

type WebhookPayload = {
  _type: string
  slug?: { current: string }
  isHomepage?: boolean
}

export async function POST(req: NextRequest) {
  try {
    if (!revalidateSecret) {
      return new NextResponse('Missing SANITY_REVALIDATE_SECRET', { status: 500 })
    }

    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      revalidateSecret
    )

    if (!isValidSignature) {
      return new NextResponse('Invalid signature', { status: 401 })
    }

    if (!body?._type) {
      return new NextResponse('Bad Request', { status: 400 })
    }

    // Revalidate based on document type
    switch (body._type) {
      case 'siteSettings':
        // Site settings affect all pages
        revalidatePath('/', 'layout')
        break
      case 'navigation':
        // Navigation affects all pages
        revalidatePath('/', 'layout')
        break
      case 'page':
        // Revalidate specific page
        if (body.isHomepage) {
          revalidatePath('/')
        } else if (body.slug?.current) {
          revalidatePath(`/${body.slug.current}`)
        }
        // Also revalidate sitemap
        revalidatePath('/sitemap.xml')
        break
      case 'teamMember':
      case 'testimonial':
      case 'caseStudy':
      case 'service':
      case 'article':
        // Revalidate their listing pages and individual pages
        revalidatePath(`/${body._type}s`, 'page')
        if (body.slug?.current) {
          revalidatePath(`/${body._type}s/${body.slug.current}`)
        }
        break
      default:
        // Generic revalidation - revalidate entire site
        revalidatePath('/', 'layout')
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      body,
    })
  } catch (err) {
    console.error('Revalidation error:', err)
    return new NextResponse('Error revalidating', { status: 500 })
  }
}
