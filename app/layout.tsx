import type { Metadata } from 'next'
import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

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
  title: 'TekLink — Maritime Ecosystem',
  description:
    'From booking freight to chartering a vessel to acquiring one — TekLink connects every stage of the maritime journey.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
      style={{ fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif' }}
    >
      <body style={{ fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
