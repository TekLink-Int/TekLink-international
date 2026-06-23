export default function About() {
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
          TekLink builds connected technology for the maritime industry — from logistics
          to chartering to vessel acquisition. Three platforms. One ecosystem. Built end to end.
        </p>
      </div>
    </section>
  )
}
