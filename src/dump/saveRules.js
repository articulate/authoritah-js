import fs from 'fs'
import R from 'ramda'
import saveScripts from '../utils/saveScripts'

export default function saveRules(context) {
  const { rules, options: { ruleScripts } } = context;
  const saveScriptTo = saveScripts(ruleScripts);

  return R.assoc('rules', R.map(saveScriptTo, rules), context);
}
