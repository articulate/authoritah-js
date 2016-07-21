import R from 'ramda';

const prepareRuleForUpdate = R.omit(['id', 'stage']);
export default prepareRuleForUpdate;
