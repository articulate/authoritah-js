'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _transformUuidName = require('../../utils/transformUuidName');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var filterFields = _ramda2.default.pick(['client_id', 'name']);

var transformEach = _ramda2.default.map(_ramda2.default.compose(_transformUuidName.extractUuid, filterFields));
var parseClients = _ramda2.default.over(_ramda2.default.lensProp('clients'), transformEach);

exports.default = parseClients;
//# sourceMappingURL=parseClients.js.map