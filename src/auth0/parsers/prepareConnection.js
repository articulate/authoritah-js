import R from 'ramda'
import { combineUuid } from '../../utils/transformUuidName'

const MAX_NAME_SIZE = 18;
const filterFields = R.pick(['options', 'name', 'strategy', 'enabled_clients']);
const nameLens = R.lensProp('name');

const truncateName = R.over(nameLens, R.take(MAX_NAME_SIZE));
const replaceWhitespace = R.over(nameLens, R.replace(/\s/g, '-'));

export const prepareForUpdate = R.pick(['options', 'enabled_clients']);
export const prepareForCreate = R.compose(filterFields, replaceWhitespace, combineUuid, truncateName);
