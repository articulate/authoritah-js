'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _transformUuidName = require('../../transformers/transformUuidName');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var copyClientId = _ramda2.default.over(_ramda2.default.lens(_ramda2.default.prop('client_id'), _ramda2.default.assoc('id')), _ramda2.default.identity);
var transformEach = _ramda2.default.map(_ramda2.default.compose(copyClientId, _transformUuidName.extractUuid));
var parseClients = _ramda2.default.over(_ramda2.default.lensProp('clients'), transformEach);

exports.default = parseClients;
//# sourceMappingURL=parseClients.js.map