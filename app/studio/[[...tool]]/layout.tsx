export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="fixed inset-0 z-50">
          {children}
        </div>
      </body>
    </html>
  )
}
