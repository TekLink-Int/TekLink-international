import Link from 'next/link'

const fintechSolutions = [
  {
    title: 'OCR to ICR',
    description: 'Invoice OCR/ICR with PO reconciliation, validation logs, and reviewer workflows.',
    badges: ['OCR', 'ICR', 'PO Match'],
  },
  {
    title: 'Vendor Select',
    description: 'SAP PO vendor-selection workflow for auditable supplier comparison and approvals.',
    badges: ['SAP PO', 'Vendors', 'Approval'],
  },
  {
    title: 'Commercial Calculator',
    description: 'Margin, ROI, GST, loan, investment, commission, and currency calculation workspace.',
    badges: ['ROI', 'Margin', 'GST'],
  },
  {
    title: 'Fund Management System',
    description: 'Fund accounting, NAV, investor capital, portfolio reporting, and secure portals.',
    badges: ['NAV', 'Ledger', 'Portal'],
  },
  {
    title: 'GRC Application',
    description: 'Governance, risk, and compliance workflows for assessments, audit, and controls.',
    badges: ['Governance', 'Risk', 'Compliance'],
  },
]

export default function FinancialTeaser() {
  return (
    <section
      style={{
        background: 'var(--navy)',
        padding: '80px var(--space-8)',
      }}
    >
      <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 'var(--space-8)',
            marginBottom: '52px',
          }}
        >
          <div>
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
              Page 3
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-ibm-plex-sans, var(--f-sans))',
                fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
                fontWeight: 700,
                color: 'var(--text-on-navy)',
                letterSpacing: '-0.4px',
                lineHeight: 1.1,
              }}
            >
              Fintech Solutions
            </h2>
          </div>

          <Link
            href="/fintech"
            style={{
              height: '44px',
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0 var(--space-6)',
              background: 'var(--accent)',
              color: '#fff',
              border: '1px solid var(--accent)',
              borderRadius: 'var(--radius-md)',
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            Open Fintech
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'var(--space-5)',
          }}
        >
          {fintechSolutions.map((product) => (
            <div
              key={product.title}
              style={{
                background: product.title === 'GRC Application'
                  ? 'rgba(13,110,126,0.16)'
                  : 'rgba(243,239,229,0.04)',
                border: product.title === 'GRC Application'
                  ? '1px solid rgba(107,179,192,0.36)'
                  : '1px solid rgba(243,239,229,0.09)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-6)',
                position: 'relative',
              }}
            >
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: 'var(--text-on-navy)',
                  marginBottom: 'var(--space-3)',
                }}
              >
                {product.title}
              </h3>

              <p
                style={{
                  fontSize: '13px',
                  color: 'rgba(243,239,229,0.58)',
                  lineHeight: 1.6,
                  marginBottom: 'var(--space-5)',
                }}
              >
                {product.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                {product.badges.map((b) => (
                  <span
                    key={b}
                    style={{
                      fontFamily: 'var(--font-ibm-plex-mono, var(--f-mono))',
                      fontSize: '10px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: 'rgba(243,239,229,0.48)',
                      background: 'rgba(243,239,229,0.06)',
                      padding: '2px 7px',
                      borderRadius: 'var(--radius-sm)',
                    }}
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
