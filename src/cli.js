import program from 'commander'

import versionParser from './utils/versionParser'
import jwtInterface from './jwt/index'
import configInterface from './config/index'

function setupCLI(cli) {
  cli.usage('[options] <config file>')
    .option('-C, --no-color', "Disable color output");

  return cli;
}

function addConfigCommand(cli) {
  cli.command('config')
    .arguments('<command> [args...]')
    .description('Manage Authoritah config variables. ' +
                 'Available commands:\n' +
                 '\tshow\n' +
                 '\tset key=value [key=value...]\n' +
                 '\tget key [key...]\n' +
                 '\tremove key [key...]')
    .action(configInterface);

  return cli;
}

function addJwtCommand(cli) {
  cli.command('jwt')
    .option('-r, --refresh', "Refresh the token.")
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
