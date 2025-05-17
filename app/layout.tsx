import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'American User Profile Generator | Fake Identity Data',
  description: 'Generate fake user identities with comprehensive personal, contact, financial, and professional information for testing and development purposes.',
  keywords: 'random user, fake identity, profile generator, test data, dummy user information',
  authors: [{ name: 'Random User Generator' }],
  creator: 'Random User Generator',
  publisher: 'Random User Generator',
  robots: 'index, follow',
  generator: 'Next.js',
  applicationName: 'Random User Profile Generator',
  metadataBase: new URL('https://meiguodizhi.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://meiguodizhi.vercel.app',
    title: 'American User Profile Generator | Fake Identity Data',
    description: 'Generate fake user identities with comprehensive personal, contact, financial, and professional information for testing and development purposes.',
    siteName: 'Random User Profile Generator',
    images: [
      {
        url: '/website.png',
        width: 1200,
        height: 630,
        alt: 'Random User Profile Generator',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Random User Profile Generator | Fake Identity Data',
    description: 'Generate fake user identities with comprehensive personal, contact, financial, and professional information for testing and development purposes.',
    images: ['https://meiguodizhi.vercel.app/website.png'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#4f46e5',
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
