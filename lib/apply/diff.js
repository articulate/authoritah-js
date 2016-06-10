'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = diff;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _cliColor = require('cli-color');

var _cliColor2 = _interopRequireDefault(_cliColor);

var _util = require('util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var COMPARE_FIELDS = ['script', 'stage', 'enabled', 'name'];

var selector = _ramda2.default.pick(COMPARE_FIELDS);
var selectiveEquals = function selectiveEquals(lhs, rhs) {
  return _ramda2.default.equals(selector(lhs), selector(rhs));
};
var allExist = function allExist(lhs, rhs) {
  return _ramda2.default.and(lhs, rhs);
};
var isChanged = _ramda2.default.both(allExist, _ramda2.default.complement(selectiveEquals));

var group = _ramda2.default.compose(_ramda2.default.groupBy(_ramda2.default.prop('uuid')), _ramda2.default.concat);
var findChanges = _ramda2.default.filter(_ramda2.default.apply(isChanged));
var difference = _ramda2.default.differenceWith(_ramda2.default.eqProps('uuid'));

function diff(context) {
  var manifest = context.manifest;
  var rules = context.rules;
  var ok = context.say.ok;

  var changes = _ramda2.default.compose(_ramda2.default.values, _ramda2.default.map(_ramda2.default.mergeAll), findChanges, group)(rules, manifest);

  var diff = {
    changes: changes,
    removes: difference(rules, manifest),
    adds: difference(manifest, rules)
  };

  if (_ramda2.default.all(_ramda2.default.isEmpty, _ramda2.default.values(diff))) {
    ok("No changes to apply!");
  }

  return _ramda2.default.merge(diff, context);
}
//# sourceMappingURL=diff.js.map