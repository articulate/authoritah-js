import R from 'ramda'
import { combineUuid } from '../../utils/transformUuidName'

const ignoreFields = R.omit(['client_id']);
const prepareClient = R.compose(ignoreFields, combineUuid);

export default prepareClient;
