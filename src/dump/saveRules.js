import R from 'ramda'
import saveScripts from '../utils/saveScripts'

export default function saveRules(context) {
  const { rules, options: { ruleScripts } } = context;
  const saveScriptTo = saveScripts(ruleScripts);

  const prepare = R.compose(R.sortBy(R.prop('order')), R.map(saveScriptTo));

  return R.assoc('rules', prepare(rules), context);
}
