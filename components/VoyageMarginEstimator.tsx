'use client'

import { useState } from 'react'

import { calculateVoyageMargin } from '@/lib/voyageMargin'

const inputBase: React.CSSProperties = {
  width: '100%',
  height: '42px',
  padding: '0 14px',
  background: 'var(--surface)',
  border: '1px solid var(--border-strong)',
  borderRadius: 'var(--radius-md)',
  color: 'var(--text-primary)',
  fontSize: '13px',
  fontFamily: 'var(--font-ibm-plex-sans, var(--f-sans))',
  outline: 'none',
}

const fieldShellBase: React.CSSProperties = {
  display: 'grid',
  gap: '8px',
  alignContent: 'start',
  minHeight: '112px',
  padding: '10px 14px',
  background: 'rgba(27,42,58,0.03)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius-lg)',
}

const toolCardBase: React.CSSProperties = {
  background: 'var(--surface)',
  border: '1px solid var(--border-strong)',
  borderRadius: 'var(--radius-2xl)',
  padding: '20px 24px',
  boxShadow: 'var(--shadow-sm)',
  display: 'grid',
  gap: '16px',
  alignContent: 'start',
  height: '100%',
}

const resultCardBase: React.CSSProperties = {
  background: 'var(--navy)',
  border: '1px solid rgba(243,239,229,0.1)',
  borderRadius: 'var(--radius-xl)',
  padding: '16px',
  boxShadow: 'var(--shadow-lg)',
  display: 'grid',
  gap: '12px',
}

const initialFields = {
  cargoQuantityTons: '',
  freightRatePerTon: '',
  bunkerCost: '',
  portCost: '',
  delayCost: '',
  otherVoyageCost: '',
}

type FieldName = keyof typeof initialFields

