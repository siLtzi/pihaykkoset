'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import NextStudio with SSR disabled
const NextStudioNoSSR = dynamic(
  () => import('next-sanity/studio').then((mod) => mod.NextStudio),
  { 
    ssr: false,
    loading: () => (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Studio...</p>
        </div>
      </div>
    )
  }
)

export default function StudioPage() {
  const [config, setConfig] = useState<any>(null)

  useEffect(() => {
    // Import config only on client side
    import('@/sanity.config').then((mod) => {
      setConfig(mod.default)
    })
  }, [])

  if (!config) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Studio...</p>
        </div>
      </div>
    )
  }

  return <NextStudioNoSSR config={config} />
}
