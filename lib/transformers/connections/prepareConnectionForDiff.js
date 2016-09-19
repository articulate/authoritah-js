'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var filterFields = _ramda2.default.pick(['name', 'options', 'strategy']);
var filterOptions = _ramda2.default.over(_ramda2.default.lensProp('options'), _ramda2.default.pick(["customScripts"]));
var prepareConnectionForDiff = _ramda2.default.compose(filterOptions, filterFields);

exports.default = prepareConnectionForDiff;