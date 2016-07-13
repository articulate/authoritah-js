'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _transformUuidName = require('../../transformers/transformUuidName');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var filterFields = _ramda2.default.pick(['name', 'script', 'enabled', 'stage', 'order']);

var prepareRuleForCreate = _ramda2.default.compose(filterFields, _transformUuidName.combineUuid);

exports.default = prepareRuleForCreate;
//# sourceMappingURL=prepareRuleForCreate.js.map