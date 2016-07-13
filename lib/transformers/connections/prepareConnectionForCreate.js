'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _transformUuidName = require('../../transformers/transformUuidName');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MAX_NAME_SIZE = 18;

// helpers for name formatting conventions
var nameLens = _ramda2.default.lensProp('name');
var truncateName = _ramda2.default.over(nameLens, _ramda2.default.take(MAX_NAME_SIZE));
var replaceWhitespace = _ramda2.default.over(nameLens, _ramda2.default.replace(/\s/g, '-'));
var filterCreateFields = _ramda2.default.pick(['options', 'name', 'strategy', 'enabled_clients']);

var prepareForCreate = _ramda2.default.compose(filterCreateFields, replaceWhitespace, _transformUuidName.combineUuid, truncateName);

exports.default = prepareForCreate;
//# sourceMappingURL=prepareConnectionForCreate.js.map