export function formatDate(dateStr: string) {
  const dateDelim = dateStr.split('-');

  return dateDelim[1].concat('/').concat(dateDelim[2]);
}

export function formatAmount(amount: number) {
  const prefixChar = amount < 0 ? '-' : '+';

  return prefixChar.concat(Math.abs(amount).toString());
}
