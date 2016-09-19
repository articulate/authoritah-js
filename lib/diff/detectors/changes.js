'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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
  return _ramda2.default.isEmpty(r) || _ramda2.default.is(Array, l) && _ramda2.default.is(Array, r) || !(_ramda2.default.is(Object, l) && _ramda2.default.is(Object, r)) ? r : deepMerge(l, r);
});

var bothExist = function bothExist(lhs, rhs) {
  return _ramda2.default.and(lhs, rhs);
};
var isChanged = function isChanged(filter) {
  return _ramda2.default.both(bothExist, _ramda2.default.complement(selectiveEquals(filter)));
};

var dbg = function dbg(ctx) {
  console.log(ctx);return ctx;
};

var groupByName = _ramda2.default.compose(_ramda2.default.groupBy(_ramda2.default.prop('name')), _ramda2.default.concat);
var findChanges = function findChanges(filter) {
  return _ramda2.default.filter(_ramda2.default.apply(isChanged(filter)));
};
var changes = function changes(filter) {
  return _ramda2.default.compose(_ramda2.default.values, _ramda2.default.map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2);

    var lhs = _ref2[0];
    var rhs = _ref2[1];
    return [deepMerge(lhs, rhs), deepMerge(rhs, lhs)];
  }), findChanges(filter), groupByName);
};

exports.default = changes;