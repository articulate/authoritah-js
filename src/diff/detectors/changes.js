import R from 'ramda'

function selectiveEquals(filter) {
  return (...compares) => R.equals(...R.map(filter, compares));
}

const deepMerge = R.mergeWith((l,r) =>
  R.isEmpty(r)
    || (R.is(Array, l) && R.is(Array, r))
    || !(R.is(Object, l) && R.is(Object, r))
    ? r : deepMerge(l, r)
);

const bothExist = (lhs, rhs) => R.and(lhs, rhs);
const isChanged = (filter) => R.both(bothExist, R.complement(selectiveEquals(filter)));

const dbg = (ctx) => { console.log(ctx); return ctx }

const groupByName = R.compose(R.groupBy(R.prop('name')), R.concat);
const findChanges = (filter) => R.filter(R.apply(isChanged(filter)));
const changes = (filter) => R.compose(
  R.values,
  R.map(([lhs, rhs]) => [deepMerge(lhs, rhs), deepMerge(rhs, lhs)]),
  findChanges(filter),
  groupByName);

export default changes;
