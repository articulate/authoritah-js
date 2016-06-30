'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _transformUuidName = require('../../utils/transformUuidName');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var filterAttrs = _ramda2.default.pick(['enabled', 'stage', 'script', 'name', 'id']);
var transformEach = _ramda2.default.map(_ramda2.default.compose(_transformUuidName.extractUuid, filterAttrs));
var parseRules = _ramda2.default.over(_ramda2.default.lensProp('rules'), transformEach);

exports.default = parseRules;
//# sourceMappingURL=parseRules.js.map