import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

export type IndustrySolution = {
  eyebrow: string
  title: string
  description: string
  badges: string[]
  audience: string
  highlight?: boolean
  url?: string
}

type IndustryPageProps = {
  eyebrow: string
  title: string
  accent: string
  description: string
  solutions: IndustrySolution[]
}

export default function IndustryPage({
  eyebrow,
  title,
  accent,
  description,
  solutions,
}: IndustryPageProps) {
  return (
    <main style={{ overflowX: 'hidden', width: '100%', maxWidth: '100%', background: 'var(--canvas)' }}>
      <Navbar />
      <section
        style={{
          background: 'var(--navy)',
          backgroundImage: `
            radial-gradient(ellipse at 72% 34%, rgba(13,110,126,0.17) 0%, transparent 58%),
            radial-gradient(ellipse at 18% 78%, rgba(13,110,126,0.08) 0%, transparent 48%)
          `,
          padding: '128px var(--space-8) 78px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <p
            style={{
              fontFamily: 'var(--font-ibm-plex-mono, var(--f-mono))',
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: 'var(--accent-soft)',
              marginBottom: 'var(--space-5)',
            }}
          >
            {eyebrow}
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-ibm-plex-sans, var(--f-sans))',
              fontSize: 'clamp(2.25rem, 5vw, 3.55rem)',
              fontWeight: 700,
              color: 'var(--text-on-navy)',
              maxWidth: '48rem',
              lineHeight: 1.05,
              letterSpacing: '-0.6px',
              marginBottom: 'var(--space-6)',
            }}
          >
            {title} <span style={{ color: 'var(--accent-soft)' }}>{accent}</span>
          </h1>
          <p
            style={{
              fontSize: '17px',
              color: 'rgba(243,239,229,0.62)',
              maxWidth: '42rem',
              lineHeight: 1.65,
            }}
          >
            {description}
          </p>
        </div>
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

      <section style={{ padding: '36px var(--space-8) var(--space-16)' }}>
        <div
          style={{
            maxWidth: '72rem',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 'var(--space-6)',
          }}
        >
          {solutions.map((solution) => (
            <IndustryCard key={solution.title} solution={solution} />
          ))}
        </div>
      </section>
      <Footer />
    </main>
  )
}

function IndustryCard({ solution }: { solution: IndustrySolution }) {
  const cardStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    background: solution.highlight ? 'var(--navy)' : 'var(--surface)',
    border: solution.highlight ? '1px solid var(--accent)' : '1px solid var(--border-strong)',
    borderRadius: 'var(--radius-xl)',
    padding: 'var(--space-6)',
    boxShadow: solution.highlight ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
    textDecoration: 'none',
    minHeight: '100%',
  }

  const content = (
    <>
      <p
        style={{
          fontFamily: 'var(--font-ibm-plex-mono, var(--f-mono))',
          fontSize: '11px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: solution.highlight ? 'var(--accent-soft)' : 'var(--accent)',
          marginBottom: 'var(--space-3)',
        }}
      >
        {solution.eyebrow}
      </p>
      <h2
        style={{
          fontSize: '22px',
          fontWeight: 700,
          color: solution.highlight ? 'var(--text-on-navy)' : 'var(--text-primary)',
          letterSpacing: '-0.3px',
          marginBottom: 'var(--space-3)',
        }}
      >
        {solution.title}
      </h2>
      <p
        style={{
          fontSize: '14px',
          color: solution.highlight ? 'rgba(243,239,229,0.68)' : 'var(--text-secondary)',
          lineHeight: 1.65,
          marginBottom: 'var(--space-5)',
          flex: 1,
        }}
      >
        {solution.description}
      </p>
      <div
        style={{
          height: '1px',
          background: solution.highlight ? 'rgba(243,239,229,0.12)' : 'var(--border)',
          marginBottom: 'var(--space-5)',
        }}
      />
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
              color: solution.highlight ? 'rgba(243,239,229,0.62)' : 'var(--text-muted)',
              background: solution.highlight ? 'rgba(243,239,229,0.07)' : 'var(--sunken)',
              padding: '3px 9px',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            {badge}
          </span>
        ))}
      </div>
      <span
        style={{
          fontSize: '12px',
          color: solution.highlight ? 'rgba(243,239,229,0.45)' : 'var(--text-muted)',
        }}
      >
        {solution.audience}
      </span>
    </>
  )

  if (solution.url) {
    return (
      <a href={solution.url} target="_blank" rel="noopener noreferrer" style={cardStyle}>
        {content}
      </a>
    )
  }

  return (
    <article style={cardStyle}>
      {content}
    </article>
  )
}
