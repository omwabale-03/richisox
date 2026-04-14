export const POINTS_PER_RUPEE = 0.1; // 1 point per ₹10 spent
export const POINTS_TO_RUPEE = 0.25; // 4 points = ₹1
export const MIN_REDEEM = 100;

export function calculatePoints(orderTotal: number): number {
  return Math.floor(orderTotal * POINTS_PER_RUPEE);
}

export function pointsToDiscount(points: number): number {
  return Math.floor(points * POINTS_TO_RUPEE);
}

export function canRedeem(points: number): boolean {
  return points >= MIN_REDEEM;
}
