'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _transformUuidName = require('../../utils/transformUuidName');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transformEach = _ramda2.default.map(_transformUuidName.extractUuid);
var parseRules = _ramda2.default.over(_ramda2.default.lensProp('rules'), transformEach);

exports.default = parseRules;
//# sourceMappingURL=parseRules.js.map