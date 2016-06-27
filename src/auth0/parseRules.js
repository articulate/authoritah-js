import R from 'ramda';
import { extractUuid } from '../utils/transformUuidName'

const filterAttrs = R.pick([
  'enabled',
  'stage',
  'script',
  'name',
  'id',
]);
const transformEach = R.map(R.compose(extractUuid, filterAttrs));

export default function parseRules(context) {
  const { rules } = context;
  return R.assoc('rules', transformEach(rules), context);
}
