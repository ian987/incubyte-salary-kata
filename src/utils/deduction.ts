const DEDUCTION_RATES: Record<string, number> = {
  India: 0.1,
  "United States": 0.12,
};

export const getDeductionRate = (country: string): number => {
  return DEDUCTION_RATES[country] ?? 0;
};
