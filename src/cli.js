import program from 'commander'

import versionParser from './utils/versionParser'
import jwtInterface from './jwt/index'
import configInterface from './config/index'
import dumpInterface from './dump/index'
import applyInterface from './apply/index'
import setupInterface from './setup/index'
import diffInterface from './diff/index'
import removeInterface from './remove/index'

function setupCLI(cli) {
  cli.usage('[options] <config file>')
    .option('-C, --no-color', "Disable color output")
    .option('-y, --yes', "Bypass confirmation step.");
  return cli;
}

function addSetupCommand(cli) {
  cli.command('setup')
    .description('Setup authoritah for use with your Auth0 instance.')
    .action(setupInterface);

  return cli;
}

function addConfigCommand(cli) {
  cli.command('config <command> [args...]')
    .description('Manage Authoritah config variables. ' +
                 'Available commands:\n' +
                 '\tls\n' +
                 '\tset key=value [key=value...]\n' +
                 '\tget key [key...]\n' +
                 '\trm key [key...]')
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
    .option('-r, --rule-scripts <./rule_scripts>', "Folder path to save the rule scripts", "./rule_scripts")
    .option('-c, --connection-scripts <./connection_scripts>', "Folder path to save the connection scripts", "./connection_scripts")
    .option('-e, --env <env>', "Auth0 env to run against")
    .option('-k, --key <key>', "The Auth0 domain key.")
    .option('-s, --secret <secret>', "The Auth0 domain secret.")
    .option('-F --format <format>', "Format to output rules.", "yaml")
    .action(dumpInterface);

  return cli;
}

function addApplyCommand(cli) {
  cli.command('apply [rules file]')
    .option('-e, --env <env>', "Auth0 env to run against")
    .option('-k, --key <key>', "The Auth0 domain key.")
    .option('-s, --secret <secret>', "The Auth0 domain secret.")
    .option('-d, --dry-run', "Perform a dry run, outputting the config that will be applied.")
    .action(applyInterface);

  return cli;
}

function addDiffCommand(cli) {
  cli.command('diff [rules file]')
    .option('-e, --env <env>', "Auth0 env to run against")
    .option('-k, --key <key>', "The Auth0 domain key.")
    .option('-s, --secret <secret>', "The Auth0 domain secret.")
    .action(diffInterface);

  return cli;
}

// Secret rule remove function for dev use
function addRemoveCommand(cli) {
  cli.command('rm <id>')
    .option('-e, --env <env>', "Auth0 env to run against")
    .option('-k, --key <key>', "The Auth0 domain key.")
    .option('-s, --secret <secret>', "The Auth0 domain secret.")
    .action(removeInterface);

  return cli;
}

exports.cli = (args) => {
  const cli = program;

  versionParser()
    .then(cli.version.bind(cli))
    .then(setupCLI)
    .then(addSetupCommand)
    .then(addConfigCommand)
    .then(addJwtCommand)
    .then(addDumpCommand)
    .then(addApplyCommand)
    .then(addDiffCommand)
    .then(addRemoveCommand)
    .then(cli => cli.parse(args))
    .catch(console.error);
}
