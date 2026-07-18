'use client'

import Link from 'next/link'
import { useState } from 'react'

import { calculateDemurrageExposure } from '@/lib/demurrageExposure'

const inputBase: React.CSSProperties = {
  width: '100%',
  height: '46px',
  padding: '0 var(--space-4)',
  background: 'var(--surface)',
  border: '1px solid var(--border-strong)',
  borderRadius: 'var(--radius-md)',
  color: 'var(--text-primary)',
  fontSize: '14px',
  fontFamily: 'var(--font-ibm-plex-sans, var(--f-sans))',
  outline: 'none',
}

const initialFields = {
  allowedLaytimeHours: '',
  actualTimeUsedHours: '',
  demurrageRatePerDay: '',
  excludableHours: '',
  cargoQuantityTons: '',
}

type FieldName = keyof typeof initialFields

export default function DemurrageExposureEstimator() {
  const [fields, setFields] = useState(initialFields)

  const hasRequiredInputs = Boolean(
    fields.allowedLaytimeHours && fields.actualTimeUsedHours && fields.demurrageRatePerDay
  )

  const estimate = hasRequiredInputs
    ? calculateDemurrageExposure({
        allowedLaytimeHours: Number(fields.allowedLaytimeHours),
        actualTimeUsedHours: Number(fields.actualTimeUsedHours),
        demurrageRatePerDay: Number(fields.demurrageRatePerDay),
        excludableHours: fields.excludableHours ? Number(fields.excludableHours) : undefined,
        cargoQuantityTons: fields.cargoQuantityTons ? Number(fields.cargoQuantityTons) : undefined,
      })
    : null

  const handleFieldChange = (field: FieldName) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value
    if (nextValue === '' || /^\d*\.?\d*$/.test(nextValue)) {
      setFields((current) => ({ ...current, [field]: nextValue }))
    }
  }

  return (
    <section
      style={{
        background: 'var(--canvas)',
        padding: '0 var(--space-8) 88px',
      }}
    >
      <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
        <div
          className="demurrage-estimator-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.08fr 0.92fr',
            gap: 'var(--space-8)',
            alignItems: 'stretch',
          }}
        >
          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border-strong)',
              borderRadius: 'var(--radius-2xl)',
              padding: 'var(--space-8)',
              boxShadow: 'var(--shadow-sm)',
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
                marginBottom: 'var(--space-4)',
              }}
            >
              Operational Utility
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-ibm-plex-sans, var(--f-sans))',
                fontSize: 'clamp(1.65rem, 3vw, 2.35rem)',
                fontWeight: 700,
                color: 'var(--text-primary)',
                letterSpacing: '-0.4px',
                lineHeight: 1.1,
                maxWidth: '34rem',
                marginBottom: 'var(--space-5)',
              }}
            >
              Estimate demurrage exposure before time at berth turns into cost
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                maxWidth: '38rem',
                marginBottom: 'var(--space-8)',
              }}
            >
              Port delays do not stay operational for long. They become commercial
              exposure. This estimator gives a quick view of how excess laytime can
              translate into demurrage cost, using a small set of working assumptions.
            </p>

            <div
              className="demurrage-estimator-fields"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gap: 'var(--space-4)',
              }}
            >
              <EstimatorField
                id="allowed-laytime-hours"
                label="Allowed laytime (hours)"
                value={fields.allowedLaytimeHours}
                onChange={handleFieldChange('allowedLaytimeHours')}
              />
              <EstimatorField
                id="actual-time-used-hours"
                label="Actual time used (hours)"
                value={fields.actualTimeUsedHours}
                onChange={handleFieldChange('actualTimeUsedHours')}
              />
              <EstimatorField
                id="demurrage-rate-per-day"
                label="Demurrage rate (per day)"
                value={fields.demurrageRatePerDay}
                onChange={handleFieldChange('demurrageRatePerDay')}
              />
              <EstimatorField
                id="excludable-hours"
                label="Excludable hours"
                value={fields.excludableHours}
                onChange={handleFieldChange('excludableHours')}
                hint="Optional. Use for weather, stoppages, or time you do not want counted in this early estimate."
              />
              <EstimatorField
                id="cargo-quantity-tons"
                label="Cargo quantity (tons)"
                value={fields.cargoQuantityTons}
                onChange={handleFieldChange('cargoQuantityTons')}
                hint="Optional. Adds a cost-per-ton view when entered."
              />
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 'var(--space-4)',
                flexWrap: 'wrap',
                marginTop: 'var(--space-6)',
              }}
            >
              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--text-muted)',
                  lineHeight: 1.6,
                }}
              >
                Results update live as you enter values.
              </p>
              <button
                type="button"
                onClick={() => setFields(initialFields)}
                style={{
                  height: '40px',
                  padding: '0 var(--space-5)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-strong)',
                  background: 'transparent',
                  color: 'var(--text-primary)',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Reset
              </button>
            </div>
          </div>

          <div
            style={{
              background: 'var(--navy)',
              border: '1px solid rgba(243,239,229,0.1)',
              borderRadius: 'var(--radius-2xl)',
              padding: 'var(--space-8)',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 'var(--space-6)',
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
                Estimated Exposure
              </p>

              {estimate ? (
                <>
                  <p
                    style={{
                      fontFamily: 'var(--font-ibm-plex-sans, var(--f-sans))',
                      fontSize: 'clamp(2.05rem, 4vw, 3rem)',
                      fontWeight: 700,
                      lineHeight: 1,
                      letterSpacing: '-0.06em',
                      color: 'var(--text-on-navy)',
                      marginBottom: 'var(--space-3)',
                    }}
                  >
                    {formatAmount(estimate.estimatedDemurrage)}
                  </p>
                  <p
                    style={{
                      fontSize: '13px',
                      color: 'rgba(243,239,229,0.58)',
                      lineHeight: 1.6,
                      marginBottom: 'var(--space-6)',
                    }}
                  >
                    Same currency basis as the daily rate entered above.
                  </p>

                  <div
                    style={{
                      display: 'grid',
                      gap: 'var(--space-3)',
                    }}
                  >
                    <ResultRow label="Net counted time" value={`${formatAmount(estimate.netUsedHours)} hours`} />
                    <ResultRow label="Excess laytime" value={`${formatAmount(estimate.excessHours)} hours`} />
                    <ResultRow
                      label="Formula"
                      value={`${fields.actualTimeUsedHours || '0'} - ${fields.excludableHours || '0'} -> ${formatAmount(estimate.netUsedHours)} hours`}
                    />
                    {estimate.costPerTon !== null && (
                      <ResultRow
                        label="Estimated cost per ton"
                        value={formatAmount(estimate.costPerTon)}
                      />
                    )}
                  </div>
                </>
              ) : (
                <div
                  style={{
                    padding: 'var(--space-6)',
                    borderRadius: 'var(--radius-xl)',
                    border: '1px solid rgba(243,239,229,0.1)',
                    background: 'rgba(243,239,229,0.04)',
                  }}
                >
                  <p
                    style={{
                      fontSize: '16px',
                      fontWeight: 600,
                      color: 'var(--text-on-navy)',
                      marginBottom: 'var(--space-3)',
                    }}
                  >
                    Enter your working assumptions
                  </p>
                  <p
                    style={{
                      fontSize: '14px',
                      color: 'rgba(243,239,229,0.62)',
                      lineHeight: 1.7,
                    }}
                  >
                    Add allowed laytime, actual time used, and a daily rate to
                    generate an operational estimate.
                  </p>
                </div>
              )}
            </div>

            <div
              style={{
                paddingTop: 'var(--space-5)',
                borderTop: '1px solid rgba(243,239,229,0.1)',
              }}
            >
              <p
                style={{
                  fontSize: '13px',
                  color: 'rgba(243,239,229,0.6)',
                  lineHeight: 1.7,
                  marginBottom: 'var(--space-5)',
                }}
              >
                This is an operational estimate for early visibility. Final
                demurrage treatment depends on charterparty terms, records, and
                agreed exceptions.
              </p>
              <Link
                href="/#collaborate"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--accent-soft)',
                }}
              >
                Need stronger control across port events, documents, and commercial workflows?
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
          </div>
        </div>
      </div>
    </section>
  )
}

