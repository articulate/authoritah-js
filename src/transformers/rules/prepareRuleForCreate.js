import R from 'ramda';
import { combineUuid } from '../../transformers/transformUuidName'

const filterFields = R.pick([
  'name',
  'script',
  'enabled',
  'stage',
  'order',
]);

const prepareRuleForCreate = R.compose(filterFields, combineUuid);

export default prepareRuleForCreate;
