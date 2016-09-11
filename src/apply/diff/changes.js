import R from 'ramda'

function selectiveEquals(filter) {
  return (...compares) => R.equals(...R.map(filter, compares));
}

const deepMerge = R.mergeWith((l,r) =>
  R.isEmpty(r) ? r
    : R.is(Array, l) && R.is(Array, r) ? R.concat(l, r)
    : !(R.is(Object, l) && R.is(Object, r)) ? r
    : deepMerge(l, r)
)

const bothExist = (lhs, rhs) => R.and(lhs, rhs);
const isChanged = (filter) => R.both(bothExist, R.complement(selectiveEquals(filter)));

const groupByName = R.compose(R.groupBy(R.prop('name')), R.concat);
const findChanges = (filter) => R.filter(R.apply(isChanged(filter)));
const changes = (filter) => R.compose(
  R.values,
  R.map(args => deepMerge(...args)),
  R.map(R.reverse),
  findChanges(filter),
  groupByName);

export default changes;
