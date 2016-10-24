'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prepareRuleForDiff = _ramda2.default.pick(['script', 'stage', 'enabled', 'name', 'order']);
exports.default = prepareRuleForDiff;