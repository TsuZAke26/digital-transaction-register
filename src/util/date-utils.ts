import { REGEX_DATE_FORMAT } from './regex';

const THIRTY_DAYS_IN_MILLISECONDS = 2592000000;

export function getThirtyDaysAgoFromJSDate(input: Date) {
  return new Date(input.valueOf() - THIRTY_DAYS_IN_MILLISECONDS);
}

export function getThirtyDaysAgoFromDateString(input: string) {
  if (REGEX_DATE_FORMAT.test(input)) {
    const date = new Date(Date.parse(input));
    return getThirtyDaysAgoFromJSDate(date);
  }
}

export function firstDayOfMonth(input: string) {
  const inputDateSplit = input.split('-');
  return inputDateSplit[0].concat('-').concat(inputDateSplit[1]).concat('-').concat('01');
}

export function jsDateToSupabaseDate(input: Date) {
  return input.toISOString().split('T')[0];
}
