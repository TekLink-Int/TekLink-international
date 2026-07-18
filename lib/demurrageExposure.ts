export type DemurrageExposureInput = {
  allowedLaytimeHours: number
  actualTimeUsedHours: number
  demurrageRatePerDay: number
  excludableHours?: number
  cargoQuantityTons?: number
}

export type TimeUnit = 'hours' | 'days'

export type DemurrageExposureResult = {
  netUsedHours: number
  excessHours: number
  estimatedDemurrage: number
  costPerTon: number | null
}

export function convertDurationToHours(value: number, unit: TimeUnit): number {
  return unit === 'days' ? value * 24 : value
}

export function convertDurationValue(value: number, from: TimeUnit, to: TimeUnit): number {
  if (from === to) return value
  return from === 'hours' ? value / 24 : value * 24
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
