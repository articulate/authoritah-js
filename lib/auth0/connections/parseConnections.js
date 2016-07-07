'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseConnections;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _transformUuidName = require('../../utils/transformUuidName');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var filterFields = _ramda2.default.pick(['name', 'id', 'options', 'strategy', 'enabled_clients']);
var transformEach = _ramda2.default.map(_ramda2.default.compose(_transformUuidName.extractUuid, filterFields));

function parseConnections(context) {
  var connections = context.connections;


  return _ramda2.default.assoc('connections', transformEach(connections), context);
}
//# sourceMappingURL=parseConnections.js.map