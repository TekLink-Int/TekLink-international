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
