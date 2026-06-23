'use client'

import { useState } from 'react'

type Track = 'integration' | 'partnership'

const inputBase: React.CSSProperties = {
  width: '100%',
  height: '44px',
  padding: '0 var(--space-4)',
  background: 'rgba(243,239,229,0.07)',
  border: '1px solid rgba(243,239,229,0.18)',
  borderRadius: 'var(--radius-md)',
  color: 'var(--text-on-navy)',
  fontSize: '14px',
  fontFamily: 'var(--font-ibm-plex-sans, var(--f-sans))',
  outline: 'none',
  transition: 'border-color 0.2s',
}

export default function CollaborateForm() {
  const [track, setTrack] = useState<Track>('integration')
  const [form, setForm] = useState({
    name: '', company: '', email: '', platform: '', message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((p) => ({ ...p, [k]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, type: track }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      id="collaborate"
      style={{
        background: 'var(--navy)',
        padding: '80px var(--space-8)',
        borderTop: '1px solid rgba(243,239,229,0.08)',
      }}
    >
      <div style={{ maxWidth: '52rem', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '44px' }}>
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
            Collaborate
          </p>
          <h2
            style={{
              fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
              fontWeight: 700,
              color: 'var(--text-on-navy)',
              letterSpacing: '-0.4px',
              lineHeight: 1.1,
              marginBottom: 'var(--space-5)',
            }}
          >
            Build with TekLink
          </h2>
          <p
            style={{
              fontSize: '16px',
              color: 'rgba(243,239,229,0.58)',
              lineHeight: 1.65,
              maxWidth: '36rem',
            }}
          >
            Have a solution that fits into the ecosystem? Want to explore a partnership?
            We&apos;re open to both.
          </p>
        </div>

        {status === 'success' ? (
          <div
            style={{
              padding: 'var(--space-10)',
              background: 'rgba(44,110,73,0.1)',
              border: '1px solid rgba(44,110,73,0.28)',
              borderRadius: 'var(--radius-xl)',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontSize: '18px',
                fontWeight: 600,
                color: 'var(--text-on-navy)',
                marginBottom: 'var(--space-2)',
              }}
            >
              Message received.
            </p>
            <p style={{ fontSize: '14px', color: 'rgba(243,239,229,0.55)' }}>
              We&apos;ll get back to you at {form.email}.
            </p>
          </div>
        ) : (
          <form onSubmit={submit}>
            {/* Track toggle */}
            <div
              style={{
                display: 'inline-flex',
                background: 'rgba(243,239,229,0.06)',
                borderRadius: 'var(--radius-lg)',
                padding: '4px',
                marginBottom: '32px',
              }}
            >
              {(['integration', 'partnership'] as Track[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTrack(t)}
                  style={{
                    padding: '8px 20px',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '13px',
                    fontWeight: 600,
                    fontFamily: 'var(--font-ibm-plex-sans, var(--f-sans))',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background 0.2s, color 0.2s',
                    background: track === t ? 'var(--accent)' : 'transparent',
                    color: track === t ? '#fff' : 'rgba(243,239,229,0.45)',
                  }}
                >
                  {t === 'integration' ? 'Technical Integration' : 'Partnership Enquiry'}
                </button>
              ))}
            </div>

            {/* Name + Company */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'var(--space-4)',
                marginBottom: 'var(--space-4)',
              }}
            >
              <input
                style={inputBase}
                placeholder="Name"
                value={form.name}
                onChange={set('name')}
                required
              />
              <input
                style={inputBase}
                placeholder="Company"
                value={form.company}
                onChange={set('company')}
              />
            </div>

            {/* Email */}
            <input
              style={{ ...inputBase, marginBottom: 'var(--space-4)' }}
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={set('email')}
              required
            />

            {/* Platform field — only for integration track */}
            {track === 'integration' && (
              <input
                style={{ ...inputBase, marginBottom: 'var(--space-4)' }}
                placeholder="Current platform or tech stack"
                value={form.platform}
                onChange={set('platform')}
              />
            )}

            {/* Message */}
            <textarea
              style={{
                ...inputBase,
                height: '120px',
                padding: 'var(--space-3) var(--space-4)',
                resize: 'vertical',
                marginBottom: 'var(--space-6)',
              }}
              placeholder={
                track === 'integration'
                  ? 'Tell us about your solution and how it could plug into the ecosystem...'
                  : 'Tell us about the collaboration you have in mind...'
              }
              value={form.message}
              onChange={set('message')}
              required
            />

            {/* Submit */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  height: '44px',
                  padding: '0 var(--space-8)',
                  background: 'var(--accent)',
                  color: '#fff',
                  border: '1px solid var(--accent)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '14px',
                  fontWeight: 600,
                  fontFamily: 'var(--font-ibm-plex-sans, var(--f-sans))',
                  cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  opacity: status === 'loading' ? 0.6 : 1,
                  transition: 'background 0.2s, border-color 0.2s, opacity 0.2s',
                }}
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>

              {status === 'error' && (
                <span style={{ fontSize: '13px', color: 'var(--signal-danger)' }}>
                  Something went wrong. Please try again.
                </span>
              )}
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
