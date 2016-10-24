import R from 'ramda'

const isArrayPair = R.unapply(R.all(R.is(Array)));
const notObjectPair = R.compose(R.not, R.unapply(R.all(R.is(Object))));
function selectiveEquals(filter) {
  return (...compares) => R.equals(...R.map(filter, compares));
}

const deepMerge = R.mergeWith((lhs, rhs) =>
  R.isEmpty(lhs)
    || isArrayPair(lhs, rhs)
    || notObjectPair(lhs, rhs)
    ? lhs : deepMerge(lhs, rhs)
);

const bothExist = (lhs, rhs) => R.and(lhs, rhs);
const isChanged = (filter) => R.both(bothExist, R.complement(selectiveEquals(filter)));

const groupByName = R.compose(R.groupBy(R.prop('name')), R.concat);
const findChanges = (filter) => R.filter(R.apply(isChanged(filter)));

// Returns diffs in the format of [old, new].
// LHS equals local config, RHS is server state
const changes = (filter) => R.compose(
  R.values,
  R.map(([lhs, rhs]) => [deepMerge(lhs, rhs), deepMerge(rhs, lhs)]),
  findChanges(filter),
  groupByName);

export default changes;
