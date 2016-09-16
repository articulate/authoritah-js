import R from 'ramda'

// additional fields we can't or don't pass during an update
const filterFields = R.omit(['id', 'name', 'strategy']);
const prepareConnectionForUpdate = R.compose(filterFields, R.head);
export default prepareConnectionForUpdate;
