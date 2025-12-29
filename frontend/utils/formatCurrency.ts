export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formattedCurrent({ currentAmount }: { currentAmount: number }) {
  return formatCurrency(currentAmount);
}

export function formattedTarget({ targetAmount }: { targetAmount?: number }): string | null {
  if (!targetAmount || targetAmount === 0) return null;
  return formatCurrency(targetAmount);
}

export function getDriveProgress(currentAmount: number, targetAmount: number = 0): number | null {
  if (!targetAmount || targetAmount === 0) return null;
  return Math.min(Math.round((currentAmount / targetAmount) * 100), 100);
}