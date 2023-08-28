import dayjs from 'dayjs';

export function predictAmount(timeFrom, timeTo, priceValue, paymentPlanValue) {
  const hoursDifference = dayjs(timeTo).diff(dayjs(timeFrom), 'minute');

  return paymentPlanValue === 'per-hour'
    ? (hoursDifference * priceValue) / 60
    : priceValue;
}
