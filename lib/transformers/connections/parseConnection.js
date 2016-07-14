'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _transformUuidName = require('../../transformers/transformUuidName');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var copyNameAsUUID = _ramda2.default.over(_ramda2.default.lens(_ramda2.default.prop('name'), _ramda2.default.assoc('uuid')), _ramda2.default.identity);
var transformEach = _ramda2.default.map(copyNameAsUUID);
var parseConnections = _ramda2.default.over(_ramda2.default.lensProp('connections'), transformEach);

exports.default = parseConnections;
//# sourceMappingURL=parseConnection.js.map