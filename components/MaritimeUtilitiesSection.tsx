import DemurrageExposureEstimator from '@/components/DemurrageExposureEstimator'
import VoyageMarginEstimator from '@/components/VoyageMarginEstimator'

export default function MaritimeUtilitiesSection() {
  return (
    <section
      style={{
        background: 'var(--canvas)',
        padding: '0 var(--space-8) 60px',
      }}
    >
      <div
        style={{
          maxWidth: '72rem',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            maxWidth: '42rem',
            marginBottom: '24px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-ibm-plex-mono, var(--f-mono))',
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: 'var(--accent)',
              marginBottom: '10px',
            }}
          >
            Operational and Commercial Utilities
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-ibm-plex-sans, var(--f-sans))',
              fontSize: 'clamp(1.9rem, 3.2vw, 2.7rem)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              letterSpacing: '-0.05em',
              lineHeight: 1.08,
              marginBottom: '12px',
            }}
          >
            Two fast estimators for delay exposure and voyage economics
          </h2>
          <p
            style={{
              fontSize: '15px',
              color: 'var(--text-secondary)',
              lineHeight: 1.66,
            }}
          >
            TekLink understands both operational leakage and voyage economics.
            These two utilities give fast, practical early estimates without
            pretending to replace settlement or accounting workflows.
          </p>
        </div>

        <div
          className="maritime-utilities-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: 'var(--space-8)',
            alignItems: 'stretch',
          }}
        >
          <DemurrageExposureEstimator />
          <VoyageMarginEstimator />
        </div>
      </div>
    </section>
  )
}
