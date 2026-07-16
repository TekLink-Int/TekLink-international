'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import SolutionCard, { type Solution } from '@/components/SolutionCard'
import { maritimeSolutions } from '@/lib/maritimeSolutions'

const fintechSolutions: Solution[] = [
  {
    eyebrow: 'Governance',
    title: 'GRC Application',
    description:
      'Governance, risk and compliance workflows for deal assessment, risk registers, audit evidence, and controlled review paths.',
    badges: ['Governance', 'Risk', 'Compliance'],
    audience: 'For control teams',
    url: 'https://risk.teklinkinternational.com',
  },
  {
    eyebrow: 'Procurement Finance',
    title: 'Vendor Select',
    description:
      'SAP PO vendor-selection workflow for comparing suppliers, structuring approvals, and keeping vendor decisions auditable.',
    badges: ['SAP PO', 'Vendors', 'Approvals'],
    audience: 'For procurement teams',
    url: 'https://vendor.teklinkinternational.com',
  },
  {
    eyebrow: 'Commercial Models',
    title: 'Commercial Calculator',
    description:
      'A finance calculator workspace for margins, ROI, GST, commissions, loans, investments, and operating economics.',
    badges: ['ROI', 'Margin', 'GST', 'Currency'],
    audience: 'For commercial teams',
    url: 'https://calculator.teklinkinternational.com',
  },
  {
    eyebrow: 'Asset Management',
    title: 'Fund Management System',
    description:
      'Operational backbone for fund accounting, NAV, investor capital, portfolio reporting, audit trails, and secure portals.',
    badges: ['NAV', 'Ledger', 'Investors', 'Portal'],
    audience: 'For asset managers',
    url: 'https://fund.teklinkinternational.com',
  },
  {
    eyebrow: 'Document Intelligence',
    title: 'OCR to ICR',
    description:
      'Invoice OCR/ICR with purchase-order reconciliation, validation logs, matching logic, and finance-team review workflows.',
    badges: ['OCR', 'ICR', 'PO Match', 'Review'],
    audience: 'For finance operations',
    url: 'https://ocr.teklinkinternational.com',
  },
]

const deeptechSolutions: Solution[] = [
  {
    eyebrow: 'Vision',
    title: 'Deeptech',
    description:
      'A capability lane taking shape beyond software — drones and UAS, semiconductors and embedded systems, robotics and automation, and quantum computing.',
    badges: ['Drones', 'Embedded Systems', 'Robotics', 'Quantum'],
    audience: 'What we’re building toward',
    url: '/deeptech',
    cta: 'Explore Deeptech',
    highlight: true,
  },
]

const groups: { key: string; label: string; viewAllHref: string; solutions: Solution[] }[] = [
  { key: 'maritime', label: 'Maritime', viewAllHref: '/maritime', solutions: maritimeSolutions },
  { key: 'fintech', label: 'Fintech', viewAllHref: '/fintech', solutions: fintechSolutions },
  { key: 'deeptech', label: 'Deeptech', viewAllHref: '/deeptech', solutions: deeptechSolutions },
]

export default function SolutionsCatalog() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let ctx: { revert?: () => void } | undefined
    const init = async () => {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>('[data-catalog-group]').forEach((group) => {
          const cards = group.querySelectorAll('[data-solution-card]')
          gsap.from(cards, {
            opacity: 0,
            y: 40,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: group,
              start: 'top 78%',
              onEnter: () => {
                // Safety net: if requestAnimationFrame stalls (backgrounded/throttled tab)
                // right as this group enters view, don't leave the cards stuck near-invisible.
                setTimeout(() => {
                  gsap.killTweensOf(cards)
                  gsap.set(cards, { clearProps: 'opacity,transform' })
                }, 1800)
              },
            },
          })
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
        padding: '96px var(--space-8) var(--space-16)',
      }}
    >
      <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
        <div style={{ marginBottom: '64px', textAlign: 'center' }}>
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
            What We Build
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-ibm-plex-sans, var(--f-sans))',
              fontSize: 'clamp(1.7rem, 3.2vw, 2.5rem)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              letterSpacing: '-0.4px',
              lineHeight: 1.1,
            }}
          >
            A catalogue of solutions, across every platform
          </h2>
        </div>

        {groups.map((group) => (
          <div key={group.key} data-catalog-group style={{ marginBottom: '72px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 'var(--space-4)',
                marginBottom: 'var(--space-6)',
              }}
            >
              <h3
                style={{
                  fontSize: '28px',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.4px',
                }}
              >
                {group.label}
              </h3>
              <Link
                href={group.viewAllHref}
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--accent-ink)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  marginTop: '4px',
                  whiteSpace: 'nowrap',
                }}
              >
                View all in {group.label}
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2.5 7h9M8 3.5l3.5 3.5-3.5 3.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 'var(--space-6)',
              }}
            >
              {group.solutions.map((sol) => (
                <SolutionCard key={sol.title} solution={sol} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
