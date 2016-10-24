'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isObject = _ramda2.default.compose(_ramda2.default.equals('Object'), _ramda2.default.type);
var allAreObjects = _ramda2.default.compose(_ramda2.default.all(isObject), _ramda2.default.values);
var hasLeft = _ramda2.default.has('left');
var hasRight = _ramda2.default.has('right');
var hasBoth = _ramda2.default.both(hasLeft, hasRight);
var isEqual = _ramda2.default.both(hasBoth, _ramda2.default.compose(_ramda2.default.apply(_ramda2.default.equals), _ramda2.default.values));

var markAdded = _ramda2.default.compose(_ramda2.default.append(undefined), _ramda2.default.values);
var markRemoved = _ramda2.default.compose(_ramda2.default.prepend(undefined), _ramda2.default.values);
var isAddition = _ramda2.default.both(hasLeft, _ramda2.default.complement(hasRight));
var isRemoval = _ramda2.default.both(_ramda2.default.complement(hasLeft), hasRight);

var objectDiff = _ramda2.default.curry(_diff);
function _diff(l, r) {
  return _ramda2.default.compose(_ramda2.default.map(_ramda2.default.cond([[isAddition, markAdded], [isRemoval, markRemoved], [hasBoth, _ramda2.default.ifElse(allAreObjects, _ramda2.default.compose(_ramda2.default.apply(objectDiff), _ramda2.default.values), _ramda2.default.values)]])), _ramda2.default.reject(isEqual), _ramda2.default.useWith(_ramda2.default.mergeWith(_ramda2.default.merge), [_ramda2.default.map(_ramda2.default.objOf('left')), _ramda2.default.map(_ramda2.default.objOf('right'))]))(l, r);
}

exports.default = objectDiff;