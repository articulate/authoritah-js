import R from 'ramda';

const filterFields = R.omit(['id', 'stage']);
const prepareRuleForUpdate = R.compose(filterFields, R.head);
export default prepareRuleForUpdate;
