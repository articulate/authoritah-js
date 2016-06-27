'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseRules;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _transformUuidName = require('../utils/transformUuidName');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var filterAttrs = _ramda2.default.pick(['enabled', 'stage', 'script', 'name', 'id']);
var transformEach = _ramda2.default.map(_ramda2.default.compose(_transformUuidName.extractUuid, filterAttrs));

function parseRules(context) {
  var rules = context.rules;

  return _ramda2.default.assoc('rules', transformEach(rules), context);
}
//# sourceMappingURL=parseRules.js.map