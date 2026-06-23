'use client'

import { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
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
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-8)' }}>
        <span
          style={{
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--accent-soft)',
            borderBottom: '1px solid var(--accent-soft)',
            paddingBottom: '2px',
          }}
        >
          Maritime
        </span>

        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            fontSize: '14px',
            fontWeight: 500,
            color: 'rgba(243,239,229,0.35)',
          }}
        >
          Financial
          <span
            style={{
              fontFamily: 'var(--font-ibm-plex-mono, var(--f-mono))',
              fontSize: '10px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              padding: '2px 6px',
              background: 'rgba(13,110,126,0.18)',
              color: 'var(--accent-soft)',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            Soon
          </span>
        </span>

        <a
          href="#collaborate"
          style={{
            fontSize: '14px',
            fontWeight: 500,
            color: 'rgba(243,239,229,0.65)',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-on-navy)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(243,239,229,0.65)')}
        >
          Collaborate
        </a>
      </div>
    </nav>
  )
}
