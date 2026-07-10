'use client'

import { useEffect, useRef } from 'react'

const solutions = [
  {
    eyebrow: 'Maritime Freight',
    title: 'BharatFreight',
    description:
      'A B2B freight marketplace connecting shippers and carriers with real-time tracking, SAP/ERP integration, and a full document management suite.',
    badges: ['Shipper Dashboard', 'Carrier Portal', 'Live Tracking', 'ERP Integration'],
    audience: 'For shippers & carriers',
    url: 'https://freight.teklink.com.au',
  },
  {
    eyebrow: 'Vessel Chartering',
    title: 'Ship Chartering',
    description:
      'Multi-role chartering platform for managing cargo inquiries, vessel matching, structured negotiations, and fixture tracking — built for the full chartering workflow.',
    badges: ['Charterer', 'Shipowner', 'Broker', 'Admin'],
    audience: 'For charterers & owners',
    url: 'https://shipchartering.teklink.com.au',
  },
  {
    eyebrow: 'Vessel Acquisition',
    title: 'Ship Feasibility',
    description:
      'Financial feasibility analysis for vessel purchases. Model acquisition costs, operating economics, and return scenarios — then export a full report before you commit.',
    badges: ['Cost Modelling', 'ROI Analysis', 'PDF Export'],
    audience: 'For buyers & investors',
    url: 'https://ship.feasibility.teklink.com.au',
  },
  {
    eyebrow: 'Commodity Risk',
    title: 'Iron Ore Hedging',
    description:
      'Iron ore exposure workspace for cargo economics, hedge scenarios, landed cost analysis, and effective cost visibility.',
    badges: ['Exposure', 'Hedging', 'Scenario Analysis'],
    audience: 'For operators & traders',
    url: '#collaborate',
    cta: 'Discuss Platform',
  },
]

export default function SolutionCards() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let ctx: { revert?: () => void } | undefined
    const init = async () => {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap.from('[data-solution-card]', {
          opacity: 0,
          y: 48,
          duration: 0.75,
          stagger: 0.14,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 68%',
          },
        })
      }, sectionRef)
    }
    init()
    return () => ctx?.revert?.()
  }, [])

  return (
    <section
      id="solutions"
      ref={sectionRef}
      style={{
        background: 'var(--canvas)',
        padding: '32px var(--space-8) var(--space-16)',
      }}
    >
      <div
        style={{
          maxWidth: '72rem',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'var(--space-6)',
        }}
      >
        {solutions.map((sol) => (
          <SolutionCard key={sol.title} solution={sol} />
        ))}
      </div>
    </section>
  )
}

function SolutionCard({ solution }: { solution: (typeof solutions)[0] }) {
  const isExternal = solution.url.startsWith('http')

  return (
    <a
      data-solution-card
      href={solution.url}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--surface)',
        border: '1px solid var(--border-strong)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-6)',
        boxShadow: 'var(--shadow-sm)',
        cursor: 'pointer',
        transition: 'box-shadow 0.25s, border-color 0.25s, transform 0.25s',
        textDecoration: 'none',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-md)'
        e.currentTarget.style.borderColor = 'var(--accent)'
        e.currentTarget.style.transform = 'translateY(-3px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
        e.currentTarget.style.borderColor = 'var(--border-strong)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {/* Eyebrow */}
      <p
        style={{
          fontFamily: 'var(--font-ibm-plex-mono, var(--f-mono))',
          fontSize: '11px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--accent)',
          marginBottom: 'var(--space-3)',
        }}
      >
        {solution.eyebrow}
      </p>

      {/* Title */}
      <h3
        style={{
          fontSize: '22px',
          fontWeight: 700,
          color: 'var(--text-primary)',
          letterSpacing: '-0.3px',
          marginBottom: 'var(--space-3)',
        }}
      >
        {solution.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: '14px',
          color: 'var(--text-secondary)',
          lineHeight: 1.65,
          marginBottom: 'var(--space-5)',
          flex: 1,
        }}
      >
        {solution.description}
      </p>

      {/* Divider */}
      <div style={{ height: '1px', background: 'var(--border)', marginBottom: 'var(--space-5)' }} />

      {/* Badges */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--space-2)',
          marginBottom: 'var(--space-6)',
        }}
      >
        {solution.badges.map((badge) => (
          <span
            key={badge}
            style={{
              fontFamily: 'var(--font-ibm-plex-mono, var(--f-mono))',
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--text-muted)',
              background: 'var(--sunken)',
              padding: '3px 9px',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            {badge}
          </span>
        ))}
      </div>

      {/* Footer row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{solution.audience}</span>
        <span
          style={{
            fontSize: '13px',
            fontWeight: 600,
            color: 'var(--accent-ink)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          {solution.cta ?? 'Open Platform'}
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <path
              d="M2.5 7h9M8 3.5l3.5 3.5-3.5 3.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </a>
  )
}
