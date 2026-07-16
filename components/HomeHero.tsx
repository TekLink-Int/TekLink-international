'use client'

import Image from 'next/image'
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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '150px var(--space-8) 96px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Image
        src="/hero-background.png"
        alt=""
        fill
        priority
        sizes="100vw"
        style={{ objectFit: 'cover', zIndex: 0 }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(rgba(6,18,30,0.58), rgba(6,18,30,0.7))',
          zIndex: 1,
        }}
      />

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
          position: 'relative',
          zIndex: 2,
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
            This is a <span style={{ color: 'var(--accent-soft)' }}>platform</span> for everything
            end-to-end related to <span style={{ color: 'var(--accent-soft)' }}>Shipping</span> and{' '}
            <span style={{ color: 'var(--accent-soft)' }}>Ports</span>, core and connected.
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
            background:
              'linear-gradient(180deg, rgba(12,28,40,0.78) 0%, rgba(8,20,31,0.9) 100%)',
            border: '1px solid rgba(243,239,229,0.12)',
            borderRadius: 'var(--radius-xl)',
            padding: 'calc(var(--space-8) + 4px)',
            boxShadow: '0 22px 44px rgba(3,10,18,0.28), inset 0 1px 0 rgba(243,239,229,0.06)',
            maxWidth: '24rem',
            justifySelf: 'end',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 'var(--space-8)',
              right: 'var(--space-8)',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(107,179,192,0.72), transparent)',
            }}
          />
          <p
            style={{
              fontFamily: 'var(--font-ibm-plex-mono, var(--f-mono))',
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: 'var(--accent-soft)',
              marginBottom: 'var(--space-5)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 10px',
              borderRadius: '999px',
              background: 'rgba(107,179,192,0.08)',
              border: '1px solid rgba(107,179,192,0.16)',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--accent-soft)',
                boxShadow: '0 0 0 4px rgba(107,179,192,0.12)',
                display: 'inline-block',
              }}
            />
            Collaborate
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-ibm-plex-sans, var(--f-sans))',
              fontSize: 'clamp(1.2rem, 1.8vw, 1.5rem)',
              fontWeight: 650,
              lineHeight: 1.2,
              letterSpacing: '-0.3px',
              color: 'var(--text-on-navy)',
              marginBottom: 'var(--space-4)',
            }}
          >
            Build something worth shipping.
          </h2>
          <p
            style={{
              fontSize: '15px',
              color: 'rgba(243,239,229,0.7)',
              lineHeight: 1.7,
              marginBottom: 'var(--space-7)',
              maxWidth: '20rem',
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
              height: '48px',
              padding: '0 var(--space-6)',
              background: 'var(--accent)',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 600,
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--accent)',
              boxShadow: '0 10px 22px rgba(13,110,126,0.24)',
              transition: 'background 0.2s, border-color 0.2s, transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--accent-ink)'
              e.currentTarget.style.borderColor = 'var(--accent-ink)'
              e.currentTarget.style.transform = 'translateY(-1px)'
              e.currentTarget.style.boxShadow = '0 14px 28px rgba(13,110,126,0.28)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--accent)'
              e.currentTarget.style.borderColor = 'var(--accent)'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 10px 22px rgba(13,110,126,0.24)'
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
          zIndex: 2,
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
