import _ from 'lodash';

export default function diffProperties(obj1, obj2) {
  const diffProperties = [];

  for (const key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      if (!_.isEqual(obj1[key], obj2[key])) {
        diffProperties.push(key);
      }
    }
  }

  return diffProperties;
}
