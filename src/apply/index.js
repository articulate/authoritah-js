import R from 'ramda'
import loadEnv from '../utils/loadEnv'
import say from '../utils/say'
import inquirer from 'inquirer'

import loadManifest from '../apply/loadManifest'
import setupClient from '../utils/setupClient'
import fetchRules from '../auth0/rules/fetchRules'
import fetchConnections from '../auth0/connections/fetchConnections'
import fetchClients from '../auth0/clients/fetchClients'
import { disassociate } from '../utils/associateClientConnections'

import diff from './diff'
import applyDiff from './applyDiff'
import printDiff from './printDiff'

const ensure = (context) => {
  const { config, options: { env, dryRun } } = context;

  if(dryRun) { return context; }

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

  return loadEnv(options)
    .then(ensure)
    .then(loadManifest(filename))
    .then(setupClient)
    .then(fetchRules)
    .then(fetchConnections)
    .then(fetchClients)
    .then(disassociate)
    .then(diff('rules'))
    .then(diff('connections'))
    .then(R.ifElse(isDryRun, printDiff, applyDiff))
    .catch(error);
}
