import { NextRequest, NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/forms/schemas'
import { client } from '@/sanity/lib/client'

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

function getRateLimitKey(ip: string): string {
  return `contact:${ip}`
}

function checkRateLimit(ip: string): boolean {
  const key = getRateLimitKey(ip)
  const now = Date.now()
  const windowMs = 60 * 1000 // 1 minute window
  const maxRequests = 5

  const record = rateLimitStore.get(key)

  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (record.count >= maxRequests) {
    return false
  }

  record.count++
  return true
}

// Verify Cloudflare Turnstile token
async function verifyTurnstile(token: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY
  
  if (!secretKey) {
    console.warn('Turnstile secret key not configured, skipping verification')
    return true
  }

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    })

    const data = await response.json()
    return data.success === true
  } catch (error) {
    console.error('Turnstile verification failed:', error)
    return false
  }
}

// Send email notification (implement with your preferred provider)
async function sendEmailNotification(data: {
  name: string
  email: string
  phone?: string
  company?: string
  subject?: string
  message: string
}): Promise<void> {
  // TODO: Implement with your email provider (SendGrid, Resend, etc.)
  // Example with Resend:
  // const resend = new Resend(process.env.RESEND_API_KEY)
  // await resend.emails.send({
  //   from: 'noreply@yourdomain.com',
  //   to: process.env.CONTACT_EMAIL,
  //   subject: `New contact form: ${data.subject || 'No subject'}`,
  //   html: `...`,
  // })
  
  console.log('📧 Contact form submission:', data)
}

// Store submission in Sanity (optional)
async function storeInSanity(data: {
  name: string
  email: string
  phone?: string
  company?: string
  subject?: string
  message: string
}): Promise<void> {
  // Only if you want to store submissions in Sanity
  // You'd need to create a 'formSubmission' document type
  
  const writeClient = client.withConfig({
    token: process.env.SANITY_API_WRITE_TOKEN,
  })

  // Uncomment to store in Sanity:
  // await writeClient.create({
  //   _type: 'formSubmission',
  //   ...data,
  //   submittedAt: new Date().toISOString(),
  // })
}

export async function POST(request: NextRequest) {
  try {
    // Get IP for rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               'unknown'

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()

    // Validate form data
    const result = contactFormSchema.safeParse(body)
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: result.error.flatten() },
        { status: 400 }
      )
    }

    const { website, turnstileToken, ...formData } = result.data

    // Check honeypot
    if (website && website.length > 0) {
      // Silently reject but return success to fool bots
      return NextResponse.json({ success: true })
    }

    // Verify Turnstile if token provided
    if (turnstileToken) {
      const isValid = await verifyTurnstile(turnstileToken)
      if (!isValid) {
        return NextResponse.json(
          { error: 'CAPTCHA verification failed' },
          { status: 400 }
        )
      }
    }

    // Send email notification
    await sendEmailNotification(formData)

    // Optionally store in Sanity or CRM
    // await storeInSanity(formData)

    return NextResponse.json({ 
      success: true,
      message: 'Thank you for your message. We will get back to you soon!' 
    })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
