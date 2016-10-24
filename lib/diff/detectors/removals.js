'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _additions = require('./additions');

var _additions2 = _interopRequireDefault(_additions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var removals = _ramda2.default.flip(_additions2.default);
exports.default = removals;