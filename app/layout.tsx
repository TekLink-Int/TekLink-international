import type { Metadata } from 'next'
import { IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import './globals.css'

const siteUrl = 'https://www.teklinkinternational.com'
const siteTitle = 'TekLink | Maritime, Deeptech & Fintech Platforms'
const siteDescription =
  'Where maritime excellence meets advanced deeptech, fintech, and technology innovation.'

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex-sans',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: 'TekLink International',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: siteTitle,
    description: siteDescription,
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'TekLink International',
  alternateName: 'TekLink',
  url: siteUrl,
  description: siteDescription,
  sameAs: [],
  knowsAbout: [
    'Maritime technology',
    'Fintech platforms',
    'Deeptech',
    'Shipping technology',
    'Port operations',
    'Trade infrastructure',
  ],
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'TekLink International',
  alternateName: 'TekLink',
  url: siteUrl,
  description: siteDescription,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
      style={{ fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif' }}
    >
      <body style={{ fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif' }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationJsonLd, websiteJsonLd]),
          }}
        />
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
