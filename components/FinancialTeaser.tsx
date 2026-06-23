'use client'

import { useState } from 'react'

const coming = [
  {
    title: 'Fund Management',
    description: 'Portfolio analytics, NAV tracking, and investor reporting for asset managers.',
    badges: ['Portfolio', 'NAV', 'Reporting'],
  },
  {
    title: 'Iron Ore Hedging',
    description: 'Commodity hedging tools for maritime operators and trade finance teams.',
    badges: ['Derivatives', 'Risk', 'P&L'],
  },
  {
    title: 'Trade Finance',
    description: 'Voyage-linked financing instruments and letter of credit management.',
    badges: ['LC', 'Finance', 'Trade'],
  },
]

export default function FinancialTeaser() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || status !== 'idle') return
    setStatus('loading')
    try {
      const res = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setStatus(res.ok ? 'done' : 'idle')
    } catch {
      setStatus('idle')
    }
  }

  return (
    <section
      style={{
        background: 'var(--navy)',
        padding: '80px var(--space-8)',
      }}
    >
      <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
        {/* Header row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 'var(--space-8)',
            marginBottom: '52px',
          }}
        >
          <div>
            <p
              style={{
                fontFamily: 'var(--font-ibm-plex-mono, var(--f-mono))',
                fontSize: '11px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: 'var(--accent-soft)',
                marginBottom: 'var(--space-4)',
              }}
            >
              Coming Next
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-ibm-plex-sans, var(--f-sans))',
                fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
                fontWeight: 700,
                color: 'var(--text-on-navy)',
                letterSpacing: '-0.4px',
                lineHeight: 1.1,
              }}
            >
              Financial Solutions
            </h2>
          </div>

          {/* Notify form */}
          {status === 'done' ? (
            <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--accent-soft)' }}>
              You&apos;re on the list.
            </p>
          ) : (
            <form
              onSubmit={submit}
              style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                style={{
                  height: '44px',
                  padding: '0 var(--space-4)',
                  minWidth: '220px',
                  background: 'rgba(243,239,229,0.07)',
                  border: '1px solid rgba(243,239,229,0.18)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-on-navy)',
                  fontSize: '14px',
                  fontFamily: 'var(--font-ibm-plex-sans, var(--f-sans))',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  height: '44px',
                  padding: '0 var(--space-6)',
                  background: 'var(--accent)',
                  color: '#fff',
                  border: '1px solid var(--accent)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '14px',
                  fontWeight: 600,
                  fontFamily: 'var(--font-ibm-plex-sans, var(--f-sans))',
                  cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  opacity: status === 'loading' ? 0.6 : 1,
                }}
              >
                Notify Me
              </button>
            </form>
          )}
        </div>

        {/* Locked cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'var(--space-5)',
          }}
        >
          {coming.map((product) => (
            <div
              key={product.title}
              style={{
                background: 'rgba(243,239,229,0.04)',
                border: '1px solid rgba(243,239,229,0.09)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-6)',
                opacity: 0.55,
                position: 'relative',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: 'var(--space-4)',
                  right: 'var(--space-4)',
                  fontFamily: 'var(--font-ibm-plex-mono, var(--f-mono))',
                  fontSize: '10px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--accent-soft)',
                  background: 'rgba(13,110,126,0.18)',
                  padding: '2px 7px',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                Soon
              </span>

              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: 'var(--text-on-navy)',
                  marginBottom: 'var(--space-3)',
                }}
              >
                {product.title}
              </h3>

              <p
                style={{
                  fontSize: '13px',
                  color: 'rgba(243,239,229,0.5)',
                  lineHeight: 1.6,
                  marginBottom: 'var(--space-5)',
                }}
              >
                {product.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                {product.badges.map((b) => (
                  <span
                    key={b}
                    style={{
                      fontFamily: 'var(--font-ibm-plex-mono, var(--f-mono))',
                      fontSize: '10px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: 'rgba(243,239,229,0.38)',
                      background: 'rgba(243,239,229,0.06)',
                      padding: '2px 7px',
                      borderRadius: 'var(--radius-sm)',
                    }}
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
