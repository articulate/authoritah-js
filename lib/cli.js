'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cli;

var _versionParser = require('./utils/versionParser');

var _versionParser2 = _interopRequireDefault(_versionParser);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

function cli(args) {
  var cli = _commander2.default;

  (0, _versionParser2.default)().then(function (version) {
    return cli.version(version);
  }).then(setupCLI).then(addConfigCommand).then(addJwtCommand).then(addDumpCommand).then(addApplyCommand).then(function (cli) {
    return cli.parse(args);
  }).catch(console.error);
}