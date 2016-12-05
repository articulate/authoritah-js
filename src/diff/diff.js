import R from 'ramda'
import ruleDiff from '../transformers/rules/prepareRuleForDiff'
import connectionDiff from '../transformers/connections/prepareConnectionForDiff'

import additions from './detectors/additions'
import removals from './detectors/removals'
import changes from './detectors/changes'

const COMPARE_FIELDS = {
  rules: ruleDiff,
  connections: connectionDiff,
};

const INVALID_RULE_STAGES = [
  'user_registration',
  'user_blocked'
];

const ruleStageCheck = (rule) => R.any(R.equals(R.prop('stage', rule)), INVALID_RULE_STAGES);

// if any invalid stage rules are listed for add, move them to updates
function specialRuleCase(diff) {
  const { adds, changes } = diff;
  const invalidStageRules = R.map((val) => R.repeat(val, 2) , R.filter(ruleStageCheck, adds));
  const cleanAdds = R.reject(ruleStageCheck, adds);

  return R.compose(
    R.assoc('changes', R.concat(changes, invalidStageRules)),
    R.assoc('adds', cleanAdds))(diff);
}

function diff(field, context) {
  const { manifest: { [field]: local }, [field]: server, say: { ok } } = context;
  const filter = COMPARE_FIELDS[field];

  let diff = {
    changes: changes(filter)(local, server),
    removes: removals(local, server),
    adds: additions(local, server)
  };

  if(field === 'rules') { diff = specialRuleCase(diff); }

  if(R.all(R.isEmpty, R.values(diff))) { ok(`No changes to apply for ${field}!`); }
  return R.assocPath(['diff', field], diff, context);
}

export default R.curry(diff);
