'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function selectiveEquals(filter) {
  return function () {
    for (var _len = arguments.length, compares = Array(_len), _key = 0; _key < _len; _key++) {
      compares[_key] = arguments[_key];
    }

    return _ramda2.default.equals.apply(_ramda2.default, _toConsumableArray(_ramda2.default.map(filter, compares)));
  };
}

var deepMerge = _ramda2.default.mergeWith(function (l, r) {
  return _ramda2.default.isEmpty(r) ? r : _ramda2.default.is(Array, l) && _ramda2.default.is(Array, r) ? _ramda2.default.concat(l, r) : !(_ramda2.default.is(Object, l) && _ramda2.default.is(Object, r)) ? r : deepMerge(l, r);
});

var bothExist = function bothExist(lhs, rhs) {
  return _ramda2.default.and(lhs, rhs);
};
var isChanged = function isChanged(filter) {
  return _ramda2.default.both(bothExist, _ramda2.default.complement(selectiveEquals(filter)));
};

var groupByName = _ramda2.default.compose(_ramda2.default.groupBy(_ramda2.default.prop('name')), _ramda2.default.concat);
var findChanges = function findChanges(filter) {
  return _ramda2.default.filter(_ramda2.default.apply(isChanged(filter)));
};
var changes = function changes(filter) {
  return _ramda2.default.compose(_ramda2.default.values, _ramda2.default.map(function (args) {
    return deepMerge.apply(undefined, _toConsumableArray(args));
  }), _ramda2.default.map(_ramda2.default.reverse), findChanges(filter), groupByName);
};

exports.default = changes;
//# sourceMappingURL=changes.js.map