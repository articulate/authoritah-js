import R from 'ramda'

const fromObj = R.flip(R.prop);
const formatJSON  = R.curry(JSON.stringify)(R.__, null, "\t");

const printGroup = R.curry((printers, typeDef) => {
  const types = R.keys(typeDef);

  R.map((key) => {
    const actions = fromObj(typeDef, key);
    const verbs = R.keys(actions);

    console.log(`********* ${key} *********`);

    R.map((actionName) => {
      const diffs = fromObj(actions, actionName);
      const printer = printers(actionName);

      R.map(R.compose(printer, formatJSON), diffs);
    }, verbs);
  }, types);

  console.log(''); // newline between resource groups
});

export default function printDiff(context) {
  const { diff, say: { notice: changes, ok: adds, warn: removes } } = context;
  const types = R.keys(diff);
  const printers = fromObj({ adds, changes, removes });

  R.map(R.compose(printGroup(printers), R.flip(R.pick)(diff), R.of), types);

  console.log("Legend: ");
  removes("- Removed");
  changes("- Changed");
  adds("- Added\n");

  return context;
}
