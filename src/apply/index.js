import R from 'ramda'
import say from '../utils/say'
import inquirer from 'inquirer'

import prepareAll from '../utils/prepareAll'

import diff from '../diff/diff'
import applyDiff from './applyDiff'
import printDiff from './printApply'

const ensure = (context) => {
  const { config, options: { env, dryRun, yes } } = context;

  if(yes || dryRun) { return context; }

  const usingEnv = config.orGet("auth0.env", env);
  return inquirer.prompt({
    type: 'confirm',
    name: 'execute',
    default: false,
    message: `You are about to run on the ${usingEnv} environment. Are you sure you want to do this?`,
  }).then(R.ifElse(R.propEq('execute', true),
    R.always(context),
    process.exit));
};

const isDryRun = R.pathEq(['options', 'dryRun'], true);
export default function index(filename='./auth0.yml', options) {
  const { error } = say(options);

  return prepareAll(filename, options)
    .then(ensure)
    .then(diff('rules'))
    .then(diff('connections'))
    .then(R.ifElse(isDryRun, printDiff, applyDiff))
    .catch(error);
}
