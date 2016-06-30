'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fetchRules;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _parseRules = require('./parsers/parseRules');

var _parseRules2 = _interopRequireDefault(_parseRules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fetchRules(context) {
  var client = context.client;


  return client.rules.getAll().then(_ramda2.default.assoc('rules', _ramda2.default.__, context)).then(_parseRules2.default);
}
//# sourceMappingURL=fetchRules.js.map