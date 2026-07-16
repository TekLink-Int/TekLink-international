'use client'

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
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-6)',
        }}
      >
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
      </div>
    </footer>
  )
}
