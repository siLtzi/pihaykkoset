'use client'

import Link from 'next/link'

export function DraftModeToast() {
  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-3 rounded-lg bg-amber-100 px-4 py-3 text-sm text-amber-900 shadow-lg ring-1 ring-amber-200">
      <span className="flex h-2 w-2">
        <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-amber-400 opacity-75"></span>
        <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
      </span>
      <span className="font-medium">Draft Mode Active</span>
      <Link
        href="/api/draft-mode/disable"
        className="rounded bg-amber-900 px-2 py-1 text-xs text-white transition-colors hover:bg-amber-800"
      >
        Exit
      </Link>
    </div>
  )
}
