import R from 'ramda'

export default function transformUuidName(attrs) {
  const { name } = attrs;
  const [uuid, ...nameParts] = name.split(' ');

  return R.merge(attrs, { uuid, name: nameParts.join(' ') });
};
