'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = index;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _say2 = require('../utils/say');

var _say3 = _interopRequireDefault(_say2);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _prepareAll = require('../utils/prepareAll');

var _prepareAll2 = _interopRequireDefault(_prepareAll);

var _diff = require('../diff/diff');

var _diff2 = _interopRequireDefault(_diff);

var _applyDiff = require('./applyDiff');

var _applyDiff2 = _interopRequireDefault(_applyDiff);

var _printApply = require('./printApply');

var _printApply2 = _interopRequireDefault(_printApply);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ensure = function ensure(context) {
  var config = context.config,
      _context$options = context.options,
      env = _context$options.env,
      dryRun = _context$options.dryRun,
      _context$options$pare = _context$options.parent.yes,
      yes = _context$options$pare === undefined ? false : _context$options$pare;

  if (yes || dryRun) {
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
  var filename = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : './auth0.yml';
  var options = arguments[1];

  var _say = (0, _say3.default)(options),
      error = _say.error;

  return (0, _prepareAll2.default)(filename, options).then(ensure).then((0, _diff2.default)('rules')).then((0, _diff2.default)('connections')).then(_ramda2.default.ifElse(isDryRun, _printApply2.default, _applyDiff2.default)).catch(error);
}