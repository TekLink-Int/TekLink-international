export default function CompanyIntro() {
  return (
    <section
      style={{
        background: 'var(--sunken)',
        padding: '72px var(--space-8)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div style={{ maxWidth: '48rem', margin: '0 auto', textAlign: 'center' }}>
        <p
          style={{
            fontFamily: 'var(--font-ibm-plex-mono, var(--f-mono))',
            fontSize: '11px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: 'var(--accent)',
            marginBottom: 'var(--space-5)',
          }}
        >
          About TekLink
        </p>
        <p
          style={{
            fontSize: '20px',
            fontWeight: 400,
            color: 'var(--text-primary)',
            lineHeight: 1.65,
          }}
        >
          TekLink is an engineering company. We work across every discipline — software,
          hardware, and everything in between — building platforms that span industries,
          from maritime trade to fintech to deeptech. One team. Many technologies. Real
          solutions for real problems.
        </p>
      </div>
    </section>
  )
}
