import R from 'ramda'

const filterFields = R.pick(['name', 'options', 'strategy', 'enabled_clients']);
const filterOptions = R.over(R.lensProp('options'), R.pick(["customScripts"]));
const prepareConnectionForSave = R.compose(filterOptions, filterFields);

export default prepareConnectionForSave;
