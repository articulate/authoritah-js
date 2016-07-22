import R from 'ramda'

// additional fields we can't or don't pass during an update
const prepareConnectionForUpdate = R.omit(['id', 'name', 'strategy']);
export default prepareConnectionForUpdate;
