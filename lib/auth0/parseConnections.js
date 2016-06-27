'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseConnections;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _transformUuidName = require('../utils/transformUuidName');

var _transformUuidName2 = _interopRequireDefault(_transformUuidName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var filterFields = _ramda2.default.pick(['name', 'id']);

var filterOptions = _ramda2.default.pick(["configuration", "customScripts"]);

function transform(connection) {
  var fields = _ramda2.default.compose(_transformUuidName2.default, filterFields)(connection);
  return _ramda2.default.merge(fields, filterOptions(connection.options));
}

function parseConnections(context) {
  var connections = context.connections;

  var parsed = _ramda2.default.map(transform, connections);

  return _ramda2.default.assoc('connections', parsed, context);
}
//# sourceMappingURL=parseConnections.js.map