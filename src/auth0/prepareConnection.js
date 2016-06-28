import R from 'ramda'
import { combineUuid } from '../utils/transformUuidName'

const filterFields = R.pick(['options', 'name', 'strategy', 'enabled_clients'])
const filterForUpdate = R.pick(['options', 'enabled_clients']);

function joinNameWhitespace(connection) {
  const { name } = connection;
  return R.assoc('name', name.replace(/\s/g, '-'), connection);
}

function prepareConnection(type) {
  return R.equals('update', type) ? filterForUpdate : R.compose(filterFields, joinNameWhitespace, combineUuid);
}

export default prepareConnection;
