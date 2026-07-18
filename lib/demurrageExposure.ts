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
