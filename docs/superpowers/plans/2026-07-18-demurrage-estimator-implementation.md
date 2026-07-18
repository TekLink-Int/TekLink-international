# Demurrage Exposure Estimator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a narrow, public-facing demurrage exposure estimator section on the Maritime page with transparent calculations, calm copy, and mobile-safe layout.

**Architecture:** Keep the page route as a Server Component and add one focused Client Component for the estimator UI. Put the calculation logic in a tiny reusable helper so we can test the math directly with Node's built-in test runner before wiring the interface.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, inline styles, Node 22 built-in test runner, ESLint

## Global Constraints

- Place the estimator on the Maritime page in `app/maritime/page.tsx` between `EcosystemFlow` and `SolutionCards`.
- The estimator must not be treated as the page hero, the central wow factor, or the site's headline feature.
- Scope is one public-facing demurrage exposure estimator section with live calculations, transparent intermediate values, optional cargo-based cost normalization, and restrained copy/styling.
- Out of scope: full charterparty demurrage and dispatch engine, legal settlement logic, separate load/discharge workflows, contract-clause exception handling, saved scenarios, export features, API integration, user persistence.
- Required inputs: `Allowed laytime (hours)`, `Actual time used (hours)`, `Demurrage rate (per day)`.
- Optional inputs: `Excludable hours`, `Cargo quantity (tons)`.
- Use this exact logic:

```text
netUsedHours = max(0, actualTimeUsed - excludableHours)
excessHours = max(0, netUsedHours - allowedLaytime)
estimatedDemurrage = (excessHours / 24) * demurrageRatePerDay
costPerTon = cargoQuantity > 0 ? estimatedDemurrage / cargoQuantity : null
```

- The UI must include this trust note: `This is an operational estimate for early visibility. Final demurrage treatment depends on charterparty terms, records, and agreed exceptions.`
- Use the existing TekLink visual language: navy surfaces, restrained accent color, IBM Plex typography, bordered cards, no faux-terminal styling.

---

### Task 1: Add and verify the calculation helper

**Files:**
- Create: `lib/demurrageExposure.ts`
- Create: `tests/demurrageExposure.test.ts`

**Interfaces:**
- Produces: `calculateDemurrageExposure(input: DemurrageExposureInput): DemurrageExposureResult`
- Produces: `type DemurrageExposureInput = { allowedLaytimeHours: number; actualTimeUsedHours: number; demurrageRatePerDay: number; excludableHours?: number; cargoQuantityTons?: number }`
- Produces: `type DemurrageExposureResult = { netUsedHours: number; excessHours: number; estimatedDemurrage: number; costPerTon: number | null }`

- [ ] **Step 1: Write the failing test**

```ts
import test from 'node:test'
import assert from 'node:assert/strict'

import { calculateDemurrageExposure } from '../lib/demurrageExposure'

test('returns zero exposure when time stays within laytime', () => {
  const result = calculateDemurrageExposure({
    allowedLaytimeHours: 72,
    actualTimeUsedHours: 60,
    demurrageRatePerDay: 18000,
  })

  assert.equal(result.netUsedHours, 60)
  assert.equal(result.excessHours, 0)
  assert.equal(result.estimatedDemurrage, 0)
  assert.equal(result.costPerTon, null)
})

test('calculates exposure and cost per ton when excess time exists', () => {
  const result = calculateDemurrageExposure({
    allowedLaytimeHours: 48,
    actualTimeUsedHours: 78,
    demurrageRatePerDay: 24000,
    cargoQuantityTons: 60000,
  })

  assert.equal(result.netUsedHours, 78)
  assert.equal(result.excessHours, 30)
  assert.equal(result.estimatedDemurrage, 30000)
  assert.equal(result.costPerTon, 0.5)
})

test('floors net counted time at zero when excludable hours exceed actual time', () => {
  const result = calculateDemurrageExposure({
    allowedLaytimeHours: 24,
    actualTimeUsedHours: 10,
    demurrageRatePerDay: 12000,
    excludableHours: 16,
  })

  assert.equal(result.netUsedHours, 0)
  assert.equal(result.excessHours, 0)
  assert.equal(result.estimatedDemurrage, 0)
  assert.equal(result.costPerTon, null)
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/demurrageExposure.test.ts`

Expected: FAIL because `../lib/demurrageExposure` does not exist yet.

