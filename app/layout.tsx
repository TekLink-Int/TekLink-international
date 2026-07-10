import type { Metadata } from 'next'
import { IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
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
  title: 'TekLink - Maritime, Deeptech and Fintech',
  description:
    'TekLink builds maritime trade platforms, deeptech capability lanes, and fintech applications for operational teams.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
      style={{ fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif' }}
    >
      <body style={{ fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif' }}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
