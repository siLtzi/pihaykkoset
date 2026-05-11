'use client'

import { ComparisonSection } from '@/types/sanity'
import { cn } from '@/lib/utils'
import { Check, X, Minus } from 'lucide-react'

interface ComparisonContentProps {
  section: ComparisonSection
}

export function ComparisonContent({ section }: ComparisonContentProps) {
  const bgColors = {
    white: 'bg-white',
    gray: 'bg-gray-50',
  }

  return (
    <section className={cn('py-16 md:py-24', bgColors[section.backgroundColor || 'white'])}>
      <div className="container mx-auto px-4">
        {/* Header */}
        {(section.heading || section.subheading) && (
          <div className="mx-auto mb-12 max-w-3xl text-center">
            {section.heading && (
              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                {section.heading}
              </h2>
            )}
            {section.subheading && (
              <p className="mt-4 text-lg text-gray-600">{section.subheading}</p>
            )}
          </div>
        )}

        {/* Comparison Table */}
        <div className="mx-auto max-w-5xl overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-4 text-left"></th>
                {section.columns?.map((column, index) => (
                  <th
                    key={index}
                    className={cn(
                      'p-4 text-center',
                      column.highlighted && 'bg-primary-50'
                    )}
                  >
                    <div className={cn(
                      'text-lg font-bold',
                      column.highlighted ? 'text-primary-600' : 'text-gray-900'
                    )}>
                      {column.title}
                    </div>
                    {column.subtitle && (
                      <div className="mt-1 text-sm text-gray-500">
                        {column.subtitle}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.rows?.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                >
                  <td className="p-4 font-medium text-gray-900">
                    {row.feature}
                  </td>
                  {row.values?.map((value, colIndex) => {
                    const isHighlighted = section.columns?.[colIndex]?.highlighted

                    return (
                      <td
                        key={colIndex}
                        className={cn(
                          'p-4 text-center',
                          isHighlighted && 'bg-primary-50/50'
                        )}
                      >
                        {value.type === 'check' && (
                          <Check className="mx-auto h-6 w-6 text-green-500" />
                        )}
                        {value.type === 'cross' && (
                          <X className="mx-auto h-6 w-6 text-gray-300" />
                        )}
                        {value.type === 'partial' && (
                          <Minus className="mx-auto h-6 w-6 text-yellow-500" />
                        )}
                        {value.type === 'text' && (
                          <span className="text-gray-700">{value.text}</span>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footnote */}
        {section.footnote && (
          <p className="mt-6 text-center text-sm text-gray-500">
            {section.footnote}
          </p>
        )}
      </div>
    </section>
  )
}
