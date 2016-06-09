import R from 'ramda'

const COMPARE_FIELDS = [
  'script',
  'stage',
  'enabled',
  'name',
]

import clc from 'cli-color'
import { inspect } from 'util'

const selector = R.pick(COMPARE_FIELDS);
const selectiveEquals = (lhs, rhs) => R.equals(selector(lhs), selector(rhs));
const allExist = (lhs, rhs) => R.and(lhs, rhs);
const isChanged = R.both(allExist, R.complement(selectiveEquals));

const group = R.compose(R.groupBy(R.prop('uuid')), R.concat);
const findChanges =  R.filter(R.apply(isChanged));
const difference = R.differenceWith(R.eqProps('uuid'));

export default function diff(context) {
  const { manifest, rules, say: { ok } } = context;
  const changes = R.compose(R.values, R.map(R.mergeAll), findChanges, group)(rules, manifest);

  const diff = {
    changes,
    removes: difference(rules, manifest),
    adds: difference(manifest, rules)
  };

  if(R.all(R.isEmpty, R.values(diff))) { ok("No changes to apply!"); }

  return R.merge(diff, context);
}
