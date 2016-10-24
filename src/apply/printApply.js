import R from 'ramda'

import ruleChanges from '../transformers/rules/prepareRuleForUpdate'
import ruleAdds from '../transformers/rules/prepareRuleForSave'
import connectionChanges from '../transformers/connections/prepareConnectionForUpdate'
import connectionAdds from '../transformers/connections/prepareConnectionForSave'

const fromObj = R.flip(R.prop);
const formatJSON  = R.curry(JSON.stringify)(R.__, null, "\t");

const symbols = R.flip(R.prop)({
  adds: '+ ',
  removes: '- ',
  changes: '* ',
});

const formatters = (...args) => R.path(args)({
  rules: { adds: ruleAdds, changes: ruleChanges, removes: R.prop('name') },
  connections: { adds: connectionAdds, changes: connectionChanges, removes: R.prop('name') },
});

const printGroup = R.curry((printers, typeDef) => {
  const types = R.keys(typeDef);

  R.forEach((key) => {
    const actions = fromObj(typeDef, key);
    const verbs = R.keys(actions);

    console.log(`********* ${key} *********`);

    // early exit if no changes found
    if(R.all(R.isEmpty, R.values(actions))) { return printers('adds')("No changes!"); }

    R.forEach((actionName) => {
      const diffs = fromObj(actions, actionName);
      const printer = printers(actionName);
      const formatter = formatters(key, actionName);

      R.forEach(R.compose(printer, R.concat(symbols(actionName)), formatJSON, formatter), diffs);
    }, verbs);
  }, types);

  console.log(''); // newline between resource groups
});

export default function printDiff(context) {
  const { diff, say: { notice: changes, ok: adds, error: removes } } = context;
  const types = R.keys(diff);
  const printers = fromObj({ adds, changes, removes });

  R.forEach(R.compose(printGroup(printers), R.flip(R.pick)(diff), R.of), types);

  console.log("Legend: ");
  removes("- Removed");
  changes("* Changed");
  adds("+ Added");

  return context;
}
