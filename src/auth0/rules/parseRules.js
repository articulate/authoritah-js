import R from 'ramda';
import { extractUuid } from '../../utils/transformUuidName'

const filterAttrs = R.pick([
  'enabled',
  'stage',
  'script',
  'name',
  'id',
]);
const transformEach = R.map(R.compose(extractUuid, filterAttrs));
const parseRules = R.over(R.lensProp('rules'), transformEach);

export default parseRules;
