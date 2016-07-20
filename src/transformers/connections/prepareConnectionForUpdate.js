import R from 'ramda'
import prepareCreate from './prepareConnectionForCreate'

// additional fields we can't or don't pass during an update
const filterUpdateFields = R.omit(['name', 'strategy']);
const prepareConnectionForUpdate = R.compose(filterUpdateFields, prepareCreate);

export default prepareConnectionForUpdate;
