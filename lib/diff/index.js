'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = index;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _prepareAll = require('../utils/prepareAll');

var _prepareAll2 = _interopRequireDefault(_prepareAll);

var _diff = require('./diff');

var _diff2 = _interopRequireDefault(_diff);

var _formatDiff = require('./formatDiff');

var _formatDiff2 = _interopRequireDefault(_formatDiff);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function index() {
  var filename = arguments.length <= 0 || arguments[0] === undefined ? './auth0.yml' : arguments[0];
  var options = arguments[1];

  return (0, _prepareAll2.default)(filename, options).then((0, _diff2.default)('rules')).then((0, _diff2.default)('connections')).then(_formatDiff2.default).then(console.log);
}