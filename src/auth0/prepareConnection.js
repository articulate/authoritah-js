import R from 'ramda'
import { combineUuid } from '../utils/transformUuidName'

const filterFields = R.omit(['options', 'name', 'strategy'])
const filterForUpdate = R.pick(['options', 'enabled_clients']);

function joinNameWhitespace(connection) {
  const { name } = connection;
  return R.assoc('name', name.replace(/\s/g, '-'), connection);
}

function prepareConnection(type) {
  const filter = R.equals('update', type) ? filterForUpdate : filterFields;
  return R.compose(filter, joinNameWhitespace, combineUuid);
}

export default prepareConnection;
