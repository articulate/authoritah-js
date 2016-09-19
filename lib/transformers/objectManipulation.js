'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combineObject = exports.expandObject = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function expandObject(keyName, valueName) {
  return _ramda2.default.compose(_ramda2.default.values, _ramda2.default.mapObjIndexed(function (value, key) {
    var _ref;

    return _ref = {}, _defineProperty(_ref, keyName, key), _defineProperty(_ref, valueName, value), _ref;
  }));
}

function combineObject(keyName, valueName) {
  return _ramda2.default.reduce(function (acc, _ref2) {
    var key = _ref2[keyName];
    var value = _ref2[valueName];
    return _ramda2.default.assoc(key, value, acc);
  }, {});
}

exports.expandObject = expandObject;
exports.combineObject = combineObject;