# Maritime Utilities Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current single Maritime demurrage utility with a shared two-card utilities section containing a renamed demurrage estimator and a new voyage margin estimator, while leaving the rest of the Maritime page structure unchanged.

**Architecture:** Keep `app/maritime/page.tsx` as a Server Component and render one shared `MaritimeUtilitiesSection` wrapper between `EcosystemFlow` and `SolutionCards`. Keep each estimator as its own focused Client Component with isolated local state and shared inline visual language, while leaving calculation logic in small testable helpers under `lib/`.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, inline styles plus `app/globals.css` responsive hooks, Node built-in test runner, ESLint

## Global Constraints

- Keep the Maritime page order exactly: `Hero`, `EcosystemFlow`, `MaritimeUtilitiesSection`, `SolutionCards`, `Footer`.
- The section eyebrow must be `Operational and Commercial Utilities`.
- The section headline must be `Two fast estimators for delay exposure and voyage economics`.
- Tool 1 title must be `Demurrage and Cash Leakage Estimator`.
- Tool 1 summary must be `Estimate how excess laytime can turn berth delay into direct commercial exposure.`
- Tool 2 title must be `Voyage Margin Estimator`.
- Tool 2 summary must be `Estimate how freight revenue, bunker cost, port cost, and delay cost affect voyage margin.`
- Both tools must remain practical early estimators and must not imply legal settlement, accounting-grade reporting, saved scenarios, export features, API integration, or user persistence.
- Both tools must update live, keep independent local state, expose their own reset action, and show a calm placeholder state before required inputs are complete.
- Demurrage inputs: `Port / terminal`, `Allowed laytime`, `Actual time used`, `Port demurrage rate (per day)`, `Excludable time`, `Cargo quantity (tons)`.
- Demurrage behavior: keep the `Hours / Days` toggle, keep rate input on a daily basis, convert time internally to hours, default allowed laytime to `24`.
- Demurrage logic:

```text
netUsedHours = max(0, actualTimeUsedHours - excludableHours)
excessHours = max(0, netUsedHours - allowedLaytimeHours)
estimatedDemurrage = (excessHours / 24) * demurrageRatePerDay
costPerTon = cargoQuantity > 0 ? estimatedDemurrage / cargoQuantity : null
```

- Voyage inputs: `Cargo quantity (tons)`, `Freight rate per ton`, `Bunker cost`, `Port cost`, `Delay cost`, `Other voyage cost` optional.
- Voyage logic:

```text
grossRevenue = cargoQuantityTons * freightRatePerTon
totalVoyageCost = bunkerCost + portCost + delayCost + otherVoyageCost
voyageMargin = grossRevenue - totalVoyageCost
marginPerTon = cargoQuantityTons > 0 ? voyageMargin / cargoQuantityTons : null
```

- Numeric inputs must be non-negative, decimals must be allowed, and per-ton outputs only appear when cargo quantity is above zero.
- Voyage margin may be positive, zero, or negative, and negative margin must display clearly rather than being hidden.
- Keep the existing TekLink visual language: IBM Plex typography, navy/restrained accent palette, bordered cards, no faux-terminal styling, no exaggerated marketing treatment.
- Use verification commands that do not depend on network font fetches: focused tests, `npm run lint`, and `npx tsc --noEmit`.

---

### Task 1: Add voyage margin calculator logic and focused tests

**Files:**
- Create: `lib/voyageMargin.ts`
- Modify: `tests/demurrageExposure.test.ts`
- Create: `tests/voyageMargin.test.ts`

**Interfaces:**
- Consumes: `calculateDemurrageExposure(input: DemurrageExposureInput): DemurrageExposureResult`
- Produces: `calculateVoyageMargin(input: VoyageMarginInput): VoyageMarginResult`
- Produces: `type VoyageMarginInput = { cargoQuantityTons: number; freightRatePerTon: number; bunkerCost: number; portCost: number; delayCost: number; otherVoyageCost?: number }`
- Produces: `type VoyageMarginResult = { grossRevenue: number; totalVoyageCost: number; voyageMargin: number; marginPerTon: number | null }`

- [ ] **Step 1: Extend the demurrage test file with the existing required coverage only**

```ts
test('supports decimal values for hours and rates', () => {
  const result = calculateDemurrageExposure({
    allowedLaytimeHours: 36.5,
    actualTimeUsedHours: 50.75,
    demurrageRatePerDay: 19500.5,
    excludableHours: 2.25,
  })

  assert.equal(result.netUsedHours, 48.5)
  assert.equal(result.excessHours, 12)
  assert.equal(result.estimatedDemurrage, 9750.25)
  assert.equal(result.costPerTon, null)
})

test('converts days to hours for internal calculations', () => {
  assert.equal(convertDurationToHours(3, 'days'), 72)
  assert.equal(convertDurationToHours(18, 'hours'), 18)
})

test('converts existing time values when switching between hours and days', () => {
  assert.equal(convertDurationValue(24, 'hours', 'days'), 1)
  assert.equal(convertDurationValue(2.5, 'days', 'hours'), 60)
})
```

