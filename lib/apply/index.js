'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = index;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _loadEnv = require('../utils/loadEnv');

var _loadEnv2 = _interopRequireDefault(_loadEnv);

var _say2 = require('../utils/say');

var _say3 = _interopRequireDefault(_say2);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _loadManifest = require('../apply/loadManifest');

var _loadManifest2 = _interopRequireDefault(_loadManifest);

var _setupClient = require('../utils/setupClient');

var _setupClient2 = _interopRequireDefault(_setupClient);

var _fetchRules = require('../auth0/rules/fetchRules');

var _fetchRules2 = _interopRequireDefault(_fetchRules);

var _fetchConnections = require('../auth0/connections/fetchConnections');

var _fetchConnections2 = _interopRequireDefault(_fetchConnections);

var _fetchClients = require('../auth0/clients/fetchClients');

var _fetchClients2 = _interopRequireDefault(_fetchClients);

var _associateClientConnections = require('../utils/associateClientConnections');

var _diff = require('./diff');

var _diff2 = _interopRequireDefault(_diff);

var _applyDiff = require('./applyDiff');

var _applyDiff2 = _interopRequireDefault(_applyDiff);

var _printDiff = require('./printDiff');

var _printDiff2 = _interopRequireDefault(_printDiff);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ensure = function ensure(context) {
  var config = context.config;
  var _context$options = context.options;
  var env = _context$options.env;
  var dryRun = _context$options.dryRun;


  if (dryRun) {
    return context;
  }

  var usingEnv = config.orGet("auth0.env", env);
  return _inquirer2.default.prompt({
    type: 'confirm',
    name: 'execute',
    default: false,
    message: 'You are about to run on the ' + usingEnv + ' environment. Are you sure you want to do this?'
  }).then(_ramda2.default.ifElse(_ramda2.default.propEq('execute', true), _ramda2.default.always(context), process.exit));
};

var isDryRun = _ramda2.default.pathEq(['options', 'dryRun'], true);
function index() {
  var filename = arguments.length <= 0 || arguments[0] === undefined ? './auth0.yml' : arguments[0];
  var options = arguments[1];

  var _say = (0, _say3.default)(options);

  var error = _say.error;


  return (0, _loadEnv2.default)(options).then(ensure).then((0, _loadManifest2.default)(filename)).then(_setupClient2.default).then(_fetchRules2.default).then(_fetchConnections2.default).then(_fetchClients2.default).then(_associateClientConnections.disassociate).then((0, _diff2.default)('rules')).then((0, _diff2.default)('connections')).then(_ramda2.default.ifElse(isDryRun, _printDiff2.default, _applyDiff2.default)).catch(error);
}
//# sourceMappingURL=index.js.map