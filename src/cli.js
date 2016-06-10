import program from 'commander'

import versionParser from './utils/versionParser'
import jwtInterface from './jwt/index'
import configInterface from './config/index'
import dumpInterface from './dump/index'
import applyInterface from './apply/index'

function setupCLI(cli) {
  cli.usage('[options] <config file>')
    .option('-C, --no-color', "Disable color output");

  return cli;
}

function addConfigCommand(cli) {
  cli.command('config <command> [args...]')
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
  cli.command('dump [filename]')
    .option('-s, --scripts <./rules>', "Folder path to save the rule scripts", "./rules")
    .option('-d, --domain <domain>', "Auth0 domain to run against")
    .option('-F --format <format>', "Format to output rules.", "yaml")
    .action(dumpInterface);

  return cli;
}

function addApplyCommand(cli) {
  cli.command('apply [rules file]')
    .option('-d, --domain <domain>', "Auth0 domain to run against")
    .action(applyInterface);

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
