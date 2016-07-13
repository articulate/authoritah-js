import R from 'ramda'

const prepareRuleForSave = R.pick(['enabled', 'script', 'name', 'order', 'stage', 'uuid']);
export default prepareRuleForSave;
