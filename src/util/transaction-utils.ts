export function formatDate(dateStr: string) {
  const dateDelim = dateStr.split('-');

  return dateDelim[1].concat('/').concat(dateDelim[2]);
}

export function formatAmount(amount: number) {
  const prefixChar = amount < 0 ? '-' : '+';

  // Determine number of trailing zeros to add for rendering
  const amountDelim = amount.toString().split('.');
  let zeroPadding = '';
  // only tenths place
  if (amountDelim.length > 1 && amountDelim[1].length === 1) {
    zeroPadding = '0';
  }
  // no decimal at all
  else if (amountDelim.length === 1) {
    zeroPadding = '.00';
  }

  return prefixChar.concat('$').concat(Math.abs(amount).toString()).concat(zeroPadding);
}
