import * as colors from 'tailwindcss/colors';
import { isObject, omit, pickBy } from 'lodash-es';

export function colorsConfig() {
  const skip = ['lightBlue', 'warmGray', 'trueGray', 'coolGray', 'blueGray'];
  return omit(pickBy(colors, isObject), skip);
}
