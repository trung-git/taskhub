import dayjs from 'dayjs';

export function parseStrTimeToDate(value = '') {
  return new Date(`${new Date().toISOString().slice(0, 10)} ${value}`);
}

export function parseStrTimeAndDateToDate(date, value = '') {
  return new Date(`${dayjs(date).toISOString().slice(0, 10)} ${value}`);
}
