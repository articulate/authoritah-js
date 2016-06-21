import R from 'ramda';
import transformName from '../utils/transformUuidName'

const ATTRS = [
  'enabled',
  'stage',
  'script',
  'name',
  'id',
];

export default function parseRules(context) {
  const { rules } = context;
  const parsed = R.map(R.compose(transformName, R.pick(ATTRS)), rules);

  return R.assoc('rules', parsed, context);
}