function EstimatorField({
  id,
  label,
  value,
  onChange,
  hint,
}: {
  id: string
  label: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  hint?: string
}) {
  return (
    <label htmlFor={id} style={{ display: 'grid', gap: '10px' }}>
      <span
        style={{
          fontSize: '13px',
          fontWeight: 600,
          color: 'var(--text-primary)',
        }}
      >
        {label}
      </span>
      <input
        id={id}
        type="text"
        inputMode="decimal"
        value={value}
        onChange={onChange}
        style={inputBase}
      />
      {hint ? (
        <span
          style={{
            fontSize: '12px',
            color: 'var(--text-muted)',
            lineHeight: 1.5,
            marginTop: '-2px',
          }}
        >
          {hint}
        </span>
      ) : null}
    </label>
  )
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        gap: 'var(--space-4)',
        paddingBottom: 'var(--space-3)',
        borderBottom: '1px solid rgba(243,239,229,0.08)',
      }}
    >
      <span style={{ fontSize: '13px', color: 'rgba(243,239,229,0.6)' }}>{label}</span>
      <span
        style={{
          fontSize: '14px',
          fontWeight: 600,
          color: 'var(--text-on-navy)',
          textAlign: 'right',
        }}
      >
        {value}
      </span>
    </div>
  )
}

function formatAmount(value: number) {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })
}
