'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = index;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _loadEnv = require('../utils/loadEnv');

var _loadEnv2 = _interopRequireDefault(_loadEnv);

var _setupClient = require('../utils/setupClient');

var _setupClient2 = _interopRequireDefault(_setupClient);

var _removeRule = require('../auth0/rules/removeRule');

var _removeRule2 = _interopRequireDefault(_removeRule);

var _removeConnection = require('../auth0/connections/removeConnection');

var _removeConnection2 = _interopRequireDefault(_removeConnection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _startsWith = function _startsWith(prefix, string) {
  return string.startsWith(prefix);
};
var startsWith = _ramda2.default.curry(_startsWith);

var removalFn = _ramda2.default.cond([[startsWith("con_"), _removeConnection2.default], [startsWith("rul_"), _removeRule2.default]]);

function index(ruleId, options) {
  return (0, _loadEnv2.default)(options).then(_setupClient2.default).then(removalFn(ruleId));
}