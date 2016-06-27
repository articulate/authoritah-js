import R from 'ramda'
import { combineUuid } from '../utils/transformUuidName'

const filterFields = R.pick([
  'name',
  'script',
  'enabled',
  'stage',
  'order',
]);

const selectCreate = R.compose(filterFields, combineUuid);
const selectUpdate = R.compose(R.omit(['stage']), selectCreate);

const prepareRule = (type) => R.equals('update', type) ? selectUpdate : selectCreate;

export default prepareRule;

