export default function vietnameseDayOfWeekFormatter(day, options) {
  switch (day) {
    case 'CN':
      return 'T7';
    case 'T2':
      return 'CN';
    case 'T3':
      return 'T2';
    case 'T4':
      return 'T3';
    case 'T5':
      return 'T4';
    case 'T6':
      return 'T5';
    case 'T7':
      return 'T6';
    default:
      return '';
  }
}
