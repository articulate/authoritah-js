'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var filterFields = _ramda2.default.omit(['id', 'stage']);
var prepareRuleForUpdate = _ramda2.default.compose(filterFields, _ramda2.default.head);
exports.default = prepareRuleForUpdate;
//# sourceMappingURL=prepareRuleForUpdate.js.map