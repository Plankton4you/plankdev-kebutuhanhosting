import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kebutuhan Hosting',
  description: 'Created with PlankDev',
  generator: 'PlankDev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
