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
