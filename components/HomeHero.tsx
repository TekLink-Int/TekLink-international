'use client'

import { useEffect, useRef } from 'react'

export default function HomeHero() {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let ctx: { revert?: () => void } | undefined
    let fallback: ReturnType<typeof setTimeout> | undefined
    const init = async () => {
      const { default: gsap } = await import('gsap')
      ctx = gsap.context(() => {
        const els = gsap.utils.toArray<HTMLElement>('[data-hero-el]')
        gsap.from(els, {
          opacity: 0,
          y: 32,
          duration: 0.9,
          stagger: 0.14,
          ease: 'power3.out',
          delay: 0.15,
        })
        // Safety net: if the tab is backgrounded/throttled mid-animation, requestAnimationFrame
        // can stall indefinitely and leave this content stuck near-invisible. Force it visible.
        fallback = setTimeout(() => {
          gsap.killTweensOf(els)
          gsap.set(els, { clearProps: 'opacity,transform' })
        }, 2200)
      }, containerRef)
    }
    init()
    return () => {
      clearTimeout(fallback)
      ctx?.revert?.()
    }
  }, [])

  return (
    <section
      ref={containerRef}
      style={{
        minHeight: '92vh',
        background: 'var(--navy)',
        backgroundImage: `
          radial-gradient(ellipse at 78% 22%, rgba(13,110,126,0.2) 0%, transparent 58%),
          radial-gradient(ellipse at 14% 82%, rgba(13,110,126,0.1) 0%, transparent 48%)
        `,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '150px var(--space-8) 96px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        className="home-hero-grid"
        style={{
          maxWidth: '72rem',
          width: '100%',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.55fr 1fr',
          gap: 'var(--space-12)',
          alignItems: 'center',
        }}
      >
        <style>{`
          @media (max-width: 860px) {
            .home-hero-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>

        {/* Left: positioning */}
        <div style={{ maxWidth: '44rem' }}>
          <h1
            data-hero-el
            style={{
              fontFamily: 'var(--font-ibm-plex-sans, var(--f-sans))',
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 700,
              color: 'var(--text-on-navy)',
              lineHeight: 1.15,
              letterSpacing: '-0.5px',
              marginBottom: 'var(--space-6)',
            }}
          >
            This is a platform for everything end-to-end related to Shipping and Ports, core and
            connected.
          </h1>

          <p
            data-hero-el
            style={{
              fontSize: 'clamp(1.15rem, 2vw, 1.45rem)',
              fontWeight: 500,
              color: 'rgba(243,239,229,0.78)',
              lineHeight: 1.55,
              maxWidth: '40rem',
            }}
          >
            We are engineering and delivering real Solutions for real Problems.
          </p>
        </div>

        {/* Right: collaborate CTA */}
        <div
          data-hero-el
          style={{
            background: 'rgba(243,239,229,0.04)',
            border: '1px solid rgba(243,239,229,0.14)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-8)',
          }}
        >
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
          <p
            style={{
              fontSize: '15px',
              color: 'rgba(243,239,229,0.65)',
              lineHeight: 1.6,
              marginBottom: 'var(--space-6)',
            }}
          >
            Have a problem worth engineering a solution for? Let&apos;s talk.
          </p>
          <a
            href="#collaborate"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '44px',
              padding: '0 var(--space-6)',
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
            Collaborate with Us
          </a>
        </div>
      </div>

      {/* Bottom fade: navy → canvas */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '110px',
          background: 'linear-gradient(to bottom, transparent, var(--canvas))',
          pointerEvents: 'none',
        }}
      />
    </section>
  )
}
