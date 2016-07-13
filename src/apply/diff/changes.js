import R from 'ramda'

function selectiveEquals(filter) {
  return (...compares) => R.equals(...R.map(filter, compares));
}

const bothExist = (lhs, rhs) => R.and(lhs, rhs);
const isChanged = (filter) => R.both(bothExist, R.complement(selectiveEquals(filter)));

const groupByUuid = R.compose(R.groupBy(R.prop('uuid')), R.concat);
const findChanges = (filter) => R.filter(R.apply(isChanged(filter)));
const changes = (filter) => R.compose(R.values, R.map(R.compose(R.mergeAll, R.reverse)), findChanges(filter), groupByUuid);

export default changes;
