import R from 'ramda'

const additions = R.differenceWith(R.eqProps('uuid'));
export default additions
