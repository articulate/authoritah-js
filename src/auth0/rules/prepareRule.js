import R from 'ramda'
import { combineUuid } from '../../utils/transformUuidName'

const filterFields = R.pick([
  'name',
  'script',
  'enabled',
  'stage',
  'order',
]);

export const prepareForCreate = R.compose(filterFields, combineUuid);
export const prepareForUpdate = R.compose(R.omit(['stage']), prepareForCreate);
