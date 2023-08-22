export function parseStrTimeToDate(value = '') {
  return new Date(`${new Date().toISOString().slice(0, 10)} ${value}`);
}
