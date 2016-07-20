import R from 'ramda';
import prepareCreate from './prepareRuleForCreate'

const filterFields = R.omit(['id', 'stage']);
const prepareRuleForUpdate = R.compose(filterFields, prepareCreate);

export default prepareRuleForUpdate;