export default function VoyageMarginEstimator() {
  const [fields, setFields] = useState(initialFields)

  const hasRequiredInputs = Boolean(
    fields.cargoQuantityTons &&
      fields.freightRatePerTon &&
      fields.bunkerCost &&
      fields.portCost &&
      fields.delayCost
  )

  const estimate = hasRequiredInputs
    ? calculateVoyageMargin({
        cargoQuantityTons: Number(fields.cargoQuantityTons),
        freightRatePerTon: Number(fields.freightRatePerTon),
        bunkerCost: Number(fields.bunkerCost),
        portCost: Number(fields.portCost),
        delayCost: Number(fields.delayCost),
        otherVoyageCost: fields.otherVoyageCost ? Number(fields.otherVoyageCost) : undefined,
      })
    : null

  const handleFieldChange = (field: FieldName) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value
    if (nextValue === '' || /^\d*\.?\d*$/.test(nextValue)) {
      setFields((current) => ({ ...current, [field]: nextValue }))
    }
  }

  const marginColor =
    estimate && estimate.voyageMargin < 0 ? 'rgb(240, 179, 165)' : 'var(--text-on-navy)'

  return (
    <article style={toolCardBase}>
      <div>
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
          Commercial estimator
        </p>
        <h3
          style={{
            fontFamily: 'var(--font-ibm-plex-sans, var(--f-sans))',
            fontSize: 'clamp(1.45rem, 2.3vw, 1.9rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: '-0.03em',
            lineHeight: 1.12,
            marginBottom: '10px',
          }}
        >
          Voyage Margin Estimator
        </h3>
        <p
          style={{
            fontSize: '15px',
            color: 'var(--text-secondary)',
            lineHeight: 1.62,
          }}
        >
          Estimate how freight revenue, bunker cost, port cost, and delay cost
          affect voyage margin.
        </p>
      </div>

      <div
        className="maritime-utility-fields"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: '12px',
        }}
      >
        <EstimatorField
          id="voyage-cargo-quantity-tons"
          label="Cargo quantity (tons)"
          value={fields.cargoQuantityTons}
          onChange={handleFieldChange('cargoQuantityTons')}
        />
        <EstimatorField
          id="voyage-freight-rate-per-ton"
          label="Freight rate per ton"
          value={fields.freightRatePerTon}
          onChange={handleFieldChange('freightRatePerTon')}
        />
        <EstimatorField
          id="voyage-bunker-cost"
          label="Bunker cost"
          value={fields.bunkerCost}
          onChange={handleFieldChange('bunkerCost')}
        />
        <EstimatorField
          id="voyage-port-cost"
          label="Port cost"
          value={fields.portCost}
          onChange={handleFieldChange('portCost')}
        />
        <EstimatorField
          id="voyage-delay-cost"
          label="Delay cost"
          value={fields.delayCost}
          onChange={handleFieldChange('delayCost')}
        />
        <EstimatorField
          id="voyage-other-cost"
          label="Other voyage cost"
          value={fields.otherVoyageCost}
          onChange={handleFieldChange('otherVoyageCost')}
          hint="Optional. Use this for any extra voyage cost you want reflected in the estimate."
        />
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-4)',
          flexWrap: 'wrap',
        }}
      >
        <p
          style={{
            fontSize: '12px',
            color: 'var(--text-muted)',
            lineHeight: 1.55,
          }}
        >
          Results update live as you enter values.
        </p>
        <button
          type="button"
          onClick={() => setFields(initialFields)}
          style={{
            height: '36px',
            padding: '0 16px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-strong)',
            background: 'transparent',
            color: 'var(--text-primary)',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Reset
        </button>
      </div>

      <div style={resultCardBase}>
        <div>
          <p
            style={{
              fontFamily: 'var(--font-ibm-plex-mono, var(--f-mono))',
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: 'var(--accent-soft)',
              marginBottom: '12px',
            }}
          >
            Estimated voyage margin
          </p>

          {estimate ? (
            <>
              <p
                style={{
                  fontFamily: 'var(--font-ibm-plex-sans, var(--f-sans))',
                  fontSize: 'clamp(1.85rem, 3.2vw, 2.45rem)',
                  fontWeight: 700,
                  lineHeight: 1,
                  letterSpacing: '-0.06em',
                  color: marginColor,
                  marginBottom: '8px',
                }}
              >
                {formatAmount(estimate.voyageMargin)}
              </p>
              <p
                style={{
                  fontSize: '12px',
                  color: 'rgba(243,239,229,0.58)',
                  lineHeight: 1.55,
                  marginBottom: '12px',
                }}
              >
                Same currency basis as the freight and voyage cost inputs above.
              </p>

              <div style={{ display: 'grid', gap: '10px' }}>
                <ResultRow label="Estimated gross revenue" value={formatAmount(estimate.grossRevenue)} />
                <ResultRow
                  label="Estimated total voyage cost"
                  value={formatAmount(estimate.totalVoyageCost)}
                />
                <ResultRow
                  label="Estimated voyage margin"
                  value={formatAmount(estimate.voyageMargin)}
                  valueColor={marginColor}
                />
                {estimate.marginPerTon !== null && (
                  <ResultRow
                    label="Estimated margin per ton"
                    value={formatAmount(estimate.marginPerTon)}
                    valueColor={marginColor}
                  />
                )}
              </div>
            </>
          ) : (
            <div
              style={{
                padding: '16px',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid rgba(243,239,229,0.1)',
                background: 'rgba(243,239,229,0.04)',
              }}
            >
              <p
                style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: 'var(--text-on-navy)',
                  marginBottom: '10px',
                }}
              >
                Enter your working assumptions
              </p>
              <p
                style={{
                  fontSize: '13px',
                  color: 'rgba(243,239,229,0.62)',
                  lineHeight: 1.6,
                }}
              >
                Add cargo quantity, freight rate, and voyage cost assumptions to
                generate a quick commercial estimate.
              </p>
            </div>
          )}
        </div>

        <p
          style={{
            fontSize: '12px',
            color: 'rgba(243,239,229,0.6)',
            lineHeight: 1.6,
            paddingTop: '12px',
            borderTop: '1px solid rgba(243,239,229,0.1)',
          }}
        >
          This is an early voyage economics estimate. Final margin depends on
          actual freight terms, bunkers, port costs, delay events, and accounting
          treatment.
        </p>
      </div>
    </article>
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
    <label htmlFor={id} style={fieldShellBase}>
      <span
        style={{
          fontSize: '12px',
          fontWeight: 600,
          color: 'var(--text-primary)',
          lineHeight: 1.45,
          minHeight: '18px',
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
      <span
        style={{
          fontSize: '11px',
          color: 'var(--text-muted)',
          lineHeight: 1.5,
          minHeight: '24px',
          marginTop: '-2px',
          visibility: hint ? 'visible' : 'hidden',
        }}
      >
        {hint ?? 'Placeholder helper text'}
      </span>
    </label>
  )
}

function ResultRow({
  label,
  value,
  valueColor = 'var(--text-on-navy)',
}: {
  label: string
  value: string
  valueColor?: string
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        gap: 'var(--space-4)',
        paddingBottom: '10px',
        borderBottom: '1px solid rgba(243,239,229,0.08)',
      }}
    >
      <span style={{ fontSize: '12px', color: 'rgba(243,239,229,0.6)' }}>{label}</span>
      <span
        style={{
          fontSize: '13px',
          fontWeight: 600,
          color: valueColor,
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
