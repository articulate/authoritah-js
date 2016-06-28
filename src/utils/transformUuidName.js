import R from 'ramda'
import idgen from 'idgen'

// includes legacy UUID format matcher
const uuidMatcher = /([\w]{8}(?:-[\w]{4}){3}-[\w]{12}|[\w-_]{16})?[\s|-]?(.+)/

export function extractUuid(attrs) {
  const { name } = attrs;
  let [_original, uuid, namePart] = R.match(uuidMatcher, name);

  if(R.isNil(uuid)) { uuid = idgen(16); }

  return R.merge(attrs, { uuid, name: namePart });
}

export function combineUuid(attrs) {
  let { name, uuid } = attrs;

  if(R.isNil(uuid)) { uuid = idgen(16); }

  return R.compose(R.assoc('name', `${uuid} ${name}`), R.dissoc('uuid'))(attrs);
}
