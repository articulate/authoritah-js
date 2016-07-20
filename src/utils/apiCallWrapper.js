import R from 'ramda'
import inflect from 'inflect'

const endsWith = R.curry((ending, str) => str.endsWith(ending));
const append = R.flip(R.concat);
const pastTense = R.ifElse(endsWith('e'), append('d'), append('ed'));

const printDryRun = (action, type, printer, args) =>
  Promise.resolve(printer(`${inflect.capitalize(action)} ${inflect.singularize(type)}: `, args));

const printResult = (action, type, printer) =>
  ({ name }) => printer(`${inflect.capitalize(pastTense(action))} ${inflect.singularize(type)}: ${name}`);

const actions = {
  delete: (fn, obj) => R.compose(R.composeP(R.always(obj), fn), R.pick(['id']))(obj),
  create: R.call,
  update: (fn, obj) => fn(R.pick(['id'], obj), R.omit(['id'], obj)),
};

export default function apiCallWrapper(fnPath, context) {
  const { client, say: { error, ok, notice }, options: { dryRun } } = context;
  const [type, action] = R.split('.', fnPath);
  const apiFn = R.path([type, action], client);

  const printer = { delete: error, create: ok, update: notice }[action];
  const runApiAction = actions[action];

  return (obj) => R.equals(true, dryRun) ?
    printDryRun(action, type, printer, obj) :
    runApiAction(apiFn, obj)
      .then(printResult(action, type, printer))
      .catch(err => {
        error("Problem calling API: ", err.message, ' ', obj);
        return Promise.reject(err);
      });
}
