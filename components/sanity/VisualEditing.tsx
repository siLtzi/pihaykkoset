'use client'

import { useEffect } from 'react'
import { VisualEditing as SanityVisualEditing } from 'next-sanity/visual-editing'

export function VisualEditing() {
  useEffect(() => {
    // Only in development: show a visual indicator that draft mode is active
    if (process.env.NODE_ENV === 'development') {
      console.log('🎨 Visual Editing enabled')
    }
  }, [])

  return <SanityVisualEditing />
}
