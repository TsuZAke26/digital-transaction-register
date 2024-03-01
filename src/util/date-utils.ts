const THIRTY_DAYS_IN_MILLISECONDS = 2592000000;

export function getThirtyDaysAgo(input: Date) {
  return new Date(input.valueOf() - THIRTY_DAYS_IN_MILLISECONDS);
}
