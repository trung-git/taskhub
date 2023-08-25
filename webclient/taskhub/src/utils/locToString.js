import { t } from 'i18next';

export default function locToString(location) {
  return `${t(location?.city?.prefix)} ${location?.city?.name}, ${t(
    location?.prefix
  )} ${location?.name}`;
}