- [ ] **Step 2: Add the new failing voyage margin tests**

```ts
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import test from 'node:test'

const require = createRequire(import.meta.url)
const { calculateVoyageMargin } = require('../lib/voyageMargin.ts')

test('calculates a positive voyage margin and margin per ton', () => {
  const result = calculateVoyageMargin({
    cargoQuantityTons: 50000,
    freightRatePerTon: 52,
    bunkerCost: 850000,
    portCost: 240000,
    delayCost: 90000,
    otherVoyageCost: 70000,
  })

  assert.equal(result.grossRevenue, 2600000)
  assert.equal(result.totalVoyageCost, 1250000)
  assert.equal(result.voyageMargin, 1350000)
  assert.equal(result.marginPerTon, 27)
})

test('supports zero voyage margin', () => {
  const result = calculateVoyageMargin({
    cargoQuantityTons: 10000,
    freightRatePerTon: 100,
    bunkerCost: 300000,
    portCost: 300000,
    delayCost: 300000,
    otherVoyageCost: 100000,
  })

  assert.equal(result.grossRevenue, 1000000)
  assert.equal(result.totalVoyageCost, 1000000)
  assert.equal(result.voyageMargin, 0)
  assert.equal(result.marginPerTon, 0)
})

test('supports negative voyage margin without hiding the result', () => {
  const result = calculateVoyageMargin({
    cargoQuantityTons: 8000,
    freightRatePerTon: 60,
    bunkerCost: 240000,
    portCost: 150000,
    delayCost: 70000,
    otherVoyageCost: 90000,
  })

  assert.equal(result.grossRevenue, 480000)
  assert.equal(result.totalVoyageCost, 550000)
  assert.equal(result.voyageMargin, -70000)
  assert.equal(result.marginPerTon, -8.75)
})

test('omits margin per ton when cargo quantity is not above zero', () => {
  const result = calculateVoyageMargin({
    cargoQuantityTons: 0,
    freightRatePerTon: 60,
    bunkerCost: 120000,
    portCost: 50000,
    delayCost: 10000,
  })

  assert.equal(result.grossRevenue, 0)
  assert.equal(result.totalVoyageCost, 180000)
  assert.equal(result.voyageMargin, -180000)
  assert.equal(result.marginPerTon, null)
})
```

- [ ] **Step 3: Run the focused test commands and confirm the new voyage test fails first**

Run: `node --test tests/demurrageExposure.test.ts`
Expected: PASS.

Run: `node --test tests/voyageMargin.test.ts`
Expected: FAIL because `../lib/voyageMargin.ts` does not exist yet.

- [ ] **Step 4: Implement the voyage margin helper**

```ts
export type VoyageMarginInput = {
  cargoQuantityTons: number
  freightRatePerTon: number
  bunkerCost: number
  portCost: number
  delayCost: number
  otherVoyageCost?: number
}

export type VoyageMarginResult = {
  grossRevenue: number
  totalVoyageCost: number
  voyageMargin: number
  marginPerTon: number | null
}

export function calculateVoyageMargin({
  cargoQuantityTons,
  freightRatePerTon,
  bunkerCost,
  portCost,
  delayCost,
  otherVoyageCost = 0,
}: VoyageMarginInput): VoyageMarginResult {
  const grossRevenue = cargoQuantityTons * freightRatePerTon
  const totalVoyageCost = bunkerCost + portCost + delayCost + otherVoyageCost
  const voyageMargin = grossRevenue - totalVoyageCost
  const marginPerTon = cargoQuantityTons > 0 ? voyageMargin / cargoQuantityTons : null

  return {
    grossRevenue,
    totalVoyageCost,
    voyageMargin,
    marginPerTon,
  }
}
```

- [ ] **Step 5: Re-run both focused test files**

Run: `node --test tests/demurrageExposure.test.ts tests/voyageMargin.test.ts`
Expected: PASS with 10 passing tests.

### Task 2: Build the shared utilities section and both estimator cards

**Files:**
- Create: `components/MaritimeUtilitiesSection.tsx`
- Modify: `components/DemurrageExposureEstimator.tsx`
- Create: `components/VoyageMarginEstimator.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `calculateDemurrageExposure(input: DemurrageExposureInput): DemurrageExposureResult`
- Consumes: `calculateVoyageMargin(input: VoyageMarginInput): VoyageMarginResult`
- Produces: `MaritimeUtilitiesSection(): JSX.Element`
- Produces: `DemurrageExposureEstimator(): JSX.Element`
- Produces: `VoyageMarginEstimator(): JSX.Element`

- [ ] **Step 1: Refactor the demurrage component into a single estimator card**

```tsx
'use client'

