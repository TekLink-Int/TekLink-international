'use client'

import Image from 'next/image'
import { useState } from 'react'

export type PreviewImage = {
  src: string
  alt: string
  label: string
}

export type Solution = {
  eyebrow: string
  title: string
  description: string
  badges: string[]
  audience: string
  url: string
  cta?: string
  previewImages?: PreviewImage[]
  highlight?: boolean
}

export default function SolutionCard({ solution }: { solution: Solution }) {
  const isExternal = solution.url.startsWith('http')
  const highlight = solution.highlight

  return (
    <a
      data-solution-card
      href={solution.url}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: highlight ? 'var(--navy)' : 'var(--surface)',
        border: highlight ? '1px solid var(--accent)' : '1px solid var(--border-strong)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-6)',
        boxShadow: highlight ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
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
        e.currentTarget.style.boxShadow = highlight ? 'var(--shadow-lg)' : 'var(--shadow-sm)'
        e.currentTarget.style.borderColor = highlight ? 'var(--accent)' : 'var(--border-strong)'
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
          color: highlight ? 'var(--accent-soft)' : 'var(--accent)',
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
          color: highlight ? 'var(--text-on-navy)' : 'var(--text-primary)',
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
          color: highlight ? 'rgba(243,239,229,0.68)' : 'var(--text-secondary)',
          lineHeight: 1.65,
          marginBottom: 'var(--space-5)',
          flex: 1,
        }}
      >
        {solution.description}
      </p>

      {solution.previewImages && <SolutionPreviewStack images={solution.previewImages} />}

      {/* Divider */}
      <div
        style={{
          height: '1px',
          background: highlight ? 'rgba(243,239,229,0.12)' : 'var(--border)',
          marginBottom: 'var(--space-5)',
        }}
      />

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
              color: highlight ? 'rgba(243,239,229,0.62)' : 'var(--text-muted)',
              background: highlight ? 'rgba(243,239,229,0.07)' : 'var(--sunken)',
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
        <span style={{ fontSize: '12px', color: highlight ? 'rgba(243,239,229,0.45)' : 'var(--text-muted)' }}>
          {solution.audience}
        </span>
        <span
          style={{
            fontSize: '13px',
            fontWeight: 600,
            color: highlight ? 'var(--accent-soft)' : 'var(--accent-ink)',
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

function SolutionPreviewStack({ images }: { images: PreviewImage[] }) {
  const [isHovered, setIsHovered] = useState(false)
  const [frontCardIndex, setFrontCardIndex] = useState<number | null>(null)

  return (
    <div
      style={{
        marginBottom: 'var(--space-5)',
        padding: '10px 0 4px',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16 / 9',
          perspective: '950px',
        }}
      >
        {images.map((image, index) => {
          const isFront = frontCardIndex === index
          const isDimmed = frontCardIndex !== null && !isFront
          const restingOffset = index * 8
          const transform = isFront
            ? 'translate3d(0, -8px, 42px) scale(1.07) rotateY(0deg)'
            : isHovered
              ? `translate3d(${index * 18}px, ${index * -5}px, ${index * 14}px) rotateY(-22deg) scale(1.02)`
              : `translate3d(${restingOffset}px, ${index * 7}px, 0) rotateY(0deg) scale(${1 - index * 0.035})`

          return (
            <div
              key={image.src}
              role="button"
              tabIndex={0}
              aria-label={`Preview ${image.label}`}
              onClick={(event) => {
                event.preventDefault()
                setFrontCardIndex((previous) => (previous === index ? null : index))
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  setFrontCardIndex((previous) => (previous === index ? null : index))
                }
              }}
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: isFront ? 20 : images.length - index,
                overflow: 'hidden',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(6,18,30,0.14)',
                background: 'var(--sunken)',
                boxShadow: isFront
                  ? '0 24px 44px rgba(6,18,30,0.26)'
                  : '0 12px 28px rgba(6,18,30,0.13)',
                cursor: 'zoom-in',
                filter: isDimmed ? 'blur(3px) saturate(0.75)' : 'none',
                opacity: isDimmed ? 0.72 : 1,
                transform,
                transformStyle: 'preserve-3d',
                transformOrigin: 'left center',
                transition:
                  'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s ease, filter 0.3s ease, opacity 0.3s ease',
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 90vw, 320px"
                style={{ objectFit: 'cover' }}
              />
              <span
                style={{
                  position: 'absolute',
                  left: '10px',
                  bottom: '10px',
                  fontFamily: 'var(--font-ibm-plex-mono, var(--f-mono))',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#fff',
                  background: 'rgba(6,18,30,0.72)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '4px 8px',
                }}
              >
                {image.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
