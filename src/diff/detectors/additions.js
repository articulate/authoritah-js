import R from 'ramda'

const additions = R.differenceWith(R.eqProps('name'));
export default additions
