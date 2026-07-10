'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { login, logout } from '@/app/actions'

const navItems = [
  { label: 'Maritime & Trade', href: '/' },
  { label: 'Deeptech', href: '/deeptech' },
  { label: 'Fintech Solutions', href: '/fintech' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="teklink-nav"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: '64px',
        padding: '0 var(--space-8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'background 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease',
        background: scrolled ? 'rgba(6,18,30,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled
          ? '1px solid rgba(243,239,229,0.09)'
          : '1px solid transparent',
      }}
    >
      {/* Logo */}
      <div
        className="teklink-logo"
        style={{
          fontFamily: 'var(--font-ibm-plex-sans, var(--f-sans))',
          fontWeight: 700,
          fontSize: '20px',
          letterSpacing: '-0.4px',
          color: 'var(--text-on-navy)',
          userSelect: 'none',
        }}
      >
        Tek<span style={{ color: 'var(--accent-soft)' }}>Link</span>
      </div>

      {/* Nav items */}
      <div
        className="teklink-nav-links"
        style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', flexWrap: 'nowrap' }}
      >
        {navItems.map((item) => {
          const active = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                fontSize: '14px',
                fontWeight: 500,
                color: active ? 'var(--accent-soft)' : 'rgba(243,239,229,0.65)',
                borderBottom: active ? '1px solid var(--accent-soft)' : '1px solid transparent',
                paddingBottom: '2px',
                transition: 'color 0.2s, border-color 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--text-on-navy)'
                e.currentTarget.style.borderColor = active
                  ? 'var(--accent-soft)'
                  : 'rgba(243,239,229,0.32)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = active
                  ? 'var(--accent-soft)'
                  : 'rgba(243,239,229,0.65)'
                e.currentTarget.style.borderColor = active ? 'var(--accent-soft)' : 'transparent'
              }}
            >
              {item.label}
            </Link>
          )
        })}

        <Link
          href={pathname === '/' ? '#collaborate' : '/#collaborate'}
          style={{
            fontSize: '14px',
            fontWeight: 500,
            color: 'rgba(243,239,229,0.65)',
            transition: 'color 0.2s',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-on-navy)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(243,239,229,0.65)')}
        >
          Collaborate
        </Link>

        {session?.user ? (
          <form action={logout}>
            <button
              type="submit"
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--text-on-navy)',
                background: 'rgba(243,239,229,0.1)',
                border: '1px solid rgba(243,239,229,0.22)',
                borderRadius: '999px',
                padding: '7px 16px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              Sign out
            </button>
          </form>
        ) : (
          <form action={login}>
            <button
              type="submit"
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--navy)',
                background: 'var(--accent-soft)',
                border: '1px solid var(--accent-soft)',
                borderRadius: '999px',
                padding: '7px 16px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              Sign in
            </button>
          </form>
        )}
      </div>
    </nav>
  )
}
