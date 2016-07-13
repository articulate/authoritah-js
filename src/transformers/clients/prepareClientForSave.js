import R from 'ramda'

const prepareClientForSave = R.pick(['name', 'uuid']);
export default prepareClientForSave;
