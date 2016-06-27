import R from 'ramda'
import uuidgen from 'node-uuid'

const uuidMatcher = /([\w]{8}(?:-[\w]{4}){3}-[\w]{12})?\s?(.+)/

export function extractUuid(attrs) {
  const { name } = attrs;
  let [_original, uuid, namePart] = R.match(uuidMatcher, name);

  if(R.isNil(uuid)) { uuid = uuidgen.v4(); }

  return R.merge(attrs, { uuid, name: namePart });
}

export function combineUuid(attrs) {
  let { name, uuid } = attrs;

  if(R.isNil(uuid)) { uuid = uuidgen.v4(); }

  return R.compose(R.assoc('name', `${uuid} ${name}`), R.dissoc('uuid'))(attrs);
}
