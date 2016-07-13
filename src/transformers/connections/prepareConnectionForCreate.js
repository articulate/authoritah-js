import R from 'ramda'
import { combineUuid } from '../../transformers/transformUuidName'

const MAX_NAME_SIZE = 18;

// helpers for name formatting conventions
const nameLens = R.lensProp('name');
const truncateName = R.over(nameLens, R.take(MAX_NAME_SIZE));
const replaceWhitespace = R.over(nameLens, R.replace(/\s/g, '-'));
const filterCreateFields = R.pick(['options', 'name', 'strategy', 'enabled_clients']);

const prepareForCreate = R.compose(filterCreateFields, replaceWhitespace, combineUuid, truncateName);

export default prepareForCreate;
