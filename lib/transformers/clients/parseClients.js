'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _transformUuidName = require('../../transformers/transformUuidName');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transformEach = _ramda2.default.map(_transformUuidName.extractUuid);
var parseClients = _ramda2.default.over(_ramda2.default.lensProp('clients'), transformEach);

exports.default = parseClients;
//# sourceMappingURL=parseClients.js.map