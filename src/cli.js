import versionParser from './utils/versionParser'
import program from 'commander'

function setupCLI(cli) {
  cli.usage('[options] <config file>');
  return cli;
}

function addConfigCommand(cli) {
  cli.command('config');
  return cli;
}

function addJwtCommand(cli) {
  cli.command('jwt');
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

export default function cli(args) {
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
