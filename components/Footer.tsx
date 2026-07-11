'use client'

const platforms = [
  { label: 'Freight Marketplace', href: 'https://freight.teklink.com.au' },
  { label: 'Ship Chartering', href: 'https://shipchartering.teklink.com.au' },
  { label: 'Ship Feasibility', href: 'https://ship.feasibility.teklink.com.au' },
]

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--navy)',
        borderTop: '1px solid rgba(243,239,229,0.08)',
        padding: 'var(--space-10) var(--space-8)',
      }}
    >
      <div
        style={{
          maxWidth: '72rem',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--space-6)',
        }}
      >
        {/* Wordmark */}
        <div
          style={{
            fontFamily: 'var(--font-ibm-plex-sans, var(--f-sans))',
            fontWeight: 700,
            fontSize: '18px',
            letterSpacing: '-0.3px',
            color: 'var(--text-on-navy)',
          }}
        >
          Tek<span style={{ color: 'var(--accent-soft)' }}>Link</span>
        </div>

        {/* Platform links */}
        <nav style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
          {platforms.map((p) => (
            <a
              key={p.label}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '13px',
                color: 'rgba(243,239,229,0.45)',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-soft)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(243,239,229,0.45)')}
            >
              {p.label}
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <p
          style={{
            fontFamily: 'var(--font-ibm-plex-mono, var(--f-mono))',
            fontSize: '11px',
            color: 'rgba(243,239,229,0.28)',
            letterSpacing: '0.04em',
          }}
        >
          © 2026 TekLink
        </p>
      </div>
    </footer>
  )
}
