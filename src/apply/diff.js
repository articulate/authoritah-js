import R from 'ramda'
import ruleDiff from '../transformers/rules/prepareRuleForDiff'
import connectionDiff from '../transformers/connections/prepareConnectionForDiff'

import additions from './diff/additions'
import removals from './diff/removals'
import changes from './diff/changes'

const COMPARE_FIELDS = {
  rules: ruleDiff,
  connections: connectionDiff,
};

function diff(field, context) {
  const { manifest: { [field]: local }, [field]: server, say: { ok } } = context;
  const filter = COMPARE_FIELDS[field];

  const diff = {
    changes: changes(filter)(local, server),
    removes: removals(local, server),
    adds: additions(local, server)
  };

  if(R.all(R.isEmpty, R.values(diff))) { ok(`No changes to apply for ${field}!`); }
  return R.assocPath(['diff', field], diff, context);
}

export default R.curry(diff);
