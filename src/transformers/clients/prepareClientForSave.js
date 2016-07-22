import R from 'ramda'

const prepareClientForSave = R.pick(['name']);
export default prepareClientForSave;
