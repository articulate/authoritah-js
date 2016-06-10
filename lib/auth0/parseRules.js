'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseRules;

var _ramda = require('ramda');

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var ATTRS = ['enabled', 'stage', 'script', 'name', 'id'];

var extractName = function extractName(uuidName) {
  var _uuidName$split = uuidName.split(' ');

  var _uuidName$split2 = _toArray(_uuidName$split);

  var uuid = _uuidName$split2[0];

  var nameParts = _uuidName$split2.slice(1);

  return { uuid: uuid, name: nameParts.join(' ') };
};

var transform = function transform(attrs) {
  var name = attrs.name;

  return (0, _ramda.merge)(attrs, extractName(name));
};

function parseRules(context) {
  var rules = context.rules;

  var parsed = (0, _ramda.map)((0, _ramda.compose)(transform, (0, _ramda.pick)(ATTRS)), rules);

  return (0, _ramda.assoc)('rules', parsed, context);
}
//# sourceMappingURL=parseRules.js.map