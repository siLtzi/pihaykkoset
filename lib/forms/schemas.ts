import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  // Honeypot field - should be empty
  website: z.string().max(0, 'Bot detected').optional(),
  // Turnstile token
  turnstileToken: z.string().optional(),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

export const newsletterFormSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  website: z.string().max(0, 'Bot detected').optional(),
})

export type NewsletterFormData = z.infer<typeof newsletterFormSchema>
