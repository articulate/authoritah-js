import R from 'ramda'

const COMPARE_FIELDS = {
  rules: R.pick(['script', 'stage', 'enabled', 'name']),
  connections: R.pick(['name, options'])
};

function selectiveEquals(field) {
  const selector = COMPARE_FIELDS[field];
  return function(lhs, rhs) {
    return R.equals(selector(lhs), selector(rhs));
  }
}

const bothExist = (lhs, rhs) => R.and(lhs, rhs);
const isChanged = (field) => R.both(bothExist, R.complement(selectiveEquals(field)));

const groupByUuid = R.compose(R.groupBy(R.prop('uuid')), R.concat);
const findChanges = (field) => R.filter(R.apply(isChanged(field)));
const difference = R.differenceWith(R.eqProps('uuid'));
const changedIntersection = (field) => R.compose(R.values, R.map(R.mergeAll), findChanges(field), groupByUuid);

function diff(field, context) {
  const { manifest: { [field]: local }, [field]: server, say: { ok } } = context;

  const diff = {
    changes: changedIntersection(field)(server, local),
    removes: difference(server, local),
    adds: difference(local, server)
  };

  if(R.all(R.isEmpty, R.values(diff))) { ok(`No changes to apply for ${field}!`); }
  return R.assocPath(['diff', field], diff, context);
}

export default R.curry(diff);
