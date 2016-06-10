'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FIELDS = ['name', 'script', 'enabled', 'stage', 'order'];

var combineUuidName = function combineUuidName(rule) {
  return _ramda2.default.assoc('name', _ramda2.default.props(['uuid', 'name'], rule).join(' '), rule);
};
var selectCreate = _ramda2.default.compose(_ramda2.default.pick(FIELDS), combineUuidName);
var selectUpdate = _ramda2.default.compose(_ramda2.default.omit(['stage']), selectCreate);

var prepareRule = function prepareRule(type) {
  return _ramda2.default.equals('update', type) ? selectUpdate : selectCreate;
};

exports.default = prepareRule;
//# sourceMappingURL=prepareRule.js.map