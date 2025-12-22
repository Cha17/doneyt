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

export function formattedTarget({ targetAmount }: { targetAmount?: number }) {
  return formatCurrency(targetAmount || 0);
}

export function getDriveProgress(currentAmount: number, targetAmount: number = 0): number {
  if (!targetAmount || targetAmount === 0) return 0;
  return Math.min(Math.round((currentAmount / targetAmount) * 100), 100);
}