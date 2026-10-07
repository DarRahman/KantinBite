export const calculateHpp = (batchCost, portionOutput) => {
  const portions = Number(portionOutput) || 0;
  if (portions <= 0) return 0;
  return Math.round(Number(batchCost) / portions);
};

export const calculateSuggestedPrices = (hpp, marginPercent = 50) => {
  const marginMultiplier = 1 + (Number(marginPercent) / 100);
  const canteenWholesale = Math.round(hpp * 1.6667);
  const retailDirect = Math.round(hpp * marginMultiplier);
  return {
    canteenPrice: canteenWholesale,
    retailPrice: retailDirect
  };
};

export const calculateConsignmentSettlement = (initialQty, returnQty, unitPrice) => {
  const init = Math.max(0, Number(initialQty) || 0);
  const ret = Math.max(0, Number(returnQty) || 0);
  const sold = Math.max(0, init - ret);
  const totalDue = Math.round(sold * (Number(unitPrice) || 0));
  return {
    soldQty: sold,
    totalDue: totalDue
  };
};
