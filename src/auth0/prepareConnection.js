import R from 'ramda'
import { combineUuid } from '../utils/transformUuidName'

function joinNameWhitespace(connection) {
  const { name } = connection;
  return R.assoc('name', name.replace(' ', '-'), connection);
}

const prepareConnection = R.compose(joinNameWhitespace, combineUuid);

export default prepareConnection;