import { useState } from 'react'

import {
  calculateDemurrageExposure,
  convertDurationToHours,
  convertDurationValue,
  type TimeUnit,
} from '@/lib/demurrageExposure'

export default function DemurrageExposureEstimator() {
  // Keep its own local fields, hours/days toggle, live calculation, and reset button.
  // Rename visible copy to "Demurrage and Cash Leakage Estimator".
  // Render only one utility card, not the full section wrapper.
}
```

The card must include:
- eyebrow-level label for the tool type
- the exact title and summary from the spec
- the existing time-basis toggle behavior
- six input fields using the shared field shell treatment
- placeholder state before required inputs are complete
- result rows for `Estimated demurrage exposure`, `Net counted time`, `Excess laytime`, and optional `Estimated cost per ton`
- the restrained trust note explaining this is not final settlement logic

- [ ] **Step 2: Add the new voyage margin estimator card**

```tsx
'use client'

import { useState } from 'react'

import { calculateVoyageMargin } from '@/lib/voyageMargin'

export default function VoyageMarginEstimator() {
  // Keep its own local string fields, live calculations, and reset button.
  // Use the same card, field, action, and result patterns as the demurrage card.
}
```

The card must include:
- the exact title and summary from the spec
- required inputs for cargo quantity, freight rate per ton, bunker cost, port cost, and delay cost
- optional `Other voyage cost`
- placeholder state before required inputs are complete
- result rows for `Estimated gross revenue`, `Estimated total voyage cost`, `Estimated voyage margin`, and optional `Estimated margin per ton`
- clear display for negative margin using the existing restrained palette rather than hiding or zeroing it
- a trust note stating it is an early voyage economics estimate rather than a finance or accounting system

- [ ] **Step 3: Add the shared wrapper section**

```tsx
import DemurrageExposureEstimator from '@/components/DemurrageExposureEstimator'
import VoyageMarginEstimator from '@/components/VoyageMarginEstimator'

export default function MaritimeUtilitiesSection() {
  return (
    <section>
      <div>
        <p>Operational and Commercial Utilities</p>
        <h2>Two fast estimators for delay exposure and voyage economics</h2>
        <p>
          TekLink understands both operational leakage and voyage economics.
          These two utilities give fast, practical early estimates without
          pretending to replace legal settlement or accounting workflows.
        </p>
        <div className="maritime-utilities-grid">
          <DemurrageExposureEstimator />
          <VoyageMarginEstimator />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Add responsive hooks without changing unrelated global styles**

```css
@media (max-width: 880px) {
  .maritime-utilities-grid {
    grid-template-columns: 1fr !important;
  }

  .maritime-utility-fields {
    grid-template-columns: 1fr !important;
  }
}
```

- [ ] **Step 5: Re-run the focused test files after the UI refactor**

Run: `node --test tests/demurrageExposure.test.ts tests/voyageMargin.test.ts`
Expected: PASS with 10 passing tests.

### Task 3: Integrate the shared section into the Maritime route and verify the change

**Files:**
- Modify: `app/maritime/page.tsx`
- Test: `tests/demurrageExposure.test.ts`
- Test: `tests/voyageMargin.test.ts`

**Interfaces:**
- Consumes: `MaritimeUtilitiesSection(): JSX.Element`

- [ ] **Step 1: Replace the old page import and keep the route order unchanged**

```tsx
import MaritimeUtilitiesSection from '@/components/MaritimeUtilitiesSection'
```

Render it as:

```tsx
<Navbar />
<Hero />
<EcosystemFlow />
<MaritimeUtilitiesSection />
<SolutionCards />
<Footer />
```

- [ ] **Step 2: Run the calculator tests**

Run: `node --test tests/demurrageExposure.test.ts tests/voyageMargin.test.ts`
Expected: PASS with 10 passing tests.

- [ ] **Step 3: Run lint**

Run: `npm run lint`
Expected: PASS with no new lint errors in the Maritime files.

- [ ] **Step 4: Run TypeScript compilation without emit**

Run: `npx tsc --noEmit`
Expected: PASS with no new type errors.

- [ ] **Step 5: Review the diff and confirm only the intended Maritime files changed**

Run: `git diff -- app/maritime/page.tsx app/globals.css components/DemurrageExposureEstimator.tsx components/MaritimeUtilitiesSection.tsx components/VoyageMarginEstimator.tsx lib/voyageMargin.ts tests/demurrageExposure.test.ts tests/voyageMargin.test.ts`
Expected: Only the planned Maritime utility changes appear.