- [ ] **Step 3: Write minimal implementation**

```ts
export type DemurrageExposureInput = {
  allowedLaytimeHours: number
  actualTimeUsedHours: number
  demurrageRatePerDay: number
  excludableHours?: number
  cargoQuantityTons?: number
}

export type DemurrageExposureResult = {
  netUsedHours: number
  excessHours: number
  estimatedDemurrage: number
  costPerTon: number | null
}

export function calculateDemurrageExposure({
  allowedLaytimeHours,
  actualTimeUsedHours,
  demurrageRatePerDay,
  excludableHours = 0,
  cargoQuantityTons = 0,
}: DemurrageExposureInput): DemurrageExposureResult {
  const netUsedHours = Math.max(0, actualTimeUsedHours - excludableHours)
  const excessHours = Math.max(0, netUsedHours - allowedLaytimeHours)
  const estimatedDemurrage = (excessHours / 24) * demurrageRatePerDay
  const costPerTon = cargoQuantityTons > 0 ? estimatedDemurrage / cargoQuantityTons : null

  return {
    netUsedHours,
    excessHours,
    estimatedDemurrage,
    costPerTon,
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/demurrageExposure.test.ts`

Expected: PASS with 3 passing tests.

- [ ] **Step 5: Commit**

```bash
git add tests/demurrageExposure.test.ts lib/demurrageExposure.ts
git commit -m "Add demurrage exposure calculator logic"
```

### Task 2: Build the estimator component UI

**Files:**
- Create: `components/DemurrageExposureEstimator.tsx`
- Modify: `app/globals.css`
- Test: `tests/demurrageExposure.test.ts`

**Interfaces:**
- Consumes: `calculateDemurrageExposure(input: DemurrageExposureInput): DemurrageExposureResult`
- Produces: `DemurrageExposureEstimator(): JSX.Element`

- [ ] **Step 1: Extend the failing test for decimal handling**

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
```

- [ ] **Step 2: Run test to verify it fails if helper behavior drifts**

Run: `node --test tests/demurrageExposure.test.ts`

Expected: FAIL until the helper still satisfies the new decimal case.

- [ ] **Step 3: Implement the estimator component**

```tsx
'use client'

import Link from 'next/link'
import { useState } from 'react'

import { calculateDemurrageExposure } from '@/lib/demurrageExposure'

// Keep inputs as strings so blank fields stay visually blank.
```

Build the component with:
- left column copy and form inputs
- right column result card
- live calculations only when required fields are present
- reset action that clears all fields
- breakdown rows for net counted time and excess laytime
- trust note and soft CTA

- [ ] **Step 4: Add any minimal global CSS needed**

```css
@media (max-width: 880px) {
  .demurrage-estimator-grid {
    grid-template-columns: 1fr !important;
  }
}
```

- [ ] **Step 5: Re-run the helper tests**

Run: `node --test tests/demurrageExposure.test.ts`

Expected: PASS with 4 passing tests.

- [ ] **Step 6: Commit**

```bash
git add components/DemurrageExposureEstimator.tsx app/globals.css tests/demurrageExposure.test.ts
git commit -m "Build demurrage exposure estimator section"
```

### Task 3: Integrate the section into the Maritime page and verify the app

**Files:**
- Modify: `app/maritime/page.tsx`
- Modify: `components/DemurrageExposureEstimator.tsx`
- Test: `tests/demurrageExposure.test.ts`

**Interfaces:**
- Consumes: `DemurrageExposureEstimator(): JSX.Element`

- [ ] **Step 1: Insert the component in the correct page position**

```tsx
import DemurrageExposureEstimator from '@/components/DemurrageExposureEstimator'
```

Render it between:
- `<EcosystemFlow />`
- `<SolutionCards />`

- [ ] **Step 2: Run the focused test suite**

Run: `node --test tests/demurrageExposure.test.ts`

Expected: PASS.

- [ ] **Step 3: Run lint**

Run: `npm run lint`

Expected: PASS with no new lint errors.

- [ ] **Step 4: Run the production build**

Run: `npm run build`

Expected: PASS and the Maritime page compiles cleanly with the new client component.

- [ ] **Step 5: Commit**

```bash
git add app/maritime/page.tsx
git commit -m "Add demurrage estimator to maritime page"
```
