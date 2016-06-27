import R from 'ramda'

function expandObject(keyName, valueName) {
  return R.compose(R.values, R.mapObjIndexed((value, key) => ({ [keyName]: key, [valueName]: value })));
}

function combineObject(keyName, valueName) {
  return R.reduce((acc, {[keyName]: key, [valueName]: value }) => R.assoc(key, value, acc), {});
}

export { expandObject, combineObject };
