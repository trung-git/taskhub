import { t } from 'i18next';

export default function locToString(location, cityFirst = true) {
  return cityFirst
    ? `${t(location?.city?.prefix)} ${location?.city?.name}, ${t(
        location?.prefix
      )} ${location?.name}`
    : `${t(location?.prefix)} ${location?.name}, ${location?.city?.name}`;
}
