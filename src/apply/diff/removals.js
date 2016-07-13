import R from 'ramda'
import additions from './additions'

const removals = R.flip(additions);
export default removals;
