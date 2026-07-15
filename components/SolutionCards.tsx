'use client'

import { useEffect, useRef } from 'react'
import SolutionCard from '@/components/SolutionCard'
import { maritimeSolutions } from '@/lib/maritimeSolutions'

export default function SolutionCards() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let ctx: { revert?: () => void } | undefined
    const init = async () => {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>('[data-solution-card]')
        gsap.from(cards, {
          opacity: 0,
          y: 48,
          duration: 0.75,
          stagger: 0.14,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 68%',
            onEnter: () => {
              // Safety net: if requestAnimationFrame stalls (backgrounded/throttled tab)
              // right as this section enters view, don't leave the cards stuck near-invisible.
              setTimeout(() => {
                gsap.killTweensOf(cards)
                gsap.set(cards, { clearProps: 'opacity,transform' })
              }, 1800)
            },
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
        {maritimeSolutions.map((sol) => (
          <SolutionCard key={sol.title} solution={sol} />
        ))}
      </div>
    </section>
  )
}
