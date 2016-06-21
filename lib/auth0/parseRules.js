'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseRules;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _transformUuidName = require('../utils/transformUuidName');

var _transformUuidName2 = _interopRequireDefault(_transformUuidName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ATTRS = ['enabled', 'stage', 'script', 'name', 'id'];

function parseRules(context) {
  var rules = context.rules;

  var parsed = _ramda2.default.map(_ramda2.default.compose(_transformUuidName2.default, _ramda2.default.pick(ATTRS)), rules);

  return _ramda2.default.assoc('rules', parsed, context);
}
//# sourceMappingURL=parseRules.js.map