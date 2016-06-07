import { intersectionWith, differenceWith, eqProps, both, not, equals, compose, pick, mergeAll } from 'ramda'

const COMPARE_FIELDS = [
  'script',
  'stage',
  'enabled',
  'name',
]

const select = pick(COMPARE_FIELDS);
const selectiveEquals = (lhs, rhs) => equals(select(lhs), select(rhs));
const isChanged = compose(not, selectiveEquals);
const sameRule = eqProps('uuid');

const changed = intersectionWith(both(sameRule, isChanged));
const difference = differenceWith(sameRule);

export default function diff(context) {
  const { manifest, rules } = context;

  const changes = changed(rules, manifest);
  const removes = difference(rules, manifest);
  const adds = difference(manifest, rules);

  return mergeAll([
                    { changes, removes, adds },
                    context
                  ]);
}
