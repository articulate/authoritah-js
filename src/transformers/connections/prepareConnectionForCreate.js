import R from 'ramda'
import { combineUuid } from '../../transformers/transformUuidName'

const MAX_NAME_SIZE = 18;

// helpers for name formatting conventions
const dropUUID = R.dissoc('uuid');
const filterCreateFields = R.omit([]);

const prepareForCreate = R.compose(filterCreateFields, dropUUID);

export default prepareForCreate;
