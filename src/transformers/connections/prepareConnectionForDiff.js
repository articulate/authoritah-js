import R from 'ramda'

const filterFields = R.pick(['name', 'options', 'strategy']);
const filterOptions = R.over(R.lensProp('options'), R.pick(["customScripts"]));
const prepareConnectionForDiff = R.compose(filterOptions, filterFields);

export default prepareConnectionForDiff;
