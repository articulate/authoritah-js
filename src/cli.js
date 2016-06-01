import program from 'commander'

import versionParser from './utils/versionParser'
import jwtInterface from './jwt/index'

function setupCLI(cli) {
  cli.usage('[options] <config file>');
  return cli;
}

function addConfigCommand(cli) {
  cli.command('config');
  return cli;
}

function addJwtCommand(cli) {
  cli.command('jwt')
    .option('-k, --key <key>', "The Auth0 domain key.")
    .option('-s, --secret <secret>', "The Auth0 domain secret.")
    .action(jwtInterface);

  return cli;
}

function addDumpCommand(cli) {
  cli.command('dump');
  return cli;
}

function addApplyCommand(cli) {
  cli.command('apply');
  return cli;
}

exports.cli = (args) => {
  const cli = program;

  versionParser()
    .then(version => cli.version(version))
    .then(setupCLI)
    .then(addConfigCommand)
    .then(addJwtCommand)
    .then(addDumpCommand)
    .then(addApplyCommand)
    .then(cli => cli.parse(args))
    .catch(console.error);
}
