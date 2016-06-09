import R from 'ramda'

const FIELDS = [
  'name',
  'script',
  'enabled',
  'stage',
  'order',
]

const combineUuidName = (rule) => R.assoc('name', R.props(['uuid', 'name'], rule).join(' '), rule);
const selectCreate = R.compose(R.pick(FIELDS), combineUuidName);
const selectUpdate = R.compose(R.omit(['stage']), selectCreate);

const prepareRule = (type) => R.equals('update', type) ? selectUpdate : selectCreate;

export default prepareRule;

