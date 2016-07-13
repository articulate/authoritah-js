import R from 'ramda'
import { combineUuid } from '../../transformers/transformUuidName'

const ignoreFields = R.omit(['client_id']);
const prepareClientForApi = R.compose(ignoreFields, combineUuid);

export default prepareClientForApi;
