import R from 'ramda';

const prepareRuleForDiff = R.pick(['script', 'stage', 'enabled', 'name', 'order']);

export default prepareRuleForDiff;
