'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var COMPARE_FIELDS = {
  rules: _ramda2.default.pick(['script', 'stage', 'enabled', 'name']),
  connections: _ramda2.default.pick(['name', 'options', 'strategy'])
};

function selectiveEquals(field) {
  var selector = COMPARE_FIELDS[field];
  return function (lhs, rhs) {
    return _ramda2.default.equals(selector(lhs), selector(rhs));
  };
}

var bothExist = function bothExist(lhs, rhs) {
  return _ramda2.default.and(lhs, rhs);
};
var isChanged = function isChanged(field) {
  return _ramda2.default.both(bothExist, _ramda2.default.complement(selectiveEquals(field)));
};

var groupByUuid = _ramda2.default.compose(_ramda2.default.groupBy(_ramda2.default.prop('uuid')), _ramda2.default.concat);
var findChanges = function findChanges(field) {
  return _ramda2.default.filter(_ramda2.default.apply(isChanged(field)));
};
var difference = _ramda2.default.differenceWith(_ramda2.default.eqProps('uuid'));
var changedIntersection = function changedIntersection(field) {
  return _ramda2.default.compose(_ramda2.default.values, _ramda2.default.map(_ramda2.default.mergeAll), findChanges(field), groupByUuid);
};

function diff(field, context) {
  var local = context.manifest[field];
  var server = context[field];
  var ok = context.say.ok;


  var diff = {
    changes: changedIntersection(field)(server, local),
    removes: difference(server, local),
    adds: difference(local, server)
  };

  if (_ramda2.default.all(_ramda2.default.isEmpty, _ramda2.default.values(diff))) {
    ok('No changes to apply for ' + field + '!');
  }
  return _ramda2.default.assocPath(['diff', field], diff, context);
}

exports.default = _ramda2.default.curry(diff);
//# sourceMappingURL=diff.js.map