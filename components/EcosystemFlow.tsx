'use client'

import { Fragment, useEffect, useRef } from 'react'

const steps = [
  {
    number: '01',
    label: 'Commodity Hedging and Trading',
    description: 'Model exposure, hedge scenarios, and landed cost visibility before freight moves.',
    platform: 'Commodity Hedging and Trading',
  },
  {
    number: '02',
    label: 'Book Freight',
    description: 'Connect shippers with carriers for seamless cargo movement across routes.',
    platform: 'Freight Marketplace',
  },
  {
    number: '03',
    label: 'Charter a Vessel',
    description: 'Match cargo inquiries with available vessels through structured negotiation.',
    platform: 'Ship Chartering',
  },
  {
    number: '04',
    label: 'Assess Feasibility',
    description: 'Model the full financial feasibility of vessel ownership before you commit.',
    platform: 'Bareboat chartering and ship owning feasibility',
  },
]

export default function EcosystemFlow() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let ctx: { revert?: () => void } | undefined
    const init = async () => {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      // Safety net: if requestAnimationFrame stalls (backgrounded/throttled tab) right as a
      // trigger fires, don't leave these elements stuck mid-animation (faded / collapsed).
      const reveal = (targets: HTMLElement[] | NodeListOf<Element>, clearProps: string) => () => {
        setTimeout(() => {
          gsap.killTweensOf(targets)
          gsap.set(targets, { clearProps })
        }, 1800)
      }

      ctx = gsap.context(() => {
        const steps = gsap.utils.toArray<HTMLElement>('[data-flow-step]')
        gsap.from(steps, {
          opacity: 0,
          y: 36,
          duration: 0.7,
          stagger: 0.18,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
            onEnter: reveal(steps, 'opacity,transform'),
          },
        })

        const lines = gsap.utils.toArray<HTMLElement>('[data-flow-line]')
        gsap.from(lines, {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 1.1,
          stagger: 0.2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 68%',
            onEnter: reveal(lines, 'transform'),
          },
        })

        const header = gsap.utils.toArray<HTMLElement>('[data-flow-header]')
        gsap.from(header, {
          opacity: 0,
          y: 24,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            onEnter: reveal(header, 'opacity,transform'),
          },
        })
      }, sectionRef)
    }
    init()
    return () => ctx?.revert?.()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--canvas)',
        padding: '80px var(--space-8) 72px',
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .flow-connector { display: none !important; }
          .flow-grid { flex-direction: column !important; gap: 32px !important; }
          .flow-step { text-align: center; }
        }
      `}</style>

      <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
        {/* Section header */}
        <div data-flow-header style={{ textAlign: 'center', marginBottom: '56px' }}>
          <p
            style={{
              fontFamily: 'var(--font-ibm-plex-mono, var(--f-mono))',
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: 'var(--accent)',
              marginBottom: 'var(--space-4)',
            }}
          >
            The Journey
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-ibm-plex-sans, var(--f-sans))',
              fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              letterSpacing: '-0.4px',
              lineHeight: 1.1,
            }}
          >
            This platform, which is a portfolio of solutions, is a full ecosystem.
          </h2>
        </div>

        {/* Flow row */}
        <div
          className="flow-grid"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0',
          }}
        >
          {steps.map((step, i) => (
            <Fragment key={step.number}>
              {/* Step */}
              <div
                data-flow-step
                className="flow-step"
                style={{ flex: 1, padding: '0 var(--space-6)' }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    background: 'var(--navy)',
                    marginBottom: 'var(--space-5)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-ibm-plex-mono, var(--f-mono))',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: 'var(--accent-soft)',
                    }}
                  >
                    {step.number}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: 'var(--space-2)',
                    letterSpacing: '-0.2px',
                  }}
                >
                  {step.label}
                </h3>

                <p
                  style={{
                    fontSize: '13px',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.65,
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  {step.description}
                </p>

                <span
                  style={{
                    display: 'inline-block',
                    fontFamily: 'var(--font-ibm-plex-mono, var(--f-mono))',
                    fontSize: '11px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'var(--accent)',
                    background: 'var(--accent-dim)',
                    padding: '3px 10px',
                    borderRadius: 'var(--radius-sm)',
                  }}
                >
                  {step.platform}
                </span>
              </div>

              {/* Connector */}
              {i < steps.length - 1 && (
                <div
                  key={`conn-${i}`}
                  className="flow-connector"
                  data-flow-line
                  style={{
                    flexShrink: 0,
                    width: '64px',
                    height: '2px',
                    background: `linear-gradient(to right, var(--navy), var(--accent-soft))`,
                    position: 'relative',
                    transformOrigin: 'left center',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      right: '-5px',
                      top: '50%',
                      transform: 'translateY(-50%) rotate(45deg)',
                      width: '7px',
                      height: '7px',
                      borderTop: '2px solid var(--accent-soft)',
                      borderRight: '2px solid var(--accent-soft)',
                    }}
                  />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
