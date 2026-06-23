'use client'

import { useEffect, useRef } from 'react'

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let ctx: { revert?: () => void } | undefined
    const init = async () => {
      const { default: gsap } = await import('gsap')
      ctx = gsap.context(() => {
        gsap.from('[data-hero-el]', {
          opacity: 0,
          y: 32,
          duration: 0.9,
          stagger: 0.14,
          ease: 'power3.out',
          delay: 0.15,
        })
      }, containerRef)
    }
    init()
    return () => ctx?.revert?.()
  }, [])

  return (
    <section
      ref={containerRef}
      style={{
        minHeight: '100vh',
        background: 'var(--navy)',
        backgroundImage: `
          radial-gradient(ellipse at 68% 38%, rgba(13,110,126,0.16) 0%, transparent 58%),
          radial-gradient(ellipse at 18% 72%, rgba(13,110,126,0.09) 0%, transparent 48%)
        `,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px var(--space-8) 140px',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      {/* Eyebrow */}
      <div
        data-hero-el
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          fontFamily: 'var(--font-ibm-plex-mono, var(--f-mono))',
          fontSize: '11px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
          color: 'var(--accent-soft)',
          padding: '5px 14px',
          border: '1px solid rgba(107,179,192,0.28)',
          borderRadius: 'var(--radius-sm)',
          background: 'rgba(13,110,126,0.1)',
          marginBottom: 'var(--space-8)',
        }}
      >
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'var(--accent-soft)',
            display: 'inline-block',
          }}
        />
        Maritime Ecosystem
      </div>

      {/* H1 */}
      <h1
        data-hero-el
        style={{
          fontFamily: 'var(--font-ibm-plex-sans, var(--f-sans))',
          fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
          fontWeight: 700,
          color: 'var(--text-on-navy)',
          maxWidth: '56rem',
          lineHeight: 1.07,
          letterSpacing: '-0.6px',
          marginBottom: 'var(--space-6)',
        }}
      >
        The Maritime Ecosystem,{' '}
        <span style={{ color: 'var(--accent-soft)' }}>End to End</span>
      </h1>

      {/* Subtext */}
      <p
        data-hero-el
        style={{
          fontSize: '18px',
          fontWeight: 400,
          color: 'rgba(243,239,229,0.62)',
          maxWidth: '38rem',
          lineHeight: 1.65,
          marginBottom: 'var(--space-10)',
        }}
      >
        From booking freight to chartering a vessel to acquiring one — TekLink connects
        every stage of the maritime journey.
      </p>

      {/* CTAs */}
      <div
        data-hero-el
        style={{
          display: 'flex',
          gap: 'var(--space-4)',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <a
          href="#solutions"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            height: '44px',
            padding: '0 var(--space-8)',
            background: 'var(--accent)',
            color: '#fff',
            fontSize: '14px',
            fontWeight: 600,
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--accent)',
            transition: 'background 0.2s, border-color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--accent-ink)'
            e.currentTarget.style.borderColor = 'var(--accent-ink)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--accent)'
            e.currentTarget.style.borderColor = 'var(--accent)'
          }}
        >
          Explore Platforms
        </a>

        <a
          href="#collaborate"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            height: '44px',
            padding: '0 var(--space-8)',
            background: 'transparent',
            color: 'var(--text-on-navy)',
            fontSize: '14px',
            fontWeight: 600,
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(243,239,229,0.22)',
            transition: 'border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent-soft)'
            e.currentTarget.style.color = 'var(--accent-soft)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(243,239,229,0.22)'
            e.currentTarget.style.color = 'var(--text-on-navy)'
          }}
        >
          Collaborate with Us
        </a>
      </div>

      {/* Scroll hint */}
      <div
        data-hero-el
        style={{
          position: 'absolute',
          bottom: '148px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-ibm-plex-mono, var(--f-mono))',
            fontSize: '10px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'rgba(243,239,229,0.3)',
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: '1px',
            height: '28px',
            background: 'linear-gradient(to bottom, rgba(107,179,192,0.5), transparent)',
          }}
        />
      </div>

      {/* Bottom fade: navy → canvas */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '130px',
          background: 'linear-gradient(to bottom, transparent, var(--canvas))',
          pointerEvents: 'none',
        }}
      />
    </section>
  )
}
