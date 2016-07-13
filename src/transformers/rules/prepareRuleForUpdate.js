import R from 'ramda';
import prepareCreate from './prepareRuleForCreate'

const prepareRuleForUpdate = R.compose(R.omit(['stage']), prepareCreate);

export default prepareRuleForUpdate;
