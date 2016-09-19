import R from 'ramda'

export default function findAllIn(collection, key) {
  return (ids) => R.filter(R.compose(
    R.flip(R.contains)(ids),
    R.prop(key)
  ), collection);
}
