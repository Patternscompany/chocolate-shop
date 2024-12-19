export const calculatePackagePrice = (basePrice, carpetArea, hasModularKitchen) => {
  const area = parseInt(carpetArea);
  const kitchenAddition = hasModularKitchen ? basePrice * 0.2 : 0;
  return Math.round((area * basePrice / 100) + kitchenAddition);
};

export const calculateCostBreakdown = (totalCost, percentage) => {
  return Math.round(totalCost * percentage);
};