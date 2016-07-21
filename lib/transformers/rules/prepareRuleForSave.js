'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prepareRuleForSave = _ramda2.default.pick(['enabled', 'script', 'name', 'order', 'stage']);
exports.default = prepareRuleForSave;
//# sourceMappingURL=prepareRuleForSave.js.map