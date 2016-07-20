import R from 'ramda'
import { combineUuid } from '../../transformers/transformUuidName'

const filterNulls = R.filter(R.compose(R.not, R.isNil));
const ignoreFields = R.omit(['client_id', 'callback_url_template', 'tenant', 'global', 'config_route', 'owners']);
const prepareClientForUpdate = R.compose(filterNulls, ignoreFields, combineUuid);

export default prepareClientForUpdate;
