'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _versionParser = require('./utils/versionParser');

var _versionParser2 = _interopRequireDefault(_versionParser);

var _index = require('./jwt/index');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('./config/index');

var _index4 = _interopRequireDefault(_index3);

var _index5 = require('./dump/index');

var _index6 = _interopRequireDefault(_index5);

var _index7 = require('./apply/index');

var _index8 = _interopRequireDefault(_index7);

var _index9 = require('./setup/index');

var _index10 = _interopRequireDefault(_index9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setupCLI(cli) {
  cli.usage('[options] <config file>').option('-C, --no-color', "Disable color output");

  return cli;
}

function addSetupCommand(cli) {
  cli.command('setup').description('Setup authoritah for use with your Auth0 instance.').action(_index10.default);

  return cli;
}

function addConfigCommand(cli) {
  cli.command('config <command> [args...]').description('Manage Authoritah config variables. ' + 'Available commands:\n' + '\tshow\n' + '\tset key=value [key=value...]\n' + '\tget key [key...]\n' + '\tremove key [key...]').action(_index4.default);

  return cli;
}

function addJwtCommand(cli) {
  cli.command('jwt').option('-r, --refresh', "Refresh the token.").option('-k, --key <key>', "The Auth0 domain key.").option('-s, --secret <secret>', "The Auth0 domain secret.").action(_index2.default);

  return cli;
}

function addDumpCommand(cli) {
  cli.command('dump [filename]').option('-r, --rule-scripts <./rule_scripts>', "Folder path to save the rule scripts", "./rule_scripts").option('-c, --connection-scripts <./connection_scripts>', "Folder path to save the connection scripts", "./connection_scripts").option('-e, --env <env>', "Auth0 env to run against").option('-k, --key <key>', "The Auth0 domain key.").option('-s, --secret <secret>', "The Auth0 domain secret.").option('-F --format <format>', "Format to output rules.", "yaml").action(_index6.default);

  return cli;
}

function addApplyCommand(cli) {
  cli.command('apply [rules file]').option('-e, --env <env>', "Auth0 env to run against").option('-k, --key <key>', "The Auth0 domain key.").option('-s, --secret <secret>', "The Auth0 domain secret.").option('-d, --dry-run', "Perform a dry run, outputting the diff that will be applied.").option('-y, --yes', "Bypass confirmation step.").action(_index8.default);

  return cli;
}

exports.cli = function (args) {
  var cli = _commander2.default;

  (0, _versionParser2.default)().then(cli.version.bind(cli)).then(setupCLI).then(addSetupCommand).then(addConfigCommand).then(addJwtCommand).then(addDumpCommand).then(addApplyCommand).then(function (cli) {
    return cli.parse(args);
  }).catch(console.error);
};
//# sourceMappingURL=cli.js.map