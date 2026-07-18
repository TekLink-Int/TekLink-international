import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import test from 'node:test'

const require = createRequire(import.meta.url)
const { calculateDemurrageExposure } = require('../lib/demurrageExposure.ts')

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
