'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { MessageCircle, X, Phone, Mail, Calendar, ArrowRight } from 'lucide-react'

interface StickyCTAProps {
  phoneNumber?: string
  email?: string
  calendarLink?: string
  ctaText?: string
  ctaLink?: string
  showAfterScroll?: number // pixels to scroll before showing
  position?: 'bottom-right' | 'bottom-left'
  variant?: 'fab' | 'bar' | 'expandable'
}

export function StickyCTA({
  phoneNumber,
  email,
  calendarLink,
  ctaText = 'Get in Touch',
  ctaLink = '/contact',
  showAfterScroll = 300,
  position = 'bottom-right',
  variant = 'expandable',
}: StickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > showAfterScroll)
    }

    // Initial check
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [showAfterScroll])

  // Close expanded state when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('[data-sticky-cta]')) {
        setIsExpanded(false)
      }
    }

    if (isExpanded) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [isExpanded])

  if (!isVisible) return null

  const positionClasses = {
    'bottom-right': 'right-4 sm:right-6',
    'bottom-left': 'left-4 sm:left-6',
  }

  // Simple FAB variant
  if (variant === 'fab') {
    return (
      <Link
        href={ctaLink}
        className={cn(
          'fixed bottom-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary-600 text-white shadow-lg transition-all hover:bg-primary-700 hover:scale-110 sm:bottom-6',
          positionClasses[position],
          'animate-in fade-in slide-in-from-bottom-4 duration-300'
        )}
        aria-label={ctaText}
      >
        <MessageCircle className="h-6 w-6" />
      </Link>
    )
  }

  // Bottom bar variant
  if (variant === 'bar') {
    return (
      <div
        className={cn(
          'fixed inset-x-0 bottom-0 z-50 bg-primary-600 p-4 shadow-lg',
          'animate-in fade-in slide-in-from-bottom duration-300'
        )}
      >
        <div className="container mx-auto flex items-center justify-between">
          <p className="text-white font-medium">{ctaText}</p>
          <div className="flex items-center gap-3">
            {phoneNumber && (
              <a
                href={`tel:${phoneNumber}`}
                className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm text-white transition-colors hover:bg-white/20"
              >
                <Phone className="h-4 w-4" />
                <span className="hidden sm:inline">Call</span>
              </a>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm text-white transition-colors hover:bg-white/20"
              >
                <Mail className="h-4 w-4" />
                <span className="hidden sm:inline">Email</span>
              </a>
            )}
            <Link
              href={ctaLink}
              className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-primary-600 transition-colors hover:bg-gray-100"
            >
              Contact
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Expandable variant (default)
  return (
    <div
      data-sticky-cta
      className={cn(
        'fixed bottom-4 z-50 sm:bottom-6',
        positionClasses[position],
        'animate-in fade-in slide-in-from-bottom-4 duration-300'
      )}
    >
      {/* Expanded Menu */}
      {isExpanded && (
        <div
          className={cn(
            'mb-3 overflow-hidden rounded-2xl bg-white shadow-xl',
            'animate-in fade-in slide-in-from-bottom-2 duration-200'
          )}
        >
          <div className="p-4">
            <h3 className="mb-3 text-sm font-semibold text-gray-900">
              {ctaText}
            </h3>
            <div className="space-y-2">
              {phoneNumber && (
                <a
                  href={`tel:${phoneNumber}`}
                  className="flex items-center gap-3 rounded-lg p-3 text-gray-700 transition-colors hover:bg-gray-100"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Call us</div>
                    <div className="text-xs text-gray-500">{phoneNumber}</div>
                  </div>
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 rounded-lg p-3 text-gray-700 transition-colors hover:bg-gray-100"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Email us</div>
                    <div className="text-xs text-gray-500">{email}</div>
                  </div>
                </a>
              )}
              {calendarLink && (
                <a
                  href={calendarLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg p-3 text-gray-700 transition-colors hover:bg-gray-100"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Book a meeting</div>
                    <div className="text-xs text-gray-500">Schedule a call</div>
                  </div>
                </a>
              )}
              <Link
                href={ctaLink}
                className="flex items-center justify-between rounded-lg bg-primary-600 p-3 text-white transition-colors hover:bg-primary-700"
              >
                <span className="text-sm font-medium">Contact Form</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          'flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all',
          isExpanded
            ? 'bg-gray-900 text-white hover:bg-gray-800'
            : 'bg-primary-600 text-white hover:bg-primary-700 hover:scale-110'
        )}
        aria-label={isExpanded ? 'Close contact menu' : ctaText}
      >
        {isExpanded ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>
    </div>
  )
}
