'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findAllIn;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findAllIn(collection, key) {
  return function (ids) {
    return _ramda2.default.filter(_ramda2.default.compose(_ramda2.default.flip(_ramda2.default.contains)(ids), _ramda2.default.prop(key)), collection);
  };
}