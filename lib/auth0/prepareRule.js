'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _transformUuidName = require('../utils/transformUuidName');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var filterFields = _ramda2.default.pick(['name', 'script', 'enabled', 'stage', 'order']);

var selectCreate = _ramda2.default.compose(filterFields, _transformUuidName.combineUuid);
var selectUpdate = _ramda2.default.compose(_ramda2.default.omit(['stage']), selectCreate);

var prepareRule = function prepareRule(type) {
  return _ramda2.default.equals('update', type) ? selectUpdate : selectCreate;
};

exports.default = prepareRule;
//# sourceMappingURL=prepareRule.js.map