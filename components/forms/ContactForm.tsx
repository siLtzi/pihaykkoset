'use client'

import { useState, FormEvent } from 'react'
import { ContactFormData } from '@/lib/forms/schemas'

interface ContactFormProps {
  fields?: Array<{
    fieldName: string
    fieldType: 'text' | 'email' | 'tel' | 'textarea'
    required?: boolean
    placeholder?: string
  }>
  submitButtonText?: string
  successMessage?: string
  className?: string
  turnstileSiteKey?: string
}

export function ContactForm({
  fields = [
    { fieldName: 'name', fieldType: 'text', required: true, placeholder: 'Your name' },
    { fieldName: 'email', fieldType: 'email', required: true, placeholder: 'your@email.com' },
    { fieldName: 'message', fieldType: 'textarea', required: true, placeholder: 'Your message...' },
  ],
  submitButtonText = 'Send Message',
  successMessage = 'Thank you! Your message has been sent.',
  className = '',
  turnstileSiteKey,
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setFieldErrors({})

    const formData = new FormData(e.currentTarget)
    const data: Record<string, string> = {}

    formData.forEach((value, key) => {
      data[key] = value.toString()
    })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        if (result.details?.fieldErrors) {
          setFieldErrors(result.details.fieldErrors)
        }
        throw new Error(result.error || 'Something went wrong')
      }

      setIsSuccess(true)
      ;(e.target as HTMLFormElement).reset()

      // Track conversion event
      if (typeof window !== 'undefined' && (window as { gtag?: (...args: unknown[]) => void }).gtag) {
        ;(window as { gtag?: (...args: unknown[]) => void }).gtag?.('event', 'form_submit', {
          event_category: 'contact',
          event_label: 'contact_form',
        })
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="rounded-lg bg-green-50 p-6 text-center">
        <div className="mb-2 text-2xl">✓</div>
        <p className="text-green-800">{successMessage}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {/* Honeypot field - hidden from users, catches bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {fields.map((field) => {
        const fieldId = `contact-${field.fieldName}`
        const hasError = !!fieldErrors[field.fieldName]

        return (
          <div key={field.fieldName}>
            <label
              htmlFor={fieldId}
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              {field.fieldName.charAt(0).toUpperCase() + field.fieldName.slice(1)}
              {field.required && <span className="text-red-500"> *</span>}
            </label>

            {field.fieldType === 'textarea' ? (
              <textarea
                id={fieldId}
                name={field.fieldName}
                required={field.required}
                placeholder={field.placeholder}
                rows={4}
                className={`
                  w-full rounded-lg border px-4 py-2 transition-colors
                  focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200
                  ${hasError ? 'border-red-500' : 'border-gray-300'}
                `}
              />
            ) : (
              <input
                type={field.fieldType}
                id={fieldId}
                name={field.fieldName}
                required={field.required}
                placeholder={field.placeholder}
                className={`
                  w-full rounded-lg border px-4 py-2 transition-colors
                  focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200
                  ${hasError ? 'border-red-500' : 'border-gray-300'}
                `}
              />
            )}

            {hasError && (
              <p className="mt-1 text-sm text-red-500">{fieldErrors[field.fieldName]}</p>
            )}
          </div>
        )
      })}

      {/* Turnstile widget placeholder */}
      {turnstileSiteKey && (
        <div
          className="cf-turnstile"
          data-sitekey={turnstileSiteKey}
          data-callback="onTurnstileSuccess"
        />
      )}

      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="
          w-full rounded-lg bg-primary-600 px-6 py-3 font-medium text-white
          transition-colors hover:bg-primary-700
          disabled:cursor-not-allowed disabled:opacity-50
        "
      >
        {isSubmitting ? 'Sending...' : submitButtonText}
      </button>
    </form>
  )
}
